Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackgroundStyle = exports.BackgroundClass = undefined;
var o = function (t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}(require("./0.js"));
var i = require("./24.js");
var l = new o.default.Attributor.Class("background", "ql-bg", {
  scope: o.default.Scope.INLINE
});
var a = new i.ColorAttributor("background", "background-color", {
  scope: o.default.Scope.INLINE
});
exports.BackgroundClass = l;
exports.BackgroundStyle = a;