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
exports.default = exports.FormulaBlot = undefined;
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
var c = r(require("./33.js"));
var h = r(require("./6.js"));
var d = r(require("./7.js"));
var y = function (t) {
  function e() {
    o(this, e);
    return i(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  l(e, t);
  a(e, null, [{
    key: "create",
    value: function (t) {
      var n = s(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, t);
      if (typeof t == "string") {
        window.katex.render(t, n, {
          throwOnError: false,
          errorColor: "#f00"
        });
        n.setAttribute("data-value", t);
      }
      return n;
    }
  }, {
    key: "value",
    value: function (t) {
      return t.getAttribute("data-value");
    }
  }]);
  return e;
}(c.default);
y.blotName = "formula";
y.className = "ql-formula";
y.tagName = "SPAN";
var v = function (t) {
  function e() {
    o(this, e);
    var t = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
    if (window.katex == null) {
      throw new Error("Formula module requires KaTeX.");
    }
    return t;
  }
  l(e, t);
  a(e, null, [{
    key: "register",
    value: function () {
      h.default.register(y, true);
    }
  }]);
  return e;
}(d.default);
exports.FormulaBlot = y;
exports.default = v;