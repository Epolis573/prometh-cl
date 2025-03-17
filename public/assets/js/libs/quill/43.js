Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function () {
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
var i = function () {
  function t(e, n) {
    var o = this;
    (function r(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, t);
    this.quill = e;
    this.boundsContainer = n || document.body;
    this.root = e.addContainer("ql-tooltip");
    this.root.innerHTML = this.constructor.TEMPLATE;
    if (this.quill.root === this.quill.scrollingContainer) {
      this.quill.root.addEventListener("scroll", function () {
        o.root.style.marginTop = o.quill.root.scrollTop * -1 + "px";
      });
    }
    this.hide();
  }
  o(t, [{
    key: "hide",
    value: function () {
      this.root.classList.add("ql-hidden");
    }
  }, {
    key: "position",
    value: function (t) {
      var e = t.left + t.width / 2 - this.root.offsetWidth / 2;
      var n = t.bottom + this.quill.root.scrollTop;
      this.root.style.left = e + "px";
      this.root.style.top = n + "px";
      this.root.classList.remove("ql-flip");
      var r = this.boundsContainer.getBoundingClientRect();
      var o = this.root.getBoundingClientRect();
      var i = 0;
      if (o.right > r.right) {
        i = r.right - o.right;
        this.root.style.left = e + i + "px";
      }
      if (o.left < r.left) {
        i = r.left - o.left;
        this.root.style.left = e + i + "px";
      }
      if (o.bottom > r.bottom) {
        var l = o.bottom - o.top;
        var a = t.bottom - t.top + l;
        this.root.style.top = n - a + "px";
        this.root.classList.add("ql-flip");
      }
      return i;
    }
  }, {
    key: "show",
    value: function () {
      this.root.classList.remove("ql-editing");
      this.root.classList.remove("ql-hidden");
    }
  }]);
  return t;
}();
exports.default = i;