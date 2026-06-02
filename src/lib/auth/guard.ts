import "server-only";
import { redirect } from "next/navigation";
import { getSession, type SessionContext } from "./session";

/**
 * Authoritative gate for admin pages and server actions. This is the real
 * authorization boundary — middleware is only a UX convenience and is NOT
 * trusted (cf. Next.js middleware-bypass advisories).
 */
export async function requireSession(): Promise<SessionContext> {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}
