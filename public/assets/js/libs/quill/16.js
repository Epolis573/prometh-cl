function r(t) {
  if (t && t.__esModule) {
    return t;
  } else {
    return {
      default: t
    };
  }
}
function i(t, e) {
  t.setAttribute(e, t.getAttribute(e) !== "true");
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var l = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (t) {
  return typeof t;
} : function (t) {
  if (t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype) {
    return "symbol";
  } else {
    return typeof t;
  }
};
var a = function () {
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
var u = r(require("./25.js"));
var f = r(require("../../exportsvg32.js"));
var h = 0;
var p = function () {
  function t(e) {
    var n = this;
    (function o(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    })(this, t);
    this.select = e;
    this.container = document.createElement("span");
    this.buildPicker();
    this.select.style.display = "none";
    this.select.parentNode.insertBefore(this.container, this.select);
    this.label.addEventListener("mousedown", function () {
      n.togglePicker();
    });
    this.label.addEventListener("keydown", function (t) {
      switch (t.keyCode) {
        case u.default.keys.ENTER:
          n.togglePicker();
          break;
        case u.default.keys.ESCAPE:
          n.escape();
          t.preventDefault();
      }
    });
    this.select.addEventListener("change", this.update.bind(this));
  }
  a(t, [{
    key: "togglePicker",
    value: function () {
      this.container.classList.toggle("ql-expanded");
      i(this.label, "aria-expanded");
      i(this.options, "aria-hidden");
    }
  }, {
    key: "buildItem",
    value: function (t) {
      var e = this;
      var n = document.createElement("span");
      n.tabIndex = "0";
      n.setAttribute("role", "button");
      n.classList.add("ql-picker-item");
      if (t.hasAttribute("value")) {
        n.setAttribute("data-value", t.getAttribute("value"));
      }
      if (t.textContent) {
        n.setAttribute("data-label", t.textContent);
      }
      n.addEventListener("click", function () {
        e.selectItem(n, true);
      });
      n.addEventListener("keydown", function (t) {
        switch (t.keyCode) {
          case u.default.keys.ENTER:
            e.selectItem(n, true);
            t.preventDefault();
            break;
          case u.default.keys.ESCAPE:
            e.escape();
            t.preventDefault();
        }
      });
      return n;
    }
  }, {
    key: "buildLabel",
    value: function () {
      var t = document.createElement("span");
      t.classList.add("ql-picker-label");
      t.innerHTML = f.default;
      t.tabIndex = "0";
      t.setAttribute("role", "button");
      t.setAttribute("aria-expanded", "false");
      this.container.appendChild(t);
      return t;
    }
  }, {
    key: "buildOptions",
    value: function () {
      var t = this;
      var e = document.createElement("span");
      e.classList.add("ql-picker-options");
      e.setAttribute("aria-hidden", "true");
      e.tabIndex = "-1";
      e.id = "ql-picker-options-" + h;
      h += 1;
      this.label.setAttribute("aria-controls", e.id);
      this.options = e;
      [].slice.call(this.select.options).forEach(function (n) {
        var r = t.buildItem(n);
        e.appendChild(r);
        if (n.selected === true) {
          t.selectItem(r);
        }
      });
      this.container.appendChild(e);
    }
  }, {
    key: "buildPicker",
    value: function () {
      var t = this;
      [].slice.call(this.select.attributes).forEach(function (e) {
        t.container.setAttribute(e.name, e.value);
      });
      this.container.classList.add("ql-picker");
      this.label = this.buildLabel();
      this.buildOptions();
    }
  }, {
    key: "escape",
    value: function () {
      var t = this;
      this.close();
      setTimeout(function () {
        return t.label.focus();
      }, 1);
    }
  }, {
    key: "close",
    value: function () {
      this.container.classList.remove("ql-expanded");
      this.label.setAttribute("aria-expanded", "false");
      this.options.setAttribute("aria-hidden", "true");
    }
  }, {
    key: "selectItem",
    value: function (t, e = false) {
      var n = this.container.querySelector(".ql-selected");
      if (t !== n && (n != null && n.classList.remove("ql-selected"), t != null && (t.classList.add("ql-selected"), this.select.selectedIndex = [].indexOf.call(t.parentNode.children, t), t.hasAttribute("data-value") ? this.label.setAttribute("data-value", t.getAttribute("data-value")) : this.label.removeAttribute("data-value"), t.hasAttribute("data-label") ? this.label.setAttribute("data-label", t.getAttribute("data-label")) : this.label.removeAttribute("data-label"), e))) {
        if (typeof Event == "function") {
          this.select.dispatchEvent(new Event("change"));
        } else if ((typeof Event == "undefined" ? "undefined" : l(Event)) === "object") {
          var r = document.createEvent("Event");
          r.initEvent("change", true, true);
          this.select.dispatchEvent(r);
        }
        this.close();
      }
    }
  }, {
    key: "update",
    value: function () {
      var t = undefined;
      if (this.select.selectedIndex > -1) {
        var e = this.container.querySelector(".ql-picker-options").children[this.select.selectedIndex];
        t = this.select.options[this.select.selectedIndex];
        this.selectItem(e);
      } else {
        this.selectItem(null);
      }
      var n = t != null && t !== this.select.querySelector("option[selected]");
      this.label.classList.toggle("ql-active", n);
    }
  }]);
  return t;
}();
exports.default = p;