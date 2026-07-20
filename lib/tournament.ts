/**
 * Deterministic tournament data generator.
 *
 * The real fixtures/results live in tournament.rizzfitt.com's backend; until
 * that API is wired in, this produces a complete, believable, STABLE dataset
 * per event (seeded from the slug — no Date/Math.random, so SSR and client
 * agree and builds are reproducible). Swap `comboFor` for a fetch later and the
 * UI is unchanged.
 */

export type MatchStatus = "completed" | "scheduled" | "live";

export interface Match {
  id: string;
  court: number;
  sets: number;
  points: number;
  teamA: string;
  teamB: string;
  round: string;
  group?: string;
  scoreA: number;
  scoreB: number;
  status: MatchStatus;
  winner: string;
}

export interface StandingRow {
  team: string;
  P: number;
  W: number;
  L: number;
  PF: number;
  PA: number;
}

export interface GroupData {
  name: string;
  matches: Match[];
  standings: StandingRow[];
}

export interface LeaderRow {
  team: string;
  G: number;
  W: number;
  L: number;
  winPct: number;
}

export interface ComboData {
  groups: GroupData[];
  knockout: Match[];
  allMatches: Match[];
  leaderboard: LeaderRow[];
  champion: string;
  runnerUp: string;
  third: string;
}

export interface TournamentStructure {
  ageGraded: boolean;
  categories: { name: string; subcategories: string[] }[];
}

