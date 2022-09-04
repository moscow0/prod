"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ToggleStyleButtons = void 0;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _UI = require("../../UI");

var _actions = require("../actions/actions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ToggleStyleButtons extends _react.Component {
  constructor(props) {
    super(props);
    this.switchView = this.switchView.bind(this);
  }

  switchView(type) {
    return () => {
      this.props.switchView(type);
    };
  }

  render() {
    const { view } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "search-list-actions" }, void 0, /*#__PURE__*/
      _jsx("button", {
        onClick: this.switchView('list'),
        className: `btn ${view !== 'graph' ? 'btn-success' : 'btn-default'}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "th" })), /*#__PURE__*/

      _jsx("button", {
        onClick: this.switchView('graph'),
        className: `btn ${view === 'graph' ? 'btn-success' : 'btn-default'}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "sitemap", transform: { rotate: 270 } }))));



  }}exports.ToggleStyleButtons = ToggleStyleButtons;







function mapStateToProps({ connectionsList }) {
  return {
    view: connectionsList.view };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    switchView: _actions.switchView },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ToggleStyleButtons);exports.default = _default;