import type { Metadata } from "next";
import {
  IBM_Plex_Serif,
  Inter,
} from "next/font/google";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
const ibm = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "fuse",
  description:
    "Currently in development stages.",
  icons: { icon: "/icons/logo.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibm.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
