"use client";

import { Box, Container, Typography } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MotionBox = motion.create(Box);

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    description:
      "Like every great story, Secundarian started small. The journey began with a simple collection of T-shirts in a few colours and sizes — clean, authentic, and true to its roots.",
  },
  {
    year: "2023",
    title: "The Range Grows",
    description:
      "Bucket hats came next, followed by hoodies and sweaters for the colder seasons. Then came the trucker caps — an instant favourite that sold fast and gave the brand real momentum.",
  },
  {
    year: "2025",
    title: "The Cape Town Pivot",
    description:
      "During a conversation with friends in the Mother City, the topic turned to everything people hated about existing clothing brands. Then one suggestion changed the direction of Secundarian: “Why not take it into workwear — but make it fashion meets workwear, not PPE?” That was the shift.",
  },
  {
    year: "2026",
    title: "The Relaunch",
    description:
      "Secundarian re-emerges with a new logo — inspired by the cooling towers that define Secunda's skyline — and a redefined mission: fashion-forward workwear rooted in hometown pride. Everything else levels up.",
  },
];

function MilestoneRow({
  milestone,
  index,
  isFirst,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isFirst: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Drive opacity + translate from the row's position in the viewport.
  // Row peaks in focus while centred; fades on entry and exit.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    [0, 1, 1, 0, 0],
  );
  const y = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.85, 1],
    [60, 0, 0, -40, -60],
  );

  return (
    <MotionBox
      ref={ref}
      style={{ opacity, y }}
      sx={{
        borderTop: isFirst ? "none" : "1px solid rgba(26,26,26,0.1)",
        py: { xs: 6, md: 10 },
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "minmax(220px, 0.7fr) 2fr" },
        columnGap: { md: 8 },
        rowGap: { xs: 3, md: 0 },
        alignItems: "start",
      }}
    >
      {/* Year + index */}
      <Box>
        <Typography
          sx={{
            fontFamily:
              'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
            fontSize: { xs: "0.75rem", md: "0.8125rem" },
            letterSpacing: "0.25em",
            color: "secondary.main",
            mb: { xs: 1, md: 1.5 },
            display: "block",
          }}
        >
          {String(index + 1).padStart(2, "0")} / {String(milestones.length).padStart(2, "0")}
        </Typography>
        <Typography
          sx={{
            fontFamily:
              'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
            fontSize: { xs: "4.5rem", sm: "5.5rem", md: "7rem", lg: "8.5rem" },
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            color: "text.primary",
          }}
        >
          {milestone.year}
        </Typography>
      </Box>

      {/* Title + body */}
      <Box sx={{ maxWidth: 620, pt: { md: 2 } }}>
        <Typography
          variant="h3"
          sx={{
            fontSize: { xs: "1.5rem", md: "2rem" },
            mb: { xs: 2, md: 2.5 },
            color: "text.primary",
          }}
        >
          {milestone.title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            lineHeight: 1.8,
          }}
        >
          {milestone.description}
        </Typography>
      </Box>
    </MotionBox>
  );
}

export default function SecundarianTimeline() {
  return (
    <Box
      id="timeline"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "background.paper",
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 3, md: 5 } }}>
        <Box sx={{ textAlign: "center", mb: { xs: 8, md: 12 } }}>
          <Typography
            variant="overline"
            sx={{ color: "secondary.main", mb: 2, display: "block" }}
          >
            Our Journey
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2.25rem", md: "3rem" },
              mb: 3,
            }}
          >
            The Secundarian Story
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 640,
              mx: "auto",
            }}
          >
            From comedy stages to cooling towers — how a hometown identity
            became a brand shaped by the road and sharpened by friendship.
          </Typography>
        </Box>

        <Box>
          {milestones.map((m, i) => (
            <MilestoneRow
              key={m.year}
              milestone={m}
              index={i}
              isFirst={i === 0}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
