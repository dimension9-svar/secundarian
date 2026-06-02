import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { siteSettings } from "@/lib/db/schema";
import { encryptSecret, decryptSecret } from "@/lib/crypto";

/**
 * Typed access to the site_settings key/value store. Secret values are stored
 * AES-256-GCM encrypted; callers read/write plaintext and the encryption is
 * handled here transparently.
 */

export const SETTING_KEYS = {
  contactEmail: { secret: false },
  instagramHandle: { secret: false },
  instagramGraphToken: { secret: true },
  instagramBusinessId: { secret: false },
  commerceProvider: { secret: false }, // "none" | "woocommerce" | "shopify"
  commerceStoreUrl: { secret: false },
  commerceApiKey: { secret: true },
  commerceApiSecret: { secret: true },
} as const;

export type SettingKey = keyof typeof SETTING_KEYS;

export async function getSetting(key: SettingKey): Promise<string | null> {
  const rows = await db
    .select()
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  const row = rows[0];
  if (!row || row.value == null) return null;
  const raw = row.value as unknown as string;
  if (row.isSecret && typeof raw === "string" && raw.length > 0) {
    try {
      return decryptSecret(raw);
    } catch {
      return null;
    }
  }
  return typeof raw === "string" ? raw : String(raw);
}

export async function getSettings(): Promise<Record<SettingKey, string | null>> {
  const entries = await Promise.all(
    (Object.keys(SETTING_KEYS) as SettingKey[]).map(
      async (k) => [k, await getSetting(k)] as const,
    ),
  );
  return Object.fromEntries(entries) as Record<SettingKey, string | null>;
}

export async function setSetting(
  key: SettingKey,
  value: string | null,
): Promise<void> {
  const isSecret = SETTING_KEYS[key].secret;
  const stored =
    value == null || value === ""
      ? null
      : isSecret
        ? encryptSecret(value)
        : value;

  await db
    .insert(siteSettings)
    .values({ key, value: stored, isSecret, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: stored, isSecret, updatedAt: new Date() },
    });
}

/** Whether a secret is set, without revealing it (for masked UI display). */
export async function isSecretSet(key: SettingKey): Promise<boolean> {
  const rows = await db
    .select({ value: siteSettings.value })
    .from(siteSettings)
    .where(eq(siteSettings.key, key))
    .limit(1);
  return Boolean(rows[0]?.value);
}
