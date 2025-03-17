function r(t) {
  var e = a.find(t);
  if (e == null) {
    try {
      e = a.create(t);
    } catch (n) {
      e = a.create(a.Scope.INLINE);
      [].slice.call(t.childNodes).forEach(function (t) {
        e.domNode.appendChild(t);
      });
      if (t.parentNode) {
        t.parentNode.replaceChild(e.domNode, t);
      }
      e.attach();
    }
  }
  return e;
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
var i = require("./47.js");
var l = require("./27.js");
var a = require("./1.js");
var s = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    n.build();
    return n;
  }
  o(e, t);
  e.prototype.appendChild = function (t) {
    this.insertBefore(t);
  };
  e.prototype.attach = function () {
    t.prototype.attach.call(this);
    this.children.forEach(function (t) {
      t.attach();
    });
  };
  e.prototype.build = function () {
    var t = this;
    this.children = new i.default();
    [].slice.call(this.domNode.childNodes).reverse().forEach(function (e) {
      try {
        var n = r(e);
        t.insertBefore(n, t.children.head || undefined);
      } catch (t) {
        if (t instanceof a.ParchmentError) {
          return;
        }
        throw t;
      }
    });
  };
  e.prototype.deleteAt = function (t, e) {
    if (t === 0 && e === this.length()) {
      return this.remove();
    }
    this.children.forEachAt(t, e, function (t, e, n) {
      t.deleteAt(e, n);
    });
  };
  e.prototype.descendant = function (t, n) {
    var r = this.children.find(n);
    var o = r[0];
    var i = r[1];
    if (t.blotName == null && t(o) || t.blotName != null && o instanceof t) {
      return [o, i];
    } else if (o instanceof e) {
      return o.descendant(t, i);
    } else {
      return [null, -1];
    }
  };
  e.prototype.descendants = function (t, n = 0, r = Number.MAX_VALUE) {
    var o = [];
    var i = r;
    this.children.forEachAt(n, r, function (n, r, l) {
      if (t.blotName == null && t(n) || t.blotName != null && n instanceof t) {
        o.push(n);
      }
      if (n instanceof e) {
        o = o.concat(n.descendants(t, r, i));
      }
      i -= l;
    });
    return o;
  };
  e.prototype.detach = function () {
    this.children.forEach(function (t) {
      t.detach();
    });
    t.prototype.detach.call(this);
  };
  e.prototype.formatAt = function (t, e, n, r) {
    this.children.forEachAt(t, e, function (t, e, o) {
      t.formatAt(e, o, n, r);
    });
  };
  e.prototype.insertAt = function (t, e, n) {
    var r = this.children.find(t);
    var o = r[0];
    var i = r[1];
    if (o) {
      o.insertAt(i, e, n);
    } else {
      var l = n == null ? a.create("text", e) : a.create(e, n);
      this.appendChild(l);
    }
  };
  e.prototype.insertBefore = function (t, e) {
    if (this.statics.allowedChildren != null && !this.statics.allowedChildren.some(function (e) {
      return t instanceof e;
    })) {
      throw new a.ParchmentError("Cannot insert " + t.statics.blotName + " into " + this.statics.blotName);
    }
    t.insertInto(this, e);
  };
  e.prototype.length = function () {
    return this.children.reduce(function (t, e) {
      return t + e.length();
    }, 0);
  };
  e.prototype.moveChildren = function (t, e) {
    this.children.forEach(function (n) {
      t.insertBefore(n, e);
    });
  };
  e.prototype.optimize = function (e) {
    t.prototype.optimize.call(this, e);
    if (this.children.length === 0) {
      if (this.statics.defaultChild != null) {
        var n = a.create(this.statics.defaultChild);
        this.appendChild(n);
        n.optimize(e);
      } else {
        this.remove();
      }
    }
  };
  e.prototype.path = function (t, n = false) {
    var r = this.children.find(t, n);
    var o = r[0];
    var i = r[1];
    var l = [[this, t]];
    if (o instanceof e) {
      return l.concat(o.path(i, n));
    } else {
      if (o != null) {
        l.push([o, i]);
      }
      return l;
    }
  };
  e.prototype.removeChild = function (t) {
    this.children.remove(t);
  };
  e.prototype.replace = function (n) {
    if (n instanceof e) {
      n.moveChildren(this);
    }
    t.prototype.replace.call(this, n);
  };
  e.prototype.split = function (t, e = false) {
    if (!e) {
      if (t === 0) {
        return this;
      }
      if (t === this.length()) {
        return this.next;
      }
    }
    var n = this.clone();
    this.parent.insertBefore(n, this.next);
    this.children.forEachAt(t, this.length(), function (t, r, o) {
      t = t.split(r, e);
      n.appendChild(t);
    });
    return n;
  };
  e.prototype.unwrap = function () {
    this.moveChildren(this.parent, this.next);
    this.remove();
  };
  e.prototype.update = function (t, e) {
    var n = this;
    var o = [];
    var i = [];
    t.forEach(function (t) {
      if (t.target === n.domNode && t.type === "childList") {
        o.push.apply(o, t.addedNodes);
        i.push.apply(i, t.removedNodes);
      }
    });
    i.forEach(function (t) {
      if (t.parentNode == null || t.tagName === "IFRAME" || !(document.body.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY)) {
        var e = a.find(t);
        if (e != null) {
          if (e.domNode.parentNode == null || e.domNode.parentNode === n.domNode) {
            e.detach();
          }
        }
      }
    });
    o.filter(function (t) {
      return t.parentNode == n.domNode;
    }).sort(function (t, e) {
      if (t === e) {
        return 0;
      } else if (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_FOLLOWING) {
        return 1;
      } else {
        return -1;
      }
    }).forEach(function (t) {
      var e = null;
      if (t.nextSibling != null) {
        e = a.find(t.nextSibling);
      }
      var o = r(t);
      if (o.next != e || o.next == null) {
        if (o.parent != null) {
          o.parent.removeChild(n);
        }
        n.insertBefore(o, e || undefined);
      }
    });
  };
  return e;
}(l.default);
exports.default = s;