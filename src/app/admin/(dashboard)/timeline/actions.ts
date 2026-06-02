"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { timelineMilestones } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";

export type CrudState = { ok?: boolean; error?: string };

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin/timeline");
}

export async function createMilestone(_prev: CrudState, formData: FormData): Promise<CrudState> {
  await requireAdmin();
  const year = String(formData.get("year") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!year || !title || !description) {
    return { error: "Year, title and description are required." };
  }
  const max = await db.$count(timelineMilestones);
  await db.insert(timelineMilestones).values({
    year,
    title,
    subtitle: String(formData.get("subtitle") ?? "").trim() || null,
    description,
    sortOrder: max,
  });
  refresh();
  return { ok: true };
}

export async function updateMilestone(_prev: CrudState, formData: FormData): Promise<CrudState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id." };
  const year = String(formData.get("year") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!year || !title || !description) {
    return { error: "Year, title and description are required." };
  }
  await db
    .update(timelineMilestones)
    .set({
      year,
      title,
      subtitle: String(formData.get("subtitle") ?? "").trim() || null,
      description,
      sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
      isActive: formData.get("isActive") === "on",
      updatedAt: new Date(),
    })
    .where(eq(timelineMilestones.id, id));
  refresh();
  return { ok: true };
}

export async function deleteMilestone(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await db.delete(timelineMilestones).where(eq(timelineMilestones.id, id));
  refresh();
}
