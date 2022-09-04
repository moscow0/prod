"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.LibraryLayoutBase = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactHelmet = require("react-helmet");
var _reactRedux = require("react-redux");
var _I18N = require("../I18N");
var _LibraryFilters = _interopRequireDefault(require("./components/LibraryFilters"));
var _QuickLabelPanel = require("./components/QuickLabelPanel");
var _ViewMetadataPanel = _interopRequireDefault(require("./components/ViewMetadataPanel"));
var _SelectMultiplePanelContainer = _interopRequireDefault(require("./containers/SelectMultiplePanelContainer"));
var _FeatureToggleSemanticSearch = require("../SemanticSearch/components/FeatureToggleSemanticSearch");
var _SemanticSearchPanel = _interopRequireDefault(require("../SemanticSearch/components/SemanticSearchPanel"));
var _ImportPanel = _interopRequireDefault(require("../Uploads/components/ImportPanel"));
var _QuickLabelHeader = require("./components/QuickLabelHeader");
var _LibraryFooter = require("./components/LibraryFooter");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class LibraryLayoutBase extends _react.Component {
  render() {
    const { className, children, quickLabelThesaurus, sidePanelMode, noScrollable } = this.props;
    const contentDivClass = `${
    quickLabelThesaurus ? 'with-header ' : ''
    } content-holder library-viewer document-viewer with-footer with-panel ${sidePanelMode} ${
    noScrollable ? 'no-scroll-layout' : ''
    }`;

    return /*#__PURE__*/(
      _jsx("div", { className: "row panels-layout" }, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, (0, _I18N.t)('System', 'Library', null, false))),

      quickLabelThesaurus && /*#__PURE__*/_jsx(_QuickLabelHeader.QuickLabelHeader, {}), /*#__PURE__*/
      _jsx("div", { className: contentDivClass }, void 0, /*#__PURE__*/
      _jsx("main", { className: `${className}` }, void 0, children), /*#__PURE__*/
      _jsx(_LibraryFooter.LibraryFooter, { storeKey: "library" }), /*#__PURE__*/
      _jsx(_LibraryFilters.default, { storeKey: "library", sidePanelMode: sidePanelMode }),
      !quickLabelThesaurus && /*#__PURE__*/_jsx(_ViewMetadataPanel.default, { storeKey: "library" }),
      !quickLabelThesaurus && /*#__PURE__*/_jsx(_SelectMultiplePanelContainer.default, { storeKey: "library" }),
      quickLabelThesaurus && /*#__PURE__*/_jsx(_QuickLabelPanel.QuickLabelPanel, { storeKey: "library" }), /*#__PURE__*/
      _jsx(_FeatureToggleSemanticSearch.FeatureToggleSemanticSearch, {}, void 0, /*#__PURE__*/
      _jsx(_SemanticSearchPanel.default, { storeKey: "library" })), /*#__PURE__*/

      _jsx(_ImportPanel.default, {}))));



  }}exports.LibraryLayoutBase = LibraryLayoutBase;


LibraryLayoutBase.defaultProps = {
  className: '',
  quickLabelThesaurus: '',
  sidePanelMode: '',
  noScrollable: false };var _default =












(0, _reactRedux.connect)((state) => ({
  quickLabelThesaurus: state.library.sidepanel.quickLabelState.get('thesaurus') }))(
LibraryLayoutBase);exports.default = _default;