"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TrainingHealthLegend = void 0;var _I18N = require("../I18N");
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}


















const toPercentage = (value, total) => `${(value / total * 100).toFixed(2)}%`;

const TrainingHealthLegend = ({ data, total, accuracy }) => /*#__PURE__*/
_jsx("ul", { className: "legend" }, void 0,
data.map((td) =>
td.label ? /*#__PURE__*/
_jsx("li", { style: { color: td.label.color || td.color } }, `${td.color}-${td.value}`,
td.label.text, ' ', /*#__PURE__*/
_jsx("b", {}, void 0,
td.value, " (", toPercentage(td.value, total), ")")) :


null), /*#__PURE__*/

_jsx("li", { style: { color: '#6c6c7b' } }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Accuracy"), " ", (accuracy * 100).toFixed(2), "%"));exports.TrainingHealthLegend = TrainingHealthLegend;