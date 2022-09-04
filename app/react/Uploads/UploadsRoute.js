"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _reactHelmet = require("react-helmet");
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _LibraryCharts = _interopRequireDefault(require("../Charts/components/LibraryCharts"));
var _I18N = require("../I18N");
var _libraryActions = require("../Library/actions/libraryActions");
var _requestState = require("../Library/helpers/requestState");
var _DocumentsList = _interopRequireDefault(require("../Library/components/DocumentsList"));
var _LibraryFilters = _interopRequireDefault(require("../Library/components/LibraryFilters"));
var _SearchBar = _interopRequireDefault(require("../Library/components/SearchBar"));
var _SearchButton = _interopRequireDefault(require("../Library/components/SearchButton"));
var _ViewMetadataPanel = _interopRequireDefault(require("../Library/components/ViewMetadataPanel"));
var _SelectMultiplePanelContainer = _interopRequireDefault(require("../Library/containers/SelectMultiplePanelContainer"));
var _libraryFilters = _interopRequireDefault(require("../Library/helpers/libraryFilters"));
var _Multireducer = require("../Multireducer");
var _SearchAPI = _interopRequireDefault(require("../Search/SearchAPI"));
var _ImportPanel = _interopRequireDefault(require("./components/ImportPanel"));
var _UploadBox = _interopRequireDefault(require("./components/UploadBox"));
var _UploadsHeader = _interopRequireDefault(require("./components/UploadsHeader"));

var _setReduxState = _interopRequireDefault(require("../Library/helpers/setReduxState"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _socket = require("../socket");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Uploads extends _RouteHandler.default {
  constructor(props, context) {
    super(props, context);
    this.refreshSearch = this.refreshSearch.bind(this);
  }

  static renderTools() {
    return /*#__PURE__*/(
      _jsx("div", { className: "searchBox" }, void 0, /*#__PURE__*/
      _jsx(_SearchButton.default, { storeKey: "uploads" })));


  }

  urlHasChanged(nextProps) {
    return nextProps.location.query.q !== this.props.location.query.q;
  }

  emptyState() {
    (0, _Multireducer.wrapDispatch)(this.context.store.dispatch, 'uploads')((0, _libraryActions.unsetDocuments)());
  }

  static async requestState(requestParams, globalResources) {
    const query = (0, _requestState.processQuery)(requestParams.data, globalResources, 'uploads');
    query.unpublished = true;

    const documents = await _SearchAPI.default.search(requestParams.set(query));
    const filterState = _libraryFilters.default.URLQueryToState(
    query,
    globalResources.templates.toJS(),
    globalResources.relationTypes.toJS());


    const addinsteadOfSet = Boolean(query.from);

    return [
    (0, _setReduxState.default)(
    {
      uploads: {
        documents,
        filters: {
          documentTypes: query.types || [],
          properties: filterState.properties },

        aggregations: documents.aggregations,
        search: filterState.search } },


    'uploads',
    addinsteadOfSet)];


  }

  refreshSearch() {
    super.getClientState(this.props);
  }

  componentDidMount() {
    const dispatch = (0, _Multireducer.wrapDispatch)(this.context.store.dispatch, 'uploads');
    _socket.socket.on('IMPORT_CSV_END', this.refreshSearch);
    dispatch((0, _libraryActions.enterLibrary)());
  }

  componentWillUnmount() {
    _socket.socket.removeListener('IMPORT_CSV_END', this.refreshSearch);
    this.emptyState();
  }

  componentDidUpdate(prevProps) {
    if (this.urlHasChanged(prevProps)) {
      this.getClientState(this.props);
    }
  }

  render() {
    const query = _risonNode.default.decode(this.props.location.query.q || '()');
    const chartView = this.props.location.query.view === 'chart';
    const mainView = !chartView ? /*#__PURE__*/
    _jsx(_DocumentsList.default, { storeKey: "uploads", SearchBar: _SearchBar.default }) : /*#__PURE__*/

    _jsx(_LibraryCharts.default, { storeKey: "uploads" });


    return /*#__PURE__*/(
      _jsx("div", { className: "row panels-layout" }, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, (0, _I18N.t)('System', 'Uploads', null, false))), /*#__PURE__*/

      _jsx(_UploadsHeader.default, {}), /*#__PURE__*/
      _jsx("div", { className: "content-holder uploads-viewer document-viewer with-panel with-header" }, void 0, /*#__PURE__*/
      _jsx("main", {}, void 0, /*#__PURE__*/
      _jsx(_UploadBox.default, {}),

      mainView), /*#__PURE__*/

      _jsx(_LibraryFilters.default, { uploadsSection: true, storeKey: "uploads" }), /*#__PURE__*/
      _jsx(_ViewMetadataPanel.default, { storeKey: "uploads", searchTerm: query.searchTerm }), /*#__PURE__*/
      _jsx(_SelectMultiplePanelContainer.default, { storeKey: "uploads" }), /*#__PURE__*/
      _jsx(_ImportPanel.default, {}))));



  }}exports.default = Uploads;