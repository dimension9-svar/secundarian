"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/guard";
import { setSetting, getSetting } from "@/lib/settings";
import { getCommerce } from "@/lib/commerce";
import type { CommerceProviderId } from "@/lib/commerce";

export type StoreState = { ok?: boolean; error?: string };

const VALID: CommerceProviderId[] = ["none", "woocommerce", "shopify"];

export async function saveStoreSettings(
  _prev: StoreState,
  formData: FormData,
): Promise<StoreState> {
  await requireAdmin();

  const provider = String(formData.get("provider") ?? "none") as CommerceProviderId;
  if (!VALID.includes(provider)) return { error: "Unknown provider." };

  const storeUrl = String(formData.get("storeUrl") ?? "").trim();
  const apiKey = String(formData.get("apiKey") ?? "").trim();
  const apiSecret = String(formData.get("apiSecret") ?? "").trim();

  await setSetting("commerceProvider", provider);
  await setSetting("commerceStoreUrl", storeUrl || null);
  // Empty secret field = leave existing secret untouched (masked UX).
  if (apiKey) await setSetting("commerceApiKey", apiKey);
  if (apiSecret) await setSetting("commerceApiSecret", apiSecret);

  revalidatePath("/");
  revalidatePath("/admin/store");
  return { ok: true };
}

export async function testStoreConnection(): Promise<{ ok: boolean; message: string }> {
  await requireAdmin();
  const commerce = await getCommerce();
  return commerce.healthCheck();
}

export async function getStoreConfigSummary() {
  await requireAdmin();
  const [provider, storeUrl] = await Promise.all([
    getSetting("commerceProvider"),
    getSetting("commerceStoreUrl"),
  ]);
  return { provider: provider ?? "none", storeUrl: storeUrl ?? "" };
}
