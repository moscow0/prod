"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.PaginatorWithPage = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));

var _I18N = require("../../I18N");
var _reactRouter = require("react-router");
var _Layout = require("../../Layout");const _excluded = ["location"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const disableButton = (page, pageToDisable) => ({
  className: page === pageToDisable ? 'btn disabled' : 'btn',
  rel: page === pageToDisable ? 'nofollow' : undefined });


const Paginator = ({ page, totalPages, onPageChange }) => {
  const prevPage = page - 1 || 1;
  const nextPage = page + 1 > totalPages ? totalPages : page + 1;
  return /*#__PURE__*/(
    _jsx("div", { className: "paginator" }, void 0, /*#__PURE__*/
    _react.default.createElement(_Layout.CurrentLocationLink, _extends({
      queryParams: { page: prevPage },
      onClick: (e) => {
        e.preventDefault();
        onPageChange(prevPage);
      } },
    disableButton(page, 1)), /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Previous")), /*#__PURE__*/

    _jsx("span", {}, void 0, ` ${page} / ${totalPages} `), /*#__PURE__*/
    _react.default.createElement(_Layout.CurrentLocationLink, _extends({
      queryParams: { page: nextPage },
      onClick: (e) => {
        e.preventDefault();
        onPageChange(nextPage);
      } },
    disableButton(page, totalPages)), /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Next"))));



};

Paginator.defaultProps = {
  page: 1,
  totalPages: 1,
  onPageChange: () => {} };var _default =








Paginator;exports.default = _default;

const PaginatorWithPage = (0, _reactRouter.withRouter)((props) => {
  const { location } = props,restProps = _objectWithoutProperties(props, _excluded);
  return /*#__PURE__*/_react.default.createElement(Paginator, _extends({}, restProps, { page: Number(location.query.page || 1) }));
});exports.PaginatorWithPage = PaginatorWithPage;