import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE } from "@/lib/auth/session";

/**
 * UX-only redirect: bounce anonymous visitors away from /admin/* to the login
 * screen based on cookie presence. This is NOT an authorization check — every
 * admin page and server action independently verifies the session server-side
 * via requireSession() (defense in depth against middleware-bypass classes).
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasCookie = Boolean(req.cookies.get(SESSION_COOKIE)?.value);

  if (pathname === "/admin/login") {
    if (hasCookie) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return NextResponse.next();
  }

  if (!hasCookie) {
    const url = new URL("/admin/login", req.url);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
