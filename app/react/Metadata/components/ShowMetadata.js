"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ShowMetadata = void 0;var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _Layout = require("../../Layout");
var _Icon = require("../../Layout/Icon");
var _TimelineViewer = _interopRequireDefault(require("../../Timeline/components/TimelineViewer"));
var _timelineFixedData = require("../../Timeline/utils/timelineFixedData");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _FormatMetadata = require("../containers/FormatMetadata");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ShowMetadata extends _react.Component {
  render() {
    const { entity, showTitle, showType, relationships, showSubset, groupGeolocations } =
    this.props;
    let header = '';
    if (showTitle || showType) {
      let title = '';
      if (showTitle) {
        title = /*#__PURE__*/
        _jsx("div", {}, void 0, /*#__PURE__*/
        _jsx(_Icon.Icon, { className: "item-icon item-icon-center", data: entity.icon }), /*#__PURE__*/
        _jsx("h1", { className: "item-name" }, void 0,
        entity.title, /*#__PURE__*/
        _jsx(_Layout.DocumentLanguage, { doc: _immutable.default.fromJS(entity) })));



      }
      const type = showType ? /*#__PURE__*/_jsx(_Layout.TemplateLabel, { template: entity.template }) : '';
      header = /*#__PURE__*/
      _jsx("div", { className: "item-info" }, void 0,
      title,
      type);


    }

    return /*#__PURE__*/(
      _jsx("div", { className: "view" }, void 0,
      header, /*#__PURE__*/

      _jsx(_ShowIf.default, { if: entity.template === _timelineFixedData.caseTemplate || entity.template === _timelineFixedData.matterTemplate }, void 0, /*#__PURE__*/
      _jsx("dl", { className: "metadata-timeline-viewer" }, void 0, /*#__PURE__*/
      _jsx("dd", {}, void 0, /*#__PURE__*/
      _jsx(_TimelineViewer.default, { entity: entity })))), /*#__PURE__*/



      _jsx(_FormatMetadata.FormatMetadata, {
        entity: entity,
        relationships: relationships,
        showSubset: showSubset,
        groupGeolocations: groupGeolocations,
        renderLabel: (prop, label) => !prop.noLabel && label })));



  }}exports.ShowMetadata = ShowMetadata;

ShowMetadata.defaultProps = {
  showSubset: undefined,
  groupGeolocations: false };












const mapStateToProps = ({ templates }) => ({ templates });var _default =

(0, _reactRedux.connect)(mapStateToProps)(ShowMetadata);exports.default = _default;