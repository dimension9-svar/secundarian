import type { Metadata } from "next";
import { Box, Container, Typography } from "@mui/material";
import ShopHeader from "@/app/_components/ShopHeader";
import { getShopProducts } from "@/lib/shop";
import { formatMoney } from "@/lib/money";

export const metadata: Metadata = { title: "Shop — Secundarian" };
export const revalidate = 120;

export default async function ShopPage() {
  const productList = await getShopProducts();

  return (
    <Box sx={{ bgcolor: "#FAFAF8", minHeight: "100svh" }}>
      <ShopHeader />
      <Container maxWidth="xl" sx={{ py: { xs: 6, md: 10 }, px: { xs: 3, md: 5 } }}>
        <Typography variant="overline" sx={{ color: "secondary.main", display: "block", mb: 1 }}>
          The Collection
        </Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: "2.25rem", md: "3rem" }, mb: 5 }}>
          Shop Secundarian
        </Typography>

        {productList.length === 0 ? (
          <Typography sx={{ color: "text.secondary" }}>
            The shop is being stocked — check back shortly.
          </Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 2, md: 3 } }}>
            {productList.map((p) => (
              <Box key={p.id} component="a" href={`/shop/${p.slug}`} sx={{ textDecoration: "none", display: "block", "&:hover .shop-img": { transform: "scale(1.03)" } }}>
                <Box sx={{ aspectRatio: "3/4", overflow: "hidden", bgcolor: "#1E1E1E", mb: 1.5, position: "relative" }}>
                  <Box
                    className="shop-img"
                    sx={{
                      position: "absolute",
                      inset: 0,
                      transition: "transform 0.5s ease",
                      background: p.imageUrl ? `url('${p.imageUrl}') center/cover no-repeat` : "linear-gradient(165deg,#2C2C2C,#1A1A1A)",
                    }}
                  />
                  {!p.inStock && (
                    <Box sx={{ position: "absolute", top: 12, left: 12, bgcolor: "rgba(0,0,0,0.7)", color: "#fff", px: 1.5, py: 0.5, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      Sold out
                    </Box>
                  )}
                </Box>
                <Typography sx={{ color: "text.primary", fontWeight: 500 }}>{p.title}</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "0.9rem" }}>{formatMoney(p.price, p.currency)}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
