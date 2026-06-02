import "dotenv/config";
import { config as loadEnv } from "dotenv";
loadEnv({ path: ".env.local" });

import { eq } from "drizzle-orm";
import { db } from "./index";
import {
  users,
  collections,
  timelineMilestones,
  siteSettings,
} from "./schema";
import { hashPassword } from "../auth/password";
import { encryptSecret } from "../crypto";

/**
 * Idempotent seed. Run with:
 *   ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run db:seed
 * Re-running never resets an existing admin's password.
 */
async function seed() {
  const email = (process.env.ADMIN_EMAIL ?? "info@secundarian.co.za").toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  // --- Admin user (create-only; never overwrite an existing password) ---
  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length === 0) {
    if (!password) {
      throw new Error(
        "ADMIN_PASSWORD env is required to create the initial admin user.",
      );
    }
    await db.insert(users).values({
      email,
      passwordHash: await hashPassword(password),
      name: "Secundarian Admin",
      role: "admin",
    });
    console.log(`✓ Created admin user: ${email}`);
  } else {
    console.log(`• Admin user already exists: ${email} (password untouched)`);
  }

  // --- Default site settings (insert-if-missing) ---
  const defaults: Array<{ key: string; value: string; isSecret: boolean }> = [
    { key: "contactEmail", value: "info@secundarian.co.za", isSecret: false },
    { key: "instagramHandle", value: "secundarian", isSecret: false },
    { key: "commerceProvider", value: "none", isSecret: false },
  ];
  for (const d of defaults) {
    await db
      .insert(siteSettings)
      .values({
        key: d.key,
        value: d.isSecret ? encryptSecret(d.value) : d.value,
        isSecret: d.isSecret,
      })
      .onConflictDoNothing({ target: siteSettings.key });
  }
  console.log("✓ Seeded default site settings");

  // --- Collections (the real product lines) ---
  const cols = [
    { slug: "foundation", title: "Foundation", subtitle: "Oversized Tee", color: "#2C2C2C", accent: "#8B7355", sortOrder: 0 },
    { slug: "forge", title: "Forge", subtitle: "Shirts", color: "#1A1612", accent: "#C4A265", sortOrder: 1 },
    { slug: "meridian", title: "Meridian", subtitle: "Cargo Pants", color: "#2A2520", accent: "#A69378", sortOrder: 2 },
    { slug: "sable", title: "Sable", subtitle: "Beanies", color: "#1E1E1E", accent: "#9B8B7A", sortOrder: 3 },
  ];
  for (const c of cols) {
    await db.insert(collections).values(c).onConflictDoNothing({ target: collections.slug });
  }
  console.log(`✓ Seeded ${cols.length} collections`);

  // --- Timeline milestones (the real brand story) ---
  const milestones = [
    { year: "2021", title: "The Beginning", subtitle: "Four Colours, One Hometown", sortOrder: 0,
      description: "Like every great story, Secundarian started small. The journey began with a simple collection of T-shirts in a few colours and sizes — clean, authentic, and true to its roots." },
    { year: "2023", title: "The Range Grows", subtitle: "Bucket Hats to Trucker Caps", sortOrder: 1,
      description: "Bucket hats came next, followed by hoodies and sweaters for the colder seasons. Then came the trucker caps — an instant favourite that sold fast and gave the brand real momentum." },
    { year: "2025", title: "The Cape Town Pivot", subtitle: "A Conversation That Changed Everything", sortOrder: 2,
      description: "During a conversation with friends in the Mother City, the topic turned to everything people hated about existing clothing brands. Then one suggestion changed the direction of Secundarian: “Why not take it into workwear — but make it fashion meets workwear, not PPE?” That was the shift." },
    { year: "2026", title: "The Relaunch", subtitle: "Same Name, New Identity", sortOrder: 3,
      description: "Secundarian re-emerges with a new logo — inspired by the cooling towers that define Secunda's skyline — and a redefined mission: fashion-forward workwear rooted in hometown pride. Everything else levels up." },
  ];
  for (const m of milestones) {
    const found = await db
      .select({ id: timelineMilestones.id })
      .from(timelineMilestones)
      .where(eq(timelineMilestones.year, m.year))
      .limit(1);
    if (found.length === 0) {
      await db.insert(timelineMilestones).values(m);
    }
  }
  console.log(`✓ Seeded ${milestones.length} timeline milestones`);

  console.log("\nSeed complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
