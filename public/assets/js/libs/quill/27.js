Object.defineProperty(exports, "__esModule", {
  value: true
});
var r = require("./1.js");
var o = function () {
  function t(t) {
    this.domNode = t;
    this.domNode[r.DATA_KEY] = {
      blot: this
    };
  }
  Object.defineProperty(t.prototype, "statics", {
    get: function () {
      return this.constructor;
    },
    enumerable: true,
    configurable: true
  });
  t.create = function (t) {
    if (this.tagName == null) {
      throw new r.ParchmentError("Blot definition missing tagName");
    }
    var e;
    if (Array.isArray(this.tagName)) {
      if (typeof t == "string") {
        t = t.toUpperCase();
        if (parseInt(t).toString() === t) {
          t = parseInt(t);
        }
      }
      e = typeof t == "number" ? document.createElement(this.tagName[t - 1]) : this.tagName.indexOf(t) > -1 ? document.createElement(t) : document.createElement(this.tagName[0]);
    } else {
      e = document.createElement(this.tagName);
    }
    if (this.className) {
      e.classList.add(this.className);
    }
    return e;
  };
  t.prototype.attach = function () {
    if (this.parent != null) {
      this.scroll = this.parent.scroll;
    }
  };
  t.prototype.clone = function () {
    var t = this.domNode.cloneNode(false);
    return r.create(t);
  };
  t.prototype.detach = function () {
    if (this.parent != null) {
      this.parent.removeChild(this);
    }
    delete this.domNode[r.DATA_KEY];
  };
  t.prototype.deleteAt = function (t, e) {
    this.isolate(t, e).remove();
  };
  t.prototype.formatAt = function (t, e, n, o) {
    var i = this.isolate(t, e);
    if (r.query(n, r.Scope.BLOT) != null && o) {
      i.wrap(n, o);
    } else if (r.query(n, r.Scope.ATTRIBUTE) != null) {
      var l = r.create(this.statics.scope);
      i.wrap(l);
      l.format(n, o);
    }
  };
  t.prototype.insertAt = function (t, e, n) {
    var o = n == null ? r.create("text", e) : r.create(e, n);
    var i = this.split(t);
    this.parent.insertBefore(o, i);
  };
  t.prototype.insertInto = function (t, e = null) {
    if (this.parent != null) {
      this.parent.children.remove(this);
    }
    var n = null;
    t.children.insertBefore(this, e);
    if (e != null) {
      n = e.domNode;
    }
    if (this.domNode.parentNode != t.domNode || this.domNode.nextSibling != n) {
      t.domNode.insertBefore(this.domNode, n);
    }
    this.parent = t;
    this.attach();
  };
  t.prototype.isolate = function (t, e) {
    var n = this.split(t);
    n.split(e);
    return n;
  };
  t.prototype.length = function () {
    return 1;
  };
  t.prototype.offset = function (t = this.parent) {
    if (this.parent == null || this == t) {
      return 0;
    } else {
      return this.parent.children.offset(this) + this.parent.offset(t);
    }
  };
  t.prototype.optimize = function (t) {
    if (this.domNode[r.DATA_KEY] != null) {
      delete this.domNode[r.DATA_KEY].mutations;
    }
  };
  t.prototype.remove = function () {
    if (this.domNode.parentNode != null) {
      this.domNode.parentNode.removeChild(this.domNode);
    }
    this.detach();
  };
  t.prototype.replace = function (t) {
    if (t.parent != null) {
      t.parent.insertBefore(this, t.next);
      t.remove();
    }
  };
  t.prototype.replaceWith = function (t, e) {
    var n = typeof t == "string" ? r.create(t, e) : t;
    n.replace(this);
    return n;
  };
  t.prototype.split = function (t, e) {
    if (t === 0) {
      return this;
    } else {
      return this.next;
    }
  };
  t.prototype.update = function (t, e) {};
  t.prototype.wrap = function (t, e) {
    var n = typeof t == "string" ? r.create(t, e) : t;
    if (this.parent != null) {
      this.parent.insertBefore(n, this.next);
    }
    n.appendChild(this);
    return n;
  };
  t.blotName = "abstract";
  return t;
}();
exports.default = o;