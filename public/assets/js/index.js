function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = r(require("./libs/quill/46.js"));
var l = require("./libs/quill/34.js");
var a = require("./libs/quill/36.js");
var s = require("./libs/quill/62.js");
var c = r(require("./libs/quill/63.js"));
var h = r(require("./libs/quill/64.js"));
var p = require("./libs/quill/65.js");
var d = r(p);
var y = require("./libs/quill/35.js");
var v = require("./libs/quill/24.js");
var b = require("./libs/quill/37.js");
var g = require("./libs/quill/38.js");
var _ = r(require("./libs/quill/39.js"));
var w = r(require("./libs/quill/66.js"));
var k = r(require("./libs/quill/15.js"));
var N = r(require("./libs/quill/67.js"));
var A = r(require("./libs/quill/68.js"));
var T = r(require("./libs/quill/69.js"));
var S = r(require("./libs/quill/70.js"));
var L = r(require("./libs/quill/71.js"));
var M = require("./libs/quill/13.js");
var R = r(M);
var B = r(require("./libs/quill/72.js"));
var U = r(require("./libs/quill/73.js"));
var H = r(require("./libs/quill/74.js"));
var z = r(require("./libs/quill/26.js"));
var V = r(require("./libs/quill/16.js"));
var G = r(require("./libs/quill/41.js"));
var X = r(require("./libs/quill/42.js"));
var Q = r(require("./libs/quill/43.js"));
var tt = r(require("./libs/quill/107.js"));
var nt = r(require("./libs/quill/108.js"));
i.default.register({
  "attributors/attribute/direction": a.DirectionAttribute,
  "attributors/class/align": l.AlignClass,
  "attributors/class/background": y.BackgroundClass,
  "attributors/class/color": v.ColorClass,
  "attributors/class/direction": a.DirectionClass,
  "attributors/class/font": b.FontClass,
  "attributors/class/size": g.SizeClass,
  "attributors/style/align": l.AlignStyle,
  "attributors/style/background": y.BackgroundStyle,
  "attributors/style/color": v.ColorStyle,
  "attributors/style/direction": a.DirectionStyle,
  "attributors/style/font": b.FontStyle,
  "attributors/style/size": g.SizeStyle
}, true);
i.default.register({
  "formats/align": l.AlignClass,
  "formats/direction": a.DirectionClass,
  "formats/indent": s.IndentClass,
  "formats/background": y.BackgroundStyle,
  "formats/color": v.ColorStyle,
  "formats/font": b.FontClass,
  "formats/size": g.SizeClass,
  "formats/blockquote": c.default,
  "formats/code-block": R.default,
  "formats/header": h.default,
  "formats/list": d.default,
  "formats/bold": _.default,
  "formats/code": M.Code,
  "formats/italic": w.default,
  "formats/link": k.default,
  "formats/script": N.default,
  "formats/strike": A.default,
  "formats/underline": T.default,
  "formats/image": S.default,
  "formats/video": L.default,
  "formats/list/item": p.ListItem,
  "modules/formula": B.default,
  "modules/syntax": U.default,
  "modules/toolbar": H.default,
  "themes/bubble": tt.default,
  "themes/snow": nt.default,
  "ui/icons": z.default,
  "ui/picker": V.default,
  "ui/icon-picker": X.default,
  "ui/color-picker": G.default,
  "ui/tooltip": Q.default
}, true);
exports.default = i.default;