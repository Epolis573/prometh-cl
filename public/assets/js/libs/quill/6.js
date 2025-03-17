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
function i(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function l(t, e) {
  if ((e = (0, N.default)(true, {
    container: t,
    modules: {
      clipboard: true,
      keyboard: true,
      history: true
    }
  }, e)).theme && e.theme !== S.DEFAULTS.theme) {
    e.theme = S.import("themes/" + e.theme);
    if (e.theme == null) {
      throw new Error("Invalid theme " + e.theme + ". Did you register it?");
    }
  } else {
    e.theme = T.default;
  }
  var n = (0, N.default)(true, {}, e.theme.DEFAULTS);
  [n, e].forEach(function (t) {
    t.modules = t.modules || {};
    Object.keys(t.modules).forEach(function (e) {
      if (t.modules[e] === true) {
        t.modules[e] = {};
      }
    });
  });
  var o = Object.keys(n.modules).concat(Object.keys(e.modules)).reduce(function (t, e) {
    var n = S.import("modules/" + e);
    if (n == null) {
      P.error("Cannot load " + e + " module. Are you sure you registered it?");
    } else {
      t[e] = n.DEFAULTS || {};
    }
    return t;
  }, {});
  if (e.modules != null && e.modules.toolbar && e.modules.toolbar.constructor !== Object) {
    e.modules.toolbar = {
      container: e.modules.toolbar
    };
  }
  e = (0, N.default)(true, {}, S.DEFAULTS, {
    modules: o
  }, n, e);
  ["bounds", "container", "scrollingContainer"].forEach(function (t) {
    if (typeof e[t] == "string") {
      e[t] = document.querySelector(e[t]);
    }
  });
  e.modules = Object.keys(e.modules).reduce(function (t, n) {
    if (e.modules[n]) {
      t[n] = e.modules[n];
    }
    return t;
  }, {});
  return e;
}
function a(t, e, n, r) {
  if (this.options.strict && !this.isEnabled() && e === g.default.sources.USER) {
    return new d.default();
  }
  var o = n == null ? null : this.getSelection();
  var i = this.editor.delta;
  var l = t();
  if (o != null) {
    if (n === true) {
      n = o.index;
    }
    if (r == null) {
      o = u(o, l, e);
    } else if (r !== 0) {
      o = u(o, n, r, e);
    }
    this.setSelection(o, g.default.sources.SILENT);
  }
  if (l.length() > 0) {
    var a;
    var c;
    var s = [g.default.events.TEXT_CHANGE, l, i, e];
    (a = this.emitter).emit.apply(a, [g.default.events.EDITOR_CHANGE].concat(s));
    if (e !== g.default.sources.SILENT) {
      (c = this.emitter).emit.apply(c, s);
    }
  }
  return l;
}
function s(t, e, n, r, o) {
  var i = {};
  if (typeof t.index == "number" && typeof t.length == "number") {
    if (typeof e != "number") {
      o = r;
      r = n;
      n = e;
      e = t.length;
      t = t.index;
    } else {
      e = t.length;
      t = t.index;
    }
  } else if (typeof e != "number") {
    o = r;
    r = n;
    n = e;
    e = 0;
  }
  if ((n === undefined ? "undefined" : c(n)) === "object") {
    i = n;
    o = r;
  } else if (typeof n == "string") {
    if (r != null) {
      i[n] = r;
    } else {
      o = n;
    }
  }
  return [t, e, i, o = o || g.default.sources.API];
}
function u(t, e, n, r) {
  if (t == null) {
    return null;
  }
  var o = undefined;
  var i = undefined;
  if (e instanceof d.default) {
    var l = [t.index, t.index + t.length].map(function (t) {
      return e.transformPosition(t, r !== g.default.sources.USER);
    });
    var a = f(l, 2);
    o = a[0];
    i = a[1];
  } else {
    var s = [t.index, t.index + t.length].map(function (t) {
      if (t < e || t === e && r === g.default.sources.USER) {
        return t;
      } else if (n >= 0) {
        return t + n;
      } else {
        return Math.max(e, t + n);
      }
    });
    var u = f(s, 2);
    o = u[0];
    i = u[1];
  }
  return new x.Range(o, i - o);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.overload = exports.expandConfig = undefined;
var c = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
  return typeof t;
} : function (t) {
  if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
    return "symbol";
  } else {
    return typeof t;
  }
};
function f(e, n) {
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
var h = function () {
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
require("./53.js");
var d = r(require("./4.js"));
var v = r(require("./57.js"));
var g = r(require("./9.js"));
var _ = r(require("./7.js"));
var w = r(require("./0.js"));
var x = require("./22.js");
var k = r(x);
var N = r(require("./2.js"));
var A = r(require("./10.js"));
var T = r(require("./32.js"));
var P = (0, A.default)("quill");
var S = function () {
  function t(e) {
    var n = this;
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    i(this, t);
    this.options = l(e, r);
    this.container = this.options.container;
    if (this.container == null) {
      return P.error("Invalid Quill container", e);
    }
    if (this.options.debug) {
      t.debug(this.options.debug);
    }
    var o = this.container.innerHTML.trim();
    this.container.classList.add("ql-container");
    this.container.innerHTML = "";
    this.container.__quill = this;
    this.root = this.addContainer("ql-editor");
    this.root.classList.add("ql-blank");
    this.root.setAttribute("data-gramm", false);
    this.scrollingContainer = this.options.scrollingContainer || this.root;
    this.emitter = new g.default();
    this.scroll = w.default.create(this.root, {
      emitter: this.emitter,
      whitelist: this.options.formats
    });
    this.editor = new v.default(this.scroll);
    this.selection = new k.default(this.scroll, this.emitter);
    this.theme = new this.options.theme(this, this.options);
    this.keyboard = this.theme.addModule("keyboard");
    this.clipboard = this.theme.addModule("clipboard");
    this.history = this.theme.addModule("history");
    this.theme.init();
    this.emitter.on(g.default.events.EDITOR_CHANGE, function (t) {
      if (t === g.default.events.TEXT_CHANGE) {
        n.root.classList.toggle("ql-blank", n.editor.isBlank());
      }
    });
    this.emitter.on(g.default.events.SCROLL_UPDATE, function (t, e) {
      var r = n.selection.lastRange;
      var o = r && r.length === 0 ? r.index : undefined;
      a.call(n, function () {
        return n.editor.update(null, e, o);
      }, t);
    });
    var s = this.clipboard.convert("<div class='ql-editor' style=\"white-space: normal;\">" + o + "<p><br></p></div>");
    this.setContents(s);
    this.history.clear();
    if (this.options.placeholder) {
      this.root.setAttribute("data-placeholder", this.options.placeholder);
    }
    if (this.options.readOnly) {
      this.disable();
    }
  }
  h(t, null, [{
    key: "debug",
    value: function (t) {
      if (t === true) {
        t = "log";
      }
      A.default.level(t);
    }
  }, {
    key: "find",
    value: function (t) {
      return t.__quill || w.default.find(t);
    }
  }, {
    key: "import",
    value: function (t) {
      if (this.imports[t] == null) {
        P.error("Cannot import " + t + ". Are you sure it was registered?");
      }
      return this.imports[t];
    }
  }, {
    key: "register",
    value: function (t, e) {
      var n = this;
      var r = arguments.length > 2 && arguments[2] !== undefined && arguments[2];
      if (typeof t != "string") {
        var o = t.attrName || t.blotName;
        if (typeof o == "string") {
          this.register("formats/" + o, t, e);
        } else {
          Object.keys(t).forEach(function (r) {
            n.register(r, t[r], e);
          });
        }
      } else {
        if (this.imports[t] != null && !r) {
          P.warn("Overwriting " + t + " with", e);
        }
        this.imports[t] = e;
        if ((t.startsWith("blots/") || t.startsWith("formats/")) && e.blotName !== "abstract") {
          w.default.register(e);
        } else if (t.startsWith("modules") && typeof e.register == "function") {
          e.register();
        }
      }
    }
  }]);
  h(t, [{
    key: "addContainer",
    value: function (t, e = null) {
      if (typeof t == "string") {
        var n = t;
        (t = document.createElement("div")).classList.add(n);
      }
      this.container.insertBefore(t, e);
      return t;
    }
  }, {
    key: "blur",
    value: function () {
      this.selection.setRange(null);
    }
  }, {
    key: "deleteText",
    value: function (t, e, n) {
      var r = this;
      var o = s(t, e, n);
      var i = f(o, 4);
      t = i[0];
      e = i[1];
      n = i[3];
      return a.call(this, function () {
        return r.editor.deleteText(t, e);
      }, n, t, e * -1);
    }
  }, {
    key: "disable",
    value: function () {
      this.enable(false);
    }
  }, {
    key: "enable",
    value: function () {
      var t = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
      this.scroll.enable(t);
      this.container.classList.toggle("ql-disabled", !t);
    }
  }, {
    key: "focus",
    value: function () {
      var t = this.scrollingContainer.scrollTop;
      this.selection.focus();
      this.scrollingContainer.scrollTop = t;
      this.scrollIntoView();
    }
  }, {
    key: "format",
    value: function (t, e) {
      var n = this;
      var r = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : g.default.sources.API;
      return a.call(this, function () {
        var r = n.getSelection(true);
        var i = new d.default();
        if (r == null) {
          return i;
        }
        if (w.default.query(t, w.default.Scope.BLOCK)) {
          i = n.editor.formatLine(r.index, r.length, o({}, t, e));
        } else {
          if (r.length === 0) {
            n.selection.format(t, e);
            return i;
          }
          i = n.editor.formatText(r.index, r.length, o({}, t, e));
        }
        n.setSelection(r, g.default.sources.SILENT);
        return i;
      }, r);
    }
  }, {
    key: "formatLine",
    value: function (t, e, n, r, o) {
      var l;
      var i = this;
      var u = s(t, e, n, r, o);
      var c = f(u, 4);
      t = c[0];
      e = c[1];
      l = c[2];
      o = c[3];
      return a.call(this, function () {
        return i.editor.formatLine(t, e, l);
      }, o, t, 0);
    }
  }, {
    key: "formatText",
    value: function (t, e, n, r, o) {
      var l;
      var i = this;
      var u = s(t, e, n, r, o);
      var c = f(u, 4);
      t = c[0];
      e = c[1];
      l = c[2];
      o = c[3];
      return a.call(this, function () {
        return i.editor.formatText(t, e, l);
      }, o, t, 0);
    }
  }, {
    key: "getBounds",
    value: function (t, e = 0) {
      var n = undefined;
      n = typeof t == "number" ? this.selection.getBounds(t, e) : this.selection.getBounds(t.index, t.length);
      var r = this.container.getBoundingClientRect();
      return {
        bottom: n.bottom - r.top,
        height: n.height,
        left: n.left - r.left,
        right: n.right - r.left,
        top: n.top - r.top,
        width: n.width
      };
    }
  }, {
    key: "getContents",
    value: function (t = 0, e = this.getLength() - t) {
      var n = s(t, e);
      var r = f(n, 2);
      t = r[0];
      e = r[1];
      return this.editor.getContents(t, e);
    }
  }, {
    key: "getFormat",
    value: function (t = this.getSelection(true), e = 0) {
      if (typeof t == "number") {
        return this.editor.getFormat(t, exports);
      } else {
        return this.editor.getFormat(t.index, t.length);
      }
    }
  }, {
    key: "getIndex",
    value: function (t) {
      return t.offset(this.scroll);
    }
  }, {
    key: "getLength",
    value: function () {
      return this.scroll.length();
    }
  }, {
    key: "getLeaf",
    value: function (t) {
      return this.scroll.leaf(t);
    }
  }, {
    key: "getLine",
    value: function (t) {
      return this.scroll.line(t);
    }
  }, {
    key: "getLines",
    value: function (t = 0, e = Number.MAX_VALUE) {
      if (typeof t != "number") {
        return this.scroll.lines(t.index, t.length);
      } else {
        return this.scroll.lines(t, exports);
      }
    }
  }, {
    key: "getModule",
    value: function (t) {
      return this.theme.modules[t];
    }
  }, {
    key: "getSelection",
    value: function () {
      if (arguments.length > 0 && arguments[0] !== undefined && arguments[0]) {
        this.focus();
      }
      this.update();
      return this.selection.getRange()[0];
    }
  }, {
    key: "getText",
    value: function (t = 0, e = this.getLength() - t) {
      var n = s(t, e);
      var r = f(n, 2);
      t = r[0];
      e = r[1];
      return this.editor.getText(t, e);
    }
  }, {
    key: "hasFocus",
    value: function () {
      return this.selection.hasFocus();
    }
  }, {
    key: "insertEmbed",
    value: function (e, n, r) {
      var o = this;
      var i = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : t.sources.API;
      return a.call(this, function () {
        return o.editor.insertEmbed(e, n, r);
      }, i, e);
    }
  }, {
    key: "insertText",
    value: function (t, e, n, r, o) {
      var l;
      var i = this;
      var u = s(t, 0, n, r, o);
      var c = f(u, 4);
      t = c[0];
      l = c[2];
      o = c[3];
      return a.call(this, function () {
        return i.editor.insertText(t, e, l);
      }, o, t, e.length);
    }
  }, {
    key: "isEnabled",
    value: function () {
      return !this.container.classList.contains("ql-disabled");
    }
  }, {
    key: "off",
    value: function () {
      return this.emitter.off.apply(this.emitter, arguments);
    }
  }, {
    key: "on",
    value: function () {
      return this.emitter.on.apply(this.emitter, arguments);
    }
  }, {
    key: "once",
    value: function () {
      return this.emitter.once.apply(this.emitter, arguments);
    }
  }, {
    key: "pasteHTML",
    value: function (t, e, n) {
      this.clipboard.dangerouslyPasteHTML(t, e, n);
    }
  }, {
    key: "removeFormat",
    value: function (t, e, n) {
      var r = this;
      var o = s(t, e, n);
      var i = f(o, 4);
      t = i[0];
      e = i[1];
      n = i[3];
      return a.call(this, function () {
        return r.editor.removeFormat(t, e);
      }, n, t);
    }
  }, {
    key: "scrollIntoView",
    value: function () {
      this.selection.scrollIntoView(this.scrollingContainer);
    }
  }, {
    key: "setContents",
    value: function (t) {
      var e = this;
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g.default.sources.API;
      return a.call(this, function () {
        t = new d.default(t);
        var n = e.getLength();
        var r = e.editor.deleteText(0, n);
        var o = e.editor.applyDelta(t);
        var i = o.ops[o.ops.length - 1];
        if (i != null && typeof i.insert == "string" && i.insert[i.insert.length - 1] === "\n") {
          e.editor.deleteText(e.getLength() - 1, 1);
          o.delete(1);
        }
        return r.compose(o);
      }, n);
    }
  }, {
    key: "setSelection",
    value: function (e, n, r) {
      if (e == null) {
        this.selection.setRange(null, n || t.sources.API);
      } else {
        var o = s(e, n, r);
        var i = f(o, 4);
        e = i[0];
        n = i[1];
        r = i[3];
        this.selection.setRange(new x.Range(e, n), r);
        if (r !== g.default.sources.SILENT) {
          this.selection.scrollIntoView(this.scrollingContainer);
        }
      }
    }
  }, {
    key: "setText",
    value: function (t, e = g.default.sources.API) {
      var n = new d.default().insert(t);
      return this.setContents(n, e);
    }
  }, {
    key: "update",
    value: function (t = g.default.sources.USER) {
      var e = this.scroll.update(t);
      this.selection.update(t);
      return e;
    }
  }, {
    key: "updateContents",
    value: function (t) {
      var e = this;
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : g.default.sources.API;
      return a.call(this, function () {
        t = new d.default(t);
        return e.editor.applyDelta(t, n);
      }, n, true);
    }
  }]);
  return t;
}();
S.DEFAULTS = {
  bounds: null,
  formats: null,
  modules: {},
  placeholder: "",
  readOnly: false,
  scrollingContainer: null,
  strict: true,
  theme: "default"
};
S.events = g.default.events;
S.sources = g.default.sources;
S.version = "1.3.6";
S.imports = {
  delta: d.default,
  parchment: w.default,
  "core/module": _.default,
  "core/theme": T.default
};
exports.expandConfig = l;
exports.overload = s;
exports.default = S;