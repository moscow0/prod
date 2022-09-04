"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.LibraryChartComponent = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");

var _ = require("./..");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class LibraryChartComponent extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { type: 'pie' };
    this.maxPieItems = 14;
    this.assignType = this.assignType.bind(this);
    this.typeButton = this.typeButton.bind(this);
  }

  assignType(type) {
    return () => {
      this.setState({ type });
    };
  }

  clusterResults(options) {
    return options.reduce((_clusteredResults, option, optionIndex) => {
      const clusteredResults = _clusteredResults;
      if (optionIndex < this.maxPieItems) {
        clusteredResults.push(option);
      }

      if (optionIndex === this.maxPieItems) {
        clusteredResults.push({ label: (0, _I18N.t)('System', 'Other'), results: option.results });
      }

      if (optionIndex > this.maxPieItems) {
        clusteredResults[clusteredResults.length - 1].results += option.results;
      }

      return clusteredResults;
    }, []);
  }

  typeButton(type) {
    const className = `btn btn-sm ${this.state.type === type ? 'btn-success' : 'btn-default'}`;
    return /*#__PURE__*/(
      _jsx("button", { className: className, onClick: this.assignType(type) }, void 0, /*#__PURE__*/
      _jsx("i", { className: `fa fa-${type}-chart` })));


  }

  render() {
    if (!this.props.options) {
      return null;
    }

    const chart =
    this.state.type === 'pie' ? /*#__PURE__*/
    _jsx(_.Pie, { data: this.clusterResults(this.props.options) }) : /*#__PURE__*/

    _jsx(_.Bar, { data: this.props.options, chartLabel: this.props.label });


    return /*#__PURE__*/(
      _jsx("div", { className: "item item-chart" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "item-chart-type" }, void 0,
      this.typeButton('pie'),
      this.typeButton('bar')), /*#__PURE__*/

      _jsx("p", {}, void 0, this.props.label),
      chart)));



  }}exports.LibraryChartComponent = LibraryChartComponent;


LibraryChartComponent.defaultProps = {
  options: [],
  label: null };var _default =







(0, _reactRedux.connect)()(LibraryChartComponent);exports.default = _default;