import type { Partner, Product, RizzEvent } from "@/lib/types";
import eventsData from "./events.json";
import productsRaw from "./products.json";
import partnersRaw from "./partners.json";

/**
 * Typed accessors over the seed JSON. Everything that needs RizzFitt content —
 * the events directory, every event page, the marquee, and the stat counters —
 * reads from here so there is exactly one source of truth (design system PART 10).
 */

const eventsFile = eventsData as unknown as {
  _meta: {
    counts: { total: number; upcoming: number; completed: number; sports: number; cities: number };
    sports: string[];
    cities: string[];
  };
  events: RizzEvent[];
};

export const events: RizzEvent[] = eventsFile.events;
export const eventsMeta = eventsFile._meta;
export const sports: string[] = eventsFile._meta.sports;
export const cities: string[] = eventsFile._meta.cities;

export const products: Product[] = productsRaw as Product[];
export const partners: Partner[] = partnersRaw as Partner[];

/** Products that appear in the nav dropdown (live, not teaser). */
export const navProducts: Product[] = products.filter((p) => p.status === "live");

/** Upcoming events, soonest first. */
export const upcomingEvents: RizzEvent[] = events
  .filter((e) => e.status === "upcoming")
  .sort((a, b) => a.start.localeCompare(b.start));

/** Completed events, most recent first. */
export const pastEvents: RizzEvent[] = events
  .filter((e) => e.status === "completed")
  .sort((a, b) => b.start.localeCompare(a.start));

/** Featured events (homepage proof row / case studies). */
export const featuredEvents: RizzEvent[] = events.filter((e) => e.featured);

/** Look up a single event by slug. */
export function getEvent(slug: string): RizzEvent | undefined {
  return events.find((e) => e.slug === slug);
}

/** Look up a single product by slug. */
export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/**
 * The "events run" headline number. Backed by the real total (47) but rendered
 * as "45+" on the homepage — an honest floor.
 */
export const EVENTS_RUN_COUNT = eventsFile._meta.counts.total;
