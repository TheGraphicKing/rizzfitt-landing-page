import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section, Tag } from "@/components/primitives";
import { EventCard } from "@/components/events/EventCard";
import { eventsStripSelection } from "@/lib/events";
import { derivedStats } from "@/lib/stats";

/**
 * Homepage "Upcoming & recent events" strip. Reads the same events dataset that
 * powers /events (single source of truth), shows the next upcoming events then
 * the most recent completed ones, and links each to its canonical destination
 * (the tournament app for live registration, otherwise its marketing page).
 * Doubles as social proof for organisers.
 */
export function EventsStrip() {
  const events = eventsStripSelection(6);
  if (!events.length) return null;

  return (
    <Section mode="live">
      <div
        className="cluster"
        style={{ justifyContent: "space-between", alignItems: "flex-end", marginBottom: "var(--space-6)", flexWrap: "wrap", gap: "var(--space-4)" }}
      >
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "40rem" }}>
          <Tag>Upcoming &amp; recent</Tag>
          <h2 className="h1" style={{ margin: 0 }}>
            Real events, happening now.
          </h2>
        </div>
        <Link
          href="/events"
          className="cluster"
          style={{ gap: 6, color: "var(--accent)", fontWeight: 600 }}
        >
          See all {derivedStats.events} events <ArrowRight size={18} />
        </Link>
      </div>

      <div className="event-grid">
        {events.map((e) => (
          <EventCard key={e.slug} event={e} />
        ))}
      </div>
    </Section>
  );
}
