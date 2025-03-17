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
var f = r(require("./0.js"));
var p = r(require("./8.js"));
var d = function (t) {
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
    r.selection = n;
    r.textNode = document.createTextNode(e.CONTENTS);
    r.domNode.appendChild(r.textNode);
    r._length = 0;
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
  u(e, null, [{
    key: "value",
    value: function () {}
  }]);
  u(e, [{
    key: "detach",
    value: function () {
      if (this.parent != null) {
        this.parent.removeChild(this);
      }
    }
  }, {
    key: "format",
    value: function (t, n) {
      if (this._length !== 0) {
        return s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "format", this).call(this, t, n);
      }
      for (var r = this, o = 0; r != null && r.statics.scope !== f.default.Scope.BLOCK_BLOT;) {
        o += r.offset(r.parent);
        r = r.parent;
      }
      if (r != null) {
        this._length = e.CONTENTS.length;
        r.optimize();
        r.formatAt(o, e.CONTENTS.length, t, n);
        this._length = 0;
      }
    }
  }, {
    key: "index",
    value: function (t, n) {
      if (t === this.textNode) {
        return 0;
      } else {
        return s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "index", this).call(this, t, n);
      }
    }
  }, {
    key: "length",
    value: function () {
      return this._length;
    }
  }, {
    key: "position",
    value: function () {
      return [this.textNode, this.textNode.data.length];
    }
  }, {
    key: "remove",
    value: function () {
      s(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "remove", this).call(this);
      this.parent = null;
    }
  }, {
    key: "restore",
    value: function () {
      if (!this.selection.composing && this.parent != null) {
        var t = this.textNode;
        var n = this.selection.getNativeRange();
        var r = undefined;
        var o = undefined;
        var i = undefined;
        if (n != null && n.start.node === t && n.end.node === t) {
          var l = [t, n.start.offset, n.end.offset];
          r = l[0];
          o = l[1];
          i = l[2];
        }
        while (this.domNode.lastChild != null && this.domNode.lastChild !== this.textNode) {
          this.domNode.parentNode.insertBefore(this.domNode.lastChild, this.domNode);
        }
        if (this.textNode.data !== e.CONTENTS) {
          var s = this.textNode.data.split(e.CONTENTS).join("");
          if (this.next instanceof p.default) {
            r = this.next.domNode;
            this.next.insertAt(0, s);
            this.textNode.data = e.CONTENTS;
          } else {
            this.textNode.data = s;
            this.parent.insertBefore(f.default.create(this.textNode), this);
            this.textNode = document.createTextNode(e.CONTENTS);
            this.domNode.appendChild(this.textNode);
          }
        }
        this.remove();
        if (o != null) {
          var u = [o, i].map(function (t) {
            return Math.max(0, Math.min(r.data.length, t - 1));
          });
          var c = a(u, 2);
          o = c[0];
          i = c[1];
          return {
            startNode: r,
            startOffset: o,
            endNode: r,
            endOffset: i
          };
        }
      }
    }
  }, {
    key: "update",
    value: function (t, e) {
      var n = this;
      if (t.some(function (t) {
        return t.type === "characterData" && t.target === n.textNode;
      })) {
        var r = this.restore();
        if (r) {
          e.range = r;
        }
      }
    }
  }, {
    key: "value",
    value: function () {
      return "";
    }
  }]);
  return e;
}(f.default.Embed);
d.blotName = "cursor";
d.className = "ql-cursor";
d.tagName = "span";
d.CONTENTS = "﻿";
exports.default = d;