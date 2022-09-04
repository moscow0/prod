"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.countryKey = exports.countriesTemplate = void 0;var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _Charts = require("../../../Charts");
var _Loader = _interopRequireDefault(require("../../../components/Elements/Loader"));
var _I18N = require("../../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const countriesTemplate = '58b2f3a35d59f31e1345b480';exports.countriesTemplate = countriesTemplate;
const countryKey = 'pa_s';exports.countryKey = countryKey;

class CejilChart extends _react.Component {
  componentDidMount() {
    this.props.getData.call(this).then(([groupedResults, setA, setB]) => {
      this.setState({ groupedResults, setA, setB });
    });
  }

  render() {
    let output = /*#__PURE__*/_jsx(_Loader.default, {});

    if (this.state && this.state.groupedResults) {
      const { aggregations } = this.state.groupedResults;
      const countriesData = this.props.thesauris.find(
      (thesaury) => thesaury.get('_id') === countriesTemplate);


      let data = _Charts.arrayUtils.sortValues(
      aggregations.all[countryKey].buckets.
      filter((country) => country.filtered.doc_count && country.key !== 'any').
      map((_country) => {
        const country = _country;
        const foundCountry = countriesData.get('values').find((v) => v.get('id') === country.key);
        country.label = foundCountry ?
        foundCountry.get('label') :
        (0, _I18N.t)('System', 'No Value', null, false);
        country.results = country.filtered.doc_count;
        return country;
      }));


      data = this.props.prepareData.call(this, data, this.state.setA, this.state.setB);

      output = /*#__PURE__*/
      _jsx("div", { className: "item item-chart" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, this.props.label), /*#__PURE__*/
      _jsx(_Charts.StackedDualBarChart, { data: data, chartLabel: this.props.label }));


    }

    return /*#__PURE__*/(
      _jsx("div", { className: "item-group-charts", style: { paddingTop: '15px', paddingRight: '15px' } }, void 0,
      output));


  }}


CejilChart.defaultProps = {
  label: null };var _default =









CejilChart;exports.default = _default;