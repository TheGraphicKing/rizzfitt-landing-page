import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Designed per-sport cover art for event cards/heroes — a court motif + sport
 * glyph over an on-brand gradient, so cards feel photographic without scraping
 * copyrighted imagery. Drop a real photo at the event's `image` path and pass
 * `src` to override.
 */

const LINE = "rgba(255,255,255,0.55)";
const FAINT = "rgba(255,255,255,0.22)";

function Frame({ id, from, to, children }: { id: string; from: string; to: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 300 200" preserveAspectRatio="xMidYMid slice" aria-hidden className="event-cover-svg">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <rect width="300" height="200" fill={`url(#${id})`} />
      {children}
    </svg>
  );
}

function Pickleball() {
  return (
    <Frame id="cv-pb" from="#FF9145" to="#C4561A">
      <g stroke={LINE} strokeWidth="2" fill="none">
        <rect x="60" y="34" width="180" height="132" rx="4" />
        <line x1="150" y1="34" x2="150" y2="166" />
        <line x1="105" y1="34" x2="105" y2="166" stroke={FAINT} />
        <line x1="195" y1="34" x2="195" y2="166" stroke={FAINT} />
      </g>
      <circle cx="214" cy="56" r="11" fill="#FBF7F2" />
      <g fill="#C4561A"><circle cx="211" cy="53" r="1.4" /><circle cx="217" cy="54" r="1.4" /><circle cx="213" cy="59" r="1.4" /><circle cx="218" cy="59" r="1.4" /></g>
    </Frame>
  );
}
function Badminton() {
  return (
    <Frame id="cv-bd" from="#262422" to="#121212">
      <g stroke={LINE} strokeWidth="2" fill="none">
        <rect x="58" y="30" width="184" height="140" rx="3" />
        <line x1="150" y1="30" x2="150" y2="170" stroke="#F16C1D" />
        <line x1="58" y1="70" x2="242" y2="70" stroke={FAINT} />
        <line x1="58" y1="130" x2="242" y2="130" stroke={FAINT} />
      </g>
      <g transform="translate(210 52)">
        <circle cx="0" cy="0" r="7" fill="#FBF7F2" />
        <path d="M-6 -2 L-16 -16 M0 -7 L0 -22 M6 -2 L16 -16" stroke="#FBF7F2" strokeWidth="2" fill="none" />
      </g>
    </Frame>
  );
}
function Cricket() {
  return (
    <Frame id="cv-ck" from="#F16C1D" to="#8f3d12">
      <rect x="128" y="28" width="44" height="144" rx="4" fill="rgba(251,247,242,0.15)" />
      <g stroke={LINE} strokeWidth="2"><line x1="138" y1="40" x2="138" y2="64" /><line x1="150" y1="40" x2="150" y2="64" /><line x1="162" y1="40" x2="162" y2="64" /></g>
      <circle cx="210" cy="150" r="12" fill="#7a1f12" />
      <path d="M201 145 Q210 150 219 145 M201 155 Q210 150 219 155" stroke="#FBF7F2" strokeWidth="1.5" fill="none" />
    </Frame>
  );
}
function Football() {
  return (
    <Frame id="cv-fb" from="#1C1B1A" to="#C4561A">
      <g stroke={LINE} strokeWidth="2" fill="none">
        <rect x="40" y="34" width="220" height="132" rx="4" />
        <line x1="150" y1="34" x2="150" y2="166" />
        <circle cx="150" cy="100" r="30" />
      </g>
      <g transform="translate(150 100)">
        <circle r="13" fill="#FBF7F2" />
        <path d="M0 -8 L7 -2 L4 7 L-4 7 L-7 -2 Z" fill="#121212" />
      </g>
    </Frame>
  );
}
function Circuit() {
  return (
    <Frame id="cv-ci" from="#FF9145" to="#F16C1D">
      <g stroke={LINE} strokeWidth="2" fill="none">
        <circle cx="150" cy="100" r="64" />
        <circle cx="150" cy="100" r="42" stroke={FAINT} />
        <circle cx="150" cy="100" r="20" />
      </g>
    </Frame>
  );
}

const BY_SPORT: Record<string, () => React.ReactElement> = {
  Pickleball,
  Badminton,
  Cricket,
  Football,
  Circuit,
};

export function EventCover({
  sport,
  type,
  src,
  alt,
  className,
}: {
  sport: string;
  type?: string;
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={cn("event-cover", className)}>
        <Image src={src} alt={alt ?? sport} fill sizes="(max-width: 900px) 100vw, 33vw" style={{ objectFit: "cover" }} />
      </div>
    );
  }
  const Art = BY_SPORT[sport] ?? Pickleball;
  return (
    <div className={cn("event-cover", className)}>
      <Art />
      <span className="event-cover-sport">{sport}</span>
      {type ? <span className="event-cover-type data">{type}</span> : null}
    </div>
  );
}
