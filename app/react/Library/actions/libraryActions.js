"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addDocuments = addDocuments;exports.deleteDocument = deleteDocument;exports.deleteEntity = deleteEntity;exports.elementCreated = elementCreated;exports.encodeSearch = encodeSearch;exports.enterLibrary = enterLibrary;exports.filterIsEmpty = filterIsEmpty;exports.getAggregationSuggestions = getAggregationSuggestions;exports.getAndSelectDocument = getAndSelectDocument;exports.getDocumentReferences = getDocumentReferences;exports.getSuggestions = getSuggestions;exports.hideFilters = hideFilters;exports.hideSuggestions = hideSuggestions;exports.initializeFiltersForm = initializeFiltersForm;exports.loadMoreDocuments = loadMoreDocuments;exports.multipleUpdate = multipleUpdate;exports.processFilters = processFilters;exports.removeDocument = removeDocument;exports.removeDocuments = removeDocuments;exports.saveDocument = saveDocument;exports.saveEntity = saveEntity;exports.searchDocuments = searchDocuments;exports.searchSnippets = searchSnippets;exports.selectDocument = selectDocument;exports.selectDocuments = selectDocuments;exports.selectSingleDocument = selectSingleDocument;exports.setDocuments = setDocuments;exports.setOverSuggestions = setOverSuggestions;exports.setPreviewDoc = setPreviewDoc;exports.setSuggestions = setSuggestions;exports.setTableViewAllColumnsHidden = setTableViewAllColumnsHidden;exports.setTableViewColumnHidden = setTableViewColumnHidden;exports.setTableViewColumns = setTableViewColumns;exports.setTemplates = setTemplates;exports.showFilters = showFilters;exports.showSuggestions = showSuggestions;exports.unselectAllDocuments = unselectAllDocuments;exports.unselectDocument = unselectDocument;exports.unsetDocuments = unsetDocuments;exports.updateEntities = updateEntities;exports.updateEntity = updateEntity;exports.updateSelectedEntities = updateSelectedEntities;exports.zoomIn = zoomIn;exports.zoomOut = zoomOut;
var _qs = _interopRequireDefault(require("qs"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _reactReduxForm = require("react-redux-form");
var _reactRouter = require("react-router");
var _store = require("../../store");
var types = _interopRequireWildcard(require("./actionTypes"));
var _BasicReducer = require("../../BasicReducer");
var _Documents = require("../../Documents");
var _Entities = require("../../Entities");
var _Notifications = require("../../Notifications");
var _RequestParams = require("../../utils/RequestParams");
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));
var _referencesAPI = _interopRequireDefault(require("../../Viewer/referencesAPI"));
var _JSONRequest = require("../../../shared/JSONRequest");
var _quickLabelActions = require("./quickLabelActions");
var _publishedStatusFilter = require("../helpers/publishedStatusFilter");
var _saveEntityWithFiles = require("./saveEntityWithFiles");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function enterLibrary() {
  return { type: types.ENTER_LIBRARY };
}

function initializeFiltersForm(values = {}) {
  return Object.assign(values, { type: types.INITIALIZE_FILTERS_FORM });
}

function selectDocument(_doc) {
  return async (dispatch, getState) => {
    const doc = _doc.toJS ? _doc.toJS() : _doc;
    const showingSemanticSearch = getState().library.sidepanel.tab === 'semantic-search-results';
    if (showingSemanticSearch && !doc.semanticSearch) {
      dispatch(_BasicReducer.actions.set('library.sidepanel.tab', ''));
    }
    await dispatch((0, _quickLabelActions.maybeSaveQuickLabels)());
    dispatch({ type: types.SELECT_DOCUMENT, doc });
    dispatch((0, _quickLabelActions.selectedDocumentsChanged)());
  };
}

function getAndSelectDocument(sharedId) {
  return (dispatch) => {
    _Entities.api.get(new _RequestParams.RequestParams({ sharedId })).then((entity) => {
      dispatch({ type: types.SELECT_SINGLE_DOCUMENT, doc: entity[0] });
    });
  };
}

