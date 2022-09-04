"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.MapComponent = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = _interopRequireDefault(require("immutable"));

var _Map = require("../../Map");
var _Layout = require("../../Layout");
var _libraryActions = require("../../Library/actions/libraryActions");




var _Multireducer = require("../../Multireducer");

var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
var _markdownDatasets = _interopRequireDefault(require("../markdownDatasets"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const renderInfo = (marker) => /*#__PURE__*/
_jsx("div", {}, void 0, /*#__PURE__*/
_jsx(_Layout.TemplateLabel, { template: marker.properties.entity.template }), "\xA0 ",
marker.properties.entity.title);



const MapComponent = (props) => {
  const { data, classname, scrollZoom, showControls } = props;
  const clickOnMarker = (marker) => props.getAndSelectDocument(marker.properties.entity.sharedId);
  const clickOnCluster = (cluster) => {
    props.unselectAllDocuments();
    props.selectDocuments(cluster.map((m) => m.properties.entity));
  };

  return /*#__PURE__*/(
    _jsx("div", { className: `Map ${classname}` }, void 0,
    data ? /*#__PURE__*/
    _jsx(_Map.Markers, { entities: data }, void 0,
    (markers) => /*#__PURE__*/
    _jsx(_Map.Map, {
      markers: markers,
      zoom: 1,
      clickOnMarker: clickOnMarker,
      clickOnCluster: clickOnCluster,
      renderPopupInfo: renderInfo,
      cluster: true,
      scrollZoom: scrollZoom === 'true',
      showControls: showControls === 'true' })) : /*#__PURE__*/




    _jsx(_Loader.default, {})));



};exports.MapComponent = MapComponent;

MapComponent.defaultProps = {
  classname: '',
  data: null,
  scrollZoom: null,
  showControls: null };












const mapStateToProps = (state, props) => ({
  data: _markdownDatasets.default.getRows(state, props) });exports.mapStateToProps = mapStateToProps;


const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{ getAndSelectDocument: _libraryActions.getAndSelectDocument, selectDocuments: _libraryActions.selectDocuments, unselectAllDocuments: _libraryActions.unselectAllDocuments },
(0, _Multireducer.wrapDispatch)(dispatch, 'library'));exports.mapDispatchToProps = mapDispatchToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, null)(MapComponent);exports.default = _default;