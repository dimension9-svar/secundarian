"use client";

import { useActionState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Alert,
  MenuItem,
  Typography,
  Chip,
} from "@mui/material";
import { createStaff, updateUserRole, setUserActive, type UserState } from "./actions";

export type UserRow = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  isActive: boolean;
  lastLoginAt: string | null;
};

function RoleForm({ row, selfId }: { row: UserRow; selfId: string }) {
  const [state, action, pending] = useActionState<UserState, FormData>(updateUserRole, {});
  return (
    <Box component="form" action={action} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <input type="hidden" name="id" value={row.id} />
      <TextField select name="role" defaultValue={row.role} size="small" sx={{ minWidth: 120 }}>
        <MenuItem value="admin">admin</MenuItem>
        <MenuItem value="staff">staff</MenuItem>
        <MenuItem value="customer">customer</MenuItem>
      </TextField>
      <Button type="submit" size="small" variant="outlined" disabled={pending}>
        Save
      </Button>
      {state.error && <Typography sx={{ color: "error.main", fontSize: "0.75rem" }}>{state.error}</Typography>}
      {state.ok && <Typography sx={{ color: "success.main", fontSize: "0.75rem" }}>Saved</Typography>}
      {row.id === selfId && (
        <Typography sx={{ fontSize: "0.7rem", color: "text.secondary" }}>(you)</Typography>
      )}
    </Box>
  );
}

function AddStaff() {
  const [state, action, pending] = useActionState<UserState, FormData>(createStaff, {});
  return (
    <Paper elevation={0} sx={{ p: 3, border: "1px dashed rgba(26,26,26,0.2)" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Add Staff / Admin</Typography>
      <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>User created.</Alert>}
        {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
          <TextField name="name" label="Name" size="small" />
          <TextField name="email" type="email" label="Email" size="small" required />
          <TextField name="password" type="password" label="Temporary password" size="small" required helperText="Min 8 chars; they can change it later." />
          <TextField select name="role" label="Role" size="small" defaultValue="staff">
            <MenuItem value="staff">staff</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </TextField>
        </Box>
        <Box>
          <Button type="submit" variant="contained" size="small" disabled={pending}>
            {pending ? "Creating…" : "Create User"}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default function UsersManager({ rows, selfId }: { rows: UserRow[]; selfId: string }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
      {rows.map((row) => (
        <Paper key={row.id} elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 2 }}>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>{row.name || "—"}</Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "0.85rem" }}>{row.email}</Typography>
              <Box sx={{ mt: 1, display: "flex", gap: 1, alignItems: "center" }}>
                <Chip size="small" label={row.isActive ? "Active" : "Disabled"} color={row.isActive ? "success" : "default"} variant="outlined" />
                {row.lastLoginAt && (
                  <Typography sx={{ fontSize: "0.72rem", color: "text.secondary" }}>
                    Last login {new Date(row.lastLoginAt).toLocaleDateString()}
                  </Typography>
                )}
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, alignItems: "flex-end" }}>
              <RoleForm row={row} selfId={selfId} />
              {row.id !== selfId && (
                <form action={setUserActive}>
                  <input type="hidden" name="id" value={row.id} />
                  <input type="hidden" name="active" value={(!row.isActive).toString()} />
                  <Button type="submit" size="small" color={row.isActive ? "error" : "success"}>
                    {row.isActive ? "Disable" : "Enable"}
                  </Button>
                </form>
              )}
            </Box>
          </Box>
        </Paper>
      ))}
      <AddStaff />
    </Box>
  );
}
