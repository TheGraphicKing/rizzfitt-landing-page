import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface CourtRuleProps {
  className?: string;
  /** Accessible role hint. Defaults to a presentational separator. */
  label?: string;
  style?: CSSProperties;
}

/**
 * The signature divider: a hairline rule with one offset orange tick (the
 * "kitchen line"). Use between sections instead of a plain <hr>. Mode-aware via
 * `--rule` / `--accent`.
 */
export function CourtRule({ className, label, style }: CourtRuleProps) {
  return (
    <hr
      className={cn("court-rule", className)}
      role="separator"
      aria-label={label}
      style={style}
    />
  );
}
