import type { LucideIcon } from "lucide-react";
import { Section, Tag, Reveal, RevealItem } from "@/components/primitives";

export interface RevealFeature {
  name: string;
  benefit: string;
  icon: LucideIcon;
}

interface FeatureRevealGridProps {
  eyebrow: string;
  headline: string;
  features: RevealFeature[];
  /** Optional anchor id (e.g. "features" for in-page CTAs). */
  id?: string;
}

/**
 * Reusable "everything included" feature grid (os). Each tile reveals its
 * benefit line on hover / tap / focus (CSS `.reveal-line`) with an icon
 * micro-animation; tiles are focusable and expose the full text via
 * `aria-label`. Shared across product/solution pages — same engine, different
 * feature lists.
 */
export function FeatureRevealGrid({ eyebrow, headline, features, id }: FeatureRevealGridProps) {
  return (
    <Section mode="os" id={id}>
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-7)" }}>
        <Tag>{eyebrow}</Tag>
        <h2 className="h1">{headline}</h2>
      </div>

      <Reveal className="feature-grid tos-features" stagger={0.05}>
        {features.map(({ name, benefit, icon: Icon }) => (
          <RevealItem as="div" key={name}>
            <article className="feature-tile" tabIndex={0} aria-label={`${name}. ${benefit}`}>
              <span className="feature-ic" aria-hidden>
                <Icon size={20} />
              </span>
              <h3 className="h3" style={{ marginTop: "var(--space-3)", fontSize: "1.125rem" }}>
                {name}
              </h3>
              <p className="reveal-line small muted" style={{ marginTop: "var(--space-2)" }}>
                {benefit}
              </p>
            </article>
          </RevealItem>
        ))}
      </Reveal>
    </Section>
  );
}
