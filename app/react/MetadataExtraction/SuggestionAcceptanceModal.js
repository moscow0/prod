"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SuggestionAcceptanceModal = void 0;var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("../Layout/Modal"));
var _I18N = require("../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const SuggestionAcceptanceModal = ({
  isOpen,
  propertyType,
  onClose,
  onAccept }) =>
{
  const [allLanguages, setAllLanguages] = (0, _react.useState)(true);
  return /*#__PURE__*/(
    _jsx(_Modal.default, { isOpen: isOpen, type: "content", className: "suggestion-acceptance-modal" }, void 0, /*#__PURE__*/
    _jsx(_Modal.default.Header, {}, void 0, /*#__PURE__*/
    _jsx("h1", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Confirm suggestion acceptance"))), /*#__PURE__*/


    _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
    _jsx("label", { className: "language-checkbox" }, void 0,
    propertyType !== 'date' ? /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("input", {
      type: "checkbox",
      checked: allLanguages,
      onChange: (e) => setAllLanguages(e.target.checked) }), "\xA0", /*#__PURE__*/


    _jsx(_I18N.Translate, {}, void 0, "Apply to all languages")) : /*#__PURE__*/


    _jsx(_I18N.Translate, {}, void 0, "This will update the entity across all languages"))), /*#__PURE__*/



    _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "btn btn-default cancel-button",
      "aria-label": "Close acceptance modal",
      onClick: onClose }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Cancel")), /*#__PURE__*/

    _jsx("button", {
      type: "button",
      className: "btn confirm-button btn-success",
      onClick: () => onAccept(allLanguages) }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Confirm")))));




};exports.SuggestionAcceptanceModal = SuggestionAcceptanceModal;