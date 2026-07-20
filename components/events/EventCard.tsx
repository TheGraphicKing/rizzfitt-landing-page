import Link from "next/link";
import { cn } from "@/lib/cn";
import { formatShortDate } from "@/lib/format";
import { EventCover } from "./EventCover";
import { realOrNone } from "@/lib/assets";
import { canonicalEventUrl } from "@/lib/events";
import type { RizzEvent } from "@/lib/types";

const STATUS_LABEL: Record<RizzEvent["status"], string> = {
  upcoming: "Upcoming",
  completed: "Completed",
  "sold-out": "Sold out",
};
const STATUS_CLASS: Record<RizzEvent["status"], string> = {
  upcoming: "status-upcoming",
  completed: "status-completed",
  "sold-out": "status-soldout",
};

/**
 * Event card for the directory. Branded placeholder media (real photos drop in
 * under /public/photos/events/<slug>/), mono date, sport tag, status pill, and
 * Clash title. Upcoming events get an orange glow ring. Reads from events.json.
 */
export function EventCard({ event }: { event: RizzEvent }) {
  const upcoming = event.status === "upcoming";
  const inner = (
    <article className={cn("event-card", upcoming && "event-card--glow")}>
      <EventCover sport={event.sport} type={event.type} src={realOrNone(event.image)} alt={event.title} className="media" />
      <div className="meta stack" style={{ gap: "var(--space-3)" }}>
        <div className="cluster" style={{ justifyContent: "space-between" }}>
          <span className="date">{formatShortDate(event.start)}</span>
          <span className={cn("status-pill", STATUS_CLASS[event.status])}>
            {STATUS_LABEL[event.status]}
          </span>
        </div>
        <h3 className="h3">{event.title}</h3>
        <span className="small muted">
          {event.venue} · {event.city}
        </span>
      </div>
    </article>
  );

  const label = `${event.title} — ${STATUS_LABEL[event.status]}`;
  const { href, external } = canonicalEventUrl(event);

  // Registration/live events link to the tournament app; everything else opens
  // its marketing page on this site. Behaviour is centralised in canonicalEventUrl.
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens tournament site)`}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={label}>
      {inner}
    </Link>
  );
}
