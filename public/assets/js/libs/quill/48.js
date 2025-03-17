var r = this && this.__extends || function () {
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
var o = require("./17.js");
var i = require("./1.js");
var l = {
  attributes: true,
  characterData: true,
  characterDataOldValue: true,
  childList: true,
  subtree: true
};
var a = function (t) {
  function e(e) {
    var n = t.call(this, e) || this;
    n.scroll = n;
    n.observer = new MutationObserver(function (t) {
      n.update(t);
    });
    n.observer.observe(n.domNode, l);
    n.attach();
    return n;
  }
  r(e, t);
  e.prototype.detach = function () {
    t.prototype.detach.call(this);
    this.observer.disconnect();
  };
  e.prototype.deleteAt = function (e, n) {
    this.update();
    if (e === 0 && n === this.length()) {
      this.children.forEach(function (t) {
        t.remove();
      });
    } else {
      t.prototype.deleteAt.call(this, e, n);
    }
  };
  e.prototype.formatAt = function (e, n, r, o) {
    this.update();
    t.prototype.formatAt.call(this, e, n, r, o);
  };
  e.prototype.insertAt = function (e, n, r) {
    this.update();
    t.prototype.insertAt.call(this, e, n, r);
  };
  e.prototype.optimize = function (e, n) {
    var r = this;
    if (e === undefined) {
      e = [];
    }
    if (n === undefined) {
      n = {};
    }
    t.prototype.optimize.call(this, n);
    for (var l = [].slice.call(this.observer.takeRecords()); l.length > 0;) {
      e.push(l.pop());
    }
    var a = function (t, e = true) {
      if (t != null && t !== r && t.domNode.parentNode != null) {
        if (t.domNode[i.DATA_KEY].mutations == null) {
          t.domNode[i.DATA_KEY].mutations = [];
        }
        if (e) {
          a(t.parent);
        }
      }
    };
    var s = function (t) {
      if (t.domNode[i.DATA_KEY] != null && t.domNode[i.DATA_KEY].mutations != null) {
        if (t instanceof o.default) {
          t.children.forEach(s);
        }
        t.optimize(n);
      }
    };
    for (var u = e, c = 0; u.length > 0; c += 1) {
      if (c >= 100) {
        throw new Error("[Parchment] Maximum optimize iterations reached");
      }
      u.forEach(function (t) {
        var e = i.find(t.target, true);
        if (e != null) {
          if (e.domNode === t.target) {
            if (t.type === "childList") {
              a(i.find(t.previousSibling, false));
              [].forEach.call(t.addedNodes, function (t) {
                var e = i.find(t, false);
                a(e, false);
                if (e instanceof o.default) {
                  e.children.forEach(function (t) {
                    a(t, false);
                  });
                }
              });
            } else if (t.type === "attributes") {
              a(e.prev);
            }
          }
          a(e);
        }
      });
      this.children.forEach(s);
      l = (u = [].slice.call(this.observer.takeRecords())).slice();
      while (l.length > 0) {
        e.push(l.pop());
      }
    }
  };
  e.prototype.update = function (e, n) {
    var r = this;
    if (n === undefined) {
      n = {};
    }
    (e = e || this.observer.takeRecords()).map(function (t) {
      var e = i.find(t.target, true);
      if (e == null) {
        return null;
      } else if (e.domNode[i.DATA_KEY].mutations == null) {
        e.domNode[i.DATA_KEY].mutations = [t];
        return e;
      } else {
        e.domNode[i.DATA_KEY].mutations.push(t);
        return null;
      }
    }).forEach(function (t) {
      if (t != null && t !== r && t.domNode[i.DATA_KEY] != null) {
        t.update(t.domNode[i.DATA_KEY].mutations || [], n);
      }
    });
    if (this.domNode[i.DATA_KEY].mutations != null) {
      t.prototype.update.call(this, this.domNode[i.DATA_KEY].mutations, n);
    }
    this.optimize(e, n);
  };
  e.blotName = "scroll";
  e.defaultChild = "block";
  e.scope = i.Scope.BLOCK_BLOT;
  e.tagName = "DIV";
  return e;
}(o.default);
exports.default = a;