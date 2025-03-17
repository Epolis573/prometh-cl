function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function s(t) {
  var e = t.reduce(function (t, e) {
    return t + (e.delete || 0);
  }, 0);
  var n = t.length() - e;
  if (function a(t) {
    var e = t.ops[t.ops.length - 1];
    return e != null && (e.insert != null ? typeof e.insert == "string" && e.insert.endsWith("\n") : e.attributes != null && Object.keys(e.attributes).some(function (t) {
      return f.default.query(t, f.default.Scope.BLOCK) != null;
    }));
  }(t)) {
    n -= 1;
  }
  return n;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLastChangeIndex = exports.default = undefined;
var u = function () {
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
var f = r(require("./0.js"));
var p = r(require("./6.js"));
var v = function (t) {
  function e(t, n) {
    (function o(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var r = function i(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.lastRecorded = 0;
    r.ignoreChange = false;
    r.clear();
    r.quill.on(p.default.events.EDITOR_CHANGE, function (t, e, n, o) {
      if (t === p.default.events.TEXT_CHANGE && !r.ignoreChange) {
        if (r.options.userOnly && o !== p.default.sources.USER) {
          r.transform(e);
        } else {
          r.record(e, n);
        }
      }
    });
    r.quill.keyboard.addBinding({
      key: "Z",
      shortKey: true
    }, r.undo.bind(r));
    r.quill.keyboard.addBinding({
      key: "Z",
      shortKey: true,
      shiftKey: true
    }, r.redo.bind(r));
    if (/Win/i.test(navigator.platform)) {
      r.quill.keyboard.addBinding({
        key: "Y",
        shortKey: true
      }, r.redo.bind(r));
    }
    return r;
  }
  (function l(t, e) {
    if (typeof e != "function" && e !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof e);
    }
    t.prototype = Object.create(e && e.prototype, {
      constructor: {
        value: t,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (e) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(t, e);
      } else {
        t.__proto__ = e;
      }
    }
  })(e, t);
  u(e, [{
    key: "change",
    value: function (t, e) {
      if (this.stack[t].length !== 0) {
        var n = this.stack[t].pop();
        this.stack[e].push(n);
        this.lastRecorded = 0;
        this.ignoreChange = true;
        this.quill.updateContents(n[t], p.default.sources.USER);
        this.ignoreChange = false;
        var r = s(n[t]);
        this.quill.setSelection(r);
      }
    }
  }, {
    key: "clear",
    value: function () {
      this.stack = {
        undo: [],
        redo: []
      };
    }
  }, {
    key: "cutoff",
    value: function () {
      this.lastRecorded = 0;
    }
  }, {
    key: "record",
    value: function (t, e) {
      if (t.ops.length !== 0) {
        this.stack.redo = [];
        var n = this.quill.getContents().diff(e);
        var r = Date.now();
        if (this.lastRecorded + this.options.delay > r && this.stack.undo.length > 0) {
          var o = this.stack.undo.pop();
          n = n.compose(o.undo);
          t = o.redo.compose(t);
        } else {
          this.lastRecorded = r;
        }
        this.stack.undo.push({
          redo: t,
          undo: n
        });
        if (this.stack.undo.length > this.options.maxStack) {
          this.stack.undo.shift();
        }
      }
    }
  }, {
    key: "redo",
    value: function () {
      this.change("redo", "undo");
    }
  }, {
    key: "transform",
    value: function (t) {
      this.stack.undo.forEach(function (e) {
        e.undo = t.transform(e.undo, true);
        e.redo = t.transform(e.redo, true);
      });
      this.stack.redo.forEach(function (e) {
        e.undo = t.transform(e.undo, true);
        e.redo = t.transform(e.redo, true);
      });
    }
  }, {
    key: "undo",
    value: function () {
      this.change("undo", "redo");
    }
  }]);
  return e;
}(r(require("./7.js")).default);
v.DEFAULTS = {
  delay: 1000,
  maxStack: 100,
  userOnly: false
};
exports.default = v;
exports.getLastChangeIndex = s;