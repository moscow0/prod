"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.PagesList = void 0;exports.mapStateToProps = mapStateToProps;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _pageActions = require("../actions/pageActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class PagesList extends _react.Component {
  deletePage(page) {
    return this.context.confirm({
      accept: () => {
        this.props.deletePage(page.toJS());
      },
      title: /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Confirm delete page:"), "\xA0",
      page.get('title')),


      message: 'Are you sure you want to delete this page?' });

  }

  render() {
    const { pages } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, (0, _I18N.t)('System', 'Pages')), /*#__PURE__*/
      _jsx("ul", { className: "list-group pages" }, void 0,
      pages.map((page, index) => /*#__PURE__*/
      _jsx("li", { className: "list-group-item" }, index, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: `/settings/pages/edit/${page.get('sharedId')}` }, void 0,
      page.get('title')), /*#__PURE__*/

      _jsx("div", { className: "list-group-item-actions" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `/settings/pages/edit/${page.get('sharedId')}`,
        className: "btn btn-default btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), " ", /*#__PURE__*/_jsx("span", {}, void 0, (0, _I18N.t)('System', 'Edit'))), /*#__PURE__*/

      _jsx("a", {
        onClick: this.deletePage.bind(this, page),
        className: "btn btn-danger btn-xs template-remove" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), " ", /*#__PURE__*/_jsx("span", {}, void 0, (0, _I18N.t)('System', 'Delete'))))))), /*#__PURE__*/





      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings/pages/new", className: "btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), " ", /*#__PURE__*/_jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Add page'))))));




  }}exports.PagesList = PagesList;







PagesList.contextTypes = {
  confirm: _propTypes.default.func };


function mapStateToProps({ pages }) {
  return { pages };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ deletePage: _pageActions.deletePage }, dispatch);
}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(PagesList);exports.default = _default;