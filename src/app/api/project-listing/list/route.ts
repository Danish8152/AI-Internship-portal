import { forwardProjectListingRequest } from "@/app/api/project-listing/_proxy";

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  return forwardProjectListingRequest(
    request,
    `/api/project-listing/list${incomingUrl.search}`,
    "GET",
  );
}
