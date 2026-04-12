"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import GroupsIcon from "@mui/icons-material/Groups";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const MotionBox = motion.create(Box);

const values = [
  {
    icon: <HomeWorkIcon sx={{ fontSize: 32 }} />,
    title: "Hometown Pride",
    description:
      "Secundarian is Secunda. Named after the town, shaped by its landscape — from the cooling towers on the skyline to the petrochemical heartland of Mpumalanga. Every piece carries that origin.",
  },
  {
    icon: <TheaterComedyIcon sx={{ fontSize: 32 }} />,
    title: "Creative Roots",
    description:
      "Born from a performer's dream of building something beyond the stage. Wayne Stuart's journey from comedy circuits to clothing proves that the best brands come from real stories, not boardrooms.",
  },
  {
    icon: <GroupsIcon sx={{ fontSize: 32 }} />,
    title: "Community-Driven",
    description:
      "The pivot to workwear didn't come from market research — it came from a friend's honest suggestion over drinks. Secundarian grows through real conversations and genuine connections.",
  },
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 32 }} />,
    title: "Fashion Meets Function",
    description:
      "Not PPE. Not fast fashion. Secundarian occupies the space between — workwear that looks as good as it performs. Industrial durability with design-forward thinking.",
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
            What we stand for
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.6)",
              maxWidth: 520,
              mx: "auto",
            }}
          >
            Four principles forged from a real journey — from Secunda&rsquo;s
            comedy stages to the workwear space.
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
