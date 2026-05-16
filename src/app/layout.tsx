import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SecundarianThemeProvider from "./_components/SecundarianThemeProvider";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
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
      className={`${outfit.variable} ${bebasNeue.variable} antialiased`}
    >
      <body style={{ margin: 0 }}>
        <SecundarianThemeProvider>{children}</SecundarianThemeProvider>
      </body>
    </html>
  );
}
