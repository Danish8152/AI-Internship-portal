"use client";

import { ChevronDown, ArrowRight, Upload, AlertCircle } from "lucide-react";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  createInternshipPaymentOrder,
  getInternshipFeeSettings,
  recordInternshipPaymentAttempt,
  registerInternshipWithoutPayment,
  verifyInternshipPaymentAndRegister,
} from "@/services/internshipRegistration";
import NotificationToast from "@/components/ui/NotificationToast";
import PaymentLoadingOverlay from "@/components/ui/PaymentLoadingOverlay";

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayFailureResponse = {
  error?: {
    description?: string;
    reason?: string;
    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler: (response: RazorpaySuccessResponse) => void | Promise<void>;
  modal?: {
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    handler: (response: RazorpayFailureResponse) => void,
  ) => void;
};

// Def-Space's own copy of this page declares this same ambient type inside
// MentorRegistrationForm.tsx (loaded on a different route there, so it's
// always in scope project-wide) — declared locally here instead, since that
// component isn't part of this project.
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

type SubmitStatus = {
  type: "success" | "info" | "error";
  message: string;
};

type PaymentRetryPrompt = {
  message: string;
};

const MAX_PASSPORT_PHOTO_BYTES = 800 * 1024;
const ALLOWED_PASSPORT_PHOTO_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const LATERAL_CATEGORY_OPTIONS = [
  "General Category",
  "EWS(Economically weaker section)",
];
const DEFAULT_LATERAL_EWS_FEE_RUPEES = 1350;

function formatFeeValueRupees(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return String(DEFAULT_LATERAL_EWS_FEE_RUPEES);
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return value.toFixed(2).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return "Something went wrong. Please try again.";
}

function isAlreadyRegisteredMessage(message: string): boolean {
  return message.toLowerCase().includes("already applied");
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function isRetryableVerificationError(error: unknown): boolean {
  const message = getErrorMessage(error).toLowerCase();
  return (
    message.includes("payment is not successful yet")
    || message.includes("unable to validate payment with razorpay")
  );
}

// Razorpay's own backend can take noticeably longer than a couple of seconds to
// mark a payment (especially UPI) as "captured" after the checkout widget's
// handler has already fired on our side. Retrying only 3 times over ~3s was
// giving up before Razorpay had actually finished capturing the payment, which
// looked like "paid but not captured" even though the money was taken.
// Give it a much longer window (~9 attempts spanning ~30s) before surfacing an error.
const VERIFICATION_RETRY_DELAYS_MS = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000];

type ClientLogEvent =
  | "checkout_opened"
  | "handler_fired"
  | "verification_succeeded"
  | "verification_failed"
  | "modal_dismissed_without_payment"
  | "payment_failed"
  | "submission_error";

// Beacons key checkout lifecycle events to the server so a real student's
// failed attempt is traceable later even if the Razorpay widget itself gets
// stuck (in which case there'd be a "checkout_opened" with nothing after it —
// which is itself the diagnosis). Never blocks or throws into the payment flow.
function logClientEvent(
  event: ClientLogEvent,
  details: {
    email?: string;
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    message?: string;
  } = {},
): void {
  try {
    // Attached automatically (not per call site) so every event line is
    // taggable to the domain the checkout actually ran on — this project is
    // deployed on more than one domain (test vs production), and a failure
    // reported against the test domain is a very different signal than the
    // same failure on production.
    const domain = typeof window !== "undefined" ? window.location.hostname : undefined;

    void fetch("/api/internship-registration/client-log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ event, domain, ...details }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Logging must never break the actual payment flow.
  }
}

// Razorpay's checkout iframe negotiation is highly variable (observed ~6s to
// 30s+ in real testing) and shows nothing of its own while it loads. Naively
// polling for the <iframe> element isn't enough — Razorpay injects it into
// the DOM almost immediately (~4s), but it stays a 0×0 placeholder for
// several more seconds before snapping to its real size once the checkout
// UI actually renders (confirmed empirically: 0×0 at t=4.4s, still 0×0 at
// t=8.7s, full 1280×900 at t=10.9s). So the real signal is size, not presence.
function waitForRazorpayIframe(maxWaitMs = 30000, pollIntervalMs = 300): Promise<void> {
  return new Promise((resolve) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }

    const start = Date.now();

    const check = () => {
      const iframe = document.querySelector('iframe[src*="razorpay.com"]') as HTMLIFrameElement | null;
      const isRendered = Boolean(iframe && iframe.offsetWidth > 0 && iframe.offsetHeight > 0);

      if (isRendered || Date.now() - start >= maxWaitMs) {
        resolve();
        return;
      }
      window.setTimeout(check, pollIntervalMs);
    };

    check();
  });
}

