function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function o(t) {
  if (Array.isArray(t)) {
    for (var e = 0, n = Array(t.length); e < t.length; e++) {
      n[e] = t[e];
    }
    return n;
  }
  return Array.from(t);
}
function i(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function l(t, e) {
  try {
    e.parentNode;
  } catch (t) {
    return false;
  }
  if (e instanceof Text) {
    e = e.parentNode;
  }
  return t.contains(e);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Range = undefined;
function a(e, n) {
  if (Array.isArray(e)) {
    return e;
  }
  if (Symbol.iterator in Object(e)) {
    return function t(t, e) {
      var n = [];
      var r = true;
      var o = false;
      var i = undefined;
      try {
        for (var l, a = t[Symbol.iterator](); !(r = (l = a.next()).done) && (n.push(l.value), !e || n.length !== e); r = true);
      } catch (t) {
        o = true;
        i = t;
      } finally {
        try {
          if (!r && a.return) {
            a.return();
          }
        } finally {
          if (o) {
            throw i;
          }
        }
      }
      return n;
    }(e, n);
  }
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
var s = function () {
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
var c = r(require("./0.js"));
var h = r(require("./21.js"));
var d = r(require("./12.js"));
var v = r(require("./9.js"));
var m = (0, r(require("./10.js")).default)("quill:selection");
var _ = function t(e, n = 0) {
  i(this, t);
  this.index = e;
  this.length = n;
};
var O = function () {
  function t(e, n) {
    var r = this;
    i(this, t);
    this.emitter = n;
    this.scroll = e;
    this.composing = false;
    this.mouseDown = false;
    this.root = this.scroll.domNode;
    this.cursor = c.default.create("cursor", this);
    this.lastRange = this.savedRange = new _(0, 0);
    this.handleComposition();
    this.handleDragging();
    this.emitter.listenDOM("selectionchange", document, function () {
      if (!r.mouseDown) {
        setTimeout(r.update.bind(r, v.default.sources.USER), 1);
      }
    });
    this.emitter.on(v.default.events.EDITOR_CHANGE, function (t, e) {
      if (t === v.default.events.TEXT_CHANGE && e.length() > 0) {
        r.update(v.default.sources.SILENT);
      }
    });
    this.emitter.on(v.default.events.SCROLL_BEFORE_UPDATE, function () {
      if (r.hasFocus()) {
        var t = r.getNativeRange();
        if (t != null && t.start.node !== r.cursor.textNode) {
          r.emitter.once(v.default.events.SCROLL_UPDATE, function () {
            try {
              r.setNativeRange(t.start.node, t.start.offset, t.end.node, t.end.offset);
            } catch (t) {}
          });
        }
      }
    });
    this.emitter.on(v.default.events.SCROLL_OPTIMIZE, function (t, e) {
      if (e.range) {
        var n = e.range;
        var o = n.startNode;
        var i = n.startOffset;
        var l = n.endNode;
        var a = n.endOffset;
        r.setNativeRange(o, i, l, a);
      }
    });
    this.update(v.default.sources.SILENT);
  }
  s(t, [{
    key: "handleComposition",
    value: function () {
      var t = this;
      this.root.addEventListener("compositionstart", function () {
        t.composing = true;
      });
      this.root.addEventListener("compositionend", function () {
        t.composing = false;
        if (t.cursor.parent) {
          var e = t.cursor.restore();
          if (!e) {
            return;
          }
          setTimeout(function () {
            t.setNativeRange(e.startNode, e.startOffset, e.endNode, e.endOffset);
          }, 1);
        }
      });
    }
  }, {
    key: "handleDragging",
    value: function () {
      var t = this;
      this.emitter.listenDOM("mousedown", document.body, function () {
        t.mouseDown = true;
      });
      this.emitter.listenDOM("mouseup", document.body, function () {
        t.mouseDown = false;
        t.update(v.default.sources.USER);
      });
    }
  }, {
    key: "focus",
    value: function () {
      if (!this.hasFocus()) {
        this.root.focus();
        this.setRange(this.savedRange);
      }
    }
  }, {
    key: "format",
    value: function (t, e) {
      if (this.scroll.whitelist == null || this.scroll.whitelist[t]) {
        this.scroll.update();
        var n = this.getNativeRange();
        if (n != null && n.native.collapsed && !c.default.query(t, c.default.Scope.BLOCK)) {
          if (n.start.node !== this.cursor.textNode) {
            var r = c.default.find(n.start.node, false);
            if (r == null) {
              return;
            }
            if (r instanceof c.default.Leaf) {
              var o = r.split(n.start.offset);
              r.parent.insertBefore(this.cursor, o);
            } else {
              r.insertBefore(this.cursor, n.start.node);
            }
            this.cursor.attach();
          }
          this.cursor.format(t, e);
          this.scroll.optimize();
          this.setNativeRange(this.cursor.textNode, this.cursor.textNode.data.length);
          this.update();
        }
      }
    }
  }, {
    key: "getBounds",
    value: function (t, e = 0) {
      var n = this.scroll.length();
      t = Math.min(t, n - 1);
      e = Math.min(t + e, n - 1) - t;
      var r = undefined;
      var o = this.scroll.leaf(t);
      var i = a(o, 2);
      var l = i[0];
      var s = i[1];
      if (l == null) {
        return null;
      }
      var u = l.position(s, true);
      var c = a(u, 2);
      r = c[0];
      s = c[1];
      var f = document.createRange();
      if (e > 0) {
        f.setStart(r, s);
        var h = this.scroll.leaf(t + e);
        var p = a(h, 2);
        l = p[0];
        s = p[1];
        if (l == null) {
          return null;
        }
        var d = l.position(s, true);
        var y = a(d, 2);
        r = y[0];
        s = y[1];
        f.setEnd(r, s);
        return f.getBoundingClientRect();
      }
      var v = "left";
      var b = undefined;
      if (r instanceof Text) {
        if (s < r.data.length) {
          f.setStart(r, s);
          f.setEnd(r, s + 1);
        } else {
          f.setStart(r, s - 1);
          f.setEnd(r, s);
          v = "right";
        }
        b = f.getBoundingClientRect();
      } else {
        b = l.domNode.getBoundingClientRect();
        if (s > 0) {
          v = "right";
        }
      }
      return {
        bottom: b.top + b.height,
        height: b.height,
        left: b[v],
        right: b[v],
        top: b.top,
        width: 0
      };
    }
  }, {
    key: "getNativeRange",
    value: function () {
      var t = document.getSelection();
      if (t == null || t.rangeCount <= 0) {
        return null;
      }
      var e = t.getRangeAt(0);
      if (e == null) {
        return null;
      }
      var n = this.normalizeNative(e);
      m.info("getNativeRange", n);
      return n;
    }
  }, {
    key: "getRange",
    value: function () {
      var t = this.getNativeRange();
      if (t == null) {
        return [null, null];
      } else {
        return [this.normalizedToRange(t), t];
      }
    }
  }, {
    key: "hasFocus",
    value: function () {
      return document.activeElement === this.root;
    }
  }, {
    key: "normalizedToRange",
    value: function (t) {
      var e = this;
      var n = [[t.start.node, t.start.offset]];
      if (!t.native.collapsed) {
        n.push([t.end.node, t.end.offset]);
      }
      var r = n.map(function (t) {
        var n = a(t, 2);
        var r = n[0];
        var o = n[1];
        var i = c.default.find(r, true);
        var l = i.offset(e.scroll);
        if (o === 0) {
          return l;
        } else if (i instanceof c.default.Container) {
          return l + i.length();
        } else {
          return l + i.index(r, o);
        }
      });
      var i = Math.min(Math.max.apply(Math, o(r)), this.scroll.length() - 1);
      var l = Math.min.apply(Math, [i].concat(o(r)));
      return new _(l, i - l);
    }
  }, {
    key: "normalizeNative",
    value: function (t) {
      if (!l(this.root, t.startContainer) || !t.collapsed && !l(this.root, t.endContainer)) {
        return null;
      }
      var e = {
        start: {
          node: t.startContainer,
          offset: t.startOffset
        },
        end: {
          node: t.endContainer,
          offset: t.endOffset
        },
        native: t
      };
      [e.start, e.end].forEach(function (t) {
        for (var e = t.node, n = t.offset; !(e instanceof Text) && e.childNodes.length > 0;) {
          if (e.childNodes.length > n) {
            e = e.childNodes[n];
            n = 0;
          } else {
            if (e.childNodes.length !== n) {
              break;
            }
            n = (e = e.lastChild) instanceof Text ? e.data.length : e.childNodes.length + 1;
          }
        }
        t.node = e;
        t.offset = n;
      });
      return e;
    }
  }, {
    key: "rangeToNative",
    value: function (t) {
      var e = this;
      var n = t.collapsed ? [t.index] : [t.index, t.index + t.length];
      var r = [];
      var o = this.scroll.length();
      n.forEach(function (t, n) {
        t = Math.min(o - 1, t);
        var i;
        var l = e.scroll.leaf(t);
        var s = a(l, 2);
        var u = s[0];
        var c = s[1];
        var f = u.position(c, n !== 0);
        var h = a(f, 2);
        i = h[0];
        c = h[1];
        r.push(i, c);
      });
      if (r.length < 2) {
        r = r.concat(r);
      }
      return r;
    }
  }, {
    key: "scrollIntoView",
    value: function (t) {
      var e = this.lastRange;
      if (e != null) {
        var n = this.getBounds(e.index, e.length);
        if (n != null) {
          var r = this.scroll.length() - 1;
          var o = this.scroll.line(Math.min(e.index, r));
          var l = a(o, 1)[0];
          var s = l;
          if (e.length > 0) {
            var u = this.scroll.line(Math.min(e.index + e.length, r));
            s = a(u, 1)[0];
          }
          if (l != null && s != null) {
            var c = t.getBoundingClientRect();
            if (n.top < c.top) {
              t.scrollTop -= c.top - n.top;
            } else if (n.bottom > c.bottom) {
              t.scrollTop += n.bottom - c.bottom;
            }
          }
        }
      }
    }
  }, {
    key: "setNativeRange",
    value: function (t, e, n = t, r = e, o = false) {
      m.info("setNativeRange", t, e, n, r);
      if (t == null || this.root.parentNode != null && t.parentNode != null && n.parentNode != null) {
        var i = document.getSelection();
        if (i != null) {
          if (t != null) {
            if (!this.hasFocus()) {
              this.root.focus();
            }
            var l = (this.getNativeRange() || {}).native;
            if (l == null || o || t !== l.startContainer || e !== l.startOffset || n !== l.endContainer || r !== l.endOffset) {
              if (t.tagName == "BR") {
                e = [].indexOf.call(t.parentNode.childNodes, t);
                t = t.parentNode;
              }
              if (n.tagName == "BR") {
                r = [].indexOf.call(require.parentNode.childNodes, require);
                require = require.parentNode;
              }
              var a = document.createRange();
              a.setStart(t, e);
              a.setEnd(n, r);
              i.removeAllRanges();
              i.addRange(a);
            }
          } else {
            i.removeAllRanges();
            this.root.blur();
            document.body.focus();
          }
        }
      }
    }
  }, {
    key: "setRange",
    value: function (t, e = false, n = v.default.sources.API) {
      if (typeof e == "string") {
        require = exports;
        exports = false;
      }
      m.info("setRange", t);
      if (t != null) {
        var r = this.rangeToNative(t);
        this.setNativeRange.apply(this, o(r).concat([e]));
      } else {
        this.setNativeRange(null);
      }
      this.update(n);
    }
  }, {
    key: "update",
    value: function (t = v.default.sources.USER) {
      var e = this.lastRange;
      var n = this.getRange();
      var r = a(n, 2);
      var o = r[0];
      var i = r[1];
      this.lastRange = o;
      if (this.lastRange != null) {
        this.savedRange = this.lastRange;
      }
      if (!(0, d.default)(e, this.lastRange)) {
        var l;
        if (!this.composing && i != null && i.native.collapsed && i.start.node !== this.cursor.textNode) {
          this.cursor.restore();
        }
        var u;
        var s = [v.default.events.SELECTION_CHANGE, (0, h.default)(this.lastRange), (0, h.default)(e), t];
        (l = this.emitter).emit.apply(l, [v.default.events.EDITOR_CHANGE].concat(s));
        if (t !== v.default.sources.SILENT) {
          (u = this.emitter).emit.apply(u, s);
        }
      }
    }
  }]);
  return t;
}();
exports.Range = _;
exports.default = O;