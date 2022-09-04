"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ToggleDisplay extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.open };

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show() {
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
    this.props.onHide();
  }

  render() {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null,
      !this.state.show && /*#__PURE__*/_jsx("button", { onClick: this.show }, void 0, this.props.showLabel),
      this.state.show && /*#__PURE__*/_jsx("button", { onClick: this.hide }, void 0, this.props.hideLabel),
      this.state.show && this.props.children));


  }}


ToggleDisplay.defaultProps = {
  onHide: () => {},
  showLabel: 'show',
  hideLabel: 'hide',
  open: false };var _default =












ToggleDisplay;exports.default = _default;