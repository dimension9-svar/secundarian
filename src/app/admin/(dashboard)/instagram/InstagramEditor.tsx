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
  createPost,
  updatePost,
  deletePost,
  saveInstagramConnection,
  type CrudState,
} from "./actions";
import type { InstagramPost } from "@/lib/db/schema";

function ConnectionPanel({ businessId, hasToken }: { businessId: string; hasToken: boolean }) {
  const [state, action, pending] = useActionState<CrudState, FormData>(saveInstagramConnection, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
      <Typography variant="h5" sx={{ mb: 0.5 }}>
        Live Sync (optional)
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: "0.85rem", mb: 2, lineHeight: 1.7 }}>
        To auto-pull posts you need an Instagram Business/Creator account linked to a
        Facebook Page, a Meta app, and a long-lived Graph API token. Until that&rsquo;s set up,
        add tiles manually below — both paths feed the same grid.
      </Typography>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 520 }}>
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Connection saved.</Alert>}
        <TextField name="businessId" label="Instagram Business account ID" defaultValue={businessId} size="small" />
        <TextField
          name="graphToken"
          label="Graph API token"
          placeholder={hasToken ? "•••••••• (leave blank to keep)" : ""}
          size="small"
          autoComplete="off"
        />
        <Box>
          <Button type="submit" variant="outlined" size="small" disabled={pending}>
            {pending ? "Saving…" : "Save Connection"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

function EditRow({ row }: { row: InstagramPost }) {
  const [state, action, pending] = useActionState<CrudState, FormData>(updatePost, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <input type="hidden" name="id" value={row.id} />
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Saved.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <TextField name="imageUrl" label="Image URL" defaultValue={row.imageUrl ?? ""} size="small" fullWidth />
        <TextField name="caption" label="Caption" defaultValue={row.caption ?? ""} size="small" fullWidth />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 120px" }, gap: 2 }}>
          <TextField name="permalink" label="Post link URL" defaultValue={row.permalink ?? ""} size="small" />
          <TextField name="sortOrder" label="Order" type="number" defaultValue={row.sortOrder} size="small" />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </Button>
          <FormControlLabel control={<Switch name="isActive" defaultChecked={row.isActive} />} label="Visible" />
        </Box>
      </Box>
      <Box component="form" action={deletePost} sx={{ mt: 1 }}>
        <input type="hidden" name="id" value={row.id} />
        <Button type="submit" size="small" color="error" startIcon={<DeleteOutlineIcon />} sx={{ px: 0 }}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
}

function AddForm() {
  const [state, action, pending] = useActionState<CrudState, FormData>(createPost, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px dashed rgba(26,26,26,0.2)" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Tile
      </Typography>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Added.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <TextField name="imageUrl" label="Image URL" size="small" fullWidth required />
        <TextField name="caption" label="Caption" size="small" fullWidth />
        <TextField name="permalink" label="Post link URL" size="small" fullWidth />
        <Box>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Adding…" : "Add Tile"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default function InstagramEditor({
  rows,
  businessId,
  hasToken,
}: {
  rows: InstagramPost[];
  businessId: string;
  hasToken: boolean;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      <ConnectionPanel businessId={businessId} hasToken={hasToken} />
      {rows.map((row) => (
        <EditRow key={row.id} row={row} />
      ))}
      <AddForm />
    </Box>
  );
}
