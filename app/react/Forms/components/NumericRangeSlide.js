"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class NumericRangeSlide extends _react.Component {
  static getDerivedStateFromProps({ value }) {
    if (value) {
      return { value };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ value });
    const { delay, onChange } = this.props;
    if (delay) {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(() => {
        onChange(value ? parseFloat(value) : null);
      }, delay);

      return;
    }

    onChange(value ? parseFloat(value) : null);
  }

  renderTickMarksDatalist() {
    const { min, max, step, prefix } = this.props;
    return /*#__PURE__*/(
      _jsx("datalist", { id: `${prefix}-tickmarks` }, void 0, /*#__PURE__*/
      _jsx("option", { value: min }),
      (() => {
        const options = [];
        for (let i = min; i < max; i += step) {
          options.push( /*#__PURE__*/_jsx("option", { value: i.toFixed(2) }, i));
        }
        return options;
      })(), /*#__PURE__*/
      _jsx("option", { value: max })));


  }

  render() {
    const { min, max, step, prefix, minLabel, maxLabel } = this.props;
    const { value } = this.state;
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "NumericRangeSlide" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "range",
        list: `${prefix}-tickmarks`,
        min: min,
        max: max,
        step: step,
        onChange: this.onChange,
        value: value }), /*#__PURE__*/

      _jsx("div", { className: "NumericRangeSlide-range-labels" }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, minLabel), /*#__PURE__*/
      _jsx("span", {}, void 0, maxLabel))),


      this.renderTickMarksDatalist()));


  }}exports.default = NumericRangeSlide;


NumericRangeSlide.defaultProps = {
  onChange: () => {},
  value: 50,
  step: 5,
  min: 0,
  max: 100,
  prefix: '',
  delay: 0,
  minLabel: '',
  maxLabel: '' };