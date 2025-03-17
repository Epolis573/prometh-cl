function r(t) {
  if (i.indexOf(t) <= i.indexOf(l)) {
    var e;
    for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++) {
      r[o - 1] = arguments[o];
    }
    (e = console)[t].apply(e, r);
  }
}
function o(t) {
  return i.reduce(function (e, n) {
    e[n] = r.bind(console, n, t);
    return e;
  }, {});
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = ["error", "warn", "log", "info"];
var l = "warn";
r.level = o.level = function (t) {
  l = t;
};
exports.default = o;