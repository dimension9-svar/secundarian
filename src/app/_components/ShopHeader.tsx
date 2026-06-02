import Image from "next/image";
import { Box, Container, Typography, Badge } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlineIcon from "@mui/icons-material/PersonOutlineOutlined";
import { getCartCount } from "@/lib/cart";

export default async function ShopHeader() {
  const count = await getCartCount();
  return (
    <Box
      component="header"
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        bgcolor: "rgba(19,19,19,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: { xs: 60, md: 72 } }}>
          <Box component="a" href="/" sx={{ display: "flex", alignItems: "center", filter: "invert(1)" }}>
            <Image src="/secundarian-long-logo.svg" alt="Secundarian" width={200} height={36} priority style={{ height: "auto", maxHeight: 36, width: "auto" }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 2.5, md: 4 } }}>
            <Typography component="a" href="/shop" sx={{ color: "rgba(250,250,248,0.8)", textDecoration: "none", fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", display: { xs: "none", sm: "block" }, "&:hover": { color: "#FAFAF8" } }}>
              Shop
            </Typography>
            <Box component="a" href="/account" sx={{ color: "rgba(250,250,248,0.8)", display: "flex", "&:hover": { color: "#FAFAF8" } }}>
              <PersonOutlineIcon />
            </Box>
            <Box component="a" href="/cart" sx={{ color: "rgba(250,250,248,0.9)", display: "flex", "&:hover": { color: "#FAFAF8" } }}>
              <Badge badgeContent={count} color="secondary" overlap="circular">
                <ShoppingBagOutlinedIcon />
              </Badge>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
