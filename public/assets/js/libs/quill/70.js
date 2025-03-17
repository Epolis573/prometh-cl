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
Object.defineProperty(exports, "__esModule", {
  value: true
});
var l = function () {
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
var u = function (t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}(require("./0.js"));
var c = require("./15.js");
var f = ["alt", "height", "width"];
var h = function (t) {
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
  l(e, [{
    key: "format",
    value: function (t, n) {
      if (f.indexOf(t) > -1) {
        if (n) {
          this.domNode.setAttribute(t, n);
        } else {
          this.domNode.removeAttribute(t);
        }
      } else {
        a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
      }
    }
  }], [{
    key: "create",
    value: function (t) {
      var n = a(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t);
      if (typeof t == "string") {
        n.setAttribute("src", this.sanitize(t));
      }
      return n;
    }
  }, {
    key: "formats",
    value: function (t) {
      return f.reduce(function (e, n) {
        if (t.hasAttribute(n)) {
          e[n] = t.getAttribute(n);
        }
        return e;
      }, {});
    }
  }, {
    key: "match",
    value: function (t) {
      return /\.(jpe?g|gif|png)$/.test(t) || /^data:image\/.+;base64/.test(t);
    }
  }, {
    key: "sanitize",
    value: function (t) {
      if ((0, c.sanitize)(t, ["http", "https", "data"])) {
        return t;
      } else {
        return "//:0";
      }
    }
  }, {
    key: "value",
    value: function (t) {
      return t.getAttribute("src");
    }
  }]);
  return e;
}(u.default.Embed);
h.blotName = "image";
h.tagName = "IMG";
exports.default = h;