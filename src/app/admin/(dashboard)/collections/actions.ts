"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { collections } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";

export type CrudState = { ok?: boolean; error?: string };

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/collections");
}

export async function createCollection(_prev: CrudState, formData: FormData): Promise<CrudState> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  if (!slug) return { error: "Could not derive a slug from the title." };

  const max = await db.$count(collections);
  try {
    await db.insert(collections).values({
      slug,
      title,
      subtitle: String(formData.get("subtitle") ?? "").trim() || null,
      color: String(formData.get("color") ?? "#1E1E1E").trim(),
      accent: String(formData.get("accent") ?? "#8B7355").trim(),
      productUrl: String(formData.get("productUrl") ?? "").trim() || null,
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
      sortOrder: max,
    });
  } catch {
    return { error: `A collection with slug "${slug}" already exists.` };
  }
  refresh();
  return { ok: true };
}

export async function updateCollection(_prev: CrudState, formData: FormData): Promise<CrudState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id." };
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };

  await db
    .update(collections)
    .set({
      title,
      subtitle: String(formData.get("subtitle") ?? "").trim() || null,
      color: String(formData.get("color") ?? "#1E1E1E").trim(),
      accent: String(formData.get("accent") ?? "#8B7355").trim(),
      productUrl: String(formData.get("productUrl") ?? "").trim() || null,
      imageUrl: String(formData.get("imageUrl") ?? "").trim() || null,
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
      isActive: formData.get("isActive") === "on",
      updatedAt: new Date(),
    })
    .where(eq(collections.id, id));
  refresh();
  return { ok: true };
}

export async function deleteCollection(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await db.delete(collections).where(eq(collections.id, id));
  refresh();
}
