import Link from "next/link";
import { Box, Typography, Paper, Button, Chip } from "@mui/material";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { products, productVariants } from "@/lib/db/schema";
import { formatMoney } from "@/lib/money";

export default async function ProductsPage() {
  const rows = await db
    .select({
      id: products.id,
      title: products.title,
      slug: products.slug,
      status: products.status,
      basePrice: products.basePrice,
      currency: products.currency,
      variants: sql<number>`count(${productVariants.id})`,
      stock: sql<number>`coalesce(sum(${productVariants.stock}), 0)`,
    })
    .from(products)
    .leftJoin(productVariants, eq(productVariants.productId, products.id))
    .groupBy(products.id)
    .orderBy(desc(products.createdAt));

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ mb: 1 }}>Products</Typography>
          <Typography sx={{ color: "text.secondary" }}>Your sellable catalogue.</Typography>
        </Box>
        <Button component={Link} href="/admin/products/new" variant="contained">New Product</Button>
      </Box>

      {rows.length === 0 ? (
        <Paper elevation={0} sx={{ p: 4, border: "1px dashed rgba(26,26,26,0.2)", textAlign: "center" }}>
          <Typography sx={{ color: "text.secondary" }}>No products yet. Create your first one.</Typography>
        </Paper>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
          {rows.map((p) => (
            <Paper
              key={p.id}
              component={Link}
              href={`/admin/products/${p.id}`}
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid rgba(26,26,26,0.08)",
                textDecoration: "none",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
                "&:hover": { borderColor: "secondary.main" },
              }}
            >
              <Box>
                <Typography sx={{ fontWeight: 600, color: "text.primary" }}>{p.title}</Typography>
                <Typography sx={{ fontSize: "0.8rem", color: "text.secondary" }}>
                  /{p.slug} · {Number(p.variants)} variant{Number(p.variants) === 1 ? "" : "s"} · {Number(p.stock)} in stock
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Typography sx={{ color: "text.primary" }}>{formatMoney(p.basePrice, p.currency)}</Typography>
                <Chip
                  size="small"
                  label={p.status}
                  color={p.status === "active" ? "success" : p.status === "archived" ? "default" : "warning"}
                  variant="outlined"
                />
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}
