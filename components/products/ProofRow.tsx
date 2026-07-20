import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Tag, Card, Reveal, RevealItem } from "@/components/primitives";

const CASES = [
  { name: "Bengaluru Open", meta: "Pickleball · Bengaluru" },
  { name: "Indian Pickleball Nationals", meta: "Pickleball · National" },
  { name: "WPPL Season 1", meta: "Pickleball league · Multi-city" },
];

const BADGES = ["TNPA", "Indian Pickleball Association"];

/**
 * Proof row (os). Three case cards linking to the case studies, plus the
 * sanctioning-body badges. Cards stagger in on scroll.
 */
export function ProofRow() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-7)" }}>
        <Tag>Proof</Tag>
        <h2 className="h1">Run on real tournaments.</h2>
      </div>

      <Reveal className="home-products" stagger={0.08}>
        {CASES.map((c) => (
          <RevealItem as="div" key={c.name}>
            <Link href="/case-studies" aria-label={`Case study: ${c.name}`}>
              <Card as="article">
                <div className="stack" style={{ gap: "var(--space-2)" }}>
                  <div className="cluster" style={{ justifyContent: "space-between" }}>
                    <span className="eyebrow">Case study</span>
                    <ArrowUpRight size={18} style={{ color: "var(--accent)" }} />
                  </div>
                  <span className="h3">{c.name}</span>
                  <span className="data small muted">{c.meta}</span>
                </div>
              </Card>
            </Link>
          </RevealItem>
        ))}
      </Reveal>

      <div className="cluster" style={{ marginTop: "var(--space-7)", gap: "var(--space-4)" }}>
        <span className="small muted">Sanctioned with</span>
        {BADGES.map((b) => (
          <span key={b} className="badge-assoc">
            {b}
          </span>
        ))}
      </div>
    </Section>
  );
}
