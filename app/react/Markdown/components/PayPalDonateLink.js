"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _reactRouter = require("react-router");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const PayPalDonateLink = ({ paypalid, classname, children, currency, amount }) => {
  const amountParam = amount ? `&amount=${amount}` : '';
  const url = `https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=${paypalid}&currency_code=${currency}${amountParam}&source=url`;
  classname += ' paypal-donate';
  return /*#__PURE__*/(
    _jsx(_reactRouter.Link, { className: classname, href: url, target: "_blank", rel: "noreferrer noopener" }, void 0,
    children));


};

PayPalDonateLink.defaultProps = {
  children: '',
  classname: '',
  amount: null };var _default =














PayPalDonateLink;exports.default = _default;