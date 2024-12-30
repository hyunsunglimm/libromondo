import { handlers } from "@/auth";
import { naverFetchInterceptor } from "@/utils/interceptor";
import { NextRequest } from "next/server";

const { GET: AuthGET, POST: AuthPOST } = handlers;

const originalFetch = fetch;

export async function POST(req: NextRequest) {
  return await AuthPOST(req);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  if (url.pathname === "/api/auth/callback/naver") {
    global.fetch = naverFetchInterceptor(originalFetch);
    const response = await AuthGET(req);
    global.fetch = originalFetch;
    return response;
  }
  return await AuthGET(req);
}
