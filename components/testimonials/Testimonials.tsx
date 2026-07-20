import { Section, Tag } from "@/components/primitives";
import { getVisibleTestimonials } from "@/content/testimonials";
import { TestimonialsCarousel } from "./TestimonialsCarousel";

/**
 * Testimonials section. Env-gating happens here on the server (full access to
 * env vars): placeholders are dropped in production, so if there are no real
 * quotes yet the whole section renders nothing. Add real, permissioned quotes
 * in content/testimonials.ts to surface it.
 */
export function Testimonials({
  tag,
  mode = "live",
  eyebrow = "Testimonials",
  heading = "What organisers say.",
}: {
  tag?: string;
  mode?: "os" | "live";
  eyebrow?: string;
  heading?: string;
}) {
  const items = getVisibleTestimonials(tag);
  if (!items.length) return null;

  return (
    <Section mode={mode}>
      <div className="stack" style={{ gap: "var(--space-3)", marginBottom: "var(--space-6)" }}>
        <Tag>{eyebrow}</Tag>
        <h2 className="h1" style={{ margin: 0 }}>
          {heading}
        </h2>
      </div>
      <TestimonialsCarousel items={items} />
    </Section>
  );
}
