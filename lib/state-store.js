import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, "..", ".data", "state.json");
const memoryStore = globalThis.__worldCupSweepstakeStore || new Map();
globalThis.__worldCupSweepstakeStore = memoryStore;

const stateKey = (drawId) => `world-cup-2026-sweepstake:${drawId || "default"}`;

function hasUpstash() {
  return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

async function upstashCommand(command) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL, {
    method: "POST",
    headers: {
      authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
      "content-type": "application/json"
    },
    body: JSON.stringify(command)
  });

  if (!response.ok) {
    throw new Error(`Upstash request failed with ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error);
  }
  return payload.result;
}

async function readLocalStore() {
  try {
    return JSON.parse(await readFile(dataPath, "utf8"));
  } catch {
    return {};
  }
}

async function writeLocalStore(store) {
  await mkdir(dirname(dataPath), { recursive: true });
  await writeFile(dataPath, JSON.stringify(store, null, 2));
}

export async function getState(drawId) {
  const key = stateKey(drawId);

  if (hasUpstash()) {
    const value = await upstashCommand(["GET", key]);
    return value ? JSON.parse(value) : null;
  }

  if (process.env.VERCEL) {
    return memoryStore.get(key) || null;
  }

  const store = await readLocalStore();
  return store[key] || null;
}

export async function setState(drawId, state) {
  const key = stateKey(drawId);
  const nextState = {
    ...state,
    drawId: drawId || "default",
    updatedAt: new Date().toISOString()
  };

  if (hasUpstash()) {
    await upstashCommand(["SET", key, JSON.stringify(nextState)]);
    return nextState;
  }

  if (process.env.VERCEL) {
    memoryStore.set(key, nextState);
    return nextState;
  }

  const store = await readLocalStore();
  store[key] = nextState;
  await writeLocalStore(store);
  return nextState;
}

export async function clearState(drawId) {
  const key = stateKey(drawId);

  if (hasUpstash()) {
    await upstashCommand(["DEL", key]);
    return;
  }

  if (process.env.VERCEL) {
    memoryStore.delete(key);
    return;
  }

  const store = await readLocalStore();
  delete store[key];
  const hasEntries = Object.keys(store).length > 0;
  if (hasEntries) {
    await writeLocalStore(store);
  } else {
    await rm(dataPath, { force: true });
  }
}
