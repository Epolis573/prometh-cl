function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function i(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function l(t, e) {
  if (!t) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  if (!e || typeof e != "object" && typeof e != "function") {
    return t;
  } else {
    return e;
  }
}
function a(t, e) {
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
exports.default = exports.ListItem = undefined;
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
var f = r(require("./0.js"));
var p = r(require("./3.js"));
var y = r(require("./23.js"));
var v = function (t) {
  function e() {
    i(this, e);
    return l(this, (e.__proto__ || Object.getPrototypeOf(e)).apply(this, arguments));
  }
  a(e, t);
  s(e, [{
    key: "format",
    value: function (t, n) {
      if (t !== b.blotName || n) {
        u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
      } else {
        this.replaceWith(f.default.create(this.statics.scope));
      }
    }
  }, {
    key: "remove",
    value: function () {
      if (this.prev == null && this.next == null) {
        this.parent.remove();
      } else {
        u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "remove", this).call(this);
      }
    }
  }, {
    key: "replaceWith",
    value: function (t, n) {
      this.parent.isolate(this.offset(this.parent), this.length());
      if (t === this.parent.statics.blotName) {
        this.parent.replaceWith(t, n);
        return this;
      } else {
        this.parent.unwrap();
        return u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replaceWith", this).call(this, t, n);
      }
    }
  }], [{
    key: "formats",
    value: function (t) {
      if (t.tagName === this.tagName) {
        return undefined;
      } else {
        return u(e.__proto__ || Object.getPrototypeOf(e), "formats", this).call(this, t);
      }
    }
  }]);
  return e;
}(p.default);
v.blotName = "list-item";
v.tagName = "LI";
var b = function (t) {
  function e(t) {
    i(this, e);
    var n = l(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
    function r(e) {
      if (e.target.parentNode === t) {
        var r = n.statics.formats(t);
        var o = f.default.find(e.target);
        if (r === "checked") {
          o.format("list", "unchecked");
        } else if (r === "unchecked") {
          o.format("list", "checked");
        }
      }
    }
    t.addEventListener("touchstart", r);
    t.addEventListener("mousedown", r);
    return n;
  }
  a(e, t);
  s(e, null, [{
    key: "create",
    value: function (t) {
      var n = t === "ordered" ? "OL" : "UL";
      var r = u(e.__proto__ || Object.getPrototypeOf(e), "create", this).call(this, n);
      if (t === "checked" || t === "unchecked") {
        r.setAttribute("data-checked", t === "checked");
      }
      return r;
    }
  }, {
    key: "formats",
    value: function (t) {
      if (t.tagName === "OL") {
        return "ordered";
      } else if (t.tagName === "UL") {
        if (t.hasAttribute("data-checked")) {
          if (t.getAttribute("data-checked") === "true") {
            return "checked";
          } else {
            return "unchecked";
          }
        } else {
          return "bullet";
        }
      } else {
        return undefined;
      }
    }
  }]);
  s(e, [{
    key: "format",
    value: function (t, e) {
      if (this.children.length > 0) {
        this.children.tail.format(t, e);
      }
    }
  }, {
    key: "formats",
    value: function () {
      return function o(t, e, n) {
        if (e in t) {
          Object.defineProperty(t, e, {
            value: n,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          t[e] = n;
        }
        return t;
      }({}, this.statics.blotName, this.statics.formats(this.domNode));
    }
  }, {
    key: "insertBefore",
    value: function (t, n) {
      if (t instanceof v) {
        u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "insertBefore", this).call(this, t, n);
      } else {
        var r = n == null ? this.length() : n.offset(this);
        var o = this.split(r);
        o.parent.insertBefore(t, o);
      }
    }
  }, {
    key: "optimize",
    value: function (t) {
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "optimize", this).call(this, t);
      var n = this.next;
      if (n != null && n.prev === this && n.statics.blotName === this.statics.blotName && n.domNode.tagName === this.domNode.tagName && n.domNode.getAttribute("data-checked") === this.domNode.getAttribute("data-checked")) {
        n.moveChildren(this);
        n.remove();
      }
    }
  }, {
    key: "replace",
    value: function (t) {
      if (t.statics.blotName !== this.statics.blotName) {
        var n = f.default.create(this.statics.defaultChild);
        t.moveChildren(n);
        this.appendChild(n);
      }
      u(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "replace", this).call(this, t);
    }
  }]);
  return e;
}(y.default);
b.blotName = "list";
b.scope = f.default.Scope.BLOCK_BLOT;
b.tagName = ["OL", "UL"];
b.defaultChild = "list-item";
b.allowedChildren = [v];
exports.ListItem = v;
exports.default = b;