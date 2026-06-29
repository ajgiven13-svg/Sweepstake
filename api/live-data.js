import { sendJson } from "../lib/http.js";

const TOURNAMENT_START_DATE = "20260611";
const TOURNAMENT_END_DATE = "20260719";
const ESPN_SCOREBOARD_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
const ESPN_STATISTICS_URL = "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/statistics";
const WIKIPEDIA_SUMMARY_URL = "https://en.wikipedia.org/api/rest_v1/page/summary";
const FIFA_FIXTURES_URL = "https://www.fifa.com/en/tournaments/mens/worldcup/canadamexicousa2026/scores-fixtures";
const SKY_FIXTURES_URL = "https://www.skysports.com/fifa-world-cup-scores-fixtures";
const MONTH_INDEX = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
};
const SKY_TEAM_ALIASES = {
  "Korea Republic": "South Korea",
  "Czech Republic": "Czechia",
  "United States of America": "United States",
  "Bosnia and Herzegovina": "Bosnia and Herzegovina"
};
const TEAM_GROUP_BY_ID = Object.fromEntries([
  ["mexico", "A"],
  ["south-africa", "A"],
  ["south-korea", "A"],
  ["czechia", "A"],
  ["canada", "B"],
  ["qatar", "B"],
  ["switzerland", "B"],
  ["bosnia-herzegovina", "B"],
  ["brazil", "C"],
  ["morocco", "C"],
  ["scotland", "C"],
  ["haiti", "C"],
  ["united-states", "D"],
  ["paraguay", "D"],
  ["turkey", "D"],
  ["australia", "D"],
  ["germany", "E"],
  ["ecuador", "E"],
  ["ivory-coast", "E"],
  ["curacao", "E"],
  ["netherlands", "F"],
  ["japan", "F"],
  ["sweden", "F"],
  ["tunisia", "F"],
  ["belgium", "G"],
  ["egypt", "G"],
  ["iran", "G"],
  ["new-zealand", "G"],
  ["spain", "H"],
  ["uruguay", "H"],
  ["cape-verde", "H"],
  ["saudi-arabia", "H"],
  ["france", "I"],
  ["norway", "I"],
  ["iraq", "I"],
  ["senegal", "I"],
  ["argentina", "J"],
  ["algeria", "J"],
  ["austria", "J"],
  ["jordan", "J"],
  ["portugal", "K"],
  ["colombia", "K"],
  ["uzbekistan", "K"],
  ["dr-congo", "K"],
  ["england", "L"],
  ["croatia", "L"],
  ["ghana", "L"],
  ["panama", "L"]
]);

const LOCAL_PLAYER_IMAGES = {
  "lionel-messi": "/images/players/messi.jpg",
  messi: "/images/players/messi.jpg",
  "kylian-mbappe": "/images/players/mbappe.webp",
  mbappe: "/images/players/mbappe.webp",
  "erling-haaland": "/images/players/haaland.webp",
  haaland: "/images/players/haaland.webp",
  "cristiano-ronaldo": "/images/players/ronaldo.png",
  ronaldo: "/images/players/ronaldo.png"
};
const wikipediaImageCache = new Map();

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

function slugFromName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function localPlayerImage(playerName) {
  const slug = slugFromName(playerName);
  return LOCAL_PLAYER_IMAGES[slug] || "";
}

function displayTeamName(value) {
  const name = String(value || "").trim();
  return SKY_TEAM_ALIASES[name] || name || "TBC";
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
  const home = normalizeTeam(match.homeTeam);
  const away = normalizeTeam(match.awayTeam);
  return {
    id: match.id || `match-${match.utcDate}-${match.homeTeam?.name}-${match.awayTeam?.name}`,
    utcDate: match.utcDate,
    group: match.group || match.stage || "",
    stage: match.stage || match.group || "",
    venue: match.venue || match.area?.name || "",
    status: match.status || "SCHEDULED",
    statusState: match.statusState || "",
    completed: Boolean(match.completed),
    winnerTeamId: match.winnerTeamId || winnerTeamId(home, away, fullTime),
    source: match.source || "football-data",
    homeTeam: home,
    awayTeam: away,
    score: {
      fullTime: {
        home: Number.isFinite(fullTime.home) ? fullTime.home : null,
        away: Number.isFinite(fullTime.away) ? fullTime.away : null
      }
    }
  };
}

