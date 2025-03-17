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
exports.default = exports.Code = undefined;
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
var f = r(require("./4.js"));
var p = r(require("./0.js"));
var y = r(require("./3.js"));
var b = r(require("./5.js"));
var m = r(require("./8.js"));
var _ = function (t) {
  function e() {
    o(this, e);
    return i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  l(e, t);
  return e;
}(b.default);
_.blotName = "code";
_.tagName = "CODE";
var O = function (t) {
  function e() {
    o(this, e);
    return i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  l(e, t);
  s(e, [{
    key: "delta",
    value: function () {
      var t = this;
      var e = this.domNode.textContent;
      if (e.endsWith("\n")) {
        e = e.slice(0, -1);
      }
      return e.split("\n").reduce(function (e, n) {
        return e.insert(n).insert("\n", t.formats());
      }, new f.default());
    }
  }, {
    key: "format",
    value: function (t, n) {
      if (t !== this.statics.blotName || !n) {
        var r = this.descendant(m.default, this.length() - 1);
        var i = a(r, 1)[0];
        if (i != null) {
          i.deleteAt(i.length() - 1, 1);
        }
        u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
      }
    }
  }, {
    key: "formatAt",
    value: function (t, n, r, o) {
      if (n !== 0 && p.default.query(r, p.default.Scope.BLOCK) != null && (r !== this.statics.blotName || o !== this.statics.formats(this.domNode))) {
        var i = this.newlineIndex(t);
        if (!(i < 0) && !(i >= t + n)) {
          var l = this.newlineIndex(t, true) + 1;
          var a = i - l + 1;
          var s = this.isolate(l, a);
          var u = s.next;
          s.format(r, o);
          if (u instanceof e) {
            u.formatAt(0, t - l + n - a, r, o);
          }
        }
      }
    }
  }, {
    key: "insertAt",
    value: function (t, e, n) {
      if (n == null) {
        var r = this.descendant(m.default, t);
        var o = a(r, 2);
        var i = o[0];
        var l = o[1];
        i.insertAt(l, e);
      }
    }
  }, {
    key: "length",
    value: function () {
      var t = this.domNode.textContent.length;
      if (this.domNode.textContent.endsWith("\n")) {
        return t;
      } else {
        return t + 1;
      }
    }
  }, {
    key: "newlineIndex",
    value: function (t) {
      if (arguments.length > 1 && arguments[1] !== undefined && arguments[1]) {
        return this.domNode.textContent.slice(0, t).lastIndexOf("\n");
      }
      var e = this.domNode.textContent.slice(t).indexOf("\n");
      if (e > -1) {
        return t + e;
      } else {
        return -1;
      }
    }
  }, {
    key: "optimize",
    value: function (t) {
      if (!this.domNode.textContent.endsWith("\n")) {
        this.appendChild(p.default.create("text", "\n"));
      }
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t);
      var n = this.next;
      if (n != null && n.prev === this && n.statics.blotName === this.statics.blotName && this.statics.formats(this.domNode) === n.statics.formats(n.domNode)) {
        n.optimize(t);
        n.moveChildren(this);
        n.remove();
      }
    }
  }, {
    key: "replace",
    value: function (t) {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replace", this).call(this, t);
      [].slice.call(this.domNode.querySelectorAll("*")).forEach(function (t) {
        var e = p.default.find(t);
        if (e == null) {
          t.parentNode.removeChild(t);
        } else if (e instanceof p.default.Embed) {
          e.remove();
        } else {
          e.unwrap();
        }
      });
    }
  }], [{
    key: "create",
    value: function (t) {
      var n = u(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t);
      n.setAttribute("spellcheck", false);
      return n;
    }
  }, {
    key: "formats",
    value: function () {
      return true;
    }
  }]);
  return e;
}(y.default);
O.blotName = "code-block";
O.tagName = "PRE";
O.TAB = "  ";
exports.Code = _;
exports.default = O;