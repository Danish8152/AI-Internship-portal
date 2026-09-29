import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";
import { sendAutumnInternshipPaymentFailedEmail } from "@/lib/emailServer";

// This route is shared by three different callers from the client (see
// src/services/internshipRegistration.ts / src/app/autumn-internship/page.tsx):
//   1. registerInternshipWithoutPayment — a genuine successful, zero-fee
//      registration (no payment_status field sent at all).
//   2. recordInternshipPaymentAttempt with payment_status="pending" — logged
//      right before the Razorpay checkout opens.
//   3. recordInternshipPaymentAttempt with payment_status="failed" — logged
//      after a failed/cancelled payment attempt.
// Only (3) should trigger the payment-failed email, so we gate strictly on
// the submitted payment_status field rather than just the response status.
function extractFailedPaymentRecipient(formData: FormData): { email: string; fullName: string } | null {
  if (formData.get("payment_status") !== "failed") {
    return null;
  }

  const email = formData.get("email");
  const fullName = formData.get("full_name");

  if (typeof email !== "string" || !email.trim() || typeof fullName !== "string" || !fullName.trim()) {
    return null;
  }

  return { email: email.trim(), fullName: fullName.trim() };
}

export async function POST(request: Request) {
  // Same clone-before-forward pattern as verify-payment/route.ts — a
  // Request body can only be read once, so this clone is what lets us
  // inspect the submitted fields without touching the real forwarded
  // request at all. Best-effort only: any failure here just skips the
  // email further down.
  let recipient: { email: string; fullName: string } | null = null;
  try {
    recipient = extractFailedPaymentRecipient(await request.clone().formData());
  } catch {
    recipient = null;
  }

  const response = await forwardInternshipRegistrationRequest(
    request,
    "/api/autumn-internship/registration/register",
  );

  if (recipient && response.status >= 200 && response.status < 300) {
    // Fire-and-forget: not awaited, so this can never delay or fail the
    // response already being returned to the caller.
    void sendAutumnInternshipPaymentFailedEmail(recipient).catch(() => {});
  }

  return response;
}
