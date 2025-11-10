import express from "express";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const BLOB_BASE = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");

// Serve local static files first (useful for dev)
app.use(express.static(path.resolve(process.cwd(), "public")));

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

app.get("*", async (req, res, next) => {
  // Only proxy requests that match prefixes and when BLOB_BASE is set
  if (!BLOB_BASE || !PROXY_PREFIXES.some((p) => req.path.startsWith(p)))
    return next();

  const target = BLOB_BASE + req.originalUrl; // preserves full path and query
  try {
    // use global fetch (Node 18+). Fallback to dynamic import if needed.
    const fetchFn = global.fetch ?? (await import("node-fetch")).default;
    const upstream = await fetchFn(target, {
      method: "GET",
      headers: { accept: "*/*" },
    });

    res.status(upstream.status);
    upstream.headers.forEach((v, k) => {
      // don't forward hop-by-hop headers
      if (!["transfer-encoding", "connection"].includes(k.toLowerCase()))
        res.setHeader(k, v);
    });

    // stream response body
    if (upstream.body && upstream.body.pipe) {
      upstream.body.pipe(res);
    } else {
      const buf = Buffer.from(await upstream.arrayBuffer());
      res.send(buf);
    }
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(502).send("Proxy error");
  }
});

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
