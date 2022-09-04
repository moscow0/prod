"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.requestState = exports.processQuery = exports.decodeQuery = void 0;var _BasicReducer = require("../../BasicReducer");
var _libraryFilters = _interopRequireDefault(require("./libraryFilters"));
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));
var _prioritySortingCriteria = _interopRequireDefault(require("../../utils/prioritySortingCriteria"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _commonTopicClassification = require("../../../shared/commonTopicClassification");
var _libraryActions = require("../actions/libraryActions");
var _tocGeneration = require("../../ToggledFeatures/tocGeneration");
var _Multireducer = require("../../Multireducer");
var _userSchema = require("../../../shared/types/userSchema");
var _tableColumns = require("./tableColumns");
var _setReduxState = _interopRequireDefault(require("./setReduxState.js"));const _excluded = ["userSelectedSorting"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const decodeQuery = (params) => {
  try {
    return _risonNode.default.decode(params.q || '()');
  } catch (error) {
    error.status = 404;
    throw error;
  }
};exports.decodeQuery = decodeQuery;

const processQuery = (params, globalResources, key) => {
  const defaultSearch = _prioritySortingCriteria.default.get({ templates: globalResources.templates });

  let query = decodeQuery(params);

  query = Object.assign(query, {
    order: query.order || defaultSearch.order,
    sort: query.sort || defaultSearch.sort,
    view: params.view });


  const noDocuments = !globalResources[key] || !globalResources[key].documents.get('rows').size;

  if (noDocuments && query.limit) {
    query = Object.assign(query, { limit: query.limit + (query.from || 0), from: 0 });
  }

  const { userSelectedSorting } = query,sanitizedQuery = _objectWithoutProperties(query, _excluded);

  const loggedIn = globalResources.user && globalResources.user.has('role');
  const isAdmin = loggedIn && globalResources.user.get('role') === _userSchema.UserRole.ADMIN;

  return _objectSpread(_objectSpread(_objectSpread(_objectSpread({},
  _tocGeneration.tocGenerationUtils.aggregations(sanitizedQuery, globalResources.settings.collection.toJS())),
  loggedIn ? { aggregatePublishingStatus: true } : {}),
  loggedIn && !isAdmin ? { aggregatePermissionsByLevel: true } : {}),
  isAdmin ? { aggregatePermissionsByUsers: true } : {});

};exports.processQuery = processQuery;

const requestState = (
request,
globalResources,
options = { calculateTableColumns: false, geolocation: false }) =>
{
  const docsQuery = processQuery(request.data, globalResources, 'library');

  const documentsRequest = request.set(
  _tocGeneration.tocGenerationUtils.aggregations(docsQuery, globalResources.settings.collection.toJS()));


  const markersRequest = options.geolocation ?
  _SearchAPI.default.search(
  request.set(_objectSpread(_objectSpread({},
  docsQuery), {}, {
    geolocation: true }))) :


  { rows: [] };

  return Promise.all([_SearchAPI.default.search(documentsRequest), markersRequest]).then(
  ([documents, markers]) => {
    const templates = globalResources.templates.toJS();
    const filterState = _libraryFilters.default.URLQueryToState(
    documentsRequest.data,
    templates,
    globalResources.thesauris.toJS(),
    globalResources.relationTypes.toJS(),
    request.data.quickLabelThesaurus ?
    (0, _commonTopicClassification.getThesaurusPropertyNames)(request.data.quickLabelThesaurus, templates) :
    []);


    const state = {
      library: {
        filters: {
          documentTypes: documentsRequest.data.types || [],
          properties: filterState.properties },

        aggregations: documents.aggregations,
        search: filterState.search,
        documents,
        markers } };



    const addinsteadOfSet = Boolean(docsQuery.from);

    const dispatchedActions = [
    (0, _setReduxState.default)(state, 'library', addinsteadOfSet),
    _BasicReducer.actions.set('library.sidepanel.quickLabelState', {
      thesaurus: request.data.quickLabelThesaurus,
      autoSave: false })];


    if (options.calculateTableColumns) {
      const tableViewColumns = (0, _tableColumns.getTableColumns)(documents, templates, documentsRequest.data.types);
      dispatchedActions.push((dispatch) =>
      (0, _Multireducer.wrapDispatch)(dispatch, 'library')((0, _libraryActions.setTableViewColumns)(tableViewColumns)));

    }
    return dispatchedActions;
  });

};exports.requestState = requestState;