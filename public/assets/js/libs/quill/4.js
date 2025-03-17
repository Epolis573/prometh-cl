var r = require("./54.js");
var o = require("./12.js");
var i = require("./2.js");
var l = require("./20.js");
var a = String.fromCharCode(0);
function s(t) {
  if (Array.isArray(t)) {
    this.ops = t;
  } else if (t != null && Array.isArray(t.ops)) {
    this.ops = t.ops;
  } else {
    this.ops = [];
  }
}
s.prototype.insert = function (t, e) {
  var n = {};
  if (t.length === 0) {
    return this;
  } else {
    n.insert = t;
    if (e != null && typeof e == "object" && Object.keys(e).length > 0) {
      n.attributes = e;
    }
    return this.push(n);
  }
};
s.prototype.delete = function (t) {
  if (t <= 0) {
    return this;
  } else {
    return this.push({
      delete: t
    });
  }
};
s.prototype.retain = function (t, e) {
  if (t <= 0) {
    return this;
  }
  var n = {
    retain: t
  };
  if (e != null && typeof e == "object" && Object.keys(e).length > 0) {
    n.attributes = e;
  }
  return this.push(n);
};
s.prototype.push = function (t) {
  var e = this.ops.length;
  var n = this.ops[e - 1];
  t = i(true, {}, t);
  if (typeof n == "object") {
    if (typeof t.delete == "number" && typeof n.delete == "number") {
      this.ops[e - 1] = {
        delete: n.delete + t.delete
      };
      return this;
    }
    if (typeof n.delete == "number" && t.insert != null && (e -= 1, typeof (n = this.ops[e - 1]) != "object")) {
      this.ops.unshift(t);
      return this;
    }
    if (o(t.attributes, n.attributes)) {
      if (typeof t.insert == "string" && typeof n.insert == "string") {
        this.ops[e - 1] = {
          insert: n.insert + t.insert
        };
        if (typeof t.attributes == "object") {
          this.ops[e - 1].attributes = t.attributes;
        }
        return this;
      }
      if (typeof t.retain == "number" && typeof n.retain == "number") {
        this.ops[e - 1] = {
          retain: n.retain + t.retain
        };
        if (typeof t.attributes == "object") {
          this.ops[e - 1].attributes = t.attributes;
        }
        return this;
      }
    }
  }
  if (e === this.ops.length) {
    this.ops.push(t);
  } else {
    this.ops.splice(e, 0, t);
  }
  return this;
};
s.prototype.chop = function () {
  var t = this.ops[this.ops.length - 1];
  if (t && t.retain && !t.attributes) {
    this.ops.pop();
  }
  return this;
};
s.prototype.filter = function (t) {
  return this.ops.filter(t);
};
s.prototype.forEach = function (t) {
  this.ops.forEach(t);
};
s.prototype.map = function (t) {
  return this.ops.map(t);
};
s.prototype.partition = function (t) {
  var e = [];
  var n = [];
  this.forEach(function (r) {
    (t(r) ? e : n).push(r);
  });
  return [e, n];
};
s.prototype.reduce = function (t, e) {
  return this.ops.reduce(t, e);
};
s.prototype.changeLength = function () {
  return this.reduce(function (t, e) {
    if (e.insert) {
      return t + l.length(e);
    } else if (e.delete) {
      return t - e.delete;
    } else {
      return t;
    }
  }, 0);
};
s.prototype.length = function () {
  return this.reduce(function (t, e) {
    return t + l.length(e);
  }, 0);
};
s.prototype.slice = function (t, e) {
  t = t || 0;
  if (typeof e != "number") {
    e = Infinity;
  }
  var n = [];
  for (var r = l.iterator(this.ops), o = 0; o < e && r.hasNext();) {
    var i;
    if (o < t) {
      i = r.next(t - o);
    } else {
      i = r.next(e - o);
      n.push(i);
    }
    o += l.length(i);
  }
  return new s(n);
};
s.prototype.compose = function (t) {
  for (var e = l.iterator(this.ops), n = l.iterator(t.ops), r = new s(); e.hasNext() || n.hasNext();) {
    if (n.peekType() === "insert") {
      r.push(n.next());
    } else if (e.peekType() === "delete") {
      r.push(e.next());
    } else {
      var o = Math.min(e.peekLength(), n.peekLength());
      var i = e.next(o);
      var a = n.next(o);
      if (typeof a.retain == "number") {
        var u = {};
        if (typeof i.retain == "number") {
          u.retain = o;
        } else {
          u.insert = i.insert;
        }
        var c = l.attributes.compose(i.attributes, a.attributes, typeof i.retain == "number");
        if (c) {
          u.attributes = c;
        }
        r.push(u);
      } else if (typeof a.delete == "number" && typeof i.retain == "number") {
        r.push(a);
      }
    }
  }
  return r.chop();
};
s.prototype.concat = function (t) {
  var e = new s(this.ops.slice());
  if (t.ops.length > 0) {
    e.push(t.ops[0]);
    e.ops = e.ops.concat(t.ops.slice(1));
  }
  return e;
};
s.prototype.diff = function (t, e) {
  if (this.ops === t.ops) {
    return new s();
  }
  var n = [this, t].map(function (e) {
    return e.map(function (n) {
      if (n.insert != null) {
        if (typeof n.insert == "string") {
          return n.insert;
        } else {
          return a;
        }
      }
      throw new Error("diff() called " + (e === t ? "on" : "with") + " non-document");
    }).join("");
  });
  var i = new s();
  var u = r(n[0], n[1], e);
  var c = l.iterator(this.ops);
  var f = l.iterator(t.ops);
  u.forEach(function (t) {
    for (var e = t[1].length; e > 0;) {
      var n = 0;
      switch (t[0]) {
        case r.INSERT:
          n = Math.min(f.peekLength(), e);
          i.push(f.next(n));
          break;
        case r.DELETE:
          n = Math.min(e, c.peekLength());
          c.next(n);
          i.delete(n);
          break;
        case r.EQUAL:
          n = Math.min(c.peekLength(), f.peekLength(), e);
          var a = c.next(n);
          var s = f.next(n);
          if (o(a.insert, s.insert)) {
            i.retain(n, l.attributes.diff(a.attributes, s.attributes));
          } else {
            i.push(s).delete(n);
          }
      }
      e -= n;
    }
  });
  return i.chop();
};
s.prototype.eachLine = function (t, e) {
  e = e || "\n";
  for (var n = l.iterator(this.ops), r = new s(), o = 0; n.hasNext();) {
    if (n.peekType() !== "insert") {
      return;
    }
    var i = n.peek();
    var a = l.length(i) - n.peekLength();
    var u = typeof i.insert == "string" ? i.insert.indexOf(e, a) - a : -1;
    if (u < 0) {
      r.push(n.next());
    } else if (u > 0) {
      r.push(n.next(u));
    } else {
      if (t(r, n.next(1).attributes || {}, o) === false) {
        return;
      }
      o += 1;
      r = new s();
    }
  }
  if (r.length() > 0) {
    t(r, {}, o);
  }
};
s.prototype.transform = function (t, e) {
  e = !!e;
  if (typeof t == "number") {
    return this.transformPosition(t, e);
  }
  for (var n = l.iterator(this.ops), r = l.iterator(t.ops), o = new s(); n.hasNext() || r.hasNext();) {
    if (n.peekType() !== "insert" || !e && r.peekType() === "insert") {
      if (r.peekType() === "insert") {
        o.push(r.next());
      } else {
        var i = Math.min(n.peekLength(), r.peekLength());
        var a = n.next(i);
        var u = r.next(i);
        if (a.delete) {
          continue;
        }
        if (u.delete) {
          o.push(u);
        } else {
          o.retain(i, l.attributes.transform(a.attributes, u.attributes, e));
        }
      }
    } else {
      o.retain(l.length(n.next()));
    }
  }
  return o.chop();
};
s.prototype.transformPosition = function (t, e) {
  e = !!e;
  for (var n = l.iterator(this.ops), r = 0; n.hasNext() && r <= t;) {
    var o = n.peekLength();
    var i = n.peekType();
    n.next();
    if (i !== "delete") {
      if (i === "insert" && (r < t || !e)) {
        t += o;
      }
      r += o;
    } else {
      t -= Math.min(o, t - r);
    }
  }
  return t;
};
module.exports = s;