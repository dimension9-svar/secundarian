"use client";

import { Box, Container, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

export default function SecundarianHero() {
  return (
    <Box
      sx={{
        minHeight: { xs: "100svh", md: "92vh" },
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        pt: { xs: 14, md: 12 },
        pb: { xs: 8, md: 10 },
        backgroundColor: "#FAFAF8",
      }}
    >
      {/* Background image */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero-workshop.jpg')",
          backgroundSize: "cover",
          backgroundPosition: { xs: "center center", md: "right center" },
          backgroundRepeat: "no-repeat",
          pointerEvents: "none",
        }}
      />
      {/* Fade overlay — heavy on the left for text legibility, lighter on the right so the image dominates */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          background: {
            xs:
              "linear-gradient(180deg, rgba(250,250,248,0.78) 0%, rgba(250,250,248,0.65) 40%, rgba(250,250,248,0.5) 100%)",
            md:
              "linear-gradient(95deg, rgba(250,250,248,0.97) 0%, rgba(250,250,248,0.93) 32%, rgba(250,250,248,0.7) 52%, rgba(250,250,248,0.28) 78%, rgba(250,250,248,0.1) 100%)",
          },
          pointerEvents: "none",
        }}
      />
      {/* Bottom hairline */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(26,26,26,0.12) 50%, transparent 100%)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, px: { xs: 3, md: 5 } }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.05fr 0.95fr" },
            gap: { xs: 5, md: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <MotionTypography
              variant="overline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                color: "secondary.main",
                fontSize: { xs: "0.6875rem", md: "0.75rem" },
                mb: { xs: 2, md: 3 },
                display: "block",
              }}
            >
              Premium Workwear — Engineered for Excellence
            </MotionTypography>

            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                mb: { xs: 2.5, md: 3 },
                lineHeight: 0.95,
              }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.25rem",
                    md: "3.75rem",
                    lg: "4.75rem",
                    xl: "5.5rem",
                  },
                  color: "text.primary",
                  lineHeight: 1,
                }}
              >
                Built for the
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.25rem",
                    md: "3.75rem",
                    lg: "4.75rem",
                    xl: "5.5rem",
                  },
                  color: "secondary.main",
                  lineHeight: 1,
                }}
              >
                Shift
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3.25rem",
                    md: "3.75rem",
                    lg: "4.75rem",
                    xl: "5.5rem",
                  },
                  color: "text.primary",
                  lineHeight: 1,
                }}
              >
                Worn beyond it
              </Typography>
            </MotionBox>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              sx={{
                color: "text.secondary",
                maxWidth: 520,
                mb: { xs: 4, md: 5 },
                fontSize: { xs: "1rem", md: "1.0625rem" },
              }}
            >
              Where industrial heritage meets modern craftsmanship — every
              stitch, every seam, every detail is purpose-built for those who
              demand more from their workwear
            </MotionTypography>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Button
                component="a"
                href="#collections"
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  width: { xs: "100%", sm: "auto" },
                  alignSelf: "flex-start",
                  px: { xs: 4, md: 5 },
                }}
              >
                Explore Collection
              </Button>
            </MotionBox>
          </Box>

          {/* Right column intentionally empty — the background image fills this space */}
          <Box sx={{ display: { xs: "none", md: "block" } }} />
        </Box>
      </Container>
    </Box>
  );
}
