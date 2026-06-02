"use server";

import { revalidatePath } from "next/cache";
import { requireSession } from "@/lib/auth/guard";
import { setSetting } from "@/lib/settings";

export type SaveState = { ok?: boolean; error?: string };

export async function saveGeneralSettings(
  _prev: SaveState,
  formData: FormData,
): Promise<SaveState> {
  await requireSession();

  const contactEmail = String(formData.get("contactEmail") ?? "").trim();
  const instagramHandle = String(formData.get("instagramHandle") ?? "")
    .trim()
    .replace(/^@/, "");

  if (contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail)) {
    return { error: "Enter a valid contact email." };
  }

  await setSetting("contactEmail", contactEmail || null);
  await setSetting("instagramHandle", instagramHandle || null);

  revalidatePath("/");
  revalidatePath("/admin/settings");
  return { ok: true };
}
