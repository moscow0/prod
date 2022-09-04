"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.DocumentsList = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRouter = require("react-router");
var _JSONRequest = require("../../shared/JSONRequest");
var _risonNode = _interopRequireDefault(require("rison-node"));
var _SearchBar = _interopRequireDefault(require("../Library/components/SearchBar"));
var _SortButtons = _interopRequireDefault(require("../Library/components/SortButtons"));
var _Loader = _interopRequireDefault(require("../components/Elements/Loader"));
var _Footer = _interopRequireDefault(require("../App/Footer"));
var _Auth = require("../Auth");
var _I18N = require("../I18N");
var _DocumentCounter = require("./DocumentCounter");
var _UI = require("../UI");
var _Welcome = _interopRequireDefault(require("./components/Welcome"));
var _TilesViewer = require("./TilesViewer");
var _blankState = _interopRequireDefault(require("../Library/helpers/blankState"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class DocumentsList extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { loading: false };
    this.clickOnDocument = this.clickOnDocument.bind(this);
    this.selectAllDocuments = this.selectAllDocuments.bind(this);
    this.loadNextGroupOfEntities = this.loadNextGroupOfEntities.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  loadMoreDocuments(amount, from) {
    this.setState({ loading: true });
    this.props.loadMoreDocuments(this.props.storeKey, amount, from);
  }

  selectAllDocuments() {
    if (this.props.selectAllDocuments) {
      this.props.selectAllDocuments.apply(this);
    }
  }

  clickOnDocument(...args) {
    if (this.props.clickOnDocument) {
      this.props.clickOnDocument.apply(this, args);
    }
  }

  loadNextGroupOfEntities() {
    const from = this.props.documents.get('rows').size;
    const DEFAULT_PAGE_SIZE = 30;
    if (from) {
      this.loadMoreDocuments(DEFAULT_PAGE_SIZE, from);
    }
  }

  loadMoreButton(amount) {
    const query = _objectSpread({}, this.props.location.query);
    const q = query.q ? _risonNode.default.decode(query.q) : {};
    const from = this.props.documents.get('rows').size;
    q.from = from;
    q.limit = amount;
    query.q = _risonNode.default.encode(q);
    const url = `${this.props.location.pathname}${(0, _JSONRequest.toUrlParams)(query)}`;
    return /*#__PURE__*/(
      _jsx(_reactRouter.Link, {
        to: url,
        className: "btn btn-default btn-load-more",
        onClick: (e) => {
          e.preventDefault();
          this.loadMoreDocuments(amount, from);
        } }, void 0,

      amount, " ", (0, _I18N.t)('System', 'x more')));


  }

  render() {
    const {
      documents,
      connections,
      GraphView,
      view,
      searchCentered,
      hideFooter,
      connectionsGroups,
      LoadMoreButton,
      rowListZoomLevel,
      CollectionViewer } =
    this.props;

    const totalConnections = connections ?
    connectionsGroups.reduce(
    (total, g) =>
    total +
    g.get('templates').reduce((count, template) => count + template.get('count'), 0),
    0) :

    undefined;

    const counter = /*#__PURE__*/
    _jsx(_DocumentCounter.DocumentCounter, {
      selectedEntitiesCount: this.props.selectedDocuments.size,
      entityListCount: this.props.documents.get('rows').size,
      entityTotal: documents.get('totalRows'),
      hitsTotalRelation: documents.get('relation'),
      totalConnectionsCount: totalConnections });



    const Search = this.props.SearchBar;
    const ActionButtons = this.props.ActionButtons ? /*#__PURE__*/
    _jsx("div", { className: "search-list-actions" }, void 0, /*#__PURE__*/
    _jsx(this.props.ActionButtons, {})) :

    null;
    const FooterComponent = !hideFooter ? /*#__PURE__*/_jsx(_Footer.default, {}) : null;

    return /*#__PURE__*/(
      _jsx("div", { className: "documents-list" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "main-wrapper" }, void 0, /*#__PURE__*/
      _jsx("div", { className: `search-list ${searchCentered ? 'centered' : ''}` }, void 0,
      ActionButtons, " ", Search && /*#__PURE__*/_jsx(Search, { storeKey: this.props.storeKey })), /*#__PURE__*/

      _jsx("div", { className: `sort-by ${searchCentered ? 'centered' : ''}` }, void 0, /*#__PURE__*/
      _jsx("span", { className: "documents-counter-sort" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "sorted by")), /*#__PURE__*/

      _jsx(_SortButtons.default, {
        sortCallback: this.props.searchDocuments,
        selectedTemplates: this.props.filters.get('documentTypes'),
        stateProperty: this.props.sortButtonsStateProperty,
        storeKey: this.props.storeKey }), /*#__PURE__*/

      _jsx(_Auth.NeedAuthorization, {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "select-all-documents" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-default btn-xs",
        onClick: this.selectAllDocuments }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Select all")))), /*#__PURE__*/



      _jsx("div", { className: "documents-counter" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "documents-counter-label" }, void 0, counter))),


      (0, _blankState.default)() && /*#__PURE__*/_jsx(_Welcome.default, {}),

      (() => {
        if (view !== 'graph') {
          return /*#__PURE__*/(
            _react.default.createElement(CollectionViewer, {

              rowListZoomLevel,
              storeKey: this.props.storeKey,
              clickOnDocument: this.clickOnDocument,
              onSnippetClick: this.props.onSnippetClick,
              deleteConnection: this.props.deleteConnection,
              loadNextGroupOfEntities: this.loadNextGroupOfEntities }));



        }
        if (view === 'graph') {
          return /*#__PURE__*/_jsx(GraphView, { clickOnDocument: this.clickOnDocument });
        }
        return null;
      })(), /*#__PURE__*/

      _jsx("div", { className: "row" }, void 0,
      (() => {
        if (view !== 'graph') {
          return /*#__PURE__*/_jsx("p", { className: "col-sm-12 text-center documents-counter" }, void 0, counter);
        }
        return null;
      })(),
      (() => {
        if (LoadMoreButton) {
          return /*#__PURE__*/_jsx(LoadMoreButton, {});
        }
        if (documents.get('rows').size < documents.get('totalRows') && !this.state.loading) {
          return /*#__PURE__*/(
            _jsx("div", { className: "col-sm-12 text-center" }, void 0,
            this.loadMoreButton(30), " ", this.loadMoreButton(300)));


        }
        if (this.state.loading) {
          return /*#__PURE__*/_jsx(_Loader.default, {});
        }
        return null;
      })(), /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "col-sm-12 force-ltr text-center protip" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "lightbulb" }), ' ', /*#__PURE__*/
      _jsx("b", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "ProTip!")), /*#__PURE__*/

      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Use"), "\xA0", /*#__PURE__*/
      _jsx("span", { className: "protip-key", "no-translate": true }, void 0, "cmd"), "\xA0 ", /*#__PURE__*/


      _jsx(_I18N.Translate, {}, void 0, "or"), ' ', /*#__PURE__*/
      _jsx("span", { className: "protip-key", "no-translate": true }, void 0, "shift"), "\xA0 ", /*#__PURE__*/


      _jsx(_I18N.Translate, {}, void 0, "+ click to select multiple cards."))))),




      FooterComponent)));



  }}exports.DocumentsList = DocumentsList;


DocumentsList.defaultProps = {
  SearchBar: _SearchBar.default,
  rowListZoomLevel: 0,
  CollectionViewer: _TilesViewer.TilesViewer,
  selectedDocuments: {} };var _default =


































(0, _reactRouter.withRouter)(DocumentsList);exports.default = _default;