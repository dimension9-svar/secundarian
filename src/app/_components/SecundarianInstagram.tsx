"use client";

import { Box, Container, Typography, IconButton } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion.create(Box);

const feedItems = [
  {
    gradient: "linear-gradient(135deg, #2C2C2C 0%, #1A1A1A 100%)",
    label: "Foundation jacket — field tested, 72 hours straight",
  },
  {
    gradient: "linear-gradient(135deg, #3D3228 0%, #1E1612 100%)",
    label: "Forge line — heat-rated to 400°C",
  },
  {
    gradient: "linear-gradient(135deg, #2A2520 0%, #0D0D0D 100%)",
    label: "Material Lab — 14-point fabric evaluation",
  },
  {
    gradient: "linear-gradient(135deg, #1E1E1E 0%, #2C2C2C 100%)",
    label: "Workshop floor — triple-stitch in progress",
  },
  {
    gradient: "linear-gradient(165deg, #2C2824 0%, #1A1612 100%)",
    label: "Meridian outerwear — dawn test, Cape Town harbour",
  },
  {
    gradient: "linear-gradient(135deg, #1A1A1A 0%, #3D3D3D 100%)",
    label: "Sable evening line — site to street",
  },
];

export default function SecundarianInstagram() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: "#F5F3EF",
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            flexDirection: { xs: "column", sm: "row" },
            mb: 5,
            gap: 2,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "secondary.main", mb: 1, display: "block" }}
            >
              @secundarian
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontSize: { xs: "1.5rem", md: "2rem" } }}
            >
              Follow the Process
            </Typography>
          </Box>
          <IconButton
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.primary",
              border: "1.5px solid rgba(26,26,26,0.15)",
              borderRadius: 0,
              px: 3,
              py: 1,
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: '"DM Sans", sans-serif',
              "&:hover": {
                borderColor: "secondary.main",
                color: "secondary.main",
              },
            }}
          >
            Follow on Instagram
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, 1fr)",
              sm: "repeat(3, 1fr)",
              lg: "repeat(6, 1fr)",
            },
            gap: { xs: 1, md: 1.5 },
          }}
        >
          {feedItems.map((item, i) => (
            <MotionBox
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              sx={{
                aspectRatio: "1",
                background: item.gradient,
                position: "relative",
                overflow: "hidden",
                cursor: "pointer",
                "&:hover .ig-overlay": {
                  opacity: 1,
                },
                "&:hover .ig-texture": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {/* Fabric texture */}
              <Box
                className="ig-texture"
                sx={{
                  position: "absolute",
                  inset: 0,
                  transition: "transform 0.5s ease",
                  opacity: 0.06,
                  backgroundImage: `repeating-linear-gradient(
                    ${45 + i * 15}deg, transparent, transparent 1px, rgba(255,255,255,0.4) 1px, rgba(255,255,255,0.4) 2px
                  )`,
                }}
              />

              {/* Hover overlay with caption */}
              <Box
                className="ig-overlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  bgcolor: "rgba(26,26,26,0.7)",
                  display: "flex",
                  alignItems: "flex-end",
                  p: 2,
                  opacity: 0,
                  transition: "opacity 0.3s ease",
                }}
              >
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                    letterSpacing: "0.02em",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>

              {/* Corner accent */}
              <Box
                sx={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 20,
                  height: 20,
                  borderTop: "1.5px solid rgba(255,255,255,0.15)",
                  borderRight: "1.5px solid rgba(255,255,255,0.15)",
                }}
              />
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
