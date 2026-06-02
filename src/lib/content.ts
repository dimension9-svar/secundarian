import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  collections,
  timelineMilestones,
  instagramPosts,
  type Collection,
  type TimelineMilestone,
  type InstagramPost,
} from "@/lib/db/schema";
import { getSetting } from "@/lib/settings";

/** Public-facing content readers — only active rows, ordered for display. */

export async function getActiveCollections(): Promise<Collection[]> {
  return db
    .select()
    .from(collections)
    .where(eq(collections.isActive, true))
    .orderBy(asc(collections.sortOrder));
}

export async function getActiveMilestones(): Promise<TimelineMilestone[]> {
  return db
    .select()
    .from(timelineMilestones)
    .where(eq(timelineMilestones.isActive, true))
    .orderBy(asc(timelineMilestones.sortOrder));
}

export async function getActiveInstagramPosts(): Promise<InstagramPost[]> {
  return db
    .select()
    .from(instagramPosts)
    .where(eq(instagramPosts.isActive, true))
    .orderBy(asc(instagramPosts.sortOrder));
}

export async function getPublicSettings(): Promise<{
  contactEmail: string;
  instagramHandle: string;
}> {
  const [contactEmail, instagramHandle] = await Promise.all([
    getSetting("contactEmail"),
    getSetting("instagramHandle"),
  ]);
  return {
    contactEmail: contactEmail ?? "info@secundarian.co.za",
    instagramHandle: instagramHandle ?? "secundarian",
  };
}
