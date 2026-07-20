import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Section, Tag, Button, StatBand } from "@/components/primitives";
import { PageMode } from "@/components/layout/PageMode";
import { Collage } from "@/components/Collage";
import { galleryItems } from "@/lib/gallery";
import { CASE_STUDIES, getCaseStudy } from "@/data/case-studies";
import { getEvent } from "@/data";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return { title: `${c.title} — case study`, description: c.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const event = c.eventSlug ? getEvent(c.eventSlug) : undefined;

  return (
    <>
      <PageMode mode="live" />

      <section className="event-hero" data-mode="live">
        <div className="event-hero-bg" aria-hidden />
        <div className="container event-hero-inner">
          <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "44rem" }}>
            <Tag>Case study · {c.sport}</Tag>
            <h1 className="display-l" style={{ margin: 0 }}>
              {c.title}
            </h1>
            <p className="data muted">{c.location}</p>
            <p className="body-l">{c.summary}</p>
          </div>
        </div>
      </section>

      {/* OS stat band for contrast */}
      <Section mode="os">
        <Tag>By the numbers</Tag>
        <div style={{ marginTop: "var(--space-6)" }}>
          <StatBand stats={c.stats.map((s) => ({ value: s.value, suffix: s.suffix, label: s.label }))} />
        </div>
      </Section>

      <Section mode="live">
        <div className="stack" style={{ gap: "var(--space-4)", maxWidth: "48rem" }}>
          <Tag>What we ran</Tag>
          <p className="body-l">{c.detail}</p>
          {event ? (
            <Link href={`/events/${event.slug}`} className="cluster" style={{ gap: 6, color: "var(--accent)", fontWeight: 600 }}>
              See the event page <ArrowRight size={16} />
            </Link>
          ) : null}
        </div>
      </Section>

      {/* Gallery */}
      <Section mode="live">
        <Tag>Gallery</Tag>
        <div style={{ marginTop: "var(--space-6)" }}>
          <Collage label={`${c.title} photos`} items={galleryItems(c.sport)} />
        </div>
      </Section>

      <Section mode="live">
        <div className="cta-band">
          <h2 className="h1" style={{ marginBottom: "var(--space-6)" }}>
            Want this for your event?
          </h2>
          <div className="cluster" style={{ justifyContent: "center" }}>
            <Button href="/book-a-demo" variant="primary">
              Book a demo
            </Button>
            <Button href="/case-studies" variant="ghost">
              All case studies
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
