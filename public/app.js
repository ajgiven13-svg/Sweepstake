const BATCHES = ["Crap", "Not Great", "Hopeful", "Best"];
const PLAYER_COUNTS = [8, 9, 10, 11, 12];
const TOTAL_TEAMS = 48;
const TEAMS_PER_BATCH = TOTAL_TEAMS / BATCHES.length;
const SCHEMA_VERSION = 4;
const STORAGE_KEY = "world-cup-2026-sweepstake-state";
const SAVED_DRAWS_KEY = "world-cup-2026-sweepstake-saved-draws";
const AUDIO_CLIPS = [
  "/assets/audio/yes-yes-yes.mp3",
  "/assets/audio/twat.mp3",
  "/assets/audio/proof-pudding-football.mp3",
  "/assets/audio/goalie-football-pie.mp3",
  "/assets/audio/liquid-football.mp3",
  "/assets/audio/did-you-see-that.mp3",
  "/assets/audio/gooooaaallll.mp3"
];
const PENALTY_GOAL_AUDIO = "/assets/audio/gooooaaallll.mp3";
const STAGES = ["penalty", "freeKick", "runningAttack"];
const STAGE_LABELS = {
  penalty: "Penalty",
  freeKick: "Free Kick",
  runningAttack: "Running Attack"
};
const GAME_DURATION_SECONDS = 60;
const MAX_DIFFICULTY_MULTIPLIER = 2.5;
const RESULT_DELAY_SECONDS = 0.75;
const PLAYER_IMAGES = {
  attackers: [
    "/images/players/mbappe.webp",
    "/images/players/haaland.webp",
    "/images/players/messi.jpg",
    "/images/players/ronaldo.png"
  ],
  goalkeepers: [
    "/images/players/haaland.webp",
    "/images/players/ronaldo.png"
  ],
  defenders: [
    "/images/players/haaland.webp",
    "/images/players/ronaldo.png",
    "/images/players/mbappe.webp"
  ],
  wallPlayers: [
    "/images/players/mbappe.webp",
    "/images/players/haaland.webp",
    "/images/players/messi.jpg",
    "/images/players/ronaldo.png"
  ]
};
const CHALLENGE_FIELD = {
  width: 720,
  height: 420,
  goalLeft: 150,
  goalRight: 570,
  goalTop: 58,
  goalBottom: 214,
  keeperY: 136,
  spotX: 360,
  spotY: 360
};
const RUNNING_FIELD = {
  goalX: 650,
  goalTop: 124,
  goalBottom: 296,
  startX: 84,
  centerY: 210
};
const RUNNING_KEEPER_REACH_RATIO = 1 / 3;

const STATIC_ODDS = {
  spain: "4/1",
  france: "9/2",
  england: "6/1",
  brazil: "8/1",
  argentina: "8/1",
  portugal: "10/1",
  germany: "14/1",
  netherlands: "20/1",
  norway: "25/1",
  belgium: "33/1",
  colombia: "33/1",
  "united-states": "40/1",
  morocco: "40/1",
  japan: "50/1",
  uruguay: "50/1",
  czechia: "50/1",
  mexico: "66/1",
  croatia: "66/1",
  switzerland: "66/1",
  sweden: "66/1",
  ecuador: "66/1",
  senegal: "66/1",
  turkey: "66/1",
  austria: "100/1",
  "ivory-coast": "100/1",
  "south-korea": "100/1",
  egypt: "150/1",
  canada: "150/1",
  paraguay: "150/1",
  australia: "200/1",
  "bosnia-herzegovina": "200/1",
  iran: "250/1",
  scotland: "250/1",
  "dr-congo": "250/1",
  algeria: "250/1",
  "saudi-arabia": "300/1",
  ghana: "300/1",
  tunisia: "300/1",
  "south-africa": "400/1",
  panama: "400/1",
  "cape-verde": "500/1",
  uzbekistan: "500/1",
  qatar: "500/1",
  iraq: "500/1",
  jordan: "500/1",
  curacao: "1000/1",
  haiti: "1000/1",
  "new-zealand": "1000/1"
};

const DEFAULT_TEAMS = [
  ["mexico", "🇲🇽", "Mexico", "A", "A1", 1, 15, "Hopeful"],
  ["south-africa", "🇿🇦", "South Africa", "A", "A2", 3, 61, "Crap"],
  ["south-korea", "🇰🇷", "South Korea", "A", "A3", 2, 22, "Not Great"],
  ["czechia", "🇨🇿", "Czechia", "A", "A4", 4, 44, "Hopeful"],
  ["canada", "🇨🇦", "Canada", "B", "B1", 1, 27, "Not Great"],
  ["bosnia-herzegovina", "🇧🇦", "Bosnia and Herzegovina", "B", "B2", 4, 71, "Not Great"],
  ["qatar", "🇶🇦", "Qatar", "B", "B3", 3, 51, "Crap"],
  ["switzerland", "🇨🇭", "Switzerland", "B", "B4", 2, 17, "Hopeful"],
  ["brazil", "🇧🇷", "Brazil", "C", "C1", 1, 5, "Best"],
  ["morocco", "🇲🇦", "Morocco", "C", "C2", 2, 11, "Hopeful"],
  ["haiti", "🇭🇹", "Haiti", "C", "C3", 4, 84, "Crap"],
  ["scotland", "🏴", "Scotland", "C", "C4", 3, 36, "Not Great"],
  ["united-states", "🇺🇸", "United States", "D", "D1", 1, 14, "Best"],
  ["paraguay", "🇵🇾", "Paraguay", "D", "D2", 3, 39, "Not Great"],
  ["australia", "🇦🇺", "Australia", "D", "D3", 2, 26, "Not Great"],
  ["turkey", "🇹🇷", "Turkey", "D", "D4", 4, 25, "Hopeful"],
  ["germany", "🇩🇪", "Germany", "E", "E1", 1, 9, "Best"],
  ["curacao", "🇨🇼", "Curacao", "E", "E2", 4, 82, "Crap"],
  ["ivory-coast", "🇨🇮", "Ivory Coast", "E", "E3", 3, 42, "Not Great"],
  ["ecuador", "🇪🇨", "Ecuador", "E", "E4", 2, 23, "Hopeful"],
  ["netherlands", "🇳🇱", "Netherlands", "F", "F1", 1, 7, "Best"],
  ["japan", "🇯🇵", "Japan", "F", "F2", 2, 18, "Hopeful"],
  ["sweden", "🇸🇪", "Sweden", "F", "F3", 4, 43, "Hopeful"],
  ["tunisia", "🇹🇳", "Tunisia", "F", "F4", 3, 40, "Crap"],
  ["belgium", "🇧🇪", "Belgium", "G", "G1", 1, 8, "Best"],
  ["egypt", "🇪🇬", "Egypt", "G", "G2", 3, 34, "Not Great"],
  ["iran", "🇮🇷", "Iran", "G", "G3", 2, 20, "Not Great"],
  ["new-zealand", "🇳🇿", "New Zealand", "G", "G4", 4, 86, "Crap"],
  ["spain", "🇪🇸", "Spain", "H", "H1", 1, 1, "Best"],
  ["cape-verde", "🇨🇻", "Cape Verde", "H", "H2", 4, 68, "Crap"],
  ["saudi-arabia", "🇸🇦", "Saudi Arabia", "H", "H3", 3, 60, "Not Great"],
  ["uruguay", "🇺🇾", "Uruguay", "H", "H4", 2, 16, "Hopeful"],
  ["france", "🇫🇷", "France", "I", "I1", 1, 3, "Best"],
  ["senegal", "🇸🇳", "Senegal", "I", "I2", 2, 19, "Hopeful"],
  ["iraq", "🇮🇶", "Iraq", "I", "I3", 4, 58, "Crap"],
  ["norway", "🇳🇴", "Norway", "I", "I4", 3, 29, "Best"],
  ["argentina", "🇦🇷", "Argentina", "J", "J1", 1, 2, "Best"],
  ["algeria", "🇩🇿", "Algeria", "J", "J2", 3, 35, "Not Great"],
  ["austria", "🇦🇹", "Austria", "J", "J3", 2, 24, "Hopeful"],
  ["jordan", "🇯🇴", "Jordan", "J", "J4", 4, 66, "Crap"],
  ["portugal", "🇵🇹", "Portugal", "K", "K1", 1, 6, "Best"],
  ["dr-congo", "🇨🇩", "DR Congo", "K", "K2", 4, 56, "Not Great"],
  ["uzbekistan", "🇺🇿", "Uzbekistan", "K", "K3", 3, 50, "Crap"],
  ["colombia", "🇨🇴", "Colombia", "K", "K4", 2, 13, "Best"],
  ["england", "🏴", "England", "L", "L1", 1, 4, "Best"],
  ["croatia", "🇭🇷", "Croatia", "L", "L2", 2, 10, "Hopeful"],
  ["ghana", "🇬🇭", "Ghana", "L", "L3", 4, 72, "Crap"],
  ["panama", "🇵🇦", "Panama", "L", "L4", 3, 30, "Crap"]
].map(([id, flag, name, group, drawPosition, pot, ranking, batch]) => ({
  id,
  flag,
  name,
  group,
  drawPosition,
  pot,
  ranking,
  batch,
  odds: STATIC_ODDS[id] || null,
  status: "Active"
}));

const RECOVERED_DRAW_ALLOCATIONS = [
  ["Aidan", [["uzbekistan", "Crap"], ["ivory-coast", "Not Great"], ["croatia", "Hopeful"], ["argentina", "Best"]]],
  ["Darragh", [["panama", "Crap"], ["paraguay", "Not Great"], ["sweden", "Hopeful"], ["colombia", "Best"]]],
  ["Shane", [["tunisia", "Crap"], ["algeria", "Not Great"], ["czechia", "Hopeful"], ["morocco", "Best"]]],
  ["Hugh", [["cape-verde", "Crap"], ["canada", "Not Great"], ["uruguay", "Hopeful"], ["germany", "Best"]]],
  ["Michael", [["jordan", "Crap"], ["iran", "Not Great"], ["switzerland", "Hopeful"], ["norway", "Best"]]],
  ["Matthew", [["curacao", "Crap"], ["south-korea", "Not Great"], ["mexico", "Hopeful"], ["portugal", "Best"]]],
  ["Rob", [["haiti", "Crap"], ["australia", "Not Great"], ["austria", "Hopeful"], ["brazil", "Best"]]],
  ["Natalia", [["new-zealand", "Crap"], ["dr-congo", "Not Great"], ["united-states", "Hopeful"], ["belgium", "Best"]]],
  ["Eef", [["ghana", "Crap"], ["saudi-arabia", "Not Great"], ["senegal", "Hopeful"], ["netherlands", "Best"]]],
  ["Witz", [["south-africa", "Crap"], ["egypt", "Not Great"], ["ecuador", "Hopeful"], ["spain", "Best"]]],
  ["Mossy", [["iraq", "Crap"], ["bosnia-herzegovina", "Not Great"], ["japan", "Hopeful"], ["france", "Best"]]],
  ["Taz", [["qatar", "Crap"], ["scotland", "Not Great"], ["turkey", "Hopeful"], ["england", "Best"]]]
];

