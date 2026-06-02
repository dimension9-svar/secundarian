"use client";

import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { motion, useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const MotionBox = motion.create(Box);

const DISPLAY_FONT =
  'var(--font-bebas), "Bebas Neue", Impact, sans-serif';
const DISPLAY_BOLD_SX = {
  fontFamily: DISPLAY_FONT,
  fontWeight: 400,
  WebkitTextStroke: "0.04em currentColor",
  textShadow: "0 0 0.4px currentColor",
} as const;

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    subtitle: "Four Colours, One Hometown",
    description:
      "Like every great story, Secundarian started small. The journey began with a simple collection of T-shirts in a few colours — clean, authentic, and true to its roots.",
  },
  {
    year: "2023",
    title: "The Range Grows",
    subtitle: "Winter Wear to Trucker Caps",
    description:
      "Followed by hoodies and sweaters for the colder seasons. Then came the trucker caps — an instant favourite that sold fast and gave the brand real momentum.",
  },
  {
    year: "2025",
    title: "The Cape Town Pivot",
    subtitle: "A Conversation That Changed Everything",
    description:
      "During a conversation with friends in the Mother City, one suggestion changed the direction of Secundarian: “Why not take it into workwear — but make it fashion meets workwear, not PPE?” Then came the shift.",
  },
  {
    year: "2026",
    title: "The Relaunch",
    subtitle: "Same Name, New Identity",
    description:
      "Secundarian re-emerges with a new logo — inspired by the cooling towers that define Secunda's skyline — and a redefined mission: fashion-forward workwear rooted in hometown pride. Everything else levels up.",
  },
];

function TimelineMilestone({
  milestone,
  index,
  isLast,
  onReveal,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isLast: boolean;
  onReveal: (index: number) => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px -25% 0px" });
  const isActive = inView;

  useEffect(() => {
    if (inView) onReveal(index);
  }, [inView, index, onReveal]);

  return (
    <TimelineItem
      ref={ref}
      sx={{ minHeight: { xs: 180, md: 220 } }}
    >
      <TimelineOppositeContent
        sx={{
          flex: { xs: 0, md: 0.35 },
          display: { xs: "none", md: "block" },
          pt: 3,
          pr: 4,
          textAlign: "right",
        }}
      >
        <MotionBox
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Typography
            sx={{
              ...DISPLAY_BOLD_SX,
              fontSize: "3rem",
              letterSpacing: "0.03em",
              color: isActive ? "text.primary" : "rgba(26,26,26,0.2)",
              transition: "color 0.4s ease",
              lineHeight: 1,
              mb: 0.5,
            }}
          >
            {milestone.year}
          </Typography>
          <Typography
            variant="overline"
            sx={{
              color: isActive ? "secondary.main" : "text.secondary",
              transition: "color 0.4s ease",
              fontSize: "0.6875rem",
            }}
          >
            {milestone.subtitle}
          </Typography>
        </MotionBox>
      </TimelineOppositeContent>

      <TimelineSeparator>
        <TimelineConnector
          sx={{
            bgcolor: "secondary.main",
            width: 2,
            opacity: isLast ? 0 : 1,
            flexGrow: 1,
          }}
        />
      </TimelineSeparator>

      <TimelineContent sx={{ pt: 2, pb: 4, pl: { xs: 3, md: 4 }, flex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <Box sx={{ display: { md: "none" }, mb: 1 }}>
            <Typography
              sx={{
                ...DISPLAY_BOLD_SX,
                fontSize: "1.85rem",
                letterSpacing: "0.03em",
                color: isActive ? "secondary.main" : "text.secondary",
                transition: "color 0.4s ease",
              }}
            >
              {milestone.year}
            </Typography>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "1.25rem", md: "1.5rem" },
              mb: 1,
              color: isActive ? "text.primary" : "rgba(26,26,26,0.5)",
              transition: "color 0.4s ease",
            }}
          >
            {milestone.title}
          </Typography>

          <Box
            sx={{
              overflow: "hidden",
              maxHeight: isActive ? 320 : 0,
              opacity: isActive ? 1 : 0,
              transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                maxWidth: 420,
                pt: 1,
              }}
            >
              {milestone.description}
            </Typography>
          </Box>
        </MotionBox>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function SecundarianTimeline() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [revealed, setRevealed] = useState<Set<number>>(() => new Set());

  const handleReveal = useCallback((i: number) => {
    setRevealed((prev) => {
      if (prev.has(i)) return prev;
      const next = new Set(prev);
      next.add(i);
      return next;
    });
  }, []);

  return (
    <Box
      id="timeline"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "background.paper",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: { xs: 6, md: 10 } }}>
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
              maxWidth: 560,
              mx: "auto",
            }}
          >
            From comedy stages to cooling towers — how a hometown identity
            became a brand shaped by the road and sharpened by friendship.
          </Typography>
        </Box>

        <Timeline
          position={isMobile ? "right" : "alternate-reverse"}
          sx={{
            px: { xs: 0, md: 4 },
            [`& .MuiTimelineItem-root:before`]: isMobile
              ? { flex: 0, padding: 0 }
              : {},
          }}
        >
          {milestones.map((milestone, i) => (
            <TimelineMilestone
              key={milestone.title}
              milestone={milestone}
              index={i}
              isLast={i === milestones.length - 1}
              onReveal={handleReveal}
            />
          ))}
        </Timeline>

        {/* Progress strip — fills as each milestone is revealed */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            mt: 6,
            gap: 1,
          }}
        >
          {milestones.map((m, i) => {
            const isRevealed = revealed.has(i);
            return (
              <Box
                key={m.year}
                sx={{
                  width: isRevealed ? 48 : 24,
                  height: 3,
                  bgcolor: "secondary.main",
                  opacity: isRevealed ? 1 : 0.3,
                  transition: "all 0.4s ease",
                }}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

