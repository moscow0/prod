"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.I18NLink = void 0;exports.mapStateToProps = mapStateToProps;

var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _objectWithoutKeys = _interopRequireDefault(require("../../utils/objectWithoutKeys"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  disabled: false,
  onClick: (_e) => {},
  confirmTitle: '',
  confirmMessage: '' };










class I18NLink extends _react.Component {






  static navigate(to) {
    _reactRouter.browserHistory.push(to);
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    const { to, disabled, onClick, confirmTitle, confirmMessage } = this.props;
    e.preventDefault();
    if (disabled) {
      return;
    }

    if (onClick) {
      if (confirmTitle) {
        this.context.confirm({
          accept: () => {
            onClick(e);
            I18NLink.navigate(to);
          },
          title: confirmTitle,
          message: confirmMessage });

      } else {
        onClick(e);
        I18NLink.navigate(to);
      }
    }
  }

  render() {
    const props = (0, _objectWithoutKeys.default)(this.props, [
    'dispatch',
    'onClick',
    'confirmTitle',
    'confirmMessage']);

    return /*#__PURE__*/_react.default.createElement(_reactRouter.Link, _extends({ onClick: this.onClick }, props));
  }}exports.I18NLink = I18NLink;_defineProperty(I18NLink, "defaultProps", defaultProps);_defineProperty(I18NLink, "contextTypes", { confirm: _propTypes.default.func });


function mapStateToProps({ locale }, ownProps) {
  return { to: `/${locale || ''}/${ownProps.to}`.replace(/\/+/g, '/') };
}var _default =

(0, _reactRedux.connect)(mapStateToProps)(I18NLink);exports.default = _default;