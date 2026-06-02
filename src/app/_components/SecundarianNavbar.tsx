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
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "#timeline" },
  { label: "Collections", href: "#collections" },
  { label: "Account", href: "/account" },
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
          backgroundColor: scrolled
            ? "rgba(19, 19, 19, 0.92)"
            : "rgba(19, 19, 19, 0.82)",
          color: "#FAFAF8",
          borderBottom: scrolled
            ? "1px solid rgba(255,255,255,0.08)"
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
                filter: "invert(1)",
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
                    color: "rgba(250,250,248,0.7)",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    transition: "color 0.2s ease",
                    "&:hover": { color: "#FAFAF8" },
                  }}
                >
                  {link.label}
                </Typography>
              ))}
              <Button
                component="a"
                href="/shop"
                variant="contained"
                size="small"
                sx={{
                  ml: 2,
                  px: 3,
                  py: 1.2,
                  backgroundColor: "#FAFAF8",
                  color: "#131313",
                  "&:hover": { backgroundColor: "#FFFFFF" },
                }}
              >
                Shop Now
              </Button>
            </Box>

            <IconButton
              sx={{ display: { md: "none" }, color: "#FAFAF8" }}
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
            <Button
              component="a"
              href="/shop"
              variant="contained"
              fullWidth
              sx={{ py: 1.5 }}
              onClick={() => setDrawerOpen(false)}
            >
              Shop Now
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
