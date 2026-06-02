import Link from "next/link";
import { notFound } from "next/navigation";
import { Box, Typography, Button } from "@mui/material";
import { asc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, productVariants, productImages, collections } from "@/lib/db/schema";
import { requireAdmin } from "@/lib/auth/guard";
import ProductEditor from "./ProductEditor";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdmin();
  const { id } = await params;

  const productRows = await db.select().from(products).where(eq(products.id, id)).limit(1);
  const product = productRows[0];
  if (!product) notFound();

  const [variants, images, cols] = await Promise.all([
    db.select().from(productVariants).where(eq(productVariants.productId, id)).orderBy(asc(productVariants.sortOrder)),
    db.select().from(productImages).where(eq(productImages.productId, id)).orderBy(asc(productImages.sortOrder)),
    db.select({ id: collections.id, title: collections.title }).from(collections).orderBy(asc(collections.sortOrder)),
  ]);

  return (
    <Box>
      <Button component={Link} href="/admin/products" sx={{ px: 0, mb: 2 }}>
        ← Back to products
      </Button>
      <Typography variant="h4" sx={{ mb: 0.5 }}>{product.title}</Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Edit details, variants, and images.{" "}
        {product.status === "active" && (
          <Typography component={Link} href={`/shop/${product.slug}`} sx={{ color: "secondary.main", textDecoration: "none" }}>
            View in shop →
          </Typography>
        )}
      </Typography>
      <ProductEditor
        product={{
          id: product.id,
          slug: product.slug,
          title: product.title,
          description: product.description,
          status: product.status,
          basePrice: product.basePrice,
          currency: product.currency,
          collectionId: product.collectionId,
          isFeatured: product.isFeatured,
          sortOrder: product.sortOrder,
          seoTitle: product.seoTitle,
          seoDescription: product.seoDescription,
        }}
        collections={cols}
        variants={variants.map((v) => ({
          id: v.id, sku: v.sku, size: v.size, colour: v.colour,
          priceOverride: v.priceOverride, stock: v.stock, isActive: v.isActive,
        }))}
        images={images.map((i) => ({ id: i.id, url: i.url, alt: i.alt }))}
      />
    </Box>
  );
}
