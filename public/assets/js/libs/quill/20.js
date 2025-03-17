function r(t) {
  this.ops = t;
  this.index = 0;
  this.offset = 0;
}
var o = require("./12.js");
var i = require("./2.js");
var l = {
  attributes: {
    compose: function (t, e, n) {
      if (typeof t != "object") {
        t = {};
      }
      if (typeof e != "object") {
        e = {};
      }
      var r = i(true, {}, e);
      if (!n) {
        r = Object.keys(r).reduce(function (t, e) {
          if (r[e] != null) {
            t[e] = r[e];
          }
          return t;
        }, {});
      }
      for (var o in t) {
        if (t[o] !== undefined && e[o] === undefined) {
          r[o] = t[o];
        }
      }
      if (Object.keys(r).length > 0) {
        return r;
      } else {
        return undefined;
      }
    },
    diff: function (t, e) {
      if (typeof t != "object") {
        t = {};
      }
      if (typeof e != "object") {
        e = {};
      }
      var n = Object.keys(t).concat(Object.keys(e)).reduce(function (n, r) {
        if (!o(t[r], e[r])) {
          n[r] = e[r] === undefined ? null : e[r];
        }
        return n;
      }, {});
      if (Object.keys(n).length > 0) {
        return n;
      } else {
        return undefined;
      }
    },
    transform: function (t, e, n) {
      if (typeof t != "object") {
        return e;
      }
      if (typeof e == "object") {
        if (!n) {
          return e;
        }
        var r = Object.keys(e).reduce(function (n, r) {
          if (t[r] === undefined) {
            n[r] = e[r];
          }
          return n;
        }, {});
        if (Object.keys(r).length > 0) {
          return r;
        } else {
          return undefined;
        }
      }
    }
  },
  iterator: function (t) {
    return new r(t);
  },
  length: function (t) {
    if (typeof t.delete == "number") {
      return t.delete;
    } else if (typeof t.retain == "number") {
      return t.retain;
    } else if (typeof t.insert == "string") {
      return t.insert.length;
    } else {
      return 1;
    }
  }
};
r.prototype.hasNext = function () {
  return this.peekLength() < Infinity;
};
r.prototype.next = function (t) {
  t ||= Infinity;
  var e = this.ops[this.index];
  if (e) {
    var n = this.offset;
    var r = l.length(e);
    if (t >= r - n) {
      t = r - n;
      this.index += 1;
      this.offset = 0;
    } else {
      this.offset += t;
    }
    if (typeof e.delete == "number") {
      return {
        delete: t
      };
    }
    var o = {};
    if (e.attributes) {
      o.attributes = e.attributes;
    }
    if (typeof e.retain == "number") {
      o.retain = t;
    } else if (typeof e.insert == "string") {
      o.insert = e.insert.substr(n, t);
    } else {
      o.insert = e.insert;
    }
    return o;
  }
  return {
    retain: Infinity
  };
};
r.prototype.peek = function () {
  return this.ops[this.index];
};
r.prototype.peekLength = function () {
  if (this.ops[this.index]) {
    return l.length(this.ops[this.index]) - this.offset;
  } else {
    return Infinity;
  }
};
r.prototype.peekType = function () {
  if (this.ops[this.index]) {
    if (typeof this.ops[this.index].delete == "number") {
      return "delete";
    } else if (typeof this.ops[this.index].retain == "number") {
      return "retain";
    } else {
      return "insert";
    }
  } else {
    return "retain";
  }
};
module.exports = l;