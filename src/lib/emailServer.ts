// Server-only integration with bserc-email-server for Def-Space AI
// Internship registration emails (welcome on success, notice on payment
// failure). Copied from bserc-def-space-internship-portal's Autumn
// Internship integration; see that project's docs/autumn-internship-welcome-email.md
// for the original plan/reasoning.
//
// bserc-email-server is API-access only (we cannot modify its code or DB) —
// every call below is a plain HTTPS request to its public API, exactly as
// any other client of that service would use. Its own source was used only
// as a starting reference for these request/response shapes, not trusted as
// authoritative — the shapes actually used here (POST /api/auth/login and
// POST /api/campaigns/send) were confirmed live against the deployed
// instance at EMAIL_SERVER_BASE_URL.
import { logEvent } from "@/app/api/internship-registration/_proxy";

const BASE_URL = (process.env.EMAIL_SERVER_BASE_URL || "").replace(/\/$/, "");
const SERVICE_EMAIL = process.env.EMAIL_SERVER_SERVICE_EMAIL || "";
const SERVICE_PASSWORD = process.env.EMAIL_SERVER_SERVICE_PASSWORD || "";
const FROM_EMAIL = process.env.EMAIL_SERVER_FROM_EMAIL || "";

// The two predefined, already-built templates on the email server. Each is
// independently optional/configured — e.g. you can have the welcome email
// live without the payment-failed one configured yet, and it just skips.
//
// Unlike the Def-Space project this was copied from, WELCOME_TEMPLATE_ID has
// no default here (falls back to "0" = unconfigured, same as
// PAYMENT_FAILED_TEMPLATE_ID already did). Def-Space's own template id (37)
// is Autumn Internship content — reusing it here would send real AI
// Internship applicants a welcome email about the wrong programme. A real
// EMAIL_SERVER_WELCOME_TEMPLATE_ID for this project's own template must be
// set before this email can go out; until then it silently skips (logged as
// a warning), exactly like the payment-failed email already does.
const WELCOME_TEMPLATE_ID = Number(process.env.EMAIL_SERVER_WELCOME_TEMPLATE_ID || "0");
const PAYMENT_FAILED_TEMPLATE_ID = Number(process.env.EMAIL_SERVER_PAYMENT_FAILED_TEMPLATE_ID || "0");

// Human-readable campaign-name prefixes, kept configurable rather than
// hardcoded. The actual campaignName sent still appends the recipient email
// to this prefix, so campaigns stay uniquely named regardless of what prefix
// is chosen here — kept distinct from Def-Space's own prefixes so a person
// applying to both programmes doesn't collide on the same campaign name.
const WELCOME_CAMPAIGN_NAME_PREFIX =
  process.env.EMAIL_SERVER_WELCOME_CAMPAIGN_NAME || "ai-internship-welcome";
const PAYMENT_FAILED_CAMPAIGN_NAME_PREFIX =
  process.env.EMAIL_SERVER_PAYMENT_FAILED_CAMPAIGN_NAME || "ai-internship-payment-failed";

// Tokens from this service default to a 12h expiry — refresh a bit early
// rather than cutting it exactly at the edge.
const TOKEN_LIFETIME_MS = 11 * 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 8000;
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 800;

type CachedToken = { token: string; obtainedAt: number };
let cachedToken: CachedToken | null = null;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function login(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: SERVICE_EMAIL, password: SERVICE_PASSWORD }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  const body = (await res.json().catch(() => ({}))) as { token?: unknown };

  if (!res.ok || typeof body.token !== "string" || !body.token) {
    throw new Error(`Email server login failed (${res.status})`);
  }

  return body.token;
}

