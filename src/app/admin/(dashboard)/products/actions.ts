"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, productVariants, productImages } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";
import { parsePriceToCents } from "@/lib/money";

export type ProductState = { ok?: boolean; error?: string };

function slugify(input: string): string {
  return input.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function refresh(id?: string) {
  revalidatePath("/shop");
  revalidatePath("/admin/products");
  if (id) revalidatePath(`/admin/products/${id}`);
}

/* ----- Product ----- */

export async function createProduct(_prev: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  if (!slug) return { error: "Could not derive a slug." };
  const basePrice = parsePriceToCents(String(formData.get("basePrice") ?? "0")) ?? 0;

  let newId: string;
  try {
    const inserted = await db
      .insert(products)
      .values({
        slug,
        title,
        description: String(formData.get("description") ?? "").trim() || null,
        basePrice,
        status: "draft",
      })
      .returning({ id: products.id });
    newId = inserted[0].id;
  } catch {
    return { error: `A product with slug "${slug}" already exists.` };
  }
  refresh();
  redirect(`/admin/products/${newId}`);
}

export async function updateProduct(_prev: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing id." };
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { error: "Title is required." };
  const slug = slugify(String(formData.get("slug") ?? "") || title);
  const basePrice = parsePriceToCents(String(formData.get("basePrice") ?? "0")) ?? 0;
  const status = String(formData.get("status") ?? "draft");
  const collectionId = String(formData.get("collectionId") ?? "");

  try {
    await db
      .update(products)
      .set({
        title,
        slug,
        description: String(formData.get("description") ?? "").trim() || null,
        basePrice,
        status,
        collectionId: collectionId || null,
        isFeatured: formData.get("isFeatured") === "on",
        sortOrder: Number(formData.get("sortOrder") ?? 0) || 0,
        seoTitle: String(formData.get("seoTitle") ?? "").trim() || null,
        seoDescription: String(formData.get("seoDescription") ?? "").trim() || null,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));
  } catch {
    return { error: `Slug "${slug}" is already taken.` };
  }
  refresh(id);
  return { ok: true };
}

export async function deleteProduct(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await db.delete(products).where(eq(products.id, id));
  refresh();
  redirect("/admin/products");
}

/* ----- Variants ----- */

export async function addVariant(_prev: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const productId = String(formData.get("productId") ?? "");
  if (!productId) return { error: "Missing product." };
  const max = await db.$count(productVariants, eq(productVariants.productId, productId));
  await db.insert(productVariants).values({
    productId,
    sku: String(formData.get("sku") ?? "").trim() || null,
    size: String(formData.get("size") ?? "").trim() || null,
    colour: String(formData.get("colour") ?? "").trim() || null,
    priceOverride: parsePriceToCents(String(formData.get("priceOverride") ?? "")) ?? null,
    stock: Number(formData.get("stock") ?? 0) || 0,
    sortOrder: max,
  });
  refresh(productId);
  return { ok: true };
}

export async function updateVariant(_prev: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (!id) return { error: "Missing id." };
  await db
    .update(productVariants)
    .set({
      sku: String(formData.get("sku") ?? "").trim() || null,
      size: String(formData.get("size") ?? "").trim() || null,
      colour: String(formData.get("colour") ?? "").trim() || null,
      priceOverride: parsePriceToCents(String(formData.get("priceOverride") ?? "")) ?? null,
      stock: Number(formData.get("stock") ?? 0) || 0,
      isActive: formData.get("isActive") === "on",
      updatedAt: new Date(),
    })
    .where(eq(productVariants.id, id));
  refresh(productId);
  return { ok: true };
}

export async function deleteVariant(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (id) await db.delete(productVariants).where(eq(productVariants.id, id));
  refresh(productId);
}

/* ----- Images ----- */

export async function addImage(_prev: ProductState, formData: FormData): Promise<ProductState> {
  await requireAdmin();
  const productId = String(formData.get("productId") ?? "");
  const url = String(formData.get("url") ?? "").trim();
  if (!productId) return { error: "Missing product." };
  if (!url) return { error: "Upload an image or paste a URL." };
  const max = await db.$count(productImages, eq(productImages.productId, productId));
  await db.insert(productImages).values({
    productId,
    url,
    alt: String(formData.get("alt") ?? "").trim() || null,
    sortOrder: max,
  });
  refresh(productId);
  return { ok: true };
}

export async function deleteImage(formData: FormData): Promise<void> {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const productId = String(formData.get("productId") ?? "");
  if (id) await db.delete(productImages).where(eq(productImages.id, id));
  refresh(productId);
}
