"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Section = void 0;
var _sift = _interopRequireDefault(require("sift"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable react/no-multi-comp */







// eslint-disable-next-line max-statements
const Section = ({ data, children, showIf: condition }) => {
  const filtered = data.filter((0, _sift.default)(condition));
  return filtered.length > 0 ? children : null;
};exports.Section = Section;