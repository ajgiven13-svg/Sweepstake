import { sendJson } from "../lib/http.js";

const TOURNAMENT_START_DATE = "20260611";
const ESPN_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

const STATIC_FIXTURES = [
  fixture("2026-06-11T17:30:00Z", "Group A", "Mexico", "South Africa", "Mexico City Stadium"),
  fixture("2026-06-11T20:00:00Z", "Group A", "South Korea", "Czechia", "Estadio Guadalajara"),
  fixture("2026-06-12T18:30:00Z", "Group B", "Canada", "Bosnia and Herzegovina", "Toronto Stadium"),
  fixture("2026-06-12T23:30:00Z", "Group D", "United States", "Paraguay", "Los Angeles Stadium"),
  fixture("2026-06-13T17:00:00Z", "Group C", "Haiti", "Scotland", "Boston Stadium"),
  fixture("2026-06-13T20:00:00Z", "Group D", "Australia", "Turkey", "BC Place Vancouver"),
  fixture("2026-06-13T23:00:00Z", "Group C", "Brazil", "Morocco", "New York New Jersey Stadium"),
  fixture("2026-06-14T00:30:00Z", "Group B", "Qatar", "Switzerland", "San Francisco Bay Area Stadium"),
  fixture("2026-06-14T17:00:00Z", "Group E", "Ivory Coast", "Ecuador", "Philadelphia Stadium"),
  fixture("2026-06-14T20:00:00Z", "Group E", "Germany", "Curacao", "Houston Stadium"),
  fixture("2026-06-14T23:00:00Z", "Group F", "Netherlands", "Japan", "Dallas Stadium"),
  fixture("2026-06-15T00:30:00Z", "Group F", "Sweden", "Tunisia", "Estadio Monterrey"),
  fixture("2026-06-15T17:00:00Z", "Group H", "Saudi Arabia", "Uruguay", "Miami Stadium"),
  fixture("2026-06-15T20:00:00Z", "Group H", "Spain", "Cape Verde", "Atlanta Stadium"),
  fixture("2026-06-15T23:00:00Z", "Group G", "Iran", "New Zealand", "Los Angeles Stadium"),
  fixture("2026-06-16T00:30:00Z", "Group G", "Belgium", "Egypt", "Seattle Stadium"),
  fixture("2026-06-16T17:00:00Z", "Group I", "France", "Senegal", "New York New Jersey Stadium"),
  fixture("2026-06-16T20:00:00Z", "Group I", "Iraq", "Norway", "Boston Stadium"),
  fixture("2026-06-16T23:00:00Z", "Group J", "Argentina", "Algeria", "Kansas City Stadium"),
  fixture("2026-06-17T00:30:00Z", "Group J", "Austria", "Jordan", "San Francisco Bay Area Stadium"),
  fixture("2026-06-17T17:00:00Z", "Group L", "Ghana", "Panama", "Toronto Stadium"),
  fixture("2026-06-17T20:00:00Z", "Group L", "England", "Croatia", "Dallas Stadium"),
  fixture("2026-06-17T23:00:00Z", "Group K", "Portugal", "DR Congo", "Houston Stadium"),
  fixture("2026-06-18T00:30:00Z", "Group K", "Uzbekistan", "Colombia", "Mexico City Stadium")
];

