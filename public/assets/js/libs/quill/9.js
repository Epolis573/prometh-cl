function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
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
var c = r(require("./58.js"));
var p = (0, r(require("./10.js")).default)("quill:events");
["selectionchange", "mousedown", "mouseup", "click"].forEach(function (t) {
  document.addEventListener(t, function () {
    for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) {
      e[n] = arguments[n];
    }
    [].slice.call(document.querySelectorAll(".ql-container")).forEach(function (t) {
      var n;
      if (t.__quill && t.__quill.emitter) {
        (n = t.__quill.emitter).handleDOM.apply(n, e);
      }
    });
  });
});
var d = function (t) {
  function e() {
    (function o(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var t = function i(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
    t.listeners = {};
    t.on("error", p.error);
    return t;
  }
  (function l(t, e) {
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
  a(e, [{
    key: "emit",
    value: function () {
      p.log.apply(p, arguments);
      s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "emit", this).apply(this, arguments);
    }
  }, {
    key: "handleDOM",
    value: function (t) {
      for (var e = arguments.length, n = Array(e > 1 ? e - 1 : 0), r = 1; r < e; r++) {
        n[r - 1] = arguments[r];
      }
      (this.listeners[t.type] || []).forEach(function (e) {
        var r = e.node;
        var o = e.handler;
        if (t.target === r || r.contains(t.target)) {
          o.apply(undefined, [t].concat(n));
        }
      });
    }
  }, {
    key: "listenDOM",
    value: function (t, e, n) {
      this.listeners[t] ||= [];
      this.listeners[t].push({
        node: e,
        handler: n
      });
    }
  }]);
  return e;
}(c.default);
d.events = {
  EDITOR_CHANGE: "editor-change",
  SCROLL_BEFORE_UPDATE: "scroll-before-update",
  SCROLL_OPTIMIZE: "scroll-optimize",
  SCROLL_UPDATE: "scroll-update",
  SELECTION_CHANGE: "selection-change",
  TEXT_CHANGE: "text-change"
};
d.sources = {
  API: "api",
  SILENT: "silent",
  USER: "user"
};
exports.default = d;