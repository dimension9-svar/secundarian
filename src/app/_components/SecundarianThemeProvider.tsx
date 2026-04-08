"use client";

import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { ReactNode } from "react";

const secundarianTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#1A1A1A",
      light: "#3D3D3D",
      dark: "#000000",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#8B7355",
      light: "#B8A07A",
      dark: "#5E4A33",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#FAFAF8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#5C5C5C",
    },
    divider: "rgba(26, 26, 26, 0.08)",
  },
  typography: {
    fontFamily: '"DM Sans", "Inter", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 400,
      letterSpacing: "-0.02em",
      lineHeight: 1.1,
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 400,
      letterSpacing: "-0.01em",
      lineHeight: 1.2,
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif',
      fontWeight: 400,
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
    },
    h4: {
      fontFamily: '"DM Sans", "Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.02em",
      textTransform: "uppercase" as const,
    },
    h5: {
      fontFamily: '"DM Sans", "Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.05em",
      textTransform: "uppercase" as const,
      fontSize: "0.875rem",
    },
    body1: {
      fontSize: "1.0625rem",
      lineHeight: 1.7,
      letterSpacing: "0.01em",
    },
    body2: {
      fontSize: "0.9375rem",
      lineHeight: 1.6,
      letterSpacing: "0.01em",
    },
    button: {
      fontFamily: '"DM Sans", "Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.1em",
      textTransform: "uppercase" as const,
    },
    overline: {
      fontFamily: '"DM Sans", "Inter", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.15em",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          padding: "14px 40px",
          fontSize: "0.8125rem",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          "&:hover": {
            backgroundColor: "#3D3D3D",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
            backgroundColor: "rgba(26, 26, 26, 0.04)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(250, 250, 248, 0.85)",
          backdropFilter: "blur(20px)",
          boxShadow: "none",
          borderBottom: "1px solid rgba(26, 26, 26, 0.06)",
          color: "#1A1A1A",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(26, 26, 26, 0.08)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          boxShadow: "none",
          border: "1px solid rgba(26, 26, 26, 0.06)",
        },
      },
    },
  },
});

export default function SecundarianThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider theme={secundarianTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
