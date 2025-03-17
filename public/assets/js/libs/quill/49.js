var o = this && this.__extends || function () {
  var t = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (t, e) {
    t.__proto__ = e;
  } || function (t, e) {
    for (var n in e) {
      if (e.hasOwnProperty(n)) {
        t[n] = e[n];
      }
    }
  };
  return function (e, n) {
    function r() {
      this.constructor = e;
    }
    t(e, n);
    e.prototype = n === null ? Object.create(n) : (r.prototype = n.prototype, new r());
  };
}();
Object.defineProperty(exports, "__esModule", {
  value: true
});
var i = require("./18.js");
var l = require("./1.js");
var a = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  o(e, t);
  e.formats = function (n) {
    if (n.tagName !== e.tagName) {
      return t.formats.call(this, n);
    }
  };
  e.prototype.format = function (n, r) {
    var o = this;
    if (n !== this.statics.blotName || r) {
      t.prototype.format.call(this, n, r);
    } else {
      this.children.forEach(function (t) {
        if (!(t instanceof i.default)) {
          t = t.wrap(e.blotName, true);
        }
        o.attributes.copy(t);
      });
      this.unwrap();
    }
  };
  e.prototype.formatAt = function (e, n, r, o) {
    if (this.formats()[r] != null || l.query(r, l.Scope.ATTRIBUTE)) {
      this.isolate(e, n).format(r, o);
    } else {
      t.prototype.formatAt.call(this, e, n, r, o);
    }
  };
  e.prototype.optimize = function (n) {
    t.prototype.optimize.call(this, n);
    var o = this.formats();
    if (Object.keys(o).length === 0) {
      return this.unwrap();
    }
    var i = this.next;
    if (i instanceof e && i.prev === this && function r(t, e) {
      if (Object.keys(t).length !== Object.keys(e).length) {
        return false;
      }
      for (var n in t) {
        if (t[n] !== e[n]) {
          return false;
        }
      }
      return true;
    }(o, i.formats())) {
      i.moveChildren(this);
      i.remove();
    }
  };
  e.blotName = "inline";
  e.scope = l.Scope.INLINE_BLOT;
  e.tagName = "SPAN";
  return e;
}(i.default);
exports.default = a;