import { Box, Container, Typography } from "@mui/material";
import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin — Secundarian",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <Box
      sx={{
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        bgcolor: "#0D0D0D",
        py: 8,
      }}
    >
      <Container maxWidth="xs">
        <Box
          sx={{
            bgcolor: "background.paper",
            p: { xs: 4, sm: 5 },
            border: "1px solid rgba(26,26,26,0.08)",
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
              fontSize: "1.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Secundarian
          </Typography>
          <Typography
            variant="overline"
            sx={{ color: "secondary.main", display: "block", mb: 4 }}
          >
            Admin Console
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    </Box>
  );
}
