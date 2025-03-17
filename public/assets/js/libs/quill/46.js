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
var i = r(require("./0.js"));
var a = r(require("./6.js"));
var s = require("./3.js");
var u = r(s);
var f = r(require("./14.js"));
var p = r(require("./23.js"));
var y = r(require("./31.js"));
var b = r(require("./33.js"));
var m = r(require("./5.js"));
var O = r(require("./59.js"));
var x = r(require("./8.js"));
var E = r(require("./60.js"));
var j = r(require("./61.js"));
var q = r(require("./25.js"));
a.default.register({
  "blots/block": u.default,
  "blots/block/embed": s.BlockEmbed,
  "blots/break": f.default,
  "blots/container": p.default,
  "blots/cursor": y.default,
  "blots/embed": b.default,
  "blots/inline": m.default,
  "blots/scroll": O.default,
  "blots/text": x.default,
  "modules/clipboard": E.default,
  "modules/history": j.default,
  "modules/keyboard": q.default
});
i.default.register(u.default, f.default, y.default, m.default, O.default, x.default);
exports.default = a.default;