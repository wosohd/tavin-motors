import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Sora } from "next/font/google";

import { SiteIntro } from "@/components/layout/site-intro";
import { ThemeProvider } from "@/components/theme/theme-provider";
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

const introBootstrapScript = `
(function () {
  var root = document.documentElement;
  var storageKey = "tavin-motors-intro-viewed-v1";

  try {
    var isHomepage =
      window.location.pathname === "/";

    var prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    var introViewed =
      window.sessionStorage.getItem(
        storageKey
      ) === "viewed";

    root.dataset.tavinIntro =
      isHomepage &&
      !prefersReducedMotion &&
      !introViewed
        ? "show"
        : "hide";
  } catch (error) {
    root.dataset.tavinIntro =
      window.location.pathname === "/"
        ? "show"
        : "hide";
  }
})();
`;

const introCriticalStyles = `
html[data-tavin-intro="show"] .tm-site-intro {
  position: fixed !important;
  inset: 0 !important;
  z-index: 9999 !important;
  display: grid !important;
  background: #07090c !important;
}

html[data-tavin-intro="hide"] .tm-site-intro {
  display: none !important;
}
`;

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000",
  ),
  title: {
    default:
      "Tavin Motors | Premium Cars and Import Services",
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
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: introCriticalStyles,
          }}
        />

        <Script
          id="tavin-intro-bootstrap"
          strategy="beforeInteractive"
        >
          {introBootstrapScript}
        </Script>
      </head>

      <body
        className={`${inter.variable} ${sora.variable} min-h-screen antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
          storageKey="tavin-motors-theme"
        >
          <SiteIntro />

          <div className="tm-site-content">
            {children}
          </div>

          <Toaster
            position="top-right"
            closeButton
          />
        </ThemeProvider>
      </body>
    </html>
  );
}