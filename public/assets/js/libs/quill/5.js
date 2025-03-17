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
var c = r(require("./8.js"));
var h = r(require("./0.js"));
var p = function (t) {
  function e() {
    o(this, e);
    return i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
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
    key: "formatAt",
    value: function (t, n, r, o) {
      if (e.compare(this.statics.blotName, r) < 0 && h.default.query(r, h.default.Scope.BLOT)) {
        var i = this.isolate(t, n);
        if (o) {
          i.wrap(r, o);
        }
      } else {
        s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "formatAt", this).call(this, t, n, r, o);
      }
    }
  }, {
    key: "optimize",
    value: function (t) {
      s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t);
      if (this.parent instanceof e && e.compare(this.statics.blotName, this.parent.statics.blotName) > 0) {
        var n = this.parent.isolate(this.offset(), this.length());
        this.moveChildren(n);
        n.wrap(this);
      }
    }
  }], [{
    key: "compare",
    value: function (t, n) {
      var r = e.order.indexOf(t);
      var o = e.order.indexOf(n);
      if (r >= 0 || o >= 0) {
        return r - o;
      } else if (t === n) {
        return 0;
      } else if (t < n) {
        return -1;
      } else {
        return 1;
      }
    }
  }]);
  return e;
}(h.default.Inline);
p.allowedChildren = [p, h.default.Embed, c.default];
p.order = ["cursor", "inline", "underline", "strike", "italic", "bold", "script", "link", "code"];
exports.default = p;