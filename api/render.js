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
        const shim = `<script>(function(){
  try{
    var BLOB='${BLOB}';
    if(!BLOB) return;
    // do not run in local dev
    if(location.hostname==='localhost' || location.hostname==='127.0.0.1') return;
    var PREFIXES=['/assets/','/public/','/images/','/geometry/','/shaders/','/css/','/js/','/videos/','/fonts/','/data/','/favicons/'];
    function shouldRewrite(url){
      if(typeof url!=='string') return false;
      if(url.startsWith('http:')||url.startsWith('https:')||url.startsWith('data:')||url.startsWith('blob:')) return false;
      if(url.startsWith('/navigations/')) return false;
      return PREFIXES.some(function(p){return url.startsWith(p);});
    }
    // patch fetch
    try{
      var _fetch = window.fetch && window.fetch.bind(window);
      if(_fetch){
        window.fetch = function(input, init){
          var url = (typeof input === 'string') ? input : (input && input.url);
          if(shouldRewrite(url)){
            var full = url.startsWith('/public/') ? (BLOB+url) : (BLOB+'/public'+url);
            if(typeof input === 'object' && input.url) input = new Request(full, input);
            else url = full;
          }
          return _fetch(url || input, init);
        };
      }
    }catch(e){console.warn('fetch patch', e);}
    // patch XHR.open
    try{
      var XHROpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url){
        try{ if(shouldRewrite(url)) url = url.startsWith('/public/') ? (BLOB+url) : (BLOB+'/public'+url); }catch(e){}
        return XHROpen.apply(this, arguments);
      };
    }catch(e){console.warn('xhr patch', e);}
    // patch element setters and setAttribute for src/href
    function patchSetter(proto, name){
      try{
        var desc = Object.getOwnPropertyDescriptor(proto, name);
        if(!desc || !desc.set) return;
        var origSet = desc.set;
        Object.defineProperty(proto, name, {
          set: function(v){
            try{ if(shouldRewrite(v)) v = v.startsWith('/public/') ? (BLOB+v) : (BLOB+'/public'+v); }catch(e){}
            return origSet.call(this, v);
          },
          get: desc.get,
          configurable: true,
          enumerable: true
        });
      }catch(e){}
    }
    patchSetter(HTMLImageElement.prototype,'src');
    patchSetter(HTMLScriptElement.prototype,'src');
    patchSetter(HTMLLinkElement.prototype,'href');
    var origSetAttr = Element.prototype.setAttribute;
    Element.prototype.setAttribute = function(name, value){
      try{
        if((name==='src' || name==='href') && shouldRewrite(value)){
          value = value.startsWith('/public/') ? (BLOB+value) : (BLOB+'/public'+value);
        }
      }catch(e){}
      return origSetAttr.call(this, name, value);
    };
  }catch(e){ console.warn('blob shim init', e); }
})();</script>`;
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
