Object.defineProperty(exports, "__esModule", {
  value: true
});
var r = require("./11.js");
var o = require("./29.js");
var i = require("./30.js");
var l = require("./1.js");
var a = function () {
  function t(t) {
    this.attributes = {};
    this.domNode = t;
    this.build();
  }
  t.prototype.attribute = function (t, e) {
    if (e) {
      if (t.add(this.domNode, e)) {
        if (t.value(this.domNode) != null) {
          this.attributes[t.attrName] = t;
        } else {
          delete this.attributes[t.attrName];
        }
      }
    } else {
      t.remove(this.domNode);
      delete this.attributes[t.attrName];
    }
  };
  t.prototype.build = function () {
    var t = this;
    this.attributes = {};
    var e = r.default.keys(this.domNode);
    var n = o.default.keys(this.domNode);
    var a = i.default.keys(this.domNode);
    e.concat(n).concat(a).forEach(function (e) {
      var n = l.query(e, l.Scope.ATTRIBUTE);
      if (n instanceof r.default) {
        t.attributes[n.attrName] = n;
      }
    });
  };
  t.prototype.copy = function (t) {
    var e = this;
    Object.keys(this.attributes).forEach(function (n) {
      var r = e.attributes[n].value(e.domNode);
      t.format(n, r);
    });
  };
  t.prototype.move = function (t) {
    var e = this;
    this.copy(t);
    Object.keys(this.attributes).forEach(function (t) {
      e.attributes[t].remove(e.domNode);
    });
    this.attributes = {};
  };
  t.prototype.values = function () {
    var t = this;
    return Object.keys(this.attributes).reduce(function (e, n) {
      e[n] = t.attributes[n].value(t.domNode);
      return e;
    }, {});
  };
  return t;
}();
exports.default = a;