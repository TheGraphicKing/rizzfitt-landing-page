import { createElement, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Mode } from "@/lib/types";

interface SectionProps {
  children: ReactNode;
  /**
   * Local surface mode override. Sets `data-mode` on the section so every token
   * inside (and the section's own `background`/`color`) flips to os/live.
   * Omit to inherit the page/body mode.
   */
  mode?: Mode;
  /**
   * Wrap children in a centered container. `true` → 1240px, `"wide"` → 1400px,
   * `false` → no container (full-bleed). Defaults to `true`.
   */
  container?: boolean | "wide";
  /** Element to render. Defaults to `section`. */
  as?: ElementType;
  className?: string;
  /** Inner container className passthrough. */
  innerClassName?: string;
  id?: string;
}

/**
 * The repeating layout unit. Applies the `.section` vertical rhythm
 * (`--section-y`, which itself varies by mode) and an optional `data-mode`
 * override + container. Reduced-motion safe (no motion of its own).
 */
export function Section({
  children,
  mode,
  container = true,
  as: Tag = "section",
  className,
  innerClassName,
  id,
}: SectionProps) {
  const inner =
    container === false ? (
      children
    ) : (
      <div
        className={cn(
          "container",
          container === "wide" && "container-wide",
          innerClassName,
        )}
      >
        {children}
      </div>
    );

  return createElement(
    Tag,
    { id, "data-mode": mode, className: cn("section", className) },
    inner,
  );
}
