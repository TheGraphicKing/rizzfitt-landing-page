import type { Config } from "tailwindcss";

/**
 * RizzFitt Tailwind config.
 *
 * The palette mirrors `app/globals.css` (the verbatim rizzfitt.css tokens).
 * Two kinds of color tokens live here:
 *  - RAW brand colors (orange, ink, cream…) — fixed hex, never mode-dependent.
 *  - SEMANTIC tokens (surface, text, accent…) — backed by CSS custom properties
 *    so any `data-mode` ancestor (os/live) recolors them automatically.
 *
 * Per the design system: orange (#F16C1D) is the ONLY brand hue. Differentiate
 * product vs event with mode + spacing + imagery — never a new color.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Raw brand palette (sampled from the official logo) ──
        orange: {
          DEFAULT: "#F16C1D",
          600: "#D75E14",
          300: "#FF9145",
        },
        ember: "#C4561A",
        peach: "#FCEADD",
        ink: {
          DEFAULT: "#121212",
          800: "#1C1B1A",
          700: "#262422",
        },
        cream: "#FBF7F2",
        sand: "#F3ECE3",
        line: "#E8DFD4",
        slate: {
          DEFAULT: "#6B635B",
          light: "#A79E94",
        },
        "white-soft": "#F5F1EC",
        // ── Semantic status ──
        live: "#FF3B30",
        success: "#1FA971",
        warning: "#FFB020",
        // ── Mode-aware semantic tokens (resolve via data-mode) ──
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        border: "var(--border)",
        rule: "var(--rule)",
        accent: "var(--accent)",
        "accent-press": "var(--accent-press)",
        "accent-soft": "var(--accent-soft)",
        "on-accent": "var(--on-accent)",
        "nav-text": "var(--nav-text)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        // Aliases so Tailwind's `font-sans`/`font-mono` defaults stay on-brand.
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        pill: "999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(18,18,18,.04),0 12px 32px rgba(18,18,18,.07)",
        pop: "0 8px 24px rgba(18,18,18,.10),0 32px 64px rgba(18,18,18,.16)",
        orange: "0 12px 40px rgba(241,108,29,.30)",
        focus: "0 0 0 3px rgba(241,108,29,.55)",
      },
      maxWidth: {
        container: "1240px",
        "container-wide": "1400px",
      },
      spacing: {
        gutter: "clamp(20px,5vw,72px)",
        "section-y": "var(--section-y)",
      },
      transitionTimingFunction: {
        rizz: "cubic-bezier(.22,.61,.36,1)",
        spring: "cubic-bezier(.34,1.56,.64,1)",
      },
      transitionDuration: {
        fast: "160ms",
        DEFAULT: "300ms",
        slow: "700ms",
      },
      letterSpacing: {
        tight: "-0.025em",
        eyebrow: "0.16em",
      },
      zIndex: {
        nav: "100",
        overlay: "1000",
        modal: "1100",
      },
    },
    // Custom breakpoints aligned to rizzfitt.css (900 / 600 collapse points).
    screens: {
      sm: "601px",
      md: "769px",
      lg: "901px",
      xl: "1240px",
      "2xl": "1400px",
    },
  },
  plugins: [],
};

export default config;
