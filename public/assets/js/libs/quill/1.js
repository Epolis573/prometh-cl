function i(t, e) {
  var n;
  if (e === undefined) {
    e = p.ANY;
  }
  if (typeof t == "string") {
    n = h[t] || u[t];
  } else if (t instanceof Text || t.nodeType === Node.TEXT_NODE) {
    n = h.text;
  } else if (typeof t == "number") {
    if (t & p.LEVEL & p.BLOCK) {
      n = h.block;
    } else if (t & p.LEVEL & p.INLINE) {
      n = h.inline;
    }
  } else if (t instanceof HTMLElement) {
    var r = (t.getAttribute("class") || "").split(/\s+/);
    for (var o in r) {
      if (n = c[r[o]]) {
        break;
      }
    }
    n = n || f[t.tagName];
  }
  if (n == null) {
    return null;
  } else if (e & p.LEVEL & n.scope && e & p.TYPE & n.scope) {
    return n;
  } else {
    return null;
  }
}
var a = this && this.__extends || function () {
  var t = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var n in e) {
      if (e.hasOwnProperty(n)) {
        t[n] = e[n];
      }
    }
  };
  return function (e, n) {
    function r() {
      this.constructor = e;
    }
    t(e, n);
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s = function (t) {
  function e(e) {
    var n = this;
    e = "[Parchment] " + e;
    (n = t.call(this, e) || this).message = e;
    n.name = n.constructor.name;
    return n;
  }
  a(e, t);
  return e;
}(Error);
exports.ParchmentError = s;
var p;
var u = {};
var c = {};
var f = {};
var h = {};
exports.DATA_KEY = "__blot";
(function (t) {
  t[t.TYPE = 3] = "TYPE";
  t[t.LEVEL = 12] = "LEVEL";
  t[t.ATTRIBUTE = 13] = "ATTRIBUTE";
  t[t.BLOT = 14] = "BLOT";
  t[t.INLINE = 7] = "INLINE";
  t[t.BLOCK = 11] = "BLOCK";
  t[t.BLOCK_BLOT = 10] = "BLOCK_BLOT";
  t[t.INLINE_BLOT = 6] = "INLINE_BLOT";
  t[t.BLOCK_ATTRIBUTE = 9] = "BLOCK_ATTRIBUTE";
  t[t.INLINE_ATTRIBUTE = 5] = "INLINE_ATTRIBUTE";
  t[t.ANY = 15] = "ANY";
})(p = exports.Scope ||= {});
exports.create = function r(t, e) {
  var n = i(t);
  if (n == null) {
    throw new s("Unable to create " + t + " blot");
  }
  var r = n;
  return new r(t instanceof Node || t.nodeType === Node.TEXT_NODE ? t : r.create(e), e);
};
exports.find = function o(t, n = false) {
  if (t == null) {
    return null;
  } else if (t[exports.DATA_KEY] != null) {
    return t[exports.DATA_KEY].blot;
  } else if (n) {
    return o(t.parentNode, n);
  } else {
    return null;
  }
};
exports.query = i;
exports.register = function l() {
  var t = [];
  for (var e = 0; e < arguments.length; e++) {
    t[e] = arguments[e];
  }
  if (t.length > 1) {
    return t.map(function (t) {
      return l(t);
    });
  }
  var n = t[0];
  if (typeof n.blotName != "string" && typeof n.attrName != "string") {
    throw new s("Invalid definition");
  }
  if (n.blotName === "abstract") {
    throw new s("Cannot register abstract class");
  }
  h[n.blotName || n.attrName] = n;
  if (typeof n.keyName == "string") {
    u[n.keyName] = n;
  } else {
    if (n.className != null) {
      c[n.className] = n;
    }
    if (n.tagName != null) {
      if (Array.isArray(n.tagName)) {
        n.tagName = n.tagName.map(function (t) {
          return t.toUpperCase();
        });
      } else {
        n.tagName = n.tagName.toUpperCase();
      }
      var r = Array.isArray(n.tagName) ? n.tagName : [n.tagName];
      r.forEach(function (t) {
        if (f[t] == null || n.className == null) {
          f[t] = n;
        }
      });
    }
  }
  return n;
};