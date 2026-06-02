import type { Metadata } from "next";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import ShopHeader from "@/app/_components/ShopHeader";
import { getCart } from "@/lib/cart";
import { formatMoney } from "@/lib/money";
import { updateCartItem, removeCartItem } from "./actions";

export const metadata: Metadata = { title: "Your Bag — Secundarian" };
export const dynamic = "force-dynamic";

export default async function CartPage() {
  const cart = await getCart();

  return (
    <Box sx={{ bgcolor: "#FAFAF8", minHeight: "100svh" }}>
      <ShopHeader />
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 }, px: { xs: 3, md: 5 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.75rem" }, mb: 4 }}>Your Bag</Typography>

        {cart.lines.length === 0 ? (
          <Box>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>Your bag is empty.</Typography>
            <Button component="a" href="/shop" variant="contained">Browse the shop</Button>
          </Box>
        ) : (
          <Box>
            {cart.lines.map((line) => (
              <Box key={line.itemId} sx={{ display: "flex", gap: 2.5, py: 3, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
                <Box sx={{ width: 88, height: 110, flexShrink: 0, bgcolor: "#1E1E1E", background: line.imageUrl ? `url('${line.imageUrl}') center/cover no-repeat` : "linear-gradient(165deg,#2C2C2C,#1A1A1A)" }} />
                <Box sx={{ flex: 1 }}>
                  <Typography component="a" href={`/shop/${line.productSlug}`} sx={{ fontWeight: 500, color: "text.primary", textDecoration: "none" }}>
                    {line.title}
                  </Typography>
                  {(line.size || line.colour) && (
                    <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>
                      {[line.size, line.colour].filter(Boolean).join(" / ")}
                    </Typography>
                  )}
                  <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mt: 0.5 }}>
                    {formatMoney(line.unitPrice, line.currency)} each
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 1.5 }}>
                    <Box component="form" action={updateCartItem} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <input type="hidden" name="itemId" value={line.itemId} />
                      <Button type="submit" name="quantity" value={line.quantity - 1} size="small" variant="outlined" sx={{ minWidth: 32, px: 0 }}>−</Button>
                      <Typography sx={{ minWidth: 24, textAlign: "center" }}>{line.quantity}</Typography>
                      <Button type="submit" name="quantity" value={line.quantity + 1} size="small" variant="outlined" disabled={line.quantity >= line.stock} sx={{ minWidth: 32, px: 0 }}>+</Button>
                    </Box>
                    <Box component="form" action={removeCartItem}>
                      <input type="hidden" name="itemId" value={line.itemId} />
                      <Button type="submit" size="small" color="error">Remove</Button>
                    </Box>
                  </Box>
                </Box>
                <Typography sx={{ fontWeight: 500 }}>{formatMoney(line.lineTotal, line.currency)}</Typography>
              </Box>
            ))}

            <Divider sx={{ my: 3 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
              <Typography variant="h5">Subtotal</Typography>
              <Typography variant="h5">{formatMoney(cart.subtotal, cart.currency)}</Typography>
            </Box>
            <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2 }}>
              Shipping calculated at checkout.
            </Typography>
            <Button variant="contained" size="large" disabled fullWidth sx={{ py: 1.6 }}>
              Secure checkout — coming soon
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