function winnerTeamId(homeTeam, awayTeam, fullTime = {}) {
  if (!Number.isFinite(fullTime.home) || !Number.isFinite(fullTime.away)) return null;
  if (fullTime.home === fullTime.away) return null;
  return fullTime.home > fullTime.away ? homeTeam?.id : awayTeam?.id;
}

function formatEspnDate(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}${month}${day}`;
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
    /3rd[-\s]?Place Match/i,
    /Final/i
  ];
  const stageMatch = stagePatterns.map((pattern) => value.match(pattern)).find(Boolean);
  if (!stageMatch) return "";
  return stageMatch[0]
    .replace(/quarter[-\s]?finals?/i, "Quarter-finals")
    .replace(/semi[-\s]?finals?/i, "Semi-finals")
    .replace(/third[-\s]?place/i, "Third place")
    .replace(/3rd[-\s]?Place Match/i, "Third place")
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
    stage: parseEspnStage(competition.altGameNote),
    venue,
    status: statusType.description || statusType.name || "Scheduled",
    statusState: statusType.state || "",
    completed: Boolean(statusType.completed),
    winnerTeamId: winnerTeamId(normalizeEspnTeam(home), normalizeEspnTeam(away), {
      home: espnScore(home, statusType),
      away: espnScore(away, statusType)
    }),
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

async function fetchWikipediaPlayerImage(playerName) {
  const name = String(playerName || "").trim();
  if (!name) return "";
  const cacheKey = slugFromName(name);
  if (wikipediaImageCache.has(cacheKey)) return wikipediaImageCache.get(cacheKey);
  try {
    const page = name.replace(/\s+/g, "_");
    const data = await fetchJson(`${WIKIPEDIA_SUMMARY_URL}/${encodeURIComponent(page)}`, {
      "User-Agent": "WorldCupSweepstake/1.0 (local app)"
    });
    const imageUrl = data.thumbnail?.source || data.originalimage?.source || "";
    wikipediaImageCache.set(cacheKey, imageUrl);
    return imageUrl;
  } catch {
    wikipediaImageCache.set(cacheKey, "");
    return "";
  }
}

async function fetchText(url, headers = {}) {
  const response = await fetch(url, { headers });
  if (!response.ok) {
    throw new Error(`${url} returned ${response.status}`);
  }
  return response.text();
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, "\"")
    .replace(/\s+/g, " ")
    .trim();
}

function utcDateForFixture(day, month, timeText = "12.00pm") {
  const monthIndex = MONTH_INDEX[String(month || "").toLowerCase()];
  if (!Number.isFinite(monthIndex)) return null;
  const timeMatch = String(timeText || "").match(/(\d{1,2})[.:](\d{2})\s*(am|pm)?/i);
  let hour = 12;
  let minute = 0;
  if (timeMatch) {
    hour = Number(timeMatch[1]);
    minute = Number(timeMatch[2]);
    const marker = String(timeMatch[3] || "").toLowerCase();
    if (marker === "pm" && hour < 12) hour += 12;
    if (marker === "am" && hour === 12) hour = 0;
  }
  const date = new Date(Date.UTC(2026, monthIndex, Number(day), hour, minute));
  if (monthIndex >= 5 && monthIndex <= 6) {
    date.setUTCHours(date.getUTCHours() - 1);
  }
  return date.toISOString();
}

function inferStageFromDate(utcDate, fallback = "") {
  const date = new Date(utcDate);
  const stamp = date.toISOString().slice(0, 10);
  if (stamp >= "2026-07-19") return "Final";
  if (stamp >= "2026-07-18") return "Third place";
  if (stamp >= "2026-07-14") return "Semi-finals";
  if (stamp >= "2026-07-09") return "Quarter-finals";
  if (stamp >= "2026-07-04") return "Round of 16";
  if (stamp >= "2026-06-29") return "Round of 32";
  return fallback || "";
}

function inferGroupFromTeams(homeName, awayName) {
  const homeGroup = TEAM_GROUP_BY_ID[teamIdFromName(homeName)];
  const awayGroup = TEAM_GROUP_BY_ID[teamIdFromName(awayName)];
  return homeGroup && homeGroup === awayGroup ? `Group ${homeGroup}` : "";
}

function normalizeProviderFixture(match) {
  return normalizeFixture(match);
}

function parseSkyFixtures(html) {
  const text = stripHtml(html);
  const dayPattern = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(\d{1,2})(?:st|nd|rd|th)\s+(June|July)\b/g;
  const dayMatches = [...text.matchAll(dayPattern)];
  const fixtures = [];

  dayMatches.forEach((dayMatch, index) => {
    const start = dayMatch.index + dayMatch[0].length;
    const end = dayMatches[index + 1]?.index ?? text.length;
    const block = text.slice(start, end);
    const [, , day, month] = dayMatch;
    const completedPattern = /View fixture\s+(.+?)\s+(\d+)\s+(.+?)\s+(\d+)\s+FT Full Time\./g;
    const scheduledPattern = /View fixture\s+(.+?)\s+are scheduled to play\s+(.+?)\s+\.\s+(\d{1,2}\.\d{2}(?:am|pm))/g;

    for (const match of block.matchAll(completedPattern)) {
      const homeName = displayTeamName(match[1]);
      const awayName = displayTeamName(match[3]);
      const utcDate = utcDateForFixture(day, month);
      if (!utcDate || !homeName || !awayName) continue;
      const fullTime = {
        home: Number(match[2]),
        away: Number(match[4])
      };
      const inferredGroup = inferGroupFromTeams(homeName, awayName);
      const stage = inferStageFromDate(utcDate, inferredGroup);
      const group = stage || "";
      fixtures.push(normalizeProviderFixture({
        id: `sky-${utcDate}-${homeName}-${awayName}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        utcDate,
        group,
        stage: group,
        venue: "",
        status: "Full Time",
        statusState: "post",
        completed: true,
        source: "sky",
        homeTeam: { name: homeName, shortName: homeName },
        awayTeam: { name: awayName, shortName: awayName },
        score: { fullTime }
      }));
    }

    for (const match of block.matchAll(scheduledPattern)) {
      const homeName = displayTeamName(match[1]);
      const awayName = displayTeamName(match[2]);
      const utcDate = utcDateForFixture(day, month, match[3]);
      if (!utcDate || !homeName || !awayName) continue;
      const stage = inferStageFromDate(utcDate, inferGroupFromTeams(homeName, awayName));
      fixtures.push(normalizeProviderFixture({
        id: `sky-${utcDate}-${homeName}-${awayName}`.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        utcDate,
        group: stage,
        stage,
        venue: "",
        status: "Scheduled",
        statusState: "pre",
        completed: false,
        source: "sky",
        homeTeam: { name: homeName, shortName: homeName },
        awayTeam: { name: awayName, shortName: awayName },
        score: { fullTime: { home: null, away: null } }
      }));
    }
  });

  return fixtures.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
}

