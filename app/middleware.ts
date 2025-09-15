import { NextResponse, NextRequest } from "next/server";

const PROD_HOST = "synklist.com"; // change if you prefer www
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"], // pages only
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Force HTTPS (mostly for self-host; Vercel handles this already)
  const proto = req.headers.get("x-forwarded-proto");
  if (proto && proto !== "https") {
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  // Canonical host: force apex (no www)
  if (url.hostname === `www.${PROD_HOST}`) {
    url.hostname = PROD_HOST;
    return NextResponse.redirect(url, 308);
  }

  // Remove trailing slash (except root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}
