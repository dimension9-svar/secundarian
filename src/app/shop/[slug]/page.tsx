import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Container, Typography, Button } from "@mui/material";
import ShopHeader from "@/app/_components/ShopHeader";
import { getProductBySlug } from "@/lib/shop";
import AddToCart from "./AddToCart";

export const revalidate = 120;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return { title: product ? `${product.title} — Secundarian` : "Shop — Secundarian" };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const hero = product.images[0];

  return (
    <Box sx={{ bgcolor: "#FAFAF8", minHeight: "100svh" }}>
      <ShopHeader />
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 5 } }}>
        <Button component="a" href="/shop" sx={{ px: 0, mb: 3 }}>← Back to shop</Button>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 4, md: 8 } }}>
          <Box>
            <Box sx={{ aspectRatio: "3/4", bgcolor: "#1E1E1E", background: hero ? `url('${hero.url}') center/cover no-repeat` : "linear-gradient(165deg,#2C2C2C,#1A1A1A)" }} />
            {product.images.length > 1 && (
              <Box sx={{ display: "flex", gap: 1.5, mt: 1.5, flexWrap: "wrap" }}>
                {product.images.slice(1).map((img) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={img.id} src={img.url} alt={img.alt ?? product.title} style={{ width: 72, height: 90, objectFit: "cover" }} />
                ))}
              </Box>
            )}
          </Box>
          <Box>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: 2 }}>{product.title}</Typography>
            {product.description && (
              <Typography sx={{ color: "text.secondary", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                {product.description}
              </Typography>
            )}
            <AddToCart variants={product.variants} currency={product.currency} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
