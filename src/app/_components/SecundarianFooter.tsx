"use client";

import {
  Box,
  Container,
  Typography,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import Image from "next/image";

const footerLinks = {
  Collections: ["Streetwear", "Cold Season", "Trucker Caps", "Workwear"],
  Company: ["Our Story", "The Pivot", "Mpumalanga Roots", "Careers"],
  Support: ["Size Guide", "Care Instructions", "Returns", "Contact"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

export default function SecundarianFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#0D0D0D",
        color: "white",
        pt: { xs: 8, md: 10 },
        pb: 4,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
              <Box
                sx={{
                  width: 28,
                  height: 38,
                  position: "relative",
                  filter: "invert(1)",
                }}
              >
                <Image
                  src="/secundarian-logo.svg"
                  alt="Secundarian"
                  fill
                  style={{ objectFit: "contain" }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1.2rem",
                  letterSpacing: "0.08em",
                }}
              >
                SECUNDARIAN
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.4)",
                maxWidth: 300,
                lineHeight: 1.8,
                mb: 3,
              }}
            >
              Born in Secunda, Mpumalanga. Fashion meets workwear — rooted in
              hometown pride, built for everywhere.
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              {["IG", "LI", "TW"].map((social) => (
                <IconButton
                  key={social}
                  size="small"
                  sx={{
                    color: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 0,
                    width: 36,
                    height: 36,
                    fontSize: "0.6875rem",
                    letterSpacing: "0.05em",
                    "&:hover": {
                      color: "#C4A265",
                      borderColor: "rgba(196,162,101,0.3)",
                    },
                  }}
                >
                  {social}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {Object.entries(footerLinks).map(([category, links]) => (
            <Grid key={category} size={{ xs: 6, sm: 3, md: 2 }}>
              <Typography
                variant="overline"
                sx={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.625rem",
                  mb: 2.5,
                  display: "block",
                }}
              >
                {category}
              </Typography>
              <Box
                component="ul"
                sx={{ listStyle: "none", p: 0, m: 0, display: "flex", flexDirection: "column", gap: 1.5 }}
              >
                {links.map((link) => (
                  <li key={link}>
                    <Typography
                      component="a"
                      href="#"
                      sx={{
                        color: "rgba(255,255,255,0.5)",
                        textDecoration: "none",
                        fontSize: "0.8125rem",
                        transition: "color 0.2s ease",
                        "&:hover": { color: "rgba(255,255,255,0.8)" },
                      }}
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.06)", my: 5 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}
          >
            &copy; {new Date().getFullYear()} Secundarian. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem" }}
          >
            From Secunda to the world. Fashion meets workwear.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
