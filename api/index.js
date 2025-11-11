import express from "express";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const BLOB_BASE = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");

app.use(async (req, res, next) => {
  try {
    const PROXY_PREFIXES = [
      "/assets/",
      "/images/",
      "/geometry/",
      "/navigations/",
    ];
    if (!BLOB_BASE || !PROXY_PREFIXES.some((p) => req.path.startsWith(p)))
      return next();

    // If local file exists (dev fallback), let static serve it
    const localFile = path.resolve(
      process.cwd(),
      "public",
      req.path.replace(/^\//, "")
    );
    if (fs.existsSync(localFile)) return next();

    // Try candidate blob locations (with /public prefix first)
    const candidates = [
      `${BLOB_BASE}/public${req.originalUrl}`,
      `${BLOB_BASE}${req.originalUrl}`,
    ];

    // Forward most request headers but drop host/encoding/length
    const forwardHeaders = { ...req.headers };
    delete forwardHeaders.host;
    delete forwardHeaders["accept-encoding"];
    delete forwardHeaders["content-length"];

    const fetchFn = global.fetch ?? (await import("node-fetch")).default;
    let upstream = null;
    let target = null;
    for (const cand of candidates) {
      try {
        target = cand;
        console.log(
          `Blob proxy try: ${req.method} ${req.originalUrl} -> ${target}`
        );
        upstream = await fetchFn(target, {
          method: req.method,
          headers: forwardHeaders,
          body: ["GET", "HEAD"].includes(req.method) ? undefined : req,
        });
      } catch (err) {
        console.warn(`Blob proxy fetch error for ${cand}:`, err);
        upstream = null;
      }
      if (upstream && upstream.ok) break;
      if (upstream && upstream.status !== 404) break;
    }

    if (!upstream) return next();
    if (!upstream.ok) {
      res.status(upstream.status);
      const body = await upstream.text().catch(() => "");
      return res.send(body);
    }

    // decide textual responses (include various JS content-types)
    const contentType = (
      upstream.headers.get("content-type") || ""
    ).toLowerCase();
    const isText =
      /^(text\/|application\/(javascript|x-javascript|json|xml)|image\/svg\+xml)/i.test(
        contentType
      );

    // forward safe headers (drop hop-by-hop & encoding/length)
    upstream.headers.forEach((v, k) => {
      const key = k.toLowerCase();
      if (
        [
          "transfer-encoding",
          "connection",
          "content-encoding",
          "content-length",
        ].includes(key)
      )
        return;
      res.setHeader(k, v);
    });
    if (!res.getHeader("content-type") && contentType)
      res.setHeader("Content-Type", contentType);

    if (isText) {
      let text = await upstream.text();

      // rewrite quoted root-relative references like "/assets/...", "/geometry/...", "/shaders/..." etc.
      // captures: quote, prefix (public|assets|...), tail
      const PREFIXES = [
        "public",
        "assets",
        "images",
        "geometry",
        "shaders",
        "css",
        "js",
        "videos",
        "fonts",
        "data",
        "favicons",
      ];
      const re = new RegExp(
        `(["'\\\`])\\/(?:(${PREFIXES.join("|")}))\\/([^"'\\\`\\s]*)`,
        "g"
      );

      text = text.replace(re, (full, quote, prefix, tail) => {
        // if already rewritten to the blob, skip
        if (full.includes(BLOB_BASE)) return full;
        if (prefix === "public") {
          // original was /public/..., map to `${BLOB_BASE}/...`
          return `${quote}${BLOB_BASE}/${tail}`;
        }
        // map /assets/... -> `${BLOB_BASE}/public/assets/...`
        return `${quote}${BLOB_BASE}/public/${prefix}/${tail}`;
      });

      // send rewritten text
      res.send(text);
      return;
    }

    // binary -> stream unchanged
    if (upstream.body && upstream.body.pipe) {
      upstream.body.pipe(res);
    } else {
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
