/**
 * Domain types for RizzFitt content. The JSON files in `data/` are the single
 * source of truth; these types describe their shape and are consumed by the
 * events directory, event pages, marquee, and the stat counters.
 */

/** Surface mode — the design system's reusability engine (PART 4). */
export type Mode = "os" | "live";

/** Lifecycle of an event listing. Drives the status pill. */
export type EventStatus = "upcoming" | "completed" | "sold-out";

/** Event format/type — toggles which modules a page assembles (Template B). */
export type EventType = "Social" | "League" | "Tournament" | "Workshop" | "Circuit";

/** Module keys that compose an event page, in render order. */
export type EventModule =
  | "hero"
  | "timeline"
  | "value-grid"
  | "partners"
  | "collage"
  | "register"
  | "faq"
  | "quick-facts"
  | "categories"
  | "schedule"
  | "standings"
  | "brackets"
  | "scoreboard"
  | "sponsors"
  | "rules"
  | "results"
  | "gallery";

/**
 * An event. Single source of truth lives in `data/events.json` and feeds the
 * directory, every `/events/[slug]` page, the trust marquee, and the counter.
 */
export interface RizzEvent {
  /** URL slug → /events/[slug] */
  slug: string;
  title: string;
  /** Sport label, e.g. "Pickleball", "Badminton". */
  sport: string;
  type: EventType;
  status: EventStatus;
  city: string;
  venue: string;
  /** ISO start date. */
  start: string;
  /** ISO end date. */
  end: string;
  year: number;
  /** Featured events surface on the homepage proof row and /case-studies. */
  featured: boolean;
  /** Path under /public (placeholder until real art is sourced). */
  image: string;
  /** Modules to render, in order (Template B). */
  modules: EventModule[];
  registrationOpen: boolean;
  /** Price in rupees, or null for free/TBA. */
  price: number | null;
  currency: string;
  tags: string[];
  /** Early-bird price in rupees (optional). */
  earlyBirdPrice?: number;
  registrationUrl?: string;
  /** If set, the event card links here (external) instead of the internal page. */
  externalUrl?: string;
  /** Start time "HH:MM" (optional). */
  startTime?: string;
  /** Named partners (optional). */
  partners?: { venue?: string; fnb?: string };
}

/** A RizzFitt product surface: `[Domain] OS`. Always rendered in `os` mode. */
export interface Product {
  id: string;
  slug: string;
  /** Full product name including the "OS" suffix, e.g. "Tournament OS". */
  name: string;
  /** Lucide icon name (see design system PART 6.2 mappings). */
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  /** "live" products appear in the nav dropdown; "teaser" are coming-soon. */
  status: "live" | "teaser";
}

/** Trust-strip / partner-wall entry. */
export interface Partner {
  id: string;
  name: string;
  type: "association" | "venue" | "sponsor";
  /** Path under /public; optional until logos are sourced. */
  logo?: string;
  location?: string;
}
