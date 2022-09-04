"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.connectionsChanged = connectionsChanged;exports.deleteConnection = deleteConnection;exports.loadAllReferences = loadAllReferences;exports.loadMoreReferences = loadMoreReferences;exports.resetSearch = resetSearch;exports.search = search;exports.searchReferences = searchReferences;exports.setFilter = setFilter;exports.switchView = switchView;var _BasicReducer = require("../../BasicReducer");
var _reactReduxForm = require("react-redux-form");
var _Notifications = require("../../Notifications");
var _referencesAPI = _interopRequireDefault(require("../../Viewer/referencesAPI"));
var _immutable = require("immutable");
var _prioritySortingCriteria = _interopRequireDefault(require("../../utils/prioritySortingCriteria"));
var _RequestParams = require("../../utils/RequestParams");

var uiActions = _interopRequireWildcard(require("../../Entities/actions/uiActions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function search(requestParams) {
  const { sharedId, sort, filters } = requestParams.data;
  const searchTerm =
  requestParams.data.search && requestParams.data.search.searchTerm ?
  requestParams.data.search.searchTerm.value :
  '';

  let options = _objectSpread({ sharedId }, sort);
  if (filters) {
    options = _objectSpread(_objectSpread(_objectSpread({ sharedId }, sort), filters.toJS()), {}, { searchTerm });
  }
  return _referencesAPI.default.search(requestParams.onlyHeaders().add(options));
}

function searchReferences() {
  return async (dispatch, getState) => {
    const relationshipsList = getState().relationships.list;
    const results = await search(new _RequestParams.RequestParams(relationshipsList));
    dispatch(_BasicReducer.actions.set('relationships/list/searchResults', results));
    dispatch(uiActions.showTab('connections'));
  };
}

function connectionsChanged() {
  return (dispatch, getState) => {
    const relationshipsList = getState().relationships.list;
    const { sharedId } = relationshipsList;

    return _referencesAPI.default.
    getGroupedByConnection(new _RequestParams.RequestParams({ sharedId })).
    then((connectionsGroups) => {
      const filteredTemplates = connectionsGroups.reduce(
      (templateIds, group) => templateIds.concat(group.templates.map((t) => t._id.toString())),
      []);


      const sortOptions = _prioritySortingCriteria.default.get({
        currentCriteria: relationshipsList.sort,
        filteredTemplates,
        templates: getState().templates });

      return Promise.all([connectionsGroups, sortOptions]);
    }).
    then(([connectionsGroups, sort]) => {
      dispatch(_BasicReducer.actions.set('relationships/list/connectionsGroups', connectionsGroups));
      dispatch(_reactReduxForm.actions.merge('relationships/list.sort', sort));
      return searchReferences()(dispatch, getState);
    });
  };
}

function deleteConnection(connection) {
  return async (dispatch, getState) => {
    await _referencesAPI.default.delete(new _RequestParams.RequestParams({ _id: connection._id }));
    dispatch(_Notifications.notificationActions.notify('Connection deleted', 'success'));
    return connectionsChanged()(dispatch, getState);
  };
}

function loadAllReferences() {
  return async (dispatch, getState) => {
    const relationshipsList = getState().relationships.list;
    dispatch(
    _BasicReducer.actions.set('relationships/list/filters', relationshipsList.filters.set('limit', 9999)));

    return searchReferences()(dispatch, getState);
  };
}

function loadMoreReferences(limit) {
  return function (dispatch, getState) {
    const relationshipsList = getState().relationships.list;
    dispatch(
    _BasicReducer.actions.set('relationships/list/filters', relationshipsList.filters.set('limit', limit)));

    return searchReferences()(dispatch, getState);
  };
}

function setFilter(groupFilterValues) {
  return function (dispatch, getState) {
    const relationshipsList = getState().relationships.list;
    const currentFilter = relationshipsList.filters.get('filter') || (0, _immutable.fromJS)({});
    const newFilter = currentFilter.merge(groupFilterValues);
    dispatch(
    _BasicReducer.actions.set('relationships/list/filters', relationshipsList.filters.set('filter', newFilter)));

    return searchReferences()(dispatch, getState);
  };
}

function resetSearch() {
  return function (dispatch, getState) {
    dispatch(_reactReduxForm.actions.change('relationships/list/search.searchTerm', ''));
    dispatch(_BasicReducer.actions.set('relationships/list/filters', (0, _immutable.fromJS)({})));
    return searchReferences()(dispatch, getState);
  };
}

function switchView(type) {
  return function (dispatch, getState) {
    dispatch(_BasicReducer.actions.set('relationships/list/view', type));
    if (type === 'graph') {
      return loadAllReferences()(dispatch, getState);
    }
  };
}