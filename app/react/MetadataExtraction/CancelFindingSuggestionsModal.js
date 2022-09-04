"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CancelFindingSuggestionModal = void 0;var _react = _interopRequireDefault(require("react"));
var _Modal = _interopRequireDefault(require("../Layout/Modal"));
var _I18N = require("../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}







const CancelFindingSuggestionModal = ({
  isOpen,
  onClose,
  onAccept }) =>
{
  return /*#__PURE__*/(
    _jsx(_Modal.default, { isOpen: isOpen, type: "content", className: "suggestion-acceptance-modal" }, void 0, /*#__PURE__*/
    _jsx(_Modal.default.Header, {}, void 0, /*#__PURE__*/
    _jsx("h1", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Confirm"))), /*#__PURE__*/


    _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "This will cancel the finding suggestion process")), /*#__PURE__*/

    _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "btn btn-default cancel-button",
      "aria-label": "Close acceptance modal",
      onClick: onClose }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Cancel")), /*#__PURE__*/

    _jsx("button", { type: "button", className: "btn confirm-button btn-success", onClick: onAccept }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Confirm")))));




};exports.CancelFindingSuggestionModal = CancelFindingSuggestionModal;