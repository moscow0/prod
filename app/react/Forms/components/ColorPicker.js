"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactColor = require("react-color");

var _colors = require("../../utils/colors");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ColorPicker extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { active: false };
    this.onButtonClick = this.onButtonClick.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
  }

  onColorChange({ hex }) {
    const { onChange } = this.props;
    onChange(hex);
  }

  onButtonClick() {
    this.setState((oldState) => ({ active: !oldState.active }));
  }

  onBlur() {
    this.setState({ active: false });
  }

  render() {
    const { active } = this.state;
    const { value, defaultValue } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "ColorPicker" }, void 0, /*#__PURE__*/
      _jsx("div", {
        className: "ColorPicker__button",
        style: { backgroundColor: value || defaultValue },
        onClick: this.props.disabled ? () => {} : this.onButtonClick }),

      active && /*#__PURE__*/
      _jsx("div", { className: "ColorPicker__popover" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "ColorPicker__cover", onClick: this.onBlur }), /*#__PURE__*/
      _jsx(_reactColor.TwitterPicker, {
        color: value || defaultValue,
        colors: _colors.COLORS,
        onChangeComplete: this.onColorChange }))));





  }}


ColorPicker.defaultProps = {
  value: '',
  defaultValue: '',
  disabled: false };var _default =









ColorPicker;exports.default = _default;