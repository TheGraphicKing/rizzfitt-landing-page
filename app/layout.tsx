import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "RizzFitt — The operating system for sports communities and events",
    template: "%s · RizzFitt",
  },
  description:
    "RizzFitt is the operating system for sports communities and events — auto fixtures, live scoring, payments, and the community layer that keeps players coming back.",
  metadataBase: new URL("https://rizzfitt.com"),
};

export const viewport: Viewport = {
  themeColor: "#121212",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <head>
        {/* Display face — Clash Display via Fontshare (no npm package). Body +
            mono are Geist / Geist Mono, loaded via next/font (see lib/fonts). */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* Default page mode is `os` (dark) — home, products, footer. Light pages
          and sections set their own `data-mode="live"`. */}
      <body data-mode="os">
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
