import type { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <Box sx={{ minHeight: "100svh", display: "flex", alignItems: "center", bgcolor: "#0D0D0D", py: 8 }}>
      <Container maxWidth="xs">
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography
            component="a"
            href="/"
            sx={{
              fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
              fontSize: "1.75rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#FAFAF8",
              textDecoration: "none",
            }}
          >
            Secundarian
          </Typography>
        </Box>
        <Box sx={{ bgcolor: "background.paper", p: { xs: 4, sm: 5 }, border: "1px solid rgba(26,26,26,0.08)" }}>
          <Typography variant="h4" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.9rem", mb: 4 }}>
            {subtitle}
          </Typography>
          {children}
        </Box>
      </Container>
    </Box>
  );
}
