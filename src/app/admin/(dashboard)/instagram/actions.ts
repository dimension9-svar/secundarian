"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { instagramPosts } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";
import { setSetting } from "@/lib/settings";

export type CrudState = { ok?: boolean; error?: string };

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/instagram");
}

export async function createPost(_prev: CrudState, formData: FormData): Promise<CrudState> {
  await requireAdmin();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  if (!imageUrl) return { error: "Image URL is required." };
  const max = await db.$count(instagramPosts);
  await db.insert(instagramPosts).values({
    imageUrl,
    caption: String(formData.get("caption") ?? "").trim() || null,
    permalink: String(formData.get("permalink") ?? "").trim() || null,
    sortOrder: max,
  });
  refresh();
  return { ok: true };
}

export async function updatePost(_prev: CrudState, formData: FormData): Promise<CrudState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id." };
  await db
    .update(instagramPosts)
    .set({
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
      caption: String(formData.get("caption") ?? "").trim() || null,
      permalink: String(formData.get("permalink") ?? "").trim() || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
      isActive: formData.get("isActive") === "on",
      updatedAt: new Date(),
    })
    .where(eq(instagramPosts.id, id));
  refresh();
  return { ok: true };
}

export async function deletePost(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await db.delete(instagramPosts).where(eq(instagramPosts.id, id));
  refresh();
}

export async function saveInstagramConnection(
  _prev: CrudState,
  formData: FormData,
): Promise<CrudState> {
  await requireAdmin();
  const businessId = String(formData.get("businessId") ?? "").trim();
  const token = String(formData.get("graphToken") ?? "").trim();
  await setSetting("instagramBusinessId", businessId || null);
  // Empty token = keep existing (masked UX).
  if (token) await setSetting("instagramGraphToken", token);
  revalidatePath("/admin/instagram");
  return { ok: true };
}
