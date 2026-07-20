import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Button } from "./Button";

interface CTAAction {
  label: string;
  href: string;
  /** Open in a new tab (adds rel=noopener) — e.g. WhatsApp / external apps. */
  external?: boolean;
}

interface CTABandProps {
  title: ReactNode;
  /** Optional one-line supporting copy. */
  subtitle?: ReactNode;
  /** Primary action. On the orange band it inverts to an ink fill (per CSS). */
  primary: CTAAction;
  /** Optional secondary (ghost) action. */
  secondary?: CTAAction;
  className?: string;
}

/**
 * Full-orange call-to-action band. Headline in Clash, sentence case. The
 * primary button auto-inverts to ink-on-orange via `.cta-band .btn-primary`.
 */
export function CTABand({ title, subtitle, primary, secondary, className }: CTABandProps) {
  return (
    <div className={cn("cta-band", className)}>
      <h2 className="h1" style={{ marginBottom: subtitle ? "var(--space-3)" : "var(--space-6)" }}>
        {title}
      </h2>
      {subtitle ? (
        <p className="body-l" style={{ marginBottom: "var(--space-6)", opacity: 0.9 }}>
          {subtitle}
        </p>
      ) : null}
      <div className="cluster" style={{ justifyContent: "center" }}>
        <Button href={primary.href} variant="primary" external={primary.external}>
          {primary.label}
        </Button>
        {secondary ? (
          <Button href={secondary.href} variant="ghost" external={secondary.external}>
            {secondary.label}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
