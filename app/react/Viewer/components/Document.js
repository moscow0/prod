"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Document = void 0;require("../scss/conversion_base.scss");
require("../scss/document.scss");

var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
var _PDF = require("../../PDF");
var _immutable = _interopRequireDefault(require("immutable"));
var _uiActions = require("../actions/uiActions");

var _determineDirection = _interopRequireDefault(require("../utils/determineDirection"));

var _config = require("../../config.js");const _excluded = ["regionId"];function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

class Document extends _react.Component {
  constructor(props) {
    super(props);
    //TODO: remove this if this is not needed anymore
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.pages = { 1: 0 };
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.previousMostVisible = props.page;
    this.pdfLoaded = this.pdfLoaded.bind(this);
    this.onDocumentReady = this.onDocumentReady.bind(this);
    this.onTextDeselection = this.onTextDeselection.bind(this);
    this.onTextSelected = this.onTextSelected.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.highlightReference = this.highlightReference.bind(this);
  }

  componentDidMount() {
    this.props.unsetSelection();
  }

  componentDidUpdate(prevProps) {
    if (prevProps && prevProps.doc.get('_id') !== this.props.doc.get('_id')) {
      this.props.unsetSelection();
    }
    (0, _uiActions.highlightSnippet)(this.props.selectedSnippet, this.props.searchTerm);
  }

  onTextSelected(textSelection) {
    if (this.props.disableTextSelection) {
      return;
    }
    const selectionRectangles = textSelection.selectionRectangles.map(
    (_ref) => {let { regionId } = _ref,otherProps = _objectWithoutProperties(_ref, _excluded);return _objectSpread(_objectSpread({}, otherProps), {}, { page: regionId });});

    this.props.setSelection(_objectSpread(_objectSpread({}, textSelection), {}, { selectionRectangles }), this.props.file._id);
    return this.props.deactivateReference();
  }

  onTextDeselection() {
    this.props.unsetSelection();
  }

  onDocumentReady() {
    this.props.onDocumentReady(this.props.doc);
  }

  handleClick() {
    if (this.props.executeOnClickHandler) {
      this.props.onClick();
    }
  }

  highlightReference(connection) {
    return this.props.activateReference(connection);
  }

  pdfLoaded() {
    if (this.props.doScrollToActive) {
      const references = this.props.references.toJS();
      this.props.scrollToActive(
      references.find((r) => r._id === this.props.activeReference),
      references,
      this.props.doScrollToActive);

    }
    this.props.onPDFLoaded();
    this.componentDidUpdate();
  }

  handleOver() {}

  renderPDF(file) {
    if (!file._id) {
      return /*#__PURE__*/_jsx(_Loader.default, {});
    }

    return /*#__PURE__*/(
      _jsx(_PDF.PDF, {
        onPageChange: this.props.onPageChange,
        onPDFReady: this.onDocumentReady,
        onPageLoaded: this.props.onPageLoaded,
        onLoad: this.pdfLoaded,
        file: `${_config.APIURL}files/${file.filename}`,
        filename: file.filename,
        onTextSelection: this.onTextSelected,
        onTextDeselection: this.onTextDeselection,
        highlightReference: this.highlightReference,
        activeReference: this.props.activeReference },
      file.filename));


  }

  render() {
    const { file } = this.props;

    const Header = this.props.header;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", {
        className: `_${this.props.doc.get('_id')} document ${
        this.props.className
        } ${(0, _determineDirection.default)(file)}` }, void 0, /*#__PURE__*/

      _jsx(Header, {}), /*#__PURE__*/
      _react.default.createElement("div", {
        className: "pages"
        // eslint-disable-next-line react/no-unused-class-component-methods
        , ref: (ref) => this.pagesContainer = ref,
        onMouseOver: this.handleOver.bind(this),
        onClick: this.handleClick },

      this.renderPDF(file)))));




  }}exports.Document = Document;


Document.defaultProps = {
  onPageLoaded: () => {},
  onDocumentReady: () => {},
  onPageChange: () => {},
  onClick: () => {},
  onPDFLoaded: () => {},
  file: {},
  searchTerm: '',
  page: 1,
  selectedSnippet: _immutable.default.fromJS({}),
  deactivateReference: () => {},
  header: () => false,
  activateReference: () => {},
  doScrollToActive: false,
  scrollToActive: () => {},
  activeReference: '',
  className: '',
  executeOnClickHandler: false };var _default =





























Document;exports.default = _default;