"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ViewerComponent = void 0;var _immutable = require("immutable");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");

var _EntityView = _interopRequireDefault(require("../EntityView"));
var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));

var _PDFView = _interopRequireDefault(require("../PDFView"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ViewerComponent extends _react.Component {
  render() {
    const { entity } = this.props;

    if (!entity.get('_id')) {
      return /*#__PURE__*/_jsx(_Loader.default, {});
    }

    return entity.get('defaultDoc') ? /*#__PURE__*/_react.default.createElement(_PDFView.default, this.props) : /*#__PURE__*/_react.default.createElement(_EntityView.default, this.props);
  }}exports.ViewerComponent = ViewerComponent;






const mapStateToProps = (state) => {
  const entity = state.documentViewer.doc.get('_id') ?
  state.documentViewer.doc :
  state.entityView.entity;

  return {
    entity };

};var _default =

(0, _reactRedux.connect)(mapStateToProps)(ViewerComponent);exports.default = _default;