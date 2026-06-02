import "server-only";
import { redirect } from "next/navigation";
import { getSession, type SessionContext } from "./session";
import type { Role } from "@/lib/db/schema";

/**
 * Authoritative gates for pages and server actions. These are the real
 * authorization boundary — middleware is only a UX convenience and is NOT
 * trusted (cf. Next.js middleware-bypass advisories).
 */

/** Any authenticated user (any role). */
export async function requireSession(): Promise<SessionContext> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

/** Staff console access — admin or staff only. Customers are bounced. */
export async function requireAdmin(
  roles: Role[] = ["admin", "staff"],
): Promise<SessionContext> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  if (!roles.includes(session.user.role)) redirect("/account");
  return session;
}

/** Customer area access — must be signed in (any role can view their account). */
export async function requireCustomer(): Promise<SessionContext> {
  const session = await getSession();
  if (!session) redirect("/account/login");
  return session;
}

/** Non-redirecting read — for conditional UI (nav, etc.). */
export async function getOptionalUser(): Promise<SessionContext | null> {
  return getSession();
}
