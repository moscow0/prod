"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchButton = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");

var _libraryActions = require("../actions/libraryActions");
var _Multireducer = require("../../Multireducer");
var _UI = require("../../UI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}


class SearchButton extends _react.Component {
  render() {
    let toggle = this.props.open ? this.props.hideFilters : this.props.showFilters;
    let activeClass = this.props.open ? ' is-active' : '';

    if (this.props.open && this.props.metadataPanelIsOpen) {
      toggle = this.props.unselectAllDocuments;
      activeClass = '';
    }

    if (!this.props.open && this.props.metadataPanelIsOpen) {
      toggle = () => {
        this.props.showFilters();
        this.props.unselectAllDocuments();
      };
    }

    return /*#__PURE__*/(
      _jsx("a", { href: "#", className: `search-button btn ${activeClass}`, onClick: toggle }, void 0, /*#__PURE__*/
      _jsx("div", { className: "searchButton-open" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "funnel-filter" }), /*#__PURE__*/
      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Search'), "..."))));



  }}exports.SearchButton = SearchButton;










SearchButton.contextTypes = {
  storeKey: _propTypes.default.string };


function mapStateToProps(state, props) {
  return {
    open: state[props.storeKey].ui.get('filtersPanel') !== false,
    metadataPanelIsOpen: state[props.storeKey].ui.get('selectedDocuments').size > 0 };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    showFilters: _libraryActions.showFilters,
    hideFilters: _libraryActions.hideFilters,
    unselectAllDocuments: _libraryActions.unselectAllDocuments },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchButton);exports.default = _default;