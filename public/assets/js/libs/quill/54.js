function n(t, e, n) {
  if (t == e) {
    if (t) {
      return [[v, t]];
    } else {
      return [];
    }
  }
  if (n < 0 || t.length < n) {
    n = null;
  }
  var o = l(t, e);
  var i = t.substring(0, o);
  o = a(t = t.substring(o), e = e.substring(o));
  var s = t.substring(t.length - o);
  var c = r(t = t.substring(0, t.length - o), e = e.substring(0, e.length - o));
  if (i) {
    c.unshift([v, i]);
  }
  if (s) {
    c.push([v, s]);
  }
  u(c);
  if (n != null) {
    c = f(c, n);
  }
  return function h(t) {
    var e = false;
    var n = function (t) {
      return t.charCodeAt(0) >= 56320 && t.charCodeAt(0) <= 57343;
    };
    for (var r = 2; r < t.length; r += 1) {
      if (t[r - 2][0] === v && function (t) {
        return t.charCodeAt(t.length - 1) >= 55296 && t.charCodeAt(t.length - 1) <= 56319;
      }(t[r - 2][1]) && t[r - 1][0] === d && n(t[r - 1][1]) && t[r][0] === y && n(t[r][1])) {
        e = true;
        t[r - 1][1] = t[r - 2][1].slice(-1) + t[r - 1][1];
        t[r][1] = t[r - 2][1].slice(-1) + t[r][1];
        t[r - 2][1] = t[r - 2][1].slice(0, -1);
      }
    }
    if (!e) {
      return t;
    }
    var o = [];
    for (r = 0; r < t.length; r += 1) {
      if (t[r][1].length > 0) {
        o.push(t[r]);
      }
    }
    return o;
  }(c);
}
function r(t, e) {
  var r;
  if (!t) {
    return [[y, e]];
  }
  if (!e) {
    return [[d, t]];
  }
  var i = t.length > e.length ? t : e;
  var l = t.length > e.length ? e : t;
  var a = i.indexOf(l);
  if (a != -1) {
    r = [[y, i.substring(0, a)], [v, l], [y, i.substring(a + l.length)]];
    if (t.length > e.length) {
      r[0][0] = r[2][0] = d;
    }
    return r;
  }
  if (l.length == 1) {
    return [[d, t], [y, e]];
  }
  var u = s(t, e);
  if (u) {
    var c = u[0];
    var f = u[1];
    var h = u[2];
    var p = u[3];
    var b = u[4];
    var g = n(c, h);
    var m = n(f, p);
    return g.concat([[v, b]], m);
  }
  return o(t, e);
}
function o(t, e) {
  var n = t.length;
  var r = e.length;
  var o = Math.ceil((n + r) / 2);
  var l = o;
  for (var a = o * 2, s = new Array(a), u = new Array(a), c = 0; c < a; c++) {
    s[c] = -1;
    u[c] = -1;
  }
  s[l + 1] = 0;
  u[l + 1] = 0;
  var f = n - r;
  var h = f % 2 != 0;
  var p = 0;
  var v = 0;
  var b = 0;
  var g = 0;
  for (var m = 0; m < o; m++) {
    for (var _ = -m + p; _ <= m - v; _ += 2) {
      var w = l + _;
      for (var x = (O = _ == -m || _ != m && s[w - 1] < s[w + 1] ? s[w + 1] : s[w - 1] + 1) - _; O < n && x < r && t.charAt(O) == e.charAt(x);) {
        O++;
        x++;
      }
      s[w] = O;
      if (O > n) {
        v += 2;
      } else if (x > r) {
        p += 2;
      } else if (h) {
        if ((k = l + f - _) >= 0 && k < a && u[k] != -1) {
          if (O >= (E = n - u[k])) {
            return i(t, e, O, x);
          }
        }
      }
    }
    for (var N = -m + b; N <= m - g; N += 2) {
      for (var E, k = l + N, j = (E = N == -m || N != m && u[k - 1] < u[k + 1] ? u[k + 1] : u[k - 1] + 1) - N; E < n && j < r && t.charAt(n - E - 1) == e.charAt(r - j - 1);) {
        E++;
        j++;
      }
      u[k] = E;
      if (E > n) {
        g += 2;
      } else if (j > r) {
        b += 2;
      } else if (!h) {
        if ((w = l + f - N) >= 0 && w < a && s[w] != -1) {
          var O;
          x = l + (O = s[w]) - w;
          if (O >= (E = n - E)) {
            return i(t, e, O, x);
          }
        }
      }
    }
  }
  return [[d, t], [y, e]];
}
function i(t, e, r, o) {
  var i = t.substring(0, r);
  var l = e.substring(0, o);
  var a = t.substring(r);
  var s = e.substring(o);
  var u = n(i, l);
  var c = n(a, s);
  return u.concat(c);
}
function l(t, e) {
  if (!t || !e || t.charAt(0) != e.charAt(0)) {
    return 0;
  }
  for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o;) {
    if (t.substring(i, o) == e.substring(i, o)) {
      i = n = o;
    } else {
      r = o;
    }
    o = Math.floor((r - n) / 2 + n);
  }
  return o;
}
function a(t, e) {
  if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1)) {
    return 0;
  }
  for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o;) {
    if (t.substring(t.length - o, t.length - i) == e.substring(e.length - o, e.length - i)) {
      i = n = o;
    } else {
      r = o;
    }
    o = Math.floor((r - n) / 2 + n);
  }
  return o;
}
function s(t, e) {
  function n(t, e, n) {
    for (var r, o, i, s, u = t.substring(n, n + Math.floor(t.length / 4)), c = -1, f = ""; (c = e.indexOf(u, c + 1)) != -1;) {
      var h = l(t.substring(n), e.substring(c));
      var p = a(t.substring(0, n), e.substring(0, c));
      if (f.length < p + h) {
        f = e.substring(c - p, c) + e.substring(c, c + h);
        r = t.substring(0, n - p);
        o = t.substring(n + h);
        i = e.substring(0, c - p);
        s = e.substring(c + h);
      }
    }
    if (f.length * 2 >= t.length) {
      return [r, o, i, s, f];
    } else {
      return null;
    }
  }
  var r = t.length > e.length ? t : e;
  var o = t.length > e.length ? e : t;
  if (r.length < 4 || o.length * 2 < r.length) {
    return null;
  }
  var i;
  var c;
  var f;
  var h;
  var p;
  var s = n(r, o, Math.ceil(r.length / 4));
  var u = n(r, o, Math.ceil(r.length / 2));
  if (s || u) {
    i = u ? s && s[4].length > u[4].length ? s : u : s;
    if (t.length > e.length) {
      c = i[0];
      f = i[1];
      h = i[2];
      p = i[3];
    } else {
      h = i[0];
      p = i[1];
      c = i[2];
      f = i[3];
    }
    return [c, f, h, p, i[4]];
  } else {
    return null;
  }
}
function u(t) {
  t.push([v, ""]);
  var e;
  for (var n = 0, r = 0, o = 0, i = "", s = ""; n < t.length;) {
    switch (t[n][0]) {
      case y:
        o++;
        s += t[n][1];
        n++;
        break;
      case d:
        r++;
        i += t[n][1];
        n++;
        break;
      case v:
        if (r + o > 1) {
          if (r !== 0 && o !== 0) {
            if ((e = l(s, i)) !== 0) {
              if (n - r - o > 0 && t[n - r - o - 1][0] == v) {
                t[n - r - o - 1][1] += s.substring(0, e);
              } else {
                t.splice(0, 0, [v, s.substring(0, e)]);
                n++;
              }
              s = s.substring(e);
              i = i.substring(e);
            }
            if ((e = a(s, i)) !== 0) {
              t[n][1] = s.substring(s.length - e) + t[n][1];
              s = s.substring(0, s.length - e);
              i = i.substring(0, i.length - e);
            }
          }
          if (r === 0) {
            t.splice(n - o, r + o, [y, s]);
          } else if (o === 0) {
            t.splice(n - r, r + o, [d, i]);
          } else {
            t.splice(n - r - o, r + o, [d, i], [y, s]);
          }
          n = n - r - o + (r ? 1 : 0) + (o ? 1 : 0) + 1;
        } else if (n !== 0 && t[n - 1][0] == v) {
          t[n - 1][1] += t[n][1];
          t.splice(n, 1);
        } else {
          n++;
        }
        o = 0;
        r = 0;
        i = "";
        s = "";
    }
  }
  if (t[t.length - 1][1] === "") {
    t.pop();
  }
  var c = false;
  for (n = 1; n < t.length - 1;) {
    if (t[n - 1][0] == v && t[n + 1][0] == v) {
      if (t[n][1].substring(t[n][1].length - t[n - 1][1].length) == t[n - 1][1]) {
        t[n][1] = t[n - 1][1] + t[n][1].substring(0, t[n][1].length - t[n - 1][1].length);
        t[n + 1][1] = t[n - 1][1] + t[n + 1][1];
        t.splice(n - 1, 1);
        c = true;
      } else if (t[n][1].substring(0, t[n + 1][1].length) == t[n + 1][1]) {
        t[n - 1][1] += t[n + 1][1];
        t[n][1] = t[n][1].substring(t[n + 1][1].length) + t[n + 1][1];
        t.splice(n + 1, 1);
        c = true;
      }
    }
    n++;
  }
  if (c) {
    u(t);
  }
}
function f(t, e) {
  var n = function c(t, e) {
    if (e === 0) {
      return [v, t];
    }
    var n = 0;
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      if (o[0] === d || o[0] === v) {
        var i = n + o[1].length;
        if (e === i) {
          return [r + 1, t];
        }
        if (e < i) {
          t = t.slice();
          var l = e - n;
          var a = [o[0], o[1].slice(0, l)];
          var s = [o[0], o[1].slice(l)];
          t.splice(r, 1, a, s);
          return [r + 1, t];
        }
        n = i;
      }
    }
    throw new Error("cursor_pos is out of bounds!");
  }(t, e);
  var r = n[1];
  var o = n[0];
  var i = r[o];
  var l = r[o + 1];
  if (i == null) {
    return t;
  }
  if (i[0] !== v) {
    return t;
  }
  if (l != null && i[1] + l[1] === l[1] + i[1]) {
    r.splice(o, 2, l, i);
    return p(r, o, 2);
  }
  if (l != null && l[1].indexOf(i[1]) === 0) {
    r.splice(o, 2, [l[0], i[1]], [0, i[1]]);
    var a = l[1].slice(i[1].length);
    if (a.length > 0) {
      r.splice(o + 2, 0, [l[0], a]);
    }
    return p(r, o, 3);
  }
  return t;
}
function p(t, e, n) {
  for (var r = e + n - 1; r >= 0 && r >= e - 1; r--) {
    if (r + 1 < t.length) {
      var o = t[r];
      var i = t[r + 1];
      if (o[0] === i[1]) {
        t.splice(r, 2, [o[0], o[1] + i[1]]);
      }
    }
  }
  return t;
}
var d = -1;
var y = 1;
var v = 0;
var b = n;
b.INSERT = y;
b.DELETE = d;
b.EQUAL = v;
module.exports = b;