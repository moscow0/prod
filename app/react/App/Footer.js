"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _I18N = require("../I18N");
var _reselect = require("reselect");
var _libraryViewInfo = require("./libraryViewInfo");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const getLibraryURL = (libraryView) =>
_libraryViewInfo.libraryViewInfo[libraryView] ? `/${_libraryViewInfo.libraryViewInfo[libraryView].url}` : '/library';

class Footer extends _react.Component {
  render() {
    return /*#__PURE__*/(
      _jsx("footer", {}, void 0, /*#__PURE__*/
      _jsx("ul", { className: "footer-nav" }, void 0, /*#__PURE__*/
      _jsx("li", { className: "footer-nav_item" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "footer-tooltip" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Uwazi is developed by"), ' ', /*#__PURE__*/
      _jsx("a", { href: "https://huridocs.org/", target: "_blank" }, void 0, /*#__PURE__*/
      _jsx("img", {
        src: "/public/huridocs-logo.svg",
        title: "HURIDOCS",
        alt: "Human Rights Information and Documentation Systems" })))), /*#__PURE__*/




      _jsx("a", { href: "https://www.uwazi.io/", target: "_blank", className: "footer-logo" }, void 0, /*#__PURE__*/
      _jsx("img", { src: "/public/logo.svg", title: "uwazi", alt: "uwazi" }))), /*#__PURE__*/



      _jsx("li", { className: "footer-nav_separator" }, void 0, "\xA0"), /*#__PURE__*/

      _jsx("li", { className: "footer-nav_item footer-collection_name" }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, this.props.siteName)), /*#__PURE__*/


      _jsx("li", { className: "footer-nav_separator" }, void 0, "\xA0"), /*#__PURE__*/

      _jsx("li", { className: "footer-nav_item" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: getLibraryURL(this.props.defaultLibraryView) }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Library"))),


      (() => {
        if (!this.props.user._id) {
          return /*#__PURE__*/(
            _jsx("li", { className: "footer-nav_item" }, void 0, /*#__PURE__*/
            _jsx(_I18N.I18NLink, { to: "/login" }, void 0, /*#__PURE__*/
            _jsx(_I18N.Translate, {}, void 0, "Login"))));



        }

        return /*#__PURE__*/(
          _jsx("li", { className: "footer-nav_item" }, void 0, /*#__PURE__*/
          _jsx(_I18N.I18NLink, { to: "/settings/account" }, void 0, /*#__PURE__*/
          _jsx(_I18N.Translate, {}, void 0, "Settings"))));



      })())));



  }}








Footer.defaultProps = {
  defaultLibraryView: 'cards' };


const selectUser = (0, _reselect.createSelector)(
(s) => s.user,
(u) => u.toJS());


function mapStateToProps(state) {
  return {
    user: selectUser(state),
    siteName: state.settings.collection.get('site_name'),
    defaultLibraryView: state.settings.collection.get('defaultLibraryView') };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(Footer);exports.default = _default;