"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const PieChartLabel = (props) => {
  const { data, cx, cy, midAngle, innerRadius, outerRadius, value, index } = props;

  const RADIAN = Math.PI / 180;
  const radius = 25 + innerRadius + (outerRadius - innerRadius);
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return /*#__PURE__*/(
    _jsx("text", {
      x: x,
      y: y,
      fill: "#8884d8",
      textAnchor: x > cx ? 'start' : 'end',
      dominantBaseline: "central" }, void 0,

    data[index].label, " (", value, ")"));


};

PieChartLabel.defaultProps = {
  cx: 0,
  cy: 0,
  value: 0,
  innerRadius: 0,
  outerRadius: 0,
  midAngle: 0,
  index: 0 };var _default =

















PieChartLabel;exports.default = _default;