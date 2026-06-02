"use client";

import { useActionState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { loginAction, type LoginState } from "@/lib/auth/actions";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <Box
      component="form"
      action={formAction}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      {state.error && (
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          {state.error}
        </Alert>
      )}
      <Box>
        <Typography
          component="label"
          htmlFor="email"
          sx={{ display: "block", mb: 0.75, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "text.secondary" }}
        >
          Email
        </Typography>
        <TextField
          id="email"
          name="email"
          type="email"
          required
          autoComplete="username"
          fullWidth
          placeholder="info@secundarian.co.za"
        />
      </Box>
      <Box>
        <Typography
          component="label"
          htmlFor="password"
          sx={{ display: "block", mb: 0.75, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "text.secondary" }}
        >
          Password
        </Typography>
        <TextField
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          fullWidth
        />
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={pending}
        sx={{ mt: 1, py: 1.5 }}
      >
        {pending ? "Signing in…" : "Sign In"}
      </Button>
    </Box>
  );
}
