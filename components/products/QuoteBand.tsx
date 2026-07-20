import { Section } from "@/components/primitives";

/**
 * Large centered pull-quote band (os). An emotional beat between feature density
 * and the closing CTA.
 */
export function QuoteBand({ quote }: { quote: string }) {
  return (
    <Section mode="os">
      <figure className="quote-band">
        <span className="quote-mark" aria-hidden>
          &ldquo;
        </span>
        <blockquote className="display-l" style={{ margin: 0 }}>
          {quote}
        </blockquote>
      </figure>
    </Section>
  );
}
