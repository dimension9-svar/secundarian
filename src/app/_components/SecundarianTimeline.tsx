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
    title: "Wayne Stuart from Secunda",
    subtitle: "The Comedy Circuit Meets Clothing",
    description:
      "While travelling the country performing at comedy shows — where every MC introduced him as 'Wayne Stuart from Secunda' — the dream of a clothing brand took shape. That hometown identity became the name, and Secundarian launched with T-shirts in four colours.",
  },
  {
    year: "2023",
    title: "The Range Grows",
    subtitle: "Bucket Hats to Trucker Caps",
    description:
      "Demand outpaced expectation. Bucket hats dropped next, followed by hoodies and sweaters for the colder months. Then came trucker caps — and they sold like hot cakes. The brand had found its rhythm.",
  },
  {
    year: "2025",
    title: "The Cape Town Pivot",
    subtitle: "A Conversation That Changed Everything",
    description:
      "Over drinks in the Mother City, friends were discussing complaints about clothing brands. One suggestion changed the trajectory: 'Why don't you take Secundarian into the workwear space? But think fashion meets workwear, not PPE.' And that was the moment.",
  },
  {
    year: "2026",
    title: "The Relaunch",
    subtitle: "Same Name, New Identity",
    description:
      "Secundarian re-emerges with a new logo — inspired by the cooling towers that define Secunda's skyline — and a redefined mission: fashion-forward workwear rooted in hometown pride. The name stays. Everything else levels up.",
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
            From comedy stages to cooling towers — how a hometown identity
            became a brand, and how a conversation over drinks in Cape Town
            changed everything.
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
