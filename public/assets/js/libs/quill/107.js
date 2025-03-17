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
exports.default = exports.BubbleTooltip = undefined;
var a = function t(e, n, r) {
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
var s = function () {
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
var c = r(require("../2.js"));
var h = r(require("../9.js"));
var p = require("../44.js");
var d = r(p);
var y = require("../22.js");
var b = r(require("../26.js"));
var g = [["bold", "italic", "link"], [{
  header: 1
}, {
  header: 2
}, "blockquote"]];
var m = function (t) {
  function e(t, n) {
    o(this, e);
    if (n.modules.toolbar != null && n.modules.toolbar.container == null) {
      n.modules.toolbar.container = g;
    }
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.quill.container.classList.add("ql-bubble");
    return r;
  }
  l(e, t);
  s(e, [{
    key: "extendToolbar",
    value: function (t) {
      this.tooltip = new _(this.quill, this.options.bounds);
      this.tooltip.root.appendChild(t.container);
      this.buildButtons([].slice.call(t.container.querySelectorAll("button")), b.default);
      this.buildPickers([].slice.call(t.container.querySelectorAll("select")), b.default);
    }
  }]);
  return e;
}(d.default);
m.DEFAULTS = (0, c.default)(true, {}, d.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        link: function (t) {
          if (t) {
            this.quill.theme.tooltip.edit();
          } else {
            this.quill.format("link", false);
          }
        }
      }
    }
  }
});
var _ = function (t) {
  function e(t, n) {
    o(this, e);
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.quill.on(h.default.events.EDITOR_CHANGE, function (t, e, n, o) {
      if (t === h.default.events.SELECTION_CHANGE) {
        if (e != null && e.length > 0 && o === h.default.sources.USER) {
          r.show();
          r.root.style.left = "0px";
          r.root.style.width = "";
          r.root.style.width = r.root.offsetWidth + "px";
          var i = r.quill.getLines(e.index, e.length);
          if (i.length === 1) {
            r.position(r.quill.getBounds(e));
          } else {
            var l = i[i.length - 1];
            var a = r.quill.getIndex(l);
            var s = Math.min(l.length() - 1, e.index + e.length - a);
            var u = r.quill.getBounds(new y.Range(a, s));
            r.position(u);
          }
        } else if (document.activeElement !== r.textbox && r.quill.hasFocus()) {
          r.hide();
        }
      }
    });
    return r;
  }
  l(e, t);
  s(e, [{
    key: "listen",
    value: function () {
      var t = this;
      a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "listen", this).call(this);
      this.root.querySelector(".ql-close").addEventListener("click", function () {
        t.root.classList.remove("ql-editing");
      });
      this.quill.on(h.default.events.SCROLL_OPTIMIZE, function () {
        setTimeout(function () {
          if (!t.root.classList.contains("ql-hidden")) {
            var e = t.quill.getSelection();
            if (e != null) {
              t.position(t.quill.getBounds(e));
            }
          }
        }, 1);
      });
    }
  }, {
    key: "cancel",
    value: function () {
      this.show();
    }
  }, {
    key: "position",
    value: function (t) {
      var n = a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "position", this).call(this, t);
      var r = this.root.querySelector(".ql-tooltip-arrow");
      r.style.marginLeft = "";
      if (n === 0) {
        return n;
      }
      r.style.marginLeft = n * -1 - r.offsetWidth / 2 + "px";
    }
  }]);
  return e;
}(p.BaseTooltip);
_.TEMPLATE = ["<span class=\"ql-tooltip-arrow\"></span>", "<div class=\"ql-tooltip-editor\">", "<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">", "<a class=\"ql-close\"></a>", "</div>"].join("");
exports.BubbleTooltip = _;
exports.default = m;