import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section, Tag, Button, Card, CTABand } from "@/components/primitives";
import { MiniFAQ } from "@/components/MiniFAQ";
import { CONTACT, whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Pricing — simple, event-based",
  description:
    "RizzFitt is priced per event and per community, scaled to your size. Tell us what you're running and we'll put together a plan.",
};

/*
 * TODO(content): supply the real pricing model before launch. Options:
 *   - concrete tiers (name, price, what's included, limits), OR
 *   - keep the quote-based framing below and just confirm the copy.
 * Until then this page is honest: it explains HOW pricing works and routes to a
 * quote, rather than inventing prices.
 */
const PLANS: { name: string; who: string; includes: string[] }[] = [
  {
    name: "Single event",
    who: "One tournament, league weekend or mixer.",
    includes: [
      "Registration site + payments",
      "Auto fixtures, seeding & live scoring",
      "Sponsor placements & overlays",
      "Post-event results & gallery",
    ],
  },
  {
    name: "Season / series",
    who: "A recurring league or a run of events.",
    includes: [
      "Everything in Single event",
      "Multi-event dashboard",
      "Returning-player data across events",
      "Priority support on event days",
    ],
  },
  {
    name: "Community",
    who: "An ongoing community, club or academy.",
    includes: [
      "Community OS: members, comms, RSVPs",
      "Recurring sessions & matchmaking",
      "Attendance & engagement analytics",
      "Unlimited events on your calendar",
    ],
  },
];

export default function PricingPage() {
  return (
    <>
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem", marginBottom: "var(--space-7)" }}>
          <Tag>Pricing</Tag>
          <h1 className="display-l" style={{ margin: 0 }}>
            Priced to your event, not a seat count.
          </h1>
          <p className="body-l muted">
            RizzFitt is priced per event or per community and scaled to your size —
            a Saturday mixer and a national championship shouldn&apos;t cost the
            same. Tell us what you&apos;re running and we&apos;ll put together a
            plan and a quote, usually within one business day.
          </p>
          <div className="cluster">
            <Button href="/book-a-demo" variant="primary">
              Get a quote
            </Button>
            <Button
              href={whatsappLink("Hi RizzFitt — I'd like pricing for an event I'm running.")}
              variant="ghost"
              external
            >
              Ask on WhatsApp
            </Button>
          </div>
        </div>

        <div className="home-products">
          {PLANS.map((plan) => (
            <Card key={plan.name} as="article">
              <div className="stack" style={{ gap: "var(--space-3)" }}>
                <h2 className="h2" style={{ margin: 0, fontSize: "1.5rem" }}>
                  {plan.name}
                </h2>
                <p className="small muted">{plan.who}</p>
                <p className="data" style={{ color: "var(--accent)" }}>
                  {/* TODO(content): real price or "from ₹X" */}
                  Custom quote
                </p>
                <ul className="stack" style={{ gap: "var(--space-2)", listStyle: "none", padding: 0, margin: 0 }}>
                  {plan.includes.map((f) => (
                    <li key={f} className="cluster small" style={{ gap: 8, alignItems: "flex-start" }}>
                      <Check size={16} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 3 }} aria-hidden />
                      <span className="muted">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>

        <p className="small muted" style={{ marginTop: "var(--space-6)" }}>
          Not sure which fits? Email{" "}
          <a href={`mailto:${CONTACT.email}`} style={{ color: "var(--accent)" }}>
            {CONTACT.email}
          </a>{" "}
          or call{" "}
          <a href={CONTACT.phoneTel} style={{ color: "var(--accent)" }}>
            {CONTACT.phone}
          </a>
          .
        </p>
      </Section>

      <MiniFAQ group="general" mode="os" />

      <Section mode="os">
        <CTABand
          title="Tell us what you're running."
          primary={{ label: "Get a quote", href: "/book-a-demo" }}
          secondary={{ label: "List your tournament", href: "/list-your-tournament" }}
        />
      </Section>
    </>
  );
}
