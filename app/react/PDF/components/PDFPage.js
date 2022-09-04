"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _PageReferences = require("../../Viewer/components/PageReferences");
var _PageSelections = require("../../Viewer/components/PageSelections");
var _PDFJS = _interopRequireWildcard(require("../PDFJS"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class PDFPage extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { rendered: false };
  }

  componentDidMount() {
    this.scrollCallback = this.scroll.bind(this);

    if (this.pageContainer && this.pageShouldRender()) {
      this.renderPage();
    }

    this.props.getViewportContainer().addEventListener('scroll', this.scrollCallback);
    this._mounted = true;
  }

  componentWillUnmount() {
    if (this.pdfPageView) {
      this.pdfPageView.destroy();
    }
    this.props.getViewportContainer().removeEventListener('scroll', this.scrollCallback);
    this._mounted = false;
  }

  scroll() {
    if (this.pageShouldRender() && !this.state.rendered) {
      this.renderPage();
    }

    if (!this.pageShouldRender() && this.pdfPageView) {
      this.pdfPageView.cancelRendering();
      this.pdfPageView.destroy();
      if (this.state.rendered) {
        this.props.onUnload(this.props.page);
      }
      this.setState({ rendered: false });
    }
  }

  pageShouldRender() {
    const pageRectangle = this.pageContainer.getBoundingClientRect();
    const vWidth = window.innerWidth || document.documentElement.clientWidth;
    const vHeight = window.innerHeight || document.documentElement.clientHeight;

    if (
    pageRectangle.right < 0 ||
    pageRectangle.bottom < -500 ||
    pageRectangle.left > vWidth ||
    pageRectangle.top > vHeight + 500)
    {
      this.props.onHidden(this.props.page);
      return false;
    }
    this.checkVisibility(pageRectangle);
    return true;
  }

  checkVisibility(pageRectangle) {
    const viewportRect = this.props.getViewportContainer().getBoundingClientRect();

    const relativeElementRect = {
      top: pageRectangle.top - viewportRect.top,
      bottom: pageRectangle.bottom };


    const offsetTop = relativeElementRect.top < 0 ? -relativeElementRect.top : 0;
    const offsetBottom =
    pageRectangle.bottom - viewportRect.bottom > 0 ?
    pageRectangle.bottom - viewportRect.bottom :
    0;
    const visibility = pageRectangle.height - offsetTop - offsetBottom;

    if (visibility > 0) {
      this.props.onVisible(this.props.page, visibility);
    }

    if (visibility < 0) {
      this.props.onHidden(this.props.page);
    }
  }

  renderReferences() {
    if (this.state.rendered) {
      return /*#__PURE__*/(
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_PageSelections.PageSelections, {}), /*#__PURE__*/
        _jsx(_PageReferences.PageReferences, { page: this.props.page, onClick: this.props.highlightReference })));


    }

    return false;
  }

  renderPage() {
    if (!this.state.rendered && this.pdfPageView) {
      this.props.onLoading(this.props.page);
      this.pdfPageView.draw().catch((e) => e);
      this.setState({ rendered: true });

      return;
    }
    if (!this.state.rendered) {
      this.props.onLoading(this.props.page);
      this.setState({ rendered: true });
      this.props.pdf.getPage(this.props.page).then((page) => {
        const scale = 1;

        this.pdfPageView = new _PDFJS.default.PDFPageView({
          container: this.pageContainer,
          id: this.props.page,
          scale,
          defaultViewport: page.getViewport({ scale }),
          textLayerMode: 2,
          textLayerFactory: _PDFJS.textLayerFactory,
          eventBus: new _PDFJS.EventBus() });


        this.pdfPageView.setPdfPage(page);
        this.pdfPageView.
        draw().
        then(() => {
          if (this._mounted) {
            this.setState({ height: this.pdfPageView.viewport.height });
          }
        }).
        catch((e) => e);
      });
    }
  }

  render() {
    const style = { height: 1100 };
    if (this.state && this.state.height) {
      style.height = this.state.height + 20;
    }
    return /*#__PURE__*/(
      _react.default.createElement("div", {
        id: `page-${this.props.page}`,
        className: "doc-page",
        ref: (ref) => {
          this.pageContainer = ref;
        },
        style: style },

      this.renderReferences()));


  }}


PDFPage.defaultProps = {
  getViewportContainer: () => _utils.isClient ? document.querySelector('.document-viewer') : null,
  onVisible: () => {},
  onHidden: () => {},
  highlightReference: () => {} };var _default =













PDFPage;exports.default = _default;