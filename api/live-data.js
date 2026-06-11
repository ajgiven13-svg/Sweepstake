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
    payload.messages.push("Using the static published fixture schedule. Add FOOTBALL_DATA_TOKEN later if live scores are needed.");
  }

  try {
    if (hasFootballData) {
      const data = await fetchJson("https://api.football-data.org/v4/competitions/WC/matches", {
        "X-Auth-Token": process.env.FOOTBALL_DATA_TOKEN
      });
      payload.fixtures = data.matches || [];
    }
  } catch (error) {
    payload.messages.push(`Football-data sync failed: ${error.message}`);
  }

  if (!payload.fixtures.length) {
    payload.fixturesSource = "static";
    payload.fixtures = STATIC_FIXTURES;
  }

  sendJson(res, 200, payload);
}
