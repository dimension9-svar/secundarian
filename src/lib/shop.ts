import { and, asc, eq, inArray } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  products,
  productVariants,
  productImages,
  type ProductImage,
} from "@/lib/db/schema";

export type ShopCard = {
  id: string;
  slug: string;
  title: string;
  price: number; // cents — lowest available
  currency: string;
  imageUrl: string | null;
  inStock: boolean;
};

export async function getShopProducts(): Promise<ShopCard[]> {
  const rows = await db
    .select()
    .from(products)
    .where(eq(products.status, "active"))
    .orderBy(asc(products.sortOrder), asc(products.title));
  if (rows.length === 0) return [];

  const ids = rows.map((p) => p.id);
  const [variants, images] = await Promise.all([
    db.select().from(productVariants).where(and(inArray(productVariants.productId, ids), eq(productVariants.isActive, true))),
    db.select().from(productImages).where(inArray(productImages.productId, ids)).orderBy(asc(productImages.sortOrder)),
  ]);

  const firstImage = new Map<string, string>();
  for (const img of images) if (!firstImage.has(img.productId)) firstImage.set(img.productId, img.url);

  return rows.map((p) => {
    const vs = variants.filter((v) => v.productId === p.id);
    const prices = vs.map((v) => v.priceOverride ?? p.basePrice);
    const minPrice = prices.length ? Math.min(...prices) : p.basePrice;
    const inStock = vs.some((v) => v.stock > 0);
    return {
      id: p.id,
      slug: p.slug,
      title: p.title,
      price: minPrice,
      currency: p.currency,
      imageUrl: firstImage.get(p.id) ?? null,
      inStock,
    };
  });
}

export type ProductDetail = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  basePrice: number;
  currency: string;
  images: Pick<ProductImage, "id" | "url" | "alt">[];
  variants: {
    id: string;
    size: string | null;
    colour: string | null;
    price: number; // resolved cents
    stock: number;
  }[];
};

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  const rows = await db
    .select()
    .from(products)
    .where(and(eq(products.slug, slug), eq(products.status, "active")))
    .limit(1);
  const p = rows[0];
  if (!p) return null;

  const [variants, images] = await Promise.all([
    db.select().from(productVariants).where(and(eq(productVariants.productId, p.id), eq(productVariants.isActive, true))).orderBy(asc(productVariants.sortOrder)),
    db.select().from(productImages).where(eq(productImages.productId, p.id)).orderBy(asc(productImages.sortOrder)),
  ]);

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    description: p.description,
    basePrice: p.basePrice,
    currency: p.currency,
    images: images.map((i) => ({ id: i.id, url: i.url, alt: i.alt })),
    variants: variants.map((v) => ({
      id: v.id,
      size: v.size,
      colour: v.colour,
      price: v.priceOverride ?? p.basePrice,
      stock: v.stock,
    })),
  };
}
