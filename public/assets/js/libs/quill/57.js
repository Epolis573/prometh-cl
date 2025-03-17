function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function l(t, e) {
  return Object.keys(e).reduce(function (n, r) {
    if (t[r] != null) {
      if (e[r] === t[r]) {
        n[r] = e[r];
      } else if (Array.isArray(e[r])) {
        if (e[r].indexOf(t[r]) < 0) {
          n[r] = e[r].concat([t[r]]);
        }
      } else {
        n[r] = [e[r], t[r]];
      }
    }
    return n;
  }, {});
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var s = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
  return typeof t;
} : function (t) {
  if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
    return "symbol";
  } else {
    return typeof t;
  }
};
function u(e, n) {
  if (Array.isArray(e)) {
    return e;
  }
  if (Symbol.iterator in Object(e)) {
    return function t(t, e) {
      var n = [];
      var r = true;
      var o = false;
      var i = undefined;
      try {
        for (var l, a = t[Symbol.iterator](); !(r = (l = a.next()).done) && (n.push(l.value), !e || n.length !== e); r = true);
      } catch (t) {
        o = true;
        i = t;
      } finally {
        try {
          if (!r && a.return) {
            a.return();
          }
        } finally {
          if (o) {
            throw i;
          }
        }
      }
      return n;
    }(e, n);
  }
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
var c = function () {
  function t(t, e) {
    for (var n = 0; n < e.length; n++) {
      var r = e[n];
      r.enumerable = r.enumerable || false;
      r.configurable = true;
      if ("value" in r) {
        r.writable = true;
      }
      Object.defineProperty(t, r.key, r);
    }
  }
  return function (e, n, r) {
    if (n) {
      t(e.prototype, n);
    }
    if (r) {
      t(e, r);
    }
    return e;
  };
}();
var h = r(require("./4.js"));
var d = r(require("./20.js"));
var v = r(require("./0.js"));
var g = r(require("./13.js"));
var _ = r(require("./31.js"));
var O = require("./3.js");
var w = r(O);
var k = r(require("./14.js"));
var N = r(require("./21.js"));
var A = r(require("./12.js"));
var T = r(require("./2.js"));
var P = /^[ -~]*$/;
var S = function () {
  function t(e) {
    (function i(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, t);
    this.scroll = e;
    this.delta = this.getDelta();
  }
  c(t, [{
    key: "applyDelta",
    value: function (t) {
      var e = this;
      var n = false;
      this.scroll.update();
      var r = this.scroll.length();
      this.scroll.batchStart();
      (t = function a(t) {
        return t.reduce(function (t, e) {
          if (e.insert === 1) {
            var n = (0, N.default)(e.attributes);
            delete n.image;
            return t.insert({
              image: e.attributes.image
            }, n);
          }
          if (e.attributes != null && (e.attributes.list === true || e.attributes.bullet === true)) {
            if ((e = (0, N.default)(e)).attributes.list) {
              e.attributes.list = "ordered";
            } else {
              e.attributes.list = "bullet";
              delete e.attributes.bullet;
            }
          }
          if (typeof e.insert == "string") {
            var r = e.insert.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
            return t.insert(r, e.attributes);
          }
          return t.push(e);
        }, new h.default());
      }(t)).reduce(function (t, o) {
        var i = o.retain || o.delete || o.insert.length || 1;
        var l = o.attributes || {};
        if (o.insert != null) {
          if (typeof o.insert == "string") {
            var a = o.insert;
            if (a.endsWith("\n") && n) {
              n = false;
              a = a.slice(0, -1);
            }
            if (t >= r && !a.endsWith("\n")) {
              n = true;
            }
            e.scroll.insertAt(t, a);
            var c = e.scroll.line(t);
            var f = u(c, 2);
            var h = f[0];
            var p = f[1];
            var y = (0, T.default)({}, (0, O.bubbleFormats)(h));
            if (h instanceof w.default) {
              var b = h.descendant(v.default.Leaf, p);
              var m = u(b, 1)[0];
              y = (0, T.default)(y, (0, O.bubbleFormats)(m));
            }
            l = d.default.attributes.diff(y, l) || {};
          } else if (s(o.insert) === "object") {
            var _ = Object.keys(o.insert)[0];
            if (_ == null) {
              return t;
            }
            e.scroll.insertAt(t, _, o.insert[_]);
          }
          r += i;
        }
        Object.keys(l).forEach(function (n) {
          e.scroll.formatAt(t, i, n, l[n]);
        });
        return t + i;
      }, 0);
      t.reduce(function (t, n) {
        if (typeof n.delete == "number") {
          e.scroll.deleteAt(t, n.delete);
          return t;
        } else {
          return t + (n.retain || n.insert.length || 1);
        }
      }, 0);
      this.scroll.batchEnd();
      return this.update(t);
    }
  }, {
    key: "deleteText",
    value: function (t, e) {
      this.scroll.deleteAt(t, e);
      return this.update(new h.default().retain(t).delete(e));
    }
  }, {
    key: "formatLine",
    value: function (t, e) {
      var n = this;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.scroll.update();
      Object.keys(r).forEach(function (o) {
        if (n.scroll.whitelist == null || n.scroll.whitelist[o]) {
          var i = n.scroll.lines(t, Math.max(e, 1));
          var l = e;
          i.forEach(function (e) {
            var i = e.length();
            if (e instanceof g.default) {
              var a = t - e.offset(n.scroll);
              var s = e.newlineIndex(a + l) - a + 1;
              e.formatAt(a, s, o, r[o]);
            } else {
              e.format(o, r[o]);
            }
            l -= i;
          });
        }
      });
      this.scroll.optimize();
      return this.update(new h.default().retain(t).retain(e, (0, N.default)(r)));
    }
  }, {
    key: "formatText",
    value: function (t, e) {
      var n = this;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      Object.keys(r).forEach(function (o) {
        n.scroll.formatAt(t, e, o, r[o]);
      });
      return this.update(new h.default().retain(t).retain(e, (0, N.default)(r)));
    }
  }, {
    key: "getContents",
    value: function (t, e) {
      return this.delta.slice(t, t + e);
    }
  }, {
    key: "getDelta",
    value: function () {
      return this.scroll.lines().reduce(function (t, e) {
        return t.concat(e.delta());
      }, new h.default());
    }
  }, {
    key: "getFormat",
    value: function (t, e = 0) {
      var n = [];
      var r = [];
      if (e === 0) {
        this.scroll.path(t).forEach(function (t) {
          var o = u(t, 1)[0];
          if (o instanceof w.default) {
            n.push(o);
          } else if (o instanceof v.default.Leaf) {
            r.push(o);
          }
        });
      } else {
        n = this.scroll.lines(t, exports);
        r = this.scroll.descendants(v.default.Leaf, t, exports);
      }
      var o = [n, r].map(function (t) {
        if (t.length === 0) {
          return {};
        }
        for (var e = (0, O.bubbleFormats)(t.shift()); Object.keys(e).length > 0;) {
          var n = t.shift();
          if (n == null) {
            return e;
          }
          e = l((0, O.bubbleFormats)(n), e);
        }
        return e;
      });
      return T.default.apply(T.default, o);
    }
  }, {
    key: "getText",
    value: function (t, e) {
      return this.getContents(t, e).filter(function (t) {
        return typeof t.insert == "string";
      }).map(function (t) {
        return t.insert;
      }).join("");
    }
  }, {
    key: "insertEmbed",
    value: function (t, e, n) {
      this.scroll.insertAt(t, e, n);
      return this.update(new h.default().retain(t).insert(function o(t, e, n) {
        if (e in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }({}, e, n)));
    }
  }, {
    key: "insertText",
    value: function (t, e) {
      var n = this;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      e = e.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
      this.scroll.insertAt(t, e);
      Object.keys(r).forEach(function (o) {
        n.scroll.formatAt(t, e.length, o, r[o]);
      });
      return this.update(new h.default().retain(t).insert(e, (0, N.default)(r)));
    }
  }, {
    key: "isBlank",
    value: function () {
      if (this.scroll.children.length == 0) {
        return true;
      }
      if (this.scroll.children.length > 1) {
        return false;
      }
      var t = this.scroll.children.head;
      return t.statics.blotName === w.default.blotName && !(t.children.length > 1) && t.children.head instanceof k.default;
    }
  }, {
    key: "removeFormat",
    value: function (t, e) {
      var n = this.getText(t, e);
      var r = this.scroll.line(t + e);
      var o = u(r, 2);
      var i = o[0];
      var l = o[1];
      var a = 0;
      var s = new h.default();
      if (i != null) {
        a = i instanceof g.default ? i.newlineIndex(l) - l + 1 : i.length() - l;
        s = i.delta().slice(l, l + a - 1).insert("\n");
      }
      var f = this.getContents(t, e + a).diff(new h.default().insert(n).concat(s));
      var p = new h.default().retain(t).concat(f);
      return this.applyDelta(p);
    }
  }, {
    key: "update",
    value: function (t, e = [], n = undefined) {
      var r = this.delta;
      if (e.length === 1 && e[0].type === "characterData" && e[0].target.data.match(P) && v.default.find(e[0].target)) {
        var o = v.default.find(e[0].target);
        var i = (0, O.bubbleFormats)(o);
        var l = o.offset(this.scroll);
        var a = e[0].oldValue.replace(_.default.CONTENTS, "");
        var s = new h.default().insert(a);
        var u = new h.default().insert(o.value());
        t = new h.default().retain(l).concat(s.diff(u, n)).reduce(function (t, e) {
          if (e.insert) {
            return t.insert(e.insert, i);
          } else {
            return t.push(e);
          }
        }, new h.default());
        this.delta = r.compose(t);
      } else {
        this.delta = this.getDelta();
        if (!t || !(0, A.default)(r.compose(t), this.delta)) {
          t = r.diff(this.delta, require);
        }
      }
      return t;
    }
  }]);
  return t;
}();
exports.default = S;