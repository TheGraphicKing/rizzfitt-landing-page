import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Tag, StatBand, Card, Reveal, RevealItem } from "@/components/primitives";

const CASES = ["Bengaluru Open", "Indian Pickleball Nationals", "KLTR Open Singapore"];

/**
 * Proof / track record (live). Count-up stat band plus three case teasers
 * linking to the case studies. Stats animate on scroll via the StatBand
 * primitive; reduced motion shows final values immediately.
 */
export function ProofStats() {
  return (
    <Section mode="live">
      <div className="stack" style={{ gap: "var(--space-7)" }}>
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem" }}>
          <Tag>The track record</Tag>
          <h2 className="h1">Built on real events.</h2>
        </div>

        <StatBand
          stats={[
            { value: 45, suffix: "+", label: "Events" },
            { value: 15, suffix: "+", label: "Cities" },
            { value: 4, label: "Sports" },
            { value: 8000, suffix: "+", label: "Players reached" },
          ]}
        />

        <Reveal
          className="case-teasers"
          stagger={0.08}
        >
          {CASES.map((c) => (
            <RevealItem as="div" key={c}>
              <Link href="/case-studies" aria-label={`Case study: ${c}`}>
                <Card>
                  <div className="cluster" style={{ justifyContent: "space-between" }}>
                    <span className="h3">{c}</span>
                    <ArrowUpRight size={20} style={{ color: "var(--accent)" }} />
                  </div>
                </Card>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
