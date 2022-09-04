"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ContextMenu = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _contextMenuActions = require("../actions/contextMenuActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ContextMenu extends _react.Component {
  render() {
    const children = _react.default.Children.map(this.props.children, (child) => child) || [];
    let SubMenu = children.filter((child) => {
      const forceShow = this.props.overrideShow && this.props.show;
      const matchesType = child.type.name === this.props.type;
      const matchesWrap =
      child.type.WrappedComponent && child.type.WrappedComponent.name === this.props.type;
      return forceShow || matchesType || matchesWrap;
    });

    const position = `ContextMenu-${this.props.align || 'bottom'}`;

    SubMenu = _react.default.Children.map(SubMenu, (child) => /*#__PURE__*/
    _react.default.cloneElement(child, { active: this.props.open }));


    return /*#__PURE__*/(
      _jsx("div", {
        className: `ContextMenu ${position}`,
        onMouseEnter: this.props.openMenu,
        onMouseLeave: this.props.closeMenu,
        onClick: this.props.closeMenu }, void 0,

      SubMenu));


  }}exports.ContextMenu = ContextMenu;
















const mapStateToProps = (state) => state.contextMenu.toJS();

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ openMenu: _contextMenuActions.openMenu, closeMenu: _contextMenuActions.closeMenu }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ContextMenu);exports.default = _default;