"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const style = { display: 'inline-block', width: '25px' };

class IconSelectorItem extends _react.Component {
  shouldComponentUpdate(nextProps) {
    return this.props.item._id !== nextProps.item._id;
  }

  render() {
    const { item } = this.props;

    let icon = /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "No icon / flag");
    if (item.type === 'Icons') {
      icon = /*#__PURE__*/
      _jsx("span", { style: style }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: `${item._id}` }));


    }

    if (item.type === 'Flags') {
      const className = `flag-icon flag-icon-${_UI.CountryList.get(item._id).cca2}`.toLowerCase();
      icon = /*#__PURE__*/
      _jsx("span", { style: style }, void 0, /*#__PURE__*/
      _jsx("span", { className: className }));


    }

    return /*#__PURE__*/(
      _jsx("span", {}, void 0,
      icon,
      item.label));


  }}exports.default = IconSelectorItem;


IconSelectorItem.defaultProps = {
  item: undefined };