"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.RelationshipLink = void 0;var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");

var _Layout = require("../../Layout");
var actions = _interopRequireWildcard(require("../../Relationships/actions/actions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}





const mapStateToProps = ({ entityView }) => ({
  uiState: entityView.uiState });


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    selectConnection: actions.selectConnection },

  dispatch);

}

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



const RelationshipLink = ({ propValue: propVal, selectConnection }) => {
  if (propVal.relatedEntity) {
    return /*#__PURE__*/(
      _jsx("button", {
        type: "button",
        className: "link-button",
        onClick: () => selectConnection(propVal.relatedEntity) },
      propVal.url,

      propVal.icon && /*#__PURE__*/_jsx(_Layout.Icon, { className: "item-icon", data: propVal.icon }),
      propVal.value));


  }
  return /*#__PURE__*/(
    _jsx(_I18N.I18NLink, { to: propVal.url }, propVal.url,
    propVal.icon && /*#__PURE__*/_jsx(_Layout.Icon, { className: "item-icon", data: propVal.icon }),
    propVal.value));


};

const container = connector(RelationshipLink);exports.RelationshipLink = container;