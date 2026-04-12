"use client";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion.create(Box);

const collections = [
  {
    title: "Streetwear Roots",
    subtitle: "Tees & Bucket Hats",
    description:
      "Where it all began. Bold graphic tees and signature bucket hats that put Secundarian on the map — straight from Secunda to the streets.",
    color: "#2C2C2C",
    accent: "#8B7355",
  },
  {
    title: "Cold Season",
    subtitle: "Hoodies & Sweaters",
    description:
      "Built for the colder months in Mpumalanga and beyond. Heavyweight fleece and layering pieces that brought warmth to the brand — literally.",
    color: "#1A1612",
    accent: "#C4A265",
  },
  {
    title: "Trucker Caps",
    subtitle: "The Breakout Hit",
    description:
      "The product that proved the demand. Secundarian trucker caps became a staple — selling like hot cakes and cementing the brand's street presence.",
    color: "#2A2520",
    accent: "#A69378",
  },
  {
    title: "Workwear Re/Defined",
    subtitle: "Fashion Meets Function",
    description:
      "The new chapter. Secundarian enters the workwear space with a difference — merging industrial durability with fashion-forward design. Same name, new identity.",
    color: "#1E1E1E",
    accent: "#9B8B7A",
  },
];

export default function SecundarianCollections() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      id="collections"
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "#F5F3EF",
      }}
    >
      <Container maxWidth="xl">
        <Box
          ref={ref}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "flex-end" },
            flexDirection: { xs: "column", md: "row" },
            mb: 8,
            gap: 3,
          }}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{ color: "secondary.main", mb: 2, display: "block" }}
            >
              Collections
            </Typography>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "2.25rem", md: "3rem" }, textTransform: "uppercase" }}
            >
              The Range
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", mt: 1 }}
            >
              From streetwear roots to workwear revolution
            </Typography>
          </Box>
          <Button
            variant="outlined"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            View All
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {collections.map((collection, i) => (
            <MotionBox
              key={collection.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <Card
                sx={{
                  height: "100%",
                  border: "none",
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    "& .collection-image": {
                      transform: "scale(1.03)",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    aspectRatio: "3/4",
                    background: `linear-gradient(165deg, ${collection.color} 0%, ${collection.color}ee 100%)`,
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.5s ease",
                  }}
                  className="collection-image"
                >
                  {/* Subtle fabric texture overlay */}
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
                      top: 20,
                      left: 20,
                      width: 40,
                      height: 3,
                      bgcolor: collection.accent,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 24,
                      left: 20,
                      right: 20,
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "1.75rem",
                        mb: 0.5,
                      }}
                    >
                      {collection.title}
                    </Typography>
                    <Typography
                      sx={{
                        color: collection.accent,
                        fontSize: "0.6875rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}
                    >
                      {collection.subtitle}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", lineHeight: 1.7 }}
                  >
                    {collection.description}
                  </Typography>
                </CardContent>
              </Card>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
