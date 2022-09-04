"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _RouteHandler = _interopRequireDefault(require("../RouteHandler"));
var _reactHelmet = require("react-helmet");
var _ErrorFallback = require("./ErrorFallback");

var _Footer = _interopRequireDefault(require("../Footer"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const handledErrors = {
  400: {
    title: 'Bad Request',
    summary: 'Bad Request',
    name: 'The request could not be processed.',
    message: '',
    code: '400' },

  404: {
    title: 'Not Found',
    summary: '',
    name: 'We can’t find the page you’re looking for. ',
    message: '',
    code: '404' },

  500: {
    title: 'Unexpected error',
    summary: 'Unexpected error',
    name: '',
    message: '',
    code: '500' } };



class GeneralError extends _RouteHandler.default {
  render() {var _handledErrors$this$p;
    const code = ((_handledErrors$this$p = handledErrors[this.props.params.errorCode]) === null || _handledErrors$this$p === void 0 ? void 0 : _handledErrors$this$p.code) || '404';
    const { requestId } = this.props.location.query;
    const safeRequestId = /^[0-9-]{4}$/.exec(requestId);
    const error = handledErrors[code];
    error.requestId = safeRequestId ? safeRequestId[0] : undefined;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, error.title)), /*#__PURE__*/

      _jsx(_ErrorFallback.ErrorFallback, { error: error }), /*#__PURE__*/
      _jsx(_Footer.default, {})));


  }}var _default =


GeneralError;exports.default = _default;