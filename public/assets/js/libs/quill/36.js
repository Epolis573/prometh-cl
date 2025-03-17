Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectionStyle = exports.DirectionClass = exports.DirectionAttribute = undefined;
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
  whitelist: ["rtl"]
};
var l = new o.default.Attributor.Attribute("direction", "dir", i);
var a = new o.default.Attributor.Class("direction", "ql-direction", i);
var s = new o.default.Attributor.Style("direction", "direction", i);
exports.DirectionAttribute = l;
exports.DirectionClass = a;
exports.DirectionStyle = s;