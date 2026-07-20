import { Check } from "lucide-react";
import { Section, Tag, Button } from "@/components/primitives";

interface Tier {
  name: string;
  who: string;
  price: string;
  unit?: string;
  features: string[];
  featured?: boolean;
}

const TIERS: Tier[] = [
  {
    name: "Starter",
    who: "Single-day, single-category events.",
    price: "from ₹4,999",
    unit: "/event",
    features: ["Core stack + live scoring", "Branded site, registrations & payments", "Brackets, fixtures & comms"],
  },
  {
    name: "Pro",
    who: "Multi-category tournaments & leagues.",
    price: "from ₹14,999",
    unit: "/event",
    featured: true,
    features: ["Everything in Starter", "Sponsor toolkit", "Advanced analytics", "WhatsApp automation"],
  },
  {
    name: "Enterprise / Series",
    who: "Circuits, associations, recurring seasons.",
    price: "Custom",
    features: ["Dedicated support", "Multi-event dashboard", "White-label domain", "API access"],
  },
];

/**
 * Tournament OS pricing — three tiers (figures illustrative). Every tier
 * includes the core stack; Pro is highlighted. Reveal + hover-lift via the card
 * styles. CTAs route to the quote and demo forms.
 */
export function PricingTiers() {
  return (
    <Section mode="os">
      <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem", marginBottom: "var(--space-7)" }}>
        <Tag>Pricing</Tag>
        <h2 className="h1">Pricing that fits the event.</h2>
        <p className="body-l muted">
          Pay per event, or run a season on a plan. Every tier includes the
          website, registrations, payments, brackets, live scoring and comms.{" "}
          <span className="small">(Figures illustrative.)</span>
        </p>
      </div>

      <div className="pricing-grid">
        {TIERS.map((t) => (
          <div key={t.name} className={`price-tier${t.featured ? " price-tier--featured" : ""}`}>
            {t.featured ? <span className="tag price-tier-flag">Most popular</span> : null}
            <span className="eyebrow">{t.name}</span>
            <p className="small muted" style={{ minHeight: "2.5em" }}>
              {t.who}
            </p>
            <div className="price-amt data">
              {t.price}
              {t.unit ? <span className="price-unit"> {t.unit}</span> : null}
            </div>
            <ul className="price-feats">
              {t.features.map((f) => (
                <li key={f}>
                  <Check size={15} /> {f}
                </li>
              ))}
            </ul>
            <Button href={t.price === "Custom" ? "/contact" : "/list-your-tournament"} variant={t.featured ? "primary" : "ghost"}>
              {t.price === "Custom" ? "Talk to us" : "Get a quote"}
            </Button>
          </div>
        ))}
      </div>

      <div className="cluster" style={{ marginTop: "var(--space-7)" }}>
        <Button href="/list-your-tournament" variant="primary">
          Get a quote
        </Button>
        <Button href="/book-a-demo" variant="ghost">
          Book a demo
        </Button>
      </div>
    </Section>
  );
}
