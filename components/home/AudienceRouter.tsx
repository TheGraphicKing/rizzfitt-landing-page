import Link from "next/link";
import { ArrowRight, Trophy, Users, CalendarDays, type LucideIcon } from "lucide-react";
import { Section, Tag, Reveal, RevealItem } from "@/components/primitives";

interface Route {
  audience: string;
  blurb: string;
  cta: string;
  href: string;
  icon: LucideIcon;
}

const ROUTES: Route[] = [
  {
    audience: "Organisers",
    blurb: "Run a tournament or league end to end.",
    cta: "Tournament OS",
    href: "/products/tournament-os",
    icon: Trophy,
  },
  {
    audience: "Clubs & communities",
    blurb: "Manage members, runs and events.",
    cta: "Community OS",
    href: "/products/community-os",
    icon: Users,
  },
  {
    audience: "Players",
    blurb: "Find events and mixers near you.",
    cta: "Events",
    href: "/events",
    icon: CalendarDays,
  },
];

/**
 * Audience router (live). Three cards, each routing to a product/section. Cards
 * stagger in on scroll (Reveal) and lift on hover (CSS). Whole card is a link
 * for a large, keyboard-friendly target.
 */
export function AudienceRouter() {
  return (
    <Section mode="live">
      <div className="stack" style={{ gap: "var(--space-7)" }}>
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem" }}>
          <Tag>Find your path</Tag>
          <h2 className="h1">One platform, three ways in.</h2>
        </div>

        <Reveal className="router" stagger={0.09}>
          {ROUTES.map(({ audience, blurb, cta, href, icon: Icon }) => (
            <RevealItem as="div" key={audience}>
              <Link href={href} className="router-card" aria-label={`${audience}: ${cta}`}>
                <span
                  aria-hidden
                  style={{
                    display: "grid",
                    placeItems: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "var(--r-md)",
                    background: "var(--accent-soft)",
                    color: "var(--accent)",
                    position: "absolute",
                    top: "var(--space-6)",
                    left: "var(--space-6)",
                  }}
                >
                  <Icon size={22} />
                </span>
                <div className="stack" style={{ gap: "var(--space-2)" }}>
                  <span className="eyebrow">{audience}</span>
                  <span className="h3">{blurb}</span>
                  <span
                    className="cluster"
                    style={{ gap: 6, color: "var(--accent)", marginTop: "var(--space-2)" }}
                  >
                    {cta} <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
