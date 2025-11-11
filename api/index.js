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
    const PROXY_PREFIXES = ["/assets/", "/images/", "/navigations/"];
    if (!BLOB_BASE || !PROXY_PREFIXES.some((p) => req.path.startsWith(p)))
      return next();

    const localFile = path.resolve(
      process.cwd(),
      "public",
      req.path.replace(/^\//, "")
    );
    if (fs.existsSync(localFile)) return next();

    // try blob targets (with /public prefix and without)
    const candidates = [
      `${BLOB_BASE}/public${req.originalUrl}`,
      `${BLOB_BASE}${req.originalUrl}`,
    ];

    // forward headers but drop host and accept-encoding
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
        console.warn("Blob proxy fetch error:", err);
        upstream = null;
      }
      if (upstream && upstream.ok) break;
      // if upstream found but not ok and not 404, stop
      if (upstream && upstream.status !== 404) break;
    }

    if (!upstream) return next();
    if (!upstream.ok) {
      res.status(upstream.status);
      const body = await upstream.text().catch(() => "");
      return res.send(body);
    }

    // determine if textual (JS/CSS/JSON/HTML/SVG)
    const contentType = (
      upstream.headers.get("content-type") || ""
    ).toLowerCase();
    const isText =
      /^(text\/|application\/(javascript|json|xml)|image\/svg\+xml)/i.test(
        contentType
      );

    // forward headers but drop encoding/length to avoid decoding mismatch
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

    // ensure content-type exists for browsers
    if (!res.getHeader("content-type") && contentType)
      res.setHeader("Content-Type", contentType);

    if (isText) {
      let text = await upstream.text();

      // rewrite quoted root-relative references like "/assets/..." "/geometry/..." "/shaders/..." etc.
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
        `(["'\\\`])\\/(?:${PREFIXES.join("|")})\\/([^"'\\\`\\s]*)`,
        "g"
      );

      text = text.replace(re, (match, quote, rest) => {
        // match like '"/assets/..' -> quote = ", rest = assets/...
        // extract the prefix from rest
        const parts = rest.split("/");
        const prefix = parts.shift();
        const tail = parts.join("/");
        // if original already points to blob, leave it
        if (match.includes(BLOB_BASE)) return match;
        // build replacement: ensure we map to BLOB_BASE/public/<prefix>/<tail>
        if (prefix === "public") {
          // original was /public/..., keep single /public/
          return `${quote}${BLOB_BASE}/public/${tail}`;
        } else {
          return `${quote}${BLOB_BASE}/public/${prefix}/${tail}`;
        }
      });

      res.send(text);
      return;
    }

    // binary -> stream as-is
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
