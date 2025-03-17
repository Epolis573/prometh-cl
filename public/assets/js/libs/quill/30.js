function r(t) {
  var e = t.split("-");
  var n = e.slice(1).map(function (t) {
    return t[0].toUpperCase() + t.slice(1);
  }).join("");
  return e[0] + n;
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
    return (t.getAttribute("style") || "").split(";").map(function (t) {
      return t.split(":")[0].trim();
    });
  };
  e.prototype.add = function (t, e) {
    return !!this.canAdd(t, e) && (t.style[r(this.keyName)] = e, true);
  };
  e.prototype.remove = function (t) {
    t.style[r(this.keyName)] = "";
    if (!t.getAttribute("style")) {
      t.removeAttribute("style");
    }
  };
  e.prototype.value = function (t) {
    var e = t.style[r(this.keyName)];
    if (this.canAdd(t, e)) {
      return e;
    } else {
      return "";
    }
  };
  return e;
}(require("./11.js").default);
exports.default = l;