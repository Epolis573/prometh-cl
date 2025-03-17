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
exports.default = exports.CodeToken = exports.CodeBlock = undefined;
var a = function () {
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
var c = r(require("./0.js"));
var h = r(require("./6.js"));
var d = r(require("./7.js"));
var b = function (t) {
  function e() {
    o(this, e);
    return i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  l(e, t);
  a(e, [{
    key: "replaceWith",
    value: function (t) {
      this.domNode.textContent = this.domNode.textContent;
      this.attach();
      s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replaceWith", this).call(this, t);
    }
  }, {
    key: "highlight",
    value: function (t) {
      var e = this.domNode.textContent;
      if (this.cachedText !== e) {
        if (e.trim().length > 0 || this.cachedText == null) {
          this.domNode.innerHTML = t(e);
          this.domNode.normalize();
          this.attach();
        }
        this.cachedText = e;
      }
    }
  }]);
  return e;
}(r(require("./13.js")).default);
b.className = "ql-syntax";
var g = new c.default.Attributor.Class("token", "hljs", {
  scope: c.default.Scope.INLINE
});
var m = function (t) {
  function e(t, n) {
    o(this, e);
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    if (typeof r.options.highlight != "function") {
      throw new Error("Syntax module requires highlight.js. Please include the library on the page before Quill.");
    }
    var l = null;
    r.quill.on(h.default.events.SCROLL_OPTIMIZE, function () {
      clearTimeout(l);
      l = setTimeout(function () {
        r.highlight();
        l = null;
      }, r.options.interval);
    });
    r.highlight();
    return r;
  }
  l(e, t);
  a(e, null, [{
    key: "register",
    value: function () {
      h.default.register(g, true);
      h.default.register(b, true);
    }
  }]);
  a(e, [{
    key: "highlight",
    value: function () {
      var t = this;
      if (!this.quill.selection.composing) {
        this.quill.update(h.default.sources.USER);
        var e = this.quill.getSelection();
        this.quill.scroll.descendants(b).forEach(function (e) {
          e.highlight(t.options.highlight);
        });
        this.quill.update(h.default.sources.SILENT);
        if (e != null) {
          this.quill.setSelection(e, h.default.sources.SILENT);
        }
      }
    }
  }]);
  return e;
}(d.default);
m.DEFAULTS = {
  highlight: window.hljs == null ? null : function (t) {
    return window.hljs.highlightAuto(t).value;
  },
  interval: 1000
};
exports.CodeBlock = b;
exports.CodeToken = g;
exports.default = m;