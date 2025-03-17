function r(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function o(t, e) {
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
  var n = document.createElement("a");
  n.href = t;
  var r = n.href.slice(0, n.href.indexOf(":"));
  return e.indexOf(r) > -1;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sanitize = exports.default = undefined;
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
var f = function (t) {
  function e() {
    r(this, e);
    return o(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  (function i(t, e) {
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
    key: "format",
    value: function (t, n) {
      if (t !== this.statics.blotName || !n) {
        return s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
      }
      n = this.constructor.sanitize(n);
      this.domNode.setAttribute("href", n);
    }
  }], [{
    key: "create",
    value: function (t) {
      var n = s(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t);
      t = this.sanitize(t);
      n.setAttribute("href", t);
      n.setAttribute("target", "_blank");
      return n;
    }
  }, {
    key: "formats",
    value: function (t) {
      return t.getAttribute("href");
    }
  }, {
    key: "sanitize",
    value: function (t) {
      if (l(t, this.PROTOCOL_WHITELIST)) {
        return t;
      } else {
        return this.SANITIZED_URL;
      }
    }
  }]);
  return e;
}(function (t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}(require("./5.js")).default);
f.blotName = "link";
f.tagName = "A";
f.SANITIZED_URL = "about:blank";
f.PROTOCOL_WHITELIST = ["http", "https", "mailto", "tel"];
exports.default = f;
exports.sanitize = l;