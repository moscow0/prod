"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const ExtendedTooltip = (props) => {
  if (props.active) {
    const dataSetA = props.payload[0];
    const dataSetB = props.payload[1];

    return /*#__PURE__*/(
      _jsx("div", { style: { backgroundColor: '#fff', border: '1px solid #ccc' } }, void 0, /*#__PURE__*/
      _jsx("div", { style: { backgroundColor: '#eee', borderBottom: '1px dashed #ccc', padding: '5px' } }, void 0,
      dataSetA.payload.name, ":\xA0\xA0", /*#__PURE__*/
      _jsx("b", { style: { color: '#600' } }, void 0, dataSetA.value + dataSetB.value)), /*#__PURE__*/

      _jsx("div", { style: { padding: '5px' } }, void 0,
      dataSetA.payload.setALabel, ":\xA0\xA0", /*#__PURE__*/_jsx("b", { style: { color: '#600' } }, void 0, dataSetA.value), /*#__PURE__*/
      _jsx("br", {}),
      dataSetB.payload.setBLabel, ":\xA0\xA0", /*#__PURE__*/_jsx("b", { style: { color: '#600' } }, void 0, dataSetB.value))));



  }
  return null;
};

ExtendedTooltip.defaultProps = {
  payload: [],
  active: false };var _default =







ExtendedTooltip;exports.default = _default;