"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import ShieldIcon from "@mui/icons-material/Shield";
import RecyclingIcon from "@mui/icons-material/Recycling";
import GroupsIcon from "@mui/icons-material/Groups";

const MotionBox = motion.create(Box);

const values = [
  {
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 32 }} />,
    title: "Precision Engineering",
    description:
      "Every pattern is drafted to 0.5mm tolerance. Every seam is stress-tested to 3x its rated load. We engineer garments the way others engineer bridges.",
  },
  {
    icon: <ShieldIcon sx={{ fontSize: 32 }} />,
    title: "Uncompromising Durability",
    description:
      "Our fabrics are selected through a 14-point evaluation protocol. If it doesn't survive 500 wash cycles and simulated field abuse, it doesn't ship.",
  },
  {
    icon: <RecyclingIcon sx={{ fontSize: 32 }} />,
    title: "Circular Responsibility",
    description:
      "From organic cotton to recycled polyester, every material choice is measured against its full lifecycle impact. Built to last means less waste by design.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    title: "Worker-First Design",
    description:
      "Designed in collaboration with tradespeople, not for them. Every pocket placement, every gusset, every ventilation zone — informed by the people who need it most.",
  },
];

export default function SecundarianValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      id="values"
      ref={ref}
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "#1A1A1A",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          opacity: 0.02,
          backgroundImage: `repeating-linear-gradient(
            90deg, transparent, transparent 40px, rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px
          )`,
        }}
      />

      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
          <Typography
            variant="overline"
            sx={{ color: "#C4A265", mb: 2, display: "block" }}
          >
            Our Principles
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.25rem", md: "3rem" },
              color: "white",
              mb: 3,
            }}
          >
            Built on conviction
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: 520,
              mx: "auto",
            }}
          >
            Four pillars that define every decision we make, from thread
            selection to global distribution.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4 }}>
          {values.map((value, i) => (
            <Grid key={value.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <MotionBox
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                sx={{
                  p: { xs: 3, md: 4 },
                  height: "100%",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "border-color 0.3s ease",
                  "&:hover": {
                    borderColor: "rgba(196,162,101,0.3)",
                  },
                }}
              >
                <Box sx={{ color: "#C4A265", mb: 3 }}>{value.icon}</Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: "0.875rem",
                    color: "white",
                    mb: 2,
                    letterSpacing: "0.08em",
                  }}
                >
                  {value.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: "rgba(255,255,255,0.5)",
                    lineHeight: 1.7,
                  }}
                >
                  {value.description}
                </Typography>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
