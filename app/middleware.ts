import { NextResponse, NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const PROD_HOST = "synklist.com"; // change if you prefer www

// Routes that require authentication
const PROTECTED_ROUTES = ["/dashboard", "/notifications"];

// Routes that should redirect to dashboard if already authenticated
const AUTH_ROUTES = ["/login"];

export const config = {
  matcher: [
    // Match all paths except static files and api routes (except auth-related)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();

  // Create Supabase client for middleware
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session if exists
  const { data: { session } } = await supabase.auth.getSession();

  // Check if current path is protected
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );

  // Check if current path is an auth route
  const isAuthRoute = AUTH_ROUTES.some((route) =>
    url.pathname.startsWith(route)
  );

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("next", url.pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if accessing auth route with active session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Production-only redirects
  if (process.env.NODE_ENV === "production") {
    // Force HTTPS
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
  }

  // Remove trailing slash (except root)
  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.slice(0, -1);
    return NextResponse.redirect(url, 308);
  }

  return response;
}
