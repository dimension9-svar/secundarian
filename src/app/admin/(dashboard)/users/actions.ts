"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { users, ROLES, type Role } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";
import { hashPassword } from "@/lib/auth/password";

export type UserState = { ok?: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Only full admins manage accounts (staff cannot escalate privileges).
function onlyAdmin() {
  return requireAdmin(["admin"]);
}

export async function createStaff(_prev: UserState, formData: FormData): Promise<UserState> {
  await onlyAdmin();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = String(formData.get("role") ?? "staff") as Role;

  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email." };
  if (password.length < 8) return { error: "Password must be at least 8 characters." };
  if (role !== "admin" && role !== "staff") return { error: "Invalid role." };

  const existing = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) return { error: "A user with that email already exists." };

  await db.insert(users).values({
    name: name || null,
    email,
    passwordHash: await hashPassword(password),
    role,
  });
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function updateUserRole(_prev: UserState, formData: FormData): Promise<UserState> {
  const session = await onlyAdmin();
  const id = String(formData.get("id") ?? "");
  const role = String(formData.get("role") ?? "") as Role;
  if (!ROLES.includes(role)) return { error: "Invalid role." };
  if (id === session.user.id && role !== "admin") {
    return { error: "You can't remove your own admin access." };
  }
  await db.update(users).set({ role, updatedAt: new Date() }).where(eq(users.id, id));
  revalidatePath("/admin/users");
  return { ok: true };
}

export async function setUserActive(formData: FormData): Promise<void> {
  const session = await onlyAdmin();
  const id = String(formData.get("id") ?? "");
  const active = formData.get("active") === "true";
  // Never let an admin lock themselves out.
  if (id === session.user.id && !active) return;
  await db.update(users).set({ isActive: active, updatedAt: new Date() }).where(eq(users.id, id));
  revalidatePath("/admin/users");
}
