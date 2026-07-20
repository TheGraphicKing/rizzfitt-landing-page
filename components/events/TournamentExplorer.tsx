"use client";

import { useMemo, useState } from "react";
import { Trophy, Share2, Search, MapPin } from "lucide-react";
import { Section } from "@/components/primitives";
import { cn } from "@/lib/cn";
import { formatEventDate } from "@/lib/format";
import { comboFor, structureFor, type Match } from "@/lib/tournament";
import type { RizzEvent } from "@/lib/types";

type View = "fixtures" | "past";
type PastTab = "matches" | "winners" | "leaderboard";

/**
 * The tournament fixtures/results explorer — a dark "live OS" panel embedded in
 * the (live) event page. Fixtures vs Past, category + subcategory filters,
 * Matches / Winners / Leaderboard, group standings and a knockout bracket.
 * Data is generated deterministically per event (see lib/tournament).
 */
export function TournamentExplorer({ event, seed }: { event: RizzEvent; seed: number }) {
  const structure = useMemo(() => structureFor(seed), [seed]);
  const [view, setView] = useState<View>(event.status === "completed" ? "past" : "fixtures");
  const [catIdx, setCatIdx] = useState(0);
  const category = structure.categories[catIdx];
  const [sub, setSub] = useState(category.subcategories[0]);
  const [pastTab, setPastTab] = useState<PastTab>("matches");
  const [groupTab, setGroupTab] = useState(0); // index into groups, or -1 for knockout
  const [query, setQuery] = useState("");

  const combo = useMemo(() => comboFor(seed, category.name, sub), [seed, category.name, sub]);

  const selectCat = (i: number) => {
    setCatIdx(i);
    setSub(structure.categories[i].subcategories[0]);
    setGroupTab(0);
  };

  return (
    <Section mode="os">
      {/* View toggle */}
      <div className="te-toggle" role="tablist" aria-label="Fixtures or past results">
        {(["fixtures", "past"] as View[]).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            className={cn("te-toggle-btn", view === v && "te-toggle-btn--on")}
            onClick={() => setView(v)}
          >
            {v === "fixtures" ? "Fixtures" : "Past"}
          </button>
        ))}
      </div>

      {/* Event header card */}
      <div className="te-eventcard">
        <span className="te-eventmark" aria-hidden>
          {event.title.slice(0, 2).toUpperCase()}
        </span>
        <div className="stack" style={{ gap: 4 }}>
          <span className="h3" style={{ fontSize: "1.125rem" }}>{event.title}</span>
          <span className="data small muted">{formatEventDate(event.start, event.end)}</span>
          <span className="small" style={{ color: "var(--accent)", display: "inline-flex", alignItems: "center", gap: 4 }}>
            <MapPin size={13} /> {event.venue}, {event.city}
          </span>
        </div>
      </div>

      {/* Category + subcategory filters */}
      <div className="te-filters">
        <div className="te-filter-row">
          <span className="small muted">Category</span>
          {structure.categories.map((c, i) => (
            <button key={c.name} className={cn("te-chip", catIdx === i && "te-chip--on")} onClick={() => selectCat(i)}>
              {c.name}
            </button>
          ))}
        </div>
        <div className="te-filter-row">
          <span className="small muted">Subcategory</span>
          {category.subcategories.map((s) => (
            <button key={s} className={cn("te-chip", sub === s && "te-chip--on")} onClick={() => setSub(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {view === "past" ? (
        <>
          <div className="te-subtabs" role="tablist" aria-label="Results view">
            {(["matches", "winners", "leaderboard"] as PastTab[]).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={pastTab === t}
                className={cn("te-subtab", pastTab === t && "te-subtab--on")}
                onClick={() => setPastTab(t)}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>

          {pastTab === "matches" ? (
            <div className="te-match-grid">
              {combo.allMatches.map((m) => (
                <MatchCard key={m.id} match={m} eventTitle={event.title} />
              ))}
            </div>
          ) : pastTab === "winners" ? (
            <Winners combo={combo} category={category.name} sub={sub} />
          ) : (
            <LeaderboardTable rows={combo.leaderboard} />
          )}
        </>
      ) : (
        <div className="te-fixtures">
          <div className="te-grouptabs">
            <div className="te-grouptab-list">
              {combo.groups.map((g, i) => (
                <button key={g.name} className={cn("te-grouptab", groupTab === i && "te-grouptab--on")} onClick={() => setGroupTab(i)}>
                  {g.name}
                </button>
              ))}
              <button className={cn("te-grouptab", groupTab === -1 && "te-grouptab--on")} onClick={() => setGroupTab(-1)}>
                Knockout Bracket
              </button>
            </div>
            <label className="te-search">
              <Search size={15} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search fixtures…" aria-label="Search fixtures" />
            </label>
          </div>

          {groupTab === -1 ? (
            <Bracket matches={combo.knockout} />
          ) : (
            <div className="te-group-grid">
              <div className="te-fixture-list">
                {combo.groups[groupTab].matches
                  .filter((m) => !query || `${m.teamA} ${m.teamB}`.toLowerCase().includes(query.toLowerCase()))
                  .map((m) => (
                    <FixtureRow key={m.id} match={m} />
                  ))}
              </div>
              <StandingsTable rows={combo.groups[groupTab].standings} />
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

function MatchCard({ match: m, eventTitle }: { match: Match; eventTitle: string }) {
  return (
    <article className="te-card">
      <div className="te-card-top">
        <span className="te-card-brand">
          <span className="te-eventmark te-eventmark--sm" aria-hidden>{eventTitle.slice(0, 2).toUpperCase()}</span>
          <span className="data te-card-meta">Court {m.court} · Sets {m.sets} · Points {m.points}</span>
        </span>
        <button type="button" className="te-share" aria-label="Share match">
          <Share2 size={14} />
        </button>
      </div>
      <p className="te-card-players">
        <strong>{m.teamA}</strong> <span className="muted">vs</span> <strong>{m.teamB}</strong>
      </p>
      <p className="small" style={{ color: "var(--accent)" }}>{m.round}</p>
      <p className="te-card-score">
        <span className="score">{m.scoreA} – {m.scoreB}</span>
        <span className="te-status"> • Completed</span>
      </p>
      <p className="te-winner">
        <Trophy size={13} /> {m.winner} won the match
      </p>
    </article>
  );
}

function FixtureRow({ match: m }: { match: Match }) {
  return (
    <div className="te-fixrow">
      <span className="te-eventmark te-eventmark--sm" aria-hidden>{m.group?.slice(-1) ?? "•"}</span>
      <div className="stack" style={{ gap: 2 }}>
        <span className="small"><strong>{m.teamA}</strong> <span className="muted">vs</span> <strong>{m.teamB}</strong></span>
        <span className="small" style={{ color: "var(--accent)" }}>
          Prelims · Court {m.court} {m.status === "completed" && <span className="te-status">· {m.scoreA} – {m.scoreB} • Completed</span>}
        </span>
      </div>
    </div>
  );
}

function StandingsTable({ rows }: { rows: { team: string; P: number; W: number; L: number; PF: number; PA: number }[] }) {
  return (
    <table className="te-table">
      <thead>
        <tr><th>POS</th><th>Players</th><th>P</th><th>W</th><th>L</th><th>PF</th><th>PA</th><th>+/-</th></tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.team}>
            <td className="data">{i + 1}</td>
            <td>{r.team}</td>
            <td className="data">{r.P}</td>
            <td className="data">{r.W}</td>
            <td className="data">{r.L}</td>
            <td className="data">{r.PF}</td>
            <td className="data">{r.PA}</td>
            <td className="data" style={{ color: "var(--accent)" }}>{r.PF - r.PA > 0 ? "+" : ""}{r.PF - r.PA}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function LeaderboardTable({ rows }: { rows: { team: string; G: number; W: number; L: number; winPct: number }[] }) {
  return (
    <table className="te-table te-table--lb">
      <thead>
        <tr><th>#</th><th>Team / Player</th><th>G</th><th>W</th><th>L</th><th>Win %</th></tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.team}>
            <td className="data">{i + 1}</td>
            <td>{r.team}</td>
            <td className="data">{r.G}</td>
            <td className="data" style={{ color: "var(--success)" }}>{r.W}</td>
            <td className="data" style={{ color: r.L ? "var(--accent)" : "var(--text-muted)" }}>{r.L}</td>
            <td className="data">{r.winPct}%</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Winners({ combo, category, sub }: { combo: ReturnType<typeof comboFor>; category: string; sub: string }) {
  const podium = [
    { place: "Champion", team: combo.champion },
    { place: "Runner-up", team: combo.runnerUp },
    { place: "Third place", team: combo.third },
  ];
  return (
    <div className="stack" style={{ gap: "var(--space-5)" }}>
      <p className="small muted">{category} · {sub}</p>
      <div className="te-winners">
        {podium.map((p, i) => (
          <div key={p.place} className={cn("te-winner-card", i === 0 && "te-winner-card--champ")}>
            <Trophy size={i === 0 ? 22 : 16} />
            <span className="eyebrow">{p.place}</span>
            <span className="h3" style={{ fontSize: "1.125rem" }}>{p.team}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Bracket({ matches }: { matches: Match[] }) {
  const semis = matches.filter((m) => m.round.includes("Semi"));
  const final = matches.find((m) => m.round.includes("Final") && !m.round.includes("Semi"));
  const third = matches.find((m) => m.round.includes("Third"));
  const Cell = ({ m }: { m: Match }) => (
    <div className="te-bracket-match">
      {[ [m.teamA, m.scoreA], [m.teamB, m.scoreB] ].map(([name, score], i) => (
        <div key={i} className={cn("te-bracket-slot", m.winner === name && "te-bracket-slot--win")}>
          <span className="small">{name as string}</span>
          <span className="data">{score as number}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="te-bracket">
      <div className="te-bracket-col">
        <span className="eyebrow">Semi-finals</span>
        {semis.map((m) => <Cell key={m.id} m={m} />)}
      </div>
      <div className="te-bracket-col">
        <span className="eyebrow">Final</span>
        {final ? <Cell m={final} /> : null}
        <span className="eyebrow" style={{ marginTop: "var(--space-4)" }}>Third place</span>
        {third ? <Cell m={third} /> : null}
      </div>
    </div>
  );
}
