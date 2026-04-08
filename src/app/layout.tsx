import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import SecundarianThemeProvider from "./_components/SecundarianThemeProvider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Secundarian — Premium Workwear",
  description:
    "Where industrial heritage meets modern craftsmanship. Premium workwear engineered for those who build, forge, and create.",
  keywords: [
    "premium workwear",
    "industrial clothing",
    "durable workwear",
    "sustainable fashion",
    "Secundarian",
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
      className={`${playfair.variable} ${dmSans.variable} antialiased`}
    >
      <body style={{ margin: 0 }}>
        <SecundarianThemeProvider>{children}</SecundarianThemeProvider>
      </body>
    </html>
  );
}
