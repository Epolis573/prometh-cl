import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const BLOB_BASE = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");

// Proxy certain asset routes to BLOB_BASE_URL when defined.
// Add or remove route patterns as needed.
const PROXY_PREFIXES = [
  "/navigations/",
  "/assets/",
  "/images/",
  "/public/",
  "/css/",
  "/js/",
];

// Proxy middleware MUST run before express.static so blob can be used instead of local files
app.use(async (req, res, next) => {
  try {
    if (!BLOB_BASE) return next();
    if (!PROXY_PREFIXES.some((p) => req.path.startsWith(p))) return next();

    // If the file exists locally, let express.static serve it (preserve previous working behavior)
    const localFile = path.resolve(
      process.cwd(),
      "public",
      req.path.replace(/^\//, "")
    );
    if (fs.existsSync(localFile)) {
      // local copy exists -> serve it via static middleware
      return next();
    }

    // Map requests like /assets/... or /images/... to blob's /public/assets/...
    let targetPath = req.originalUrl;
    if (
      req.path.startsWith("/assets/") ||
      req.path.startsWith("/images/") ||
      req.path.startsWith("/css/") ||
      req.path.startsWith("/js/")
    ) {
      targetPath = "/public" + req.originalUrl;
    }
    // keep /public/ as-is
    const target = BLOB_BASE + targetPath; // e.g. https://.../public/assets/...

    const fetchFn = global.fetch ?? (await import("node-fetch")).default;
    const upstream = await fetchFn(target, {
      method: "GET",
      headers: { accept: "*/*" },
    });

    // only stream when upstream returned a successful body; otherwise fallback to local/static
    if (!upstream.ok) {
      // upstream missing or error -> fallback to next() so express.static or other handlers can respond
      console.warn(
        `Blob proxy: upstream returned ${upstream.status} for ${target} — falling back`
      );
      return next();
    }

    res.status(upstream.status);
    upstream.headers.forEach((v, k) => {
      if (!["transfer-encoding", "connection"].includes(k.toLowerCase()))
        res.setHeader(k, v);
    });

    if (upstream.body && upstream.body.pipe) {
      upstream.body.pipe(res);
    } else {
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.send(buf);
    }
  } catch (err) {
    console.error("Proxy error:", err);
    // fallback to local/static when proxy fails
    next();
  }
});

// Serve local static files (useful for dev or fallback)
app.use(express.static(path.resolve(process.cwd(), "public")));

// optional: your render route
import render from "./render.js";
app.get("/", render);
app.get("/render", render);

app.listen(port, () => {
  console.log(
    `Local server listening: http://localhost:${port} (BLOB_BASE_URL=${
      BLOB_BASE || "not set"
    })`
  );
});

export default app;
