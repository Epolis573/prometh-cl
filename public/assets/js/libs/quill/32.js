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
    (function r(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, t);
    this.quill = e;
    this.options = n;
    this.modules = {};
  }
  o(t, [{
    key: "init",
    value: function () {
      var t = this;
      Object.keys(this.options.modules).forEach(function (e) {
        if (t.modules[e] == null) {
          t.addModule(e);
        }
      });
    }
  }, {
    key: "addModule",
    value: function (t) {
      var e = this.quill.constructor.import("modules/" + t);
      this.modules[t] = new e(this.quill, this.options.modules[t] || {});
      return this.modules[t];
    }
  }]);
  return t;
}();
i.DEFAULTS = {
  modules: {}
};
i.themes = {
  default: i
};
exports.default = i;