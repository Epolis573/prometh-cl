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
var c = function (t) {
  function e(t, n) {
    (function r(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var i = function o(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
    i.label.innerHTML = n;
    i.container.classList.add("ql-color-picker");
    [].slice.call(i.container.querySelectorAll(".ql-picker-item"), 0, 7).forEach(function (t) {
      t.classList.add("ql-primary");
    });
    return i;
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
    key: "buildItem",
    value: function (t) {
      var n = a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "buildItem", this).call(this, t);
      n.style.backgroundColor = t.getAttribute("value") || "";
      return n;
    }
  }, {
    key: "selectItem",
    value: function (t, n) {
      a(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "selectItem", this).call(this, t, n);
      var r = this.label.querySelector(".ql-color-label");
      var o = t && t.getAttribute("data-value") || "";
      if (r) {
        if (r.tagName === "line") {
          r.style.stroke = o;
        } else {
          r.style.fill = o;
        }
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
}(require("./16.js")).default);
exports.default = c;