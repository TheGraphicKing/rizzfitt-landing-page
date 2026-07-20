# RizzFitt — marketing website

> The operating system for sports communities and events.

Next.js (App Router) + TypeScript + Tailwind, with Framer Motion, GSAP +
ScrollTrigger, Lenis, and React Three Fiber. This repo is the **foundation**:
scaffold, design tokens, smooth-scroll, layout shell, the primitive library, and
a `/styleguide` verification route. Page content is built in a later pass.

## Scripts

```bash
npm run dev        # dev server (http://localhost:3000)
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

## How it's wired

- **Design tokens** — `app/globals.css` contains `rizzfitt.css` verbatim. The
  palette is mirrored into `tailwind.config.ts` (raw brand colors + mode-aware
  semantic tokens backed by CSS variables).
- **Surface modes** — `data-mode="os"` (dark) / `data-mode="live"` (light) on
  `<body>` or any `<section>`. Components read only semantic tokens, so the same
  markup works in both modes. Body defaults to `os`; `<Section mode="live">`
  overrides locally. Footer is always `os`.
- **Fonts** — Display: **Clash Display** (Fontshare `<link>` in the layout).
  Body + mono: **Geist / Geist Mono** via `next/font` (`lib/fonts.ts`). This is a
  deliberate build-brief override of the `General Sans` / `Space Mono` named in
  the design doc — the tokens stay verbatim and `--font-body` / `--font-mono`
  are remapped to the Geist variables at the bottom of `globals.css`. Every
  meaningful number renders in Geist Mono.
- **Smooth scroll** — `<SmoothScroll>` (in the root layout) drives Lenis from
  GSAP's ticker and forwards scroll to `ScrollTrigger.update()`. Disabled under
  `prefers-reduced-motion` (native scroll).
- **3D** — `<Hero3DCanvas>` lazy-loads three.js (`next/dynamic`, `ssr:false`),
  caps `dpr` at 1.75, pauses offscreen, and renders a static still on mobile
  (<768px) and under reduced motion. Confirmed absent from the initial bundle.

## Layout

```
app/                 layout (shell), globals.css, home placeholder, /styleguide
components/
  layout/            SmoothScroll, Nav, Footer, Logo
  primitives/        Section, Button, Tag, Card, CourtRule, Reveal, CountUp,
                     StatBand, Marquee, CTABand, Hero3DCanvas (+ hero3d/)
data/                events.json, products.json, partners.json (+ typed index)
lib/                 types, fonts, motion presets, cn()
public/              logo SVGs (mark + light/dark lockups), hero fallback
```

## Home page

`app/page.tsx` assembles the home from `components/home/` in this order:
Hero (os, 3D paddle + staggered headline + count-up) → TrustMarquee (two opposing
rows) → AudienceRouter (3 cards) → FlowDiagram (the one pinned GSAP set-piece:
input card pins, 8 output tiles deal out on scrub, SVG connectors draw in) →
Differentiator (live scoreboard + re-seeding bracket) → ProofStats (count-up stat
band + case teasers) → ProductsPreview (3 cards) → CTABand.

Notes:
- **One pinned section only** (FlowDiagram). The hero's 3D reacts to scroll but
  isn't pinned. FlowDiagram falls back to its final static state under reduced
  motion and at ≤900px.
- Reveals use a `useInView` hook + `animate` (not the `whileInView` prop, which
  proved unreliable under Strict Mode). Content is in the DOM at `opacity:0` and
  fades in when scrolled into a *visible* viewport.
- Closing CTA's WhatsApp link is a placeholder (`wa.me/910000000000`) — swap in
  the real number.
- The 3D hero still uses `/hero-fallback.svg` as its mobile/reduced still (a PNG
  can be dropped in later).

## Pages & forms

- **Marketing:** `/` (home), `/products/{tournament-os,community-os,run-clubs,connect}`,
  `/community`, `/partner-with-us`, `/case-studies` (+ detail), `/about` (GSAP
  horizontal journey), `/events` (+ `/events/[slug]` Template B), `/contact`,
  `/careers`, `/press`, `/faq`, `/book-a-demo`, `/list-your-tournament`,
  `/styleguide`.
- **Modes:** os (dark) — home, products, partner, contact, connect, careers;
  live (light) — events, community, case studies, about, press, faq. Live pages
  set `data-mode="live"` on `<body>` via `<PageMode>` so the sticky nav stays
  legible.
- **Reach-out system:** one typed `<ReachOutForm>` driven by 11 configs in
  `lib/forms.ts` (Tournament/Community demo, Sponsor, Brand, Venue, Creator,
  Quote, Academy, General, Careers, Press). `<FormLauncher>` opens any config in
  an accessible modal (reused on contact + partner paths + community). All forms
  validate, show a success state + WhatsApp shortcut, and POST to
  `app/api/reach-out` (placeholder — wire to email/CRM later). Connect has its own
  `waitlist` form; the footer has a `newsletter` strip.
- **FAQ:** master FAQ in `data/faq.ts` (5 groups) powers `/faq` and the per-page
  `<MiniFAQ>` blocks on home, the product pages, events and community.
- **Footer:** rich — newsletter strip, six link columns, association badges,
  socials, legal row.

## Data

`data/` is the single source of truth (design system PART 10). The events
directory, event pages, marquee, and the "45+" counter all read from
`data/index.ts`. `events.json` is currently seed data — replace with the real
event list when it lands; `EVENTS_RUN_COUNT` becomes `events.length` at that
point.

## Verify

Open [`/styleguide`](http://localhost:3000/styleguide) — it renders every
primitive in both surface modes (typography, buttons, tags, cards, the
court-rule divider, the count-up stat band, the marquee, the CTA band, and the
single 3D scene).

## Notes

- Brand hue is **orange `#F16C1D`** only — product vs. event is differentiated by
  mode + spacing + imagery, never a new color.
- Logo geometry is the official vector artwork (orange normalized from the
  source `#F36B1C` to the design-system `#F16C1D`). The `<Logo>` wordmark uses
  `currentColor`, so it adapts to the mode automatically.
- `Reveal.Item` is also exported as the standalone `RevealItem`; prefer the
  standalone import inside Server Components (static properties on a client
  component don't cross the RSC boundary).
- Deploy target: Vercel.
```
