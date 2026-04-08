"use client";

import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

export default function SecundarianHero() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background:
          "linear-gradient(165deg, #FAFAF8 0%, #F0EDE8 40%, #E8E3DB 100%)",
      }}
    >
      {/* Decorative geometric elements */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: "50vw",
          height: "80vh",
          background:
            "linear-gradient(180deg, rgba(139,115,85,0.04) 0%, rgba(139,115,85,0.01) 100%)",
          transform: "rotate(-12deg)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(26,26,26,0.08) 50%, transparent 100%)",
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 8 },
            alignItems: "center",
            pt: { xs: 12, md: 0 },
          }}
        >
          <Box>
            <MotionTypography
              variant="overline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              sx={{
                color: "secondary.main",
                fontSize: "0.75rem",
                mb: 3,
                display: "block",
              }}
            >
              Premium Workwear — Engineered for Excellence
            </MotionTypography>

            <MotionTypography
              variant="h1"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              sx={{
                fontSize: { xs: "3rem", sm: "3.75rem", md: "4.5rem", lg: "5.25rem" },
                mb: 3,
                color: "text.primary",
              }}
            >
              Built for the{" "}
              <Box component="span" sx={{ color: "secondary.main" }}>
                shift.
              </Box>
              <br />
              Worn beyond it.
            </MotionTypography>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              sx={{
                color: "text.secondary",
                maxWidth: 480,
                mb: 5,
                fontSize: "1.125rem",
              }}
            >
              Where industrial heritage meets modern craftsmanship. Every stitch,
              every seam, every detail — purpose-built for those who demand more
              from their workwear.
            </MotionTypography>

            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary" size="large">
                  Explore Collection
                </Button>
                <Button variant="outlined" color="primary" size="large">
                  Our Story
                </Button>
              </Stack>
            </MotionBox>
          </Box>

          {/* Hero visual - abstract workwear silhouette */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 520,
                aspectRatio: "3/4",
                position: "relative",
                background:
                  "linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 60%, #0D0D0D 100%)",
                overflow: "hidden",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(139,115,85,0.15) 100%)",
                },
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: "10%",
                  left: "10%",
                  right: "10%",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Playfair Display", Georgia, serif',
                    color: "rgba(255,255,255,0.9)",
                    fontSize: { md: "2rem", lg: "2.5rem" },
                    lineHeight: 1.2,
                    mb: 1,
                  }}
                >
                  SS26
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  Foundation Collection
                </Typography>
              </Box>
              {/* Texture overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  opacity: 0.03,
                  backgroundImage: `repeating-linear-gradient(
                    0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px
                  )`,
                }}
              />
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
