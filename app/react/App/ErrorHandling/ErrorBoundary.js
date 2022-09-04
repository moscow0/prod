"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ErrorBoundary = void 0;var _react = _interopRequireDefault(require("react"));
var _ErrorFallback = require("./ErrorFallback");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







const defaultProps = {
  error: {},
  errorInfo: '',
  children: '' };

class ErrorBoundary extends _react.default.Component {


  constructor(props) {
    super(props);
    this.state = { error: props.error, errorInfo: props.errorInfo };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo });

  }

  render() {var _this$state$error;
    if ((_this$state$error = this.state.error) !== null && _this$state$error !== void 0 && _this$state$error.message) {
      return /*#__PURE__*/_jsx(_ErrorFallback.ErrorFallback, { error: this.state.error, errorInfo: this.state.errorInfo });
    }
    return this.props.children;
  }}exports.ErrorBoundary = ErrorBoundary;_defineProperty(ErrorBoundary, "defaultProps", defaultProps);