function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === "undefined") {
    return Promise.resolve(false);
  }

  if (window.Razorpay) {
    return Promise.resolve(true);
  }

  return new Promise((resolve) => {
    const existing = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
    );

    if (existing) {
      existing.addEventListener("load", () => resolve(true), { once: true });
      existing.addEventListener("error", () => resolve(false), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// ─────────────────────────────────────────────────────────────
// Reusable UI Components
// ─────────────────────────────────────────────────────────────

interface InputProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  disabled?: boolean;
  isTextarea?: boolean;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  pattern?: string;
  error?: string;
}

function FormField({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
  disabled = false,
  isTextarea = false,
  maxLength,
  inputMode,
  pattern,
  error,
}: InputProps) {
  const baseClasses =
    "w-full px-4 py-3 rounded-md bg-[#111111] border text-zinc-100 placeholder-zinc-600 focus:outline-none transition-colors";
  const borderClasses = error
    ? "border-red-500 focus:border-red-500"
    : "border-[#2a2a2a] focus:border-zinc-500";

  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2"
      >
        {label} {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {isTextarea ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          rows={3}
          className={`${baseClasses} ${borderClasses} resize-none `}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          inputMode={inputMode}
          pattern={pattern}
          className={`${baseClasses} ${borderClasses}`}
        />
      )}
      {error && (
        <p className="mt-1.5 text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FormSelect({
  id,
  name,
  label,
  options,
  required,
  value,
  onChange,
  placeholder = "--Select--",
  infoText,
  helperText,
}: any) {
  return (
    <div className="mb-6 w-full">
      <label
        htmlFor={id}
        className="block text-zinc-100 text-[13px] font-semibold mb-2"
      >
        <span className="inline-flex items-center gap-2">
          <span>
            {label} {required && <span className="text-red-500 ml-0.5">*</span>}
          </span>
          {infoText && (
            <span className="relative inline-flex items-center group">
              <button
                type="button"
                aria-label={`${label} information`}
                className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-500 text-[10px] leading-none text-zinc-200 transition-colors hover:border-orange-500 hover:text-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60"
              >
                i
              </button>
              <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 hidden w-72 -translate-x-1/2 rounded-md border border-zinc-700 bg-[#0f0f0f] px-3 py-2 text-xs font-normal leading-relaxed text-zinc-300 shadow-xl group-hover:block group-focus-within:block">
                {infoText}
              </span>
            </span>
          )}
        </span>
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full px-4 py-3 rounded-md bg-[#111111] border border-[#2a2a2a] text-zinc-400 focus:outline-none focus:border-zinc-500 appearance-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Custom select dropdown arrow */}

        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">

          <ChevronDown className="w-5 h-5 text-zinc-500" />
        </div>
      </div>
      {helperText && (
        <p className="mt-1.5 text-[11px] font-normal leading-relaxed text-zinc-400">
          {helperText}
        </p>
      )}
    </div>
  );
}

function CardSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#181818] rounded-xl border border-[#262626] p-6 md:p-8 mb-6">
      <div className="border-b border-[#2a2a2a] pb-4 mb-6">
        <h3 className="text-white text-lg font-serif font-medium tracking-wide">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main Application Form Component
// ─────────────────────────────────────────────────────────────

function InternshipApplicationForm() {
  const searchParams = useSearchParams();
  const internshipName = "Def-Space AI Internship";
  const internshipDesignation = "Def-Space AI Intern";
  const sourceParam = (
    searchParams.get("source") ||
    searchParams.get("type") ||
    ""
  ).toLowerCase();
  const isLateralRegistration =
    sourceParam === "lateral" ||
    sourceParam === "later" ||
    searchParams.get("is_lateral") === "true" ||
    searchParams.get("is_lateral") === "1";
  const registrationTypeLabel = isLateralRegistration
    ? "Lateral Registration"
    : "Regular Registration";

  const emptyFormData = {
    fullName: "",
    guardianName: "",
    category: "",
    gender: "",
    dob: "",
    mobile: "",
    email: "",
    confirmEmail: "",
    altEmail: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    institution: "",
    qualification: "",
    declaration: false,
  };

  const [formData, setFormData] = useState(emptyFormData);
  // Derived, not state — recomputed on every render as the user types in
  // either field, so this is truly live (not just checked on submit). Only
  // flags a mismatch once Confirm Email has something in it, so it doesn't
  // show an error the instant the user starts typing the primary email.
  const emailMismatch =
    formData.confirmEmail.length > 0 && formData.email !== formData.confirmEmail;
  const emailMismatchError = emailMismatch ? "Emails do not match" : undefined;
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);
  const [passportPhotoName, setPassportPhotoName] = useState<string>("");
  const [photoInputKey, setPhotoInputKey] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // Separate from `isSubmitting` on purpose: this only covers the gap between
  // clicking "Proceed to Pay" and Razorpay's iframe actually appearing.
  // `isSubmitting` stays true for the whole payment session (including while
  // the user is on Razorpay's own UI), which would block that UI if reused here.
  const [showPaymentLoading, setShowPaymentLoading] = useState<boolean>(false);
  // Separate again from both of the above: covers the window from the moment
  // Razorpay hands control back to us (its own checkout box closes) through
  // to our verify-payment call actually resolving. Razorpay's UI disappearing
  // reads as "done" to a user, and without a clear signal here they'll often
  // close the tab or navigate away right during the one moment that still
  // needs their page open — which is exactly what caused a real applicant's
  // successful payment to get misreported as failed.
  const [showVerifyingOverlay, setShowVerifyingOverlay] = useState<boolean>(false);
  // Synchronous re-entrancy guard: `isSubmitting` (React state) only becomes
  // true after a re-render, so a double-click/double-tap or an accidental
  // Enter-key resubmit landing before that re-render could otherwise start a
  // second concurrent submission — creating a second Razorpay order/checkout
  // instance while the first is still in flight, and confusing which
  // `handler` closure Razorpay's widget ends up calling back into. This ref
  // is checked and set synchronously, before any `await`, so it closes that
  // window completely regardless of click timing.
  const submissionLockRef = useRef(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus | null>(null);
  const [paymentRetryPrompt, setPaymentRetryPrompt] =
    useState<PaymentRetryPrompt | null>(null);
  const [ewsLateralFeeRupees, setEwsLateralFeeRupees] = useState<number>(
    DEFAULT_LATERAL_EWS_FEE_RUPEES,
  );

  const lateralCategoryInfoText =
    "Economically Weaker Section candidates (whose family annual income is less than ₹7 lakh) can apply under the Weaker Section. "
    + `The lateral registration fee for this category is ₹${formatFeeValueRupees(ewsLateralFeeRupees)}.`;

  const activeResponse = submitStatus
    ? {
      type: submitStatus.type,
      message: submitStatus.message,
    }
    : null;

  const activeResponseTitle = activeResponse
    ? activeResponse.type === "success"
      ? "Application Submitted!"
      : activeResponse.type === "info"
        ? "Please Note"
        : "Submission Error"
    : "";

  // The "confirming with Razorpay" message stays up for the whole retry
  // window (up to ~30s) — it must not vanish after 3s while that's still
  // in progress, unlike every other one-off confirmation/error toast.
  const isPaymentConfirmationPending = Boolean(
    activeResponse?.message?.includes("confirming it with Razorpay"),
  );

  useEffect(() => {
    let isMounted = true;

    const loadFeeSettings = async () => {
      try {
        const settings = await getInternshipFeeSettings();
        const nextEwsFee = Number(settings.ews_lateral_fee_rupees);

        if (isMounted && Number.isFinite(nextEwsFee) && nextEwsFee >= 0) {
          setEwsLateralFeeRupees(nextEwsFee);
        }
      } catch {
        // Keep fallback fee text when settings request is unavailable.
      }
    };

    void loadFeeSettings();

    return () => {
      isMounted = false;
    };
  }, []);

  const clearForm = () => {
    setFormData(emptyFormData);
    setPassportPhoto(null);
    setPassportPhotoName("");
    setPhotoInputKey((prev) => prev + 1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setSubmitStatus(null);

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name === "mobile") {
      // Strip anything non-digit and cap at 10 as the user types — this is
      // the only way to actually prevent an 11th digit or a pasted letter,
      // maxLength alone doesn't stop non-numeric characters on type="tel".
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (!file) {
      setPassportPhoto(null);
      setPassportPhotoName("");
      return;
    }

    const mimeType = file.type.toLowerCase();

    if (!ALLOWED_PASSPORT_PHOTO_TYPES.has(mimeType)) {
      setPassportPhoto(null);
      setPassportPhotoName("");
      setSubmitStatus({
        type: "error",
        message: "Invalid photo format. Please upload JPG, PNG, WEBP, HEIC, or HEIF.",
      });
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PASSPORT_PHOTO_BYTES) {
      setPassportPhoto(null);
      setPassportPhotoName("");
      setSubmitStatus({
        type: "error",
        message: "Passport photo is too large. Maximum allowed size is 800KB.",
      });
      event.target.value = "";
      return;
    }

    setPassportPhoto(file);
    setPassportPhotoName(file?.name || "");
    setSubmitStatus(null);
  };

  const buildRegistrationFormData = (paymentDetails?: {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
    razorpay_signature?: string;
    payment_status?: string;
    payment_mode?: string;
  }) => {
    const payload = new FormData();

    payload.append("internship_name", internshipName);
    payload.append("internship_designation", internshipDesignation);
    payload.append("full_name", formData.fullName.trim());
    payload.append("guardian_name", formData.guardianName.trim());
    payload.append("gender", formData.gender.trim());
    payload.append("dob", formData.dob.trim());
    payload.append("mobile_number", formData.mobile.trim());
    payload.append("email", formData.email.trim());
    payload.append("alternative_email", formData.altEmail.trim());
    // `confirmEmail` is intentionally NOT sent — it's a frontend-only
    // typo-guard compared live against `email`, not a real data field.
    payload.append("address", formData.address.trim());
    payload.append("city", formData.city.trim());
    payload.append("state", formData.state.trim());
    payload.append("pin_code", formData.pinCode.trim());
    payload.append("institution_name", formData.institution.trim());
    payload.append("educational_qualification", formData.qualification.trim());
    payload.append("is_lateral", String(isLateralRegistration));
    payload.append("declaration_accepted", String(formData.declaration));

    if (isLateralRegistration) {
      payload.append("category", formData.category.trim());
    }

    if (passportPhoto) {
      payload.append("passport_photo", passportPhoto);
    }

    if (paymentDetails) {
      if (paymentDetails.razorpay_order_id) {
        payload.append("razorpay_order_id", paymentDetails.razorpay_order_id);
      }

      if (paymentDetails.razorpay_payment_id) {
        payload.append("razorpay_payment_id", paymentDetails.razorpay_payment_id);
      }

      if (paymentDetails.razorpay_signature) {
        payload.append("razorpay_signature", paymentDetails.razorpay_signature);
      }

      if (paymentDetails.payment_status) {
        payload.append("payment_status", paymentDetails.payment_status);
      }

      if (paymentDetails.payment_mode) {
        payload.append("payment_mode", paymentDetails.payment_mode);
      }
    }

    return payload;
  };

  const openPaymentRetryPrompt = (message: string) => {
    setSubmitStatus(null);
    setPaymentRetryPrompt({ message });
  };

  const handleSuccessfulRegistration = (message: string) => {
    clearForm();

    setSubmitStatus({
      type: "success",
      message,
    });
  };

  const finishSubmitting = () => {
    submissionLockRef.current = false;
    setIsSubmitting(false);
    setShowPaymentLoading(false);
    setShowVerifyingOverlay(false);
  };

  const startInternshipSubmission = async () => {
    if (submissionLockRef.current) {
      return;
    }
    submissionLockRef.current = true;

    setSubmitStatus(null);
    setPaymentRetryPrompt(null);

    if (
      isLateralRegistration
      && !LATERAL_CATEGORY_OPTIONS.includes(formData.category)
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please select a valid category before proceeding.",
      });
      submissionLockRef.current = false;
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile)) {
      setSubmitStatus({
        type: "error",
        message: "Mobile number must be exactly 10 digits.",
      });
      submissionLockRef.current = false;
      return;
    }

    if (formData.email.trim() !== formData.confirmEmail.trim()) {
      setSubmitStatus({
        type: "error",
        message: "Email and Confirm Email must be the same.",
      });
      submissionLockRef.current = false;
      return;
    }

    if (!formData.declaration) {
      setSubmitStatus({
        type: "error",
        message: "Please accept the declaration to proceed.",
      });
      submissionLockRef.current = false;
      return;
    }

    if (!passportPhoto) {
      setSubmitStatus({
        type: "error",
        message: "Please upload a passport size photo before proceeding.",
      });
      submissionLockRef.current = false;
      return;
    }

    setIsSubmitting(true);
    setShowPaymentLoading(true);

    try {
      const order = await createInternshipPaymentOrder({
        email: formData.email.trim(),
        is_lateral: isLateralRegistration,
        ...(isLateralRegistration
          ? { category: formData.category.trim() }
          : {}),
      });

      if (order.already_registered) {
        setSubmitStatus({
          type: "info",
          message:
            order.message || "You have already applied for this internship.",
        });
        finishSubmitting();
        return;
      }

      if (!order.requires_payment || order.amount <= 0) {
        await registerInternshipWithoutPayment(buildRegistrationFormData());
        handleSuccessfulRegistration("Application submitted successfully.");
        finishSubmitting();
        return;
      }

      if (!order.key_id || !order.order_id) {
        throw new Error("Payment initialization failed. Please try again.");
      }

      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Unable to load Razorpay checkout. Please try again.");
      }

      await recordInternshipPaymentAttempt(
        buildRegistrationFormData({
          razorpay_order_id: order.order_id,
          payment_status: "pending",
          payment_mode: "order_created",
        }),
      );

      const paymentAttemptState = {
        completed: false,
        failureRecorded: false,
        verificationStarted: false,
      };

      const recordFailedAttempt = async (details: {
        orderId?: string;
        paymentId?: string;
        mode?: string;
      }) => {
        if (
          paymentAttemptState.completed
          || paymentAttemptState.failureRecorded
          || paymentAttemptState.verificationStarted
        ) {
          return;
        }

        paymentAttemptState.failureRecorded = true;

        try {
          await recordInternshipPaymentAttempt(
            buildRegistrationFormData({
              razorpay_order_id: details.orderId || order.order_id,
              razorpay_payment_id: details.paymentId,
              payment_status: "failed",
              payment_mode: details.mode || "failed",
            }),
          );
        } catch {
          paymentAttemptState.failureRecorded = false;
          // Best effort only: do not block UI if failure logging fails.
        }
      };

      const RazorpayConstructor =
        window.Razorpay as unknown as new (
          options: RazorpayOptions,
        ) => RazorpayInstance;

      const razorpay = new RazorpayConstructor({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: "BSERC",
        description: internshipName,
        order_id: order.order_id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.mobile,
        },
        theme: {
          color: "#f97316",
        },
        handler: async (response) => {
          logClientEvent("handler_fired", {
            email: formData.email,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
          });

          // Razorpay's own checkout box has just closed — the single moment
          // a user is most likely to assume they're done and close the tab.
          // Block that until verification actually resolves either way.
          setShowVerifyingOverlay(true);

          try {
            paymentAttemptState.verificationStarted = true;

            const verificationPayload = buildRegistrationFormData({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            let lastError: unknown = null;
            const totalAttempts = VERIFICATION_RETRY_DELAYS_MS.length + 1;

            for (let attempt = 1; attempt <= totalAttempts; attempt += 1) {
              try {
                await verifyInternshipPaymentAndRegister(verificationPayload);
                lastError = null;
                break;
              } catch (error) {
                lastError = error;

                const isLastAttempt = attempt === totalAttempts;
                if (!isRetryableVerificationError(error) || isLastAttempt) {
                  break;
                }

                if (attempt === 1) {
                  setSubmitStatus({
                    type: "info",
                    message:
                      "Payment received — confirming it with Razorpay now. This can take up to 30 seconds, please don't close this page.",
                  });
                }

                await wait(VERIFICATION_RETRY_DELAYS_MS[attempt - 1]);
              }
            }

            if (lastError) {
              throw lastError;
            }

            paymentAttemptState.completed = true;
            logClientEvent("verification_succeeded", {
              email: formData.email,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            handleSuccessfulRegistration(
              "Payment successful and internship application submitted!",
            );
          } catch (error) {
            const message = getErrorMessage(error);

            logClientEvent("verification_failed", {
              email: formData.email,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              message,
            });

            if (!paymentAttemptState.completed && !paymentAttemptState.failureRecorded) {
              paymentAttemptState.failureRecorded = true;

              try {
                await recordInternshipPaymentAttempt(
                  buildRegistrationFormData({
                    razorpay_order_id: response.razorpay_order_id || order.order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    payment_status: "failed",
                    payment_mode: "verification_failed",
                  }),
                );
              } catch {
                paymentAttemptState.failureRecorded = false;
                // Best effort only: verification error should still be shown to user.
              }
            }

            setSubmitStatus({
              type: isAlreadyRegisteredMessage(message) ? "info" : "error",
              message,
            });
          } finally {
            finishSubmitting();
          }
        },
        modal: {
          ondismiss: () => {
            if (!paymentAttemptState.completed && !paymentAttemptState.verificationStarted) {
              logClientEvent("modal_dismissed_without_payment", {
                email: formData.email,
                razorpay_order_id: order.order_id,
              });

              void recordFailedAttempt({
                orderId: order.order_id,
                mode: "cancelled",
              });

              openPaymentRetryPrompt(
                "Payment was not completed. Would you like to try again?",
              );
            }
            finishSubmitting();
          },
        },
      });

      razorpay.on("payment.failed", (response) => {
        if (paymentAttemptState.verificationStarted || paymentAttemptState.completed) {
          return;
        }

        logClientEvent("payment_failed", {
          email: formData.email,
          razorpay_order_id: response.error?.metadata?.order_id || order.order_id,
          razorpay_payment_id: response.error?.metadata?.payment_id,
          message: response.error?.reason || response.error?.description,
        });

        void recordFailedAttempt({
          orderId: response.error?.metadata?.order_id || order.order_id,
          paymentId: response.error?.metadata?.payment_id,
          mode: response.error?.reason || "failed",
        });

        openPaymentRetryPrompt(
          response.error?.description
          || "Payment failed or was not completed. Would you like to try again?",
        );

        finishSubmitting();
      });

      logClientEvent("checkout_opened", {
        email: formData.email,
        razorpay_order_id: order.order_id,
      });
      razorpay.open();
      // Hand off from our overlay to Razorpay's own UI the moment its iframe
      // actually shows up (or after a generous timeout as a safety net) —
      // don't await this, the submission itself is done once .open() fires.
      void waitForRazorpayIframe().then(() => setShowPaymentLoading(false));
    } catch (error) {
      const message = getErrorMessage(error);
      logClientEvent("submission_error", {
        email: formData.email,
        message,
      });
      setSubmitStatus({
        type: isAlreadyRegisteredMessage(message) ? "info" : "error",
        message,
      });
      finishSubmitting();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await startInternshipSubmission();
  };

  const handlePaymentRetry = () => {
    if (isSubmitting) {
      return;
    }

    void startInternshipSubmission();
  };

  const handlePaymentCancel = () => {
    setPaymentRetryPrompt(null);
    clearForm();
    setSubmitStatus({
      type: "info",
      message:
        "Payment was not completed. Your attempt has been saved, and you can try again anytime.",
    });
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-zinc-300 font-sans selection:bg-[#d4ff33] selection:text-black py-12 px-4 sm:px-6 lg:px-8">
      <NotificationToast
        visible={Boolean(activeResponse)}
        type={activeResponse?.type ?? "info"}
        title={activeResponseTitle}
        message={activeResponse?.message ?? ""}
        onClose={() => setSubmitStatus(null)}
        autoDismissMs={isPaymentConfirmationPending ? 0 : 5000}
      />

      <PaymentLoadingOverlay visible={showPaymentLoading} />
      <PaymentLoadingOverlay
        visible={showVerifyingOverlay}
        message="Verifying Your Payment..."
        subMessage="Please do not close this page or navigate away. This can take up to 30 seconds while we confirm your payment."
      />

      {paymentRetryPrompt && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

          <div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg rounded-xl border border-red-900/40 bg-[#1a1010] p-4 shadow-2xl"
          >
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-400" strokeWidth={2.5} />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-red-300">Payment Not Complete</p>
                <p className="text-sm mt-1 text-red-200 leading-relaxed">
                  {paymentRetryPrompt.message}
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={handlePaymentCancel}
                className="rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePaymentRetry}
                className="rounded-md border border-orange-300/40 bg-orange-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-orange-100 transition hover:bg-orange-500/30"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto">
        {/* Header Title Section */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">
              APPLICATION PORTAL
            </span>
            <div className="h-px w-16 bg-orange-500/40"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white leading-tight mb-4">
            DEF-SPACE AI
            <br />
            INTERNSHIP APPLICATION FORM
          </h1>

          <p className="text-zinc-400 text-sm mb-3">
            Fill out all required fields to complete your application
          </p>

          {/* Internship Details — fixed, informational copy about the
              programme itself (not user input), so it reads as part of the
              header rather than as its own form section/card. */}
          <p className="text-xs text-zinc-500">
            {internshipName}
            <span className="text-zinc-600"> · </span>
            {internshipDesignation}
            <span className="text-zinc-600"> · </span>
            {registrationTypeLabel}
          </p>
        </div>

        {isLateralRegistration ? (
          <form onSubmit={handleSubmit}>
            {/* Section 1 */}
            <CardSection title="1. APPLICANT'S PERSONAL DETAILS / आवेदक का व्यक्तिगत विवरण">
              <div className="space-y-2">
                <FormField
                  id="fullName"
                  name="fullName"
                  label="Applicant's Full Name / आवेदक का पूरा नाम"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {isLateralRegistration ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <FormField
                      id="guardianName"
                      name="guardianName"
                      label="Guardian Name / अभिभावक का नाम"
                      required
                      value={formData.guardianName}
                      onChange={handleChange}
                    />
                    <FormSelect
                      id="category"
                      name="category"
                      label="Category"
                      placeholder="--Select Category--"
                      options={LATERAL_CATEGORY_OPTIONS}
                      required
                      value={formData.category}
                      onChange={handleChange}
                      infoText={lateralCategoryInfoText}
                      helperText="EWS (family income below ₹7 lakh): Registration fee ₹1350"
                    />
                  </div>
                ) : (
                  <FormField
                    id="guardianName"
                    name="guardianName"
                    label="Guardian Name / अभिभावक का नाम"
                    required
                    value={formData.guardianName}
                    onChange={handleChange}
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FormSelect
                    id="gender"
                    name="gender"
                    label="Gender / लिंग"
                    placeholder="--Select Gender--"
                    options={[
                      "Male / पुरुष",
                      "Female / महिला",
                      "Other / अन्य",
                      "Prefer not to say ",
                    ]}
                    required
                    value={formData.gender}
                    onChange={handleChange}
                  />
                  <FormField
                    id="dob"
                    name="dob"
                    type="date"
                    label="Date of Birth / जन्म दिनांक"
                    placeholder="mm/dd/yyyy"
                    required
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardSection>

            {/* Section 2 */}
            <CardSection title="2. CONTACT DETAILS / संपर्क विवरण">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                <FormField
                  id="mobile"
                  name="mobile"
                  type="tel"
                  label="Mobile Number / मोबाइल नंबर"
                  placeholder="Enter 10-digit mobile number"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  maxLength={10}
                  inputMode="numeric"
                  pattern="\d{10}"
                />
                <FormField
                  id="email"
                  name="email"
                  type="email"
                  label="Email Address / ईमेल पता"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  error={emailMismatchError}
                />
                <FormField
                  id="confirmEmail"
                  name="confirmEmail"
                  type="email"
                  label="Confirm Email / ईमेल की पुष्टि करें"
                  placeholder="Re-enter the same email address"
                  required
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  error={emailMismatchError}
                />
                <FormField
                  id="altEmail"
                  name="altEmail"
                  type="email"
                  label="Alternative Email / वैकल्पिक ईमेल पता"
                  required
                  value={formData.altEmail}
                  onChange={handleChange}
                />
              </div>
            </CardSection>

            {/* Section 3 */}
            <CardSection title="3. PERMANENT ADDRESS DETAILS / स्थायी पता विवरण">
              <FormField
                id="address"
                name="address"
                label="Address / पता"
                required
                isTextarea
                value={formData.address}
                onChange={handleChange}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                <FormField
                  id="city"
                  name="city"
                  label="City Name / शहर का नाम"
                  required
                  value={formData.city}
                  onChange={handleChange}
                />
                <FormField
                  id="state"
                  name="state"
                  label="State / राज्य"
                  required
                  value={formData.state}
                  onChange={handleChange}
                />
                <FormField
                  id="pinCode"
                  name="pinCode"
                  label="Pin Code / पिन कोड"
                  required
                  value={formData.pinCode}
                  onChange={handleChange}
                />
              </div>
            </CardSection>

            {/* Section 4 */}
            <CardSection title="4. EDUCATIONAL / QUALIFICATION DETAILS / शैक्षिक / योग्यता का विवरण">
              <FormField
                id="institution"
                name="institution"
                label="Institution Name / संस्थान का नाम"
                required
                value={formData.institution}
                onChange={handleChange}
              />
              <FormSelect
                id="qualification"
                name="qualification"
                label="Educational Qualification / शैक्षिक योग्यता"
                placeholder="--Select Qualification--"
                options={["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "Other"]}
                required
                value={formData.qualification}
                onChange={handleChange}
              />
            </CardSection>

            {/* Section 5 */}
            <CardSection title="5. IDENTIFICATION DETAILS / पहचान का विवरण">
              <label className="block text-zinc-100 text-[13px] font-semibold mb-3">
                Upload Passport Size Photo / पासपोर्ट साइज फोटो अपलोड करें{" "}
                <span className="text-red-500 ml-0.5">*</span>
              </label>
              <input
                key={photoInputKey}
                id="passport_photo"
                type="file"
                name="passport_photo"
                className="sr-only"
                accept=".jpg,.jpeg,.png,.webp,.heic,.heif"
                onChange={handlePhotoChange}
              />
              <label
                htmlFor="passport_photo"
                className="w-full border border-dashed border-[#3a402a] rounded-xl py-14 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] transition-colors cursor-pointer group"
              >
                <Upload className="w-6 h-6 text-zinc-400 mb-3 group-hover:text-zinc-200 transition-colors" />
                <p className="text-zinc-400 text-[13px] group-hover:text-zinc-300 transition-colors">
                  Click to upload photo (Max 800KB to 1MB)
                </p>
                <p className="mt-1 text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                  Supported: JPG, PNG, WEBP, HEIC, HEIF
                </p>
                {passportPhotoName && (
                  <p className="mt-2 text-xs text-[#d4ff33]">Selected: {passportPhotoName}</p>
                )}
              </label>
            </CardSection>

            {/* Declaration Section */}
            <div className="bg-[#181818] rounded-xl border border-[#2a301a] p-6 mb-12">
              <label className="flex items-start gap-4 cursor-pointer group">
                <div className="pt-1 relative flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="declaration"
                    required
                    checked={formData.declaration}
                    onChange={handleChange}
                    className="peer w-5 h-5 rounded-sm bg-white border-none appearance-none checked:bg-orange-500 cursor-pointer flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#181818]"
                  />

                  {/* The Checkmark Arrow */}
                  <svg
                    className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                <p className="text-[13px] text-zinc-300 leading-relaxed text-justify group-hover:text-zinc-100 transition-colors">
                  I hereby declare that the information given above and in the
                  enclosed documents is true to the best of my knowledge and
                  belief and nothing has been concealed therein. I understand that
                  if the information given by me is proved false/not true, all the
                  benefits availed by me shall be withdrawn. / मैं घोषणा करता हूँ
                  कि ऊपर और संलग्न दस्तावेजों में दी गई जानकारी मेरी सर्वोत्तम
                  जानकारी और विश्वास के अनुसार सत्य है और इसमें कुछ भी छिपाया नहीं
                  गया है। मैं समझता हूँ कि यदि मेरे द्वारा दी गई जानकारी झूठी हुई
                  तो मेरे द्वारा प्राप्त किए गए सभी लाभ वापस ले लिए जाएंगे।
                </p>
              </label>
            </div>

            {/* Submit Button */}
            <div className="border-t border-[#262626] pt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`text-black font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#d4ff33]/10 ${isSubmitting
                  ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
                  }`}
              >
                {isSubmitting ? "Processing..." : "Proceed to Pay"}
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </form>
        ) : (
          <>
            {/* / REGULAR REGISTRATION FORM (Temporarily Commented Out)
            // To resume regular registration, uncomment the form below and adjust conditions. */}

            <form onSubmit={handleSubmit}>
                {/* // Section 1 */}
              <CardSection title="1. APPLICANT'S PERSONAL DETAILS / आवेदक का व्यक्तिगत विवरण">
                <div className="space-y-2">
                  <FormField
                    id="fullName"
                    name="fullName"
                    label="Applicant's Full Name / आवेदक का पूरा नाम"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <FormField
                    id="guardianName"
                    name="guardianName"
                    label="Guardian Name / अभिभावक का नाम"
                    required
                    value={formData.guardianName}
                    onChange={handleChange}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <FormSelect
                      id="gender"
                      name="gender"
                      label="Gender / लिंग"
                      placeholder="--Select Gender--"
                      options={[
                        "Male / पुरुष",
                        "Female / महिला",
                        "Other / अन्य",
                        "Prefer not to say ",
                      ]}
                      required
                      value={formData.gender}
                      onChange={handleChange}
                    />
                    <FormField
                      id="dob"
                      name="dob"
                      type="date"
                      label="Date of Birth / जन्म दिनांक"
                      placeholder="mm/dd/yyyy"
                      required
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </CardSection>

                {/* // Section 2 */}
              <CardSection title="2. CONTACT DETAILS / संपर्क विवरण">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                  <FormField
                    id="mobile"
                    name="mobile"
                    type="tel"
                    label="Mobile Number / मोबाइल नंबर"
                    placeholder="Enter 10-digit mobile number"
                    required
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    inputMode="numeric"
                    pattern="\d{10}"
                  />
                  <FormField
                    id="email"
                    name="email"
                    type="email"
                    label="Email Address / ईमेल पता"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    error={emailMismatchError}
                  />
                  <FormField
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    label="Confirm Email / ईमेल की पुष्टि करें"
                    placeholder="Re-enter the same email address"
                    required
                    value={formData.confirmEmail}
                    onChange={handleChange}
                    error={emailMismatchError}
                  />
                  <FormField
                    id="altEmail"
                    name="altEmail"
                    type="email"
                    label="Alternative Email / वैकल्पिक ईमेल पता"
                    required
                    value={formData.altEmail}
                    onChange={handleChange}
                  />
                </div>
              </CardSection>

                {/* // Section 3 */}
              <CardSection title="3. PERMANENT ADDRESS DETAILS / स्थायी पता विवरण">
                <FormField
                  id="address"
                  name="address"
                  label="Address / पता"
                  required
                  isTextarea
                  value={formData.address}
                  onChange={handleChange}
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6">
                  <FormField
                    id="city"
                    name="city"
                    label="City Name / शहर का नाम"
                    required
                    value={formData.city}
                    onChange={handleChange}
                  />
                  <FormField
                    id="state"
                    name="state"
                    label="State / राज्य"
                    required
                    value={formData.state}
                    onChange={handleChange}
                  />
                  <FormField
                    id="pinCode"
                    name="pinCode"
                    label="Pin Code / पिन कोड"
                    required
                    value={formData.pinCode}
                    onChange={handleChange}
                  />
                </div>
              </CardSection>

                {/* // Section 4 */}
              <CardSection title="4. EDUCATIONAL / QUALIFICATION DETAILS / शैक्षिक / योग्यता का विवरण">
                <FormField
                  id="institution"
                  name="institution"
                  label="Institution Name / संस्थान का नाम"
                  required
                  value={formData.institution}
                  onChange={handleChange}
                />
                <FormSelect
                  id="qualification"
                  name="qualification"
                  label="Educational Qualification / शैक्षिक योग्यता"
                  placeholder="--Select Qualification--"
                  options={["B.Tech", "M.Tech", "BCA", "MCA", "B.Sc", "Other"]}
                  required
                  value={formData.qualification}
                  onChange={handleChange}
                />
              </CardSection>

                {/* // Section 5 */}
              <CardSection title="5. IDENTIFICATION DETAILS / पहचान का विवरण">
                <label className="block text-zinc-100 text-[13px] font-semibold mb-3">
                  Upload Passport Size Photo / पासपोर्ट साइज फोटो अपलोड करें
                  <span className="text-red-500 ml-0.5">*</span>
                </label>
                <input
                  key={photoInputKey}
                  id="passport_photo"
                  type="file"
                  name="passport_photo"
                  className="sr-only"
                  accept=".jpg,.jpeg,.png,.webp,.heic,.heif"
                  onChange={handlePhotoChange}
                />
                <label
                  htmlFor="passport_photo"
                  className="w-full border border-dashed border-[#3a402a] rounded-xl py-14 flex flex-col items-center justify-center bg-[#111111]/50 hover:bg-[#161616] transition-colors cursor-pointer group"
                >
                  <Upload className="w-6 h-6 text-zinc-400 mb-3 group-hover:text-zinc-200 transition-colors" />
                  <p className="text-zinc-400 text-[13px] group-hover:text-zinc-300 transition-colors">
                    Click to upload photo (Max 800KB to 1MB)
                  </p>
                  <p className="mt-1 text-[11px] text-zinc-500 group-hover:text-zinc-400 transition-colors">
                    Supported: JPG, PNG, WEBP, HEIC, HEIF
                  </p>
                  {passportPhotoName && (
                    <p className="mt-2 text-xs text-[#d4ff33]">Selected: {passportPhotoName}</p>
                  )}
                </label>
              </CardSection>

                {/* // Declaration Section */}
              <div className="bg-[#181818] rounded-xl border border-[#2a301a] p-6 mb-12">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="pt-1 relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      name="declaration"
                      required
                      checked={formData.declaration}
                      onChange={handleChange}
                      className="peer w-5 h-5 rounded-sm bg-white border-none appearance-none checked:bg-orange-500 cursor-pointer flex-shrink-0 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-[#181818]"
                    />

                      {/* // The Checkmark Arrow */}
                    <svg
                      className="absolute w-3.5 h-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="4"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <p className="text-[13px] text-zinc-300 leading-relaxed text-justify group-hover:text-zinc-100 transition-colors">
                    I hereby declare that the information given above and in the
                    enclosed documents is true to the best of my knowledge and
                    belief and nothing has been concealed therein. I understand that
                    if the information given by me is proved false/not true, all the
                    benefits availed by me shall be withdrawn. / मैं घोषणा करता हूँ
                    कि ऊपर और संलग्न दस्तावेजों में दी गई जानकारी मेरी सर्वोत्तम
                    जानकारी और विश्वास के अनुसार सत्य है और इसमें कुछ भी छिपाया नहीं
                    गया है। मैं समझता हूँ कि यदि मेरे द्वारा दी गई जानकारी झूठी हुई
                    तो मेरे द्वारा प्राप्त किए गए सभी लाभ वापस ले लिए जाएंगे।
                  </p>
                </label>
              </div>

                {/* // Submit Button */}
              <div className="border-t border-[#262626] pt-8 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`text-black font-semibold text-sm px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-lg shadow-[#d4ff33]/10 ${isSubmitting
                    ? "bg-zinc-700 text-zinc-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600"
                    }`}
                >
                  {isSubmitting ? "Processing..." : "Proceed to Pay"}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>

          </>
        )}
      </main>
    </div>
  );
}

export default function AutumnInternshipPage() {
  return (
    <Suspense fallback={null}>
      <InternshipApplicationForm />
    </Suspense>
  );
}
