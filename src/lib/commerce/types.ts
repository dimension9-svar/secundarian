/**
 * Storefront-agnostic commerce contract. The brand hasn't committed to a
 * platform yet (WooCommerce vs Shopify — TBD), so the rest of the app depends
 * only on this interface. Swapping providers is a config change, not a rewrite.
 */

export type CommerceProviderId = "none" | "woocommerce" | "shopify";

export type Product = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  priceFormatted?: string;
  imageUrl?: string;
  url?: string;
  available: boolean;
};

export type CommerceConfig = {
  provider: CommerceProviderId;
  storeUrl?: string | null;
  apiKey?: string | null;
  apiSecret?: string | null;
};

export interface CommerceProvider {
  readonly id: CommerceProviderId;
  /** True when enough config is present to talk to the store. */
  isConfigured(): boolean;
  /** Storefront URL to send shoppers to (cart/collection/home). */
  storefrontUrl(): string | null;
  /** Fetch products for the landing page. Returns [] when not configured. */
  listProducts(limit?: number): Promise<Product[]>;
  /** Lightweight connectivity/credential check for the admin panel. */
  healthCheck(): Promise<{ ok: boolean; message: string }>;
}
