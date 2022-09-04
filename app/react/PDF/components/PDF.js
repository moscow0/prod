"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactTextSelectionHandler = require("react-text-selection-handler");
var _advancedSort = require("../../utils/advancedSort");
var _ = require("./..");
var _utils = require("../../utils");
var _PDFJS = _interopRequireDefault(require("../PDFJS"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const cMapUrl = '/legacy_character_maps/';
const cMapPacked = true;

class PDF extends _react.Component {
  static getDerivedStateFromProps(props, state) {
    if (state.filename !== null && state.filename !== props.filename) {
      return { pdf: { numPages: 0 }, filename: props.filename };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this._isMounted = false;
    this.state = { pdf: { numPages: 0 }, filename: props.filename };
    this.pagesLoaded = {};
    this.loadDocument(props.file);
    this.currentPage = '1';
    this.pages = {};
    this.pdfReady = false;

    this.pageUnloaded = this.pageUnloaded.bind(this);
    this.pageLoading = this.pageLoading.bind(this);
    this.onPageVisible = this.onPageVisible.bind(this);
    this.onPageHidden = this.onPageHidden.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    if (this.pdfContainer) {
      document.addEventListener('textlayerrendered', (e) => {
        this.pageLoaded(e.detail.pageNumber);
      });
      document.addEventListener('textlayerrendered', this.props.onPageLoaded, { once: true });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.file !== this.props.file ||
      nextProps.filename !== this.props.filename ||
      nextProps.style !== this.props.style ||
      nextState.pdf !== this.state.pdf);

  }

  componentDidUpdate(prevProps) {
    if (prevProps.filename !== null && this.props.filename !== prevProps.filename) {
      this.pagesLoaded = {};
      this.loadDocument(prevProps.file);
    }

    if (this.state.pdf.numPages && !this.pdfReady) {
      this.pdfReady = true;
      this.props.onPDFReady();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onPageVisible(page, visibility) {
    this.pages[page] = visibility;

    const pageWithMostVisibility = Object.keys(this.pages).reduce((memo, key) => {
      if (!this.pages[key - 1] || this.pages[key] > this.pages[key - 1]) {
        return key;
      }
      return memo;
    }, 1);

    if (this.currentPage !== pageWithMostVisibility) {
      this.currentPage = pageWithMostVisibility;
      this.props.onPageChange(Number(pageWithMostVisibility));
    }
  }

  onPageHidden(page) {
    delete this.pages[page];
  }

  loadDocument(file) {
    if (_utils.isClient) {
      _PDFJS.default.getDocument({
        url: file,
        cMapUrl,
        cMapPacked }).
      promise.then((pdf) => {
        if (this._isMounted) {
          this.setState({ pdf });
        }
      });
    }
  }

  pageUnloaded(numPage) {
    delete this.pagesLoaded[numPage];
    this.loaded();
  }

  pageLoading(numPage) {
    this.pagesLoaded[numPage] = false;
  }

  pageLoaded(numPage) {
    this.pagesLoaded[numPage] = true;
    const allPagesLoaded =
    Object.keys(this.pagesLoaded).
    map((p) => this.pagesLoaded[p]).
    filter((p) => !p).length === 0;
    if (allPagesLoaded) {
      this.loaded();
    }
  }

  loaded() {
    const pages = Object.keys(this.pagesLoaded).map((n) => parseInt(n, 10));

    const allConsecutives = (0, _advancedSort.advancedSort)(pages, { treatAs: 'number' }).reduce((memo, number) => {
      if (memo === false) {
        return memo;
      }

      if (memo === null) {
        return number;
      }

      return number - memo > 1 ? false : number;
    }, null);

    if (allConsecutives) {
      this.props.onLoad({
        pages });

    }
  }

  render() {
    return /*#__PURE__*/(
      _react.default.createElement("div", {
        ref: (ref) => {
          this.pdfContainer = ref;
        },
        style: this.props.style }, /*#__PURE__*/

      _jsx(_reactTextSelectionHandler.HandleTextSelection, {
        onSelect: this.props.onTextSelection,
        onDeselect: this.props.onTextDeselection }, void 0,

      (() => {
        const pages = [];
        for (let page = 1; page <= this.state.pdf.numPages; page += 1) {
          pages.push( /*#__PURE__*/
          _jsx("div", { className: "page-wrapper" }, page, /*#__PURE__*/
          _jsx(_reactTextSelectionHandler.SelectionRegion, { regionId: page.toString() }, void 0, /*#__PURE__*/
          _jsx(_.PDFPage, {
            onUnload: this.pageUnloaded,
            onLoading: this.pageLoading,
            onVisible: this.onPageVisible,
            onHidden: this.onPageHidden,
            page: page,
            pdf: this.state.pdf,
            highlightReference: this.props.highlightReference }))));




        }
        return pages;
      })())));



  }}


PDF.defaultProps = {
  onPageLoaded: () => {},
  filename: null,
  onPageChange: () => {},
  onPDFReady: () => {},
  style: {},
  onTextSelection: () => {},
  onTextDeselection: () => {},
  highlightReference: () => {} };var _default =















PDF;exports.default = _default;