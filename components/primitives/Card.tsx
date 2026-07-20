import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  /** Element to render. Defaults to `div` (use `article`/`li` where semantic). */
  as?: ElementType;
  className?: string;
}

/**
 * Warm-fill surface card with a soft 1px inset border. Lifts -4px and gains an
 * orange border on hover (CSS-driven, reduced-motion safe). Reads `--surface-2`
 * + `--border`, so it works unchanged in both modes.
 */
export function Card({ children, as: Tag = "div", className }: CardProps) {
  return createElement(Tag, { className: cn("card", className) }, children);
}
