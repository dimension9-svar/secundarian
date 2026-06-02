import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/session";

/**
 * UX-only redirects based on cookie presence. This is NOT an authorization
 * check — every protected page and server action independently verifies the
 * session (and role) server-side via the auth guards (defense in depth against
 * middleware-bypass classes). Middleware cannot read the DB, so it never
 * enforces roles.
 */
const PUBLIC_AUTH_PATHS = new Set([
  "/admin/login",
  "/account/login",
  "/account/register",
]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  // Auth screens: signed-in users skip them.
  if (PUBLIC_AUTH_PATHS.has(pathname)) {
    if (hasCookie) {
      const dest = pathname.startsWith("/admin") ? "/admin" : "/account";
      return NextResponse.redirect(new URL(dest, req.url));
    }
    return NextResponse.next();
  }

  // Protected areas: anonymous visitors are bounced to the right login.
  if (!hasCookie) {
    const loginPath = pathname.startsWith("/admin")
      ? "/admin/login"
      : "/account/login";
    return NextResponse.redirect(new URL(loginPath, req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/account/:path*"],
};
