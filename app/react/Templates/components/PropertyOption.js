"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.dragSource = exports.default = exports.PropertyOption = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _templateActions = require("../actions/templateActions");
var _Icons = _interopRequireDefault(require("./Icons"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class PropertyOption extends _react.Component {
  constructor(props) {
    super(props);
    this.addProperty = this.addProperty.bind(this);
  }

  addProperty() {
    const { disabled, label, type, addProperty: addPropertyAction } = this.props;
    if (!disabled) {
      addPropertyAction({ label: (0, _I18N.t)('System', `property ${type}`, label, false), type });
    }
  }

  render() {
    const { connectDragSource, label, disabled, type } = this.props;
    const iconClass = _Icons.default[type] || 'font';
    const liClass = `list-group-item${disabled ? ' disabled' : ''}`;
    return connectDragSource( /*#__PURE__*/
    _jsx("li", { className: liClass }, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", onClick: this.addProperty }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "plus" })), /*#__PURE__*/

    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: iconClass }), "\xA0", /*#__PURE__*/

    _jsx(_I18N.Translate, { translationKey: `property ${type}` }, void 0, label))));



  }}exports.PropertyOption = PropertyOption;










const optionSource = {
  beginDrag(_ref) {let props = _extends({}, _ref);
    return _objectSpread(_objectSpread({}, props), {}, { label: (0, _I18N.t)('System', `property ${props.type}`, props.label, false) });
  },

  canDrag(props) {
    return !props.disabled;
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (!dropResult && item.index) {
      props.removeProperty(item.index);
    }
  } };


const dragSource = (0, _reactDnd.DragSource)('METADATA_OPTION', optionSource, (connector) => ({
  connectDragSource: connector.dragSource() }))(
PropertyOption);exports.dragSource = dragSource;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ removeProperty: _templateActions.removeProperty, addProperty: _templateActions.addProperty }, dispatch);
}var _default =



(0, _reactRedux.connect)(null, mapDispatchToProps, null, { withRef: true })(dragSource);exports.default = _default;