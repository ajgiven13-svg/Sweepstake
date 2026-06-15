import { sendJson } from "../lib/http.js";

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

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  const hasFootballData = Boolean(process.env.FOOTBALL_DATA_TOKEN);
  const payload = {
    ok: true,
    providerAvailable: true,
    fixturesSource: hasFootballData ? "football-data" : "static",
    fixtures: [],
    standings: [],
    messages: [],
    syncedAt: new Date().toISOString()
  };

  if (!hasFootballData) {
    payload.providerAvailable = false;
    payload.messages.push("Using the static published fixture schedule. Live scores and official tables need FOOTBALL_DATA_TOKEN on the server.");
  }

  try {
    if (hasFootballData) {
      const headers = {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN
      };
      const data = await fetchJson("https://api.football-data.org/v4/competitions/WC/matches", headers);
      payload.fixtures = (data.matches || []).map(normalizeFixture);
      try {
        const standingsData = await fetchJson("https://api.football-data.org/v4/competitions/WC/standings", headers);
        payload.standings = normalizeStandings(standingsData);
      } catch (error) {
        payload.messages.push(`Official standings unavailable, using fixture scores where possible: ${error.message}`);
      }
    }
  } catch (error) {
    payload.providerAvailable = false;
    payload.messages.push(`Football-data sync failed: ${error.message}`);
  }

  if (!payload.fixtures.length) {
    payload.fixturesSource = "static";
    payload.fixtures = STATIC_FIXTURES.map(normalizeFixture);
  }

  if (!payload.standings.length) {
    payload.standings = computeStandings(payload.fixtures);
  }

  sendJson(res, 200, payload);
}
