import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));
const publicDir = join(root, "public");
const port = Number(process.env.PORT || 8000);

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".gif": "image/gif",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg"
};

function decorateResponse(res) {
  res.status = (statusCode) => {
    res.statusCode = statusCode;
    return res;
  };
  res.json = (payload) => {
    res.setHeader("content-type", "application/json; charset=utf-8");
    res.end(JSON.stringify(payload));
  };
}

async function handleApi(req, res, pathname) {
  const modulePath = join(root, `${pathname}.js`);
  const mod = await import(`${pathToFileURL(modulePath).href}?t=${Date.now()}`);
  decorateResponse(res);
  await mod.default(req, res);
}

async function serveStatic(req, res, pathname) {
  const routePath = pathname === "/" || pathname.startsWith("/sweepstake/") ? "/index.html" : pathname;
  const safePath = normalize(routePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = join(publicDir, safePath);
  const fileStat = await stat(filePath);

  if (!fileStat.isFile()) {
    throw new Error("Not a file");
  }

  const body = await readFile(filePath);
  res.statusCode = 200;
  res.setHeader("content-type", contentTypes[extname(filePath)] || "application/octet-stream");
  res.end(body);
}

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${port}`);

  try {
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }

    await serveStatic(req, res, url.pathname);
  } catch (error) {
    if (!res.headersSent) {
      res.statusCode = 404;
      res.setHeader("content-type", "text/plain; charset=utf-8");
    }
    res.end(error.message === "Not a file" ? "Not found" : error.message);
  }
}).listen(port, () => {
  console.log(`World Cup sweepstakes app running at http://localhost:${port}/`);
});
