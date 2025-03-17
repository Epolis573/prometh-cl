function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function o(t, e, n) {
  if (e in t) {
    Object.defineProperty(t, e, {
      value: n,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    t[e] = n;
  }
  return t;
}
function s(t, e, n) {
  if ((e === undefined ? "undefined" : x(e)) === "object") {
    return Object.keys(e).reduce(function (t, n) {
      return s(t, n, e[n]);
    }, t);
  } else {
    return t.reduce(function (t, r) {
      if (r.attributes && r.attributes[e]) {
        return t.push(r);
      } else {
        return t.insert(r.insert, (0, j.default)({}, o({}, e, n), r.attributes));
      }
    }, new q.default());
  }
}
function u(t) {
  if (t.nodeType !== Node.ELEMENT_NODE) {
    return {};
  } else {
    return t["__ql-computed-style"] ||= window.getComputedStyle(t);
  }
}
function c(t, e) {
  for (var n = "", r = t.ops.length - 1; r >= 0 && n.length < e.length; --r) {
    var o = t.ops[r];
    if (typeof o.insert != "string") {
      break;
    }
    n = o.insert + n;
  }
  return n.slice(e.length * -1) === e;
}
function f(t) {
  return t.childNodes.length !== 0 && ["block", "list-item"].indexOf(u(t).display) > -1;
}
function h(t, e, n) {
  if (t.nodeType === t.TEXT_NODE) {
    return n.reduce(function (e, n) {
      return n(t, e);
    }, new q.default());
  } else if (t.nodeType === t.ELEMENT_NODE) {
    return [].reduce.call(t.childNodes || [], function (r, o) {
      var i = h(o, e, n);
      if (o.nodeType === t.ELEMENT_NODE) {
        i = e.reduce(function (t, e) {
          return e(o, t);
        }, i);
        i = (o[W] || []).reduce(function (t, e) {
          return e(o, t);
        }, i);
      }
      return r.concat(i);
    }, new q.default());
  } else {
    return new q.default();
  }
}
function p(t, e, n) {
  return s(n, t, true);
}
function d(t, e) {
  var n = P.default.Attributor.Attribute.keys(t);
  var r = P.default.Attributor.Class.keys(t);
  var o = P.default.Attributor.Style.keys(t);
  var i = {};
  n.concat(r).concat(o).forEach(function (e) {
    var n = P.default.query(e, P.default.Scope.ATTRIBUTE);
    if (n == null || !(i[n.attrName] = n.value(t), i[n.attrName])) {
      if ((n = Y[e]) != null && (n.attrName === e || n.keyName === e)) {
        i[n.attrName] = n.value(t) || undefined;
      }
      if ((n = X[e]) != null && (n.attrName === e || n.keyName === e)) {
        n = X[e];
        i[n.attrName] = n.value(t) || undefined;
      }
    }
  });
  if (Object.keys(i).length > 0) {
    e = s(e, i);
  }
  return e;
}
function y(t, e) {
  var n = P.default.query(t);
  if (n == null) {
    return e;
  }
  if (n.prototype instanceof P.default.Embed) {
    var r = {};
    var o = n.value(t);
    if (o != null) {
      r[n.blotName] = o;
      e = new q.default().insert(r, n.formats(t));
    }
  } else if (typeof n.formats == "function") {
    e = s(e, n.blotName, n.formats(t));
  }
  return e;
}
function m(t, e) {
  if (!c(e, "\n")) {
    if (f(t) || e.length() > 0 && t.nextSibling && f(t.nextSibling)) {
      e.insert("\n");
    }
  }
  return e;
}
function _(t, e) {
  if (f(t) && t.nextElementSibling != null && !c(e, "\n\n")) {
    var n = t.offsetHeight + parseFloat(u(t).marginTop) + parseFloat(u(t).marginBottom);
    if (t.nextElementSibling.offsetTop > t.offsetTop + n * 1.5) {
      e.insert("\n");
    }
  }
  return e;
}
function w(t, e) {
  var n = t.data;
  if (t.parentNode.tagName === "O:P") {
    return e.insert(n.trim());
  }
  if (n.trim().length === 0 && t.parentNode.classList.contains("ql-clipboard")) {
    return e;
  }
  if (!u(t.parentNode).whiteSpace.startsWith("pre")) {
    function r(t, e) {
      if ((e = e.replace(/[^\u00a0]/g, "")).length < 1 && t) {
        return " ";
      } else {
        return e;
      }
    }
    n = (n = n.replace(/\r\n/g, " ").replace(/\n/g, " ")).replace(/\s\s+/g, r.bind(r, true));
    if (t.previousSibling == null && f(t.parentNode) || t.previousSibling != null && f(t.previousSibling)) {
      n = n.replace(/^\s+/, r.bind(r, false));
    }
    if (t.nextSibling == null && f(t.parentNode) || t.nextSibling != null && f(t.nextSibling)) {
      n = n.replace(/\s+$/, r.bind(r, false));
    }
  }
  return e.insert(n);
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchText = exports.matchSpacing = exports.matchNewline = exports.matchBlot = exports.matchAttributor = exports.default = undefined;
var x = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
  return typeof t;
} : function (t) {
  if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
    return "symbol";
  } else {
    return typeof t;
  }
};
function k(e, n) {
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
var E = function () {
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
var j = r(require("./2.js"));
var q = r(require("./4.js"));
var P = r(require("./0.js"));
var C = r(require("./6.js"));
var M = r(require("./10.js"));
var I = r(require("./7.js"));
var B = require("./34.js");
var D = require("./35.js");
var F = r(require("./13.js"));
var H = require("./24.js");
var K = require("./36.js");
var z = require("./37.js");
var Z = require("./38.js");
var V = (0, M.default)("quill:clipboard");
var W = "__ql-matcher";
var G = [[Node.TEXT_NODE, w], [Node.TEXT_NODE, m], ["br", function v(t, e) {
  if (!c(e, "\n")) {
    e.insert("\n");
  }
  return e;
}], [Node.ELEMENT_NODE, m], [Node.ELEMENT_NODE, y], [Node.ELEMENT_NODE, _], [Node.ELEMENT_NODE, d], [Node.ELEMENT_NODE, function O(t, e) {
  var n = {};
  var r = t.style || {};
  if (r.fontStyle && u(t).fontStyle === "italic") {
    n.italic = true;
  }
  if (r.fontWeight && (u(t).fontWeight.startsWith("bold") || parseInt(u(t).fontWeight) >= 700)) {
    n.bold = true;
  }
  if (Object.keys(n).length > 0) {
    e = s(e, n);
  }
  if (parseFloat(r.textIndent || 0) > 0) {
    e = new q.default().insert("\t").concat(e);
  }
  return e;
}], ["li", function g(t, e) {
  var n = P.default.query(t);
  if (n == null || n.blotName !== "list-item" || !c(e, "\n")) {
    return e;
  }
  var r = -1;
  for (var o = t.parentNode; !o.classList.contains("ql-clipboard");) {
    if ((P.default.query(o) || {}).blotName === "list") {
      r += 1;
    }
    o = o.parentNode;
  }
  if (r <= 0) {
    return e;
  } else {
    return e.compose(new q.default().retain(e.length() - 1).retain(1, {
      indent: r
    }));
  }
}], ["b", p.bind(p, "bold")], ["i", p.bind(p, "italic")], ["style", function b() {
  return new q.default();
}]];
var Y = [B.AlignAttribute, K.DirectionAttribute].reduce(function (t, e) {
  t[e.keyName] = e;
  return t;
}, {});
var X = [B.AlignStyle, D.BackgroundStyle, H.ColorStyle, K.DirectionStyle, z.FontStyle, Z.SizeStyle].reduce(function (t, e) {
  t[e.keyName] = e;
  return t;
}, {});
var $ = function (t) {
  function e(t, n) {
    (function i(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, e);
    var r = function l(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      if (!e || typeof e != "object" && typeof e != "function") {
        return t;
      } else {
        return e;
      }
    }(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.quill.root.addEventListener("paste", r.onPaste.bind(r));
    r.container = r.quill.addContainer("ql-clipboard");
    r.container.setAttribute("contenteditable", true);
    r.container.setAttribute("tabindex", -1);
    r.matchers = [];
    G.concat(r.options.matchers).forEach(function (t) {
      var e = k(t, 2);
      var o = e[0];
      var i = e[1];
      if (n.matchVisual || i !== _) {
        r.addMatcher(o, i);
      }
    });
    return r;
  }
  (function a(t, e) {
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
  E(e, [{
    key: "addMatcher",
    value: function (t, e) {
      this.matchers.push([t, e]);
    }
  }, {
    key: "convert",
    value: function (t) {
      if (typeof t == "string") {
        this.container.innerHTML = t.replace(/\>\r?\n +\</g, "><");
        return this.convert();
      }
      var e = this.quill.getFormat(this.quill.selection.savedRange.index);
      if (e[F.default.blotName]) {
        var n = this.container.innerText;
        this.container.innerHTML = "";
        return new q.default().insert(n, o({}, F.default.blotName, e[F.default.blotName]));
      }
      var r = this.prepareMatching();
      var i = k(r, 2);
      var l = i[0];
      var a = i[1];
      var s = h(this.container, l, a);
      if (c(s, "\n") && s.ops[s.ops.length - 1].attributes == null) {
        s = s.compose(new q.default().retain(s.length() - 1).delete(1));
      }
      V.log("convert", this.container.innerHTML, s);
      this.container.innerHTML = "";
      return s;
    }
  }, {
    key: "dangerouslyPasteHTML",
    value: function (t, e, n = C.default.sources.API) {
      if (typeof t == "string") {
        this.quill.setContents(this.convert(t), e);
        this.quill.setSelection(0, C.default.sources.SILENT);
      } else {
        var r = this.convert(e);
        this.quill.updateContents(new q.default().retain(t).concat(r), n);
        this.quill.setSelection(t + r.length(), C.default.sources.SILENT);
      }
    }
  }, {
    key: "onPaste",
    value: function (t) {
      var e = this;
      if (!t.defaultPrevented && this.quill.isEnabled()) {
        var n = this.quill.getSelection();
        var r = new q.default().retain(n.index);
        var o = this.quill.scrollingContainer.scrollTop;
        this.container.focus();
        this.quill.selection.update(C.default.sources.SILENT);
        setTimeout(function () {
          r = r.concat(e.convert()).delete(n.length);
          e.quill.updateContents(r, C.default.sources.USER);
          e.quill.setSelection(r.length() - n.length, C.default.sources.SILENT);
          e.quill.scrollingContainer.scrollTop = o;
          e.quill.focus();
        }, 1);
      }
    }
  }, {
    key: "prepareMatching",
    value: function () {
      var t = this;
      var e = [];
      var n = [];
      this.matchers.forEach(function (r) {
        var o = k(r, 2);
        var i = o[0];
        var l = o[1];
        switch (i) {
          case Node.TEXT_NODE:
            n.push(l);
            break;
          case Node.ELEMENT_NODE:
            e.push(l);
            break;
          default:
            [].forEach.call(t.container.querySelectorAll(i), function (t) {
              t[W] = t[W] || [];
              t[W].push(l);
            });
        }
      });
      return [e, n];
    }
  }]);
  return e;
}(I.default);
$.DEFAULTS = {
  matchers: [],
  matchVisual: true
};
exports.default = $;
exports.matchAttributor = d;
exports.matchBlot = y;
exports.matchNewline = m;
exports.matchSpacing = _;
exports.matchText = w;