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
function a(t, e = {}) {
  if (t == null) {
    return exports;
  } else {
    if (typeof t.formats == "function") {
      exports = (0, f.default)(exports, t.formats());
    }
    if (t.parent == null || t.parent.blotName == "scroll" || t.parent.statics.scope !== t.statics.scope) {
      return exports;
    } else {
      return a(t.parent, exports);
    }
  }
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BlockEmbed = exports.bubbleFormats = undefined;
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
var u = function t(e, n, r) {
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
var f = r(require("./2.js"));
var p = r(require("./4.js"));
var y = r(require("./0.js"));
var b = r(require("./14.js"));
var m = r(require("./5.js"));
var O = r(require("./8.js"));
var w = function (t) {
  function e() {
    o(this, e);
    return i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  l(e, t);
  s(e, [{
    key: "attach",
    value: function () {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "attach", this).call(this);
      this.attributes = new y.default.Attributor.Store(this.domNode);
    }
  }, {
    key: "delta",
    value: function () {
      return new p.default().insert(this.value(), (0, f.default)(this.formats(), this.attributes.values()));
    }
  }, {
    key: "format",
    value: function (t, e) {
      var n = y.default.query(t, y.default.Scope.BLOCK_ATTRIBUTE);
      if (n != null) {
        this.attributes.attribute(n, e);
      }
    }
  }, {
    key: "formatAt",
    value: function (t, e, n, r) {
      this.format(n, r);
    }
  }, {
    key: "insertAt",
    value: function (t, n, r) {
      if (typeof n == "string" && n.endsWith("\n")) {
        var o = y.default.create(x.blotName);
        this.parent.insertBefore(o, t === 0 ? this : this.next);
        o.insertAt(0, n.slice(0, -1));
      } else {
        u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, t, n, r);
      }
    }
  }]);
  return e;
}(y.default.Embed);
w.scope = y.default.Scope.BLOCK_BLOT;
var x = function (t) {
  function e(t) {
    o(this, e);
    var n = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
    n.cache = {};
    return n;
  }
  l(e, t);
  s(e, [{
    key: "delta",
    value: function () {
      if (this.cache.delta == null) {
        this.cache.delta = this.descendants(y.default.Leaf).reduce(function (t, e) {
          if (e.length() === 0) {
            return t;
          } else {
            return t.insert(e.value(), a(e));
          }
        }, new p.default()).insert("\n", a(this));
      }
      return this.cache.delta;
    }
  }, {
    key: "deleteAt",
    value: function (t, n) {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "deleteAt", this).call(this, t, n);
      this.cache = {};
    }
  }, {
    key: "formatAt",
    value: function (t, n, r, o) {
      if (!(n <= 0)) {
        if (y.default.query(r, y.default.Scope.BLOCK)) {
          if (t + n === this.length()) {
            this.format(r, o);
          }
        } else {
          u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "formatAt", this).call(this, t, Math.min(n, this.length() - t - 1), r, o);
        }
        this.cache = {};
      }
    }
  }, {
    key: "insertAt",
    value: function (t, n, r) {
      if (r != null) {
        return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, t, n, r);
      }
      if (n.length !== 0) {
        var o = n.split("\n");
        var i = o.shift();
        if (i.length > 0) {
          if (t < this.length() - 1 || this.children.tail == null) {
            u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertAt", this).call(this, Math.min(t, this.length() - 1), i);
          } else {
            this.children.tail.insertAt(this.children.tail.length(), i);
          }
          this.cache = {};
        }
        var l = this;
        o.reduce(function (t, e) {
          (l = l.split(t, true)).insertAt(0, e);
          return e.length;
        }, t + i.length);
      }
    }
  }, {
    key: "insertBefore",
    value: function (t, n) {
      var r = this.children.head;
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertBefore", this).call(this, t, n);
      if (r instanceof b.default) {
        r.remove();
      }
      this.cache = {};
    }
  }, {
    key: "length",
    value: function () {
      if (this.cache.length == null) {
        this.cache.length = u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "length", this).call(this) + 1;
      }
      return this.cache.length;
    }
  }, {
    key: "moveChildren",
    value: function (t, n) {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "moveChildren", this).call(this, t, n);
      this.cache = {};
    }
  }, {
    key: "optimize",
    value: function (t) {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t);
      this.cache = {};
    }
  }, {
    key: "path",
    value: function (t) {
      return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "path", this).call(this, t, true);
    }
  }, {
    key: "removeChild",
    value: function (t) {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "removeChild", this).call(this, t);
      this.cache = {};
    }
  }, {
    key: "split",
    value: function (t, n = false) {
      if (n && (t === 0 || t >= this.length() - 1)) {
        var r = this.clone();
        if (t === 0) {
          this.parent.insertBefore(r, this);
          return this;
        } else {
          this.parent.insertBefore(r, this.next);
          return r;
        }
      }
      var o = u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "split", this).call(this, t, n);
      this.cache = {};
      return o;
    }
  }]);
  return e;
}(y.default.Block);
x.blotName = "block";
x.tagName = "P";
x.defaultChild = "break";
x.allowedChildren = [m.default, y.default.Embed, O.default];
exports.bubbleFormats = a;
exports.BlockEmbed = w;
exports.default = x;