"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { verifyPassword } from "./password";
import { createSession, destroySession, getSession } from "./session";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const rows = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email))
    .limit(1);
  const user = rows[0];

  // Constant-ish work whether or not the user exists; generic error either way.
  const ok =
    user && user.isActive
      ? await verifyPassword(password, user.passwordHash)
      : await verifyPassword(password, "scrypt$16384$8$1$AAAA$AAAA");

  if (!user || !user.isActive || !ok) {
    return { error: "Invalid email or password." };
  }

  const hdrs = await headers();
  await createSession(user.id, {
    ip: hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: hdrs.get("user-agent"),
  });
  await db
    .update(adminUsers)
    .set({ lastLoginAt: new Date() })
    .where(eq(adminUsers.id, user.id));

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/admin/login");
}

/** For client components that need to know if a session is live. */
export async function currentUserEmail(): Promise<string | null> {
  const session = await getSession();
  return session?.user.email ?? null;
}
