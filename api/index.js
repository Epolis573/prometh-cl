import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
// moved BLOB_BASE to module scope so it's available in app.listen
const BLOB_BASE = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");

app.use(async (req, res, next) => {
  try {
    // use top-level BLOB_BASE (do NOT redefine here)
    const PROXY_PREFIXES = [
      "/assets/",
      "/images/",
      "/public/",
      "/css/",
      "/js/",
      "/navigations/",
    ];
    if (!BLOB_BASE || !PROXY_PREFIXES.some((p) => req.path.startsWith(p)))
      return next();

    // prefer local file when present in dev
    const localFile = path.resolve(
      process.cwd(),
      "public",
      req.path.replace(/^\//, "")
    );
    if (fs.existsSync(localFile)) return next();

    // map root paths to blob public/ prefix (important for navigations)
    let targetPath = req.originalUrl;
    if (
      req.path.startsWith("/assets/") ||
      req.path.startsWith("/images/") ||
      req.path.startsWith("/css/") ||
      req.path.startsWith("/js/") ||
      req.path.startsWith("/navigations/")
    ) {
      targetPath = "/public" + req.originalUrl;
    }
    const target = BLOB_BASE + targetPath;
    console.log(`Blob proxy: ${req.method} ${req.originalUrl} -> ${target}`);

    const fetchFn = global.fetch ?? (await import("node-fetch")).default;
    const upstream = await fetchFn(target, {
      method: req.method,
      headers: { accept: "*/*" },
    });

    if (!upstream.ok) {
      console.warn(
        `Blob proxy upstream returned ${upstream.status} for ${target}`
      );
      res.status(upstream.status);
      const body = await upstream.text();
      return res.send(body);
    }

    res.status(upstream.status);
    upstream.headers.forEach((v, k) => {
      if (!["transfer-encoding", "connection"].includes(k.toLowerCase()))
        res.setHeader(k, v);
    });

    if (upstream.body && upstream.body.pipe) upstream.body.pipe(res);
    else {
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.send(buf);
    }
  } catch (err) {
    console.error("Blob proxy error:", err);
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
    `Local server listening: http://localhost:${port} (BLOB_BASE=${
      BLOB_BASE || "not set"
    })`
  );
});

export default app;
