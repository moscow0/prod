"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.DropdownMenu = void 0;var _I18N = require("../I18N");
var _UI = require("../UI");
var _react = _interopRequireWildcard(require("react"));
var _useOnClickOutsideElementHook = require("../utils/useOnClickOutsideElementHook");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}


















const DropdownMenu = ({ link, position }) => {
  const [showing, setShowing] = (0, _react.useState)(false);
  const dropdownRef = (0, _react.useRef)(null);
  const onClickOutside = (0, _react.useCallback)(() => {
    setShowing(false);
  }, []);

  const toggleShowingWithoutPropagation = (e) => {
    setShowing(!showing);
    e.stopPropagation();
  };
  const toggleShowing = () => {
    setShowing(!showing);
  };

  (0, _useOnClickOutsideElementHook.useOnClickOutsideElement)(dropdownRef, onClickOutside);

  return /*#__PURE__*/(
    _react.default.createElement("li", { className: "menuNav-item", key: position, ref: dropdownRef }, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: `btn menuNav-btn menuNav-link dropdown-toggle ${showing ? 'expanded' : ''} `,
      id: "navbarDropdownMenuLink",
      onClick: toggleShowingWithoutPropagation }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, { context: "Menu" }, void 0, link.get('title')), "\xA0 ", /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "caret-down" })), /*#__PURE__*/

    _jsx("ul", { className: `dropdown-menu ${showing ? 'expanded' : ''} ` }, void 0,
    link.get('sublinks').map((sublink, index) => {
      const url = (sublink === null || sublink === void 0 ? void 0 : sublink.get('url')) || '/';
      if (url.startsWith('http')) {
        return /*#__PURE__*/(
          _jsx("li", {}, index, /*#__PURE__*/
          _jsx("a", {
            href: url,
            className: "btn dropdown-item",
            target: "_blank",
            rel: "noreferrer",
            onClick: toggleShowing }, void 0, /*#__PURE__*/

          _jsx(_I18N.Translate, { context: "Menu" }, void 0, sublink === null || sublink === void 0 ? void 0 : sublink.get('title')))));



      }
      return /*#__PURE__*/(
        _jsx("li", {}, index, /*#__PURE__*/
        _jsx(_I18N.I18NLink, { to: url, className: "btn dropdown-item", onClick: toggleShowing }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, { context: "Menu" }, void 0, sublink === null || sublink === void 0 ? void 0 : sublink.get('title')))));



    }))));



};exports.DropdownMenu = DropdownMenu;