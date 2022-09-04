"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.shallowObjectDiff = void 0;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}













const shallowObjectDiff = (left, right) => {
  const leftProps = new Set(Object.keys(left));
  const rightProps = new Set(Object.keys(right));
  const missing = Object.keys(left).filter((p) => !rightProps.has(p));
  const extra = Object.keys(right).filter((p) => !leftProps.has(p));
  const inBoth = Object.keys(left).filter((p) => rightProps.has(p));
  const differentValue = inBoth.filter((p) => !_lodash.default.isEqual(left[p], right[p]));
  const all = missing.concat(extra, differentValue);
  return {
    isDifferent: !!all.length,
    missing,
    extra,
    differentValue,
    all };

};exports.shallowObjectDiff = shallowObjectDiff;