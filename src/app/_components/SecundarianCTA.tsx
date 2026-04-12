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
import { useRef } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const MotionBox = motion.create(Box);

export default function SecundarianCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <Box
      id="contact"
      ref={ref}
      sx={{
        py: { xs: 10, md: 16 },
        bgcolor: "background.paper",
        position: "relative",
      }}
    >
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center" }}
        >
          <Typography
            variant="overline"
            sx={{ color: "secondary.main", mb: 2, display: "block" }}
          >
            Stay Connected
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "2.75rem" },
              mb: 3,
            }}
          >
            Join the Workshop
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
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
            onSubmit={(e) => e.preventDefault()}
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
              placeholder="Your email address"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 0,
                  bgcolor: "#F5F3EF",
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(26,26,26,0.15)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#8B7355",
                    borderWidth: "1.5px",
                  },
                },
                "& .MuiInputBase-input": {
                  py: 1.75,
                  px: 2.5,
                  fontSize: "0.9375rem",
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
              color: "text.secondary",
              mt: 2,
              fontSize: "0.75rem",
              opacity: 0.6,
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
