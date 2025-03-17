Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SizeStyle = exports.SizeClass = undefined;
var o = function (t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}(require("./0.js"));
var i = new o.default.Attributor.Class("size", "ql-size", {
  scope: o.default.Scope.INLINE,
  whitelist: ["small", "large", "huge"]
});
var l = new o.default.Attributor.Style("size", "font-size", {
  scope: o.default.Scope.INLINE,
  whitelist: ["10px", "18px", "32px"]
});
exports.SizeClass = i;
exports.SizeStyle = l;