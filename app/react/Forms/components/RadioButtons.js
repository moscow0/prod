"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RadioButtons extends _react.Component {
  change(value) {
    this.props.onChange(value);
  }

  checked(value) {
    return value === this.props.value;
  }

  renderLabel(opt) {
    if (this.props.renderLabel) {
      return this.props.renderLabel(opt);
    }

    const { optionsLabel } = this.props;
    return opt[optionsLabel];
  }

  render() {
    const { optionsValue, prefix, options } = this.props;

    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      options.map((option) => /*#__PURE__*/
      _jsx("div", { className: "radio" }, option[optionsValue], /*#__PURE__*/
      _jsx("label", { htmlFor: prefix + option[optionsValue] }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "radio",
        value: option[optionsValue],
        id: prefix + option[optionsValue],
        onChange: this.change.bind(this, option[optionsValue]),
        checked: this.checked(option[optionsValue]) }), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, this.renderLabel(option)))))));





  }}exports.default = RadioButtons;


RadioButtons.defaultProps = {
  optionsLabel: 'label',
  optionsValue: 'value',
  prefix: '',
  renderLabel: undefined,
  value: null };