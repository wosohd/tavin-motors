import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Tavin Motors | Premium Cars and Import Services",
    template: "%s | Tavin Motors",
  },
  description: siteConfig.description,
  keywords: [
    "Tavin Motors",
    "cars for sale",
    "car import services",
    "vehicle marketplace",
    "auto care",
    "imported cars",
  ],
  openGraph: {
    title: "Tavin Motors",
    description: siteConfig.description,
    type: "website",
    siteName: "Tavin Motors",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${sora.variable} min-h-screen antialiased`}
      >
        {children}

        <Toaster
          position="top-right"
          closeButton
        />
      </body>
    </html>
  );
}