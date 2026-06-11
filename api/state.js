import { clearState, getState, setState } from "../lib/state-store.js";
import { getQuery, readJsonBody, sendJson } from "../lib/http.js";

export default async function handler(req, res) {
  res.setHeader("access-control-allow-methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("access-control-allow-headers", "content-type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const query = getQuery(req);
  const drawId = query.get("drawId") || "default";

  try {
    if (req.method === "GET") {
      sendJson(res, 200, { ok: true, state: await getState(drawId) });
      return;
    }

    if (req.method === "POST" || req.method === "PUT") {
      const body = await readJsonBody(req);
      if (!body.state || typeof body.state !== "object") {
        sendJson(res, 400, { ok: false, error: "Expected a JSON body with a state object." });
        return;
      }

      const savedState = await setState(drawId, body.state);
      sendJson(res, 200, { ok: true, state: savedState });
      return;
    }

    if (req.method === "DELETE") {
      await clearState(drawId);
      sendJson(res, 200, { ok: true });
      return;
    }

    sendJson(res, 405, { ok: false, error: "Method not allowed." });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error.message || "State API failed." });
  }
}
