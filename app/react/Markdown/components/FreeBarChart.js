"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.CustomTooltip = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recharts = require("recharts");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}



















const X = ({ layout, dataKey }) =>
layout === 'vertical' ? /*#__PURE__*/
_jsx(_recharts.XAxis, { type: "number", dataKey: dataKey }) : /*#__PURE__*/

_jsx(_recharts.XAxis, { dataKey: "label", label: "" });


const Y = ({ layout }) =>
layout === 'vertical' ? /*#__PURE__*/_jsx(_recharts.YAxis, { width: 200, type: "category", dataKey: "label" }) : /*#__PURE__*/_jsx(_recharts.YAxis, {});







const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload[0]) {
    const finalItemStyle = {
      display: 'block',
      color: '#999',
      backgroundColor: 'rgba(255,255,255,0.9)',
      border: '1px solid #ccc',
      padding: '10px' };

    return /*#__PURE__*/(
      _jsx("div", { className: "custom-tooltip", style: finalItemStyle }, void 0, /*#__PURE__*/
      _jsx("p", { className: "tooltip-label", style: { margin: 0 } }, void 0,
      label, " :", ' ', /*#__PURE__*/
      _jsx("span", { className: "tooltip-label-value", style: { color: payload[0].color || '#000' } }, void 0,
      payload[0].value))));




  }

  return null;
};exports.CustomTooltip = CustomTooltip;

CustomTooltip.defaultProps = {
  active: false };















class FreeBarChart extends _react.Component {


  constructor(props) {
    super(props);
    this.state = { activeDataIndex: 0 };
    this.changeData = this.changeData.bind(this);
  }

  getDataKeys() {
    const { dataKeys } = this.props;
    if (dataKeys.indexOf('[') === 0) {
      return JSON.parse(dataKeys);
    }

    return [{ [dataKeys]: dataKeys }];
  }

  changeData(activeDataIndex) {
    return () => {
      this.setState({ activeDataIndex });
    };
  }

  render() {
    const { activeDataIndex } = this.state;
    const { layout, data, classname, colors, children } = this.props;
    let output = null;

    if (data) {
      const sliceColors = colors.split(',');
      const parsedData = JSON.parse(data);
      const dataKeysArray = this.getDataKeys();
      const dataKey = Object.keys(dataKeysArray[activeDataIndex])[0];
      output = /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null,
      dataKeysArray.length > 1 && /*#__PURE__*/
      _jsx("div", { className: "toggle-group" }, void 0,
      dataKeysArray.map((dataKeyValue, index) => /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: `btn ${
        activeDataIndex === index ? 'btn-primary' : 'btn-default'
        } toggle-group-button`,

        onClick: this.changeData(index) }, Object.keys(dataKeyValue)[0],

      Object.values(dataKeyValue)[0]))),




      children, /*#__PURE__*/
      _jsx(_recharts.ResponsiveContainer, { height: 320 }, void 0, /*#__PURE__*/
      _jsx(_recharts.BarChart, { height: 300, data: parsedData, layout: layout }, void 0,
      X({ layout, dataKey }),
      Y({ layout }), /*#__PURE__*/
      _jsx(_recharts.CartesianGrid, { strokeDasharray: "2 4" }), /*#__PURE__*/
      _jsx(_recharts.Tooltip, { content: /*#__PURE__*/_jsx(CustomTooltip, {}) }), /*#__PURE__*/
      _jsx(_recharts.Bar, { dataKey: dataKey, fill: "rgb(30, 28, 138)", stackId: "unique" }, void 0,
      parsedData.map((_entry, index) => /*#__PURE__*/
      _jsx(_recharts.Cell, {
        cursor: "pointer",
        fill: sliceColors[index % sliceColors.length] },
      `cell-${index}`))))));







    }

    return /*#__PURE__*/_jsx("div", { className: `BarChart ${classname}` }, void 0, output);
  }}_defineProperty(FreeBarChart, "defaultProps", void 0);


FreeBarChart.defaultProps = {
  classname: '',
  layout: 'horizontal',
  data: null,
  dataKeys: 'results',
  colors: '#1e1c8a',
  children: null };var _default =


FreeBarChart;exports.default = _default;