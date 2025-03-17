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
var c = r(require("./0.js"));
var h = r(require("./8.js"));
var p = "﻿";
var d = function (t) {
  function e(t) {
    (function o(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var n = function i(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t));
    n.contentNode = document.createElement("span");
    n.contentNode.setAttribute("contenteditable", false);
    [].slice.call(n.domNode.childNodes).forEach(function (t) {
      n.contentNode.appendChild(t);
    });
    n.leftGuard = document.createTextNode(p);
    n.rightGuard = document.createTextNode(p);
    n.domNode.appendChild(n.leftGuard);
    n.domNode.appendChild(n.contentNode);
    n.domNode.appendChild(n.rightGuard);
    return n;
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
    key: "index",
    value: function (t, n) {
      if (t === this.leftGuard) {
        return 0;
      } else if (t === this.rightGuard) {
        return 1;
      } else {
        return s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "index", this).call(this, t, n);
      }
    }
  }, {
    key: "restore",
    value: function (t) {
      var e = undefined;
      var n = undefined;
      var r = t.data.split(p).join("");
      if (t === this.leftGuard) {
        if (this.prev instanceof h.default) {
          var o = this.prev.length();
          this.prev.insertAt(o, r);
          e = {
            startNode: this.prev.domNode,
            startOffset: o + r.length
          };
        } else {
          n = document.createTextNode(r);
          this.parent.insertBefore(c.default.create(n), this);
          e = {
            startNode: n,
            startOffset: r.length
          };
        }
      } else if (t === this.rightGuard) {
        if (this.next instanceof h.default) {
          this.next.insertAt(0, r);
          e = {
            startNode: this.next.domNode,
            startOffset: r.length
          };
        } else {
          n = document.createTextNode(r);
          this.parent.insertBefore(c.default.create(n), this.next);
          e = {
            startNode: n,
            startOffset: r.length
          };
        }
      }
      t.data = p;
      return e;
    }
  }, {
    key: "update",
    value: function (t, e) {
      var n = this;
      t.forEach(function (t) {
        if (t.type === "characterData" && (t.target === n.leftGuard || t.target === n.rightGuard)) {
          var r = n.restore(t.target);
          if (r) {
            e.range = r;
          }
        }
      });
    }
  }]);
  return e;
}(c.default.Embed);
exports.default = d;