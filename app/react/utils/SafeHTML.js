"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _htmlToReact = require("html-to-react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const myParser = new _htmlToReact.Parser();
const stringToReact = (string) => myParser.parse(string);

const SafeHTML = ({ children }) => /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, stringToReact(children));

SafeHTML.propTypes = {
  children: _propTypes.default.string.isRequired };var _default =


SafeHTML;exports.default = _default;