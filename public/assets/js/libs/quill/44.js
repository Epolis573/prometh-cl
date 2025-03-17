function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function o(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function i(t, e) {
  if (!t) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  if (!e || typeof e != "object" && typeof e != "function") {
    return t;
  } else {
    return e;
  }
}
function l(t, e) {
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
}
function s(t, e, n = false) {
  e.forEach(function (e) {
    var r = document.createElement("option");
    if (e === n) {
      r.setAttribute("selected", "selected");
    } else {
      r.setAttribute("value", e);
    }
    t.appendChild(r);
  });
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseTooltip = undefined;
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
var c = function t(e, n, r) {
  if (e === null) {
    e = Function.prototype;
  }
  var o = Object.getOwnPropertyDescriptor(e, n);
  if (o === undefined) {
    var i = Object.getPrototypeOf(e);
    if (i === null) {
      return undefined;
    } else {
      return t(i, n, r);
    }
  }
  if ("value" in o) {
    return o.value;
  }
  var l = o.get;
  if (l !== undefined) {
    return l.call(r);
  } else {
    return undefined;
  }
};
var h = r(require("./2.js"));
var d = r(require("./4.js"));
var v = r(require("./9.js"));
var g = r(require("./25.js"));
var _ = r(require("./32.js"));
var w = r(require("./41.js"));
var k = r(require("./42.js"));
var N = r(require("./16.js"));
var A = r(require("./43.js"));
var q = [false, "center", "right", "justify"];
var T = ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466"];
var P = [false, "serif", "monospace"];
var S = ["1", "2", "3", false];
var C = ["small", false, "large", "huge"];
var L = function (t) {
  function e(t, n) {
    o(this, e);
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    t.emitter.listenDOM("click", document.body, function e(n) {
      if (!document.body.contains(t.root)) {
        return document.body.removeEventListener("click", e);
      }
      if (r.tooltip != null && !r.tooltip.root.contains(n.target) && document.activeElement !== r.tooltip.textbox && !r.quill.hasFocus()) {
        r.tooltip.hide();
      }
      if (r.pickers != null) {
        r.pickers.forEach(function (t) {
          if (!t.container.contains(n.target)) {
            t.close();
          }
        });
      }
    });
    return r;
  }
  l(e, t);
  u(e, [{
    key: "addModule",
    value: function (t) {
      var n = c(e.prototype.__proto__ || Object.getPrototypeOf(e.prototype), "addModule", this).call(this, t);
      if (t === "toolbar") {
        this.extendToolbar(n);
      }
      return n;
    }
  }, {
    key: "buildButtons",
    value: function (t, e) {
      t.forEach(function (t) {
        (t.getAttribute("class") || "").split(/\s+/).forEach(function (n) {
          if (n.startsWith("ql-") && (n = n.slice("ql-".length), e[n] != null)) {
            if (n === "direction") {
              t.innerHTML = e[n][""] + e[n].rtl;
            } else if (typeof e[n] == "string") {
              t.innerHTML = e[n];
            } else {
              var r = t.value || "";
              if (r != null && e[n][r]) {
                t.innerHTML = e[n][r];
              }
            }
          }
        });
      });
    }
  }, {
    key: "buildPickers",
    value: function (t, e) {
      var n = this;
      this.pickers = t.map(function (t) {
        if (t.classList.contains("ql-align")) {
          if (t.querySelector("option") == null) {
            s(t, q);
          }
          return new k.default(t, e.align);
        }
        if (t.classList.contains("ql-background") || t.classList.contains("ql-color")) {
          var n = t.classList.contains("ql-background") ? "background" : "color";
          if (t.querySelector("option") == null) {
            s(t, T, n === "background" ? "#ffffff" : "#000000");
          }
          return new w.default(t, e[n]);
        }
        if (t.querySelector("option") == null) {
          if (t.classList.contains("ql-font")) {
            s(t, P);
          } else if (t.classList.contains("ql-header")) {
            s(t, S);
          } else if (t.classList.contains("ql-size")) {
            s(t, C);
          }
        }
        return new N.default(t);
      });
      this.quill.on(v.default.events.EDITOR_CHANGE, function () {
        n.pickers.forEach(function (t) {
          t.update();
        });
      });
    }
  }]);
  return e;
}(_.default);
L.DEFAULTS = (0, h.default)(true, {}, _.default.DEFAULTS, {
  modules: {
    toolbar: {
      handlers: {
        formula: function () {
          this.quill.theme.tooltip.edit("formula");
        },
        image: function () {
          var t = this;
          var e = this.container.querySelector("input.ql-image[type=file]");
          if (e == null) {
            (e = document.createElement("input")).setAttribute("type", "file");
            e.setAttribute("accept", "image/png, image/gif, image/jpeg, image/bmp, image/x-icon");
            e.classList.add("ql-image");
            e.addEventListener("change", function () {
              if (e.files != null && e.files[0] != null) {
                var n = new FileReader();
                n.onload = function (n) {
                  var r = t.quill.getSelection(true);
                  t.quill.updateContents(new d.default().retain(r.index).delete(r.length).insert({
                    image: n.target.result
                  }), v.default.sources.USER);
                  t.quill.setSelection(r.index + 1, v.default.sources.SILENT);
                  e.value = "";
                };
                n.readAsDataURL(e.files[0]);
              }
            });
            this.container.appendChild(e);
          }
          e.click();
        },
        video: function () {
          this.quill.theme.tooltip.edit("video");
        }
      }
    }
  }
});
var M = function (t) {
  function e(t, n) {
    o(this, e);
    var r = i(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n));
    r.textbox = r.root.querySelector("input[type=\"text\"]");
    r.listen();
    return r;
  }
  l(e, t);
  u(e, [{
    key: "listen",
    value: function () {
      var t = this;
      this.textbox.addEventListener("keydown", function (e) {
        if (g.default.match(e, "enter")) {
          t.save();
          e.preventDefault();
        } else if (g.default.match(e, "escape")) {
          t.cancel();
          e.preventDefault();
        }
      });
    }
  }, {
    key: "cancel",
    value: function () {
      this.hide();
    }
  }, {
    key: "edit",
    value: function (t = "link", e = null) {
      this.root.classList.remove("ql-hidden");
      this.root.classList.add("ql-editing");
      if (e != null) {
        this.textbox.value = e;
      } else if (t !== this.root.getAttribute("data-mode")) {
        this.textbox.value = "";
      }
      this.position(this.quill.getBounds(this.quill.selection.savedRange));
      this.textbox.select();
      this.textbox.setAttribute("placeholder", this.textbox.getAttribute("data-" + t) || "");
      this.root.setAttribute("data-mode", t);
    }
  }, {
    key: "restoreFocus",
    value: function () {
      var t = this.quill.scrollingContainer.scrollTop;
      this.quill.focus();
      this.quill.scrollingContainer.scrollTop = t;
    }
  }, {
    key: "save",
    value: function () {
      var t = this.textbox.value;
      switch (this.root.getAttribute("data-mode")) {
        case "link":
          var e = this.quill.root.scrollTop;
          if (this.linkRange) {
            this.quill.formatText(this.linkRange, "link", t, v.default.sources.USER);
            delete this.linkRange;
          } else {
            this.restoreFocus();
            this.quill.format("link", t, v.default.sources.USER);
          }
          this.quill.root.scrollTop = e;
          break;
        case "video":
          t = function a(t) {
            var e = t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/) || t.match(/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/);
            if (e) {
              return (e[1] || "https") + "://www.youtube.com/embed/" + e[2] + "?showinfo=0";
            } else if (e = t.match(/^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
              return (e[1] || "https") + "://player.vimeo.com/video/" + e[2] + "/";
            } else {
              return t;
            }
          }(t);
        case "formula":
          if (!t) {
            break;
          }
          var n = this.quill.getSelection(true);
          if (n != null) {
            var r = n.index + n.length;
            this.quill.insertEmbed(r, this.root.getAttribute("data-mode"), t, v.default.sources.USER);
            if (this.root.getAttribute("data-mode") === "formula") {
              this.quill.insertText(r + 1, " ", v.default.sources.USER);
            }
            this.quill.setSelection(r + 2, v.default.sources.USER);
          }
      }
      this.textbox.value = "";
      this.hide();
    }
  }]);
  return e;
}(A.default);
exports.BaseTooltip = M;
exports.default = L;