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
var o = require("./27.js");
var i = require("./1.js");
var l = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  r(e, t);
  e.value = function (t) {
    return true;
  };
  e.prototype.index = function (t, e) {
    if (this.domNode === t || this.domNode.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      return Math.min(e, 1);
    } else {
      return -1;
    }
  };
  e.prototype.position = function (t, e) {
    var n = [].indexOf.call(this.parent.domNode.childNodes, this.domNode);
    if (t > 0) {
      n += 1;
    }
    return [this.parent.domNode, n];
  };
  e.prototype.value = function () {
    (t = {})[this.statics.blotName] = this.statics.value(this.domNode) || true;
    return t;
    var t;
  };
  e.scope = i.Scope.INLINE_BLOT;
  return e;
}(o.default);
exports.default = l;