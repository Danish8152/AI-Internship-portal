import { NextResponse } from "next/server";
import { appendLogLine } from "@/lib/fileLogger";

const DEV_FALLBACK_BACKEND_URLS = [
  "http://127.0.0.1:5000",
  "http://localhost:5000",
];

type InternshipRegistrationEndpoint =
  | `/api/internship/registration${string}`
  | `/api/autumn-internship/registration${string}`;

type InternshipHttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === "production" || process.env.VERCEL === "1";
}

function isLocalHostname(hostname: string): boolean {
  return (
    hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1"
  );
}

function getConfiguredApiUrl(): string {
  const apiUrl = process.env.API_URL?.trim();
  if (apiUrl) {
    return apiUrl;
  }

  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (publicApiUrl) {
    return publicApiUrl;
  }

  return "";
}

function extractPayloadMessage(payload: unknown): string {
  if (!payload || typeof payload !== "object") {
    return "";
  }

  const record = payload as { message?: unknown; error?: unknown };

  if (typeof record.message === "string") {
    return record.message.trim();
  }

  if (typeof record.error === "string") {
    return record.error.trim();
  }

  return "";
}

function isMissingUpstreamRouteResponse(
  status: number,
  payload: unknown,
  method: InternshipHttpMethod,
): boolean {
  if (status !== 404 && status !== 405) {
    return false;
  }

  const message = extractPayloadMessage(payload).toLowerCase();
  if (!message) {
    return false;
  }

  return message.includes(`cannot ${method.toLowerCase()} `);
}

// The public-facing domain the browser actually hit. This project is
// deployed on more than one domain (a test domain and the production one),
// and `request.url` as seen inside a Next.js route handler can reflect the
// internal container URL rather than what the browser used behind a
// reverse proxy — so prefer the forwarded/host headers, which carry what
// was actually typed into the browser.
function getRequestDomain(request: Request): string | undefined {
  const forwardedHost = request.headers.get("x-forwarded-host");
  if (forwardedHost && forwardedHost.trim()) {
    return forwardedHost.trim();
  }

  const host = request.headers.get("host");
  if (host && host.trim()) {
    return host.trim();
  }

  try {
    return new URL(request.url).hostname || undefined;
  } catch {
    return undefined;
  }
}

function isLoopbackUrl(value: string): boolean {
  if (!value) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return (
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "::1"
    );
  } catch {
    return false;
  }
}

function getBackendBaseUrls(options?: { preferLocal?: boolean }): string[] {
  const envUrl = getConfiguredApiUrl();
  const preferLocal = Boolean(options?.preferLocal);
  const shouldIncludeDevFallback = !isProductionRuntime() || preferLocal;

  const raw = shouldIncludeDevFallback
    ? isLoopbackUrl(envUrl)
      ? [envUrl, ...DEV_FALLBACK_BACKEND_URLS]
      : [envUrl, ...DEV_FALLBACK_BACKEND_URLS]
    : [envUrl];

  const normalized = raw.filter((value): value is string => Boolean(value));
  return [...new Set(normalized.map((value) => value.replace(/\/$/, "")))];
}

type ForwardPayload = {
  body?: BodyInit;
  headers?: Record<string, string>;
};

// ─────────────────────────────────────────────────────────────
// Structured logging — kept permanently (not temp debug logging) so that once
// student registration opens, any payment/registration failure can be traced
// after the fact from the server's console/log stream. Deliberately logs only
// identifying fields (email, order/payment ids, status), never full form data
// (address, DOB, phone, uploaded photo) to avoid dumping unnecessary PII into logs.
// ─────────────────────────────────────────────────────────────

type LogContext = Record<string, string | undefined>;

export function logEvent(
  level: "info" | "warn" | "error",
  message: string,
  context: LogContext = {},
): void {
  const entry = {
    ts: new Date().toISOString(),
    scope: "internship-registration",
    level,
    message,
    ...Object.fromEntries(
      Object.entries(context).filter(([, value]) => value !== undefined && value !== ""),
    ),
  };

  const line = JSON.stringify(entry);

  if (level === "error") {
    console.error(line);
  } else if (level === "warn") {
    console.warn(line);
  } else {
    console.log(line);
  }

  appendLogLine("internship-registration", line);
}

const LOG_FIELD_KEYS = [
  "email",
  "razorpay_order_id",
  "razorpay_payment_id",
  "payment_status",
  "payment_mode",
  "is_lateral",
] as const;

