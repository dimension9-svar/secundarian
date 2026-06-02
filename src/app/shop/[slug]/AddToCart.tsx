"use client";

import { useActionState, useState } from "react";
import { Box, Button, Typography, Alert, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Link from "next/link";
import { addToCart, type CartActionState } from "@/app/cart/actions";
import { formatMoney } from "@/lib/money";

type Variant = { id: string; size: string | null; colour: string | null; price: number; stock: number };

export default function AddToCart({ variants, currency }: { variants: Variant[]; currency: string }) {
  const [state, action, pending] = useActionState<CartActionState, FormData>(addToCart, {});
  const inStock = variants.filter((v) => v.stock > 0);
  const [selected, setSelected] = useState<string>(inStock.length === 1 ? inStock[0].id : "");

  const current = variants.find((v) => v.id === selected);

  if (variants.length === 0) {
    return <Typography sx={{ color: "text.secondary", mt: 2 }}>Not available.</Typography>;
  }

  return (
    <Box component="form" action={action} sx={{ mt: 3 }}>
      <input type="hidden" name="variantId" value={selected} />
      <input type="hidden" name="quantity" value={1} />

      <Typography sx={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "text.secondary", mb: 1 }}>
        Select size
      </Typography>
      <ToggleButtonGroup
        value={selected}
        exclusive
        onChange={(_e, val) => val && setSelected(val)}
        sx={{ flexWrap: "wrap", gap: 1, mb: 3 }}
      >
        {variants.map((v) => (
          <ToggleButton
            key={v.id}
            value={v.id}
            disabled={v.stock <= 0}
            sx={{ borderRadius: 0, px: 2.5, textTransform: "none", borderColor: "rgba(0,0,0,0.2)!important", "&.Mui-selected": { bgcolor: "#1A1A1A", color: "#fff", "&:hover": { bgcolor: "#000" } } }}
          >
            {[v.size, v.colour].filter(Boolean).join(" / ") || "One size"}
            {v.stock <= 0 ? " (sold out)" : ""}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      {current && (
        <Typography variant="h4" sx={{ mb: 2 }}>{formatMoney(current.price, currency)}</Typography>
      )}

      {state.error && <Alert severity="warning" sx={{ borderRadius: 0, mb: 2 }}>{state.error}</Alert>}
      {state.ok && (
        <Alert severity="success" sx={{ borderRadius: 0, mb: 2 }}>
          Added to bag.{" "}
          <Typography component={Link} href="/cart" sx={{ color: "inherit", fontWeight: 700 }}>View bag →</Typography>
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={pending || !selected || (current ? current.stock <= 0 : true)}
        sx={{ py: 1.6, px: 6, width: { xs: "100%", sm: "auto" } }}
      >
        {pending ? "Adding…" : "Add to Bag"}
      </Button>
    </Box>
  );
}
