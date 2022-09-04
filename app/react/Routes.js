"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getIndexRoute = exports.default = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _App = _interopRequireDefault(require("./App/App"));
var _Activitylog = _interopRequireDefault(require("./Activitylog/Activitylog"));
var _GoogleAnalytics = require("./App/GoogleAnalytics");
var _Configure2fa = _interopRequireDefault(require("./Auth2fa/Configure2fa"));
var _EditTranslations = _interopRequireDefault(require("./I18N/EditTranslations"));
var _blankState = _interopRequireDefault(require("./Library/helpers/blankState"));
var _Library = _interopRequireDefault(require("./Library/Library"));
var _LibraryMap = _interopRequireDefault(require("./Library/LibraryMap"));
var _MetadataExtractionDashboard = require("./MetadataExtraction/MetadataExtractionDashboard");
var _SuggestionsContainer = require("./MetadataExtraction/SuggestionsContainer");
var _EditPage = _interopRequireDefault(require("./Pages/EditPage"));
var _NewPage = _interopRequireDefault(require("./Pages/NewPage"));
var _Pages = _interopRequireDefault(require("./Pages/Pages"));
var _PageView = _interopRequireDefault(require("./Pages/PageView"));
var _EditRelationType = _interopRequireDefault(require("./RelationTypes/EditRelationType"));
var _NewRelationType = _interopRequireDefault(require("./RelationTypes/NewRelationType"));
var _OneUpReview = _interopRequireDefault(require("./Review/OneUpReview"));
var _SemanticSearchResultsView = _interopRequireDefault(require("./SemanticSearch/SemanticSearchResultsView"));
var _Settings = require("./Settings");














var _EditTemplate = _interopRequireDefault(require("./Templates/EditTemplate"));
var _NewTemplate = _interopRequireDefault(require("./Templates/NewTemplate"));
var _EditThesauri = _interopRequireDefault(require("./Thesauri/EditThesauri"));
var _NewThesauri = _interopRequireDefault(require("./Thesauri/NewThesauri"));
var _ThesaurusCockpit = _interopRequireDefault(require("./Thesauri/ThesaurusCockpit"));
var _UploadsRoute = _interopRequireDefault(require("./Uploads/UploadsRoute"));
var _Login = _interopRequireDefault(require("./Users/Login"));
var _ResetPassword = _interopRequireDefault(require("./Users/ResetPassword"));
var _UnlockAccount = _interopRequireDefault(require("./Users/UnlockAccount"));
var _ViewerRoute = _interopRequireDefault(require("./Viewer/ViewerRoute"));
var _GeneralError = _interopRequireDefault(require("./App/ErrorHandling/GeneralError"));
var _UserManagement = require("./Users/UserManagement");
var _store = require("./store");
var _LibraryTable = require("./Library/LibraryTable");
var _routeHelpers = require("./utils/routeHelpers");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

const onEnter = () => {
  (0, _GoogleAnalytics.trackPage)();
};

const needsAuth = (_nxtState, replace) => {
  if (!_store.store.getState().user.get('_id')) {
    replace('/login');
  }
};

const enterOnLibrary = (_nxtState, replace) => {
  const state = _store.store.getState();
  if ((0, _blankState.default)() && !state.user.get('_id')) {
    return replace('/login');
  }

  (0, _GoogleAnalytics.trackPage)();
  return () => {};
};

const getDefaultLibraryComponent = (defaultLibraryView) => {
  switch (defaultLibraryView) {
    case 'table':
      return {
        component: _LibraryTable.LibraryTable,
        onEnter: enterOnLibrary };

    case 'map':
      return {
        component: _LibraryMap.default,
        onEnter };

    case 'cards':
    default:
      return {
        component: _Library.default,
        onEnter: enterOnLibrary };}


};

const getPageIndexRoute = (customHomePage) => {
  onEnter();
  const pageId = customHomePage[customHomePage.indexOf('page') + 1];
  const component = (props) => /*#__PURE__*/_react.default.createElement(_PageView.default, _extends({}, props, { params: { sharedId: pageId } }));
  component.requestState = (requestParams) =>
  _PageView.default.requestState(requestParams.set({ sharedId: pageId }));

  return {
    component,
    customHomePageId: pageId };

};

