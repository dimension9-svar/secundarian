"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { hashPassword, verifyPassword } from "./password";
import { createSession, destroySession } from "./session";

export type AccountState = { error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function startSession(userId: string) {
  const hdrs = await headers();
  await createSession(userId, {
    ip: hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null,
    userAgent: hdrs.get("user-agent"),
  });
}

export async function registerAction(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name) return { error: "Enter your name." };
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  if (existing.length > 0) {
    return { error: "An account with that email already exists." };
  }

  const inserted = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash: await hashPassword(password),
      role: "customer",
    })
    .returning({ id: users.id });

  await startSession(inserted[0].id);
  redirect("/account");
}

export async function customerLoginAction(
  _prev: AccountState,
  formData: FormData,
): Promise<AccountState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const rows = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  const user = rows[0];

  const ok =
    user && user.isActive
      ? await verifyPassword(password, user.passwordHash)
      : await verifyPassword(password, "scrypt$16384$8$1$AAAA$AAAA");
  if (!user || !user.isActive || !ok) {
    return { error: "Invalid email or password." };
  }

  await db
    .update(users)
    .set({ lastLoginAt: new Date() })
    .where(eq(users.id, user.id));
  await startSession(user.id);
  redirect("/account");
}

export async function customerLogoutAction(): Promise<void> {
  await destroySession();
  redirect("/account/login");
}
