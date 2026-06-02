"use server";

import { revalidatePath } from "next/cache";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { cartItems, productVariants, products } from "@/lib/db/schema";
import { ensureCart, _cartItemBelongsToCookie } from "@/lib/cart";

export type CartActionState = { ok?: boolean; error?: string };

export async function addToCart(
  _prev: CartActionState,
  formData: FormData,
): Promise<CartActionState> {
  const variantId = String(formData.get("variantId") ?? "");
  const qty = Math.max(1, Number(formData.get("quantity") ?? 1) || 1);
  if (!variantId) return { error: "Choose a size first." };

  const rows = await db
    .select({
      stock: productVariants.stock,
      isActive: productVariants.isActive,
      status: products.status,
    })
    .from(productVariants)
    .innerJoin(products, eq(productVariants.productId, products.id))
    .where(eq(productVariants.id, variantId))
    .limit(1);
  const v = rows[0];
  if (!v || !v.isActive || v.status !== "active") return { error: "That option isn't available." };
  if (v.stock <= 0) return { error: "Out of stock." };

  const cartId = await ensureCart();
  const existing = await db
    .select({ id: cartItems.id, quantity: cartItems.quantity })
    .from(cartItems)
    .where(and(eq(cartItems.cartId, cartId), eq(cartItems.variantId, variantId)))
    .limit(1);

  const desired = (existing[0]?.quantity ?? 0) + qty;
  const clamped = Math.min(desired, v.stock);

  if (existing[0]) {
    await db.update(cartItems).set({ quantity: clamped }).where(eq(cartItems.id, existing[0].id));
  } else {
    await db.insert(cartItems).values({ cartId, variantId, quantity: clamped });
  }

  revalidatePath("/cart");
  return { ok: true };
}

export async function updateCartItem(formData: FormData): Promise<void> {
  const itemId = String(formData.get("itemId") ?? "");
  const qty = Number(formData.get("quantity") ?? 1) || 1;
  if (!itemId || !(await _cartItemBelongsToCookie(itemId))) return;

  if (qty <= 0) {
    await db.delete(cartItems).where(eq(cartItems.id, itemId));
  } else {
    // Clamp to current stock.
    const rows = await db
      .select({ stock: productVariants.stock })
      .from(cartItems)
      .innerJoin(productVariants, eq(cartItems.variantId, productVariants.id))
      .where(eq(cartItems.id, itemId))
      .limit(1);
    const stock = rows[0]?.stock ?? 0;
    await db.update(cartItems).set({ quantity: Math.min(qty, stock) }).where(eq(cartItems.id, itemId));
  }
  revalidatePath("/cart");
}

export async function removeCartItem(formData: FormData): Promise<void> {
  const itemId = String(formData.get("itemId") ?? "");
  if (!itemId || !(await _cartItemBelongsToCookie(itemId))) return;
  await db.delete(cartItems).where(eq(cartItems.id, itemId));
  revalidatePath("/cart");
}
