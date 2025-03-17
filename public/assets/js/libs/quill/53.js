var r = document.createElement("div");
r.classList.toggle("test-class", false);
if (r.classList.contains("test-class")) {
  var o = DOMTokenList.prototype.toggle;
  DOMTokenList.prototype.toggle = function (t, e) {
    if (arguments.length > 1 && !this.contains(t) == !e) {
      return e;
    } else {
      return o.call(this, t);
    }
  };
}
String.prototype.startsWith ||= function (t, e) {
  e = e || 0;
  return this.substr(e, t.length) === t;
};
String.prototype.endsWith ||= function (t, e) {
  var n = this.toString();
  if (typeof e != "number" || !isFinite(e) || Math.floor(e) !== e || e > n.length) {
    e = n.length;
  }
  e -= t.length;
  var r = n.indexOf(t, e);
  return r !== -1 && r === e;
};
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, "find", {
    value: function (t) {
      if (this === null) {
        throw new TypeError("Array.prototype.find called on null or undefined");
      }
      if (typeof t != "function") {
        throw new TypeError("predicate must be a function");
      }
      var e;
      var n = Object(this);
      for (var r = n.length >>> 0, o = arguments[1], i = 0; i < r; i++) {
        e = n[i];
        if (t.call(o, e, i, n)) {
          return e;
        }
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  document.execCommand("enableObjectResizing", false, false);
  document.execCommand("autoUrlDetect", false, false);
});