function selectDocuments(docs) {
  return async (dispatch) => {
    await dispatch((0, _quickLabelActions.maybeSaveQuickLabels)());
    dispatch({ type: types.SELECT_DOCUMENTS, docs });
    dispatch((0, _quickLabelActions.selectedDocumentsChanged)());
  };
}

function unselectDocument(docId) {
  return async (dispatch) => {
    await dispatch((0, _quickLabelActions.maybeSaveQuickLabels)());
    dispatch({ type: types.UNSELECT_DOCUMENT, docId });
    dispatch((0, _quickLabelActions.selectedDocumentsChanged)());
  };
}

function selectSingleDocument(doc) {
  return async (dispatch) => {
    await dispatch((0, _quickLabelActions.maybeSaveQuickLabels)());
    dispatch({ type: types.SELECT_SINGLE_DOCUMENT, doc });
    dispatch((0, _quickLabelActions.selectedDocumentsChanged)());
  };
}

function unselectAllDocuments() {
  return async (dispatch) => {
    await dispatch((0, _quickLabelActions.maybeSaveQuickLabels)());
    dispatch({ type: types.UNSELECT_ALL_DOCUMENTS });
    dispatch((0, _quickLabelActions.selectedDocumentsChanged)());
  };
}

function updateSelectedEntities(entities) {
  return { type: types.UPDATE_SELECTED_ENTITIES, entities };
}

function showFilters() {
  return { type: types.SHOW_FILTERS };
}

function hideFilters() {
  return { type: types.HIDE_FILTERS };
}

function setDocuments(docs) {
  return { type: types.SET_DOCUMENTS, documents: docs };
}

function addDocuments(docs) {
  return { type: types.ADD_DOCUMENTS, documents: docs };
}

function unsetDocuments() {
  return { type: types.UNSET_DOCUMENTS };
}

function setTemplates(templates, thesauris) {
  return (dispatch) => {
    dispatch({ type: types.SET_LIBRARY_TEMPLATES, templates, thesauris });
  };
}

function setPreviewDoc(docId) {
  return { type: types.SET_PREVIEW_DOC, docId };
}

function setSuggestions(suggestions) {
  return { type: types.SET_SUGGESTIONS, suggestions };
}

function hideSuggestions() {
  return { type: types.HIDE_SUGGESTIONS };
}

function showSuggestions() {
  return { type: types.SHOW_SUGGESTIONS };
}

function setOverSuggestions(boolean) {
  return { type: types.OVER_SUGGESTIONS, hover: boolean };
}

function zoomIn() {
  return { type: types.ZOOM_IN };
}

function zoomOut() {
  return { type: types.ZOOM_OUT };
}

function filterIsEmpty(value) {
  if (value && value.values && !value.values.length) {
    return true;
  }

  if (Array.isArray(value) && !value.length) {
    return true;
  }

  if (typeof value === 'string' && !value) {
    return true;
  }

  if (typeof value === 'object') {
    const hasValue = Object.keys(value).reduce(
    (result, key) => result || Boolean(value[key]),
    false);

    return !hasValue;
  }

  return false;
}

function processFilters(readOnlySearch, filters, limit, from) {
  let search = _objectSpread({
    filters: {} },
  readOnlySearch);


  if (search.publishedStatus) {
    search = (0, _publishedStatusFilter.filterToQuery)(search);
  }

  search.filters = {};

  filters.properties.forEach((property) => {
    if (!filterIsEmpty(readOnlySearch.filters[property.name]) && !property.filters) {
      search.filters[property.name] = readOnlySearch.filters[property.name];
    }

    if (property.filters) {
      const searchFilter = _objectSpread({}, readOnlySearch.filters[property.name]);
      property.filters.forEach((filter) => {
        if (filterIsEmpty(searchFilter[filter.name])) {
          delete searchFilter[filter.name];
        }
      });

      if (Object.keys(searchFilter).length) {
        search.filters[property.name] = searchFilter;
      }
    }
  });

  search.types = filters.documentTypes;
  search.limit = limit;
  search.from = from;
  return search;
}

