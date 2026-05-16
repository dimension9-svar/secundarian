"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Our Story", href: "#timeline" },
  { label: "Collections", href: "#collections" },
  { label: "Contact", href: "#contact" },
];

export default function SecundarianNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 50 });

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          transition: "all 0.3s ease",
          py: scrolled ? 1 : 1.75,
          borderBottom: scrolled
            ? "1px solid rgba(26,26,26,0.08)"
            : "1px solid transparent",
        }}
      >
        <Container maxWidth="xl" sx={{ px: { xs: 3, md: 5 } }}>
          <Toolbar
            disableGutters
            sx={{ justifyContent: "space-between", minHeight: { xs: 64, md: 80 } }}
          >
            <Box
              component="a"
              href="#"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                textDecoration: "none",
                color: "inherit",
                py: 1,
              }}
            >
              <Image
                src="/secundarian-long-logo.svg"
                alt="Secundarian"
                width={240}
                height={44}
                priority
                style={{
                  objectFit: "contain",
                  objectPosition: "left",
                  height: "auto",
                  maxHeight: 44,
                  width: "auto",
                }}
              />
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                gap: 4,
              }}
            >
              {navLinks.map((link) => (
                <Typography
                  key={link.label}
                  component="a"
                  href={link.href}
                  sx={{
                    textDecoration: "none",
                    color: "text.secondary",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
              <Button
                variant="contained"
                color="primary"
                size="small"
                sx={{ ml: 2, px: 3, py: 1.2 }}
              >
                Shop Now
              </Button>
            </Box>

            <IconButton
              sx={{ display: { md: "none" } }}
              onClick={() => setDrawerOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: { sx: { width: "100%", maxWidth: 360, pt: 2 } },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, pb: 2 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ px: 2 }}>
          {navLinks.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component="a"
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                sx={{ py: 2 }}
              >
                <ListItemText
                  primary={link.label}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: "0.9rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 500,
                      },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem sx={{ pt: 3 }}>
            <Button variant="contained" fullWidth sx={{ py: 1.5 }}>
              Shop Now
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
