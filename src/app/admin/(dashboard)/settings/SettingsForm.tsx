"use client";

import { useActionState } from "react";
import { Box, TextField, Button, Alert, InputAdornment } from "@mui/material";
import { saveGeneralSettings, type SaveState } from "./actions";

export default function SettingsForm({
  contactEmail,
  instagramHandle,
}: {
  contactEmail: string;
  instagramHandle: string;
}) {
  const [state, action, pending] = useActionState<SaveState, FormData>(
    saveGeneralSettings,
    {},
  );

  return (
    <Box component="form" action={action} sx={{ display: "flex", flexDirection: "column", gap: 3, maxWidth: 520 }}>
      {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Settings saved.</Alert>}
      {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}

      <TextField
        name="contactEmail"
        label="Contact email"
        type="email"
        defaultValue={contactEmail}
        fullWidth
        helperText="Where the landing-page contact form routes submissions."
      />
      <TextField
        name="instagramHandle"
        label="Instagram handle"
        defaultValue={instagramHandle}
        fullWidth
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">@</InputAdornment>,
          },
        }}
        helperText="Shown in the Instagram section and the 'Follow' link."
      />
      <Box>
        <Button type="submit" variant="contained" disabled={pending} sx={{ py: 1.25 }}>
          {pending ? "Saving…" : "Save Changes"}
        </Button>
      </Box>
    </Box>
  );
}