const BUILT_IN_DRAWS = [
  {
    id: "recovered-12-player-draw",
    name: "Recovered 12-player draw",
    source: "built-in",
    allocations: RECOVERED_DRAW_ALLOCATIONS
  }
];

let state = null;
let liveData = null;
const imageCache = new Map();
const challengeGame = {
  currentStage: "penalty",
  sequenceIndex: 0,
  score: 0,
  goals: 0,
  misses: 0,
  attempts: 0,
  timeRemaining: GAME_DURATION_SECONDS,
  gameDuration: GAME_DURATION_SECONDS,
  gameStartedAt: null,
  isRunning: false,
  isGameOver: false,
  isShooting: false,
  difficultyLevel: 1,
  completedSequences: 0,
  baseGoalkeeperSpeed: 138,
  baseWallSpeed: 42,
  baseDefenderSpeed: 42,
  resultMessage: "Ready",
  resultTimer: 0,
  flashTimer: 0,
  lastFrame: 0,
  scoreSaved: false,
  highScores: [],
  selectedImages: {
    attacker: null,
    goalkeeper: null,
    defender: null,
    wallPlayers: []
  },
  aimTarget: {
    x: CHALLENGE_FIELD.spotX,
    y: 128
  },
  curl: 0,
  drag: {
    active: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0
  },
  attacker: {
    x: CHALLENGE_FIELD.spotX,
    y: 340,
    width: 68,
    height: 120,
    speed: 190
  },
  defender: {
    x: CHALLENGE_FIELD.spotX,
    y: 238,
    width: 62,
    height: 110
  },
  keeper: {
    x: CHALLENGE_FIELD.spotX,
    y: CHALLENGE_FIELD.keeperY,
    width: 128,
    height: 156,
    direction: 1
  },
  wall: {
    x: CHALLENGE_FIELD.spotX,
    y: 242,
    direction: 1
  },
  ball: {
    x: CHALLENGE_FIELD.spotX,
    y: CHALLENGE_FIELD.spotY,
    radius: 10,
    vx: 0,
    vy: 0,
    curve: 0,
    pathActive: false,
    pathT: 0,
    pathDuration: 0.72,
    startX: CHALLENGE_FIELD.spotX,
    startY: CHALLENGE_FIELD.spotY,
    controlX: CHALLENGE_FIELD.spotX,
    controlY: 210,
    moving: false,
    targetX: CHALLENGE_FIELD.spotX,
    targetY: 128
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  syncStatus: $("#syncStatus"),
  savedDrawSelect: $("#savedDrawSelect"),
  loadSavedDrawButton: $("#loadSavedDrawButton"),
  saveSnapshotButton: $("#saveSnapshotButton"),
  newDrawButton: $("#newDrawButton"),
  summaryGrid: $("#summaryGrid"),
  playerCountSelect: $("#playerCountSelect"),
  nameInputs: $("#nameInputs"),
  saveNamesButton: $("#saveNamesButton"),
  goTeamsButton: $("#goTeamsButton"),
  resetButton: $("#resetButton"),
  restoreTeamsButton: $("#restoreTeamsButton"),
  teamValidation: $("#teamValidation"),
  teamTableBody: $("#teamTableBody"),
  goExclusionsButton: $("#goExclusionsButton"),
  exclusionStatus: $("#exclusionStatus"),
  imbalanceConfirmWrap: $("#imbalanceConfirmWrap"),
  imbalanceConfirm: $("#imbalanceConfirm"),
  exclusionGrid: $("#exclusionGrid"),
  clearExclusionsButton: $("#clearExclusionsButton"),
  startDrawButton: $("#startDrawButton"),
  drawHeadline: $("#drawHeadline"),
  drawNow: $("#drawNow"),
  drawButton: $("#drawButton"),
  repickButton: $("#repickButton"),
  customDrawText: $("#customDrawText"),
  loadCustomDrawButton: $("#loadCustomDrawButton"),
  playerGrid: $("#playerGrid"),
  excludedList: $("#excludedList"),
  refreshLiveButton: $("#refreshLiveButton"),
  liveStatus: $("#liveStatus"),
  fixturesGrid: $("#fixturesGrid"),
  groupTables: $("#groupTables"),
  goalOverlay: $("#goalOverlay"),
  penaltyCanvas: $("#penaltyCanvas"),
  challengeStartButton: $("#challengeStartButton"),
  challengeResetButton: $("#challengeResetButton"),
  challengeTime: $("#challengeTime"),
  challengeScore: $("#challengeScore"),
  challengeStage: $("#challengeStage"),
  challengeDifficulty: $("#challengeDifficulty"),
  challengeAttempts: $("#challengeAttempts"),
  challengeMessage: $("#challengeMessage"),
  challengeScoreForm: $("#challengeScoreForm"),
  challengePlayerName: $("#challengePlayerName"),
  challengeHighScores: $("#challengeHighScores"),
  penaltyGoalFlash: $("#penaltyGoalFlash")
};

function getDrawId() {
  const [, route, drawId] = window.location.pathname.split("/");
  if (route === "sweepstake" && drawId) {
    return decodeURIComponent(drawId);
  }
  return "default";
}

function storageKey() {
  return `${STORAGE_KEY}:${getDrawId()}`;
}

function allocation(playerCount = state.playerCount) {
  const teamsPerPlayer = Math.floor(TOTAL_TEAMS / playerCount);
  const activeTeamCount = teamsPerPlayer * playerCount;
  return {
    teamsPerPlayer,
    activeTeamCount,
    excludedTeamCount: TOTAL_TEAMS - activeTeamCount
  };
}

function defaultPlayers(playerCount) {
  return Array.from({ length: playerCount }, (_, index) => ({
    id: `p${index + 1}`,
    name: ""
  }));
}

function createDefaultState(drawId = getDrawId()) {
  return {
    schemaVersion: SCHEMA_VERSION,
    drawId,
    playerCount: 8,
    players: defaultPlayers(8),
    teams: structuredClone(DEFAULT_TEAMS),
    excludedTeamIds: [],
    activeTeamIds: DEFAULT_TEAMS.map((team) => team.id),
    drawSchedule: [],
    picks: [],
    currentPickIndex: 0,
    phase: "names",
    resultsCache: null,
    updatedAt: new Date().toISOString()
  };
}

function normalizeTeamName(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function teamIdFromName(value) {
  const normalized = normalizeTeamName(value);
  const aliases = {
    "usa": "united-states",
    "us": "united-states",
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
  if (aliases[normalized]) return aliases[normalized];
  const match = DEFAULT_TEAMS.find((team) => normalizeTeamName(team.name) === normalized || team.id === normalized);
  return match?.id || normalized;
}

function buildCompletedStateFromAllocations(allocations, drawId = getDrawId()) {
  const playerCount = allocations.length;
  const players = allocations.map(([name], index) => ({
    id: `p${index + 1}`,
    name: String(name || `Player ${index + 1}`).trim()
  }));
  const assignedBatchByTeam = new Map();
  allocations.forEach(([, picks]) => {
    picks.forEach(([teamValue, batch]) => {
      assignedBatchByTeam.set(teamIdFromName(teamValue), batch);
    });
  });
  const teams = DEFAULT_TEAMS.map((team) => ({
    ...team,
    batch: assignedBatchByTeam.get(team.id) || team.batch
  }));
  const activeTeamIds = teams.map((team) => team.id);
  const drawSchedule = [];
  const picks = [];
  const pickBatches = BATCHES.filter((batch) => allocations.some(([, items]) => items.some(([, itemBatch]) => itemBatch === batch)));

  pickBatches.forEach((batch, roundIndex) => {
    allocations.forEach(([, playerPicks], playerIndex) => {
      const pick = playerPicks.find(([, pickBatch]) => pickBatch === batch);
      if (!pick) return;
      const teamId = teamIdFromName(pick[0]);
      const player = players[playerIndex];
      const pickIndex = drawSchedule.length;
      drawSchedule.push({
        pickNumber: pickIndex + 1,
        round: roundIndex + 1,
        playerId: player.id,
        playerIndex,
        batch
      });
      picks.push({
        id: `saved-${pickIndex + 1}`,
        pickIndex,
        playerId: player.id,
        teamId,
        batch,
        drawnAt: new Date().toISOString()
      });
    });
  });

  return normalizeState({
    schemaVersion: SCHEMA_VERSION,
    drawId,
    playerCount,
    players,
    teams,
    excludedTeamIds: [],
    activeTeamIds,
    drawSchedule,
    picks,
    currentPickIndex: drawSchedule.length,
    phase: "complete",
    resultsCache: state?.resultsCache || null,
    updatedAt: new Date().toISOString()
  });
}

function parseCustomDraw(text) {
  const allocations = [];
  let current = null;
  String(text || "").split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) return;
    const nameMatch = line.match(/^\*?([^*—-][^*]*)\*?$/);
    const pickMatch = line.match(/^(.+?)\s+[—-]\s+(.+?)\s+[—-]\s+(.+)$/);
    if (pickMatch) {
      if (!current) throw new Error("Add a player name before team lines.");
      const batch = BATCHES.find((item) => item.toLowerCase() === pickMatch[2].trim().toLowerCase());
      if (!batch) throw new Error(`Unknown tier: ${pickMatch[2].trim()}`);
      current[1].push([teamIdFromName(pickMatch[1]), batch]);
      return;
    }
    if (nameMatch) {
      current = [nameMatch[1].trim(), []];
      allocations.push(current);
    }
  });

  if (!allocations.length || allocations.some(([, picks]) => picks.length === 0)) {
    throw new Error("Paste at least one player with team allocation lines.");
  }
  return allocations;
}

