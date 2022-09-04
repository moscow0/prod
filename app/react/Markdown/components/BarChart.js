"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = _interopRequireDefault(require("immutable"));

var _recharts = require("recharts");










var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
var _Charts = require("../../Charts");
var _markdownDatasets = _interopRequireDefault(require("../markdownDatasets"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const objectFlip = (obj) => {
  const flip = {};
  Object.keys(obj).forEach((key) => {
    flip[obj[key]] = key;
  });
  return flip;
};

class BarChartComponent extends _react.Component {
  parseAttributes() {
    const shortLabels = JSON.parse(this.props.shortLabels);
    const sort = JSON.parse(this.props.sort);
    const pluckCategories = JSON.parse(this.props.pluckCategories);
    return { sort, shortLabels, pluckCategories };
  }

  X() {
    if (this.props.layout === 'vertical') {
      return /*#__PURE__*/_jsx(_recharts.XAxis, { type: "number", dataKey: "results" });
    }
    return /*#__PURE__*/_jsx(_recharts.XAxis, { dataKey: "label", label: "" });
  }

  Y() {
    if (this.props.layout === 'vertical') {
      return /*#__PURE__*/_jsx(_recharts.YAxis, { width: 200, type: "category", dataKey: "label" });
    }
    return /*#__PURE__*/_jsx(_recharts.YAxis, {});
  }

  render() {
    const {
      excludeZero,
      maxCategories,
      layout,
      property,
      data,
      classname,
      context,
      scatter,
      colors } =
    this.props;
    let output = /*#__PURE__*/_jsx(_Loader.default, {});

    if (data) {
      const sliceColors = colors.split(',');
      const aggregateOthers = this.props.aggregateOthers === 'true';
      const { sort, shortLabels, pluckCategories } = this.parseAttributes();
      const shortLabelsFlipped = objectFlip(shortLabels);

      const formattedData = _Charts.arrayUtils.formatDataForChart(data, property, {
        excludeZero: Boolean(excludeZero),
        context,
        scatter: Boolean(scatter),
        maxCategories,
        aggregateOthers,
        pluckCategories,
        sort,
        labelsMap: shortLabels });


      output = /*#__PURE__*/
      _jsx(_recharts.ResponsiveContainer, { height: 320 }, void 0, /*#__PURE__*/
      _jsx(_recharts.BarChart, { height: 300, data: formattedData, layout: layout }, void 0,
      this.X(),
      this.Y(), /*#__PURE__*/

      _jsx(_recharts.CartesianGrid, { strokeDasharray: "2 4" }), /*#__PURE__*/
      _jsx(_recharts.Tooltip, {
        formatter: (value, _name, props) => {
          if (scatter) {
            const { parent } = props.payload;
            return shortLabelsFlipped[value] || [value, `\r\n${parent}`];
          }
          return shortLabelsFlipped[value] || value;
        } }), /*#__PURE__*/

      _jsx(_recharts.Bar, { dataKey: "results", fill: "rgb(30, 28, 138)", stackId: "unique" }, void 0,
      formattedData.map((_entry, index) => /*#__PURE__*/
      _jsx(_recharts.Cell
      // eslint-disable-next-line react/no-array-index-key
      , {
        cursor: "pointer",
        fill: sliceColors[index % sliceColors.length] }, `cell-${index}`)))));






    }

    return /*#__PURE__*/_jsx("div", { className: `BarChart ${classname}` }, void 0, output);
  }}


BarChartComponent.defaultProps = {
  context: 'System',
  scatter: false,
  excludeZero: false,
  layout: 'horizontal',
  maxCategories: '0',
  aggregateOthers: 'false',
  classname: '',
  data: null,
  colors: '#1e1c8a',
  shortLabels: '{}',
  sort: '{}',
  pluckCategories: '[]' };


















const mapStateToProps = (state, props) => ({
  data: _markdownDatasets.default.getAggregations(state, props),
  thesauris: state.thesauris });exports.mapStateToProps = mapStateToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps)(BarChartComponent);exports.default = _default;