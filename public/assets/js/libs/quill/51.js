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
var i = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  r(e, t);
  e.formats = function (t) {};
  e.prototype.format = function (e, n) {
    t.prototype.formatAt.call(this, 0, this.length(), e, n);
  };
  e.prototype.formatAt = function (e, n, r, o) {
    if (e === 0 && n === this.length()) {
      this.format(r, o);
    } else {
      t.prototype.formatAt.call(this, e, n, r, o);
    }
  };
  e.prototype.formats = function () {
    return this.statics.formats(this.domNode);
  };
  return e;
}(require("./19.js").default);
exports.default = i;