var r = this && this.__extends || function () {
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
var o = require("./18.js");
var i = require("./1.js");
var l = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  r(e, t);
  e.formats = function (n) {
    var r = i.query(e.blotName).tagName;
    if (n.tagName !== r) {
      return t.formats.call(this, n);
    }
  };
  e.prototype.format = function (n, r) {
    if (i.query(n, i.Scope.BLOCK) != null) {
      if (n !== this.statics.blotName || r) {
        t.prototype.format.call(this, n, r);
      } else {
        this.replaceWith(e.blotName);
      }
    }
  };
  e.prototype.formatAt = function (e, n, r, o) {
    if (i.query(r, i.Scope.BLOCK) != null) {
      this.format(r, o);
    } else {
      t.prototype.formatAt.call(this, e, n, r, o);
    }
  };
  e.prototype.insertAt = function (e, n, r) {
    if (r == null || i.query(n, i.Scope.INLINE) != null) {
      t.prototype.insertAt.call(this, e, n, r);
    } else {
      var o = this.split(e);
      var l = i.create(n, r);
      o.parent.insertBefore(l, o);
    }
  };
  e.prototype.update = function (e, n) {
    if (navigator.userAgent.match(/Trident/)) {
      this.build();
    } else {
      t.prototype.update.call(this, e, n);
    }
  };
  e.blotName = "block";
  e.scope = i.Scope.BLOCK_BLOT;
  e.tagName = "P";
  return e;
}(o.default);
exports.default = l;