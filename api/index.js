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
    // only proxy these top-level prefixes; everything else is under /assets
    const PROXY_PREFIXES = ["/assets/", "/images/", "/navigations/"];
    if (!BLOB_BASE || !PROXY_PREFIXES.some((p) => req.path.startsWith(p)))
      return next();

    // prefer local file when present in dev
    const localFile = path.resolve(
      process.cwd(),
      "public",
      req.path.replace(/^\//, "")
    );
    if (fs.existsSync(localFile)) return next();

    // all proxied requests should map to the blob public root
    // e.g. /assets/...  ->  ${BLOB_BASE}/public/assets/...
    let targetPath = "/public" + req.originalUrl;
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

    // Decide whether to stream binary or rewrite text responses
    const contentType = upstream.headers.get("content-type") || "";
    const isText =
      /^(text\/|application\/(javascript|json|xml)|image\/svg\+xml)/i.test(
        contentType
      );

    res.status(upstream.status);

    // forward headers (drop encoding/length)
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

    // If response is textual, rewrite root-relative asset paths to the blob
    if (isText) {
      let text = await upstream.text();
      const PREFIXES = [
        "assets",
        "public",
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
        `(["'\\\`])\\/(?:${PREFIXES.join("|")})([^"'\\\`\\s]*)`,
        "g"
      );
      text = text.replace(re, (match, quote, tail) => {
        const path = match.slice(1); // strip opening quote
        if (path.startsWith(`${BLOB_BASE}/`)) return match;
        return `${quote}${BLOB_BASE}/${tail}`;
      });
      res.send(text);
      return;
    }

    // Binary: stream as-is
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
