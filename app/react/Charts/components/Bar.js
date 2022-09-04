"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RechartsBar = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _recharts = require("recharts");











var _arrayUtils = _interopRequireDefault(require("../utils/arrayUtils"));

var _colorScheme = _interopRequireDefault(require("../utils/colorScheme"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ExtendedTooltip extends _react.default.Component {
  render() {
    if (this.props.active) {
      return /*#__PURE__*/(
        _jsx("div", { style: { backgroundColor: '#fff', border: '1px solid #ccc' } }, void 0, /*#__PURE__*/
        _jsx("div", { style: { backgroundColor: '#eee', borderBottom: '1px dashed #ccc', padding: '5px' } }, void 0,
        this.props.chartLabel), /*#__PURE__*/

        _jsx("div", { style: { padding: '5px' } }, void 0,
        this.props.payload[0].payload.name, ":\xA0\xA0", /*#__PURE__*/
        _jsx("b", { style: { color: '#600' } }, void 0, this.props.payload[0].value))));



    }
    return null;
  }}








const ColoredBar = (props) => {
  const { index } = props;
  return /*#__PURE__*/_react.default.createElement(_recharts.Rectangle, _extends({}, props, { stroke: "none", fill: _colorScheme.default[index % _colorScheme.default.length] }));
};










class RechartsBar extends _react.Component {
  static getDerivedStateFromProps(props) {
    return RechartsBar.mountData(props);
  }

  static mountData(props) {
    let fullData = [];

    if (props.data) {
      fullData = props.data.map((item) => ({
        name: item.label,
        value: item.results,
        xAxisName: '' }));

    }

    return { fullData };
  }

  render() {
    return /*#__PURE__*/(
      _jsx(_recharts.ResponsiveContainer, { height: 320 }, void 0, /*#__PURE__*/
      _jsx(_recharts.BarChart, {
        height: 300,
        data: this.state.fullData,
        margin: { top: 0, right: 30, left: 0, bottom: 0 } }, void 0, /*#__PURE__*/

      _jsx(_recharts.XAxis, { dataKey: "xAxisName", label: this.props.chartLabel }), /*#__PURE__*/
      _jsx(_recharts.YAxis, {}), /*#__PURE__*/
      _jsx(_recharts.CartesianGrid, { strokeDasharray: "2 4" }), /*#__PURE__*/
      _jsx(_recharts.Tooltip, {
        content: /*#__PURE__*/
        _jsx(ExtendedTooltip, {
          parentData: this.state.fullData,
          chartLabel: this.props.chartLabel }) }), /*#__PURE__*/



      _jsx(_recharts.Bar, { dataKey: "value", fill: "#D24040", shape: /*#__PURE__*/_jsx(ColoredBar, {}) }), /*#__PURE__*/
      _jsx(_recharts.Legend, { payload: _arrayUtils.default.formatPayload(this.state.fullData) }))));



  }}exports.RechartsBar = RechartsBar;var _default =







(0, _reactRedux.connect)()(RechartsBar);exports.default = _default;