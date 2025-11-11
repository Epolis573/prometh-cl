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
      const shim = `<script>/* injected blob shim */
(function(){
  try{
    const BLOB='${BLOB}';
    window.BLOB_BASE_URL = BLOB;
    const REWRITE_PREFIXES = ${JSON.stringify([
      "/assets/",
      "/public/",
      "/images/",
      "/css/",
      "/js/",
    ])};
    const shouldRewrite = (url) => {
      if (typeof url !== 'string' || !url.startsWith('/')) return false;
      // never rewrite navigations
      if (url.startsWith('/navigations/')) return false;
      return REWRITE_PREFIXES.some(p => url.startsWith(p));
    };
    const _fetch = window.fetch && window.fetch.bind(window);
    if(_fetch){
      window.fetch = function(url, opts){
        if(shouldRewrite(url)) url = BLOB + url;
        return _fetch(url, opts);
      };
    }
    const wrap = (fnName) => {
      const orig = window[fnName];
      window[fnName] = function(url, ...rest){
        if(shouldRewrite(url)) url = BLOB + url;
        return (orig || window.fetch)(url, ...rest);
      };
    };
    wrap('get'); wrap('post'); wrap('put');
  }catch(e){ console.error('blob shim', e); }
})();</script>`;
      html = html.replace("</head>", shim + "</head>");
    }

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  } catch (err) {
    console.error("Render error:", err);
    res.status(500).send("Render error");
  }
}
