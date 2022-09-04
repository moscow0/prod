"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addToToc = addToToc;exports.cancelTargetDocument = cancelTargetDocument;exports.deleteDocument = deleteDocument;exports.editToc = editToc;exports.getDocument = getDocument;exports.indentTocElement = indentTocElement;exports.leaveEditMode = leaveEditMode;exports.loadDefaultViewerMenu = loadDefaultViewerMenu;exports.loadTargetDocument = loadTargetDocument;exports.reloadDocument = reloadDocument;exports.removeFromToc = removeFromToc;exports.resetDocumentViewer = resetDocumentViewer;exports.saveDocument = saveDocument;exports.saveToc = saveToc;exports.setDocument = setDocument;var _lodash = require("lodash");
var _api = _interopRequireDefault(require("../../utils/api"));
var _referencesAPI = _interopRequireDefault(require("../referencesAPI"));
var types = _interopRequireWildcard(require("./actionTypes"));
var connectionsTypes = _interopRequireWildcard(require("../../Connections/actions/actionTypes"));
var _entityDefaultDocument = require("../../../shared/entityDefaultDocument");

var _BasicReducer = require("../../BasicReducer");
var _reactReduxForm = require("react-redux-form");
var _Documents = require("../../Documents");
var _Notifications = require("../../Notifications");
var _libraryActions = require("../../Library/actions/libraryActions");
var _Relationships = require("../../Relationships");
var _RequestParams = require("../../utils/RequestParams");
var _saveEntityWithFiles = require("../../Library/actions/saveEntityWithFiles");
var selectionActions = _interopRequireWildcard(require("./selectionActions"));
var uiActions = _interopRequireWildcard(require("./uiActions"));
var _sortTextSelections = require("../utils/sortTextSelections");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function getEntityDoc(entity, filename, defaultLanguage) {
  let docByFilename = entity.documents.find((d) => d.filename === filename);
  docByFilename = docByFilename !== undefined ? docByFilename : {};

  const defaultDoc = (0, _entityDefaultDocument.entityDefaultDocument)(entity.documents, entity.language, defaultLanguage);

  return filename ? docByFilename : defaultDoc;
}

const dispatchUpdatedDocument = (dispatch, doc, updatedDoc, entityFileId) => {
  dispatch(_Notifications.notificationActions.notify('Document updated', 'success'));
  dispatch({ type: types.VIEWER_UPDATE_DOCUMENT, doc });
  dispatch(_reactReduxForm.actions.reset('documentViewer.sidepanel.metadata'));
  const defaultDoc = updatedDoc.entity.documents.find((document) => document._id === entityFileId);
  dispatch(_BasicReducer.actions.update('viewer/doc', _objectSpread(_objectSpread({}, updatedDoc.entity), {}, { defaultDoc })));
  dispatch(_Relationships.actions.reloadRelationships(updatedDoc.entity.sharedId));
};

function setDocument(document, html) {
  return {
    type: types.SET_DOCUMENT,
    document,
    html };

}

function resetDocumentViewer() {
  return {
    type: types.RESET_DOCUMENT_VIEWER };

}

function loadDefaultViewerMenu() {
  return {
    type: types.LOAD_DEFAULT_VIEWER_MENU };

}
function saveDocument(doc, fileID) {
  const updateDoc = (0, _lodash.omit)(doc, 'fullText', 'defaultDoc');
  return async (dispatch, getState) => {
    const extractredMetadata = getState().documentViewer.metadataExtraction.toJS();
    const entityFileId = fileID || getState().documentViewer.doc.toJS().defaultDoc._id;
    updateDoc.__extractedMetadata = _objectSpread({ fileID: entityFileId }, extractredMetadata);
    const updatedDoc = await (0, _saveEntityWithFiles.saveEntityWithFiles)(updateDoc, dispatch);

    dispatchUpdatedDocument(dispatch, doc, updatedDoc, entityFileId);
    return updateDoc;
  };
}

function saveToc(toc, fileId) {
  return async (dispatch, getState) => {
    const currentDoc = getState().documentViewer.doc.toJS();
    dispatch(_reactReduxForm.actions.reset('documentViewer.sidepanel.metadata'));
    dispatch(_BasicReducer.actions.set('documentViewer/tocBeingEdited', false));

    const updatedFile = (await _api.default.post('files', new _RequestParams.RequestParams({ toc, _id: fileId }))).json;
    const doc = _objectSpread(_objectSpread({},
    currentDoc), {}, {
      defaultDoc: updatedFile,
      documents: currentDoc.documents.map((d) => {
        if (d._id === updatedFile._id) {
          return updatedFile;
        }
        return d;
      }) });


    dispatch(_Notifications.notificationActions.notify('Document updated', 'success'));
    dispatch({ type: types.VIEWER_UPDATE_DOCUMENT, doc });
    dispatch(_reactReduxForm.actions.reset('documentViewer.sidepanel.metadata'));
    dispatch(_BasicReducer.actions.set('viewer/doc', doc));
  };
}

