"use client";

import { useActionState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  createCollection,
  updateCollection,
  deleteCollection,
  type CrudState,
} from "./actions";
import type { Collection } from "@/lib/db/schema";

function EditRow({ row }: { row: Collection }) {
  const [state, action, pending] = useActionState<CrudState, FormData>(updateCollection, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <input type="hidden" name="id" value={row.id} />
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Saved.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <Typography sx={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "text.secondary" }}>
          {row.slug}
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField name="title" label="Title" defaultValue={row.title} size="small" />
          <TextField name="subtitle" label="Subtitle / product line" defaultValue={row.subtitle ?? ""} size="small" />
          <TextField name="color" label="Card color (hex)" defaultValue={row.color} size="small" />
          <TextField name="accent" label="Accent (hex)" defaultValue={row.accent} size="small" />
          <TextField name="imageUrl" label="Image URL" defaultValue={row.imageUrl ?? ""} size="small" />
          <TextField name="productUrl" label="Product link URL" defaultValue={row.productUrl ?? ""} size="small" />
          <TextField name="sortOrder" label="Sort order" type="number" defaultValue={row.sortOrder} size="small" />
          <FormControlLabel control={<Switch name="isActive" defaultChecked={row.isActive} />} label="Visible" />
        </Box>
        <Box sx={{ display: "flex", gap: 1.5 }}>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </Button>
        </Box>
      </Box>
      <Box component="form" action={deleteCollection} sx={{ mt: 1 }}>
        <input type="hidden" name="id" value={row.id} />
        <Button type="submit" size="small" color="error" startIcon={<DeleteOutlineIcon />} sx={{ px: 0 }}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
}

function AddForm() {
  const [state, action, pending] = useActionState<CrudState, FormData>(createCollection, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px dashed rgba(26,26,26,0.2)" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Collection
      </Typography>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Added.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField name="title" label="Title" size="small" required />
          <TextField name="subtitle" label="Subtitle / product line" size="small" />
          <TextField name="slug" label="Slug (optional)" size="small" helperText="Auto-derived from title if blank" />
          <TextField name="productUrl" label="Product link URL" size="small" />
          <TextField name="color" label="Card color (hex)" size="small" defaultValue="#1E1E1E" />
          <TextField name="accent" label="Accent (hex)" size="small" defaultValue="#8B7355" />
        </Box>
        <Box>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Adding…" : "Add Collection"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default function CollectionsEditor({ rows }: { rows: Collection[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {rows.map((row) => (
        <EditRow key={row.id} row={row} />
      ))}
      <AddForm />
    </Box>
  );
}
