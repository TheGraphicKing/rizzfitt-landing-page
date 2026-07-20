import { clsx, type ClassValue } from "clsx";

/**
 * Tiny className combiner. Wraps clsx so component call-sites read cleanly.
 * (No tailwind-merge: the design system leans on flat single-class rizzfitt
 * components, so utility-conflict resolution isn't needed here.)
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
