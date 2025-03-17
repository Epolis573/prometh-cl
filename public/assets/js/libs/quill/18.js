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
var o = require("./11.js");
var i = require("./28.js");
var l = require("./17.js");
var a = require("./1.js");
var s = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    n.attributes = new i.default(n.domNode);
    return n;
  }
  r(e, t);
  e.formats = function (t) {
    return typeof this.tagName == "string" || (Array.isArray(this.tagName) ? t.tagName.toLowerCase() : undefined);
  };
  e.prototype.format = function (t, e) {
    var n = a.query(t);
    if (n instanceof o.default) {
      this.attributes.attribute(n, e);
    } else if (e) {
      if (n != null && (t !== this.statics.blotName || this.formats()[t] !== e)) {
        this.replaceWith(t, e);
      }
    }
  };
  e.prototype.formats = function () {
    var t = this.attributes.values();
    var e = this.statics.formats(this.domNode);
    if (e != null) {
      t[this.statics.blotName] = e;
    }
    return t;
  };
  e.prototype.replaceWith = function (e, n) {
    var r = t.prototype.replaceWith.call(this, e, n);
    this.attributes.copy(r);
    return r;
  };
  e.prototype.update = function (e, n) {
    var r = this;
    t.prototype.update.call(this, e, n);
    if (e.some(function (t) {
      return t.target === r.domNode && t.type === "attributes";
    })) {
      this.attributes.build();
    }
  };
  e.prototype.wrap = function (n, r) {
    var o = t.prototype.wrap.call(this, n, r);
    if (o instanceof e && o.statics.scope === this.statics.scope) {
      this.attributes.move(o);
    }
    return o;
  };
  return e;
}(l.default);
exports.default = s;