async function fetchFifaLiveData() {
  const html = await fetchText(FIFA_FIXTURES_URL, {
    "User-Agent": "Mozilla/5.0 WorldCupSweepstake/1.0"
  });
  const fixtures = parseSkyFixtures(html);
  if (!fixtures.length) {
    throw new Error("FIFA page did not expose server-readable fixture rows.");
  }
  return {
    provider: "fifa",
    fixtures,
    messages: ["Live scores synced from FIFA."]
  };
}

async function fetchSkyLiveData() {
  const html = await fetchText(SKY_FIXTURES_URL, {
    "User-Agent": "Mozilla/5.0 WorldCupSweepstake/1.0"
  });
  const fixtures = parseSkyFixtures(html);
  if (!fixtures.length) {
    throw new Error("Sky Sports page did not expose fixture rows.");
  }
  return {
    provider: "sky",
    fixtures,
    messages: ["Live scores synced from Sky Sports."]
  };
}

async function fetchEspnFixtures() {
  const data = await fetchJson(`${ESPN_SCOREBOARD_URL}?dates=${TOURNAMENT_START_DATE}-${TOURNAMENT_END_DATE}&limit=500`);
  return (data.events || []).map(normalizeEspnFixture);
}

async function fetchEspnLiveData() {
  const [fixtures, statLeaders] = await Promise.all([
    fetchEspnFixtures(),
    fetchEspnStatLeaders().catch(() => unavailableStatLeaders("espn"))
  ]);
  if (!fixtures.length) {
    throw new Error("ESPN returned no fixtures.");
  }
  return {
    provider: "espn",
    fixtures,
    statLeaders,
    messages: ["Live scores synced from ESPN fallback."]
  };
}

