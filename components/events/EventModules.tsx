"use client";

import { useState, type ComponentType } from "react";
import {
  MapPin,
  CalendarDays,
  Trophy,
  IndianRupee,
  Check,
  CreditCard,
  ChevronDown,
} from "lucide-react";
import { Section, Tag, Button, Marquee } from "@/components/primitives";
import { Collage as MasonryCollage } from "@/components/Collage";
import { galleryItems, communityGalleryItems } from "@/lib/gallery";
import { getEventContent } from "@/data/event-content";
import { TOURNAMENT_APP } from "@/lib/events";
import { formatEventDate, formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { EventModule, RizzEvent } from "@/lib/types";
import { EventCountdown } from "./EventCountdown";

interface ModuleProps {
  event: RizzEvent;
}

/* ── Hero ─────────────────────────────────────────────────────────────── */
export function HeroEvent({ event }: ModuleProps) {
  const c = getEventContent(event.slug)?.hero;
  const eyebrow = c?.eyebrow ?? `${formatEventDate(event.start, event.end)} · ${event.venue}`;
  const headline = c?.headline ?? event.title;
  const sub =
    c?.sub ??
    `${event.type} · ${event.sport} in ${event.city}. ${
      event.registrationOpen ? "Registrations are open." : "Relive the action below."
    }`;
  const chips = c?.chips ?? event.tags.map((t) => t[0].toUpperCase() + t.slice(1));
  const primary =
    c?.primary ?? (event.registrationOpen ? { label: "Register now", href: "#register" } : { label: "View results", href: "#results" });
  const secondary = c?.secondary;

  return (
    <section className="event-hero" data-mode="live">
      <div className="event-hero-bg" data-sport={event.sport} aria-hidden />
      <div className="container event-hero-inner">
        <div className="stack" style={{ gap: "var(--space-5)", maxWidth: "44rem" }}>
          <Tag>{eyebrow}</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            {headline}
          </h1>
          <p className="body-l" style={{ maxWidth: "40rem" }}>
            {sub}
          </p>
          <div className="cluster">
            {chips.map((chip) => (
              <span key={chip} className="pill">
                {chip}
              </span>
            ))}
          </div>
          <div className="cluster" style={{ marginTop: "var(--space-2)" }}>
            <Button href={primary.href} variant="primary">
              {primary.label}
            </Button>
            {secondary ? (
              <Button href={secondary.href} variant="ghost">
                {secondary.label}
              </Button>
            ) : null}
          </div>
          {event.status === "upcoming" ? (
            <div className="cluster" style={{ gap: "var(--space-4)", marginTop: "var(--space-3)" }}>
              <span className="eyebrow">Starts in</span>
              <EventCountdown start={event.start} startTime={event.startTime} />
              {c?.motif ? <span className="tag">{c.motif}</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* ── Timeline (social) ────────────────────────────────────────────────── */
function EventTimeline({ event }: ModuleProps) {
  const c = getEventContent(event.slug)?.timeline;
  if (!c) return null;
  return (
    <Section mode="live">
      <Tag>{c.title}</Tag>
      <div className="ev-timeline" style={{ marginTop: "var(--space-6)" }}>
        {c.steps.map((s) => (
          <div className="ev-tl-step" key={s.time}>
            <span className="data ev-tl-time">{s.time}</span>
            <span className="h3">{s.label}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Value grid (social) ──────────────────────────────────────────────── */
function ValueGrid({ event }: ModuleProps) {
  const c = getEventContent(event.slug)?.valueGrid;
  if (!c) return null;
  return (
    <Section mode="live">
      <h2 className="h1" style={{ marginBottom: "var(--space-6)" }}>
        {c.title}
      </h2>
      <div className="feature-grid">
        {c.items.map((it) => (
          <div className="feature-tile" key={it.title}>
            <h3 className="h3" style={{ fontSize: "1.125rem" }}>
              {it.title}
            </h3>
            <p className="small muted" style={{ marginTop: "var(--space-2)" }}>
              {it.line}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ── Partners (social: venue + F&B) ───────────────────────────────────── */
function PartnerWall({ event }: ModuleProps) {
  const c = getEventContent(event.slug)?.partners;
  if (!c) return null;
  return (
    <Section mode="live">
      <Tag>Partners</Tag>
      <div className="partner-split" style={{ marginTop: "var(--space-6)" }}>
        <div className="card">
          <span className="eyebrow">
            <MapPin size={14} style={{ verticalAlign: "-2px", marginRight: 6 }} />
            Venue
          </span>
          <h3 className="h2" style={{ marginBlock: "var(--space-2)" }}>
            {c.venue.name}
          </h3>
          <p className="muted">{c.venue.note}</p>
          <div className="partner-map" aria-hidden />
        </div>
        <div className="card">
          <span className="eyebrow">Food &amp; drink</span>
          <h3 className="h2" style={{ marginBlock: "var(--space-2)" }}>
            {c.fnb.name}
          </h3>
          <p className="muted">{c.fnb.note}</p>
          <div style={{ marginTop: "var(--space-4)" }}>
            <Marquee
              label="On the breakfast buffet"
              items={c.food.map((f) => (
                <span key={f} className="pill">
                  {f}
                </span>
              ))}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ── Collage (reusable masonry + parallax + lightbox + food marquee) ──── */
function Collage({ event }: ModuleProps) {
  const c = getEventContent(event.slug)?.collage;
  if (!c) return null;
  return (
    <Section mode="live" id="collage">
      <Tag>Gallery</Tag>
      <p className="body-l muted" style={{ marginBlock: "var(--space-3) var(--space-6)" }}>
        {c.caption}
      </p>
      <MasonryCollage
        label="Event photos"
        items={event.type === "Social" ? communityGalleryItems() : galleryItems(event.sport)}
      />

      <div style={{ marginTop: "var(--space-7)" }}>
        <Marquee
          label="From the breakfast buffet"
          items={c.food.map((f) => (
            <span key={f} className="badge-assoc">
              {f}
            </span>
          ))}
        />
      </div>
    </Section>
  );
}

/* ── Register flow (3 steps + price card + Razorpay) ──────────────────── */
function RegisterFlow({ event }: ModuleProps) {
  const steps = getEventContent(event.slug)?.register?.steps ?? [
    "Pick your category",
    "Pay securely via Razorpay",
    "Get your confirmation & schedule",
  ];
  const hasEarly = typeof event.earlyBirdPrice === "number";
  return (
    <Section mode="live" id="register">
      <Tag>Register</Tag>
      <h2 className="h1" style={{ marginBlock: "var(--space-3) var(--space-7)" }}>
        Three steps to a spot.
      </h2>
      <div className="register-flow">
        <ol className="register-steps">
          {steps.map((s, i) => (
            <li key={i}>
              <span className="data register-step-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="body-l">{s}</span>
            </li>
          ))}
        </ol>
        <div className="price-card">
          <span className="eyebrow">Your spot</span>
          <div className="price-row">
            {hasEarly ? <span className="price-was data">{formatPrice(event.price, event.currency)}</span> : null}
            <span className="price-now data">
              {formatPrice(hasEarly ? event.earlyBirdPrice! : event.price, event.currency)}
            </span>
          </div>
          {hasEarly ? <span className="status-pill status-upcoming">Early bird</span> : null}
          {/* Live registration + payment happen on the tournament app. Uses the
              event's real tournament URL when known, else the app home.
              TODO(content): add each event's externalUrl in data/events.json. */}
          <Button
            href={event.externalUrl ?? TOURNAMENT_APP}
            variant="primary"
            external
            iconLeft={<CreditCard size={16} />}
          >
            Reserve via Razorpay
          </Button>
          <span className="small muted" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Check size={14} /> UPI, cards & net-banking
          </span>
        </div>
      </div>
    </Section>
  );
}

/* ── Quick facts (tournament) ─────────────────────────────────────────── */
export function QuickFacts({ event }: ModuleProps) {
  const facts = [
    { icon: CalendarDays, label: "Date", value: formatEventDate(event.start, event.end) },
    { icon: MapPin, label: "Venue", value: event.venue },
    { icon: Trophy, label: "Sport", value: `${event.sport} · ${event.type}` },
    { icon: IndianRupee, label: "Entry", value: formatPrice(event.price, event.currency) },
  ];
  return (
    <Section mode="live">
      <div className="qf-grid">
        {facts.map(({ icon: Icon, label, value }) => (
          <div className="qf-item card" key={label}>
            <span className="qf-ic" aria-hidden>
              <Icon size={18} />
            </span>
            <span className="eyebrow">{label}</span>
            <span className="body-l" style={{ fontWeight: 600 }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SAMPLE_CATEGORIES = ["Men's doubles", "Women's doubles", "Mixed doubles", "Open doubles"];
function Categories(_: ModuleProps) {
  return (
    <Section mode="live">
      <Tag>Categories</Tag>
      <div className="cluster" style={{ marginTop: "var(--space-5)", gap: "var(--space-3)" }}>
        {SAMPLE_CATEGORIES.map((c) => (
          <span key={c} className="badge-assoc">
            {c}
          </span>
        ))}
      </div>
    </Section>
  );
}

const SAMPLE_SCHEDULE = [
  { time: "Day 1 · AM", label: "Check-in & group stage" },
  { time: "Day 1 · PM", label: "Round of 16 across all courts" },
  { time: "Day 2 · AM", label: "Quarter-finals & semi-finals" },
  { time: "Day 2 · PM", label: "Finals & prize distribution" },
];
function Schedule(_: ModuleProps) {
  return (
    <Section mode="live">
      <Tag>Schedule</Tag>
      <div className="ev-timeline" style={{ marginTop: "var(--space-6)" }}>
        {SAMPLE_SCHEDULE.map((s) => (
          <div className="ev-tl-step" key={s.time}>
            <span className="data ev-tl-time">{s.time}</span>
            <span className="h3" style={{ fontSize: "1.25rem" }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const SAMPLE_STANDINGS = [
  ["1", "Smash Republic", "5", "5", "15"],
  ["2", "Net Ninjas", "5", "4", "12"],
  ["3", "Dink Dynasty", "5", "3", "9"],
  ["4", "Kitchen Kings", "5", "1", "3"],
];
function Standings(_: ModuleProps) {
  return (
    <Section mode="live">
      <Tag>Standings</Tag>
      <table className="ev-table" style={{ marginTop: "var(--space-5)" }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th>W</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {SAMPLE_STANDINGS.map((r) => (
            <tr key={r[0]}>
              <td className="data">{r[0]}</td>
              <td>{r[1]}</td>
              <td className="data">{r[2]}</td>
              <td className="data">{r[3]}</td>
              <td className="data" style={{ color: "var(--accent)" }}>
                {r[4]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}

function Brackets(_: ModuleProps) {
  return (
    <Section mode="live">
      <Tag>Brackets</Tag>
      <div className="scoreboard moat-bracket" style={{ marginTop: "var(--space-5)" }}>
        <span className="eyebrow">Knockout bracket</span>
        <svg viewBox="0 0 360 260" className="bracket-svg is-drawn" role="img" aria-label="Knockout bracket" style={{ marginTop: "var(--space-4)" }}>
          <path className="bracket-line" d="M120 40 H160 V90 H200" />
          <path className="bracket-line" d="M120 140 H160 V90" />
          <path className="bracket-line" d="M120 200 H160 V150 H200" />
          <path className="bracket-line" d="M120 240 H160 V150" />
          <path className="bracket-line" d="M280 90 H300 V120 H320" />
          <path className="bracket-line" d="M280 150 H300 V120" />
          {[
            [20, 30, "Seed 1"],
            [20, 130, "Seed 4"],
            [20, 190, "Seed 3"],
            [20, 230, "Seed 2"],
            [200, 80, "Semi A"],
            [200, 140, "Semi B"],
            [320, 110, "Final"],
          ].map(([x, y, label], i) => (
            <g className="bracket-seed" key={i}>
              <rect x={x as number} y={y as number} width="100" height="22" rx="6" />
              <text x={(x as number) + 10} y={(y as number) + 15}>
                {label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </Section>
  );
}

function Scoreboard({ event }: ModuleProps) {
  const live = event.status === "upcoming";
  return (
    <Section mode="live">
      <Tag>{live ? "Live scoring" : "Final score"}</Tag>
      <div className="scoreboard" style={{ marginTop: "var(--space-5)", maxWidth: 480 }}>
        <div className="cluster" style={{ justifyContent: "space-between", marginBottom: "var(--space-4)" }}>
          <span className="pill">
            <span className="live-dot" aria-hidden /> {live ? "Live · Court 1" : "Final · Court 1"}
          </span>
          <span className="data small muted">{event.sport}</span>
        </div>
        <div className="cluster" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
          <span className="small muted">Smash Republic</span>
          <span className="score">11 – 8</span>
          <span className="small muted">Net Ninjas</span>
        </div>
      </div>
    </Section>
  );
}

export function Sponsors(_: ModuleProps) {
  const slots = ["Title sponsor", "Venue partner", "F&B partner", "Gear partner", "Media partner", "Community partner"];
  return (
    <Section mode="live">
      <Tag>Sponsors</Tag>
      <div className="partner-wall" style={{ marginTop: "var(--space-6)" }}>
        {slots.map((s) => (
          <div className="badge-assoc" key={s} style={{ justifyContent: "center" }}>
            {s}
          </div>
        ))}
      </div>
    </Section>
  );
}

const SAMPLE_RULES = [
  "Matches are best of 3 games to 11, win by 2.",
  "Rally scoring on the live board; referees confirm.",
  "Players must check in 30 minutes before their first match.",
  "Standard sanctioned equipment and court rules apply.",
];
export function Rules(_: ModuleProps) {
  return (
    <Section mode="live">
      <Tag>Rules</Tag>
      <ul className="ev-rules" style={{ marginTop: "var(--space-5)" }}>
        {SAMPLE_RULES.map((r) => (
          <li key={r}>
            <Check size={16} /> {r}
          </li>
        ))}
      </ul>
    </Section>
  );
}

const PODIUM = [
  ["1st", "Smash Republic"],
  ["2nd", "Net Ninjas"],
  ["3rd", "Dink Dynasty"],
];
function Results(_: ModuleProps) {
  return (
    <Section mode="live" id="results">
      <Tag>Results</Tag>
      <div className="podium" style={{ marginTop: "var(--space-6)" }}>
        {PODIUM.map(([place, team]) => (
          <div className="podium-step card" key={place}>
            <span className="data podium-place">{place}</span>
            <span className="h3" style={{ fontSize: "1.25rem" }}>
              {team}
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Gallery({ event }: ModuleProps) {
  return (
    <Section mode="live">
      <Tag>Gallery</Tag>
      <div style={{ marginTop: "var(--space-6)" }}>
        <MasonryCollage
          label="Event gallery"
          items={event.type === "Social" ? communityGalleryItems() : galleryItems(event.sport)}
        />
      </div>
    </Section>
  );
}

/* ── FAQ accordion ────────────────────────────────────────────────────── */
const GENERIC_FAQ = [
  { q: "How do I register?", a: "Pick your category and pay securely via Razorpay — you'll get instant confirmation." },
  { q: "What categories are there?", a: "Singles and doubles across skill levels; exact categories are listed above." },
  { q: "How does scoring work?", a: "Live, on the public board — scores update in real time and referees confirm." },
  { q: "Are refunds available?", a: "Refund and cancellation rules are set per event; reach out and we'll help." },
];
export function EventFAQ({ event }: ModuleProps) {
  const items = getEventContent(event.slug)?.faq ?? GENERIC_FAQ;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Section mode="live">
      <Tag>FAQ</Tag>
      <div style={{ marginTop: "var(--space-5)", maxWidth: "52rem" }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div className="faq-item" key={it.q} aria-expanded={isOpen}>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {it.q}
                <ChevronDown size={20} style={{ transition: "transform var(--t)", transform: isOpen ? "rotate(180deg)" : "none" }} />
              </button>
              <div className="faq-a" style={{ maxHeight: isOpen ? 400 : 0 }}>
                <p className="muted" style={{ paddingBottom: "var(--space-5)" }}>
                  {it.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

/** Founder add-on: collaboration CTA (social pages with collab content). */
export function CollaborationCTA({ event }: ModuleProps) {
  const c = getEventContent(event.slug)?.collab;
  if (!c) return null;
  return (
    <Section mode="live">
      <div className="organiser-band">
        <Tag>{c.eyebrow}</Tag>
        <h2 className="h1" style={{ marginBlock: "var(--space-3)" }}>
          {c.headline}
        </h2>
        <p className="body-l muted" style={{ maxWidth: "46rem", marginBottom: "var(--space-6)" }}>
          {c.body}
        </p>
        <Button href={c.cta.href} variant="primary">
          {c.cta.label}
        </Button>
      </div>
    </Section>
  );
}

/**
 * Renders an event's modules in order. This MUST be a client component: the
 * registry lookup has to happen client-side, because a plain object exported
 * from a "use client" module becomes an opaque client *reference* when imported
 * into a Server Component (property access would yield undefined).
 */
export function EventModuleStack({ event }: ModuleProps) {
  return (
    <>
      {event.modules.map((m) => {
        const Module = EVENT_MODULES[m];
        return Module ? <Module key={m} event={event} /> : null;
      })}
    </>
  );
}

/** Module registry — key → component. Used only within this client module. */
const EVENT_MODULES: Partial<Record<EventModule, ComponentType<ModuleProps>>> = {
  hero: HeroEvent,
  timeline: EventTimeline,
  "value-grid": ValueGrid,
  partners: PartnerWall,
  collage: Collage,
  register: RegisterFlow,
  faq: EventFAQ,
  "quick-facts": QuickFacts,
  categories: Categories,
  schedule: Schedule,
  standings: Standings,
  brackets: Brackets,
  scoreboard: Scoreboard,
  sponsors: Sponsors,
  rules: Rules,
  results: Results,
  gallery: Gallery,
};
