"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.PieChartComponent = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = _interopRequireDefault(require("immutable"));

var _recharts = require("recharts");

var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
var _Charts = require("../../Charts");
var _PieChartLabel = _interopRequireDefault(require("./PieChartLabel"));
var _markdownDatasets = _interopRequireDefault(require("../markdownDatasets"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const formatData = (data, property, options) => {
  let formattedData = _Charts.arrayUtils.sortValues(_Charts.arrayUtils.formatDataForChart(data, property, options));

  if (options.scatter) {
    formattedData = formattedData.map((value) => ({
      id: value.id,
      label: `${value.parent} - ${value.label}`,
      results: value.results }));

  }

  return formattedData;
};

const PieChartComponent = (props) => {
  const {
    showLabel,
    outerRadius,
    innerRadius,
    property,
    data,
    classname,
    context,
    scatter,
    colors,
    maxCategories,
    pluckCategories } =
  props;

  let output = /*#__PURE__*/_jsx(_Loader.default, {});

  if (data) {
    const aggregateOthers = props.aggregateOthers === 'true';

    const formattedData = formatData(data, property, {
      context,
      scatter,
      excludeZero: true,
      maxCategories,
      aggregateOthers,
      pluckCategories: JSON.parse(pluckCategories) });


    const sliceColors = colors.split(',');
    const shouldShowLabel = showLabel === 'true';
    output = /*#__PURE__*/
    _jsx(_recharts.ResponsiveContainer, { width: "100%", height: 222 }, void 0, /*#__PURE__*/
    _jsx(_recharts.PieChart, { width: 222, height: 222 }, void 0, /*#__PURE__*/
    _jsx(_recharts.Pie, {
      data: formattedData,
      dataKey: "results",
      nameKey: "label",
      innerRadius: innerRadius,
      outerRadius: outerRadius,
      fill: "#8884d8",
      labelLine: shouldShowLabel,
      label: shouldShowLabel ? /*#__PURE__*/_jsx(_PieChartLabel.default, { data: formattedData }) : undefined }, void 0,

    formattedData.map((_entry, index) => /*#__PURE__*/
    _jsx(_recharts.Cell, { fill: sliceColors[index % sliceColors.length] }, index))),


    !shouldShowLabel && /*#__PURE__*/_jsx(_recharts.Tooltip, {})));



  }

  return /*#__PURE__*/_jsx("div", { className: `PieChart ${classname}` }, void 0, output);
};exports.PieChartComponent = PieChartComponent;

PieChartComponent.defaultProps = {
  context: 'System',
  scatter: false,
  innerRadius: '0',
  outerRadius: '105',
  classname: '',
  colors: '#ffcc00,#ffd633,#ffe066,#ffeb99,#fff5cc',
  data: null,
  showLabel: 'false',
  aggregateOthers: 'false',
  maxCategories: '0',
  pluckCategories: '[]' };

















const mapStateToProps = (state, props) => ({
  data: _markdownDatasets.default.getAggregations(state, props),
  thesauris: state.thesauris });exports.mapStateToProps = mapStateToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps)(PieChartComponent);exports.default = _default;