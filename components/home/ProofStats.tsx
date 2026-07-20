import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Tag, StatBand, Button, Card, Reveal, RevealItem } from "@/components/primitives";
import type { Stat } from "@/components/primitives/StatBand";
import { derivedStats, MANUAL_STATS } from "@/lib/stats";

const CASES = ["Bengaluru Open", "Indian Pickleball Nationals", "KLTR Open Singapore"];

/** All real, derived from the events dataset; players-reached only shows if supplied. */
const STATS: Stat[] = [
  { value: derivedStats.events, suffix: "+", label: "Events run" },
  { value: derivedStats.cities, label: "Cities" },
  { value: derivedStats.sports, label: "Sports" },
  ...(MANUAL_STATS.playersReached != null
    ? [{ value: MANUAL_STATS.playersReached, suffix: "+", label: "Players reached" } as Stat]
    : []),
];

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
          <p className="body-l muted">
            {derivedStats.events} events run end to end across {derivedStats.cities}{" "}
            cities — every one on the software we sell.
          </p>
          <div className="cluster">
            <Button href="/events" variant="ghost" iconRight={<ArrowUpRight size={18} />}>
              See all {derivedStats.events} events
            </Button>
          </div>
        </div>

        <StatBand stats={STATS} />

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
