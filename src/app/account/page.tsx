import type { Metadata } from "next";
import { Box, Container, Typography, Paper, Button, Divider } from "@mui/material";
import { requireCustomer } from "@/lib/auth/guard";
import { customerLogoutAction } from "@/lib/auth/customer-actions";
import { ChangePasswordForm } from "./AccountForms";

export const metadata: Metadata = { title: "My Account — Secundarian" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { user } = await requireCustomer();
  const isStaff = user.role === "admin" || user.role === "staff";

  return (
    <Box sx={{ minHeight: "100svh", bgcolor: "#F5F3EF", py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h3" sx={{ fontSize: { xs: "1.75rem", md: "2.25rem" } }}>
              My Account
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
              {user.name ? `${user.name} · ` : ""}{user.email}
            </Typography>
          </Box>
          <form action={customerLogoutAction}>
            <Button type="submit" variant="outlined">Sign Out</Button>
          </form>
        </Box>

        {isStaff && (
          <Paper elevation={0} sx={{ p: 2.5, mb: 3, border: "1px solid rgba(196,162,101,0.4)", bgcolor: "rgba(196,162,101,0.08)" }}>
            <Typography sx={{ fontSize: "0.9rem" }}>
              You have <strong>{user.role}</strong> access.{" "}
              <Typography component="a" href="/admin" sx={{ color: "secondary.main", textDecoration: "none", fontWeight: 600 }}>
                Go to the admin console →
              </Typography>
            </Typography>
          </Paper>
        )}

        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, mb: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
          <Typography variant="h5" sx={{ mb: 1 }}>Order History</Typography>
          <Typography sx={{ color: "text.secondary" }}>
            You haven&rsquo;t placed any orders yet. Browse the{" "}
            <Typography component="a" href="/shop" sx={{ color: "secondary.main", textDecoration: "none" }}>
              shop
            </Typography>
            .
          </Typography>
        </Paper>

        <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: "1px solid rgba(26,26,26,0.08)" }}>
          <Typography variant="h5" sx={{ mb: 1 }}>Security</Typography>
          <Typography sx={{ color: "text.secondary", mb: 3 }}>Update your password.</Typography>
          <Divider sx={{ mb: 3 }} />
          <ChangePasswordForm />
        </Paper>
      </Container>
    </Box>
  );
}
