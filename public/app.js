const BATCHES = ["Crap", "Not Great", "Hopeful", "Best"];
const PLAYER_COUNTS = [8, 9, 10, 11, 12];
const TOTAL_TEAMS = 48;
const TEAMS_PER_BATCH = TOTAL_TEAMS / BATCHES.length;
const SCHEMA_VERSION = 4;
const STORAGE_KEY = "world-cup-2026-sweepstake-state";
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
const PENALTY_FIELD = {
  width: 720,
  height: 420,
  goalLeft: 150,
  goalRight: 570,
  goalTop: 58,
  goalBottom: 214,
  keeperY: 128,
  spotX: 360,
  spotY: 360
};

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

let state = null;
let liveData = null;
const penaltyGame = {
  score: 0,
  shots: 0,
  message: "Aim",
  resultTimer: 0,
  flashTimer: 0,
  lastFrame: 0,
  aim: {
    x: PENALTY_FIELD.spotX,
    y: 128
  },
  keeper: {
    x: PENALTY_FIELD.spotX,
    y: PENALTY_FIELD.keeperY,
    width: 92,
    height: 34,
    direction: 1,
    speed: 138
  },
  ball: {
    x: PENALTY_FIELD.spotX,
    y: PENALTY_FIELD.spotY,
    radius: 10,
    vx: 0,
    vy: 0,
    moving: false,
    targetX: PENALTY_FIELD.spotX,
    targetY: 128
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const els = {
  syncStatus: $("#syncStatus"),
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
  playerGrid: $("#playerGrid"),
  excludedList: $("#excludedList"),
  refreshLiveButton: $("#refreshLiveButton"),
  liveStatus: $("#liveStatus"),
  fixturesGrid: $("#fixturesGrid"),
  groupTables: $("#groupTables"),
  goalOverlay: $("#goalOverlay"),
  penaltyCanvas: $("#penaltyCanvas"),
  penaltyScore: $("#penaltyScore"),
  penaltyShots: $("#penaltyShots"),
  penaltyMessage: $("#penaltyMessage"),
  penaltyResetButton: $("#penaltyResetButton"),
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
      state = normalizeState(payload.state);
      els.syncStatus.textContent = "Shared state loaded";
      return;
    }
  } catch {
    els.syncStatus.textContent = "Remote state unavailable";
  }

  const local = localStorage.getItem(storageKey());
  state = normalizeState(local ? JSON.parse(local) : createDefaultState());
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
        ${items.length ? items.map(renderFixture).join("") : "<p>No synced fixtures.</p>"}
      </article>
    `;
  }).join("");

  els.groupTables.innerHTML = BATCHES.length ? renderGroupTables() : "";
}

function renderPenaltyGame() {
  if (!els.penaltyScore) return;
  els.penaltyScore.textContent = penaltyGame.score;
  els.penaltyShots.textContent = penaltyGame.shots;
  els.penaltyMessage.textContent = penaltyGame.message;
  els.penaltyGoalFlash?.classList.toggle("show", penaltyGame.flashTimer > 0);
}

function renderGroupTables() {
  const groups = [...new Set(state.teams.map((team) => team.group))].sort();
  return groups.map((group) => `
    <article class="group-table">
      <h3>Group ${group}</h3>
      <table>
        <tbody>
          ${state.teams.filter((team) => team.group === group).map((team) => `
            <tr>
              <td>${team.flag} ${team.name}</td>
              <td>${team.batch}</td>
              <td>${team.status || "Active"}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </article>
  `).join("");
}

function renderFixture(match) {
  const home = match.homeTeam?.shortName || match.homeTeam?.name || "TBC";
  const away = match.awayTeam?.shortName || match.awayTeam?.name || "TBC";
  const detail = [match.group, match.venue].filter(Boolean).join(" · ");
  const score = match.score?.fullTime
    ? `${match.score.fullTime.home ?? "-"}-${match.score.fullTime.away ?? "-"}`
    : new Date(match.utcDate).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return `<p><strong>${home}</strong> ${score} <strong>${away}</strong>${detail ? `<small>${escapeHtml(detail)}</small>` : ""}</p>`;
}

function renderAll() {
  renderSummary();
  renderNames();
  renderTeams();
  renderExclusions();
  renderDraw();
  renderResults();
  renderPenaltyGame();
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

function penaltyResetBall() {
  penaltyGame.ball.x = PENALTY_FIELD.spotX;
  penaltyGame.ball.y = PENALTY_FIELD.spotY;
  penaltyGame.ball.vx = 0;
  penaltyGame.ball.vy = 0;
  penaltyGame.ball.moving = false;
  penaltyGame.message = "Aim";
}

function penaltyResetScore() {
  penaltyGame.score = 0;
  penaltyGame.shots = 0;
  penaltyGame.resultTimer = 0;
  penaltyGame.flashTimer = 0;
  penaltyResetBall();
  renderPenaltyGame();
}

function penaltyPointerPosition(event) {
  const rect = els.penaltyCanvas.getBoundingClientRect();
  const point = event.touches?.[0] || event;
  const x = ((point.clientX - rect.left) / rect.width) * PENALTY_FIELD.width;
  const y = ((point.clientY - rect.top) / rect.height) * PENALTY_FIELD.height;
  return {
    x: Math.max(PENALTY_FIELD.goalLeft - 68, Math.min(PENALTY_FIELD.goalRight + 68, x)),
    y: Math.max(PENALTY_FIELD.goalTop + 12, Math.min(PENALTY_FIELD.goalBottom + 46, y))
  };
}

function penaltySetAim(event) {
  const point = penaltyPointerPosition(event);
  penaltyGame.aim.x = point.x;
  penaltyGame.aim.y = point.y;
}

function penaltyKick(event) {
  event.preventDefault();
  if (penaltyGame.ball.moving || penaltyGame.resultTimer > 0) return;
  penaltySetAim(event);

  const dx = penaltyGame.aim.x - penaltyGame.ball.x;
  const dy = penaltyGame.aim.y - penaltyGame.ball.y;
  const distance = Math.hypot(dx, dy) || 1;
  const speed = 560;

  penaltyGame.ball.targetX = penaltyGame.aim.x;
  penaltyGame.ball.targetY = penaltyGame.aim.y;
  penaltyGame.ball.vx = (dx / distance) * speed;
  penaltyGame.ball.vy = (dy / distance) * speed;
  penaltyGame.ball.moving = true;
  penaltyGame.message = "Shot";
  renderPenaltyGame();
}

function penaltyPlayGoal() {
  const audio = new Audio(PENALTY_GOAL_AUDIO);
  audio.volume = 0.55;
  audio.play().catch(() => {});
  penaltyGame.flashTimer = 1.35;
}

function penaltyFinish(result) {
  penaltyGame.ball.moving = false;
  penaltyGame.shots += 1;
  penaltyGame.resultTimer = 0.85;

  if (result === "goal") {
    penaltyGame.score += 1;
    penaltyGame.message = "GOAL!";
    penaltyPlayGoal();
  } else if (result === "saved") {
    penaltyGame.message = "Saved";
  } else {
    penaltyGame.message = "Wide";
  }

  renderPenaltyGame();
}

function penaltyGoalResult() {
  const targetInsideGoal = penaltyGame.ball.targetX >= PENALTY_FIELD.goalLeft
    && penaltyGame.ball.targetX <= PENALTY_FIELD.goalRight
    && penaltyGame.ball.targetY >= PENALTY_FIELD.goalTop
    && penaltyGame.ball.targetY <= PENALTY_FIELD.goalBottom;
  return targetInsideGoal ? "goal" : "wide";
}

function penaltyKeeperIntersectsBall() {
  const keeper = penaltyGame.keeper;
  const ball = penaltyGame.ball;
  return ball.x + ball.radius > keeper.x - keeper.width / 2
    && ball.x - ball.radius < keeper.x + keeper.width / 2
    && ball.y + ball.radius > keeper.y - keeper.height / 2
    && ball.y - ball.radius < keeper.y + keeper.height / 2;
}

function penaltyUpdate(deltaSeconds) {
  const keeper = penaltyGame.keeper;
  const ball = penaltyGame.ball;
  const keeperMin = PENALTY_FIELD.goalLeft + keeper.width / 2;
  const keeperMax = PENALTY_FIELD.goalRight - keeper.width / 2;

  if (ball.moving && ball.y < 280 && Math.abs(ball.x - keeper.x) < 180) {
    keeper.x += Math.sign(ball.x - keeper.x || 1) * 320 * deltaSeconds;
  } else {
    keeper.x += keeper.direction * keeper.speed * deltaSeconds;
  }

  if (keeper.x <= keeperMin || keeper.x >= keeperMax) {
    keeper.direction *= -1;
    keeper.x = Math.max(keeperMin, Math.min(keeperMax, keeper.x));
  }

  if (ball.moving) {
    ball.x += ball.vx * deltaSeconds;
    ball.y += ball.vy * deltaSeconds;

    if (penaltyKeeperIntersectsBall()) {
      penaltyFinish("saved");
      return;
    }

    if (Math.hypot(ball.x - ball.targetX, ball.y - ball.targetY) < 14 || ball.y <= PENALTY_FIELD.goalTop) {
      penaltyFinish(penaltyGoalResult());
      return;
    }
  }

  if (penaltyGame.resultTimer > 0) {
    penaltyGame.resultTimer -= deltaSeconds;
    if (penaltyGame.resultTimer <= 0) {
      penaltyResetBall();
      renderPenaltyGame();
    }
  }

  if (penaltyGame.flashTimer > 0) {
    penaltyGame.flashTimer -= deltaSeconds;
    if (penaltyGame.flashTimer <= 0) {
      penaltyGame.flashTimer = 0;
      renderPenaltyGame();
    }
  }
}

function penaltyDraw() {
  if (!els.penaltyCanvas) return;
  const ctx = els.penaltyCanvas.getContext("2d");
  const { width, height, goalLeft, goalRight, goalTop, goalBottom, spotX, spotY } = PENALTY_FIELD;
  const keeper = penaltyGame.keeper;
  const ball = penaltyGame.ball;
  const aim = penaltyGame.aim;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#0b7b4a";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "#13955d";
  for (let x = 0; x < width; x += 80) {
    ctx.fillRect(x, 0, 40, height);
  }

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
  ctx.arc(spotX, spotY, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#fff7d1";
  ctx.fill();

  ctx.setLineDash([10, 8]);
  ctx.strokeStyle = "rgba(255, 247, 209, 0.78)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(spotX, spotY);
  ctx.lineTo(aim.x, aim.y);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = "#ffd45a";
  ctx.strokeStyle = "#161512";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(aim.x, aim.y, 13, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#161512";
  ctx.fillRect(keeper.x - keeper.width / 2, keeper.y - keeper.height / 2, keeper.width, keeper.height);
  ctx.fillStyle = "#f8e7af";
  ctx.fillRect(keeper.x - 12, keeper.y - 32, 24, 18);
  ctx.fillStyle = "#be2432";
  ctx.fillRect(keeper.x - keeper.width / 2 - 16, keeper.y - 9, 16, 18);
  ctx.fillRect(keeper.x + keeper.width / 2, keeper.y - 9, 16, 18);

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

function penaltyLoop(timestamp = 0) {
  const deltaSeconds = Math.min((timestamp - penaltyGame.lastFrame) / 1000 || 0, 0.04);
  penaltyGame.lastFrame = timestamp;
  penaltyUpdate(deltaSeconds);
  penaltyDraw();
  window.requestAnimationFrame(penaltyLoop);
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

  if (els.penaltyCanvas) {
    els.penaltyCanvas.addEventListener("pointermove", penaltySetAim);
    els.penaltyCanvas.addEventListener("pointerdown", penaltyKick);
    els.penaltyCanvas.addEventListener("touchmove", (event) => {
      event.preventDefault();
      penaltySetAim(event);
    }, { passive: false });
  }

  els.penaltyResetButton?.addEventListener("click", penaltyResetScore);
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
  renderAll();
  bindEvents();
  penaltyLoop();
}

init();
