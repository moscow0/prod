"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.DocumentSidePanel = void 0;
var _reactTabsRedux = require("react-tabs-redux");
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
require("./scss/toc.scss");

var _Metadata = require("../../Metadata");
var _Auth = require("../../Auth");
var _I18N = require("../../I18N");
var _Attachments = require("../../Attachments");
var _FileList = require("../../Attachments/components/FileList");
var _ConnectionsList = _interopRequireDefault(require("../../Viewer/components/ConnectionsList"));
var _ConnectionsList2 = require("../../ConnectionsList");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _DocumentResults = _interopRequireDefault(require("../../SemanticSearch/components/DocumentResults"));
var _CopyFromEntity = require("../../Metadata/components/CopyFromEntity");
var _tocGeneration = require("../../ToggledFeatures/tocGeneration");
var _UI = require("../../UI");

var viewerModule = _interopRequireWildcard(require("../../Viewer"));
var _entityDefaultDocument = require("../../../shared/entityDefaultDocument");
var _SearchText = _interopRequireDefault(require("./SearchText"));
var _ShowToc = _interopRequireDefault(require("./ShowToc"));
var _SnippetsTab = _interopRequireDefault(require("./SnippetsTab"));
var _helpers = _interopRequireDefault(require("../helpers"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class DocumentSidePanel extends _react.Component {
  constructor(props) {
    super(props);
    this.selectTab = this.selectTab.bind(this);
    this.state = { copyFrom: false, copyFromProps: [] };
    this.toggleCopyFrom = this.toggleCopyFrom.bind(this);
    this.onCopyFromSelect = this.onCopyFromSelect.bind(this);
    this.deleteDocument = this.deleteDocument.bind(this);
    this.toggleSharing = this.toggleSharing.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (
    this.props.doc.get('_id') &&
    prevProps.doc.get('_id') !== this.props.doc.get('_id') &&
    this.props.getDocumentReferences)
    {
      this.props.getDocumentReferences(
      this.props.doc.get('sharedId'),
      this.props.file._id,
      this.props.storeKey);

    }
  }

  onCopyFromSelect(copyFromProps) {
    this.setState({ copyFromProps });
  }

  getDefaultDocumentToC(isEntity, documents, language, defaultLanguage) {
    let defaultDocumentToC = this.props.file.toc;

    if (!isEntity) {
      const defaultDocument = _objectSpread({},
      (0, _entityDefaultDocument.entityDefaultDocument)(documents, language, defaultLanguage));

      if (defaultDocument) {
        defaultDocumentToC = defaultDocument.toc;
      }
    }
    return defaultDocumentToC;
  }

  deleteDocument() {
    this.context.confirm({
      accept: () => {
        this.props.deleteDocument(this.props.doc.toJS()).then(() => {
          const currentPath = _reactRouter.browserHistory.getCurrentLocation().pathname;
          const isLibraryorUploads = /library|uploads|^\/$|^\/..\/$/;
          if (!currentPath.match(isLibraryorUploads)) {
            _reactRouter.browserHistory.goBack();
          }
        });
      },
      title: 'Confirm',
      message: 'Are you sure you want to delete this item?' });

  }

  selectTab(tabSelected) {
    this.props.showTab(tabSelected);
  }

  _close() {
    this.props.resetForm(this.props.formPath);
    this.props.closePanel();
    this.setState({ copyFrom: false });
  }

  close() {
    if (this.props.formDirty) {
      this.context.confirm({
        accept: () => {
          this._close();
        },
        title: 'Confirm',
        message: 'All changes will be lost, are you sure you want to proceed?' });

      return;
    }
    this._close();
  }

  toggleCopyFrom() {
    this.setState((currentState) => ({
      copyFrom: !currentState.copyFrom }));

  }

  toggleSharing() {
    this.setState((currentState) => ({
      sharing: !currentState.sharing }));

  }

  renderHeader(tab, doc, isEntity) {
    if (this.state.copyFrom) {
      return /*#__PURE__*/(
        _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Copy properties to this entity from"), ":"));


    }

    const { excludeConnectionsTab, connectionsGroups, isTargetDoc, references } = this.props;

    const summary = connectionsGroups.reduce(
    (summaryData, g) => {
      g.get('templates').forEach((template) => {
        summaryData.totalConnections += template.get('count');
      });
      return summaryData;
    },
    { totalConnections: 0 });

    return /*#__PURE__*/(
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: this.close.bind(this),
        "aria-label": "Close side panel" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" })), /*#__PURE__*/

      _jsx(_reactTabsRedux.Tabs, { selectedTab: tab, renderActiveTabContentOnly: true, handleSelect: this.selectTab }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "nav nav-tabs" }, void 0,
      (() => {
        if (!this.props.raw && doc.get('semanticSearch')) {
          return /*#__PURE__*/(
            _jsx("li", {}, void 0, /*#__PURE__*/
            _jsx(_reactTabsRedux.TabLink, {
              to: "semantic-search-results",
              role: "button",
              tabIndex: "0",
              "aria-label": (0, _I18N.t)('System', 'Semantic search results', null, false),
              component: "div" }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "flask" }), /*#__PURE__*/
            _jsx("span", { className: "tab-link-tooltip" }, void 0, /*#__PURE__*/
            _jsx(_I18N.Translate, {}, void 0, "Semantic search results")))));




        }
      })(),
      (() => {
        if (!this.props.raw) {
          return /*#__PURE__*/(
            _jsx("li", {}, void 0, /*#__PURE__*/
            _jsx(_reactTabsRedux.TabLink, {
              to: "text-search",
              role: "button",
              tabIndex: "0",
              "aria-label": (0, _I18N.t)('System', 'Search text', null, false),
              component: "div" }, void 0, /*#__PURE__*/

            _jsx(_SnippetsTab.default, { storeKey: this.props.storeKey }))));



        }
      })(),
      (() => {
        if (!isEntity && !this.props.raw) {
          return /*#__PURE__*/(
            _jsx("li", {}, void 0, /*#__PURE__*/
            _jsx(_reactTabsRedux.TabLink, {
              to: "toc",
              role: "button",
              tabIndex: "0",
              "aria-label": (0, _I18N.t)('System', 'Table of Contents', null, false),
              component: "div" }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "font" }), /*#__PURE__*/
            _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Table of Contents')))));



        }
        return /*#__PURE__*/_jsx("span", {});
      })(),
      (() => {
        if (!isEntity && !this.props.raw) {
          return /*#__PURE__*/(
            _jsx("li", {}, void 0, /*#__PURE__*/
            _jsx(_reactTabsRedux.TabLink, {
              to: "references",
              role: "button",
              tabIndex: "0",
              "aria-label": (0, _I18N.t)('System', 'References', null, false),
              component: "div" }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "sitemap" }), /*#__PURE__*/
            _jsx("span", { className: "connectionsNumber" }, void 0, references.size), /*#__PURE__*/
            _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'References')))));



        }
        return /*#__PURE__*/_jsx("span", {});
      })(),
      (() => {
        if (!this.props.raw) {
          return /*#__PURE__*/_jsx("li", { className: "tab-separator" });
        }
        return /*#__PURE__*/_jsx("span", {});
      })(), /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabLink, {
        to: "metadata",
        default: true,
        role: "button",
        tabIndex: "0",
        "aria-label": (0, _I18N.t)('System', 'Info', null, false),
        component: "div" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "info-circle" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Info')))),


      (() => {
        if (!isTargetDoc && !excludeConnectionsTab) {
          return /*#__PURE__*/(
            _jsx("li", {}, void 0, /*#__PURE__*/
            _jsx(_reactTabsRedux.TabLink, {
              to: "connections",
              role: "button",
              tabIndex: "0",
              "aria-label": (0, _I18N.t)('System', 'Connections', null, false),
              component: "div" }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "exchange-alt" }), /*#__PURE__*/
            _jsx("span", { className: "connectionsNumber" }, void 0, summary.totalConnections), /*#__PURE__*/
            _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Connections')))));



        }
      })()))));




  }

  render() {
    const {
      doc,
      docBeingEdited,
      readOnly,
      references,
      EntityForm,
      isTargetDoc,
      relationships,
      defaultLanguage } =
    this.props;

    const TocForm = this.props.tocFormComponent;

    const jsDoc = _helpers.default.performantDocToJSWithoutRelations(doc);
    const { attachments, documents, language, defaultDoc } = jsDoc;

    const isEntity = !documents || !documents.length;
    const defaultDocumentToC =
    isEntity || !defaultDoc ?
    this.getDefaultDocumentToC(isEntity, documents, language, defaultLanguage) :
    defaultDoc.toc;

    this.initialTemplateId = doc.get('template');
    const tab =
    isEntity && (this.props.tab === 'references' || this.props.tab === 'toc') || !this.props.tab ?
    'metadata' :
    this.props.tab;

    const className =
    this.state.copyFrom && docBeingEdited && tab === 'metadata' ?
    'metadata-sidepanel two-columns' :
    'metadata-sidepanel';

    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: this.props.open, className: className }, void 0,
      this.renderHeader(tab, doc, isEntity), /*#__PURE__*/
      _jsx(_ShowIf.default, { if: (this.props.tab === 'metadata' || !this.props.tab) && !this.state.copyFrom }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx(_Metadata.MetadataFormButtons, {
        delete: this.deleteDocument,
        data: this.props.doc,
        formStatePath: this.props.formPath,
        entityBeingEdited: docBeingEdited,
        includeViewButton: !docBeingEdited && readOnly,
        storeKey: this.props.storeKey,
        copyFrom: this.toggleCopyFrom }))), /*#__PURE__*/



      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [jsDoc] }, void 0,
      this.props.tab === 'toc' && this.props.tocBeingEdited && /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "edit-toc btn btn-default",
        onClick: this.props.leaveEditMode }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("button", { type: "submit", form: "tocForm", className: "edit-toc btn btn-success" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save")))))), /*#__PURE__*/






      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [jsDoc] }, void 0,
      this.props.tab === 'toc' && !this.props.tocBeingEdited && !readOnly && /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: () => this.props.editToc(this.props.file.toc || []),
        className: "edit-toc btn btn-default" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Edit"))), /*#__PURE__*/


      _jsx(_tocGeneration.ReviewTocButton, { file: this.props.file }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Mark as Reviewed"))))), /*#__PURE__*/





      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.Tabs, { selectedTab: this.props.tab || 'metadata' }, void 0, /*#__PURE__*/
      _jsx(_reactTabsRedux.TabContent, { for: "text-search", className: "text-search" }, void 0, /*#__PURE__*/
      _jsx(_SearchText.default, {
        doc: doc,
        storeKey: this.props.storeKey,
        searchTerm: this.props.searchTerm })), /*#__PURE__*/


      _jsx(_reactTabsRedux.TabContent, { for: "toc", className: "toc" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "tocHeader" }, void 0, /*#__PURE__*/
      _jsx("h1", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Table of contents")), "\xA0", /*#__PURE__*/


      _jsx(_tocGeneration.TocGeneratedLabel, { file: this.props.file }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "auto-created"), " \u24D8")), /*#__PURE__*/


      _jsx(_ShowIf.default, { if: !this.props.tocBeingEdited }, void 0, /*#__PURE__*/
      _jsx(_ShowToc.default, { toc: defaultDocumentToC, readOnly: readOnly })), /*#__PURE__*/

      _jsx(_ShowIf.default, { if: this.props.tocBeingEdited }, void 0, /*#__PURE__*/
      _jsx(TocForm, {
        removeEntry: this.props.removeFromToc,
        indent: this.props.indentTocElement,
        onSubmit: this.props.saveToc,
        model: "documentViewer.tocForm",
        state: this.props.tocFormState,
        toc: this.props.tocForm,
        file: this.props.file }))), /*#__PURE__*/



      _jsx(_reactTabsRedux.TabContent, { for: "metadata", className: "metadata" }, void 0,
      (() => {
        if (docBeingEdited && this.state.copyFrom) {
          return /*#__PURE__*/(
            _jsx("div", { className: "side-panel-container" }, void 0, /*#__PURE__*/
            _jsx(EntityForm, {
              storeKey: this.props.storeKey,
              initialTemplateId: this.initialTemplateId,
              highlightedProps: this.state.copyFromProps }), /*#__PURE__*/

            _jsx(_CopyFromEntity.CopyFromEntity, {
              originalEntity: this.props.formData,
              templates: this.props.templates,
              onSelect: this.onCopyFromSelect,
              formModel: this.props.formPath,
              onCancel: this.toggleCopyFrom })));



        }
        if (docBeingEdited) {
          return /*#__PURE__*/(
            _jsx(EntityForm, {
              storeKey: this.props.storeKey,
              initialTemplateId: this.initialTemplateId }));


        }
        return /*#__PURE__*/(
          _jsx("div", {}, void 0, /*#__PURE__*/
          _jsx(_Metadata.ShowMetadata, {
            relationships: relationships,
            entity: jsDoc,
            showTitle: true,
            showType: true,
            groupGeolocations: true }), /*#__PURE__*/

          _jsx(_FileList.FileList, { files: documents, storeKey: this.props.storeKey, entity: jsDoc }), /*#__PURE__*/
          _jsx(_Attachments.AttachmentsList, {
            attachments: attachments,
            isTargetDoc: isTargetDoc,
            isDocumentAttachments: Boolean(doc.get('file')),
            parentId: doc.get('_id'),
            parentSharedId: doc.get('sharedId'),
            storeKey: this.props.storeKey,
            entity: jsDoc })));



      })()), /*#__PURE__*/

      _jsx(_reactTabsRedux.TabContent, { for: "references", className: "references" }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList.default, {
        referencesSection: "references",
        references: references,
        readOnly: readOnly })), /*#__PURE__*/


      _jsx(_reactTabsRedux.TabContent, { for: "connections", className: "connections" }, void 0, /*#__PURE__*/
      _jsx(_ConnectionsList2.ConnectionsGroups, {})), /*#__PURE__*/

      _jsx(_reactTabsRedux.TabContent, { for: "semantic-search-results" }, void 0, /*#__PURE__*/
      _jsx(_DocumentResults.default, { doc: jsDoc }))))));





  }}exports.DocumentSidePanel = DocumentSidePanel;


