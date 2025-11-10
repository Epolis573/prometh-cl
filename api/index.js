import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const BLOB_BASE = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");
const PROXY_PREFIXES = [
  "/assets/",
  "/images/",
  "/public/",
  "/css/",
  "/js/",
  "/navigations/",
];

app.use(async (req, res, next) => {
  try {
    if (!BLOB_BASE) return next();
    if (!PROXY_PREFIXES.some((p) => req.path.startsWith(p))) return next();

    // serve local file if present (dev fallback)
    const localFile = path.resolve(
      process.cwd(),
      "public",
      req.path.replace(/^\//, "")
    );
    if (fs.existsSync(localFile)) return next();

    // map to blob: /assets/x -> /public/assets/x on blob
    let targetPath = req.originalUrl;
    if (
      req.path.startsWith("/assets/") ||
      req.path.startsWith("/images/") ||
      req.path.startsWith("/css/") ||
      req.path.startsWith("/js/")
    ) {
      targetPath = "/public" + req.originalUrl;
    }
    const target = BLOB_BASE + targetPath;

    const fetchFn = global.fetch ?? (await import("node-fetch")).default;
    const upstream = await fetchFn(target, {
      method: "GET",
      headers: { accept: "*/*" },
    });

    if (!upstream.ok) return next();
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
    `Local server listening: http://localhost:${port} (BLOB_BASE_URL=${
      BLOB_BASE || "not set"
    })`
  );
});

export default app;
