import { forwardInternshipRegistrationRequest } from "@/app/api/internship-registration/_proxy";
import { sendAutumnInternshipWelcomeEmail } from "@/lib/emailServer";

function extractWelcomeEmailRecipient(formData: FormData): { email: string; fullName: string } | null {
  const email = formData.get("email");
  const fullName = formData.get("full_name");

  if (typeof email !== "string" || !email.trim() || typeof fullName !== "string" || !fullName.trim()) {
    return null;
  }

  return { email: email.trim(), fullName: fullName.trim() };
}

export async function POST(request: Request) {
  // Read the applicant's email/name from a clone before the body stream is
  // consumed below — a Request body can only be read once, so this is the
  // only way to still have these fields after forwarding the real request.
  // Best-effort only: any failure here just skips the welcome email further
  // down, it never affects the actual registration request/response.
  let recipient: { email: string; fullName: string } | null = null;
  try {
    recipient = extractWelcomeEmailRecipient(await request.clone().formData());
  } catch {
    recipient = null;
  }

  const response = await forwardInternshipRegistrationRequest(
    request,
    "/api/autumn-internship/registration/verify-payment",
  );

  if (recipient && response.status >= 200 && response.status < 300) {
    // Fire-and-forget: not awaited, so the welcome email can never delay or
    // fail the response already being returned to the applicant. All
    // failures are caught and logged inside sendAutumnInternshipWelcomeEmail
    // itself; this .catch is just a defensive backstop.
    void sendAutumnInternshipWelcomeEmail(recipient).catch(() => {});
  }

  return response;
}
