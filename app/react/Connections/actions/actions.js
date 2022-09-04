"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.immediateSearch = immediateSearch;exports.saveConnection = saveConnection;exports.search = search;exports.selectRangedTarget = selectRangedTarget;exports.setRelationType = setRelationType;exports.setTargetDocument = setTargetDocument;exports.startNewConnection = startNewConnection;var _qs = _interopRequireDefault(require("qs"));
var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _api = _interopRequireDefault(require("../../utils/api"));
var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _RequestParams = require("../../utils/RequestParams");

var types = _interopRequireWildcard(require("./actionTypes"));
var uiActions = _interopRequireWildcard(require("./uiActions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function immediateSearch(dispatch, searchString, connectionType) {
  dispatch(uiActions.searching());

  const requestParams = new _RequestParams.RequestParams(
  _qs.default.stringify({
    filter: { searchString: searchString ? `title:(${searchString})` : undefined },
    fields: ['title', 'template', 'sharedId', 'documents._id'] }));



  return _api.default.get('v2/entities', requestParams).then(({ json: { data } }) => {
    let results = data;
    if (connectionType === 'targetRanged') {
      results = results.filter((r) => r.documents && r.documents.length);
    }
    dispatch(_BasicReducer.actions.set('connections/searchResults', results));
  });
}

const debouncedSearch = (0, _debounce.default)(immediateSearch, 400);

function search(searchTerm, connectionType) {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('connections/searchTerm', searchTerm));
    return debouncedSearch(dispatch, searchTerm, connectionType);
  };
}

function startNewConnection(connectionType, sourceDocument) {
  return (dispatch) =>
  immediateSearch(dispatch, '', connectionType).then(() => {
    dispatch(_BasicReducer.actions.set('connections/searchTerm', ''));
    dispatch(uiActions.openPanel(connectionType, sourceDocument));
  });
}

function setRelationType(template) {
  return {
    type: types.SET_RELATION_TYPE,
    template };

}

function setTargetDocument(id) {
  return {
    type: types.SET_TARGET_DOCUMENT,
    id };

}

function saveConnection(connection, callback = () => {}) {
  return (dispatch, getState) => {
    dispatch({ type: types.CREATING_CONNECTION });
    if (connection.type !== 'basic') {
      connection.language = getState().locale;
    }

    delete connection.type;

    const sourceRelationship = {
      entity: connection.sourceDocument,
      template: null,
      reference: connection.sourceRange,
      file: connection.sourceFile };


    const targetRelationship = { entity: connection.targetDocument, template: connection.template };
    if (connection.targetRange) {
      Object.assign(targetRelationship, {
        reference: connection.targetRange,
        file: connection.targetFile });

    }

    const apiCall = {
      delete: [],
      save: [[sourceRelationship, targetRelationship]] };


    return _api.default.post('relationships/bulk', new _RequestParams.RequestParams(apiCall)).then((response) => {
      dispatch({ type: types.CONNECTION_CREATED });
      callback(response.json);
      dispatch(_Notifications.notificationActions.notify('saved successfully !', 'success'));
    });
  };
}

function selectRangedTarget(connection, onRangedConnect) {
  return (dispatch) => {
    dispatch({ type: types.CREATING_RANGED_CONNECTION });
    onRangedConnect(connection.targetDocument);
  };
}