function normalizeEspnStatLeader(category, leader) {
  const athlete = leader.athlete || {};
  const team = athlete.team || {};
  const teamName = team.displayName || team.name || "";
  const athleteId = athlete.id || athlete.uid?.split(":").pop() || "";
  const playerName = athlete.displayName || athlete.shortName || "Unknown player";
  return {
    athleteId,
    playerName,
    imageUrl: localPlayerImage(playerName) || athlete.headshot?.href || "",
    espnImageUrl: athleteId ? `https://a.espncdn.com/i/headshots/soccer/players/full/${athleteId}.png` : "",
    teamId: teamIdFromName(teamName),
    teamName,
    value: Number(leader.value || 0),
    displayValue: leader.displayValue || String(leader.value ?? ""),
    category
  };
}

function statCategoryFromEspnName(name) {
  const value = String(name || "").toLowerCase();
  if (value.includes("goals")) return "goals";
  if (value.includes("assist")) return "assists";
  if (value.includes("clean")) return "cleanSheets";
  return "";
}

async function fetchEspnStatLeaders() {
  const data = await fetchJson(ESPN_STATISTICS_URL);
  const result = unavailableStatLeaders("espn");
  for (const stat of data.stats || []) {
    const category = statCategoryFromEspnName(stat.name || stat.displayName);
    if (!category) continue;
    const leaders = (stat.leaders || [])
      .map((leader) => normalizeEspnStatLeader(category, leader))
      .filter((leader) => leader.value > 0)
      .slice(0, 8);
    if (!leaders.length) continue;
    const enrichedLeaders = await Promise.all(leaders.map(async (leader) => ({
      ...leader,
      imageUrl: leader.imageUrl || await fetchWikipediaPlayerImage(leader.playerName) || leader.espnImageUrl || ""
    })));
    result[category] = {
      category,
      label: category === "goals" ? "Top scorers" : category === "assists" ? "Top assists" : "Clean sheets",
      source: "espn",
      leaders: enrichedLeaders,
      unavailable: false,
      message: ""
    };
  }
  return result;
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

function splitFixtures(fixtures) {
  const normalized = fixtures.map(normalizeFixture);
  return {
    fixtures: normalized,
    groupFixtures: normalized.filter((match) => isGroupStageName(match.group || match.stage)),
    knockoutFixtures: normalized.filter((match) => {
      const label = String(match.group || match.stage || "");
      return label && !isGroupStageName(label);
    })
  };
}

function unavailableStatLeaders(provider = "public provider") {
  return {
    goals: {
      category: "goals",
      label: "Top scorer",
      source: provider,
      leaders: [],
      unavailable: true,
      message: "Top scorer data unavailable from provider."
    },
    assists: {
      category: "assists",
      label: "Top assister",
      source: provider,
      leaders: [],
      unavailable: true,
      message: "Assist data unavailable from provider."
    },
    cleanSheets: {
      category: "cleanSheets",
      label: "Top clean sheets",
      source: provider,
      leaders: [],
      unavailable: true,
      message: "Clean-sheet data unavailable from provider."
    }
  };
}

function hasStatLeaders(statLeaders) {
  return Object.values(statLeaders || {}).some((category) => (category.leaders || []).length > 0);
}

function buildSourceStatus(provider, attempts, statLeaders) {
  return {
    provider,
    attempts,
    fixturesProvider: provider,
    standingsProvider: "computed-from-fixtures",
    statsProvider: hasStatLeaders(statLeaders) ? "espn" : "unavailable"
  };
}

function fixtureMergeKey(match) {
  return [
    match.group || match.stage || "",
    match.homeTeam?.id || teamIdFromName(match.homeTeam?.name),
    match.awayTeam?.id || teamIdFromName(match.awayTeam?.name)
  ].join("|");
}

function mergeFixturesByPriority(baseFixtures, overlayFixtures) {
  const byKey = new Map(baseFixtures.map((match) => [fixtureMergeKey(match), match]));
  overlayFixtures.forEach((match) => {
    const key = fixtureMergeKey(match);
    const current = byKey.get(key);
    byKey.set(key, current ? { ...current, ...match, homeTeam: current.homeTeam, awayTeam: current.awayTeam } : match);
  });
  return [...byKey.values()].sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    sendJson(res, 405, { ok: false, error: "Method not allowed." });
    return;
  }

  const payload = {
    ok: true,
    providerAvailable: true,
    fixturesSource: "",
    fixtures: [],
    groupStandings: [],
    knockoutFixtures: [],
    standings: [],
    statLeaders: unavailableStatLeaders(),
    sourceStatus: null,
    messages: [],
    syncedAt: new Date().toISOString()
  };

  const attempts = [];
  try {
    const espn = await fetchEspnLiveData();
    payload.fixtures = espn.fixtures;
    payload.statLeaders = espn.statLeaders;
    payload.fixturesSource = "espn";
    payload.messages.push("Full tournament schedule synced from ESPN.");
    attempts.push({ provider: "espn", ok: true });
  } catch (error) {
    attempts.push({ provider: "espn", ok: false, message: error.message });
  }

  for (const [name, adapter] of [["fifa", fetchFifaLiveData], ["sky", fetchSkyLiveData]]) {
    try {
      const data = await adapter();
      payload.fixtures = payload.fixtures.length
        ? mergeFixturesByPriority(payload.fixtures, data.fixtures)
        : data.fixtures;
      payload.fixturesSource = payload.fixturesSource ? `${payload.fixturesSource}+${data.provider || name}` : data.provider || name;
      attempts.push({ provider: name, ok: true });
    } catch (error) {
      attempts.push({ provider: name, ok: false, message: error.message });
    }
  }

  if (!payload.fixtures.length) {
    try {
      await fetchFootballData(payload);
      attempts.push({ provider: "football-data", ok: true });
    } catch (error) {
      attempts.push({ provider: "football-data", ok: false, message: error.message });
    }
  }

  if (!payload.fixtures.length) {
    payload.providerAvailable = false;
    payload.fixturesSource = "static";
    payload.fixtures = STATIC_FIXTURES.map(normalizeFixture);
    payload.knockoutFixtures = [];
    payload.messages.push("Live provider unavailable. Showing the static published fixture schedule.");
    attempts.push({ provider: "static", ok: true });
  }

  const split = splitFixtures(payload.fixtures);
  payload.fixtures = split.fixtures;
  payload.knockoutFixtures = split.knockoutFixtures;
  payload.groupStandings = computeTournamentStandings(split.groupFixtures);
  payload.standings = payload.groupStandings;
  payload.sourceStatus = buildSourceStatus(payload.fixturesSource || "static", attempts, payload.statLeaders);

  sendJson(res, 200, payload);
}
