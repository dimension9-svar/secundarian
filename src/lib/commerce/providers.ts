import "server-only";
import type {
  CommerceConfig,
  CommerceProvider,
  Product,
} from "./types";

/** Default provider — store not yet wired. Keeps the app fully functional. */
class NoneProvider implements CommerceProvider {
  readonly id = "none" as const;
  isConfigured() {
    return false;
  }
  storefrontUrl() {
    return null;
  }
  async listProducts(): Promise<Product[]> {
    return [];
  }
  async healthCheck() {
    return { ok: false, message: "No commerce provider configured yet." };
  }
}

/**
 * WooCommerce REST API (v3). Auth via consumer key/secret (HTTP Basic over TLS).
 * Docs: /wp-json/wc/v3/products
 */
class WooCommerceProvider implements CommerceProvider {
  readonly id = "woocommerce" as const;
  constructor(private cfg: CommerceConfig) {}

  isConfigured() {
    return Boolean(this.cfg.storeUrl && this.cfg.apiKey && this.cfg.apiSecret);
  }
  storefrontUrl() {
    return this.cfg.storeUrl ?? null;
  }

  private authHeader() {
    const token = Buffer.from(
      `${this.cfg.apiKey}:${this.cfg.apiSecret}`,
    ).toString("base64");
    return `Basic ${token}`;
  }

  async listProducts(limit = 8): Promise<Product[]> {
    if (!this.isConfigured()) return [];
    const base = this.cfg.storeUrl!.replace(/\/$/, "");
    const res = await fetch(
      `${base}/wp-json/wc/v3/products?per_page=${limit}&status=publish`,
      { headers: { Authorization: this.authHeader() }, next: { revalidate: 300 } },
    );
    if (!res.ok) return [];
    const data = (await res.json()) as Array<Record<string, unknown>>;
    return data.map((p) => ({
      id: String(p.id),
      title: String(p.name ?? ""),
      handle: String(p.slug ?? ""),
      description: typeof p.short_description === "string" ? p.short_description : undefined,
      priceFormatted: p.price ? String(p.price) : undefined,
      imageUrl:
        Array.isArray(p.images) && p.images[0] && typeof p.images[0] === "object"
          ? String((p.images[0] as Record<string, unknown>).src ?? "")
          : undefined,
      url: typeof p.permalink === "string" ? p.permalink : undefined,
      available: p.stock_status === "instock",
    }));
  }

  async healthCheck() {
    if (!this.isConfigured()) {
      return { ok: false, message: "Store URL and API key/secret required." };
    }
    try {
      const base = this.cfg.storeUrl!.replace(/\/$/, "");
      const res = await fetch(`${base}/wp-json/wc/v3/products?per_page=1`, {
        headers: { Authorization: this.authHeader() },
        cache: "no-store",
      });
      return res.ok
        ? { ok: true, message: "Connected to WooCommerce." }
        : { ok: false, message: `WooCommerce responded ${res.status}.` };
    } catch (e) {
      return { ok: false, message: `Connection failed: ${(e as Error).message}` };
    }
  }
}

/**
 * Shopify Storefront API (GraphQL). Auth via Storefront access token.
 * apiKey holds the Storefront access token; storeUrl is the *.myshopify.com domain.
 */
class ShopifyProvider implements CommerceProvider {
  readonly id = "shopify" as const;
  constructor(private cfg: CommerceConfig) {}

  isConfigured() {
    return Boolean(this.cfg.storeUrl && this.cfg.apiKey);
  }
  storefrontUrl() {
    return this.cfg.storeUrl ?? null;
  }

  private endpoint() {
    const domain = this.cfg.storeUrl!.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${domain}/api/2024-10/graphql.json`;
  }

  async listProducts(limit = 8): Promise<Product[]> {
    if (!this.isConfigured()) return [];
    const query = `{ products(first: ${limit}) { edges { node {
      id title handle availableForSale
      featuredImage { url }
      priceRange { minVariantPrice { amount currencyCode } }
    } } } }`;
    const res = await fetch(this.endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": this.cfg.apiKey!,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as {
      data?: { products?: { edges?: Array<{ node: Record<string, unknown> }> } };
    };
    const edges = json.data?.products?.edges ?? [];
    return edges.map(({ node }) => {
      const price = node.priceRange as
        | { minVariantPrice?: { amount?: string; currencyCode?: string } }
        | undefined;
      const img = node.featuredImage as { url?: string } | undefined;
      return {
        id: String(node.id),
        title: String(node.title ?? ""),
        handle: String(node.handle ?? ""),
        priceFormatted: price?.minVariantPrice
          ? `${price.minVariantPrice.amount} ${price.minVariantPrice.currencyCode}`
          : undefined,
        imageUrl: img?.url,
        available: Boolean(node.availableForSale),
      };
    });
  }

  async healthCheck() {
    if (!this.isConfigured()) {
      return { ok: false, message: "Store domain and Storefront token required." };
    }
    try {
      const res = await fetch(this.endpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Shopify-Storefront-Access-Token": this.cfg.apiKey!,
        },
        body: JSON.stringify({ query: "{ shop { name } }" }),
        cache: "no-store",
      });
      return res.ok
        ? { ok: true, message: "Connected to Shopify." }
        : { ok: false, message: `Shopify responded ${res.status}.` };
    } catch (e) {
      return { ok: false, message: `Connection failed: ${(e as Error).message}` };
    }
  }
}

export function createProvider(cfg: CommerceConfig): CommerceProvider {
  switch (cfg.provider) {
    case "woocommerce":
      return new WooCommerceProvider(cfg);
    case "shopify":
      return new ShopifyProvider(cfg);
    default:
      return new NoneProvider();
  }
}
