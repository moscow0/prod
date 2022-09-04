"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _recharts = require("recharts");










var _arrayUtils = _interopRequireDefault(require("../utils/arrayUtils"));

var _ExtendedTooltip = _interopRequireDefault(require("./ExtendedTooltip"));
var _ColoredBar = _interopRequireDefault(require("./ColoredBar"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const StackedDualBarChart = (props) => {
  const { data, chartLabel } = props;

  return /*#__PURE__*/(
    _jsx(_recharts.ResponsiveContainer, { height: 320 }, void 0, /*#__PURE__*/
    _jsx(_recharts.BarChart, { height: 300, data: data, margin: { top: 0, right: 30, left: 0, bottom: 0 } }, void 0, /*#__PURE__*/
    _jsx(_recharts.XAxis, { dataKey: "xAxisName", label: "" }), /*#__PURE__*/
    _jsx(_recharts.YAxis, {}), /*#__PURE__*/
    _jsx(_recharts.CartesianGrid, { strokeDasharray: "2 4" }), /*#__PURE__*/
    _jsx(_recharts.Tooltip, { content: /*#__PURE__*/_jsx(_ExtendedTooltip.default, { parentData: data, chartLabel: chartLabel }) }), /*#__PURE__*/
    _jsx(_recharts.Bar, { dataKey: "setAValue", fill: "#D24040", shape: /*#__PURE__*/_jsx(_ColoredBar.default, {}), stackId: "unique" }), /*#__PURE__*/
    _jsx(_recharts.Bar, {
      dataKey: "setBValue",
      fill: "#D24040",
      shape: /*#__PURE__*/_jsx(_ColoredBar.default, { color: "light" }),
      stackId: "unique" }), /*#__PURE__*/

    _jsx(_recharts.Legend, { payload: _arrayUtils.default.formatPayload(data) }))));



};

StackedDualBarChart.defaultProps = {
  data: [],
  chartLabel: null };var _default =







StackedDualBarChart;exports.default = _default;