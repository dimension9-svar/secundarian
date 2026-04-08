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
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const MotionBox = motion.create(Box);

const milestones = [
  {
    year: "2021",
    title: "The Beginning",
    subtitle: "Secunda, South Africa",
    description:
      "Founded in a converted dockyard workshop with three industrial sewing machines and a conviction that workwear deserved better. First prototypes tested by steelworkers and marine engineers.",
  },
  {
    year: "2021",
    title: "Foundation Collection",
    subtitle: "First Production Run",
    description:
      "Launched the Foundation line — 8 core pieces engineered from triple-stitched 12oz canvas and Cordura-reinforced stress points. Sold out in 6 weeks through word of mouth alone.",
  },
  {
    year: "2025",
    title: "Rebrand",
    subtitle: "A New Identity",
    description:
      "Refined the Secundarian identity to match the ambition of the brand. New visual language, evolved positioning, and a sharper focus on the intersection of industrial performance and modern design.",
  },
  {
    year: "2026",
    title: "Re-Launch",
    subtitle: "The Next Chapter",
    description:
      "Secundarian re-emerges with an expanded product architecture, new manufacturing partners, and a direct-to-consumer model built for scale. The same uncompromising standards, now fully realised.",
  },
  {
    year: "2026",
    title: "Beyond the Worksite",
    subtitle: "From Workshop to World",
    description:
      "Introduced technical outerwear and transitional evening lines. The same engineering DNA, refined for every hour of the day. Workwear that moves seamlessly from site to street.",
  },
];

function TimelineMilestone({
  milestone,
  index,
  isActive,
  onClick,
}: {
  milestone: (typeof milestones)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <TimelineItem
      ref={ref}
      onClick={onClick}
      sx={{ cursor: "pointer", minHeight: { xs: 180, md: 220 } }}
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
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Typography
            sx={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: "2.5rem",
              fontWeight: 400,
              color: isActive ? "text.primary" : "rgba(26,26,26,0.2)",
              transition: "color 0.4s ease",
              lineHeight: 1,
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
        <TimelineDot
          sx={{
            width: isActive ? 20 : 12,
            height: isActive ? 20 : 12,
            bgcolor: isActive ? "secondary.main" : "rgba(26,26,26,0.12)",
            boxShadow: isActive
              ? "0 0 0 6px rgba(139,115,85,0.15)"
              : "none",
            transition: "all 0.4s ease",
            border: "none",
            m: "auto",
            p: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        {index < milestones.length - 1 && (
          <TimelineConnector
            sx={{
              bgcolor: "rgba(26,26,26,0.08)",
              width: 1,
            }}
          />
        )}
      </TimelineSeparator>

      <TimelineContent sx={{ pt: 2, pb: 4, pl: { xs: 3, md: 4 }, flex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
        >
          <Box sx={{ display: { md: "none" }, mb: 1 }}>
            <Typography
              sx={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: "1.5rem",
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
              maxHeight: isActive ? 200 : 0,
              opacity: isActive ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
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
  const [activeIndex, setActiveIndex] = useState(0);

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
            Secundarian began with a straightforward question: why does
            serious workwear so often force a choice between durability,
            comfort, and appearance?
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
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </Timeline>

        {/* Progress bar */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "center",
            mt: 6,
            gap: 1,
          }}
        >
          {milestones.map((m, i) => (
            <Box
              key={m.year}
              onClick={() => setActiveIndex(i)}
              sx={{
                width: activeIndex === i ? 48 : 24,
                height: 3,
                bgcolor:
                  activeIndex === i ? "secondary.main" : "rgba(26,26,26,0.1)",
                transition: "all 0.4s ease",
                cursor: "pointer",
                "&:hover": {
                  bgcolor:
                    activeIndex === i
                      ? "secondary.main"
                      : "rgba(26,26,26,0.2)",
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
