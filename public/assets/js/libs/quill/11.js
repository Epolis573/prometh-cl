Object.defineProperty(exports, "__esModule", {
  value: true
});
var r = require("./1.js");
var o = function () {
  function t(t, e, n = {}) {
    this.attrName = t;
    this.keyName = e;
    var o = r.Scope.TYPE & r.Scope.ATTRIBUTE;
    if (n.scope != null) {
      this.scope = n.scope & r.Scope.LEVEL | o;
    } else {
      this.scope = r.Scope.ATTRIBUTE;
    }
    if (n.whitelist != null) {
      this.whitelist = n.whitelist;
    }
  }
  t.keys = function (t) {
    return [].map.call(t.attributes, function (t) {
      return t.name;
    });
  };
  t.prototype.add = function (t, e) {
    return !!this.canAdd(t, e) && (t.setAttribute(this.keyName, e), true);
  };
  t.prototype.canAdd = function (t, e) {
    return r.query(t, r.Scope.BLOT & (this.scope | r.Scope.TYPE)) != null && (this.whitelist == null || (typeof e == "string" ? this.whitelist.indexOf(e.replace(/["']/g, "")) > -1 : this.whitelist.indexOf(e) > -1));
  };
  t.prototype.remove = function (t) {
    t.removeAttribute(this.keyName);
  };
  t.prototype.value = function (t) {
    var e = t.getAttribute(this.keyName);
    if (this.canAdd(t, e) && e) {
      return e;
    } else {
      return "";
    }
  };
  return t;
}();
exports.default = o;