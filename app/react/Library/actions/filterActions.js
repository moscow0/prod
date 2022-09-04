"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.filterDocumentTypes = filterDocumentTypes;exports.resetFilters = resetFilters;exports.toggleFilter = toggleFilter;var types = _interopRequireWildcard(require("./actionTypes"));
var _libraryFilters = _interopRequireDefault(require("../helpers/libraryFilters"));
var _comonProperties = _interopRequireDefault(require("../../../shared/comonProperties"));
var libraryActions = _interopRequireWildcard(require("./libraryActions"));
var _prioritySortingCriteria = _interopRequireDefault(require("../../utils/prioritySortingCriteria"));
var _reactReduxForm = require("react-redux-form");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function filterDocumentTypes(documentTypes, storeKey = 'library') {
  return (dispatch, getState) => {
    const state = getState();

    const templates = state.templates.toJS();
    const thesauris = state.thesauris.toJS();

    let libraryFilters = _comonProperties.default.
    comonProperties(templates, documentTypes).
    filter((prop) => prop.filter);
    libraryFilters = _libraryFilters.default.populateOptions(libraryFilters, thesauris);

    const usefulTemplates = documentTypes.length ?
    templates.filter((t) => documentTypes.includes(t._id)) :
    templates;

    const { sort, order } = _prioritySortingCriteria.default.get({
      currentCriteria: { sort: state[storeKey].search.sort, order: state[storeKey].search.order },
      filteredTemplates: usefulTemplates.map((t) => t._id),
      templates: state.templates,
      selectedSorting: state[storeKey].selectedSorting });


    const search = _objectSpread(_objectSpread({
      types: documentTypes },
    state[storeKey].search), {}, {
      sort,
      order });


    const filters = { documentTypes, properties: libraryFilters };
    dispatch(libraryActions.searchDocuments({ filters, search }, storeKey));
  };
}

function resetFilters(storeKey) {
  return (dispatch, getState) => {
    dispatch({ type: types.SET_LIBRARY_FILTERS, documentTypes: [], libraryFilters: [] });
    dispatch(
    _reactReduxForm.actions.load(`${storeKey}.search`, {
      searchTerm: '',
      filters: {},
      order: 'desc',
      sort: 'creationDate' }));


    libraryActions.searchDocuments({ search: getState()[storeKey].search }, storeKey)(
    dispatch,
    getState);

  };
}

function toggleFilter(propertyName, properties) {
  return (dispatch) => {
    const updatedProperties = properties.map((property) => {
      if (property.name === propertyName) {
        property.active = !property.active;
      }
      return property;
    });
    dispatch({ type: types.UPDATE_LIBRARY_FILTERS, libraryFilters: updatedProperties });
  };
}