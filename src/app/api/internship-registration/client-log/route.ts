import { NextResponse } from "next/server";

import { logEvent } from "@/app/api/internship-registration/_proxy";

// Client-side Razorpay checkout events have no server-side trace of their own
// (e.g. the widget failing to close after a successful UPI payment never hits
// verify-payment at all). This endpoint lets the browser beacon key lifecycle
// events here so the full picture is visible in server logs later, even for a
// real student's failed attempt we can't otherwise reproduce.
const ALLOWED_EVENTS = new Set([
  "checkout_opened",
  "handler_fired",
  "verification_succeeded",
  "verification_failed",
  "modal_dismissed_without_payment",
  "payment_failed",
  "submission_error",
]);

type ClientLogBody = {
  event?: unknown;
  email?: unknown;
  razorpay_order_id?: unknown;
  razorpay_payment_id?: unknown;
  message?: unknown;
  domain?: unknown;
};

function toOptionalString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() ? value.trim() : undefined;
}

export async function POST(request: Request) {
  let body: ClientLogBody;

  try {
    body = (await request.json()) as ClientLogBody;
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const event = toOptionalString(body.event);

  if (!event || !ALLOWED_EVENTS.has(event)) {
    return NextResponse.json({ message: "Unknown or missing event" }, { status: 400 });
  }

  logEvent("info", `client: ${event}`, {
    domain: toOptionalString(body.domain),
    email: toOptionalString(body.email),
    razorpay_order_id: toOptionalString(body.razorpay_order_id),
    razorpay_payment_id: toOptionalString(body.razorpay_payment_id),
    detail: toOptionalString(body.message),
  });

  return NextResponse.json({ ok: true });
}
