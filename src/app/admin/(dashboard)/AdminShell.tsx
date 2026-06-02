"use client";

import { useState, type ReactNode } from "react";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  IconButton,
  AppBar,
  Toolbar,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/lib/auth/actions";

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/timeline", label: "Timeline" },
  { href: "/admin/instagram", label: "Instagram" },
  { href: "/admin/store", label: "Store" },
];

const DRAWER_WIDTH = 248;

export default function AdminShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const nav = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#0D0D0D", color: "#FAFAF8" }}>
      <Box sx={{ px: 3, py: 3, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <Typography
          sx={{
            fontFamily: 'var(--font-bebas), "Bebas Neue", Impact, sans-serif',
            fontSize: "1.4rem",
            letterSpacing: "0.12em",
          }}
        >
          SECUNDARIAN
        </Typography>
        <Typography sx={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
          Admin Console
        </Typography>
      </Box>
      <List sx={{ flex: 1, py: 2 }}>
        {NAV.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            href={item.href}
            onClick={() => setOpen(false)}
            selected={isActive(item.href)}
            sx={{
              py: 1.25,
              "&.Mui-selected": { bgcolor: "rgba(196,162,101,0.15)" },
              "&.Mui-selected:hover": { bgcolor: "rgba(196,162,101,0.22)" },
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)" },
            }}
          >
            <ListItemText
              primary={item.label}
              slotProps={{
                primary: {
                  sx: {
                    fontSize: "0.8125rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: isActive(item.href) ? "#C4A265" : "rgba(255,255,255,0.7)",
                  },
                },
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <Typography sx={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", mb: 1, px: 1, wordBreak: "break-all" }}>
          {email}
        </Typography>
        <form action={logoutAction}>
          <Button
            type="submit"
            fullWidth
            startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
            sx={{
              justifyContent: "flex-start",
              color: "rgba(255,255,255,0.7)",
              borderRadius: 0,
              "&:hover": { bgcolor: "rgba(255,255,255,0.05)", color: "#FAFAF8" },
            }}
          >
            Sign Out
          </Button>
        </form>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100svh", bgcolor: "#F5F3EF" }}>
      {isMobile ? (
        <>
          <AppBar position="fixed" sx={{ bgcolor: "#0D0D0D" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={() => setOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Typography sx={{ ml: 1, fontFamily: 'var(--font-bebas), Impact, sans-serif', letterSpacing: "0.1em" }}>
                SECUNDARIAN ADMIN
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer open={open} onClose={() => setOpen(false)} slotProps={{ paper: { sx: { width: DRAWER_WIDTH, border: 0 } } }}>
            {nav}
          </Drawer>
        </>
      ) : (
        <Box component="nav" sx={{ width: DRAWER_WIDTH, flexShrink: 0, position: "fixed", height: "100svh" }}>
          {nav}
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { md: `${DRAWER_WIDTH}px` },
          mt: { xs: 7, md: 0 },
          p: { xs: 2.5, md: 5 },
          maxWidth: 980,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