DocumentSidePanel.defaultProps = {
  tab: 'metadata',
  open: false,
  tocBeingEdited: false,
  docBeingEdited: false,
  searchTerm: '',
  references: _immutable.default.fromJS([]),
  relationships: _immutable.default.fromJS([]),
  tocFormState: {},
  formDirty: false,
  isTargetDoc: false,
  readOnly: false,
  getDocumentReferences: undefined,
  tocFormComponent: () => false,
  EntityForm: () => false,
  raw: false,
  file: {},
  leaveEditMode: () => {} };








































DocumentSidePanel.contextTypes = {
  confirm: _propTypes.default.func };


const mapStateToProps = (state, ownProps) => {
  const isTargetDoc = state.documentViewer.targetDoc.get('_id');
  const relevantReferences = isTargetDoc ?
  viewerModule.selectors.selectTargetReferences(state) :
  viewerModule.selectors.selectReferences(state);
  const references = ownProps.references ?
  viewerModule.selectors.parseReferences(ownProps.doc, ownProps.references) :
  relevantReferences;
  const defaultLanguage = state.settings.collection.
  get('languages').
  find((l) => l.get('default')).
  get('key');

  return {
    references,
    excludeConnectionsTab: Boolean(ownProps.references),
    connectionsGroups: state.relationships.list.connectionsGroups,
    relationships: ownProps.references,
    defaultLanguage,
    templates: state.templates,
    formData: state[ownProps.storeKey].sidepanel.metadata };

};exports.mapStateToProps = mapStateToProps;var _default =



(0, _reactRedux.connect)(mapStateToProps)(DocumentSidePanel);exports.default = _default;