import type { Metadata } from "next";
import { Playfair_Display, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SecundarianThemeProvider from "./_components/SecundarianThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secundarian — Fashion Meets Workwear",
  description:
    "Born in Secunda, Mpumalanga. Secundarian is fashion-forward workwear rooted in hometown pride — from comedy stages to cooling towers.",
  keywords: [
    "Secundarian",
    "fashion workwear",
    "Secunda",
    "Mpumalanga",
    "South African clothing brand",
    "workwear fashion",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable} ${bebasNeue.variable} antialiased`}
    >
      <body style={{ margin: 0 }}>
        <SecundarianThemeProvider>{children}</SecundarianThemeProvider>
      </body>
    </html>
  );
}