function extractLogContext(payload: ForwardPayload): LogContext {
  const context: LogContext = {};

  if (payload.body instanceof FormData) {
    for (const key of LOG_FIELD_KEYS) {
      const value = payload.body.get(key);
      if (typeof value === "string" && value) {
        context[key] = value;
      }
    }
    return context;
  }

  if (typeof payload.body === "string") {
    try {
      const parsed = JSON.parse(payload.body) as Record<string, unknown>;
      for (const key of LOG_FIELD_KEYS) {
        const value = parsed[key];
        if (typeof value === "string" && value) {
          context[key] = value;
        } else if (typeof value === "boolean") {
          context[key] = String(value);
        }
      }
    } catch {
      // Not JSON (or unparsable) — nothing to extract, not fatal.
    }
  }

  return context;
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength)}…` : value;
}

function parseCookieHeader(raw: string | null): Record<string, string> {
  if (!raw) {
    return {};
  }

  return raw.split(";").reduce<Record<string, string>>((acc, part) => {
    const [key, ...rest] = part.trim().split("=");
    if (!key) {
      return acc;
    }
    acc[key] = decodeURIComponent(rest.join("=") || "");
    return acc;
  }, {});
}

function extractAuthHeader(request: Request): string | null {
  const value = request.headers.get("authorization");
  if (value && value.trim()) {
    return value;
  }

  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const token =
    cookies.adminAuthToken ||
    cookies.userAuthToken ||
    cookies.authToken ||
    "";

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
}

async function parseUpstreamBody(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { message: text };
  }
}

async function parseIncomingJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

async function buildForwardPayload(
  request: Request,
  method: InternshipHttpMethod,
): Promise<ForwardPayload | null> {
  const authHeader = extractAuthHeader(request);

  if (method === "GET" || method === "DELETE") {
    return authHeader ? { headers: { Authorization: authHeader } } : {};
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  if (contentType.includes("application/json")) {
    const body = await parseIncomingJson(request);

    if (!body || typeof body !== "object") {
      return null;
    }

    return {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    };
  }

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return {
      body: formData,
      headers: authHeader ? { Authorization: authHeader } : undefined,
    };
  }

  const rawBody = await request.arrayBuffer();

  const headers: Record<string, string> = {};
  if (contentType) {
    headers["Content-Type"] =
      request.headers.get("content-type") || "application/octet-stream";
  }
  if (authHeader) {
    headers.Authorization = authHeader;
  }

  return {
    body: rawBody.byteLength > 0 ? rawBody : undefined,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  };
}

export async function forwardInternshipRegistrationRequest(
  request: Request,
  endpoint: InternshipRegistrationEndpoint,
  method: InternshipHttpMethod = "POST",
): Promise<NextResponse> {
  let preferLocal = false;
  try {
    const requestUrl = new URL(request.url);
    preferLocal = isLocalHostname(requestUrl.hostname);
  } catch {
    preferLocal = false;
  }

  const backendUrls = getBackendBaseUrls({ preferLocal });

  if (backendUrls.length === 0) {
    logEvent("error", "API_URL is not configured on the server", { endpoint, method });
    return NextResponse.json(
      {
        message:
          "API_URL (or NEXT_PUBLIC_API_URL) is missing on the server. Configure API_URL in deployment environment variables.",
      },
      { status: 500 },
    );
  }

  const payload = await buildForwardPayload(request, method);

  if (payload === null) {
    logEvent("warn", "Rejected request with invalid/unparsable body", { endpoint, method });
    return NextResponse.json(
      { message: "Invalid request body" },
      { status: 400 },
    );
  }

  const logContext = {
    endpoint,
    method,
    domain: getRequestDomain(request),
    ...extractLogContext(payload),
  };
  logEvent("info", "Forwarding request to upstream backend", logContext);

  let lastRetriablePayload: unknown = null;
  let lastRetriableStatus: number | null = null;

  for (const backendUrl of backendUrls) {
    const startedAt = Date.now();

    try {
      const upstreamResponse = await fetch(`${backendUrl}${endpoint}`, {
        method,
        headers: payload.headers,
        body: payload.body,
        cache: "no-store",
      });

      const responsePayload = await parseUpstreamBody(upstreamResponse);
      const durationMs = Date.now() - startedAt;

      if (
        isMissingUpstreamRouteResponse(
          upstreamResponse.status,
          responsePayload,
          method,
        )
      ) {
        logEvent("warn", "Upstream route missing on this backend, trying next", {
          ...logContext,
          backendUrl,
          status: String(upstreamResponse.status),
          durationMs: String(durationMs),
        });
        lastRetriablePayload = responsePayload;
        lastRetriableStatus = upstreamResponse.status;
        continue;
      }

      if ([500, 502, 503, 504].includes(upstreamResponse.status)) {
        logEvent("warn", "Upstream returned a retriable error status", {
          ...logContext,
          backendUrl,
          status: String(upstreamResponse.status),
          durationMs: String(durationMs),
          body: truncate(JSON.stringify(responsePayload), 500),
        });
        lastRetriablePayload = responsePayload;
        lastRetriableStatus = upstreamResponse.status;
        continue;
      }

      const isSuccess = upstreamResponse.status >= 200 && upstreamResponse.status < 300;
      logEvent(isSuccess ? "info" : "warn", "Upstream response received", {
        ...logContext,
        backendUrl,
        status: String(upstreamResponse.status),
        durationMs: String(durationMs),
        // Always capture a preview: cheap, and non-success bodies are exactly
        // what we'll need to diagnose a real student's failed payment later.
        body: truncate(JSON.stringify(responsePayload), 500),
      });

      return NextResponse.json(responsePayload, {
        status: upstreamResponse.status,
      });
    } catch (error) {
      logEvent("error", "Fetch to upstream backend threw (network/DNS/timeout)", {
        ...logContext,
        backendUrl,
        durationMs: String(Date.now() - startedAt),
        error: error instanceof Error ? error.message : String(error),
      });
      continue;
    }
  }

  if (lastRetriableStatus !== null) {
    logEvent("error", "All backends exhausted, returning last retriable error to client", {
      ...logContext,
      status: String(lastRetriableStatus),
    });
    return NextResponse.json(lastRetriablePayload ?? {}, {
      status: lastRetriableStatus,
    });
  }

  logEvent("error", "All backends unreachable, no response could be forwarded", logContext);
  return NextResponse.json(
    { message: "Internship registration service is unavailable" },
    { status: 502 },
  );
}
