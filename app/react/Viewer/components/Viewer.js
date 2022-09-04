"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ConnectedViewer = void 0;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactHelmet = require("react-helmet");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _immutable = require("immutable");
var _ConnectionsList = require("../../ConnectionsList");
var _Connections = require("../../Connections");
var _Layout = require("../../Layout");
var _Relationships = require("../../Relationships");
var _I18N = require("../../I18N");
var _BasicReducer = require("../../BasicReducer");
var _AddEntities = _interopRequireDefault(require("../../Relationships/components/AddEntities"));
var _ContextMenu = _interopRequireDefault(require("../../ContextMenu"));
var _Footer = _interopRequireDefault(require("../../App/Footer"));
var _Marker = _interopRequireDefault(require("../utils/Marker"));
var _RelationshipMetadata = _interopRequireDefault(require("../../Relationships/components/RelationshipMetadata"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _Auth = require("../../Auth");
var _FeatureToggle = require("../../components/Elements/FeatureToggle");
var _Paginator = require("./Paginator");
var _referencesActions = require("../actions/referencesActions");
var _documentActions = require("../actions/documentActions");



var _uiActions = require("../actions/uiActions");
var _selectors = require("../selectors");
var _ConfirmCloseForm = _interopRequireDefault(require("./ConfirmCloseForm"));
var _ViewMetadataPanel = _interopRequireDefault(require("./ViewMetadataPanel"));
var _ViewerDefaultMenu = _interopRequireDefault(require("./ViewerDefaultMenu"));
var _ViewerTextSelectedMenu = _interopRequireDefault(require("./ViewerTextSelectedMenu"));
var _SourceDocument = _interopRequireDefault(require("./SourceDocument"));
var _TargetDocument = _interopRequireDefault(require("./TargetDocument.js"));
var _determineDirection = _interopRequireDefault(require("../utils/determineDirection"));
var _OCRStatus = require("./OCRStatus");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Viewer extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { firstRender: true };
    this.handlePlainTextClick = this.handlePlainTextClick.bind(this);
  }

  componentDidMount() {
    const { store } = this.context;
    const { sidepanelTab } = this.props;
    store.dispatch((0, _uiActions.openPanel)('viewMetadataPanel'));
    if (sidepanelTab === 'connections') {
      store.dispatch(_BasicReducer.actions.set('viewer.sidepanel.tab', ''));
    }
    store.dispatch((0, _documentActions.loadDefaultViewerMenu)());
    _Marker.default.init('div.main-wrapper');
    this.setState({ firstRender: false }); // eslint-disable-line react/no-did-mount-set-state
  }

  handlePlainTextClick() {
    const { showTab } = this.props;
    showTab('metadata');
  }

  prepareClassName(includeFooter) {
    const { panelIsOpen, targetDoc, showConnections } = this.props;
    let className = 'document-viewer with-header';
    className += panelIsOpen ? ' with-panel is-active' : '';
    className += targetDoc ? ' show-target-document' : '';
    className += showConnections ? ' connections' : '';
    className += includeFooter ? ' with-footer' : '';
    return className;
  }

  renderNoDoc() {
    const { doc } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header content-header-document" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header-title" }, void 0, /*#__PURE__*/
      _jsx(_Layout.Icon, { icon: "lightbulb" }), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This entity has no document, you probably want to see the metadata"), "\xA0", /*#__PURE__*/



      _jsx(_I18N.I18NLink, { to: `/entity/${doc.get('sharedId')}` }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "view"))))));





  }

  render() {
    const {
      doc,
      sidepanelTab,
      targetDoc,
      changePage,
      onPageChange,
      onDocumentReady,
      addReference,
      loadTargetDocument,
      panelIsOpen,
      showTextSelectMenu,
      file,
      user } =
    this.props;
    const { firstRender } = this.state;
    if (doc.get('_id') && !doc.get('documents').size) {
      return this.renderNoDoc();
    }
    const includeFooter = user.get('_id') && sidepanelTab === 'connections';
    const className = this.prepareClassName(includeFooter);
    const { raw, searchTerm, pageText, page } = this.props;
    const documentTitle = doc.get('title') ? doc.get('title') : '';

    return /*#__PURE__*/(
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, `${documentTitle} • Page ${page}`)), /*#__PURE__*/

      _jsx(_ShowIf.default, { if: !targetDoc }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header content-header-document" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "content-header-title" }, void 0,
      sidepanelTab !== 'connections' && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_Paginator.PaginatorWithPage, { totalPages: file.totalPages, onPageChange: changePage }), /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'] }, void 0, /*#__PURE__*/
      _jsx(_FeatureToggle.FeatureToggle, { feature: "ocr.url" }, void 0, /*#__PURE__*/
      _jsx(_OCRStatus.OCRStatus, { file: file }))), /*#__PURE__*/


      _jsx(_Layout.CurrentLocationLink, {
        onClick: !raw ? this.handlePlainTextClick : () => {},
        className: "btn btn-default",
        queryParams: { raw: raw || firstRender ? '' : 'true' } }, void 0,

      raw || firstRender ? /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Normal view") : /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Plain text")))))), /*#__PURE__*/







      _jsx("main", { className: className }, void 0, /*#__PURE__*/
      _jsx("div", { className: "main-wrapper" }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: sidepanelTab !== 'connections' && !targetDoc }, void 0,
      raw || firstRender ? /*#__PURE__*/
      _jsx("div", { className: `${(0, _determineDirection.default)(file)} raw-text` }, void 0, pageText) : /*#__PURE__*/

      _jsx(_SourceDocument.default, {
        searchTerm: searchTerm,
        onPageChange: onPageChange,
        onDocumentReady: onDocumentReady,
        file: file })), /*#__PURE__*/



      _jsx(_ShowIf.default, { if: sidepanelTab === 'connections' }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList.ConnectionsList, { hideFooter: true, searchCentered: true })), /*#__PURE__*/

      _jsx(_TargetDocument.default, {}), /*#__PURE__*/
      _jsx(_Footer.default, {})),

      includeFooter && /*#__PURE__*/
      _jsx("div", { className: `entity-footer remove-nesting ${panelIsOpen ? 'with-sidepanel' : ''}` }, void 0, /*#__PURE__*/
      _jsx(_Relationships.RelationshipsFormButtons, {}))), /*#__PURE__*/



      _jsx(_ConfirmCloseForm.default, {}), /*#__PURE__*/
      _jsx(_ViewMetadataPanel.default, {
        raw: raw || firstRender,
        storeKey: "documentViewer",
        searchTerm: searchTerm,
        file: file }), /*#__PURE__*/

      _jsx(_Connections.CreateConnectionPanel, {
        containerId: targetDoc ? 'target' : doc.get('sharedId'),
        onCreate: addReference,
        onRangedConnect: loadTargetDocument,
        file: file }),

      sidepanelTab === 'connections' && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_RelationshipMetadata.default, {}), /*#__PURE__*/
      _jsx(_AddEntities.default, {})), /*#__PURE__*/


      _jsx(_ContextMenu.default, {
        align: `bottom${includeFooter ? '-with-footer' : ''}`,
        overrideShow: true,
        show: !panelIsOpen }, void 0, /*#__PURE__*/

      _jsx(_ViewerDefaultMenu.default, {})), /*#__PURE__*/

      _jsx(_ContextMenu.default, { align: "center", overrideShow: true, show: showTextSelectMenu }, void 0, /*#__PURE__*/
      _jsx(_ViewerTextSelectedMenu.default, { file: file }))));



  }}

