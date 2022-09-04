"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.GaugeChartComponent = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));

var _recharts = require("recharts");

var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
var _markdownDatasets = _interopRequireDefault(require("../markdownDatasets"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const GaugeChartComponent = (props) => {
  const { dataset, property, value, max, height, classname, colors, children } = props;
  let output = /*#__PURE__*/_jsx(_Loader.default, {});

  const propedChildren = _react.default.Children.map(children, (c) =>
  /*#__PURE__*/_react.default.isValidElement(c) ? /*#__PURE__*/_react.default.cloneElement(c, { dataset, property }) : c);


  if (value !== null) {
    const formattedData = [
    { label: 'progress', results: value },
    { label: '', results: max - value }];

    const sliceColors = colors.split(',');
    output = /*#__PURE__*/
    _jsx(_recharts.ResponsiveContainer, { width: "100%", height: height }, void 0, /*#__PURE__*/
    _jsx(_recharts.PieChart, { width: height * 2, height: height * 2 }, void 0, /*#__PURE__*/
    _jsx(_recharts.Pie, {
      data: formattedData,
      dataKey: "results",
      labelLine: false,
      outerRadius: height,
      innerRadius: Math.floor(height * 0.8),
      fill: "#8884d8",
      startAngle: 180,
      endAngle: 0,
      cy: height }, void 0,

    formattedData.map((_entry, index) => /*#__PURE__*/
    _jsx(_recharts.Cell, { fill: sliceColors[index % sliceColors.length] }, index))),


    propedChildren.length && /*#__PURE__*/
    _jsx("g", {}, void 0, /*#__PURE__*/
    _jsx("text", {
      x: "50%",
      y: height,
      dy: -1,
      style: { fontSize: `${height / 2}px` },
      textAnchor: "middle",
      fill: sliceColors[0] }, void 0,

    propedChildren))));






  }

  return /*#__PURE__*/_jsx("div", { className: `GaugeChart ${classname}` }, void 0, output);
};exports.GaugeChartComponent = GaugeChartComponent;

GaugeChartComponent.defaultProps = {
  dataset: undefined,
  classname: '',
  colors: '#000099,#ccc',
  value: null,
  children: '' };

















const mapStateToProps = (state, props) => ({
  value: _markdownDatasets.default.getMetadataValue(state, props),
  max: Number(props.max) || 100,
  height: Number(props.height) || 110 });exports.mapStateToProps = mapStateToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps)(GaugeChartComponent);exports.default = _default;