"use client";

import { Box, Container, Typography, Grid, Divider } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

const stats = [
  { value: "2019", label: "Founded" },
  { value: "47", label: "Artisan Partners" },
  { value: "12", label: "Countries" },
  { value: "100%", label: "Ethical Sourcing" },
];

export default function SecundarianAbout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: "background.paper" }}>
      <Container maxWidth="xl">
        <Box
          ref={ref}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 6, md: 12 },
            alignItems: "center",
          }}
        >
          <Box>
            <MotionTypography
              variant="overline"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              sx={{ color: "secondary.main", mb: 2, display: "block" }}
            >
              The Secundarian Difference
            </MotionTypography>

            <MotionTypography
              variant="h2"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              sx={{
                fontSize: { xs: "2.25rem", md: "3rem" },
                mb: 4,
              }}
            >
              Where purpose meets
              <br />
              precision
            </MotionTypography>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ color: "text.secondary", mb: 3, maxWidth: 520 }}
            >
              Secundarian was born from a simple conviction: the people who build
              our world deserve clothing built with the same integrity. We source
              the finest performance textiles and partner with heritage
              manufacturers who share our obsession with detail.
            </MotionTypography>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{ color: "text.secondary", maxWidth: 520 }}
            >
              Every garment undergoes rigorous field testing — from scaffolding
              in winter rain to engine bays in summer heat. What survives earns
              the Secundarian mark.
            </MotionTypography>
          </Box>

          <MotionBox
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Box
              sx={{
                p: { xs: 4, md: 6 },
                bgcolor: "#F5F3EF",
                position: "relative",
              }}
            >
              <Grid container spacing={4}>
                {stats.map((stat, i) => (
                  <Grid key={stat.label} size={{ xs: 6 }}>
                    <MotionBox
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                    >
                      <Typography
                        sx={{
                          fontFamily: '"Playfair Display", Georgia, serif',
                          fontSize: { xs: "2rem", md: "2.75rem" },
                          fontWeight: 400,
                          color: "text.primary",
                          lineHeight: 1,
                          mb: 1,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        variant="overline"
                        sx={{
                          color: "text.secondary",
                          fontSize: "0.6875rem",
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </MotionBox>
                  </Grid>
                ))}
              </Grid>
              <Divider sx={{ my: 4 }} />
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  fontStyle: "italic",
                  fontFamily: '"Playfair Display", Georgia, serif',
                  fontSize: "1rem",
                }}
              >
                &ldquo;We don&rsquo;t follow trends. We follow the people who
                make the world work.&rdquo;
              </Typography>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
