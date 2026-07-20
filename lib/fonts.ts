import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

/**
 * Font wiring for RizzFitt.
 *
 * Per the build brief, the body + mono faces are Geist / Geist Mono (loaded via
 * `next/font` for zero-layout-shift, self-hosted delivery). The DISPLAY face is
 * Clash Display, loaded from Fontshare via a <link> in `app/layout.tsx` (Fontshare
 * has no npm package). The CSS variable `--font-display` in globals.css points at
 * the "Clash Display" family name; `--font-body` / `--font-mono` are remapped to
 * the Geist variables below.
 *
 * Geist exposes:
 *   GeistSans.variable -> --font-geist-sans
 *   GeistMono.variable -> --font-geist-mono
 */
export const geistSans = GeistSans;
export const geistMono = GeistMono;

/** Combined className to attach the Geist font variables to <html>/<body>. */
export const fontVariables = `${GeistSans.variable} ${GeistMono.variable}`;
