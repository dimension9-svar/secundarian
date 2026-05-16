"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);

export default function SecundarianAbout() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: "background.paper" }}>
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
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
              The Origin Story
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
              From the Stage
              <br />
              to the Graaf
            </MotionTypography>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              sx={{ color: "text.secondary", mb: 3, maxWidth: 520 }}
            >
              Secundarian was born from the road. The founder spent years
              travelling across the country, performing at comedy shows and
              connecting with audiences from all walks of life. But no matter
              where he went, there was one thing that never changed — every
              host would introduce him as &ldquo;Wayne Stuart from
              Secunda.&rdquo;
            </MotionTypography>

            <MotionTypography
              variant="body1"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              sx={{ color: "text.secondary", maxWidth: 520 }}
            >
              That constant reminder of home stuck. It became more than just an
              introduction — it became an identity. As a creative with a
              long-standing dream of building something of his own, he turned
              that identity into inspiration. And from that, Secundarian was
              born.
            </MotionTypography>
          </Box>

          <MotionBox
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            sx={{
              width: "100%",
              aspectRatio: "4/5",
              position: "relative",
              background:
                "linear-gradient(165deg, #2C2C2C 0%, #1A1A1A 60%, #0D0D0D 100%)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 20,
                left: 20,
                width: 40,
                height: 3,
                bgcolor: "#8B7355",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                opacity: 0.04,
                backgroundImage: `repeating-linear-gradient(
                  45deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px
                )`,
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: 24,
                left: 24,
                right: 24,
              }}
            >
              <Typography
                sx={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  mb: 0.75,
                }}
              >
                Product image
              </Typography>
              <Typography
                sx={{
                  fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
                  color: "rgba(255,255,255,0.85)",
                  fontSize: { xs: "1.5rem", md: "1.85rem" },
                  letterSpacing: "0.04em",
                  lineHeight: 1.1,
                }}
              >
                Placeholder
              </Typography>
            </Box>
          </MotionBox>
        </Box>
      </Container>
    </Box>
  );
}
