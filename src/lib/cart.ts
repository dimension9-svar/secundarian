import "server-only";
import { cookies } from "next/headers";
import { randomBytes } from "crypto";
import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  carts,
  cartItems,
  productVariants,
  products,
  productImages,
} from "@/lib/db/schema";

export const CART_COOKIE = "secundarian_cart";
const CART_TTL_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

export type CartLine = {
  itemId: string;
  variantId: string;
  productSlug: string;
  title: string;
  size: string | null;
  colour: string | null;
  unitPrice: number; // cents
  quantity: number;
  lineTotal: number; // cents
  stock: number;
  imageUrl: string | null;
  currency: string;
};

export type CartView = {
  lines: CartLine[];
  subtotal: number; // cents
  count: number;
  currency: string;
};

/** Read-only: resolve the current cart from the cookie (no mutation). */
async function findCartId(): Promise<string | null> {
  const token = (await cookies()).get(CART_COOKIE)?.value;
  if (!token) return null;
  const rows = await db
    .select({ id: carts.id })
    .from(carts)
    .where(eq(carts.token, token))
    .limit(1);
  return rows[0]?.id ?? null;
}

/** Mutating: ensure a cart row + cookie exist. Call only from a server action. */
export async function ensureCart(): Promise<string> {
  const jar = await cookies();
  const token = jar.get(CART_COOKIE)?.value;
  if (token) {
    const rows = await db.select({ id: carts.id }).from(carts).where(eq(carts.token, token)).limit(1);
    if (rows[0]) return rows[0].id;
  }
  const newToken = randomBytes(24).toString("base64url");
  const inserted = await db.insert(carts).values({ token: newToken }).returning({ id: carts.id });
  jar.set(CART_COOKIE, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + CART_TTL_MS),
  });
  return inserted[0].id;
}

/** Full cart for display, with live pricing + stock from the catalog. */
export async function getCart(): Promise<CartView> {
  const cartId = await findCartId();
  const empty: CartView = { lines: [], subtotal: 0, count: 0, currency: "ZAR" };
  if (!cartId) return empty;

  const rows = await db
    .select({
      itemId: cartItems.id,
      quantity: cartItems.quantity,
      variantId: productVariants.id,
      size: productVariants.size,
      colour: productVariants.colour,
      priceOverride: productVariants.priceOverride,
      stock: productVariants.stock,
      isActive: productVariants.isActive,
      productId: products.id,
      slug: products.slug,
      title: products.title,
      basePrice: products.basePrice,
      currency: products.currency,
      status: products.status,
    })
    .from(cartItems)
    .innerJoin(productVariants, eq(cartItems.variantId, productVariants.id))
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(eq(cartItems.cartId, cartId));

  const live = rows.filter((r) => r.isActive && r.status === "active");
  const productIds = [...new Set(live.map((r) => r.productId))];
  const imgs = productIds.length
    ? await db
        .select({ productId: productImages.productId, url: productImages.url, sortOrder: productImages.sortOrder })
        .from(productImages)
        .where(inArray(productImages.productId, productIds))
    : [];
  const firstImage = new Map<string, string>();
  for (const img of imgs.sort((a, b) => a.sortOrder - b.sortOrder)) {
    if (!firstImage.has(img.productId)) firstImage.set(img.productId, img.url);
  }

  const lines: CartLine[] = live.map((r) => {
    const unitPrice = r.priceOverride ?? r.basePrice;
    const quantity = Math.min(r.quantity, r.stock);
    return {
      itemId: r.itemId,
      variantId: r.variantId,
      productSlug: r.slug,
      title: r.title,
      size: r.size,
      colour: r.colour,
      unitPrice,
      quantity,
      lineTotal: unitPrice * quantity,
      stock: r.stock,
      imageUrl: firstImage.get(r.productId) ?? null,
      currency: r.currency,
    };
  });

  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const count = lines.reduce((s, l) => s + l.quantity, 0);
  return { lines, subtotal, count, currency: lines[0]?.currency ?? "ZAR" };
}

export async function getCartCount(): Promise<number> {
  const cartId = await findCartId();
  if (!cartId) return 0;
  const items = await db
    .select({ q: cartItems.quantity })
    .from(cartItems)
    .where(eq(cartItems.cartId, cartId));
  return items.reduce((s, i) => s + i.q, 0);
}

/** Internal helper used by cart server actions. */
export async function _cartItemBelongsToCookie(itemId: string): Promise<boolean> {
  const cartId = await findCartId();
  if (!cartId) return false;
  const rows = await db
    .select({ id: cartItems.id })
    .from(cartItems)
    .where(and(eq(cartItems.id, itemId), eq(cartItems.cartId, cartId)))
    .limit(1);
  return rows.length > 0;
}
