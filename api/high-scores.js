import { getState, setState } from "../lib/state-store.js";
import { getQuery, readJsonBody, sendJson } from "../lib/http.js";

const MAX_SCORES = 10;

function highScoreKey(drawId) {
  return `high-scores:${drawId || "default"}`;
}

function goalPercentage(score) {
  return score.attempts > 0 ? score.goals / score.attempts : 0;
}

function normaliseScore(input) {
  const playerName = String(input.playerName || "").trim().slice(0, 32);
  const score = Number(input.score || 0);
  const goals = Number(input.goals || 0);
  const misses = Number(input.misses || 0);
  const attempts = Number(input.attempts || 0);
  const completedSequences = Number(input.completedSequences || 0);
  const finalDifficultyLevel = Number(input.finalDifficultyLevel || 1);
  const durationSeconds = Number(input.durationSeconds || 60);

  if (!playerName) {
    throw new Error("Player name is required.");
  }

  return {
    id: crypto.randomUUID(),
    playerName,
    score: Math.max(0, score),
    goals: Math.max(0, goals),
    misses: Math.max(0, misses),
    attempts: Math.max(0, attempts),
    completedSequences: Math.max(0, completedSequences),
    finalDifficultyLevel: Math.max(1, finalDifficultyLevel),
    durationSeconds: Math.max(1, durationSeconds),
    createdAt: new Date().toISOString()
  };
}

function sortScores(scores) {
  return scores.slice().sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const bPct = goalPercentage(b);
    const aPct = goalPercentage(a);
    if (bPct !== aPct) return bPct - aPct;
    if (a.misses !== b.misses) return a.misses - b.misses;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export default async function handler(req, res) {
  res.setHeader("access-control-allow-methods", "GET,POST,OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const query = getQuery(req);
  const drawId = query.get("drawId") || "default";

  try {
    const existing = await getState(highScoreKey(drawId));
    const currentScores = Array.isArray(existing?.scores) ? existing.scores : [];

    if (req.method === "GET") {
      sendJson(res, 200, { ok: true, scores: sortScores(currentScores).slice(0, MAX_SCORES) });
      return;
    }

    if (req.method === "POST") {
      const body = await readJsonBody(req);
      const score = normaliseScore(body);
      const scores = sortScores([...currentScores, score]).slice(0, MAX_SCORES);
      await setState(highScoreKey(drawId), { scores });
      sendJson(res, 200, { ok: true, scores });
      return;
    }

    sendJson(res, 405, { ok: false, error: "Method not allowed." });
  } catch (error) {
    sendJson(res, 400, { ok: false, error: error.message || "High score API failed." });
  }
}
