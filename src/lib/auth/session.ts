import "server-only";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { eq, lt } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, sessions, type User, type Role } from "@/lib/db/schema";

export const SESSION_COOKIE = "secundarian_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export type SessionUser = Pick<User, "id" | "email" | "name"> & { role: Role };

export type SessionContext = {
  user: SessionUser;
  sessionId: string;
};

/**
 * Create a session row and set the HTTP-only cookie. Returns the raw token
 * (only the hash is persisted). Cookie is Secure + SameSite=Lax + HttpOnly.
 */
export async function createSession(
  userId: string,
  meta: { ip?: string | null; userAgent?: string | null } = {},
): Promise<void> {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);

  await db.insert(sessions).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt,
    ipAddress: meta.ip ?? null,
    userAgent: meta.userAgent ?? null,
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/**
 * Authoritative auth check — used by every admin page and server action.
 * Never relies on middleware. Returns null if unauthenticated/expired.
 */
export async function getSession(): Promise<SessionContext | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const rows = await db
    .select({
      sessionId: sessions.id,
      expiresAt: sessions.expiresAt,
      userId: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      isActive: users.isActive,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.tokenHash, hashToken(token)))
    .limit(1);

  const row = rows[0];
  if (!row) return null;
  if (!row.isActive) return null;
  if (row.expiresAt.getTime() < Date.now()) {
    await db.delete(sessions).where(eq(sessions.id, row.sessionId));
    return null;
  }

  return {
    user: {
      id: row.userId,
      email: row.email,
      name: row.name,
      role: row.role as Role,
    },
    sessionId: row.sessionId,
  };
}

export async function destroySession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) {
    await db.delete(sessions).where(eq(sessions.tokenHash, hashToken(token)));
  }
  jar.delete(SESSION_COOKIE);
}

/** Opportunistic cleanup of expired sessions. */
export async function purgeExpiredSessions(): Promise<void> {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
}
