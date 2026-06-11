import { sendJson } from "../lib/http.js";

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
  const hasOdds = Boolean(process.env.ODDS_API_TOKEN);
  const payload = {
    ok: true,
    providerAvailable: hasFootballData || hasOdds,
    fixtures: [],
    standings: [],
    odds: [],
    messages: [],
    syncedAt: new Date().toISOString()
  };

  if (!hasFootballData) {
    payload.messages.push("FOOTBALL_DATA_TOKEN is not configured, so fixtures and group tables are unavailable.");
  }
  if (!hasOdds) {
    payload.messages.push("ODDS_API_TOKEN is not configured, so outright winner odds are unavailable.");
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

  try {
    if (hasOdds) {
      const oddsUrl = new URL("https://api.the-odds-api.com/v4/sports/soccer_fifa_world_cup_winner/odds");
      oddsUrl.searchParams.set("apiKey", process.env.ODDS_API_TOKEN);
      oddsUrl.searchParams.set("regions", "uk,eu,us");
      oddsUrl.searchParams.set("markets", "outrights");
      oddsUrl.searchParams.set("oddsFormat", "decimal");
      payload.odds = await fetchJson(oddsUrl);
    }
  } catch (error) {
    payload.messages.push(`Odds sync failed: ${error.message}`);
  }

  sendJson(res, 200, payload);
}
