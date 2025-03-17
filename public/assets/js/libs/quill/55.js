function n(t) {
  var e = [];
  for (var n in t) {
    e.push(n);
  }
  return e;
}
(module.exports = typeof Object.keys == "function" ? Object.keys : n).shim = n;