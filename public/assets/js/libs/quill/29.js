function r(t, e) {
  return (t.getAttribute("class") || "").split(/\s+/).filter(function (t) {
    return t.indexOf(e + "-") === 0;
  });
}
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
var l = function (t) {
  function e() {
    return t !== null && t.apply(this, arguments) || this;
  }
  o(e, t);
  e.keys = function (t) {
    return (t.getAttribute("class") || "").split(/\s+/).map(function (t) {
      return t.split("-").slice(0, -1).join("-");
    });
  };
  e.prototype.add = function (t, e) {
    return !!this.canAdd(t, e) && (this.remove(t), t.classList.add(this.keyName + "-" + e), true);
  };
  e.prototype.remove = function (t) {
    r(t, this.keyName).forEach(function (e) {
      t.classList.remove(e);
    });
    if (t.classList.length === 0) {
      t.removeAttribute("class");
    }
  };
  e.prototype.value = function (t) {
    var n = (r(t, this.keyName)[0] || "").slice(this.keyName.length + 1);
    if (this.canAdd(t, n)) {
      return n;
    } else {
      return "";
    }
  };
  return e;
}(require("./11.js").default);
exports.default = l;