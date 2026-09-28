import { forwardInstitutionalRegistrationRequest } from "@/app/api/institutional-registration/_proxy";

const INSTITUTIONAL_REGISTRATION_ENDPOINT = "/api/institutional-registration";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const qs = url.searchParams.toString();
  const endpoint = `${INSTITUTIONAL_REGISTRATION_ENDPOINT}${qs ? `?${qs}` : ""}` as typeof INSTITUTIONAL_REGISTRATION_ENDPOINT;
  return forwardInstitutionalRegistrationRequest(
    request,
    endpoint,
    "GET",
  );
}

export async function POST(request: Request) {
  return forwardInstitutionalRegistrationRequest(
    request,
    INSTITUTIONAL_REGISTRATION_ENDPOINT,
    "POST",
  );
}
