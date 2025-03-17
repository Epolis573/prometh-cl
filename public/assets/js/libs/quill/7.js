function r(t, e) {
  if (!(t instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
var o = function t(e, n = {}) {
  r(this, t);
  this.quill = e;
  this.options = n;
};
o.DEFAULTS = {};
exports.default = o;