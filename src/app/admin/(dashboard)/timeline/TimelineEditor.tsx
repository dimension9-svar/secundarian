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
  createMilestone,
  updateMilestone,
  deleteMilestone,
  type CrudState,
} from "./actions";
import type { TimelineMilestone } from "@/lib/db/schema";

function EditRow({ row }: { row: TimelineMilestone }) {
  const [state, action, pending] = useActionState<CrudState, FormData>(updateMilestone, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <input type="hidden" name="id" value={row.id} />
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Saved.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "120px 1fr 120px" }, gap: 2 }}>
          <TextField name="year" label="Year" defaultValue={row.year} size="small" />
          <TextField name="title" label="Title" defaultValue={row.title} size="small" />
          <TextField name="sortOrder" label="Order" type="number" defaultValue={row.sortOrder} size="small" />
        </Box>
        <TextField name="subtitle" label="Subtitle" defaultValue={row.subtitle ?? ""} size="small" fullWidth />
        <TextField name="description" label="Description" defaultValue={row.description} size="small" fullWidth multiline minRows={3} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Saving…" : "Save"}
          </Button>
          <FormControlLabel control={<Switch name="isActive" defaultChecked={row.isActive} />} label="Visible" />
        </Box>
      </Box>
      <Box component="form" action={deleteMilestone} sx={{ mt: 1 }}>
        <input type="hidden" name="id" value={row.id} />
        <Button type="submit" size="small" color="error" startIcon={<DeleteOutlineIcon />} sx={{ px: 0 }}>
          Delete
        </Button>
      </Box>
    </Paper>
  );
}

function AddForm() {
  const [state, action, pending] = useActionState<CrudState, FormData>(createMilestone, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px dashed rgba(26,26,26,0.2)" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Add Milestone
      </Typography>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Added.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "120px 1fr" }, gap: 2 }}>
          <TextField name="year" label="Year" size="small" required />
          <TextField name="title" label="Title" size="small" required />
        </Box>
        <TextField name="subtitle" label="Subtitle" size="small" fullWidth />
        <TextField name="description" label="Description" size="small" fullWidth multiline minRows={3} required />
        <Box>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Adding…" : "Add Milestone"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default function TimelineEditor({ rows }: { rows: TimelineMilestone[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {rows.map((row) => (
        <EditRow key={row.id} row={row} />
      ))}
      <AddForm />
    </Box>
  );
}
