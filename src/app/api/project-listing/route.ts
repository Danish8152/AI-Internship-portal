import { forwardProjectListingRequest } from "@/app/api/project-listing/_proxy";

export async function POST(request: Request) {
  return forwardProjectListingRequest(request, "/api/project-listing/submit", "POST");
}
