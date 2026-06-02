"use client";

import { useActionState } from "react";
import { Box, TextField, Button, Alert, Typography } from "@mui/material";
import Link from "next/link";
import {
  registerAction,
  customerLoginAction,
  type AccountState,
} from "@/lib/auth/customer-actions";
import {
  changePasswordAction,
  type ProfileState,
} from "@/lib/auth/profile-actions";

const fieldGap = { display: "flex", flexDirection: "column", gap: 2.5 } as const;

export function CustomerLoginForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(
    customerLoginAction,
    {},
  );
  return (
    <Box component="form" action={action} sx={fieldGap}>
      {state.error && (
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          {state.error}
        </Alert>
      )}
      <TextField name="email" type="email" label="Email" required autoComplete="username" fullWidth />
      <TextField name="password" type="password" label="Password" required autoComplete="current-password" fullWidth />
      <Button type="submit" variant="contained" size="large" disabled={pending} sx={{ py: 1.4 }}>
        {pending ? "Signing in…" : "Sign In"}
      </Button>
      <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", textAlign: "center" }}>
        New here?{" "}
        <Typography component={Link} href="/account/register" sx={{ color: "secondary.main", textDecoration: "none" }}>
          Create an account
        </Typography>
      </Typography>
    </Box>
  );
}

export function CustomerRegisterForm() {
  const [state, action, pending] = useActionState<AccountState, FormData>(
    registerAction,
    {},
  );
  return (
    <Box component="form" action={action} sx={fieldGap}>
      {state.error && (
        <Alert severity="error" sx={{ borderRadius: 0 }}>
          {state.error}
        </Alert>
      )}
      <TextField name="name" label="Full name" required autoComplete="name" fullWidth />
      <TextField name="email" type="email" label="Email" required autoComplete="email" fullWidth />
      <TextField
        name="password"
        type="password"
        label="Password"
        required
        autoComplete="new-password"
        fullWidth
        helperText="At least 8 characters."
      />
      <Button type="submit" variant="contained" size="large" disabled={pending} sx={{ py: 1.4 }}>
        {pending ? "Creating account…" : "Create Account"}
      </Button>
      <Typography sx={{ fontSize: "0.85rem", color: "text.secondary", textAlign: "center" }}>
        Already have an account?{" "}
        <Typography component={Link} href="/account/login" sx={{ color: "secondary.main", textDecoration: "none" }}>
          Sign in
        </Typography>
      </Typography>
    </Box>
  );
}

export function ChangePasswordForm() {
  const [state, action, pending] = useActionState<ProfileState, FormData>(
    changePasswordAction,
    {},
  );
  return (
    <Box component="form" action={action} sx={{ ...fieldGap, maxWidth: 420 }}>
      {state.ok && <Alert severity="success" sx={{ borderRadius: 0 }}>Password updated.</Alert>}
      {state.error && <Alert severity="error" sx={{ borderRadius: 0 }}>{state.error}</Alert>}
      <TextField name="currentPassword" type="password" label="Current password" required autoComplete="current-password" fullWidth />
      <TextField name="newPassword" type="password" label="New password" required autoComplete="new-password" fullWidth />
      <TextField name="confirmPassword" type="password" label="Confirm new password" required autoComplete="new-password" fullWidth />
      <Box>
        <Button type="submit" variant="contained" disabled={pending} sx={{ py: 1.2 }}>
          {pending ? "Updating…" : "Update Password"}
        </Button>
      </Box>
    </Box>
  );
}
