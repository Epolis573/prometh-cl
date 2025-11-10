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

    // inject a small client-side shim that rewrites fetch() calls for leading "/" to BLOB_BASE_URL
    const BLOB = (process.env.BLOB_BASE_URL || "").replace(/\/$/, "");
    if (BLOB) {
      // only rewrite these prefixes (adjust as needed). This will NOT rewrite /navigations.
      const REWRITE_PREFIXES = [
        "/assets/",
        "/public/",
        "/images/",
        "/css/",
        "/js/",
      ];
      const shim = `<script>/* injected blob shim */
(function(){
  try{
    const BLOB='${BLOB}';
    window.BLOB_BASE_URL = BLOB;
    const shouldRewrite = (url) => {
      if (typeof url !== 'string' || !url.startsWith('/')) return false;
      // only rewrite if path starts with one of the allowed prefixes
      return ${JSON.stringify(REWRITE_PREFIXES)}.some(p => url.startsWith(p));
    };
    // wrap fetch to rewrite only allowed root-relative requests to blob
    const _fetch = window.fetch && window.fetch.bind(window);
    if(_fetch){
      window.fetch = function(url, opts){
        if(shouldRewrite(url)) url = BLOB + url;
        return _fetch(url, opts);
      };
    }
    // fallback simple wrappers used by some libs (get/post/put)
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