Viewer.defaultProps = {
  searchTerm: '',
  raw: false,
  onPageChange: () => {},
  changePage: () => {},
  onDocumentReady: () => {},
  page: 1,
  doc: (0, _immutable.Map)(),
  file: {},
  user: (0, _immutable.Map)({}) };
























Viewer.contextTypes = {
  store: _propTypes.default.object };

const mapStateToProps = (state) => {
  const { documentViewer } = state;
  const uiState = documentViewer.uiState.toJS();
  return {
    pageText: documentViewer.rawText,
    doc: (0, _selectors.selectDoc)(state),
    panelIsOpen: !!uiState.panel,
    targetDoc: !!documentViewer.targetDoc.get('_id'),
    locale: state.locale,
    /* TEST!!!!! */sidepanelTab: documentViewer.sidepanel.tab,
    showConnections: documentViewer.sidepanel.tab === 'references',
    showTextSelectMenu: Boolean(
    !documentViewer.targetDoc.get('_id') && uiState.reference && uiState.reference.sourceRange),

    user: state.user };

};
const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{
  addReference: _referencesActions.addReference,
  loadTargetDocument: _documentActions.loadTargetDocument,
  showTab: (tab) => _BasicReducer.actions.set('viewer.sidepanel.tab', tab) },

dispatch);


const ConnectedViewer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Viewer);exports.ConnectedViewer = ConnectedViewer;