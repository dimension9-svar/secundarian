import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";

/**
 * Admin operators who can sign into /admin.
 * Passwords are never stored in plaintext — only a scrypt hash (see lib/auth/password).
 */
export const adminUsers = pgTable("admin_users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/**
 * Server-side, revocable sessions. The cookie carries an opaque random token;
 * we persist only its SHA-256 hash, so a DB leak can't be replayed as a cookie.
 */
export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => adminUsers.id, { onDelete: "cascade" }),
    tokenHash: text("token_hash").notNull().unique(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("sessions_user_id_idx").on(t.userId)],
);

/**
 * Singleton-style key/value store for global site configuration:
 * contact email, Instagram handle/token, commerce provider + config, hero copy, etc.
 * Sensitive values (tokens, API secrets) are stored AES-256-GCM encrypted (see lib/crypto).
 */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value"),
  isSecret: boolean("is_secret").notNull().default(false),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Product collections shown in the Collections grid. */
export const collections = pgTable("collections", {
  id: uuid("id").defaultRandom().primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  color: text("color").notNull().default("#1E1E1E"),
  accent: text("accent").notNull().default("#8B7355"),
  imageUrl: text("image_url"),
  productUrl: text("product_url"),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Brand-story milestones in the "Our Journey" timeline. */
export const timelineMilestones = pgTable("timeline_milestones", {
  id: uuid("id").defaultRandom().primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Curated Instagram feed tiles (manual today; Graph-API sync optional later). */
export const instagramPosts = pgTable("instagram_posts", {
  id: uuid("id").defaultRandom().primaryKey(),
  imageUrl: text("image_url"),
  caption: text("caption"),
  permalink: text("permalink"),
  // populated when synced from the Graph API; null for manually-added tiles
  externalId: text("external_id").unique(),
  sortOrder: integer("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Newsletter / early-access signups captured from the public CTA. */
export const subscribers = pgTable("subscribers", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  source: text("source").notNull().default("cta"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type AdminUser = typeof adminUsers.$inferSelect;
export type Session = typeof sessions.$inferSelect;
export type Collection = typeof collections.$inferSelect;
export type TimelineMilestone = typeof timelineMilestones.$inferSelect;
export type InstagramPost = typeof instagramPosts.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