function fixture(utcDate, group, home, away, venue) {
  return {
    id: `static-${utcDate}-${home}-${away}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    utcDate,
    group,
    venue,
    status: "SCHEDULED",
    source: "static",
    homeTeam: {
      name: home,
      shortName: home
    },
    awayTeam: {
      name: away,
      shortName: away
    },
    score: {
      fullTime: {
        home: null,
        away: null
      }
    }
  };
}

function teamIdFromName(value) {
  const normalized = String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  const aliases = {
    usa: "united-states",
    us: "united-states",
    "united-states": "united-states",
    "bosnia-and-herzegovina": "bosnia-herzegovina",
    "bosnia-herzegovina": "bosnia-herzegovina",
    "dr-congo": "dr-congo",
    "d-r-congo": "dr-congo",
    "cote-d-ivoire": "ivory-coast",
    "ivory-coast": "ivory-coast",
    "cape-verde": "cape-verde",
    "cabo-verde": "cape-verde",
    "curacao": "curacao",
    "cura-ao": "curacao",
    "turkiye": "turkey",
    "t-rkiye": "turkey",
    "czech-republic": "czechia",
    "korea-republic": "south-korea",
    "congo-dr": "dr-congo",
    "south-korea": "south-korea",
    "new-zealand": "new-zealand",
    "south-africa": "south-africa",
    "saudi-arabia": "saudi-arabia"
  };
  return aliases[normalized] || normalized;
}

function normalizeTeam(team = {}) {
  const name = team.shortName || team.name || "TBC";
  return {
    id: team.id || teamIdFromName(name),
    name: team.name || name,
    shortName: team.shortName || team.name || name
  };
}

function normalizeFixture(match) {
  const fullTime = match.score?.fullTime || {};
  return {
    id: match.id || `match-${match.utcDate}-${match.homeTeam?.name}-${match.awayTeam?.name}`,
    utcDate: match.utcDate,
    group: match.group || match.stage || "",
    venue: match.venue || match.area?.name || "",
    status: match.status || "SCHEDULED",
    source: match.source || "football-data",
    homeTeam: normalizeTeam(match.homeTeam),
    awayTeam: normalizeTeam(match.awayTeam),
    score: {
      fullTime: {
        home: Number.isFinite(fullTime.home) ? fullTime.home : null,
        away: Number.isFinite(fullTime.away) ? fullTime.away : null
      }
    }
  };
}

function formatEspnDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function tomorrowDateRangeEnd() {
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
  return formatEspnDate(tomorrow);
}

function parseEspnStage(note) {
  const value = String(note || "");
  const groupMatch = value.match(/Group\s+[A-Z]/i);
  if (groupMatch) return groupMatch[0].replace(/^group/i, "Group");
  const stagePatterns = [
    /Round of 32/i,
    /Round of 16/i,
    /Quarter[-\s]?finals?/i,
    /Semi[-\s]?finals?/i,
    /Third[-\s]?place/i,
    /Final/i
  ];
  const stageMatch = stagePatterns.map((pattern) => value.match(pattern)).find(Boolean);
  if (!stageMatch) return "";
  return stageMatch[0]
    .replace(/quarter[-\s]?finals?/i, "Quarter-finals")
    .replace(/semi[-\s]?finals?/i, "Semi-finals")
    .replace(/third[-\s]?place/i, "Third place")
    .replace(/final/i, "Final");
}

function isGroupStageName(value) {
  return /^Group\s+[A-Z]$/i.test(String(value || "").trim());
}

function normalizeEspnTeam(competitor = {}) {
  const team = competitor.team || {};
  const name = team.displayName || team.shortDisplayName || team.name || team.location || "TBC";
  return {
    id: teamIdFromName(name),
    name,
    shortName: name
  };
}

function espnScore(competitor, statusType = {}) {
  if (statusType.state === "pre") return null;
  const score = Number(competitor?.score);
  return Number.isFinite(score) ? score : null;
}

function normalizeEspnFixture(event) {
  const competition = event.competitions?.[0] || {};
  const competitors = competition.competitors || [];
  const home = competitors.find((competitor) => competitor.homeAway === "home") || competitors[0] || {};
  const away = competitors.find((competitor) => competitor.homeAway === "away") || competitors[1] || {};
  const statusType = competition.status?.type || {};
  const venue = [
    competition.venue?.fullName,
    competition.venue?.address?.city
  ].filter(Boolean).join(", ");

  return {
    id: event.id || competition.id || `espn-${event.date}-${event.name}`,
    utcDate: competition.date || event.date,
    group: parseEspnStage(competition.altGameNote),
    venue,
    status: statusType.description || statusType.name || "Scheduled",
    statusState: statusType.state || "",
    completed: Boolean(statusType.completed),
    source: "espn",
    homeTeam: normalizeEspnTeam(home),
    awayTeam: normalizeEspnTeam(away),
    score: {
      fullTime: {
        home: espnScore(home, statusType),
        away: espnScore(away, statusType)
      }
    }
  };
}

function emptyTableRow(teamName, group) {
  return {
    teamId: teamIdFromName(teamName),
    teamName,
    group,
    played: 0,
    won: 0,
    draw: 0,
    lost: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    goalDifference: 0,
    status: ""
  };
}

function applyResult(row, goalsFor, goalsAgainst) {
  row.played += 1;
  row.goalsFor += goalsFor;
  row.goalsAgainst += goalsAgainst;
  row.goalDifference = row.goalsFor - row.goalsAgainst;
  if (goalsFor > goalsAgainst) {
    row.won += 1;
    row.points += 3;
  } else if (goalsFor === goalsAgainst) {
    row.draw += 1;
    row.points += 1;
  } else {
    row.lost += 1;
  }
}

function computeStandings(fixtures) {
  const groups = new Map();

  fixtures.forEach((match) => {
    const group = match.group || "Fixtures";
    if (!isGroupStageName(group)) return;
    if (!groups.has(group)) groups.set(group, new Map());
    const rows = groups.get(group);
    const teams = [match.homeTeam, match.awayTeam].filter(Boolean);
    teams.forEach((team) => {
      const teamName = team.shortName || team.name || "TBC";
      const teamId = team.id || teamIdFromName(teamName);
      if (!rows.has(teamId)) rows.set(teamId, emptyTableRow(teamName, group));
    });

    const homeScore = match.score?.fullTime?.home;
    const awayScore = match.score?.fullTime?.away;
    if (!Number.isFinite(homeScore) || !Number.isFinite(awayScore)) return;
    if (!isCompletedFixture(match)) return;

    const homeId = match.homeTeam.id || teamIdFromName(match.homeTeam.shortName || match.homeTeam.name);
    const awayId = match.awayTeam.id || teamIdFromName(match.awayTeam.shortName || match.awayTeam.name);
    applyResult(rows.get(homeId), homeScore, awayScore);
    applyResult(rows.get(awayId), awayScore, homeScore);
  });

  return [...groups.entries()].map(([group, rows]) => ({
    group,
    source: "computed",
    table: [...rows.values()].sort((a, b) => (
      b.points - a.points
      || b.goalDifference - a.goalDifference
      || b.goalsFor - a.goalsFor
      || a.teamName.localeCompare(b.teamName)
    ))
  })).sort((a, b) => a.group.localeCompare(b.group));
}

function computeTournamentStandings(fixtures) {
  return computeStandings([
    ...STATIC_FIXTURES.map(normalizeFixture),
    ...fixtures
  ]);
}

function isCompletedFixture(match) {
  if (match.completed) return true;
  const status = String(match.status || "").toLowerCase();
  return status.includes("full time")
    || status.includes("final")
    || status === "finished"
    || status === "full_time";
}

function normalizeStandings(data) {
  return (data.standings || []).map((standing) => ({
    group: standing.group || standing.stage || "Standings",
    source: "football-data",
    table: (standing.table || []).map((row) => {
      const team = normalizeTeam(row.team);
      return {
        teamId: team.id,
        teamName: team.shortName || team.name,
        group: standing.group || standing.stage || "Standings",
        played: row.playedGames ?? row.played ?? 0,
        won: row.won ?? 0,
        draw: row.draw ?? 0,
        lost: row.lost ?? 0,
        points: row.points ?? 0,
        goalsFor: row.goalsFor ?? 0,
        goalsAgainst: row.goalsAgainst ?? 0,
        goalDifference: row.goalDifference ?? 0,
        status: row.status || ""
      };
    })
  })).filter((standing) => standing.table.length);
}

async function fetchJson(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.json();
}

async function fetchEspnFixtures() {
  const endDate = tomorrowDateRangeEnd();
  const data = await fetchJson(`${ESPN_SCOREBOARD_URL}?dates=${TOURNAMENT_START_DATE}-${endDate}&limit=500`);
  return (data.events || []).map(normalizeEspnFixture);
}

async function fetchFootballData(payload) {
  if (!process.env.FOOTBALL_DATA_TOKEN) return;

  const headers = {
    "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN
  };
  const data = await fetchJson("https://api.football-data.org/v4/competitions/WC/matches", headers);
  payload.fixtures = (data.matches || []).map(normalizeFixture);
  payload.fixturesSource = "football-data";
  payload.providerAvailable = true;
  payload.messages.push("Live scores synced from Football-Data.");

  try {
    const standingsData = await fetchJson("https://api.football-data.org/v4/competitions/WC/standings", headers);
    payload.standings = normalizeStandings(standingsData);
  } catch (error) {
    payload.messages.push(`Official standings unavailable, using fixture scores where possible: ${error.message}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  const payload = {
    ok: true,
    providerAvailable: true,
    fixturesSource: "espn",
    fixtures: [],
    standings: [],
    messages: [],
    syncedAt: new Date().toISOString()
  };

  try {
    payload.fixtures = await fetchEspnFixtures();
    payload.messages.push("Live scores synced from ESPN.");
  } catch (error) {
    payload.messages.push(`ESPN live score sync failed: ${error.message}`);
  }

  if (!payload.fixtures.length) {
    try {
      await fetchFootballData(payload);
    } catch (error) {
      payload.messages.push(`Football-Data backup sync failed: ${error.message}`);
    }
  }

  if (!payload.fixtures.length) {
    payload.providerAvailable = false;
    payload.fixturesSource = "static";
    payload.fixtures = STATIC_FIXTURES.map(normalizeFixture);
    payload.messages.push("Live provider unavailable. Showing the static published fixture schedule.");
  }

  if (!payload.standings.length) {
    payload.standings = computeTournamentStandings(payload.fixtures);
  }

  sendJson(res, 200, payload);
}
