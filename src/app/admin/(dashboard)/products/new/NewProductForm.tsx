"use client";

import { useActionState } from "react";
import { Box, TextField, Button, Alert, InputAdornment } from "@mui/material";
import { createProduct, type ProductState } from "../actions";

export default function NewProductForm() {
  const [state, action, pending] = useActionState<ProductState, FormData>(createProduct, {});
  return (
    <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2.5, maxWidth: 560 }}>
      {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
      <TextField name="title" label="Title" required fullWidth />
      <TextField name="slug" label="Slug (optional)" fullWidth helperText="Auto-derived from title if blank." />
      <TextField name="description" label="Description" fullWidth multiline minRows={3} />
      <TextField
        name="basePrice"
        label="Base price"
        fullWidth
        slotProps={{ input: { startAdornment: <InputAdornment position="start">R</InputAdornment> } }}
        helperText="e.g. 299.00 — you can set per-variant prices after."
      />
      <Box>
        <Button type="submit" variant="contained" disabled={pending} sx={{ py: 1.2 }}>
          {pending ? "Creating…" : "Create & Continue"}
        </Button>
      </Box>
    </Box>
  );
}
