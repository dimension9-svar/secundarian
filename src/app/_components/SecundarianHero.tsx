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
                maxWidth: { md: 460, lg: 560, xl: 640 },
                aspectRatio: "4/3",
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
                    fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
                    fontWeight: 400,
                    WebkitTextStroke: "0.04em currentColor",
                    textShadow: "0 0 0.4px currentColor",
                    letterSpacing: "0.04em",
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
