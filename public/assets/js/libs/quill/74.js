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
  if (!t) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  if (!e || typeof e != "object" && typeof e != "function") {
    return t;
  } else {
    return e;
  }
}
function s(t, e, n) {
  var r = document.createElement("button");
  r.setAttribute("type", "button");
  r.classList.add("ql-" + e);
  if (n != null) {
    r.value = n;
  }
  t.appendChild(r);
}
function u(t, e) {
  if (!Array.isArray(e[0])) {
    e = [e];
  }
  e.forEach(function (e) {
    var n = document.createElement("span");
    n.classList.add("ql-formats");
    e.forEach(function (t) {
      if (typeof t == "string") {
        s(n, t);
      } else {
        var e = Object.keys(t)[0];
        var r = t[e];
        if (Array.isArray(r)) {
          (function c(t, e, n) {
            var r = document.createElement("select");
            r.classList.add("ql-" + e);
            n.forEach(function (t) {
              var e = document.createElement("option");
              if (t !== false) {
                e.setAttribute("value", t);
              } else {
                e.setAttribute("selected", "selected");
              }
              r.appendChild(e);
            });
            t.appendChild(r);
          })(n, e, r);
        } else {
          s(n, e, r);
        }
      }
    });
    t.appendChild(n);
  });
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addControls = exports.default = undefined;
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
var d = r(require("./4.js"));
var v = r(require("./0.js"));
var g = r(require("./6.js"));
var _ = r(require("./10.js"));
var w = r(require("./7.js"));
var x = (0, _.default)("quill:toolbar");
var k = function (t) {
  function e(t, n) {
    (function i(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var a;
    var r = l(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    if (Array.isArray(r.options.container)) {
      var o = document.createElement("div");
      u(o, r.options.container);
      t.container.parentNode.insertBefore(o, t.container);
      r.container = o;
    } else if (typeof r.options.container == "string") {
      r.container = document.querySelector(r.options.container);
    } else {
      r.container = r.options.container;
    }
    if (r.container instanceof HTMLElement) {
      r.container.classList.add("ql-toolbar");
      r.controls = [];
      r.handlers = {};
      Object.keys(r.options.handlers).forEach(function (t) {
        r.addHandler(t, r.options.handlers[t]);
      });
      [].forEach.call(r.container.querySelectorAll("button, select"), function (t) {
        r.attach(t);
      });
      r.quill.on(g.default.events.EDITOR_CHANGE, function (t, e) {
        if (t === g.default.events.SELECTION_CHANGE) {
          r.update(e);
        }
      });
      r.quill.on(g.default.events.SCROLL_OPTIMIZE, function () {
        var t = r.quill.selection.getRange();
        var n = f(t, 1)[0];
        r.update(n);
      });
      return r;
    } else {
      a = x.error("Container required for toolbar", r.options);
      return l(r, a);
    }
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
  h(e, [{
    key: "addHandler",
    value: function (t, e) {
      this.handlers[t] = e;
    }
  }, {
    key: "attach",
    value: function (t) {
      var e = this;
      var n = [].find.call(t.classList, function (t) {
        return t.indexOf("ql-") === 0;
      });
      if (n) {
        n = n.slice("ql-".length);
        if (t.tagName === "BUTTON") {
          t.setAttribute("type", "button");
        }
        if (this.handlers[n] == null) {
          if (this.quill.scroll.whitelist != null && this.quill.scroll.whitelist[n] == null) {
            x.warn("ignoring attaching to disabled format", n, t);
            return;
          }
          if (v.default.query(n) == null) {
            x.warn("ignoring attaching to nonexistent format", n, t);
            return;
          }
        }
        var r = t.tagName === "SELECT" ? "change" : "click";
        t.addEventListener(r, function (r) {
          var i = undefined;
          if (t.tagName === "SELECT") {
            if (t.selectedIndex < 0) {
              return;
            }
            var l = t.options[t.selectedIndex];
            i = !l.hasAttribute("selected") && (l.value || false);
          } else {
            i = !t.classList.contains("ql-active") && (t.value || !t.hasAttribute("value"));
            r.preventDefault();
          }
          e.quill.focus();
          var a = e.quill.selection.getRange();
          var u = f(a, 1)[0];
          if (e.handlers[n] != null) {
            e.handlers[n].call(e, i);
          } else if (v.default.query(n).prototype instanceof v.default.Embed) {
            if (!(i = prompt("Enter " + n))) {
              return;
            }
            e.quill.updateContents(new d.default().retain(u.index).delete(u.length).insert(function o(t, e, n) {
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
            }({}, n, i)), g.default.sources.USER);
          } else {
            e.quill.format(n, i, g.default.sources.USER);
          }
          e.update(u);
        });
        this.controls.push([n, t]);
      }
    }
  }, {
    key: "update",
    value: function (t) {
      var e = t == null ? {} : this.quill.getFormat(t);
      this.controls.forEach(function (n) {
        var r = f(n, 2);
        var o = r[0];
        var i = r[1];
        if (i.tagName === "SELECT") {
          var l = undefined;
          if (t == null) {
            l = null;
          } else if (e[o] == null) {
            l = i.querySelector("option[selected]");
          } else if (!Array.isArray(e[o])) {
            var a = e[o];
            if (typeof a == "string") {
              a = a.replace(/\"/g, "\\\"");
            }
            l = i.querySelector("option[value=\"" + a + "\"]");
          }
          if (l == null) {
            i.value = "";
            i.selectedIndex = -1;
          } else {
            l.selected = true;
          }
        } else if (t == null) {
          i.classList.remove("ql-active");
        } else if (i.hasAttribute("value")) {
          var s = e[o] === i.getAttribute("value") || e[o] != null && e[o].toString() === i.getAttribute("value") || e[o] == null && !i.getAttribute("value");
          i.classList.toggle("ql-active", s);
        } else {
          i.classList.toggle("ql-active", e[o] != null);
        }
      });
    }
  }]);
  return e;
}(w.default);
k.DEFAULTS = {};
k.DEFAULTS = {
  container: null,
  handlers: {
    clean: function () {
      var t = this;
      var e = this.quill.getSelection();
      if (e != null) {
        if (e.length == 0) {
          var n = this.quill.getFormat();
          Object.keys(n).forEach(function (e) {
            if (v.default.query(e, v.default.Scope.INLINE) != null) {
              t.quill.format(e, false);
            }
          });
        } else {
          this.quill.removeFormat(e, g.default.sources.USER);
        }
      }
    },
    direction: function (t) {
      var e = this.quill.getFormat().align;
      if (t === "rtl" && e == null) {
        this.quill.format("align", "right", g.default.sources.USER);
      } else if (!t && e === "right") {
        this.quill.format("align", false, g.default.sources.USER);
      }
      this.quill.format("direction", t, g.default.sources.USER);
    },
    indent: function (t) {
      var e = this.quill.getSelection();
      var n = this.quill.getFormat(e);
      var r = parseInt(n.indent || 0);
      if (t === "+1" || t === "-1") {
        var o = t === "+1" ? 1 : -1;
        if (n.direction === "rtl") {
          o *= -1;
        }
        this.quill.format("indent", r + o, g.default.sources.USER);
      }
    },
    link: function (t) {
      if (t === true) {
        t = prompt("Enter link URL:");
      }
      this.quill.format("link", t, g.default.sources.USER);
    },
    list: function (t) {
      var e = this.quill.getSelection();
      var n = this.quill.getFormat(e);
      if (t === "check") {
        if (n.list === "checked" || n.list === "unchecked") {
          this.quill.format("list", false, g.default.sources.USER);
        } else {
          this.quill.format("list", "unchecked", g.default.sources.USER);
        }
      } else {
        this.quill.format("list", t, g.default.sources.USER);
      }
    }
  }
};
exports.default = k;
exports.addControls = u;