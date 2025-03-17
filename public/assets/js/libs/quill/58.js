function n() {}
function r(t, e, n) {
  this.fn = t;
  this.context = e;
  this.once = n || false;
}
function o() {
  this._events = new n();
  this._eventsCount = 0;
}
var i = Object.prototype.hasOwnProperty;
var l = "~";
if (Object.create) {
  n.prototype = Object.create(null);
  if (!new n().__proto__) {
    l = false;
  }
}
o.prototype.eventNames = function () {
  var t;
  var e;
  var n = [];
  if (this._eventsCount === 0) {
    return n;
  }
  for (e in t = this._events) {
    if (i.call(t, e)) {
      n.push(l ? e.slice(1) : e);
    }
  }
  if (Object.getOwnPropertySymbols) {
    return n.concat(Object.getOwnPropertySymbols(t));
  } else {
    return n;
  }
};
o.prototype.listeners = function (t, e) {
  var n = l ? l + t : t;
  var r = this._events[n];
  if (e) {
    return !!r;
  }
  if (!r) {
    return [];
  }
  if (r.fn) {
    return [r.fn];
  }
  for (var o = 0, i = r.length, a = new Array(i); o < i; o++) {
    a[o] = r[o].fn;
  }
  return a;
};
o.prototype.emit = function (t, e, n, r, o, i) {
  var a = l ? l + t : t;
  if (!this._events[a]) {
    return false;
  }
  var s;
  var u;
  var c = this._events[a];
  var f = arguments.length;
  if (c.fn) {
    if (c.once) {
      this.removeListener(t, c.fn, undefined, true);
    }
    switch (f) {
      case 1:
        c.fn.call(c.context);
        return true;
      case 2:
        c.fn.call(c.context, e);
        return true;
      case 3:
        c.fn.call(c.context, e, n);
        return true;
      case 4:
        c.fn.call(c.context, e, n, r);
        return true;
      case 5:
        c.fn.call(c.context, e, n, r, o);
        return true;
      case 6:
        c.fn.call(c.context, e, n, r, o, i);
        return true;
    }
    u = 1;
    s = new Array(f - 1);
    for (; u < f; u++) {
      s[u - 1] = arguments[u];
    }
    c.fn.apply(c.context, s);
  } else {
    var h;
    var p = c.length;
    for (u = 0; u < p; u++) {
      if (c[u].once) {
        this.removeListener(t, c[u].fn, undefined, true);
      }
      switch (f) {
        case 1:
          c[u].fn.call(c[u].context);
          break;
        case 2:
          c[u].fn.call(c[u].context, e);
          break;
        case 3:
          c[u].fn.call(c[u].context, e, n);
          break;
        case 4:
          c[u].fn.call(c[u].context, e, n, r);
          break;
        default:
          if (!s) {
            h = 1;
            s = new Array(f - 1);
            for (; h < f; h++) {
              s[h - 1] = arguments[h];
            }
          }
          c[u].fn.apply(c[u].context, s);
      }
    }
  }
  return true;
};
o.prototype.on = function (t, e, n) {
  var o = new r(e, n || this);
  var i = l ? l + t : t;
  if (this._events[i]) {
    if (this._events[i].fn) {
      this._events[i] = [this._events[i], o];
    } else {
      this._events[i].push(o);
    }
  } else {
    this._events[i] = o;
    this._eventsCount++;
  }
  return this;
};
o.prototype.once = function (t, e, n) {
  var o = new r(e, n || this, true);
  var i = l ? l + t : t;
  if (this._events[i]) {
    if (this._events[i].fn) {
      this._events[i] = [this._events[i], o];
    } else {
      this._events[i].push(o);
    }
  } else {
    this._events[i] = o;
    this._eventsCount++;
  }
  return this;
};
o.prototype.removeListener = function (t, e, r, o) {
  var i = l ? l + t : t;
  if (!this._events[i]) {
    return this;
  }
  if (!e) {
    if (--this._eventsCount == 0) {
      this._events = new n();
    } else {
      delete this._events[i];
    }
    return this;
  }
  var a = this._events[i];
  if (a.fn) {
    if (a.fn === e && (!o || !!a.once) && (!r || a.context === r)) {
      if (--this._eventsCount == 0) {
        this._events = new n();
      } else {
        delete this._events[i];
      }
    }
  } else {
    for (var s = 0, u = [], c = a.length; s < c; s++) {
      if (a[s].fn !== e || o && !a[s].once || r && a[s].context !== r) {
        u.push(a[s]);
      }
    }
    if (u.length) {
      this._events[i] = u.length === 1 ? u[0] : u;
    } else if (--this._eventsCount == 0) {
      this._events = new n();
    } else {
      delete this._events[i];
    }
  }
  return this;
};
o.prototype.removeAllListeners = function (t) {
  var e;
  if (t) {
    e = l ? l + t : t;
    if (this._events[e]) {
      if (--this._eventsCount == 0) {
        this._events = new n();
      } else {
        delete this._events[e];
      }
    }
  } else {
    this._events = new n();
    this._eventsCount = 0;
  }
  return this;
};
o.prototype.off = o.prototype.removeListener;
o.prototype.addListener = o.prototype.on;
o.prototype.setMaxListeners = function () {
  return this;
};
o.prefixed = l;
o.EventEmitter = o;
if (module !== undefined) {
  module.exports = o;
}