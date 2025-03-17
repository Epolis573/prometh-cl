function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function o(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function i(t, e) {
  if (!t) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  if (!e || typeof e != "object" && typeof e != "function") {
    return t;
  } else {
    return e;
  }
}
function l(t, e) {
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
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
function a(e, n) {
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
var s = function t(e, n, r) {
  if (e === null) {
    e = Function.prototype;
  }
  var o = Object.getOwnPropertyDescriptor(e, n);
  if (o === undefined) {
    var i = Object.getPrototypeOf(e);
    if (i === null) {
      return undefined;
    } else {
      return t(i, n, r);
    }
  }
  if ("value" in o) {
    return o.value;
  }
  var l = o.get;
  if (l !== undefined) {
    return l.call(r);
  } else {
    return undefined;
  }
};
var u = function () {
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
var f = r(require("./2.js"));
var p = r(require("./9.js"));
var d = require("./44.js");
var y = r(d);
var b = r(require("./15.js"));
var g = require("./22.js");
var _ = r(require("./26.js"));
var O = [[{
  header: ["1", "2", "3", false]
}], ["bold", "italic", "underline", "link"], [{
  list: "ordered"
}, {
  list: "bullet"
}], ["clean"]];
var w = function (t) {
  function e(t, n) {
    o(this, e);
    if (n.modules.toolbar != null && n.modules.toolbar.container == null) {
      n.modules.toolbar.container = O;
    }
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.quill.container.classList.add("ql-snow");
    return r;
  }
  l(e, t);
  u(e, [{
    key: "extendToolbar",
    value: function (t) {
      t.container.classList.add("ql-snow");
      this.buildButtons([].slice.call(t.container.querySelectorAll("button")), _.default);
      this.buildPickers([].slice.call(t.container.querySelectorAll("select")), _.default);
      this.tooltip = new x(this.quill, this.options.bounds);
      if (t.container.querySelector(".ql-link")) {
        this.quill.keyboard.addBinding({
          key: "K",
          shortKey: true
        }, function (e, n) {
          t.handlers.link.call(t, !n.format.link);
        });
      }
    }
  }]);
  return e;
}(y.default);
w.DEFAULTS = (0, f.default)(true, {}, y.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link: function (t) {
          if (t) {
            var e = this.quill.getSelection();
            if (e == null || e.length == 0) {
              return;
            }
            var n = this.quill.getText(e);
            if (/^\S+@\S+\.\S+$/.test(n) && n.indexOf("mailto:") !== 0) {
              n = "mailto:" + n;
            }
            this.quill.theme.tooltip.edit("link", n);
          } else {
            this.quill.format("link", false);
          }
        }
      }
    }
  }
});
var x = function (t) {
  function e(t, n) {
    o(this, e);
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.preview = r.root.querySelector("a.ql-preview");
    return r;
  }
  l(e, t);
  u(e, [{
    key: "listen",
    value: function () {
      var t = this;
      s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "listen", this).call(this);
      this.root.querySelector("a.ql-action").addEventListener("click", function (e) {
        if (t.root.classList.contains("ql-editing")) {
          t.save();
        } else {
          t.edit("link", t.preview.textContent);
        }
        e.preventDefault();
      });
      this.root.querySelector("a.ql-remove").addEventListener("click", function (e) {
        if (t.linkRange != null) {
          var n = t.linkRange;
          t.restoreFocus();
          t.quill.formatText(n, "link", false, p.default.sources.USER);
          delete t.linkRange;
        }
        e.preventDefault();
        t.hide();
      });
      this.quill.on(p.default.events.SELECTION_CHANGE, function (e, n, r) {
        if (e != null) {
          if (e.length === 0 && r === p.default.sources.USER) {
            var o = t.quill.scroll.descendant(b.default, e.index);
            var i = a(o, 2);
            var l = i[0];
            var s = i[1];
            if (l != null) {
              t.linkRange = new g.Range(e.index - s, l.length());
              var u = b.default.formats(l.domNode);
              t.preview.textContent = u;
              t.preview.setAttribute("href", u);
              t.show();
              t.position(t.quill.getBounds(t.linkRange));
              return;
            }
          } else {
            delete t.linkRange;
          }
          t.hide();
        }
      });
    }
  }, {
    key: "show",
    value: function () {
      s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "show", this).call(this);
      this.root.removeAttribute("data-mode");
    }
  }]);
  return e;
}(d.BaseTooltip);
x.TEMPLATE = ["<a class=\"ql-preview\" target=\"_blank\" href=\"about:blank\"></a>", "<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">", "<a class=\"ql-action\"></a>", "<a class=\"ql-remove\"></a>"].join("");
exports.default = w;