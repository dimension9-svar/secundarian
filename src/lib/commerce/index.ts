import "server-only";
import { getSetting } from "@/lib/settings";
import { createProvider } from "./providers";
import type { CommerceProvider, CommerceProviderId } from "./types";

export type { CommerceProvider, Product, CommerceProviderId } from "./types";

/** Build the active commerce provider from stored site settings. */
export async function getCommerce(): Promise<CommerceProvider> {
  const provider =
    ((await getSetting("commerceProvider")) as CommerceProviderId | null) ??
    "none";
  const [storeUrl, apiKey, apiSecret] = await Promise.all([
    getSetting("commerceStoreUrl"),
    getSetting("commerceApiKey"),
    getSetting("commerceApiSecret"),
  ]);
  return createProvider({ provider, storeUrl, apiKey, apiSecret });
}
