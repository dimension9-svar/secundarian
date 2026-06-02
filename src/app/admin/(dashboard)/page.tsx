import Link from "next/link";
import { Box, Typography, Paper } from "@mui/material";
import { db } from "@/lib/db";
import { collections, timelineMilestones, instagramPosts, subscribers } from "@/lib/db/schema";
import { getSetting } from "@/lib/settings";

export default async function AdminDashboard() {
  const [collectionCount, milestoneCount, igCount, subCount, provider] =
    await Promise.all([
      db.$count(collections),
      db.$count(timelineMilestones),
      db.$count(instagramPosts),
      db.$count(subscribers),
      getSetting("commerceProvider"),
    ]);

  const cards = [
    { label: "Collections", value: collectionCount, href: "/admin/collections" },
    { label: "Timeline Milestones", value: milestoneCount, href: "/admin/timeline" },
    { label: "Instagram Tiles", value: igCount, href: "/admin/instagram" },
    { label: "Subscribers", value: subCount, href: "/admin/store" },
  ];

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Dashboard
      </Typography>
      <Typography sx={{ color: "text.secondary", mb: 4 }}>
        Manage the Secundarian landing page, content, and store connection.
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr 1fr", md: "repeat(4, 1fr)" },
          gap: 2,
          mb: 4,
        }}
      >
        {cards.map((c) => (
          <Paper
            key={c.label}
            component={Link}
            href={c.href}
            elevation={0}
            sx={{
              p: 3,
              textDecoration: "none",
              border: "1px solid rgba(26,26,26,0.08)",
              transition: "border-color 0.2s ease",
              "&:hover": { borderColor: "secondary.main" },
            }}
          >
            <Typography sx={{ fontFamily: 'var(--font-bebas), Impact, sans-serif', fontSize: "2.5rem", lineHeight: 1, color: "text.primary" }}>
              {c.value}
            </Typography>
            <Typography sx={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "text.secondary", mt: 1 }}>
              {c.label}
            </Typography>
          </Paper>
        ))}
      </Box>

      <Paper elevation={0} sx={{ p: 3, border: "1px solid rgba(26,26,26,0.08)" }}>
        <Typography sx={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "text.secondary", mb: 1 }}>
          Store Status
        </Typography>
        <Typography sx={{ fontSize: "1.1rem" }}>
          {provider && provider !== "none"
            ? `Connected provider: ${provider}`
            : "No store connected — choose WooCommerce or Shopify in Store settings."}
        </Typography>
      </Paper>
    </Box>
  );
}
