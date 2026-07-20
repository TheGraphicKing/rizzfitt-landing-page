"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, Users, Coffee, Sparkles, ArrowRight, type LucideIcon } from "lucide-react";
import { Section, Tag, Button } from "@/components/primitives";
import { Collage } from "@/components/Collage";
import { communityGalleryItems } from "@/lib/gallery";

const POINTS: { icon: LucideIcon; label: string; line: string }[] = [
  { icon: Activity, label: "Just play", line: "A game is the icebreaker — no small talk required." },
  { icon: Users, label: "Matched by level", line: "Pods are matched by level; first-timers are deliberately paired." },
  { icon: Sparkles, label: "Your first rally", line: "Never held a paddle? Perfect. Your first rally will feel great." },
  { icon: Coffee, label: "Stay for breakfast", line: "The table is the point — leave with names, not just a workout." },
];

/**
 * Homepage Social Mixers section (consumer-facing, energetic). Sits right after
 * the hero to make the community side a first-class part of the site. Includes a
 * city selector that deep-links into the events directory and a primary CTA to
 * the full mixers page.
 */
export function SocialMixers({ cities }: { cities: string[] }) {
  const [city, setCity] = useState("");
  const cityHref = city ? `/events?city=${encodeURIComponent(city)}` : "/mixers";

  return (
    <Section mode="live" id="mixers">
      <div className="stack" style={{ gap: "var(--space-6)" }}>
        <div className="stack" style={{ gap: "var(--space-3)", maxWidth: "48rem" }}>
          <Tag>RizzFitt Socials</Tag>
          <h2 className="display-l" style={{ margin: 0 }}>
            Come for the game. Stay for the people.
          </h2>
          <p className="body-l muted">
            Our social mixers are the friendliest way to meet people in your city —
            beginner-first pickleball where a game breaks the ice and breakfast
            keeps everyone talking. Come alone, leave with a group chat.
          </p>
        </div>

        <div className="what-row">
          {POINTS.map(({ icon: Icon, label, line }) => (
            <div className="what-step" key={label}>
              <span className="what-ic" aria-hidden>
                <Icon size={22} />
              </span>
              <span className="h3" style={{ fontSize: "1.15rem" }}>
                {label}
              </span>
              <span className="small muted">{line}</span>
            </div>
          ))}
        </div>

        {/* Real photos from the Bangalore mixer */}
        <Collage label="Photos from a recent RizzFitt Socials mixer" items={communityGalleryItems()} />

        {/* City selector + CTAs */}
        <div
          className="cluster"
          style={{ gap: "var(--space-3)", alignItems: "center", flexWrap: "wrap" }}
        >
          <label className="filter-select">
            <span className="sr-only">Choose your city</span>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label="Find a mixer near you — choose your city"
            >
              <option value="">Find a mixer near you…</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <Button href={cityHref} variant="primary" iconRight={<ArrowRight size={18} />}>
            {city ? `See what's on in ${city}` : "Browse mixers"}
          </Button>
          <Link href="/mixers" className="cluster small" style={{ gap: 6, color: "var(--accent)", fontWeight: 600 }}>
            How mixers work <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </Section>
  );
}
