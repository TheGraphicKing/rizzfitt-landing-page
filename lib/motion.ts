import type { Variants, Transition } from "framer-motion";

/** A cubic-bezier easing tuple. */
type Bezier = [number, number, number, number];

/**
 * Shared motion language for RizzFitt.
 *
 * Design system PART 8: reveals are opacity 0→1 + y 16→0, ~150–300ms, easing
 * cubic-bezier(.22,.61,.36,1), pops use a spring. Every consumer must honour
 * `prefers-reduced-motion` — the variant factories below take a `reduced` flag
 * and drop all transforms (opacity-only) when it's set.
 */

/** The signature RizzFitt ease. Matches `--ease` in rizzfitt.css. */
export const EASE: Bezier = [0.22, 0.61, 0.36, 1];

/** Spring used for "pops" (badges, count finishes). */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 420,
  damping: 28,
};

/** Default in-view viewport: trigger ~15% in, animate once. */
export const VIEWPORT = { once: true, amount: 0.15 } as const;

/**
 * Container variants that stagger their children.
 * @param stagger seconds between children (design system: 60–90ms)
 * @param reduced when true, disables stagger delay
 */
export function staggerContainer(stagger = 0.05, reduced = false): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: 0,
      },
    },
  };
}

/**
 * A single revealed item. Reduced motion → opacity only, no y-transform.
 * Kept fast and subtle (design system PART 8: 150–300ms): short travel, ~0.36s.
 * @param y travel distance in px
 */
export function revealItem(y = 14, reduced = false): Variants {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0 : 0.36, ease: EASE },
    },
  };
}

/** Page-transition cross-fade + 8px rise (design system PART 8.2). */
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.15, ease: EASE } },
};
