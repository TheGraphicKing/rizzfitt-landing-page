import Link from "next/link";
import { Trophy, Users, Footprints, ArrowRight, type LucideIcon } from "lucide-react";
import { Section, Tag, Card, Reveal, RevealItem } from "@/components/primitives";

interface ProductCard {
  name: string;
  icon: LucideIcon;
  description: string;
  href: string;
}

const PRODUCTS: ProductCard[] = [
  {
    name: "Tournament OS",
    icon: Trophy,
    description:
      "Run a professional tournament end to end: a branded website, registrations, payments, brackets, live scoring, communication and analytics — automated and done in hours.",
    href: "/products/tournament-os",
  },
  {
    name: "Community OS",
    icon: Users,
    description:
      "Build communities that show up: members, attendance, events, announcements and engagement, all in one place.",
    href: "/products/community-os",
  },
  {
    name: "Run Club OS",
    icon: Footprints,
    description:
      "Purpose-built for run clubs: weekly run registrations, pace groups, routes, attendance and partner perks.",
    href: "/products/run-clubs",
  },
];

/**
 * Products preview / "What we do" (live). Three product cards linking to their
 * product pages. The hero's "Explore products" CTA anchors here (#products).
 */
export function ProductsPreview() {
  return (
    <Section mode="live" id="products">
      <div className="stack" style={{ gap: "var(--space-7)" }}>
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>What we do</Tag>
          <h2 className="h1">Three products. One operating system.</h2>
          <p className="body-l muted">
            Sports communities don&apos;t fail for lack of passion — they fail on
            logistics. Registrations in spreadsheets, payments chased over
            WhatsApp, brackets drawn by hand, scores on paper. RizzFitt replaces
            all of that with one connected system, so organisers can focus on the
            game and the people.
          </p>
        </div>

        <Reveal className="home-products" stagger={0.08}>
          {PRODUCTS.map(({ name, icon: Icon, description, href }) => (
            <RevealItem as="div" key={name}>
              <Card as="article">
                <div className="stack" style={{ gap: "var(--space-4)" }}>
                  <span className="home-products__icon" aria-hidden>
                    <Icon size={22} />
                  </span>
                  <h3 className="h3">{name}</h3>
                  <p className="muted">{description}</p>
                  <Link
                    href={href}
                    className="cluster"
                    style={{ gap: 6, color: "var(--accent)", fontWeight: 600 }}
                  >
                    Explore {name} <ArrowRight size={16} />
                  </Link>
                </div>
              </Card>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
