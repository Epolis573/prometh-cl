function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function a(t) {
  return t instanceof v.default || t instanceof y.BlockEmbed;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
function s(e, n) {
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
var c = function t(e, n, r) {
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
var h = r(require("./0.js"));
var d = r(require("./9.js"));
var y = require("./3.js");
var v = r(y);
var g = r(require("./14.js"));
var _ = r(require("./13.js"));
var w = r(require("./23.js"));
var x = function (t) {
  function e(t, n) {
    (function o(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var r = function i(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
    r.emitter = n.emitter;
    if (Array.isArray(n.whitelist)) {
      r.whitelist = n.whitelist.reduce(function (t, e) {
        t[e] = true;
        return t;
      }, {});
    }
    r.domNode.addEventListener("DOMNodeInserted", function () {});
    r.optimize();
    r.enable();
    return r;
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
  u(e, [{
    key: "batchStart",
    value: function () {
      this.batch = true;
    }
  }, {
    key: "batchEnd",
    value: function () {
      this.batch = false;
      this.optimize();
    }
  }, {
    key: "deleteAt",
    value: function (t, n) {
      var r = this.line(t);
      var o = s(r, 2);
      var i = o[0];
      var l = o[1];
      var a = this.line(t + n);
      var f = s(a, 1)[0];
      c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "deleteAt", this).call(this, t, n);
      if (f != null && i !== f && l > 0) {
        if (i instanceof y.BlockEmbed || f instanceof y.BlockEmbed) {
          this.optimize();
          return;
        }
        if (i instanceof _.default) {
          var h = i.newlineIndex(i.length(), true);
          if (h > -1 && (i = i.split(h + 1)) === f) {
            this.optimize();
            return;
          }
        } else if (f instanceof _.default) {
          var p = f.newlineIndex(0);
          if (p > -1) {
            f.split(p + 1);
          }
        }
        var d = f.children.head instanceof g.default ? null : f.children.head;
        i.moveChildren(f, d);
        i.remove();
      }
      this.optimize();
    }
  }, {
    key: "enable",
    value: function () {
      var t = !(arguments.length > 0) || arguments[0] === undefined || arguments[0];
      this.domNode.setAttribute("contenteditable", t);
    }
  }, {
    key: "formatAt",
    value: function (t, n, r, o) {
      if (this.whitelist == null || this.whitelist[r]) {
        c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "formatAt", this).call(this, t, n, r, o);
        this.optimize();
      }
    }
  }, {
    key: "insertAt",
    value: function (t, n, r) {
      if (r == null || this.whitelist == null || this.whitelist[n]) {
        if (t >= this.length()) {
          if (r == null || h.default.query(n, h.default.Scope.BLOCK) == null) {
            var o = h.default.create(this.statics.defaultChild);
            this.appendChild(o);
            if (r == null && n.endsWith("\n")) {
              n = n.slice(0, -1);
            }
            o.insertAt(0, n, r);
          } else {
            var i = h.default.create(n, r);
            this.appendChild(i);
          }
        } else {
          c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, t, n, r);
        }
        this.optimize();
      }
    }
  }, {
    key: "insertBefore",
    value: function (t, n) {
      if (t.statics.scope === h.default.Scope.INLINE_BLOT) {
        var r = h.default.create(this.statics.defaultChild);
        r.appendChild(t);
        t = r;
      }
      c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertBefore", this).call(this, t, n);
    }
  }, {
    key: "leaf",
    value: function (t) {
      return this.path(t).pop() || [null, -1];
    }
  }, {
    key: "line",
    value: function (t) {
      if (t === this.length()) {
        return this.line(t - 1);
      } else {
        return this.descendant(a, t);
      }
    }
  }, {
    key: "lines",
    value: function (t = 0, e = Number.MAX_VALUE) {
      return function t(e, n, r) {
        var o = [];
        var i = r;
        e.children.forEachAt(n, r, function (e, n, r) {
          if (a(e)) {
            o.push(e);
          } else if (e instanceof h.default.Container) {
            o = o.concat(t(e, n, i));
          }
          i -= r;
        });
        return o;
      }(this, t, e);
    }
  }, {
    key: "optimize",
    value: function (t = [], n = {}) {
      if (this.batch !== true) {
        c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t, require);
        if (t.length > 0) {
          this.emitter.emit(d.default.events.SCROLL_OPTIMIZE, t, require);
        }
      }
    }
  }, {
    key: "path",
    value: function (t) {
      return c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "path", this).call(this, t).slice(1);
    }
  }, {
    key: "update",
    value: function (t) {
      if (this.batch !== true) {
        var n = d.default.sources.USER;
        if (typeof t == "string") {
          n = t;
        }
        if (!Array.isArray(t)) {
          t = this.observer.takeRecords();
        }
        if (t.length > 0) {
          this.emitter.emit(d.default.events.SCROLL_BEFORE_UPDATE, n, t);
        }
        c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "update", this).call(this, t.concat([]));
        if (t.length > 0) {
          this.emitter.emit(d.default.events.SCROLL_UPDATE, n, t);
        }
      }
    }
  }]);
  return e;
}(h.default.Scroll);
x.blotName = "scroll";
x.className = "ql-editor";
x.tagName = "DIV";
x.defaultChild = "block";
x.allowedChildren = [v.default, y.BlockEmbed, w.default];
exports.default = x;