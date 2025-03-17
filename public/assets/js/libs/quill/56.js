function n(t) {
  return Object.prototype.toString.call(t) == "[object Arguments]";
}
function r(t) {
  return t && typeof t == "object" && typeof t.length == "number" && Object.prototype.hasOwnProperty.call(t, "callee") && !Object.prototype.propertyIsEnumerable.call(t, "callee") || false;
}
var o = function () {
  return Object.prototype.toString.call(arguments);
}() == "[object Arguments]";
(exports = module.exports = o ? n : r).supported = n;
exports.unsupported = r;