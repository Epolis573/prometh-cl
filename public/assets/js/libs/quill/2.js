var n = Object.prototype.hasOwnProperty;
var r = Object.prototype.toString;
function o(t) {
  if (typeof Array.isArray == "function") {
    return Array.isArray(t);
  } else {
    return r.call(t) === "[object Array]";
  }
}
function i(t) {
  if (!t || r.call(t) !== "[object Object]") {
    return false;
  }
  var i;
  var e = n.call(t, "constructor");
  var o = t.constructor && t.constructor.prototype && n.call(t.constructor.prototype, "isPrototypeOf");
  if (t.constructor && !e && !o) {
    return false;
  }
  for (i in t);
  return i === undefined || n.call(t, i);
}
module.exports = function t() {
  var e;
  var n;
  var r;
  var l;
  var a;
  var s;
  var u = arguments[0];
  var c = 1;
  var f = arguments.length;
  var h = false;
  if (typeof u == "boolean") {
    h = u;
    u = arguments[1] || {};
    c = 2;
  }
  if (u == null || typeof u != "object" && typeof u != "function") {
    u = {};
  }
  for (; c < f; ++c) {
    if ((e = arguments[c]) != null) {
      for (n in e) {
        r = u[n];
        if (u !== (l = e[n])) {
          if (h && l && (i(l) || (a = o(l)))) {
            if (a) {
              a = false;
              s = r && o(r) ? r : [];
            } else {
              s = r && i(r) ? r : {};
            }
            u[n] = t(h, s, l);
          } else if (l !== undefined) {
            u[n] = l;
          }
        }
      }
    }
  }
  return u;
};