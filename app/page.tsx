import { Section, Tag, Button, CTABand } from "@/components/primitives";
import { MiniFAQ } from "@/components/MiniFAQ";
import { whatsappLink } from "@/lib/contact";
import { derivedStats } from "@/lib/stats";
import { cities } from "@/data";
import { HeroSection } from "@/components/home/HeroSection";
import { SocialMixers } from "@/components/home/SocialMixers";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { EventsStrip } from "@/components/home/EventsStrip";
import { TrustMarquee } from "@/components/home/TrustMarquee";
import { AudienceRouter } from "@/components/home/AudienceRouter";
import { FlowDiagram } from "@/components/home/FlowDiagram";
import { Differentiator } from "@/components/home/Differentiator";
import { ProofStats } from "@/components/home/ProofStats";
import { ProductsPreview } from "@/components/home/ProductsPreview";
import { Testimonials } from "@/components/testimonials/Testimonials";
import { IntegrationsStrip } from "@/components/IntegrationsStrip";

/**
 * RizzFitt home. Assembled entirely from foundation primitives in the spec'd
 * order. Modes alternate (os hero → live trust/router → os flow/differentiator
 * → live proof/products → os closing CTA). Exactly one pinned set-piece
 * (FlowDiagram); the hero's 3D is scroll-reactive but not pinned.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection eventsCount={derivedStats.events} />
      <ProductShowcase />
      <SocialMixers cities={cities} />
      <EventsStrip />
      <TrustMarquee />
      <AudienceRouter />
      <FlowDiagram />
      <Differentiator />
      <ProofStats />
      <ProductsPreview />
      <IntegrationsStrip mode="live" />
      <Testimonials tag="home" mode="live" heading="What organisers say." />

      {/* Partners teaser */}
      <Section mode="os">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "52rem" }}>
          <Tag>Work with us</Tag>
          <h2 className="h1">Sponsors, venues, brands and creators.</h2>
          <p className="body-l muted">
            Every RizzFitt event is a room full of engaged, high-intent players.
            If you&apos;re a brand that wants to reach them, a venue that wants to
            host, or a creator who wants to be part of it — there&apos;s a place
            for you here.
          </p>
          <div className="cluster">
            <Button href="/partner-with-us" variant="primary">
              Partner with us
            </Button>
          </div>
        </div>
      </Section>

      <MiniFAQ group="general" />
      <Section mode="os">
        <CTABand
          title="Bring your next event to life."
          primary={{ label: "Book a demo", href: "/book-a-demo" }}
          secondary={{ label: "Talk to us on WhatsApp", href: whatsappLink("Hi RizzFitt — I'd like to know more."), external: true }}
        />
      </Section>
    </>
  );
}
