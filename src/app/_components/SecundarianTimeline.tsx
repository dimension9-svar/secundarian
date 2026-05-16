"use client";

import { Box, Container, Typography } from "@mui/material";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
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

function Milestone({
  milestone,
  index,
  isLast,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px -20% 0px" });

  const isLeft = index % 2 === 0;

  return (
    <Box
      ref={ref}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "48px 1fr", md: "1fr 56px 1fr" },
        columnGap: { xs: 3, md: 6 },
        position: "relative",
        pb: isLast ? 0 : { xs: 6, md: 10 },
      }}
    >
      {/* Left content (desktop only) */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          justifyContent: "flex-end",
          pr: 2,
        }}
      >
        {isLeft && (
          <MotionBox
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            sx={{ maxWidth: 460, textAlign: "right" }}
          >
            <MilestoneCard milestone={milestone} align="right" />
          </MotionBox>
        )}
      </Box>

      {/* Center rail */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gridColumn: { xs: 1, md: 2 },
        }}
      >
        {/* Vertical line above dot */}
        {index > 0 && (
          <Box
            sx={{
              position: "absolute",
              top: -1,
              bottom: "calc(100% - 28px)",
              width: 1,
              bgcolor: "rgba(26,26,26,0.12)",
            }}
          />
        )}
        {/* Dot */}
        <MotionBox
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          sx={{
            mt: { xs: 1, md: 1.5 },
            width: 14,
            height: 14,
            borderRadius: "50%",
            bgcolor: "secondary.main",
            boxShadow: "0 0 0 6px rgba(139,115,85,0.18)",
            position: "relative",
            zIndex: 2,
          }}
        />
        {/* Vertical line below dot */}
        {!isLast && (
          <Box
            sx={{
              flex: 1,
              width: 1,
              mt: 1,
              bgcolor: "rgba(26,26,26,0.12)",
            }}
          />
        )}
      </Box>

      {/* Right content + mobile content */}
      <Box
        sx={{
          gridColumn: { xs: 2, md: 3 },
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        {/* Mobile always shows */}
        <Box sx={{ display: { xs: "block", md: "none" }, width: "100%" }}>
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <MilestoneCard milestone={milestone} align="left" />
          </MotionBox>
        </Box>

        {/* Desktop alternating */}
        {!isLeft && (
          <Box sx={{ display: { xs: "none", md: "block" }, maxWidth: 460 }}>
            <MotionBox
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <MilestoneCard milestone={milestone} align="left" />
            </MotionBox>
          </Box>
        )}
      </Box>
    </Box>
  );
}

function MilestoneCard({
  milestone,
  align,
}: {
  milestone: (typeof milestones)[0];
  align: "left" | "right";
}) {
  return (
    <Box sx={{ textAlign: { xs: "left", md: align } }}>
      <Typography
        sx={{
          fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
          fontSize: { xs: "2.75rem", md: "3.5rem" },
          letterSpacing: "0.04em",
          lineHeight: 1,
          color: "secondary.main",
          mb: 1.5,
        }}
      >
        {milestone.year}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          fontSize: { xs: "1.5rem", md: "1.75rem" },
          mb: 2,
          color: "text.primary",
        }}
      >
        {milestone.title}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "text.secondary",
          lineHeight: 1.75,
        }}
      >
        {milestone.description}
      </Typography>
    </Box>
  );
}

export default function SecundarianTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 30%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <Box
      id="timeline"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "background.paper",
        position: "relative",
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

        <Box ref={containerRef} sx={{ position: "relative" }}>
          {/* Scroll progress fill — overlays the center rail */}
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: { xs: 23, md: "calc(50% - 0.5px)" },
              width: 1,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <MotionBox
              style={{ height: fillHeight }}
              sx={{
                width: 1,
                bgcolor: "secondary.main",
                transformOrigin: "top",
              }}
            />
          </Box>

          {milestones.map((m, i) => (
            <Milestone
              key={m.year}
              milestone={m}
              index={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