// ── seeded RNG ──────────────────────────────────────────────────────────
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(a: number) {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const TEAMS = [
  "Pradeep, Deepak", "Sandeep, Bhushan", "Anand, Ahmed", "Sujay, Badari",
  "Aidas, Akhil", "Abhijit, Thakurdas", "Danil, Sahil", "Kishore, Vipul",
  "Vivek, Jaikar", "Navin, Sajit", "Ranjit, Amit", "Vinod, Jimmy",
  "Saagar, Yash", "Nishit, Varsha", "Jayesh, Raj", "Rohan, Sara",
  "Kiran, Nila", "Vimal, Khush", "Hardik, Kushal", "Rudrik, Jay",
  "Kunj, Shreya", "Arjun, Diya", "Karthik, Meera", "Surya, Devi",
];

export function seedFor(slug: string): number {
  return hash(slug);
}

export function structureFor(seed: number): TournamentStructure {
  const rng = mulberry32(seed ^ 0x9e3779b9);
  const ageGraded = rng() > 0.5;
  if (ageGraded) {
    return {
      ageGraded: true,
      categories: [
        { name: "Men's Doubles", subcategories: ["50+", "55+", "60+", "65+"] },
        { name: "Women's Doubles", subcategories: ["50+", "55+", "60+"] },
        { name: "Mixed Doubles", subcategories: ["50+", "55+"] },
      ],
    };
  }
  return { ageGraded: false, categories: [{ name: "Open", subcategories: ["Open"] }] };
}

function shuffle<T>(arr: T[], rng: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playMatch(
  rng: () => number,
  teamA: string,
  teamB: string,
  points: number,
  round: string,
  court: number,
  group?: string,
): Match {
  const aWins = rng() > 0.5;
  const loserScore = Math.floor(rng() * (points - 1)); // 0..points-2
  const scoreA = aWins ? points : loserScore;
  const scoreB = aWins ? loserScore : points;
  return {
    id: `${round}-${teamA}-${teamB}`.replace(/\s+/g, ""),
    court,
    sets: 1,
    points,
    teamA,
    teamB,
    round,
    group,
    scoreA,
    scoreB,
    status: "completed",
    winner: aWins ? teamA : teamB,
  };
}

function standingsFromMatches(teams: string[], matches: Match[]): StandingRow[] {
  const rows = new Map<string, StandingRow>(teams.map((t) => [t, { team: t, P: 0, W: 0, L: 0, PF: 0, PA: 0 }]));
  for (const m of matches) {
    const a = rows.get(m.teamA);
    const b = rows.get(m.teamB);
    if (!a || !b) continue;
    a.P++; b.P++;
    a.PF += m.scoreA; a.PA += m.scoreB;
    b.PF += m.scoreB; b.PA += m.scoreA;
    if (m.winner === m.teamA) { a.W++; b.L++; } else { b.W++; a.L++; }
  }
  return [...rows.values()].sort((x, y) => y.W - x.W || (y.PF - y.PA) - (x.PF - x.PA) || y.PF - x.PF);
}

/** Generate the full dataset for one category × subcategory. Deterministic. */
export function comboFor(seed: number, category: string, subcategory: string): ComboData {
  const rng = mulberry32(hash(`${seed}|${category}|${subcategory}`));
  const points = rng() > 0.5 ? 15 : 21;
  const open = subcategory === "Open";
  const groupCount = open ? 2 : 1;
  const perGroup = open ? 3 : 4;

  const pool = shuffle(TEAMS, rng).slice(0, groupCount * perGroup);
  const groups: GroupData[] = [];
  for (let g = 0; g < groupCount; g++) {
    const name = `Group ${String.fromCharCode(65 + g)}`;
    const teams = pool.slice(g * perGroup, (g + 1) * perGroup);
    const matches: Match[] = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push(playMatch(rng, teams[i], teams[j], points, "Prelims", 1 + ((i + j) % 4), name));
      }
    }
    groups.push({ name, matches, standings: standingsFromMatches(teams, matches) });
  }

  // Knockout from the top of each group.
  const cat = category;
  const knockout: Match[] = [];
  const top = (gi: number, rank: number) => groups[gi]?.standings[rank]?.team;
  let semiFinalists: [string, string][];
  if (open && groups.length === 2) {
    semiFinalists = [
      [top(0, 0)!, top(1, 1)!],
      [top(1, 0)!, top(0, 1)!],
    ];
  } else {
    const s = groups[0].standings;
    semiFinalists = [
      [s[0]?.team, s[3]?.team ?? s[s.length - 1]?.team],
      [s[1]?.team, s[2]?.team],
    ] as [string, string][];
  }
  const sfRound = `${cat} – ${subcategory} Semi Final`;
  const sf1 = playMatch(rng, semiFinalists[0][0], semiFinalists[0][1], points, sfRound, 1);
  const sf2 = playMatch(rng, semiFinalists[1][0], semiFinalists[1][1], points, sfRound, 2);
  const final = playMatch(rng, sf1.winner, sf2.winner, points, `${cat} – ${subcategory} Final`, 1);
  const loser = (m: Match) => (m.winner === m.teamA ? m.teamB : m.teamA);
  const third = playMatch(rng, loser(sf1), loser(sf2), points, `${cat} – ${subcategory} Third Place`, 2);
  knockout.push(sf1, sf2, final, third);

  const allMatches = [...groups.flatMap((g) => g.matches), ...knockout];

  // Leaderboard across every team in the combo.
  const lb = new Map<string, LeaderRow>();
  for (const m of allMatches) {
    for (const t of [m.teamA, m.teamB]) if (!lb.has(t)) lb.set(t, { team: t, G: 0, W: 0, L: 0, winPct: 0 });
    lb.get(m.teamA)!.G++; lb.get(m.teamB)!.G++;
    lb.get(m.winner)!.W++;
    (m.winner === m.teamA ? lb.get(m.teamB)! : lb.get(m.teamA)!).L++;
  }
  const leaderboard = [...lb.values()]
    .map((r) => ({ ...r, winPct: r.G ? Math.round((r.W / r.G) * 100) : 0 }))
    .sort((a, b) => b.winPct - a.winPct || b.W - a.W);

  return {
    groups,
    knockout,
    allMatches,
    leaderboard,
    champion: final.winner,
    runnerUp: loser(final),
    third: third.winner,
  };
}
