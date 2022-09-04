"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.closeImportPanel = closeImportPanel;exports.closeImportProgress = closeImportProgress;exports.conversionComplete = conversionComplete;exports.createDocument = createDocument;exports.deleteCustomUpload = deleteCustomUpload;exports.documentProcessed = documentProcessed;exports.enterUploads = enterUploads;exports.importData = importData;exports.newEntity = newEntity;exports.publicSubmit = publicSubmit;exports.showImportPanel = showImportPanel;exports.upload = upload;exports.uploadCustom = uploadCustom;exports.uploadDocument = uploadDocument;var _superagent = _interopRequireDefault(require("superagent"));

var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _libraryActions = require("../../Library/actions/libraryActions");
var metadata = _interopRequireWildcard(require("../../Metadata"));
var types = _interopRequireWildcard(require("./actionTypes"));
var libraryTypes = _interopRequireWildcard(require("../../Library/actions/actionTypes"));
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var _RequestParams = require("../../utils/RequestParams");

var _config = require("../../config.js");
var _api = _interopRequireDefault(require("../../utils/api"));
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function enterUploads() {
  return {
    type: types.ENTER_UPLOADS_SECTION };

}

function showImportPanel() {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('showImportPanel', true));
  };
}

function closeImportPanel() {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('showImportPanel', false));
  };
}

function closeImportProgress() {
  return (dispatch) => {
    dispatch(_BasicReducer.actions.set('importProgress', 0));
    dispatch(_BasicReducer.actions.set('importStart', false));
    dispatch(_BasicReducer.actions.set('importEnd', false));
    dispatch(_BasicReducer.actions.set('importError', {}));
  };
}

function newEntity(storeKey = 'uploads') {
  return async (dispatch, getState) => {
    const newEntityMetadata = { title: '', type: 'entity' };
    dispatch(
    metadata.actions.loadInReduxForm(
    `${storeKey}.sidepanel.metadata`,
    newEntityMetadata,
    getState().templates.toJS()));


    await dispatch((0, _libraryActions.selectSingleDocument)(newEntityMetadata));
  };
}

function createDocument(newDoc) {
  return (dispatch) =>
  _api.default.post('documents', new _RequestParams.RequestParams(newDoc)).then((response) => {
    const doc = response.json;
    dispatch({ type: types.NEW_UPLOAD_DOCUMENT, doc: doc.sharedId });
    dispatch({ type: types.ELEMENT_CREATED, doc });
    return doc;
  });
}

function importData([file], template) {
  return (dispatch) =>
  new Promise((resolve) => {
    _superagent.default.
    post(`${_config.APIURL}import`).
    set('Accept', 'application/json').
    set('X-Requested-With', 'XMLHttpRequest').
    field('template', template).
    attach('file', file, file.name).
    on('progress', (data) => {
      dispatch(_BasicReducer.actions.set('importUploadProgress', Math.floor(data.percent)));
    }).
    on('response', (response) => {
      dispatch(_BasicReducer.actions.set('importUploadProgress', 0));
      resolve(response);
    }).
    end();
  });
}

function upload(docId, file, endpoint = 'files/upload/document') {
  return async (dispatch) =>
  new Promise((resolve) => {
    _superagent.default.
    post(_config.APIURL + endpoint).
    set('Accept', 'application/json').
    set('X-Requested-With', 'XMLHttpRequest').
    field('entity', docId).
    field('originalname', file.name).
    attach('file', file).
    on('progress', (data) => {
      dispatch({
        type: types.UPLOAD_PROGRESS,
        doc: docId,
        progress: Math.floor(data.percent) });

    }).
    on('response', (response) => {
      dispatch({ type: types.UPLOAD_COMPLETE, doc: docId, file: response.body });
      resolve(JSON.parse(response.text));
    }).
    end();
  });
}

function publicSubmit(data, remote = false) {
  return (dispatch) =>
  new Promise((resolve) => {
    const request = _superagent.default.
    post(remote ? `${_config.APIURL}remotepublic` : `${_config.APIURL}public`).
    set('Accept', 'application/json').
    set('X-Requested-With', 'XMLHttpRequest').
    field('captcha', JSON.stringify(data.captcha));

    if (data.file) {
      request.attach('file', data.file);
    }

    if (data.attachments) {
      data.attachments.forEach((attachment, index) => {
        request.attach(`attachments[${index}]`, attachment);
        request.field(`attachments_originalname[${index}]`, attachment.name);
      });
    }
    request.field(
    'entity',
    JSON.stringify({ title: data.title, template: data.template, metadata: data.metadata }));

    let completionResolve;
    let completionReject;
    const uploadCompletePromise = new Promise((_resolve, _reject) => {
      completionResolve = _resolve;
      completionReject = _reject;
    });
    request.
    on('progress', () => {
      resolve({ promise: uploadCompletePromise });
    }).
    on('response', (response) => {
      if (response.status === 200) {
        dispatch(_Notifications.notificationActions.notify('Success', 'success'));
        completionResolve(response);
        return;
      }
      if (response.status === 403) {
        dispatch(_Notifications.notificationActions.notify(response.body.error, 'danger'));
        completionReject(response);
        return;
      }
      completionReject(response);
      dispatch(_Notifications.notificationActions.notify('An error has ocurred', 'danger'));
    }).
    end();
  });
}

function uploadCustom(file) {
  return (dispatch) => {
    const id = `customUpload_${(0, _uniqueID.default)()}`;
    return upload(
    id,
    file,
    'files/upload/custom')(
    dispatch).then((response) => {
      dispatch(_BasicReducer.actions.push('customUploads', response));
    });
  };
}

function deleteCustomUpload(_id) {
  return (dispatch) =>
  _api.default.delete('files', new _RequestParams.RequestParams({ _id })).then((response) => {
    dispatch(_BasicReducer.actions.remove('customUploads', response.json[0]));
  });
}

function uploadDocument(docId, file) {
  return async (dispatch) => upload(docId, file)(dispatch);
}

function documentProcessed(sharedId, __reducerKey) {
  return (dispatch) => {
    _EntitiesAPI.default.get(new _RequestParams.RequestParams({ sharedId })).then(([doc]) => {
      dispatch({ type: types.UPLOAD_PROGRESS, doc: sharedId, progress: 100 });
      dispatch({ type: libraryTypes.UPDATE_DOCUMENT, doc, __reducerKey });
      dispatch({ type: libraryTypes.UNSELECT_ALL_DOCUMENTS, __reducerKey });
      dispatch({ type: libraryTypes.SELECT_DOCUMENT, doc, __reducerKey });
      dispatch({
        type: types.UPLOADS_COMPLETE,
        doc: sharedId,
        files: doc.documents,
        __reducerKey: 'library' });

      dispatch(_BasicReducer.actions.update('entityView/entity', doc));
      dispatch(_BasicReducer.actions.update('viewer/doc', doc));
      dispatch({ type: types.BATCH_UPLOAD_COMPLETE, doc: sharedId });
    });
  };
}

function conversionComplete(docId) {
  return {
    type: types.CONVERSION_COMPLETE,
    doc: docId };

}