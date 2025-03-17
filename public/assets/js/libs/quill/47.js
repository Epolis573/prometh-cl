Object.defineProperty(exports, "__esModule", {
  value: true
});
var r = function () {
  function t() {
    this.head = this.tail = null;
    this.length = 0;
  }
  t.prototype.append = function () {
    var t = [];
    for (var e = 0; e < arguments.length; e++) {
      t[e] = arguments[e];
    }
    this.insertBefore(t[0], null);
    if (t.length > 1) {
      this.append.apply(this, t.slice(1));
    }
  };
  t.prototype.contains = function (t) {
    for (var e, n = this.iterator(); e = n();) {
      if (e === t) {
        return true;
      }
    }
    return false;
  };
  t.prototype.insertBefore = function (t, e) {
    if (t) {
      t.next = e;
      if (e != null) {
        t.prev = e.prev;
        if (e.prev != null) {
          e.prev.next = t;
        }
        e.prev = t;
        if (e === this.head) {
          this.head = t;
        }
      } else if (this.tail != null) {
        this.tail.next = t;
        t.prev = this.tail;
        this.tail = t;
      } else {
        t.prev = null;
        this.head = this.tail = t;
      }
      this.length += 1;
    }
  };
  t.prototype.offset = function (t) {
    var e = 0;
    for (var n = this.head; n != null;) {
      if (n === t) {
        return e;
      }
      e += n.length();
      n = n.next;
    }
    return -1;
  };
  t.prototype.remove = function (t) {
    if (this.contains(t)) {
      if (t.prev != null) {
        t.prev.next = t.next;
      }
      if (t.next != null) {
        t.next.prev = t.prev;
      }
      if (t === this.head) {
        this.head = t.next;
      }
      if (t === this.tail) {
        this.tail = t.prev;
      }
      this.length -= 1;
    }
  };
  t.prototype.iterator = function (t = this.head) {
    return function () {
      var e = t;
      if (t != null) {
        t = t.next;
      }
      return e;
    };
  };
  t.prototype.find = function (t, e = false) {
    for (var n, r = this.iterator(); n = r();) {
      var o = n.length();
      if (t < o || e && t === o && (n.next == null || n.next.length() !== 0)) {
        return [n, t];
      }
      t -= o;
    }
    return [null, 0];
  };
  t.prototype.forEach = function (t) {
    for (var e, n = this.iterator(); e = n();) {
      t(e);
    }
  };
  t.prototype.forEachAt = function (t, e, n) {
    if (!(e <= 0)) {
      for (var r, o = this.find(t), i = o[0], a = t - o[1], s = this.iterator(i); (r = s()) && a < t + e;) {
        var u = r.length();
        if (t > a) {
          n(r, t - a, Math.min(e, a + u - t));
        } else {
          n(r, 0, Math.min(u, t + e - a));
        }
        a += u;
      }
    }
  };
  t.prototype.map = function (t) {
    return this.reduce(function (e, n) {
      e.push(t(n));
      return e;
    }, []);
  };
  t.prototype.reduce = function (t, e) {
    for (var n, r = this.iterator(); n = r();) {
      e = t(e, n);
    }
    return e;
  };
  return t;
}();
exports.default = r;