function savedDrawSnapshots() {
  try {
    const items = JSON.parse(localStorage.getItem(SAVED_DRAWS_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch {
    return [];
  }
}

function writeSavedDrawSnapshots(items) {
  localStorage.setItem(SAVED_DRAWS_KEY, JSON.stringify(items));
}

function allocationsToText(allocations) {
  return allocations.map(([name, picks]) => [
    `*${name}*`,
    ...picks.map(([teamId, batch]) => {
      const team = DEFAULT_TEAMS.find((item) => item.id === teamId);
      return `${team?.name || teamId} — ${batch} — ${team?.odds || ""}`.trim();
    })
  ].join("\n")).join("\n\n");
}

function normalizeState(input) {
  if (input && input.schemaVersion !== SCHEMA_VERSION) {
    input = null;
  }

  const next = { ...createDefaultState(), ...(input || {}) };
  const compatibleTeams = input?.schemaVersion === SCHEMA_VERSION ? input.teams || [] : [];
  next.schemaVersion = SCHEMA_VERSION;
  next.playerCount = PLAYER_COUNTS.includes(Number(next.playerCount)) ? Number(next.playerCount) : 8;
  next.players = Array.from({ length: next.playerCount }, (_, index) => {
    const existing = next.players?.[index];
    return {
      id: existing?.id || `p${index + 1}`,
      name: existing?.name || ""
    };
  });
  const defaultById = Object.fromEntries(DEFAULT_TEAMS.map((team) => [team.id, team]));
  next.teams = DEFAULT_TEAMS.map((team) => {
    const savedTeam = compatibleTeams.find((item) => item.id === team.id);
    return { ...team, ...savedTeam, odds: savedTeam?.odds || team.odds };
  });
  next.excludedTeamIds = (next.excludedTeamIds || []).filter((id) => defaultById[id]);
  next.activeTeamIds = next.teams.map((team) => team.id).filter((id) => !next.excludedTeamIds.includes(id));
  next.picks = next.picks || [];
  next.drawSchedule = next.drawSchedule || [];
  next.currentPickIndex = Number(next.currentPickIndex || 0);
  next.phase = next.phase || "names";
  return next;
}

function teamById(id) {
  return state.teams.find((team) => team.id === id);
}

function playerById(id) {
  return state.players.find((player) => player.id === id);
}

function ownerByTeamId() {
  const owners = new Map();
  state.picks.forEach((pick) => {
    const player = playerById(pick.playerId);
    if (player?.name) owners.set(pick.teamId, player.name);
  });
  return owners;
}

function ownerForTeam(teamValue, owners = ownerByTeamId()) {
  return owners.get(teamIdFromName(teamValue)) || "";
}

function ownerChip(teamValue, owners = ownerByTeamId()) {
  const owner = ownerForTeam(teamValue, owners);
  return owner ? `<span class="owner-chip">${escapeHtml(owner)}</span>` : "";
}

function countsByBatch(teamIds = state.activeTeamIds) {
  return BATCHES.reduce((counts, batch) => {
    counts[batch] = teamIds.map(teamById).filter((team) => team?.batch === batch).length;
    return counts;
  }, {});
}

function fullBatchCounts() {
  return BATCHES.reduce((counts, batch) => {
    counts[batch] = state.teams.filter((team) => team.batch === batch).length;
    return counts;
  }, {});
}

function formatBatchCounts(counts) {
  return BATCHES.map((batch) => `${batch} ${counts[batch] || 0}`).join(", ");
}

function formatBatchSummary(counts) {
  return BATCHES.map((batch) => counts[batch] || 0).join(" / ");
}

function batchClass(batch) {
  return batch.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function picksForPlayer(playerId) {
  return state.picks.filter((pick) => pick.playerId === playerId);
}

function validateTeams() {
  const counts = fullBatchCounts();
  const balanced = BATCHES.every((batch) => counts[batch] === TEAMS_PER_BATCH);
  const total = state.teams.length === TOTAL_TEAMS;
  return { counts, valid: balanced && total };
}

function exclusionImbalance() {
  const counts = countsByBatch();
  const values = Object.values(counts);
  const spread = Math.max(...values) - Math.min(...values);
  return { counts, spread, unbalanced: spread > 2 };
}

async function loadState() {
  try {
    const response = await fetch(`/api/state?drawId=${encodeURIComponent(getDrawId())}`);
    const payload = await response.json();
    if (payload.state) {
      const remoteState = normalizeState(payload.state);
      if (getDrawId() === "penalty-test-2" && remoteState.picks.length < TOTAL_TEAMS) {
        state = buildCompletedStateFromAllocations(RECOVERED_DRAW_ALLOCATIONS);
        await saveState("Recovered draw restored");
        return;
      }
      state = remoteState;
      els.syncStatus.textContent = "Shared state loaded";
      return;
    }
    els.syncStatus.textContent = "New shared draw ready";
  } catch {
    els.syncStatus.textContent = "Remote state unavailable";
  }

  const local = localStorage.getItem(storageKey());
  if (local) {
    const localState = normalizeState(JSON.parse(local));
    if (getDrawId() === "penalty-test-2" && localState.picks.length < TOTAL_TEAMS) {
      state = buildCompletedStateFromAllocations(RECOVERED_DRAW_ALLOCATIONS);
      await saveState("Recovered draw restored");
      return;
    }
    state = localState;
    return;
  }

  if (getDrawId() === "penalty-test-2") {
    state = buildCompletedStateFromAllocations(RECOVERED_DRAW_ALLOCATIONS);
    await saveState("Recovered draw restored");
    return;
  }

  state = normalizeState(createDefaultState());
}

async function saveState(status = "Saved") {
  state.updatedAt = new Date().toISOString();
  localStorage.setItem(storageKey(), JSON.stringify(state));
  els.syncStatus.textContent = "Saving...";

  try {
    const response = await fetch(`/api/state?drawId=${encodeURIComponent(getDrawId())}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ state })
    });
    const payload = await response.json();
    if (!payload.ok) {
      throw new Error(payload.error || "Save failed");
    }
    state = normalizeState(payload.state);
    els.syncStatus.textContent = status;
  } catch {
    els.syncStatus.textContent = "Saved locally only";
  }
}

function switchPanel(step) {
  $$(".panel").forEach((panel) => panel.classList.toggle("active", panel.dataset.panel === step));
  $$(".tab-button").forEach((button) => button.classList.toggle("active", button.dataset.step === step));
}

function renderSummary() {
  const alloc = allocation();
  const activeCounts = countsByBatch();
  const excluded = state.excludedTeamIds.length;
  const completed = state.picks.length;
  const cards = [
    ["Total pool", TOTAL_TEAMS],
    ["Active teams", state.activeTeamIds.length || alloc.activeTeamCount],
    ["Excluded teams", `${excluded} / ${alloc.excludedTeamCount}`],
    ["Teams per player", alloc.teamsPerPlayer],
    [`${BATCHES.join(" / ")} active`, formatBatchSummary(activeCounts)],
    ["Draw progress", `${completed} / ${state.drawSchedule.length || alloc.activeTeamCount}`]
  ];
  els.summaryGrid.innerHTML = cards.map(([label, value]) => `
    <article class="summary-card">
      <span>${label}</span>
      <strong>${value}</strong>
    </article>
  `).join("");
}

function renderDrawManager() {
  if (!els.savedDrawSelect) return;
  const snapshots = savedDrawSnapshots();
  const options = [
    ...BUILT_IN_DRAWS.map((draw) => ({ value: `built-in:${draw.id}`, label: draw.name })),
    ...snapshots.map((draw) => ({ value: `snapshot:${draw.id}`, label: draw.name }))
  ];
  els.savedDrawSelect.innerHTML = options.map((option) => `
    <option value="${escapeAttr(option.value)}">${escapeHtml(option.label)}</option>
  `).join("");
  els.loadSavedDrawButton.disabled = options.length === 0;
}

function renderNames() {
  els.playerCountSelect.innerHTML = PLAYER_COUNTS.map((count) => `
    <option value="${count}" ${count === state.playerCount ? "selected" : ""}>${count} players</option>
  `).join("");

  els.nameInputs.innerHTML = state.players.map((player, index) => `
    <label>
      Player ${index + 1}
      <input type="text" value="${escapeAttr(player.name)}" data-player-index="${index}" placeholder="Enter name">
    </label>
  `).join("");
}

function renderTeams() {
  const validation = validateTeams();
  els.teamValidation.className = `status-strip ${validation.valid ? "ok" : "warn"}`;
  els.teamValidation.innerHTML = validation.valid
    ? `Team pool is valid: ${TEAMS_PER_BATCH} teams in each tier.`
    : `Team pool needs ${TEAMS_PER_BATCH} in each tier. Current: ${formatBatchCounts(validation.counts)}.`;

  els.teamTableBody.innerHTML = state.teams.map((team) => `
    <tr>
      <td class="flag-cell">${team.flag}</td>
      <td><input class="table-input" value="${escapeAttr(team.name)}" data-team-field="name" data-team-id="${team.id}"></td>
      <td>${team.group}</td>
      <td>${team.drawPosition}</td>
      <td>${team.pot}</td>
      <td>${team.ranking}</td>
      <td>
        <select data-team-field="batch" data-team-id="${team.id}">
          ${BATCHES.map((batch) => `<option value="${batch}" ${team.batch === batch ? "selected" : ""}>${batch}</option>`).join("")}
        </select>
      </td>
      <td>${team.odds || "Not synced"}</td>
    </tr>
  `).join("");
}

function renderExclusions() {
  const alloc = allocation();
  const imbalance = exclusionImbalance();
  const remaining = alloc.excludedTeamCount - state.excludedTeamIds.length;
  const skipped = alloc.excludedTeamCount === 0;
  const exact = remaining === 0;

  els.imbalanceConfirmWrap.hidden = !imbalance.unbalanced || skipped;
  els.exclusionStatus.className = `status-strip ${exact ? "ok" : "warn"}`;
  els.exclusionStatus.innerHTML = skipped
    ? `No exclusions are needed for ${state.playerCount} players.`
    : `${alloc.excludedTeamCount} teams must be excluded. ${Math.max(remaining, 0)} still required. Active tiers: ${formatBatchCounts(imbalance.counts)}.${imbalance.unbalanced ? " This active pool is noticeably unbalanced." : ""}`;

  els.exclusionGrid.innerHTML = state.teams
    .slice()
    .sort((a, b) => a.ranking - b.ranking)
    .map((team) => {
      const excluded = state.excludedTeamIds.includes(team.id);
      return `
        <button type="button" class="team-card ${excluded ? "excluded" : ""}" data-exclude-team="${team.id}" ${skipped ? "disabled" : ""}>
          <span class="flag">${team.flag}</span>
          <span class="team-name">${team.name}</span>
          <span class="meta">${team.batch} · Rank ${team.ranking} · ${team.odds || "odds pending"}</span>
          <strong>${excluded ? "Excluded" : "Active"}</strong>
        </button>
      `;
    }).join("");
}

function renderDraw() {
  const current = state.drawSchedule[state.currentPickIndex];
  const complete = state.drawSchedule.length > 0 && state.currentPickIndex >= state.drawSchedule.length;
  const canDraw = current && validateTeams().valid;

  els.drawHeadline.textContent = complete ? "Draw complete" : current ? `${playerById(current.playerId)?.name || "Player"} is up` : "Create a schedule first";
  els.drawButton.disabled = !canDraw || complete;
  els.repickButton.disabled = state.picks.length === 0;
  els.drawNow.innerHTML = current && !complete ? `
    <article class="now-card">
      <span>Pick ${state.currentPickIndex + 1} of ${state.drawSchedule.length}</span>
      <strong>${playerById(current.playerId)?.name || "Player"} draws from ${current.batch}</strong>
      <small>${availableTeamIds(current.batch).length} teams remain in this tier</small>
    </article>
  ` : `
    <article class="now-card">
      <span>${complete ? "All teams drawn" : "Waiting for setup"}</span>
      <strong>${complete ? "Final allocations are ready." : "Complete names, teams, and exclusions first."}</strong>
      <small>${state.drawSchedule.length || 0} scheduled picks</small>
    </article>
  `;

  els.playerGrid.innerHTML = state.players.map((player) => {
    const picks = picksForPlayer(player.id);
    const balance = BATCHES.map((batch) => `${batch}: ${picks.filter((pick) => pick.batch === batch).length}`).join(" · ");
    return `
      <article class="player-card">
        <div class="player-card-head">
          <h3>${escapeHtml(player.name || "Unnamed player")}</h3>
          <span>${picks.length} teams</span>
        </div>
        <p class="balance">${balance}</p>
        <div class="pick-list">
          ${picks.map((pick) => {
            const team = teamById(pick.teamId);
            return `<span class="pick-chip ${batchClass(pick.batch)}">${team?.flag || ""} ${team?.name || "Unknown"} <small>${pick.batch} · ${team?.odds || "odds n/a"}</small></span>`;
          }).join("") || "<em>No picks yet</em>"}
        </div>
      </article>
    `;
  }).join("");

  const excludedTeams = state.excludedTeamIds.map(teamById).filter(Boolean);
  els.excludedList.innerHTML = excludedTeams.length
    ? excludedTeams.map((team) => `<span>${team.flag} ${team.name} <small>${team.batch}</small></span>`).join("")
    : "<em>No teams excluded</em>";
}

function renderResults() {
  if (!liveData) {
    els.liveStatus.className = "status-strip";
    els.liveStatus.textContent = "Live data has not been synced yet.";
  } else {
    els.liveStatus.className = `status-strip ${liveData.providerAvailable ? "ok" : "warn"}`;
    els.liveStatus.innerHTML = liveData.messages?.length
      ? liveData.messages.map(escapeHtml).join("<br>")
      : `Live data synced at ${new Date(liveData.syncedAt).toLocaleString()}.`;
  }

  const owners = ownerByTeamId();
  const fixtures = liveData?.fixtures || [];
  const today = new Date();
  const buckets = [
    ["Yesterday", addDays(today, -1)],
    ["Today", today],
    ["Tomorrow", addDays(today, 1)]
  ];

  els.fixturesGrid.innerHTML = buckets.map(([label, date]) => {
    const items = fixtures.filter((match) => sameDay(new Date(match.utcDate), date));
    return `
      <article class="fixture-card">
        <h3>${label}</h3>
        <div class="match-list">
          ${items.length ? items.map((match) => renderFixture(match, owners)).join("") : "<p class=\"empty-note\">No synced fixtures.</p>"}
        </div>
      </article>
    `;
  }).join("");

  els.groupTables.innerHTML = BATCHES.length ? renderGroupTables(owners) : "";
}

function renderChallengeGame() {
  if (!els.challengeScore) return;
  els.challengeTime.textContent = Math.ceil(challengeGame.timeRemaining);
  els.challengeScore.textContent = challengeGame.score;
  els.challengeStage.textContent = STAGE_LABELS[challengeGame.currentStage];
  els.challengeDifficulty.textContent = challengeGame.difficultyLevel;
  els.challengeAttempts.textContent = challengeGame.attempts;
  els.challengeMessage.textContent = challengeGame.resultMessage;
  els.challengeStartButton.textContent = challengeGame.isRunning ? "Running" : "GO";
  els.challengeStartButton.disabled = challengeGame.isRunning;
  els.penaltyGoalFlash?.classList.toggle("show", challengeGame.flashTimer > 0);
  renderChallengeHighScores();
}

function renderChallengeHighScores() {
  if (!els.challengeHighScores) return;
  if (!challengeGame.highScores.length) {
    els.challengeHighScores.innerHTML = `<tr><td colspan="10">No 60-second scores yet.</td></tr>`;
    return;
  }

  els.challengeHighScores.innerHTML = challengeGame.highScores.map((score, index) => {
    const goalPercentage = score.attempts ? Math.round((score.goals / score.attempts) * 100) : 0;
    const date = score.createdAt ? new Date(score.createdAt).toLocaleDateString() : "-";
    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(score.playerName)}</td>
        <td>${score.score}</td>
        <td>${score.goals}</td>
        <td>${score.misses}</td>
        <td>${score.attempts}</td>
        <td>${goalPercentage}%</td>
        <td>${score.completedSequences}</td>
        <td>${score.finalDifficultyLevel}</td>
        <td>${date}</td>
      </tr>
    `;
  }).join("");
}

function fallbackStandings() {
  const groups = [...new Set(state.teams.map((team) => team.group))].sort();
  return groups.map((group) => ({
    group: `Group ${group}`,
    source: "draw",
    table: state.teams
      .filter((team) => team.group === group)
      .map((team) => ({
        teamId: team.id,
        teamName: `${team.flag} ${team.name}`,
        played: 0,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        status: team.status || "Active"
      }))
  }));
}

function renderGroupTables(owners = ownerByTeamId()) {
  const standings = liveData?.standings?.length ? liveData.standings : fallbackStandings();
  return standings.map((standing) => `
    <article class="group-table">
      <h3>${escapeHtml(standing.group || "Group")}</h3>
      <table class="standings-table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Owner</th>
            <th>P</th>
            <th>Pts</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
          </tr>
        </thead>
        <tbody>
          ${(standing.table || []).map((row) => {
            const teamId = row.teamId || teamIdFromName(row.teamName);
            const localTeam = teamById(teamId);
            const owner = owners.get(teamId) || "";
            return `
            <tr>
              <td class="standing-team">${localTeam?.flag || ""} ${escapeHtml(row.teamName || localTeam?.name || "TBC")}${row.status ? `<small>${escapeHtml(row.status)}</small>` : ""}</td>
              <td>${owner ? `<span class="owner-chip">${escapeHtml(owner)}</span>` : "<span class=\"owner-empty\">-</span>"}</td>
              <td>${row.played ?? 0}</td>
              <td><strong>${row.points ?? 0}</strong></td>
              <td>${row.goalsFor ?? 0}</td>
              <td>${row.goalsAgainst ?? 0}</td>
              <td>${row.goalDifference ?? 0}</td>
            </tr>
          `;
          }).join("")}
        </tbody>
      </table>
    </article>
  `).join("");
}

function fixtureTeamName(team) {
  return team?.shortName || team?.name || "TBC";
}

function fixtureTeamId(team) {
  return team?.id || teamIdFromName(fixtureTeamName(team));
}

function renderFixtureTeam(team, side, owners) {
  const name = fixtureTeamName(team);
  const localTeam = teamById(fixtureTeamId(team));
  return `
    <div class="match-team ${side}">
      <span>${side === "home" ? "Home" : "Away"}</span>
      <strong>${localTeam?.flag || ""} ${escapeHtml(name)}</strong>
      ${ownerChip(fixtureTeamId(team), owners)}
    </div>
  `;
}

function renderFixture(match, owners = ownerByTeamId()) {
  const detail = [match.group, match.venue].filter(Boolean).join(" · ");
  const fullTime = match.score?.fullTime || {};
  const hasScore = Number.isFinite(fullTime.home) && Number.isFinite(fullTime.away);
  const kickOff = match.utcDate
    ? new Date(match.utcDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : "TBC";
  const score = hasScore ? `${fullTime.home}-${fullTime.away}` : kickOff;
  const status = match.status ? String(match.status).replace(/_/g, " ") : "Scheduled";
  return `
    <div class="match-row">
      <div class="match-meta">
        <span>${escapeHtml(status)}</span>
        ${detail ? `<small>${escapeHtml(detail)}</small>` : ""}
      </div>
      <div class="match-teams">
        ${renderFixtureTeam(match.homeTeam, "home", owners)}
        <div class="score-pill">${escapeHtml(score)}</div>
        ${renderFixtureTeam(match.awayTeam, "away", owners)}
      </div>
    </div>
  `;
}

function renderAll() {
  renderDrawManager();
  renderSummary();
  renderNames();
  renderTeams();
  renderExclusions();
  renderDraw();
  renderResults();
  renderChallengeGame();
}

function syncPlayerInputs() {
  state.players = $$("#nameInputs input").map((input, index) => ({
    id: state.players[index]?.id || `p${index + 1}`,
    name: input.value.trim()
  }));
}

function namesComplete() {
  return state.players.length === state.playerCount && state.players.every((player) => player.name.trim());
}

function setPlayerCount(count) {
  state.playerCount = Number(count);
  state.players = Array.from({ length: state.playerCount }, (_, index) => ({
    id: state.players[index]?.id || `p${index + 1}`,
    name: state.players[index]?.name || ""
  }));
  state.excludedTeamIds = [];
  state.activeTeamIds = state.teams.map((team) => team.id);
  state.drawSchedule = [];
  state.picks = [];
  state.currentPickIndex = 0;
  state.phase = "names";
}

function toggleExclusion(teamId) {
  const alloc = allocation();
  if (alloc.excludedTeamCount === 0) return;

  const isExcluded = state.excludedTeamIds.includes(teamId);
  if (isExcluded) {
    state.excludedTeamIds = state.excludedTeamIds.filter((id) => id !== teamId);
  } else if (state.excludedTeamIds.length < alloc.excludedTeamCount) {
    state.excludedTeamIds = [...state.excludedTeamIds, teamId];
  }

  state.activeTeamIds = state.teams.map((team) => team.id).filter((id) => !state.excludedTeamIds.includes(id));
}

function canStartDraw() {
  const alloc = allocation();
  const imbalance = exclusionImbalance();
  return namesComplete()
    && validateTeams().valid
    && state.excludedTeamIds.length === alloc.excludedTeamCount
    && state.activeTeamIds.length === alloc.activeTeamCount
    && state.activeTeamIds.length % state.playerCount === 0
    && (!imbalance.unbalanced || els.imbalanceConfirm.checked);
}

function buildDrawSchedule() {
  const alloc = allocation();
  const activeCounts = countsByBatch();
  const quotas = buildPlayerBatchQuotas(activeCounts, state.playerCount, alloc.teamsPerPlayer);
  const used = state.players.map(() => Object.fromEntries(BATCHES.map((batch) => [batch, 0])));
  const schedule = [];

  for (let round = 0; round < alloc.teamsPerPlayer; round += 1) {
    state.players.forEach((player, playerIndex) => {
      const batch = BATCHES.find((candidate) => used[playerIndex][candidate] < quotas[playerIndex][candidate]);
      if (!batch) {
        throw new Error("Could not build a fair schedule for the current active pool.");
      }
      used[playerIndex][batch] += 1;
      schedule.push({
        pickNumber: schedule.length + 1,
        round: round + 1,
        playerId: player.id,
        playerIndex,
        batch
      });
    });
  }

  state.drawSchedule = schedule;
  state.picks = [];
  state.currentPickIndex = 0;
  state.phase = "draw";
}

function buildPlayerBatchQuotas(counts, playerCount, teamsPerPlayer) {
  const quotas = Array.from({ length: playerCount }, () => ({
    ...Object.fromEntries(BATCHES.map((batch) => [batch, 0])),
    total: 0
  }));
  const offsets = Object.fromEntries(
    BATCHES.map((batch, index) => [batch, Math.floor((playerCount * index) / BATCHES.length)])
  );

  BATCHES.forEach((batch) => {
    const order = Array.from({ length: playerCount }, (_, index) => (index + offsets[batch]) % playerCount);
    for (let i = 0; i < counts[batch]; i += 1) {
      const minBatchCount = Math.min(...quotas.filter((quota) => quota.total < teamsPerPlayer).map((quota) => quota[batch]));
      const playerIndex = order.find((index) => quotas[index].total < teamsPerPlayer && quotas[index][batch] === minBatchCount);
      if (playerIndex === undefined) {
        throw new Error(`Unable to allocate ${batch} teams evenly.`);
      }
      quotas[playerIndex][batch] += 1;
      quotas[playerIndex].total += 1;
      order.push(order.shift());
    }
  });

  if (!quotas.every((quota) => quota.total === teamsPerPlayer)) {
    throw new Error("The active tier totals could not be divided evenly across players.");
  }

  return quotas;
}

function availableTeamIds(batch) {
  const pickedIds = new Set(state.picks.map((pick) => pick.teamId));
  return state.activeTeamIds.filter((id) => {
    const team = teamById(id);
    return team?.batch === batch && !pickedIds.has(id);
  });
}

function drawTeam(repickOriginalId = null) {
  const current = state.drawSchedule[state.currentPickIndex];
  if (!current) return;

  let available = availableTeamIds(current.batch);
  if (repickOriginalId && available.length > 1) {
    available = available.filter((id) => id !== repickOriginalId);
  }
  if (!available.length) return;

  const teamId = available[Math.floor(Math.random() * available.length)];
  state.picks.push({
    id: crypto.randomUUID(),
    pickIndex: state.currentPickIndex,
    playerId: current.playerId,
    teamId,
    batch: current.batch,
    drawnAt: new Date().toISOString()
  });
  state.currentPickIndex += 1;
  if (state.currentPickIndex >= state.drawSchedule.length) {
    state.phase = "complete";
  }
  celebrate();
}

async function applyCompletedDraw(allocations, status = "Draw loaded") {
  state = buildCompletedStateFromAllocations(allocations);
  liveData = state.resultsCache;
  renderAll();
  await saveState(status);
  switchPanel("draw");
}

async function loadSelectedSavedDraw() {
  const selected = els.savedDrawSelect.value;
  if (!selected) return;
  const [source, id] = selected.split(":");
  if (source === "built-in") {
    const draw = BUILT_IN_DRAWS.find((item) => item.id === id);
    if (draw) await applyCompletedDraw(draw.allocations, "Recovered draw loaded");
    return;
  }

  const snapshot = savedDrawSnapshots().find((item) => item.id === id);
  if (!snapshot?.state) return;
  state = normalizeState(snapshot.state);
  liveData = state.resultsCache;
  renderAll();
  await saveState("Saved draw loaded");
  switchPanel("draw");
}

function saveCurrentSnapshot() {
  const name = window.prompt("Name this saved draw", `${getDrawId()} ${new Date().toLocaleDateString()}`);
  if (!name) return;
  const snapshots = savedDrawSnapshots();
  const next = {
    id: crypto.randomUUID(),
    name: name.trim(),
    state: {
      ...state,
      updatedAt: new Date().toISOString()
    },
    savedAt: new Date().toISOString()
  };
  writeSavedDrawSnapshots([next, ...snapshots].slice(0, 20));
  renderDrawManager();
  els.savedDrawSelect.value = `snapshot:${next.id}`;
  els.syncStatus.textContent = "Snapshot saved in this browser";
}

function createNewDrawLink() {
  const entered = window.prompt("New draw name or ID", `draw-${Math.random().toString(36).slice(2, 8)}`);
  if (!entered) return;
  const slug = entered.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `draw-${Date.now()}`;
  window.location.href = `/sweepstake/${encodeURIComponent(slug)}`;
}

async function loadCustomDraw() {
  try {
    const allocations = parseCustomDraw(els.customDrawText.value);
    await applyCompletedDraw(allocations, "Custom draw loaded");
  } catch (error) {
    els.syncStatus.textContent = error.message || "Could not load custom draw";
  }
}

function repickLast() {
  const last = state.picks.pop();
  if (!last) return;

  state.currentPickIndex = last.pickIndex;
  state.phase = "draw";
  drawTeam(last.teamId);
}

function celebrate() {
  const audio = new Audio(AUDIO_CLIPS[Math.floor(Math.random() * AUDIO_CLIPS.length)]);
  audio.volume = 0.45;
  audio.play().catch(() => {});

  els.goalOverlay.classList.remove("show");
  requestAnimationFrame(() => {
    els.goalOverlay.classList.add("show");
    window.setTimeout(() => els.goalOverlay.classList.remove("show"), 1450);
  });
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getCachedImage(src) {
  if (!src) return null;
  if (!imageCache.has(src)) {
    const image = new Image();
    image.src = src;
    imageCache.set(src, image);
  }
  const image = imageCache.get(src);
  return image.complete && image.naturalWidth > 0 ? image : null;
}

function randomiseStageImages() {
  challengeGame.selectedImages = {
    attacker: randomItem(PLAYER_IMAGES.attackers),
    goalkeeper: randomItem(PLAYER_IMAGES.goalkeepers),
    defender: randomItem(PLAYER_IMAGES.defenders),
    wallPlayers: [0, 1, 2].map(() => randomItem(PLAYER_IMAGES.wallPlayers))
  };
}

function getDifficultyMultiplier() {
  return Math.min(MAX_DIFFICULTY_MULTIPLIER, 1 + challengeGame.completedSequences * 0.15);
}

function challengeResetBall(x = CHALLENGE_FIELD.spotX, y = CHALLENGE_FIELD.spotY) {
  Object.assign(challengeGame.ball, {
    x,
    y,
    vx: 0,
    vy: 0,
    curve: 0,
    pathActive: false,
    pathT: 0,
    pathDuration: 0.72,
    startX: x,
    startY: y,
    controlX: x,
    controlY: y,
    moving: false,
    targetX: challengeGame.aimTarget.x,
    targetY: challengeGame.aimTarget.y
  });
  challengeGame.isShooting = false;
}

function resetStagePositions() {
  const field = CHALLENGE_FIELD;
  challengeGame.resultTimer = 0;
  challengeGame.isShooting = false;
  challengeGame.keeper.x = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.goalX - 28 : field.spotX;
  challengeGame.keeper.y = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.centerY : field.keeperY;
  challengeGame.keeper.direction = Math.random() > 0.5 ? 1 : -1;
  challengeGame.wall.x = field.spotX;
  challengeGame.wall.y = 242;
  challengeGame.wall.direction = Math.random() > 0.5 ? 1 : -1;
  challengeGame.aimTarget.x = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.goalX : field.spotX;
  challengeGame.aimTarget.y = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.centerY : 128;
  challengeGame.curl = 0;
  challengeGame.drag.active = false;
  challengeGame.attacker.x = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.startX : field.spotX;
  challengeGame.attacker.y = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.centerY : 340;
  challengeGame.defender.x = challengeGame.currentStage === "runningAttack" ? 330 : field.spotX + (Math.random() > 0.5 ? -82 : 82);
  challengeGame.defender.y = challengeGame.currentStage === "runningAttack" ? RUNNING_FIELD.centerY + (Math.random() > 0.5 ? -58 : 58) : 238;
  challengeResetBall(challengeGame.currentStage === "runningAttack" ? challengeGame.attacker.x + 30 : field.spotX, challengeGame.currentStage === "runningAttack" ? challengeGame.attacker.y : field.spotY);
  challengeGame.resultMessage = challengeGame.isRunning ? "Aim and shoot" : "Ready";
}

function resetChallengeScore() {
  challengeGame.score = 0;
  challengeGame.goals = 0;
  challengeGame.misses = 0;
  challengeGame.attempts = 0;
  challengeGame.sequenceIndex = 0;
  challengeGame.completedSequences = 0;
  challengeGame.difficultyLevel = 1;
  challengeGame.timeRemaining = GAME_DURATION_SECONDS;
  challengeGame.gameStartedAt = null;
  challengeGame.isRunning = false;
  challengeGame.isGameOver = false;
  challengeGame.scoreSaved = false;
  challengeGame.currentStage = "penalty";
  challengeGame.resultMessage = "Ready";
  els.challengeScoreForm.hidden = true;
  randomiseStageImages();
  resetStagePositions();
  renderChallengeGame();
}

function startChallenge() {
  resetChallengeScore();
  challengeGame.gameStartedAt = Date.now();
  challengeGame.isRunning = true;
  challengeGame.isGameOver = false;
  challengeGame.resultMessage = "Go!";
  randomiseStageImages();
  resetStagePositions();
  renderChallengeGame();
}

function endChallenge() {
  if (challengeGame.isGameOver) return;
  challengeGame.isRunning = false;
  challengeGame.isGameOver = true;
  challengeGame.isShooting = false;
  challengeGame.timeRemaining = 0;
  challengeGame.resultTimer = 0;
  challengeGame.ball.moving = false;
  challengeGame.resultMessage = `Full time: ${challengeGame.score}`;
  els.challengeScoreForm.hidden = challengeGame.scoreSaved || challengeGame.attempts === 0;
  renderChallengeGame();
}

function updateChallengeTimer() {
  if (!challengeGame.isRunning || challengeGame.isGameOver || !challengeGame.gameStartedAt) return;
  const elapsed = Math.floor((Date.now() - challengeGame.gameStartedAt) / 1000);
  challengeGame.timeRemaining = Math.max(0, GAME_DURATION_SECONDS - elapsed);
  if (challengeGame.timeRemaining <= 0) {
    endChallenge();
  }
}

function advanceChallengeStage() {
  if (!challengeGame.isRunning || challengeGame.isGameOver) return;
  const currentIndex = STAGES.indexOf(challengeGame.currentStage);
  const nextIndex = (currentIndex + 1) % STAGES.length;

  if (challengeGame.currentStage === "runningAttack" && STAGES[nextIndex] === "penalty") {
    challengeGame.completedSequences += 1;
    challengeGame.difficultyLevel += 1;
  }

  challengeGame.currentStage = STAGES[nextIndex];
  challengeGame.sequenceIndex += 1;
  randomiseStageImages();
  resetStagePositions();
  renderChallengeGame();
}

function challengePointerPosition(event) {
  const rect = els.penaltyCanvas.getBoundingClientRect();
  const point = event.touches?.[0] || event;
  return {
    x: ((point.clientX - rect.left) / rect.width) * CHALLENGE_FIELD.width,
    y: ((point.clientY - rect.top) / rect.height) * CHALLENGE_FIELD.height
  };
}

function setChallengePointer(event) {
  if (!els.penaltyCanvas || challengeGame.isShooting) return;
  const point = challengePointerPosition(event);
  if (challengeGame.drag.active) {
    updateChallengeDrag(point);
    return;
  }
  applyChallengeAim(point);
}

function applyChallengeAim(point) {
  const field = CHALLENGE_FIELD;
  if (challengeGame.currentStage === "runningAttack" && !challengeGame.ball.moving) {
    challengeGame.attacker.y = Math.max(RUNNING_FIELD.goalTop + 22, Math.min(RUNNING_FIELD.goalBottom - 22, point.y));
    challengeGame.aimTarget.x = RUNNING_FIELD.goalX;
    challengeGame.aimTarget.y = challengeGame.attacker.y;
    challengeGame.ball.x = challengeGame.attacker.x + 30;
    challengeGame.ball.y = challengeGame.attacker.y;
    return;
  }

  challengeGame.aimTarget.x = Math.max(field.goalLeft - 78, Math.min(field.goalRight + 78, point.x));
  challengeGame.aimTarget.y = Math.max(field.goalTop + 10, Math.min(field.goalBottom + 54, point.y));
}

function startChallengeDrag(event) {
  if (!challengeGame.isRunning || challengeGame.isGameOver || challengeGame.isShooting || challengeGame.resultTimer > 0) return;
  const point = challengePointerPosition(event);
  challengeGame.drag = {
    active: true,
    startX: point.x,
    startY: point.y,
    x: point.x,
    y: point.y
  };
  applyChallengeAim(point);
  renderChallengeGame();
}

function updateChallengeDrag(point) {
  challengeGame.drag.x = point.x;
  challengeGame.drag.y = point.y;
  applyChallengeAim(point);
  const dx = challengeGame.drag.x - challengeGame.drag.startX;
  const dy = challengeGame.drag.y - challengeGame.drag.startY;
  const diagonal = challengeGame.currentStage === "runningAttack" ? dy : dx;
  challengeGame.curl = Math.max(-1.4, Math.min(1.4, diagonal / 90));
  renderChallengeGame();
}

function releaseChallengeDrag(event) {
  if (!challengeGame.drag.active) return;
  const point = challengePointerPosition(event);
  updateChallengeDrag(point);
  challengeGame.drag.active = false;
  challengeShoot();
}

function cancelChallengeDrag() {
  challengeGame.drag.active = false;
  renderChallengeGame();
}

function challengeShoot() {
  if (!challengeGame.isRunning || challengeGame.isGameOver || challengeGame.isShooting || challengeGame.resultTimer > 0) return;

  if (challengeGame.currentStage === "runningAttack") {
    challengeGame.aimTarget.x = RUNNING_FIELD.goalX;
    challengeGame.aimTarget.y = Math.max(RUNNING_FIELD.goalTop + 16, Math.min(RUNNING_FIELD.goalBottom - 16, challengeGame.attacker.y));
    challengeResetBall(challengeGame.attacker.x + 30, challengeGame.attacker.y);
  }

  const ball = challengeGame.ball;
  const target = challengeGame.aimTarget;
  const dx = target.x - ball.x;
  const dy = target.y - ball.y;
  const distance = Math.hypot(dx, dy) || 1;
  const speed = challengeGame.currentStage === "freeKick" ? 610 : 580;

  ball.targetX = target.x;
  ball.targetY = target.y;
  ball.vx = (dx / distance) * speed;
  ball.vy = (dy / distance) * speed;
  ball.curve = challengeGame.currentStage === "freeKick" ? challengeGame.curl * 300 : 0;
  ball.startX = ball.x;
  ball.startY = ball.y;
  ball.pathT = 0;
  ball.pathDuration = Math.max(0.44, Math.min(0.9, distance / speed));
  ball.pathActive = challengeGame.currentStage === "freeKick";
  if (ball.pathActive) {
    const control = shotCurveControl(ball, target);
    ball.controlX = control.x;
    ball.controlY = control.y;
  }
  ball.moving = true;
  challengeGame.isShooting = true;
  challengeGame.resultMessage = "Shot";
  renderChallengeGame();
}

function playChallengeGoal() {
  const audio = new Audio(PENALTY_GOAL_AUDIO);
  audio.volume = 0.55;
  audio.play().catch(() => {});
  challengeGame.flashTimer = 1.3;
}

function finishChallengeAttempt(result) {
  if (!challengeGame.isRunning || challengeGame.isGameOver || challengeGame.resultTimer > 0) return;
  challengeGame.ball.moving = false;
  challengeGame.isShooting = false;
  challengeGame.attempts += 1;
  challengeGame.resultTimer = RESULT_DELAY_SECONDS;

  if (result === "goal") {
    challengeGame.score += 1;
    challengeGame.goals += 1;
    challengeGame.resultMessage = "GOAL!";
    playChallengeGoal();
  } else {
    challengeGame.misses += 1;
    challengeGame.resultMessage = result === "wall" ? "Wall" : result === "tackled" ? "Tackled" : result === "saved" ? "Saved" : "Wide";
  }

  renderChallengeGame();
}

function ballHitsRect(rect) {
  const ball = challengeGame.ball;
  return ball.x + ball.radius > rect.x
    && ball.x - ball.radius < rect.x + rect.width
    && ball.y + ball.radius > rect.y
    && ball.y - ball.radius < rect.y + rect.height;
}

function entityRect(entity) {
  return {
    x: entity.x - entity.width / 2,
    y: entity.y - entity.height / 2,
    width: entity.width,
    height: entity.height
  };
}

function keeperCollisionRect() {
  const keeper = challengeGame.keeper;
  if (challengeGame.currentStage === "runningAttack") {
    const reach = keeper.height * RUNNING_KEEPER_REACH_RATIO;
    return {
      x: keeper.x - 12,
      y: keeper.y - reach / 2,
      width: 24,
      height: reach
    };
  }
  return entityRect(keeper);
}

function keeperIntersectsBall() {
  return ballHitsRect(keeperCollisionRect());
}

function targetIsGoal() {
  const ball = challengeGame.ball;
  if (challengeGame.currentStage === "runningAttack") {
    return ball.x >= RUNNING_FIELD.goalX - 8
      && ball.y >= RUNNING_FIELD.goalTop + 8
      && ball.y <= RUNNING_FIELD.goalBottom - 8;
  }
  return ball.x >= CHALLENGE_FIELD.goalLeft + 8
    && ball.x <= CHALLENGE_FIELD.goalRight - 8
    && ball.y >= CHALLENGE_FIELD.goalTop - 8
    && ball.y <= CHALLENGE_FIELD.goalBottom + 10;
}

function wallRects() {
  const wall = challengeGame.wall;
  return [-44, 0, 44].map((offset) => ({
    x: wall.x + offset - 21,
    y: wall.y - 52,
    width: 42,
    height: 104
  }));
}

function updateKeeper(deltaSeconds) {
  const field = CHALLENGE_FIELD;
  const keeper = challengeGame.keeper;
  const ball = challengeGame.ball;
  const speed = challengeGame.baseGoalkeeperSpeed * getDifficultyMultiplier();

  if (challengeGame.currentStage === "runningAttack") {
    const reach = keeper.height * RUNNING_KEEPER_REACH_RATIO;
    const keeperMin = RUNNING_FIELD.goalTop + reach / 2;
    const keeperMax = RUNNING_FIELD.goalBottom - reach / 2;
    if (challengeGame.isShooting && ball.x > 470 && Math.abs(ball.y - keeper.y) < 72) {
      keeper.y += Math.sign(ball.y - keeper.y || 1) * speed * 2.1 * deltaSeconds;
    } else {
      keeper.y += keeper.direction * speed * deltaSeconds;
    }
    if (keeper.y <= keeperMin || keeper.y >= keeperMax) {
      keeper.direction *= -1;
      keeper.y = Math.max(keeperMin, Math.min(keeperMax, keeper.y));
    }
    return;
  }

  const keeperMin = field.goalLeft + keeper.width / 2;
  const keeperMax = field.goalRight - keeper.width / 2;
  if (challengeGame.isShooting && ball.y < 270 && Math.abs(ball.x - keeper.x) < 190) {
    keeper.x += Math.sign(ball.x - keeper.x || 1) * speed * 2.35 * deltaSeconds;
  } else {
    keeper.x += keeper.direction * speed * deltaSeconds;
  }

  if (keeper.x <= keeperMin || keeper.x >= keeperMax) {
    keeper.direction *= -1;
    keeper.x = Math.max(keeperMin, Math.min(keeperMax, keeper.x));
  }
}

function updateFreeKickWall(deltaSeconds) {
  const wall = challengeGame.wall;
  wall.x += wall.direction * challengeGame.baseWallSpeed * getDifficultyMultiplier() * deltaSeconds;
  if (wall.x < 310 || wall.x > 410) {
    wall.direction *= -1;
    wall.x = Math.max(310, Math.min(410, wall.x));
  }
}

function updateRunningAttack(deltaSeconds) {
  const attacker = challengeGame.attacker;
  const defender = challengeGame.defender;
  if (!challengeGame.isShooting) {
    attacker.x = Math.min(RUNNING_FIELD.goalX - 150, attacker.x + 72 * deltaSeconds);
    challengeGame.ball.x = attacker.x + 30;
    challengeGame.ball.y = attacker.y;
    challengeGame.aimTarget.x = RUNNING_FIELD.goalX;
    challengeGame.aimTarget.y = attacker.y;
  }

  const defenderSpeed = challengeGame.baseDefenderSpeed * getDifficultyMultiplier();
  defender.x += Math.sign(attacker.x - defender.x || 1) * defenderSpeed * 0.78 * deltaSeconds;
  defender.y += Math.sign(attacker.y - defender.y || 1) * defenderSpeed * 0.56 * deltaSeconds;
  defender.x = Math.max(210, Math.min(RUNNING_FIELD.goalX - 160, defender.x));
  defender.y = Math.max(RUNNING_FIELD.goalTop + 22, Math.min(RUNNING_FIELD.goalBottom - 22, defender.y));

  if (!challengeGame.isShooting && runningTackleConnects()) {
    finishChallengeAttempt("tackled");
  }
}

function runningTackleConnects() {
  const attacker = challengeGame.attacker;
  const defender = challengeGame.defender;
  const ball = challengeGame.ball;
  const defenderFoot = { x: defender.x + 10, y: defender.y + 28 };
  const attackerFoot = { x: attacker.x + 24, y: attacker.y + 26 };
  return Math.hypot(defenderFoot.x - attackerFoot.x, defenderFoot.y - attackerFoot.y) < 28
    || Math.hypot(defenderFoot.x - ball.x, defenderFoot.y - ball.y) < 24;
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width
    && a.x + a.width > b.x
    && a.y < b.y + b.height
    && a.y + a.height > b.y;
}

function shotCurveControl(start, target) {
  const curveStrength = challengeGame.currentStage === "freeKick" ? challengeGame.curl * 155 : 0;
  return {
    x: (start.x + target.x) / 2 + curveStrength,
    y: (start.y + target.y) / 2 - Math.abs(curveStrength) * 0.3
  };
}

function advanceCurvedBall(deltaSeconds) {
  const ball = challengeGame.ball;
  ball.pathT = Math.min(1, ball.pathT + deltaSeconds / ball.pathDuration);
  const t = ball.pathT;
  const inverse = 1 - t;
  ball.x = inverse * inverse * ball.startX
    + 2 * inverse * t * ball.controlX
    + t * t * ball.targetX;
  ball.y = inverse * inverse * ball.startY
    + 2 * inverse * t * ball.controlY
    + t * t * ball.targetY;
}

function updateChallengeBall(deltaSeconds) {
  const ball = challengeGame.ball;
  if (!ball.moving) return;

  if (ball.pathActive) {
    advanceCurvedBall(deltaSeconds);
  } else {
    ball.vx += ball.curve * deltaSeconds;
    ball.x += ball.vx * deltaSeconds;
    ball.y += ball.vy * deltaSeconds;
  }

  if (challengeGame.currentStage === "freeKick" && wallRects().some(ballHitsRect)) {
    finishChallengeAttempt("wall");
    return;
  }

  if (keeperIntersectsBall()) {
    finishChallengeAttempt("saved");
    return;
  }

  const reachedGoalLine = challengeGame.currentStage === "runningAttack"
    ? ball.x >= RUNNING_FIELD.goalX - 8
    : ball.y <= CHALLENGE_FIELD.goalTop + 8;

  if (reachedGoalLine || ball.pathT >= 1 || Math.hypot(ball.x - ball.targetX, ball.y - ball.targetY) < 14) {
    finishChallengeAttempt(targetIsGoal() ? "goal" : "wide");
    return;
  }

  if (ball.x < 0 || ball.x > CHALLENGE_FIELD.width || ball.y < 0 || ball.y > CHALLENGE_FIELD.height) {
    finishChallengeAttempt("wide");
  }
}

function challengeUpdate(deltaSeconds) {
  updateChallengeTimer();
  if (challengeGame.flashTimer > 0) {
    challengeGame.flashTimer = Math.max(0, challengeGame.flashTimer - deltaSeconds);
  }

  if (!challengeGame.isRunning || challengeGame.isGameOver) {
    renderChallengeGame();
    return;
  }

  updateKeeper(deltaSeconds);
  if (challengeGame.currentStage === "freeKick") updateFreeKickWall(deltaSeconds);
  if (challengeGame.currentStage === "runningAttack") updateRunningAttack(deltaSeconds);
  updateChallengeBall(deltaSeconds);

  if (challengeGame.resultTimer > 0) {
    challengeGame.resultTimer -= deltaSeconds;
    if (challengeGame.resultTimer <= 0) {
      advanceChallengeStage();
    }
  }

  renderChallengeGame();
}

function drawPitch(ctx) {
  if (challengeGame.currentStage === "runningAttack") {
    drawRunningPitch(ctx);
    return;
  }

  const { width, height, goalLeft, goalRight, goalTop, goalBottom } = CHALLENGE_FIELD;
  ctx.clearRect(0, 0, width, height);
  drawCrowd(ctx);
  ctx.fillStyle = "#0b7b4a";
  ctx.fillRect(0, 104, width, height - 104);
  ctx.fillStyle = "#13955d";
  for (let x = 0; x < width; x += 80) ctx.fillRect(x, 104, 40, height - 104);
  drawGoalNet(ctx);
  ctx.strokeStyle = "#fff7d1";
  ctx.lineWidth = 6;
  ctx.strokeRect(goalLeft, goalTop, goalRight - goalLeft, goalBottom - goalTop);
  ctx.beginPath();
  ctx.moveTo(goalLeft, goalBottom);
  ctx.lineTo(goalLeft - 62, goalBottom + 54);
  ctx.lineTo(goalRight + 62, goalBottom + 54);
  ctx.lineTo(goalRight, goalBottom);
  ctx.stroke();
  ctx.lineWidth = 4;
  ctx.strokeRect(96, goalBottom + 54, width - 192, 132);
  ctx.beginPath();
  ctx.arc(CHALLENGE_FIELD.spotX, CHALLENGE_FIELD.spotY, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#fff7d1";
  ctx.fill();
}

function drawCrowd(ctx) {
  const { width } = CHALLENGE_FIELD;
  const time = performance.now() / 260;
  ctx.fillStyle = "#13351f";
  ctx.fillRect(0, 0, width, 108);
  ctx.fillStyle = "#071910";
  ctx.fillRect(0, 72, width, 36);
  const colors = ["#ffd45a", "#be2432", "#fff7d1", "#1fa463", "#2f68ff"];
  for (let row = 0; row < 4; row += 1) {
    const y = 18 + row * 17;
    ctx.strokeStyle = row % 2 ? "rgba(255, 247, 209, 0.38)" : "rgba(255, 212, 90, 0.36)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, y + 8);
    ctx.lineTo(width, y + 8);
    ctx.stroke();
    for (let x = 12 + (row % 2) * 10; x < width; x += 24) {
      const bounce = Math.sin(time + x * 0.08 + row) * 3;
      ctx.fillStyle = colors[(x + row * 3) % colors.length];
      ctx.beginPath();
      ctx.arc(x, y + bounce, 4 + (row % 2), 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

function drawGoalNet(ctx) {
  const { goalLeft, goalRight, goalTop, goalBottom } = CHALLENGE_FIELD;
  ctx.save();
  ctx.strokeStyle = "rgba(255, 250, 240, 0.5)";
  ctx.lineWidth = 1.5;
  for (let x = goalLeft + 18; x < goalRight; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, goalTop);
    ctx.lineTo(x - 18, goalBottom);
    ctx.stroke();
  }
  for (let y = goalTop + 18; y < goalBottom; y += 22) {
    ctx.beginPath();
    ctx.moveTo(goalLeft, y);
    ctx.lineTo(goalRight, y);
    ctx.stroke();
  }
  ctx.restore();
}

function drawRunningPitch(ctx) {
  const { width, height } = CHALLENGE_FIELD;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0b7b4a";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#13955d";
  for (let y = 0; y < height; y += 70) ctx.fillRect(0, y, width, 34);

  ctx.strokeStyle = "#fff7d1";
  ctx.lineWidth = 5;
  ctx.strokeRect(24, 34, width - 48, height - 68);
  ctx.beginPath();
  ctx.moveTo(width / 2, 34);
  ctx.lineTo(width / 2, height - 34);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 58, 0, Math.PI * 2);
  ctx.stroke();

  ctx.lineWidth = 6;
  ctx.strokeRect(RUNNING_FIELD.goalX - 82, RUNNING_FIELD.goalTop, 82, RUNNING_FIELD.goalBottom - RUNNING_FIELD.goalTop);
  ctx.fillStyle = "rgba(255, 247, 209, 0.22)";
  ctx.fillRect(RUNNING_FIELD.goalX, RUNNING_FIELD.goalTop, 22, RUNNING_FIELD.goalBottom - RUNNING_FIELD.goalTop);
  ctx.strokeRect(RUNNING_FIELD.goalX, RUNNING_FIELD.goalTop, 22, RUNNING_FIELD.goalBottom - RUNNING_FIELD.goalTop);
  ctx.beginPath();
  ctx.arc(RUNNING_FIELD.goalX - 118, RUNNING_FIELD.centerY, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#fff7d1";
  ctx.fill();
}

function drawImageContained(ctx, image, x, y, width, height) {
  const ratio = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * ratio;
  const drawHeight = image.naturalHeight * ratio;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawStickPerson(ctx, entity, fill = "#161512", imageSrc = null) {
  const image = getCachedImage(imageSrc);
  if (image) {
    drawImageContained(ctx, image, entity.x - entity.width / 2, entity.y - entity.height / 2, entity.width, entity.height);
    return;
  }

  const x = entity.x;
  const y = entity.y;
  ctx.strokeStyle = "#161512";
  ctx.fillStyle = fill;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(x, y - entity.height / 2 + 13, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y - 18);
  ctx.lineTo(x, y + 14);
  ctx.moveTo(x - 28, y - 4);
  ctx.lineTo(x + 28, y - 4);
  ctx.moveTo(x, y + 14);
  ctx.lineTo(x - 18, y + entity.height / 2 - 5);
  ctx.moveTo(x, y + 14);
  ctx.lineTo(x + 18, y + entity.height / 2 - 5);
  ctx.stroke();
}

function drawKeeper(ctx) {
  const keeper = challengeGame.keeper;
  const image = getCachedImage(challengeGame.selectedImages.goalkeeper);
  if (challengeGame.currentStage === "runningAttack") {
    const reach = keeper.height * RUNNING_KEEPER_REACH_RATIO;
    ctx.fillStyle = "rgba(22, 21, 18, 0.9)";
    ctx.fillRect(keeper.x - 10, keeper.y - reach / 2, 20, reach);
    if (image) {
      drawImageContained(ctx, image, keeper.x - 45, keeper.y - 62, 90, 124);
      return;
    }
    drawStickPerson(ctx, { ...keeper, width: 44, height: 86 }, "#be2432");
    return;
  }

  ctx.fillStyle = "rgba(22, 21, 18, 0.9)";
  ctx.fillRect(keeper.x - keeper.width / 2, keeper.y + keeper.height / 2 - 14, keeper.width, 20);
  if (image) {
    drawImageContained(ctx, image, keeper.x - 48, keeper.y - keeper.height / 2, 96, keeper.height);
    return;
  }

  ctx.fillStyle = "#161512";
  ctx.fillRect(keeper.x - keeper.width / 2, keeper.y + 2, keeper.width, 32);
  ctx.fillStyle = "#f8e7af";
  ctx.fillRect(keeper.x - 12, keeper.y - 54, 24, 18);
  ctx.fillStyle = "#be2432";
  ctx.fillRect(keeper.x - keeper.width / 2 - 14, keeper.y + 9, 16, 18);
  ctx.fillRect(keeper.x + keeper.width / 2 - 2, keeper.y + 9, 16, 18);
}

function drawBall(ctx) {
  const ball = challengeGame.ball;
  ctx.fillStyle = "#fffaf0";
  ctx.strokeStyle = "#161512";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.strokeStyle = "#161512";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(ball.x - 6, ball.y);
  ctx.lineTo(ball.x + 6, ball.y);
  ctx.moveTo(ball.x, ball.y - 6);
  ctx.lineTo(ball.x, ball.y + 6);
  ctx.stroke();
}

function drawAim(ctx) {
  const target = challengeGame.aimTarget;
  drawShotPath(ctx);
  ctx.fillStyle = "#ffd45a";
  ctx.strokeStyle = "#161512";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(target.x, target.y, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  if (challengeGame.drag.active && challengeGame.currentStage === "freeKick") {
    ctx.fillStyle = "#fff7d1";
    ctx.font = "900 13px system-ui, sans-serif";
    ctx.fillText(`Swerve ${challengeGame.curl.toFixed(1)}`, Math.min(target.x + 18, CHALLENGE_FIELD.width - 98), Math.max(24, target.y - 18));
  }
}

function drawShotPath(ctx) {
  const ball = challengeGame.ball;
  const target = challengeGame.aimTarget;
  const control = shotCurveControl(ball, target);

  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = challengeGame.currentStage === "freeKick"
    ? "rgba(255, 212, 90, 0.9)"
    : "rgba(255, 247, 209, 0.78)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(ball.x, ball.y);
  ctx.quadraticCurveTo(control.x, control.y, target.x, target.y);
  ctx.stroke();
  ctx.setLineDash([]);

  if (challengeGame.drag.active) {
    ctx.strokeStyle = "rgba(22, 21, 18, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(challengeGame.drag.startX, challengeGame.drag.startY);
    ctx.lineTo(challengeGame.drag.x, challengeGame.drag.y);
    ctx.stroke();
  }
}

function drawWall(ctx) {
  wallRects().forEach((rect, index) => {
    drawStickPerson(ctx, {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
      width: 138,
      height: 286
    }, "#ffcf3f", challengeGame.selectedImages.wallPlayers[index]);
  });
}

function drawChallengeGame() {
  if (!els.penaltyCanvas) return;
  const ctx = els.penaltyCanvas.getContext("2d");
  drawPitch(ctx);

  ctx.fillStyle = "rgba(255, 247, 209, 0.88)";
  ctx.font = "900 18px system-ui, sans-serif";
  ctx.fillText(STAGE_LABELS[challengeGame.currentStage], 24, 36);

  if (challengeGame.currentStage === "freeKick") {
    drawWall(ctx);
    ctx.fillStyle = "#fff7d1";
    ctx.font = "800 14px system-ui, sans-serif";
    ctx.fillText(`Curl ${challengeGame.curl.toFixed(2)}`, 24, 64);
  }

  if (challengeGame.currentStage === "runningAttack") {
    drawStickPerson(ctx, challengeGame.attacker, "#f7c744", challengeGame.selectedImages.attacker);
    drawStickPerson(ctx, challengeGame.defender, "#1f5fbf", challengeGame.selectedImages.defender);
  } else {
    drawStickPerson(ctx, {
      x: CHALLENGE_FIELD.spotX,
      y: CHALLENGE_FIELD.spotY - 34,
      width: 176,
      height: 318
    }, "#f7c744", challengeGame.selectedImages.attacker);
  }

  drawKeeper(ctx);
  if (!challengeGame.isShooting && challengeGame.isRunning && challengeGame.currentStage !== "runningAttack") {
    drawAim(ctx);
  }
  if (challengeGame.currentStage === "runningAttack" && !challengeGame.isShooting && challengeGame.isRunning) {
    drawAim(ctx);
  }
  drawBall(ctx);

  if (!challengeGame.isRunning) {
    ctx.fillStyle = "rgba(11, 36, 25, 0.76)";
    ctx.fillRect(0, 0, CHALLENGE_FIELD.width, CHALLENGE_FIELD.height);
    ctx.fillStyle = "#fff7d1";
    ctx.textAlign = "center";
    ctx.font = "900 36px system-ui, sans-serif";
    ctx.fillText(challengeGame.isGameOver ? `Final score: ${challengeGame.score}` : "Press GO", CHALLENGE_FIELD.width / 2, 204);
    ctx.font = "800 18px system-ui, sans-serif";
    ctx.fillText("Penalty → Free Kick → Running Attack", CHALLENGE_FIELD.width / 2, 242);
    ctx.textAlign = "left";
  }
}

function challengeLoop(timestamp = 0) {
  const deltaSeconds = Math.min((timestamp - challengeGame.lastFrame) / 1000 || 0, 0.04);
  challengeGame.lastFrame = timestamp;
  challengeUpdate(deltaSeconds);
  drawChallengeGame();
  window.requestAnimationFrame(challengeLoop);
}

async function loadChallengeHighScores() {
  try {
    const response = await fetch(`/api/high-scores?drawId=${encodeURIComponent(getDrawId())}`);
    const payload = await response.json();
    challengeGame.highScores = Array.isArray(payload.scores) ? payload.scores : [];
  } catch {
    challengeGame.highScores = [];
  }
  renderChallengeGame();
}

async function saveChallengeHighScore(event) {
  event.preventDefault();
  const playerName = els.challengePlayerName.value.trim();
  if (!playerName) {
    challengeGame.resultMessage = "Add a name";
    renderChallengeGame();
    return;
  }

  const payload = {
    playerName,
    score: challengeGame.score,
    goals: challengeGame.goals,
    misses: challengeGame.misses,
    attempts: challengeGame.attempts,
    completedSequences: challengeGame.completedSequences,
    finalDifficultyLevel: challengeGame.difficultyLevel,
    durationSeconds: GAME_DURATION_SECONDS,
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch(`/api/high-scores?drawId=${encodeURIComponent(getDrawId())}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!result.ok) throw new Error(result.error || "Score save failed");
    challengeGame.highScores = result.scores || [];
    challengeGame.scoreSaved = true;
    els.challengeScoreForm.hidden = true;
    challengeGame.resultMessage = "Score saved";
  } catch {
    challengeGame.resultMessage = "Score saved locally only";
  }

  renderChallengeGame();
}

async function syncLiveData() {
  els.liveStatus.className = "status-strip";
  els.liveStatus.textContent = "Syncing live data...";
  try {
    const response = await fetch("/api/live-data");
    liveData = await response.json();
    state.resultsCache = liveData;
    await saveState("Live data synced");
  } catch {
    liveData = {
      providerAvailable: false,
      messages: ["Live data API is unavailable."],
      fixtures: [],
      standings: [],
      odds: [],
      syncedAt: new Date().toISOString()
    };
  }
  renderAll();
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function sameDay(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate();
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}

function bindEvents() {
  $$(".tab-button").forEach((button) => {
    button.addEventListener("click", () => switchPanel(button.dataset.step));
  });

  els.loadSavedDrawButton?.addEventListener("click", loadSelectedSavedDraw);
  els.saveSnapshotButton?.addEventListener("click", saveCurrentSnapshot);
  els.newDrawButton?.addEventListener("click", createNewDrawLink);
  els.loadCustomDrawButton?.addEventListener("click", loadCustomDraw);

  if (els.penaltyCanvas) {
    els.penaltyCanvas.addEventListener("pointermove", setChallengePointer);
    els.penaltyCanvas.addEventListener("pointerdown", (event) => {
      event.preventDefault();
      els.penaltyCanvas.setPointerCapture?.(event.pointerId);
      startChallengeDrag(event);
    });
    els.penaltyCanvas.addEventListener("pointerup", (event) => {
      event.preventDefault();
      releaseChallengeDrag(event);
    });
    els.penaltyCanvas.addEventListener("pointercancel", cancelChallengeDrag);
    els.penaltyCanvas.addEventListener("pointerleave", (event) => {
      if (challengeGame.drag.active) releaseChallengeDrag(event);
    });
    els.penaltyCanvas.addEventListener("touchmove", (event) => {
      event.preventDefault();
      setChallengePointer(event);
    }, { passive: false });
  }

  els.challengeStartButton?.addEventListener("click", startChallenge);
  els.challengeResetButton?.addEventListener("click", resetChallengeScore);
  els.challengeScoreForm?.addEventListener("submit", saveChallengeHighScore);
  window.addEventListener("keydown", (event) => {
    if (!$("[data-panel='penalties']")?.classList.contains("active")) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      challengeShoot();
    }
  });
  const penaltyGoalImage = els.penaltyGoalFlash?.querySelector("img");
  if (penaltyGoalImage) {
    const markMissingPenaltyGif = () => els.penaltyGoalFlash.classList.add("asset-missing");
    penaltyGoalImage.addEventListener("error", markMissingPenaltyGif);
    if (penaltyGoalImage.complete && penaltyGoalImage.naturalWidth === 0) {
      markMissingPenaltyGif();
    }
  }

  els.playerCountSelect.addEventListener("change", async (event) => {
    setPlayerCount(event.target.value);
    renderAll();
    await saveState("Player count saved");
  });

  els.nameInputs.addEventListener("input", () => {
    syncPlayerInputs();
    renderSummary();
  });

  els.saveNamesButton.addEventListener("click", async () => {
    syncPlayerInputs();
    state.phase = namesComplete() ? "teams" : "names";
    renderAll();
    await saveState("Names saved");
  });

  els.goTeamsButton.addEventListener("click", async () => {
    syncPlayerInputs();
    if (!namesComplete()) {
      els.syncStatus.textContent = "Enter every player name first";
      return;
    }
    state.phase = "teams";
    await saveState("Names saved");
    renderAll();
    switchPanel("teams");
  });

  els.teamTableBody.addEventListener("input", async (event) => {
    const teamId = event.target.dataset.teamId;
    const field = event.target.dataset.teamField;
    if (!teamId || !field) return;
    const team = teamById(teamId);
    team[field] = event.target.value;
    state.drawSchedule = [];
    state.picks = [];
    state.currentPickIndex = 0;
    state.activeTeamIds = state.teams.map((item) => item.id).filter((id) => !state.excludedTeamIds.includes(id));
    renderAll();
    await saveState("Team pool saved");
  });

  els.restoreTeamsButton.addEventListener("click", async () => {
    state.teams = structuredClone(DEFAULT_TEAMS);
    state.excludedTeamIds = [];
    state.activeTeamIds = state.teams.map((team) => team.id);
    state.drawSchedule = [];
    state.picks = [];
    state.currentPickIndex = 0;
    renderAll();
    await saveState("Default teams restored");
  });

  els.goExclusionsButton.addEventListener("click", async () => {
    if (!validateTeams().valid) {
      els.syncStatus.textContent = "Fix team tier balance first";
      return;
    }
    const next = allocation().excludedTeamCount === 0 ? "draw" : "exclusions";
    state.phase = next;
    if (next === "draw" && state.drawSchedule.length === 0) {
      buildDrawSchedule();
    }
    renderAll();
    await saveState("Setup saved");
    switchPanel(next);
  });

  els.exclusionGrid.addEventListener("click", async (event) => {
    const button = event.target.closest("[data-exclude-team]");
    if (!button) return;
    toggleExclusion(button.dataset.excludeTeam);
    state.drawSchedule = [];
    state.picks = [];
    state.currentPickIndex = 0;
    renderAll();
    await saveState("Exclusions saved");
  });

  els.clearExclusionsButton.addEventListener("click", async () => {
    state.excludedTeamIds = [];
    state.activeTeamIds = state.teams.map((team) => team.id);
    state.drawSchedule = [];
    state.picks = [];
    state.currentPickIndex = 0;
    els.imbalanceConfirm.checked = false;
    renderAll();
    await saveState("Exclusions cleared");
  });

  els.startDrawButton.addEventListener("click", async () => {
    if (!canStartDraw()) {
      els.syncStatus.textContent = "Complete valid setup before starting";
      return;
    }
    try {
      buildDrawSchedule();
      renderAll();
      await saveState("Draw schedule created");
      switchPanel("draw");
    } catch (error) {
      els.syncStatus.textContent = error.message;
    }
  });

  els.drawButton.addEventListener("click", async () => {
    drawTeam();
    renderAll();
    await saveState("Pick saved");
  });

  els.repickButton.addEventListener("click", async () => {
    repickLast();
    renderAll();
    await saveState("Repick saved");
  });

  els.refreshLiveButton.addEventListener("click", syncLiveData);

  els.resetButton.addEventListener("click", async () => {
    if (!window.confirm("Reset the shared draw for everyone using this link?")) return;
    state = createDefaultState();
    localStorage.removeItem(storageKey());
    await fetch(`/api/state?drawId=${encodeURIComponent(getDrawId())}`, { method: "DELETE" }).catch(() => {});
    renderAll();
    await saveState("Shared draw reset");
    switchPanel("names");
  });
}

async function init() {
  await loadState();
  liveData = state.resultsCache;
  if (els.customDrawText && !els.customDrawText.value.trim()) {
    els.customDrawText.value = allocationsToText(RECOVERED_DRAW_ALLOCATIONS);
  }
  randomiseStageImages();
  resetStagePositions();
  renderAll();
  bindEvents();
  challengeLoop();
  loadChallengeHighScores();
}

init();
