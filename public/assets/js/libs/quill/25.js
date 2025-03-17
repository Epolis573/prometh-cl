function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function o(t, e, n) {
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
}
function s(t, e) {
  var n;
  var r = t === D.keys.LEFT ? "prefix" : "suffix";
  o(n = {
    key: t,
    shiftKey: e,
    altKey: null
  }, r, /^$/);
  o(n, "handler", function (n) {
    var r = n.index;
    if (t === D.keys.RIGHT) {
      r += n.length + 1;
    }
    var o = this.quill.getLeaf(r);
    return !(b(o, 1)[0] instanceof T.default.Embed) || !(t === D.keys.LEFT ? e ? this.quill.setSelection(n.index - 1, n.length + 1, S.default.sources.USER) : this.quill.setSelection(n.index - 1, S.default.sources.USER) : e ? this.quill.setSelection(n.index, n.length + 1, S.default.sources.USER) : this.quill.setSelection(n.index + n.length + 1, S.default.sources.USER), 1);
  });
  return n;
}
function u(t, e) {
  if (t.index !== 0 && !(this.quill.getLength() <= 1)) {
    var n = this.quill.getLine(t.index);
    var o = b(n, 1)[0];
    var i = {};
    if (e.offset === 0) {
      var l = this.quill.getLine(t.index - 1);
      var s = b(l, 1)[0];
      if (s != null && s.length() > 1) {
        var u = o.formats();
        var c = this.quill.getFormat(t.index - 1, 1);
        i = A.default.attributes.diff(u, c) || {};
      }
    }
    var f = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1;
    this.quill.deleteText(t.index - f, f, S.default.sources.USER);
    if (Object.keys(i).length > 0) {
      this.quill.formatLine(t.index - f, f, i, S.default.sources.USER);
    }
    this.quill.focus();
  }
}
function c(t, e) {
  var n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1;
  if (!(t.index >= this.quill.getLength() - n)) {
    var r = {};
    var o = 0;
    var i = this.quill.getLine(t.index);
    var a = b(i, 1)[0];
    if (e.offset >= a.length() - 1) {
      var s = this.quill.getLine(t.index + 1);
      var c = b(s, 1)[0];
      if (c) {
        var f = a.formats();
        var h = this.quill.getFormat(t.index, 1);
        r = A.default.attributes.diff(f, h) || {};
        o = c.length();
      }
    }
    this.quill.deleteText(t.index, n, S.default.sources.USER);
    if (Object.keys(r).length > 0) {
      this.quill.formatLine(t.index + o - 1, n, r, S.default.sources.USER);
    }
  }
}
function f(t) {
  var e = this.quill.getLines(t);
  var n = {};
  if (e.length > 1) {
    var r = e[0].formats();
    var o = e[e.length - 1].formats();
    n = A.default.attributes.diff(o, r) || {};
  }
  this.quill.deleteText(t, S.default.sources.USER);
  if (Object.keys(n).length > 0) {
    this.quill.formatLine(t.index, 1, n, S.default.sources.USER);
  }
  this.quill.setSelection(t.index, S.default.sources.SILENT);
  this.quill.focus();
}
function h(t, e) {
  var n = this;
  if (t.length > 0) {
    this.quill.scroll.deleteAt(t.index, t.length);
  }
  var r = Object.keys(e.format).reduce(function (t, n) {
    if (T.default.query(n, T.default.Scope.BLOCK) && !Array.isArray(e.format[n])) {
      t[n] = e.format[n];
    }
    return t;
  }, {});
  this.quill.insertText(t.index, "\n", r, S.default.sources.USER);
  this.quill.setSelection(t.index + 1, S.default.sources.SILENT);
  this.quill.focus();
  Object.keys(e.format).forEach(function (t) {
    if (r[t] == null) {
      if (!Array.isArray(e.format[t])) {
        if (t !== "link") {
          n.quill.format(t, e.format[t], S.default.sources.USER);
        }
      }
    }
  });
}
function p(t) {
  return {
    key: D.keys.TAB,
    shiftKey: !t,
    format: {
      "code-block": true
    },
    handler: function (e) {
      var n = T.default.query("code-block");
      var r = e.index;
      var o = e.length;
      var i = this.quill.scroll.descendant(n, r);
      var l = b(i, 2);
      var a = l[0];
      var s = l[1];
      if (a != null) {
        var u = this.quill.getIndex(a);
        var c = a.newlineIndex(s, true) + 1;
        var f = a.newlineIndex(u + s + o);
        var h = a.domNode.textContent.slice(c, f).split("\n");
        s = 0;
        h.forEach(function (e, i) {
          if (t) {
            a.insertAt(c + s, n.TAB);
            s += n.TAB.length;
            if (i === 0) {
              r += n.TAB.length;
            } else {
              o += n.TAB.length;
            }
          } else if (e.startsWith(n.TAB)) {
            a.deleteAt(c + s, n.TAB.length);
            s -= n.TAB.length;
            if (i === 0) {
              r -= n.TAB.length;
            } else {
              o -= n.TAB.length;
            }
          }
          s += e.length + 1;
        });
        this.quill.update(S.default.sources.USER);
        this.quill.setSelection(r, o, S.default.sources.SILENT);
      }
    }
  };
}
function d(t) {
  return {
    key: t[0].toUpperCase(),
    shortKey: true,
    handler: function (e, n) {
      this.quill.format(t, !n.format[t], S.default.sources.USER);
    }
  };
}
function y(t) {
  if (typeof t == "string" || typeof t == "number") {
    return y({
      key: t
    });
  }
  if ((t === undefined ? "undefined" : v(t)) === "object") {
    t = (0, _.default)(t, false);
  }
  if (typeof t.key == "string") {
    if (D.keys[t.key.toUpperCase()] != null) {
      t.key = D.keys[t.key.toUpperCase()];
    } else {
      if (t.key.length !== 1) {
        return null;
      }
      t.key = t.key.toUpperCase().charCodeAt(0);
    }
  }
  if (t.shortKey) {
    t[B] = t.shortKey;
    delete t.shortKey;
  }
  return t;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SHORTKEY = exports.default = undefined;
var v = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
  return typeof t;
} : function (t) {
  if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
    return "symbol";
  } else {
    return typeof t;
  }
};
function b(e, n) {
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
var g = function () {
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
var _ = r(require("./21.js"));
var w = r(require("./12.js"));
var k = r(require("./2.js"));
var N = r(require("./4.js"));
var A = r(require("./20.js"));
var T = r(require("./0.js"));
var S = r(require("./6.js"));
var L = r(require("./10.js"));
var R = r(require("./7.js"));
var I = (0, L.default)("quill:keyboard");
var B = /Mac/i.test(navigator.platform) ? "metaKey" : "ctrlKey";
var D = function (t) {
  function e(t, n) {
    (function i(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var r = function l(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.bindings = {};
    Object.keys(r.options.bindings).forEach(function (e) {
      if ((e !== "list autofill" || t.scroll.whitelist == null || t.scroll.whitelist.list) && r.options.bindings[e]) {
        r.addBinding(r.options.bindings[e]);
      }
    });
    r.addBinding({
      key: e.keys.ENTER,
      shiftKey: null
    }, h);
    r.addBinding({
      key: e.keys.ENTER,
      metaKey: null,
      ctrlKey: null,
      altKey: null
    }, function () {});
    if (/Firefox/i.test(navigator.userAgent)) {
      r.addBinding({
        key: e.keys.BACKSPACE
      }, {
        collapsed: true
      }, u);
      r.addBinding({
        key: e.keys.DELETE
      }, {
        collapsed: true
      }, c);
    } else {
      r.addBinding({
        key: e.keys.BACKSPACE
      }, {
        collapsed: true,
        prefix: /^.?$/
      }, u);
      r.addBinding({
        key: e.keys.DELETE
      }, {
        collapsed: true,
        suffix: /^.?$/
      }, c);
    }
    r.addBinding({
      key: e.keys.BACKSPACE
    }, {
      collapsed: false
    }, f);
    r.addBinding({
      key: e.keys.DELETE
    }, {
      collapsed: false
    }, f);
    r.addBinding({
      key: e.keys.BACKSPACE,
      altKey: null,
      ctrlKey: null,
      metaKey: null,
      shiftKey: null
    }, {
      collapsed: true,
      offset: 0
    }, u);
    r.listen();
    return r;
  }
  (function a(t, e) {
    if (typeof e != "function" && e !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    }
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (e) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(t, e);
      } else {
        t.__proto__ = e;
      }
    }
  })(e, t);
  g(e, null, [{
    key: "match",
    value: function (t, e) {
      e = y(e);
      return !["altKey", "ctrlKey", "metaKey", "shiftKey"].some(function (n) {
        return !!e[n] !== t[n] && e[n] !== null;
      }) && e.key === (t.which || t.keyCode);
    }
  }]);
  g(e, [{
    key: "addBinding",
    value: function (t, e = {}, n = {}) {
      var r = y(t);
      if (r == null || r.key == null) {
        return I.warn("Attempted to add invalid keyboard binding", r);
      }
      if (typeof e == "function") {
        e = {
          handler: e
        };
      }
      if (typeof n == "function") {
        require = {
          handler: require
        };
      }
      r = (0, k.default)(r, e, n);
      this.bindings[r.key] = this.bindings[r.key] || [];
      this.bindings[r.key].push(r);
    }
  }, {
    key: "listen",
    value: function () {
      var t = this;
      this.quill.root.addEventListener("keydown", function (n) {
        if (!n.defaultPrevented) {
          var r = n.which || n.keyCode;
          var o = (t.bindings[r] || []).filter(function (t) {
            return e.match(n, t);
          });
          if (o.length !== 0) {
            var i = t.quill.getSelection();
            if (i != null && t.quill.hasFocus()) {
              var l = t.quill.getLine(i.index);
              var a = b(l, 2);
              var s = a[0];
              var u = a[1];
              var c = t.quill.getLeaf(i.index);
              var f = b(c, 2);
              var h = f[0];
              var p = f[1];
              var d = i.length === 0 ? [h, p] : t.quill.getLeaf(i.index + i.length);
              var y = b(d, 2);
              var g = y[0];
              var m = y[1];
              var _ = h instanceof T.default.Text ? h.value().slice(0, p) : "";
              var O = g instanceof T.default.Text ? g.value().slice(m) : "";
              var x = {
                collapsed: i.length === 0,
                empty: i.length === 0 && s.length() <= 1,
                format: t.quill.getFormat(i),
                offset: u,
                prefix: _,
                suffix: O
              };
              if (o.some(function (e) {
                if (e.collapsed != null && e.collapsed !== x.collapsed) {
                  return false;
                }
                if (e.empty != null && e.empty !== x.empty) {
                  return false;
                }
                if (e.offset != null && e.offset !== x.offset) {
                  return false;
                }
                if (Array.isArray(e.format)) {
                  if (e.format.every(function (t) {
                    return x.format[t] == null;
                  })) {
                    return false;
                  }
                } else if (v(e.format) === "object" && !Object.keys(e.format).every(function (t) {
                  if (e.format[t] === true) {
                    return x.format[t] != null;
                  } else if (e.format[t] === false) {
                    return x.format[t] == null;
                  } else {
                    return (0, w.default)(e.format[t], x.format[t]);
                  }
                })) {
                  return false;
                }
                return (e.prefix == null || !!e.prefix.test(x.prefix)) && (e.suffix == null || !!e.suffix.test(x.suffix)) && e.handler.call(t, i, x) !== true;
              })) {
                n.preventDefault();
              }
            }
          }
        }
      });
    }
  }]);
  return e;
}(R.default);
D.keys = {
  BACKSPACE: 8,
  TAB: 9,
  ENTER: 13,
  ESCAPE: 27,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  DELETE: 46
};
D.DEFAULTS = {
  bindings: {
    bold: d("bold"),
    italic: d("italic"),
    underline: d("underline"),
    indent: {
      key: D.keys.TAB,
      format: ["blockquote", "indent", "list"],
      handler: function (t, e) {
        if (e.collapsed && e.offset !== 0) {
          return true;
        }
        this.quill.format("indent", "+1", S.default.sources.USER);
      }
    },
    outdent: {
      key: D.keys.TAB,
      shiftKey: true,
      format: ["blockquote", "indent", "list"],
      handler: function (t, e) {
        if (e.collapsed && e.offset !== 0) {
          return true;
        }
        this.quill.format("indent", "-1", S.default.sources.USER);
      }
    },
    "outdent backspace": {
      key: D.keys.BACKSPACE,
      collapsed: true,
      shiftKey: null,
      metaKey: null,
      ctrlKey: null,
      altKey: null,
      format: ["indent", "list"],
      offset: 0,
      handler: function (t, e) {
        if (e.format.indent != null) {
          this.quill.format("indent", "-1", S.default.sources.USER);
        } else if (e.format.list != null) {
          this.quill.format("list", false, S.default.sources.USER);
        }
      }
    },
    "indent code-block": p(true),
    "outdent code-block": p(false),
    "remove tab": {
      key: D.keys.TAB,
      shiftKey: true,
      collapsed: true,
      prefix: /\t$/,
      handler: function (t) {
        this.quill.deleteText(t.index - 1, 1, S.default.sources.USER);
      }
    },
    tab: {
      key: D.keys.TAB,
      handler: function (t) {
        this.quill.history.cutoff();
        var e = new N.default().retain(t.index).delete(t.length).insert("\t");
        this.quill.updateContents(e, S.default.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(t.index + 1, S.default.sources.SILENT);
      }
    },
    "list empty enter": {
      key: D.keys.ENTER,
      collapsed: true,
      format: ["list"],
      empty: true,
      handler: function (t, e) {
        this.quill.format("list", false, S.default.sources.USER);
        if (e.format.indent) {
          this.quill.format("indent", false, S.default.sources.USER);
        }
      }
    },
    "checklist enter": {
      key: D.keys.ENTER,
      collapsed: true,
      format: {
        list: "checked"
      },
      handler: function (t) {
        var e = this.quill.getLine(t.index);
        var n = b(e, 2);
        var r = n[0];
        var o = n[1];
        var i = (0, k.default)({}, r.formats(), {
          list: "checked"
        });
        var l = new N.default().retain(t.index).insert("\n", i).retain(r.length() - o - 1).retain(1, {
          list: "unchecked"
        });
        this.quill.updateContents(l, S.default.sources.USER);
        this.quill.setSelection(t.index + 1, S.default.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    "header enter": {
      key: D.keys.ENTER,
      collapsed: true,
      format: ["header"],
      suffix: /^$/,
      handler: function (t, e) {
        var n = this.quill.getLine(t.index);
        var r = b(n, 2);
        var o = r[0];
        var i = r[1];
        var l = new N.default().retain(t.index).insert("\n", e.format).retain(o.length() - i - 1).retain(1, {
          header: null
        });
        this.quill.updateContents(l, S.default.sources.USER);
        this.quill.setSelection(t.index + 1, S.default.sources.SILENT);
        this.quill.scrollIntoView();
      }
    },
    "list autofill": {
      key: " ",
      collapsed: true,
      format: {
        list: false
      },
      prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
      handler: function (t, e) {
        var n = e.prefix.length;
        var r = this.quill.getLine(t.index);
        var o = b(r, 2);
        var i = o[0];
        var l = o[1];
        if (l > n) {
          return true;
        }
        var a = undefined;
        switch (e.prefix.trim()) {
          case "[]":
          case "[ ]":
            a = "unchecked";
            break;
          case "[x]":
            a = "checked";
            break;
          case "-":
          case "*":
            a = "bullet";
            break;
          default:
            a = "ordered";
        }
        this.quill.insertText(t.index, " ", S.default.sources.USER);
        this.quill.history.cutoff();
        var s = new N.default().retain(t.index - l).delete(n + 1).retain(i.length() - 2 - l).retain(1, {
          list: a
        });
        this.quill.updateContents(s, S.default.sources.USER);
        this.quill.history.cutoff();
        this.quill.setSelection(t.index - n, S.default.sources.SILENT);
      }
    },
    "code exit": {
      key: D.keys.ENTER,
      collapsed: true,
      format: ["code-block"],
      prefix: /\n\n$/,
      suffix: /^\s+$/,
      handler: function (t) {
        var e = this.quill.getLine(t.index);
        var n = b(e, 2);
        var r = n[0];
        var o = n[1];
        var i = new N.default().retain(t.index + r.length() - o - 2).retain(1, {
          "code-block": null
        }).delete(1);
        this.quill.updateContents(i, S.default.sources.USER);
      }
    },
    "embed left": s(D.keys.LEFT, false),
    "embed left shift": s(D.keys.LEFT, true),
    "embed right": s(D.keys.RIGHT, false),
    "embed right shift": s(D.keys.RIGHT, true)
  }
};
exports.default = D;
exports.SHORTKEY = B;