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
var o = require("./19.js");
var i = require("./1.js");
var l = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    n.text = n.statics.value(n.domNode);
    return n;
  }
  r(e, t);
  e.create = function (t) {
    return document.createTextNode(t);
  };
  e.value = function (t) {
    var e = t.data;
    if (e.normalize) {
      e = e.normalize();
    }
    return e;
  };
  e.prototype.deleteAt = function (t, e) {
    this.domNode.data = this.text = this.text.slice(0, t) + this.text.slice(t + e);
  };
  e.prototype.index = function (t, e) {
    if (this.domNode === t) {
      return e;
    } else {
      return -1;
    }
  };
  e.prototype.insertAt = function (e, n, r) {
    if (r == null) {
      this.text = this.text.slice(0, e) + n + this.text.slice(e);
      this.domNode.data = this.text;
    } else {
      t.prototype.insertAt.call(this, e, n, r);
    }
  };
  e.prototype.length = function () {
    return this.text.length;
  };
  e.prototype.optimize = function (n) {
    t.prototype.optimize.call(this, n);
    this.text = this.statics.value(this.domNode);
    if (this.text.length === 0) {
      this.remove();
    } else if (this.next instanceof e && this.next.prev === this) {
      this.insertAt(this.length(), this.next.value());
      this.next.remove();
    }
  };
  e.prototype.position = function (t, e = false) {
    return [this.domNode, t];
  };
  e.prototype.split = function (t, e = false) {
    if (!e) {
      if (t === 0) {
        return this;
      }
      if (t === this.length()) {
        return this.next;
      }
    }
    var n = i.create(this.domNode.splitText(t));
    this.parent.insertBefore(n, this.next);
    this.text = this.statics.value(this.domNode);
    return n;
  };
  e.prototype.update = function (t, e) {
    var n = this;
    if (t.some(function (t) {
      return t.type === "characterData" && t.target === n.domNode;
    })) {
      this.text = this.statics.value(this.domNode);
    }
  };
  e.prototype.value = function () {
    return this.text;
  };
  e.blotName = "text";
  e.scope = i.Scope.INLINE_BLOT;
  return e;
}(o.default);
exports.default = l;