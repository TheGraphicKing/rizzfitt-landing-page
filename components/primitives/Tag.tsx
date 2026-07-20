import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /** Optional leading icon (Lucide element, sized ~14px). */
  icon?: ReactNode;
  className?: string;
}

/**
 * Eyebrow / tag pill — Space-Mono-equivalent (Geist Mono) uppercase, accent on
 * accent-soft. Use for section eyebrows, sport labels, and small categorical
 * chips. Mode-aware via tokens.
 */
export function Tag({ children, icon, className }: TagProps) {
  return (
    <span className={cn("tag", className)}>
      {icon}
      {children}
    </span>
  );
}