// Logging in once per process and reusing the token (rather than per send)
// avoids unnecessary latency/load on the email server's login endpoint, and
// limits how often the raw service password gets transmitted. Shared across
// both send kinds below — one login serves both.
async function getToken(forceRefresh: boolean): Promise<string> {
  const isStale = !cachedToken || Date.now() - cachedToken.obtainedAt > TOKEN_LIFETIME_MS;

  if (!forceRefresh && cachedToken && !isStale) {
    return cachedToken.token;
  }

  const token = await login();
  cachedToken = { token, obtainedAt: Date.now() };
  return token;
}

export type EmailRecipient = {
  email: string;
  fullName: string;
};

type SendKind = "welcome" | "payment_failed";

type SendConfig = {
  kind: SendKind;
  templateId: number;
  campaignNamePrefix: string;
};

function isSendConfigured(cfg: SendConfig): boolean {
  return Boolean(BASE_URL && SERVICE_EMAIL && SERVICE_PASSWORD && FROM_EMAIL && cfg.templateId);
}

// Fire-and-forget from the caller's point of view: every failure is caught
// and logged right here, never thrown — a misconfigured or unreachable email
// server must never affect the applicant's actual registration response.
async function sendTemplatedEmail(cfg: SendConfig, recipient: EmailRecipient): Promise<void> {
  if (!isSendConfigured(cfg)) {
    logEvent("warn", `${cfg.kind} email skipped: email server integration not configured`, {
      email: recipient.email,
    });
    return;
  }

  const payload = {
    // No timestamp suffix, by request: just <prefix>-<email>. This means a
    // second send to the same recipient will reuse the exact same campaign
    // name (e.g. a retry, a resubmission, or repeated testing) — that's a
    // deliberate tradeoff, not an oversight.
    campaignName: `${cfg.campaignNamePrefix}-${recipient.email}`,
    templateId: cfg.templateId,
    fromEmail: FROM_EMAIL,
    recipients: [{ email: recipient.email, firstName: recipient.fullName }],
  };

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const isLastAttempt = attempt === MAX_ATTEMPTS;

    try {
      const token = await getToken(attempt > 1);
      const res = await fetch(`${BASE_URL}/api/campaigns/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });

      const body = (await res.json().catch(() => ({}))) as { campaignId?: unknown };

      if (res.ok) {
        logEvent("info", `${cfg.kind} email queued`, {
          email: recipient.email,
          campaignId: body.campaignId !== undefined ? String(body.campaignId) : undefined,
        });
        return;
      }

      // 401 -> stale cached token, worth one fresh-login retry.
      // 5xx -> plausibly transient, worth one retry per the plan's
      // reliability note. Anything else (400/403/404) won't be fixed by
      // retrying the same payload.
      const isRetryable = res.status === 401 || res.status >= 500;

      if (!isRetryable || isLastAttempt) {
        logEvent("warn", `${cfg.kind} email send failed`, {
          email: recipient.email,
          status: String(res.status),
          detail: JSON.stringify(body).slice(0, 300),
        });
        return;
      }
    } catch (error) {
      if (isLastAttempt) {
        logEvent("warn", `${cfg.kind} email send threw (network/timeout)`, {
          email: recipient.email,
          error: error instanceof Error ? error.message : String(error),
        });
        return;
      }
    }

    await wait(RETRY_DELAY_MS);
  }
}

export function sendAutumnInternshipWelcomeEmail(recipient: EmailRecipient): Promise<void> {
  return sendTemplatedEmail(
    {
      kind: "welcome",
      templateId: WELCOME_TEMPLATE_ID,
      campaignNamePrefix: WELCOME_CAMPAIGN_NAME_PREFIX,
    },
    recipient,
  );
}

export function sendAutumnInternshipPaymentFailedEmail(recipient: EmailRecipient): Promise<void> {
  return sendTemplatedEmail(
    {
      kind: "payment_failed",
      templateId: PAYMENT_FAILED_TEMPLATE_ID,
      campaignNamePrefix: PAYMENT_FAILED_CAMPAIGN_NAME_PREFIX,
    },
    recipient,
  );
}