function encodeSearch(_search, appendQ = true) {
  const search = _objectSpread({}, _search);
  Object.keys(search).forEach((key) => {
    if (search[key] && search[key].length === 0) {
      delete search[key];
    }

    if (typeof search[key] === 'object' && Object.keys(search[key]).length === 0) {
      delete search[key];
    }

    if (search[key] === '') {
      delete search[key];
    }
  });

  if (search.searchTerm) {
    search.searchTerm = `${encodeURIComponent(search.searchTerm).replace(/%20/g, ' ')}:`;
  }

  const encodedSearch = _risonNode.default.encode(search).replace(/searchTerm:'([^:]+):'/, "searchTerm:'$1'");
  return appendQ ? `?q=${encodedSearch}` : encodedSearch;
}

function setSearchInUrl(searchParams) {
  const { pathname } = _reactRouter.browserHistory.getCurrentLocation();
  const path = `${pathname}/`.replace(/\/\//g, '/');
  const query = _reactRouter.browserHistory.getCurrentLocation().query || {};

  query.q = encodeSearch(searchParams, false);

  _reactRouter.browserHistory.push(path + (0, _JSONRequest.toUrlParams)(query));
}

function searchDocuments(
{ search = undefined, filters = undefined },
storeKey,
limit = 30,
from = 0)
{
  return (dispatch, getState) => {
    const state = getState()[storeKey];
    const currentSearch = search || state.search;
    let currentFilters = filters || state.filters;
    currentFilters = currentFilters.toJS ? currentFilters.toJS() : currentFilters;

    const searchParams = processFilters(currentSearch, currentFilters, limit, from);
    searchParams.searchTerm = state.search.searchTerm;

    const { query } = _reactRouter.browserHistory.getCurrentLocation();
    const currentSearchParams = _risonNode.default.decode(decodeURIComponent(query.q || '()'));

    if (searchParams.searchTerm && searchParams.searchTerm !== currentSearchParams.searchTerm) {
      searchParams.sort = '_score';
    }

    if (currentSearch.userSelectedSorting) {
      dispatch(_BasicReducer.actions.set(`${storeKey}.selectedSorting`, currentSearch));
    }

    searchParams.customFilters = currentSearch.customFilters;

    setSearchInUrl(searchParams);
  };
}

function elementCreated(doc) {
  return { type: types.ELEMENT_CREATED, doc };
}

function updateEntity(updatedDoc) {
  return { type: types.UPDATE_DOCUMENT, doc: updatedDoc };
}

function updateEntities(updatedDocs) {
  return { type: types.UPDATE_DOCUMENTS, docs: updatedDocs };
}

function searchSnippets(searchString, sharedId, storeKey) {
  const requestParams = new _RequestParams.RequestParams(
  _qs.default.stringify({
    filter: { sharedId, searchString },
    fields: ['snippets'] }));



  return (dispatch) =>
  _SearchAPI.default.searchSnippets(requestParams).then(({ data }) => {
    const snippets = data.length ? data[0].snippets : { total: 0, fullText: [], metadata: [] };
    dispatch(_BasicReducer.actions.set(`${storeKey}.sidepanel.snippets`, snippets));
    return snippets;
  });
}

function saveDocument(doc, formKey) {
  return async (dispatch) => {
    const updatedDoc = await _Documents.documentsApi.save(new _RequestParams.RequestParams(doc));
    dispatch(_Notifications.notificationActions.notify('Document updated', 'success'));
    dispatch(_reactReduxForm.actions.reset(formKey));
    dispatch(updateEntity(updatedDoc));
    dispatch(_BasicReducer.actions.updateIn('library.markers', ['rows'], updatedDoc));
    await dispatch(selectSingleDocument(updatedDoc));
  };
}

function multipleUpdate(entities, values) {
  return async (dispatch) => {
    const ids = entities.map((entity) => entity.get('sharedId')).toJS();
    const updatedDocs = await _Entities.api.multipleUpdate(new _RequestParams.RequestParams({ ids, values }));
    dispatch(_Notifications.notificationActions.notify('Update success', 'success'));
    dispatch(updateEntities(updatedDocs));
  };
}

function saveEntity(entity, formModel) {
  // eslint-disable-next-line max-statements
  return async (dispatch) => {
    const { entity: updatedDoc, errors } = await (0, _saveEntityWithFiles.saveEntityWithFiles)(entity, dispatch);
    let message = '';

    dispatch(_reactReduxForm.actions.reset(formModel));
    await dispatch(unselectAllDocuments());
    if (entity._id) {
      message = 'Entity updated';
      dispatch(updateEntity(updatedDoc));
      dispatch(_BasicReducer.actions.updateIn('library.markers', ['rows'], updatedDoc));
    } else {
      message = 'Entity created';
      dispatch(elementCreated(updatedDoc));
    }
    if (errors.length) {
      message = `${message} with the following errors: ${JSON.stringify(errors, null, 2)}`;
    }
    await dispatch(_Notifications.notificationActions.notify(message, errors.length ? 'warning' : 'success'));
    await dispatch(selectSingleDocument(updatedDoc));
  };
}

function removeDocument(doc) {
  return { type: types.REMOVE_DOCUMENT, doc };
}

function removeDocuments(docs) {
  return { type: types.REMOVE_DOCUMENTS, docs };
}

function deleteDocument(doc) {
  return async (dispatch) => {
    await _Documents.documentsApi.delete(new _RequestParams.RequestParams({ sharedId: doc.sharedId }));
    dispatch(_Notifications.notificationActions.notify('Document deleted', 'success'));
    await dispatch(unselectAllDocuments());
    dispatch(removeDocument(doc));
  };
}

function deleteEntity(entity) {
  return async (dispatch) => {
    await _Entities.api.delete(entity);
    dispatch(_Notifications.notificationActions.notify('Entity deleted', 'success'));
    await dispatch(unselectDocument(entity._id));
    dispatch(removeDocument(entity));
  };
}

function loadMoreDocuments(storeKey, amount, from) {
  return (dispatch, getState) => {
    const { search } = getState()[storeKey];
    searchDocuments({ search }, storeKey, amount, from)(dispatch, getState);
  };
}

function getSuggestions() {
  return { type: 'GET_SUGGESTIONS' };
}

function getDocumentReferences(sharedId, fileId, storeKey) {
  return (dispatch) =>
  _referencesAPI.default.
  get(new _RequestParams.RequestParams({ sharedId, file: fileId, onlyTextReferences: true })).
  then((references) => {
    dispatch(_BasicReducer.actions.set(`${storeKey}.sidepanel.references`, references));
  });
}

function getAggregationSuggestions(storeKey, property, searchTerm) {
  const state = _store.store.getState()[storeKey];
  const { search, filters } = state;

  const query = processFilters(search, filters.toJS(), 0);
  query.searchTerm = search.searchTerm;
  if (storeKey === 'uploads') {
    query.unpublished = true;
  }
  return _SearchAPI.default.getAggregationSuggestions(new _RequestParams.RequestParams({ query, property, searchTerm }));
}

function setTableViewColumns(columns) {
  return { type: types.SET_TABLE_VIEW_COLUMNS, columns };
}

function setTableViewColumnHidden(name, hidden) {
  return {
    type: types.SET_TABLE_VIEW_COLUMN_HIDDEN,
    name,
    hidden };

}

function setTableViewAllColumnsHidden(hidden) {
  return {
    type: types.SET_TABLE_VIEW_ALL_COLUMNS_HIDDEN,
    hidden };

}