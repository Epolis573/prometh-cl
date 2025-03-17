var n = function () {
  "use strict";

  function t(t, e) {
    return e != null && t instanceof e;
  }
  function e(n, r, o, i, c) {
    if (typeof r == "object") {
      o = r.depth;
      i = r.prototype;
      c = r.includeNonEnumerable;
      r = r.circular;
    }
    var h = [];
    var p = [];
    var d = typeof Buffer != "undefined";
    if (r === undefined) {
      r = true;
    }
    if (o === undefined) {
      o = Infinity;
    }
    return function f(n, o) {
      if (n === null) {
        return null;
      }
      if (o === 0) {
        return n;
      }
      var y;
      var v;
      if (typeof n != "object") {
        return n;
      }
      if (t(n, a)) {
        y = new a();
      } else if (t(n, s)) {
        y = new s();
      } else if (t(n, u)) {
        y = new u(function (t, e) {
          n.then(function (e) {
            t(f(e, o - 1));
          }, function (t) {
            e(f(t, o - 1));
          });
        });
      } else if (e.__isArray(n)) {
        y = [];
      } else if (e.__isRegExp(n)) {
        y = new RegExp(n.source, l(n));
        if (n.lastIndex) {
          y.lastIndex = n.lastIndex;
        }
      } else if (e.__isDate(n)) {
        y = new Date(n.getTime());
      } else {
        if (d && Buffer.isBuffer(n)) {
          y = new Buffer(n.length);
          n.copy(y);
          return y;
        }
        if (t(n, Error)) {
          y = Object.create(n);
        } else if (i === undefined) {
          v = Object.getPrototypeOf(n);
          y = Object.create(v);
        } else {
          y = Object.create(i);
          v = i;
        }
      }
      if (r) {
        var b = h.indexOf(n);
        if (b != -1) {
          return p[b];
        }
        h.push(n);
        p.push(y);
      }
      if (t(n, a)) {
        n.forEach(function (t, e) {
          var n = f(e, o - 1);
          var r = f(t, o - 1);
          y.set(n, r);
        });
      }
      if (t(n, s)) {
        n.forEach(function (t) {
          var e = f(t, o - 1);
          y.add(e);
        });
      }
      for (var g in n) {
        var m;
        if (v) {
          m = Object.getOwnPropertyDescriptor(v, g);
        }
        if (!m || m.set != null) {
          y[g] = f(n[g], o - 1);
        }
      }
      if (Object.getOwnPropertySymbols) {
        var _ = Object.getOwnPropertySymbols(n);
        for (g = 0; g < _.length; g++) {
          var O = _[g];
          if (!(w = Object.getOwnPropertyDescriptor(n, O)) || w.enumerable || c) {
            y[O] = f(n[O], o - 1);
            if (!w.enumerable) {
              Object.defineProperty(y, O, {
                enumerable: false
              });
            }
          }
        }
      }
      if (c) {
        var x = Object.getOwnPropertyNames(n);
        for (g = 0; g < x.length; g++) {
          var w;
          var k = x[g];
          if (!(w = Object.getOwnPropertyDescriptor(n, k)) || !w.enumerable) {
            y[k] = f(n[k], o - 1);
            Object.defineProperty(y, k, {
              enumerable: false
            });
          }
        }
      }
      return y;
    }(n, o);
  }
  function n(t) {
    return Object.prototype.toString.call(t);
  }
  function l(t) {
    var e = "";
    if (t.global) {
      e += "g";
    }
    if (t.ignoreCase) {
      e += "i";
    }
    if (t.multiline) {
      e += "m";
    }
    return e;
  }
  var a;
  var s;
  var u;
  try {
    a = Map;
  } catch (t) {
    a = function () {};
  }
  try {
    s = Set;
  } catch (t) {
    s = function () {};
  }
  try {
    u = Promise;
  } catch (t) {
    u = function () {};
  }
  e.clonePrototype = function (t) {
    if (t === null) {
      return null;
    }
    function e() {}
    e.prototype = t;
    return new e();
  };
  e.__objToStr = n;
  e.__isDate = function r(t) {
    return typeof t == "object" && n(t) === "[object Date]";
  };
  e.__isArray = function o(t) {
    return typeof t == "object" && n(t) === "[object Array]";
  };
  e.__isRegExp = function i(t) {
    return typeof t == "object" && n(t) === "[object RegExp]";
  };
  e.__getRegExpFlags = l;
  return e;
}();
if (typeof module == "object" && module.exports) {
  module.exports = n;
}