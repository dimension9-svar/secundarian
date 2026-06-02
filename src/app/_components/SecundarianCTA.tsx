"use client";

import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion.create(Box);

const CONTACT_EMAIL = "info@secundarian.co.za";

export default function SecundarianCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent("Secundarian — early access request");
    const body = encodeURIComponent(
      `Please add me to the Secundarian workshop list for early access to new collections.\n\nEmail: ${trimmed}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <Box
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "#0D0D0D",
        color: "rgba(255,255,255,0.92)",
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(139,115,85,0.18) 0%, transparent 60%)",
          pointerEvents: "none",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          inset: 0,
          opacity: 0.03,
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 2px, rgba(255,255,255,0.5) 2px, rgba(255,255,255,0.5) 3px
          )`,
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{ color: "#C4A265", mb: 2, display: "block" }}
          >
            Stay Connected
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              mb: 3,
              color: "rgba(255,255,255,0.95)",
            }}
          >
            Join the Workshop
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255,255,255,0.55)",
              maxWidth: 480,
              mx: "auto",
              mb: 5,
            }}
          >
            Early access to new collections, and stories from the people
            who wear Secundarian every day.
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              maxWidth: 520,
              mx: "auto",
            }}
          >
            <TextField
              fullWidth
              required
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  bgcolor: "rgba(255,255,255,0.05)",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.12)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.25)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#C4A265",
                    borderWidth: "1.5px",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.75,
                  px: 2.5,
                  fontSize: "0.9375rem",
                  color: "rgba(255,255,255,0.95)",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.4)",
                  opacity: 1,
                },
              }}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          minWidth: "auto",
                          px: 2,
                          py: 1,
                          mr: -1,
                        }}
                      >
                        <ArrowForwardIcon sx={{ fontSize: 20 }} />
                      </Button>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                display: { xs: "flex", sm: "none" },
                py: 1.75,
              }}
            >
              Subscribe
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "rgba(255,255,255,0.4)",
              mt: 2,
              fontSize: "0.75rem",
            }}
          >
            No spam. Unsubscribe anytime. We respect your inbox like we
            respect our fabrics.
          </Typography>
        </MotionBox>
      </Container>
    </Box>
  );
}
