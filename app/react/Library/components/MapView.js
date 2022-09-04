"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MapViewComponent = exports.MapView = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _Map = require("../../Map");
var _redux = require("redux");
var _Multireducer = require("../../Multireducer");
var _libraryActions = require("../actions/libraryActions");




var _SearchBar = _interopRequireDefault(require("./SearchBar"));
var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class MapViewComponent extends _react.Component {
  constructor(props) {
    super(props);
    this.clickOnMarker = this.clickOnMarker.bind(this);
    this.clickOnCluster = this.clickOnCluster.bind(this);
  }

  clickOnMarker(marker) {
    this.props.getAndSelectDocument(marker.properties.entity.sharedId);
  }

  clickOnCluster(cluster) {
    this.props.unselectAllDocuments();
    this.props.selectDocuments(cluster.map((m) => m.properties.entity));
  }

  render() {
    const { storeKey, markers } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "library-map main-wrapper", style: { width: '100%', height: '100%' } }, void 0, /*#__PURE__*/
      _jsx("div", { className: "search-list" }, void 0, /*#__PURE__*/
      _jsx(_SearchBar.default, { storeKey: storeKey })), /*#__PURE__*/

      _jsx("div", { className: "documents-counter" }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, markers.get('totalRows')), " ", (0, _I18N.t)('System', 'documents'))), /*#__PURE__*/


      _jsx(_Map.Markers, { entities: markers.get('rows') }, void 0,
      (processedMarkers) => /*#__PURE__*/
      _react.default.createElement(_Map.Map, {
        ref: (ref) => {
          // eslint-disable-next-line react/no-unused-class-component-methods
          this.map = ref;
        },
        markers: processedMarkers,
        clickOnMarker: this.clickOnMarker,
        clickOnCluster: this.clickOnCluster,
        renderPopupInfo: true,
        cluster: true }))));





  }}exports.MapViewComponent = MapViewComponent;










function mapStateToProps(state, props) {
  return {
    markers: state[props.storeKey].markers };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  { getAndSelectDocument: _libraryActions.getAndSelectDocument, selectDocuments: _libraryActions.selectDocuments, unselectAllDocuments: _libraryActions.unselectAllDocuments },
  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}

const MapView = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null, { withRef: true })(
MapViewComponent);exports.MapView = MapView;