"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ErrorFallback = void 0;var _react = _interopRequireDefault(require("react"));

var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}





const ErrorFallback = (props) => {var _props$error$code, _props$errorInfo;
  const showRequestId = ((_props$error$code = props.error.code) === null || _props$error$code === void 0 ? void 0 : _props$error$code.toString()) === '500' && props.error.requestId;
  const errorDetails = ((_props$errorInfo = props.errorInfo) === null || _props$errorInfo === void 0 ? void 0 : _props$errorInfo.componentStack) || props.error.message;
  return /*#__PURE__*/(
    _jsx("div", { className: "error-fallback-ui" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "message" }, void 0, /*#__PURE__*/
    _jsx("p", { className: "error-message-xxl" }, void 0,
    props.error.summary || /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Well, this is awkward...")), /*#__PURE__*/

    _jsx("p", { className: "error-message-lg" }, void 0,
    props.error.name || /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Something went wrong")), /*#__PURE__*/

    _jsx("p", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Please contact an admin for details.")),

    showRequestId && /*#__PURE__*/
    _jsx("p", { className: "error-message-sm" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Request id #"),
    props.error.requestId),


    errorDetails && /*#__PURE__*/_jsx("details", { className: "error-details" }, void 0, errorDetails)),

    props.error.code && /*#__PURE__*/_jsx("span", { className: "error-code" }, void 0, props.error.code)));


};exports.ErrorFallback = ErrorFallback;