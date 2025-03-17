function r(t) {
  return t == null;
}
function o(t) {
  return !!t && typeof t == "object" && typeof t.length == "number" && typeof t.copy == "function" && typeof t.slice == "function" && (!(t.length > 0) || typeof t[0] == "number");
}
var l = Array.prototype.slice;
var a = require("./55.js");
var s = require("./56.js");
var u = module.exports = function (t, e, n) {
  n ||= {};
  return t === e || (t instanceof Date && e instanceof Date ? t.getTime() === e.getTime() : !t || !e || typeof t != "object" && typeof e != "object" ? n.strict ? t === e : t == e : function i(t, e, n) {
    var i;
    var c;
    if (r(t) || r(e)) {
      return false;
    }
    if (t.prototype !== e.prototype) {
      return false;
    }
    if (s(t)) {
      return !!s(e) && (t = l.call(t), e = l.call(e), u(t, e, n));
    }
    if (o(t)) {
      if (!o(e)) {
        return false;
      }
      if (t.length !== e.length) {
        return false;
      }
      for (i = 0; i < t.length; i++) {
        if (t[i] !== e[i]) {
          return false;
        }
      }
      return true;
    }
    try {
      var f = a(t);
      var h = a(e);
    } catch (t) {
      return false;
    }
    if (f.length != h.length) {
      return false;
    }
    f.sort();
    h.sort();
    i = f.length - 1;
    for (; i >= 0; i--) {
      if (f[i] != h[i]) {
        return false;
      }
    }
    for (i = f.length - 1; i >= 0; i--) {
      c = f[i];
      if (!u(t[c], e[c], n)) {
        return false;
      }
    }
    return typeof t == typeof e;
  }(t, e, n));
};