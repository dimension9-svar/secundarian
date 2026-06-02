"use server";

import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

export type SubscribeState = { ok?: boolean; error?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return { error: "Enter a valid email address." };
  }
  // Idempotent — re-subscribing is a no-op, never an error to the visitor.
  await db
    .insert(subscribers)
    .values({ email, source: "cta" })
    .onConflictDoNothing({ target: subscribers.email });
  return { ok: true };
}
