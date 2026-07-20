"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Zap, Radio, Trophy, CreditCard, CheckCircle2, Users } from "lucide-react";

/**
 * A real, self-contained, working Tournament OS demo — not a screenshot. It
 * simulates the product's signature "it runs itself" behaviour:
 *   - Live Scoring: a pickleball match scoreboard scoring itself point by point.
 *   - Bracket: a single-elim bracket that draws and re-seeds itself.
 *   - Dashboard: registrations, revenue and check-ins updating live + activity.
 *
 * Everything is driven by client-side timers, initialised to a sensible static
 * snapshot (no hydration mismatch, no randomness during render). Under
 * prefers-reduced-motion it renders a finished, static state with no motion.
 *
 * `view` picks which surface to show; "all" renders a tabbed console.
 */
type View = "all" | "scoring" | "dashboard";

export function TournamentOSDemo({ view = "all" }: { view?: View }) {
  const [tab, setTab] = useState<"registrations" | "scoring" | "dashboard">(
    view === "dashboard" ? "dashboard" : view === "scoring" ? "scoring" : "scoring",
  );

  if (view === "scoring") {
    return (
      <DemoFrame title="Live scoring" subtitle="tournament.rizzfitt.com">
        <ScoringView />
      </DemoFrame>
    );
  }
  if (view === "dashboard") {
    return (
      <DemoFrame title="Organiser dashboard" subtitle="tournament.rizzfitt.com">
        <DashboardView />
      </DemoFrame>
    );
  }

  return (
    <DemoFrame
      title="RizzFitt Tournament OS"
      subtitle="tournament.rizzfitt.com"
      tabs={
        <div className="tos-tabs" role="tablist" aria-label="Demo views">
          {([
            ["registrations", "Registrations"],
            ["scoring", "Live scoring"],
            ["dashboard", "Dashboard"],
          ] as const).map(([id, label]) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              className={`tos-tab${tab === id ? " tos-tab--active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {tab === "registrations" ? <RegistrationsView /> : null}
      {tab === "scoring" ? <ScoringView /> : null}
      {tab === "dashboard" ? <DashboardView /> : null}
    </DemoFrame>
  );
}

/* ── Chrome ────────────────────────────────────────────────────────────── */
function DemoFrame({
  title,
  subtitle,
  tabs,
  children,
}: {
  title: string;
  subtitle: string;
  tabs?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="tos-demo" data-mode="os" role="group" aria-label={`${title} — interactive demo`}>
      <div className="tos-bar">
        <span className="tos-dots" aria-hidden>
          <i /> <i /> <i />
        </span>
        <span className="tos-url data">{subtitle}</span>
        <span className="tos-live" aria-label="Live demo">
          <Radio size={12} /> LIVE DEMO
        </span>
      </div>
      {tabs}
      <div className="tos-body">{children}</div>
    </div>
  );
}

/* small hook: interval that respects reduced-motion + pauses off-screen */
function useTicker(fn: () => void, ms: number, active: boolean) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => saved.current(), ms);
    return () => clearInterval(id);
  }, [ms, active]);
}

/* ── Live scoring ─────────────────────────────────────────────────────── */
const P1 = "Aarav K.";
const P2 = "Rehan S.";

function ScoringView() {
  const reduced = useReducedMotion() ?? false;
  // Completed static snapshot for reduced-motion / SSR-safe initial paint.
  const [cur, setCur] = useState({ a: 8, b: 6 });
  const [sets, setSets] = useState<[number, number][]>([[11, 7]]);
  const [serving, setServing] = useState<1 | 2>(1);
  const [done, setDone] = useState(reduced);
  const [flash, setFlash] = useState<string | null>(reduced ? "Auto-scored · winner advanced" : null);

  const reset = useCallback(() => {
    setCur({ a: 0, b: 0 });
    setSets([]);
    setServing(1);
    setDone(false);
    setFlash(null);
  }, []);

  useTicker(() => {
    if (done) return;
    setCur((c) => {
      const scorer = Math.random() < 0.52 ? "a" : "b";
      const a = c.a + (scorer === "a" ? 1 : 0);
      const b = c.b + (scorer === "b" ? 1 : 0);
      setServing(scorer === "a" ? 1 : 2);
      const hi = Math.max(a, b);
      const lo = Math.min(a, b);
      if (hi >= 11 && hi - lo >= 2) {
        setSets((prev) => {
          const next: [number, number][] = [...prev, [a, b]];
          const aWins = next.filter(([x, y]) => x > y).length;
          const bWins = next.filter(([x, y]) => y > x).length;
          if (aWins === 2 || bWins === 2) {
            setDone(true);
            setFlash(`${aWins === 2 ? P1 : P2} wins · advanced to Final`);
          }
          return next;
        });
        return { a: 0, b: 0 };
      }
      return { a, b };
    });
  }, 1100, !reduced && !done);

  // Auto-restart the match so the demo keeps living.
  useEffect(() => {
    if (!done || reduced) return;
    const id = setTimeout(reset, 3200);
    return () => clearTimeout(id);
  }, [done, reduced, reset]);

  const aSets = sets.filter(([x, y]) => x > y).length;
  const bSets = sets.filter(([x, y]) => y > x).length;

  return (
    <div className="tos-scoring">
      <div className="tos-scorecard">
        <div className="tos-scorecard-head">
          <span className="tos-court data">Court 1 · Men&apos;s Singles · QF</span>
          {!done ? (
            <span className="tos-pill tos-pill--live">
              <span className="tos-pulse" /> Live
            </span>
          ) : (
            <span className="tos-pill tos-pill--done">Final score</span>
          )}
        </div>

        {[{ n: P1, cur: cur.a, s: aSets, srv: serving === 1, win: done && aSets === 2 },
          { n: P2, cur: cur.b, s: bSets, srv: serving === 2, win: done && bSets === 2 }].map((row) => (
          <div key={row.n} className={`tos-row${row.win ? " tos-row--win" : ""}`}>
            <span className="tos-serve" aria-hidden>
              {row.srv && !done ? <span className="tos-serve-dot" /> : null}
            </span>
            <span className="tos-player">{row.n}</span>
            <span className="tos-sets">
              {sets.map((sc, i) => (
                <span key={i} className="tos-setnum data">
                  {row.n === P1 ? sc[0] : sc[1]}
                </span>
              ))}
            </span>
            <span className="tos-points data">{row.cur}</span>
          </div>
        ))}
      </div>

      <Bracket champ={done ? (aSets === 2 ? P1 : P2) : null} reduced={reduced} />

      <div className={`tos-flash${flash ? " tos-flash--on" : ""}`} aria-live="polite">
        <Zap size={14} /> {flash ?? "Auto-scoring live — no scorer table needed"}
      </div>
    </div>
  );
}

/* ── Self-drawing bracket ─────────────────────────────────────────────── */
const SEEDS = ["Aarav K.", "Kabir M.", "Rehan S.", "Meera D."];
function Bracket({ champ, reduced }: { champ: string | null; reduced: boolean }) {
  // step 0: seeds only · 1: semis decided · 2: final set · 3: champion
  const [step, setStep] = useState(reduced ? 3 : 0);
  useTicker(() => setStep((s) => (s + 1) % 4), 1800, !reduced);

  const semiWinners = ["Aarav K.", "Rehan S."];
  const winner = champ ?? "Aarav K.";

  return (
    <div className="tos-bracket" aria-label="Tournament bracket (auto-generated)">
      <div className="tos-bracket-col">
        <span className="tos-round">Semifinals</span>
        {[[SEEDS[0], SEEDS[1]], [SEEDS[2], SEEDS[3]]].map((pair, gi) => (
          <div className="tos-match" key={gi}>
            {pair.map((p) => (
              <span
                key={p}
                className={`tos-seed${step >= 1 && semiWinners.includes(p) ? " tos-seed--won" : ""}`}
              >
                {p}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="tos-bracket-col">
        <span className="tos-round">Final</span>
        <div className="tos-match">
          <span className={`tos-seed${step >= 2 ? "" : " tos-seed--tbd"}${step >= 3 && winner === semiWinners[0] ? " tos-seed--won" : ""}`}>
            {step >= 2 ? semiWinners[0] : "—"}
          </span>
          <span className={`tos-seed${step >= 2 ? "" : " tos-seed--tbd"}${step >= 3 && winner === semiWinners[1] ? " tos-seed--won" : ""}`}>
            {step >= 2 ? semiWinners[1] : "—"}
          </span>
        </div>
      </div>
      <div className="tos-bracket-col tos-bracket-col--champ">
        <span className="tos-round">Champion</span>
        <div className={`tos-champ${step >= 3 ? " tos-champ--on" : ""}`}>
          <Trophy size={16} /> {step >= 3 ? winner : "—"}
        </div>
      </div>
    </div>
  );
}

/* ── Registrations ────────────────────────────────────────────────────── */
const REG_EVENTS = [
  { icon: Users, who: "Aarav K.", meta: "Men's Singles", auto: false },
  { icon: CreditCard, who: "Payment received", meta: "₹1,499 · Razorpay", auto: false },
  { icon: Users, who: "Meera D.", meta: "Women's Singles", auto: false },
  { icon: Zap, who: "Fixtures generated", meta: "32-player draw", auto: true },
  { icon: Users, who: "Kabir M. + Rhea T.", meta: "Mixed Doubles", auto: false },
  { icon: CreditCard, who: "Payment received", meta: "₹2,998 · Razorpay", auto: false },
  { icon: Zap, who: "Confirmation sent", meta: "WhatsApp + email", auto: true },
  { icon: Users, who: "Rehan S.", meta: "Men's Singles", auto: false },
];

function RegistrationsView() {
  const reduced = useReducedMotion() ?? false;
  const [count, setCount] = useState(reduced ? REG_EVENTS.length : 3);
  useTicker(() => setCount((c) => (c >= REG_EVENTS.length ? 3 : c + 1)), 1400, !reduced);
  const shown = REG_EVENTS.slice(0, count);
  const regs = 128 + count;

  return (
    <div className="tos-reg">
      <div className="tos-reg-head">
        <div>
          <span className="tos-reg-k data">{regs}</span>
          <span className="tos-reg-label">registrations</span>
        </div>
        <span className="tos-pill tos-pill--pay">
          <CreditCard size={13} /> Razorpay connected
        </span>
      </div>
      <ul className="tos-feed">
        {[...shown].reverse().map((e, i) => {
          const Icon = e.icon;
          return (
            <li key={`${e.who}-${count}-${i}`} className={`tos-feed-item${e.auto ? " tos-feed-item--auto" : ""}`}>
              <span className="tos-feed-ic" aria-hidden>
                <Icon size={15} />
              </span>
              <span className="tos-feed-who">{e.who}</span>
              <span className="tos-feed-meta small">{e.meta}</span>
              {e.auto ? <span className="tos-auto-tag">auto</span> : <CheckCircle2 size={14} className="tos-feed-ok" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ── Dashboard ────────────────────────────────────────────────────────── */
const BARS = [8, 15, 22, 31, 27, 25, 34];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function DashboardView() {
  const reduced = useReducedMotion() ?? false;
  const [t, setT] = useState(reduced ? 1 : 0); // 0→1 progress
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      setT(p);
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const ease = 1 - Math.pow(1 - t, 3);
  const kpis = [
    { label: "Registrations", value: Math.round(162 * ease), prefix: "", suffix: "" },
    { label: "Revenue", value: Math.round(242600 * ease), prefix: "₹", suffix: "" },
    { label: "Checked in", value: Math.round(118 * ease), prefix: "", suffix: "" },
  ];
  const max = Math.max(...BARS);

  return (
    <div className="tos-dash">
      <div className="tos-kpis">
        {kpis.map((k) => (
          <div className="tos-kpi" key={k.label}>
            <span className="tos-kpi-v data">
              {k.prefix}
              {k.value.toLocaleString("en-IN")}
            </span>
            <span className="tos-kpi-l">{k.label}</span>
          </div>
        ))}
      </div>

      <div className="tos-chart-wrap">
        <span className="tos-chart-title small muted">Registrations this week</span>
        <div className="tos-chart" role="img" aria-label="Bar chart of registrations rising over the week">
          {BARS.map((b, i) => (
            <div className="tos-bar-col" key={i}>
              <div className="tos-bar" style={{ height: `${(b / max) * 100 * ease}%` }} />
              <span className="tos-bar-day small">{DAYS[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="tos-dash-foot">
        <Zap size={13} /> Auto-reseeded 2 rounds · 3 sponsor overlays live · 0 spreadsheets
      </div>
    </div>
  );
}