const libraryDefaults = (callBack, state, defaultView) => {
  if (state.user.get('_id')) {
    return callBack(null, {
      onEnter: (_nextState, replace) => {
        replace('/library/?q=(includeUnpublished:!t)');
      } });

  }

  return callBack(null, getDefaultLibraryComponent(defaultView));
};
const getIndexRoute = (_nextState, callBack) => {
  const state = _store.store.getState();
  const homePageSetting = state.settings.collection.get('home_page') || '';
  const customHomePage = homePageSetting ? homePageSetting.split('/').filter((v) => v) : [];
  const defaultView = state.settings.collection.get('defaultLibraryView');

  if (!(0, _routeHelpers.validateHomePageRoute)(homePageSetting) || customHomePage.length === 0) {
    return libraryDefaults(callBack, state, defaultView);
  }
  return customHomePage.includes('page') ?
  callBack(null, getPageIndexRoute(customHomePage)) :
  callBack(null, {
    onEnter: (_nxtState, replace) => {
      replace(customHomePage.join('/'));
    } });

};exports.getIndexRoute = getIndexRoute;

const routes = /*#__PURE__*/
_jsx(_reactRouter.Route, { getIndexRoute: getIndexRoute }, void 0, /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "settings", component: _Settings.Settings, onEnter: needsAuth }, void 0, /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "account", component: _Settings.AccountSettings }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "2fa", component: _Configure2fa.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "collection", component: _Settings.CollectionSettings }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "navlinks", component: _Settings.NavlinksSettings }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "users", component: _UserManagement.UserManagement }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "preserve", component: _Settings.PreserveSettings }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "pages" }, void 0, /*#__PURE__*/
_jsx(_reactRouter.IndexRoute, { component: _Pages.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "new", component: _NewPage.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "edit/:sharedId", component: _EditPage.default })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "templates" }, void 0, /*#__PURE__*/
_jsx(_reactRouter.IndexRoute, { component: _Settings.EntityTypesList }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "new", component: _NewTemplate.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "edit/:templateId", component: _EditTemplate.default })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "metadata_extraction", component: _MetadataExtractionDashboard.MetadataExtractionDashboard }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "metadata_extraction/suggestions/:propertyName", component: _SuggestionsContainer.IXSuggestions }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "connections" }, void 0, /*#__PURE__*/
_jsx(_reactRouter.IndexRoute, { component: _Settings.RelationTypesList }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "new", component: _NewRelationType.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "edit/:_id", component: _EditRelationType.default })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "dictionaries" }, void 0, /*#__PURE__*/
_jsx(_reactRouter.IndexRoute, { component: _Settings.ThesauriList }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "new", component: _NewThesauri.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "edit/:_id", component: _EditThesauri.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "cockpit/:_id", component: _ThesaurusCockpit.default })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "languages", component: _Settings.Languages }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "translations" }, void 0, /*#__PURE__*/
_jsx(_reactRouter.IndexRoute, { component: _Settings.TranslationsList }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "edit/:context", component: _EditTranslations.default })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "filters", component: _Settings.FiltersForm }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "customisation", component: _Settings.Customisation }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "custom-uploads", component: _Settings.CustomUploads }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "activitylog", component: _Activitylog.default, onEnter: needsAuth })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "library", component: _Library.default, onEnter: enterOnLibrary }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "library/map", component: _LibraryMap.default, onEnter: onEnter }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "library/table", component: _LibraryTable.LibraryTable, onEnter: enterOnLibrary }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "review", component: _OneUpReview.default, onEnter: needsAuth }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "uploads", component: _UploadsRoute.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "login", component: _Login.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "setpassword/:key", component: _ResetPassword.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "unlockaccount/:username/:code", component: _UnlockAccount.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "document/:sharedId*", component: _ViewerRoute.default, onEnter: onEnter }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "entity/:sharedId", component: _ViewerRoute.default, onEnter: onEnter }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "page/:sharedId", component: _PageView.default, onEnter: onEnter }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "page/:sharedId/:slug", component: _PageView.default, onEnter: onEnter }), /*#__PURE__*/
_jsx(_reactRouter.Route, {
  path: "semanticsearch/:searchId",
  component: _SemanticSearchResultsView.default,
  onEnter: onEnter }), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "error/:errorCode", component: _GeneralError.default }), /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "404", component: _GeneralError.default }));var _default = /*#__PURE__*/






_jsx(_reactRouter.Route, { path: "/", component: _App.default }, void 0,
routes, /*#__PURE__*/
_jsx(_reactRouter.Route, { path: ":lang" }, void 0,
routes, /*#__PURE__*/
_jsx(_reactRouter.Route, { path: "*", component: _GeneralError.default })), /*#__PURE__*/

_jsx(_reactRouter.Route, { path: "*", component: _GeneralError.default }));exports.default = _default;