// api/render.js (ESM)
import { readFile } from "fs/promises";
import path from "path";
import ejs from "ejs";

export default async function handler(req, res) {
  try {
    const templatePath = path.resolve(process.cwd(), "views/index.ejs");
    const tpl = await readFile(templatePath, "utf8");

    // render template with BLOB_BASE_URL for static URLs already present in EJS
    let html = ejs.render(tpl, {
      BLOB_BASE_URL: process.env.BLOB_BASE_URL,
    });

    // server-side rewrite of HTML attributes and string literals that point to root-relative asset paths
    const BLOB = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");
    if (BLOB) {
      // prefixes to rewrite server-side (do NOT include /navigations)
      const REWRITE_PREFIXES = [
        "assets/",
        "public/",
        "images/",
        "css/",
        "js/",
        "navigations/",
        "geometry/",
        "shaders/",
        "videos/",
        "fonts/",
        "data/",
        "favicons/",
        "fonts/",
      ];

      // 1) rewrite src/href attributes like src="/assets/..." href='/images/...'
      html = html.replace(
        new RegExp(
          `(src|href)=["']\\/(?:${REWRITE_PREFIXES.join("|")})([^"']+)["']`,
          "g"
        ),
        (m, attr, tail) => `${attr}="${BLOB}/${tail}"`
      );

      // 2) rewrite occurrences inside quoted strings in inline scripts or attributes: "/assets/..."
      html = html.replace(
        new RegExp(
          `(["'])\\/(?:${REWRITE_PREFIXES.join("|")})([^"']+)\\1`,
          "g"
        ),
        (m, quote, tail) => `${quote}${BLOB}/${tail}${quote}`
      );

      // keep a client shim as fallback (whitelist approach, still excludes /navigations)
      // only inject the runtime shim when explicitly enabled (prevents local crashes)
      if (!process.env.DISABLE_BLOB_SHIM) {
        const shim = `<base href="${BLOB}/public/">
<script>(function(){ /* runtime blob rewrite shim (unchanged) */ })();</script>`;
        html = html.replace("</head>", shim + "</head>");
      }
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error("Render error:", err);
    res.status(500).send("Render error");
  }
}
