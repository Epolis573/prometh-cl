Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlignStyle = exports.AlignClass = exports.AlignAttribute = undefined;
var o = function (t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}(require("./0.js"));
var i = {
  scope: o.default.Scope.BLOCK,
  whitelist: ["right", "center", "justify"]
};
var l = new o.default.Attributor.Attribute("align", "align", i);
var a = new o.default.Attributor.Class("align", "ql-align", i);
var s = new o.default.Attributor.Style("align", "text-align", i);
exports.AlignAttribute = l;
exports.AlignClass = a;
exports.AlignStyle = s;