function deleteDocument(doc) {
  return async (dispatch) => {
    await _Documents.documentsApi.delete(new _RequestParams.RequestParams({ sharedId: doc.sharedId }));
    dispatch(_Notifications.notificationActions.notify('Document deleted', 'success'));
    dispatch(resetDocumentViewer());
    dispatch((0, _libraryActions.removeDocument)(doc));
    await dispatch((0, _libraryActions.unselectAllDocuments)());
  };
}

async function getDocument(requestParams, defaultLanguage, filename) {
  const [entity] = await _EntitiesAPI.default.get(requestParams.add({ omitRelationships: true }));

  entity.defaultDoc = getEntityDoc(entity, filename, defaultLanguage);
  return entity;
}

function loadTargetDocument(sharedId) {
  return (dispatch, getState) =>
  getDocument(new _RequestParams.RequestParams({ sharedId }), getState().locale).then((entity) => {
    dispatch(_BasicReducer.actions.set('viewer/targetDoc', entity));
    return _referencesAPI.default.
    get(new _RequestParams.RequestParams({ sharedId, file: entity.defaultDoc._id, onlyTextReferences: true })).
    then((references) => {
      dispatch(_BasicReducer.actions.set('viewer/targetDocReferences', references));
    });
  });
}

function reloadDocument(sharedId) {
  return (dispatch, getState) =>
  Promise.all([
  getDocument(new _RequestParams.RequestParams({ sharedId }), getState().locale),
  _referencesAPI.default.get(new _RequestParams.RequestParams({ sharedId }))]).
  then(([targetDoc, references]) => {
    dispatch(_BasicReducer.actions.set('viewer/doc', targetDoc));
    dispatch(_BasicReducer.actions.set('viewer/references', references));
  });
}

function cancelTargetDocument() {
  return (dispatch) => {
    dispatch({ type: connectionsTypes.CANCEL_RANGED_CONNECTION });
    dispatch(_BasicReducer.actions.unset('viewer/targetDoc'));
    dispatch(_BasicReducer.actions.unset('viewer/targetDocReferences'));
    dispatch(selectionActions.unsetTargetSelection());
    dispatch(uiActions.openPanel('viewMetadataPanel'));
  };
}

function editToc(toc) {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('documentViewer/tocBeingEdited', true));
    dispatch(_reactReduxForm.actions.load('documentViewer.tocForm', toc));
    dispatch(uiActions.openPanel('viewMetadataPanel'));
    dispatch(_BasicReducer.actions.set('viewer.sidepanel.tab', 'toc'));
  };
}

function leaveEditMode() {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('documentViewer/tocBeingEdited', false));
    dispatch(_reactReduxForm.actions.reset('documentViewer.sidepanel.metadata'));
  };
}

function removeFromToc(tocElement) {
  return (dispatch, getState) => {
    const state = getState();
    let toc = state.documentViewer.tocForm;

    toc = toc.filter((entry) => entry !== tocElement);

    dispatch(_reactReduxForm.actions.load('documentViewer.tocForm', toc));
  };
}

function indentTocElement(tocElement, indentation) {
  return (dispatch, getState) => {
    const state = getState();
    const toc = state.documentViewer.tocForm.map((entry) => _objectSpread(_objectSpread({},
    entry),
    entry === tocElement ? { indentation } : {}));


    dispatch(_reactReduxForm.actions.load('documentViewer.tocForm', toc));
  };
}

function addToToc(textSelectedObject, currentToc) {
  return (dispatch, getState) => {
    const state = getState();
    let toc = state.documentViewer.tocForm.concat();
    if (!toc.length) {
      toc = currentToc;
    }
    const tocElement = {
      selectionRectangles: textSelectedObject.sourceRange.selectionRectangles,
      label: textSelectedObject.sourceRange.text,
      indentation: 0 };


    toc.push(tocElement);
    toc = toc.sort(_sortTextSelections.sortTextSelections);
    dispatch(editToc(toc));
  };
}