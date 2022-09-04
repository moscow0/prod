"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteAttachment = deleteAttachment;exports.deleteFile = deleteFile;exports.loadForm = loadForm;exports.renameAttachment = renameAttachment;exports.resetForm = resetForm;exports.submitForm = submitForm;exports.updateFile = updateFile;exports.uploadAttachment = uploadAttachment;exports.uploadAttachmentFromUrl = uploadAttachmentFromUrl;var _reactReduxForm = require("react-redux-form");
var _superagent = _interopRequireDefault(require("superagent"));

var _config = require("../../config.js");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _libraryActions = require("../../Library/actions/libraryActions");
var _api = _interopRequireDefault(require("../../utils/api"));
var _RequestParams = require("../../utils/RequestParams");
var _BasicReducer = require("../../BasicReducer");

var types = _interopRequireWildcard(require("./actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function updateFile(file, entity) {
  return async (dispatch) => {
    await _api.default.post('files', new _RequestParams.RequestParams(file));
    const documents = entity.documents.map((f) => {
      if (f._id === file._id) {
        return file;
      }
      return f;
    });
    const updatedEntity = Object.assign(entity, { documents });
    dispatch(_BasicReducer.actions.set('viewer/doc', updatedEntity));
    dispatch((0, _libraryActions.updateEntity)(updatedEntity));
    await dispatch((0, _libraryActions.selectSingleDocument)(updatedEntity));
    dispatch((0, _notificationsActions.notify)('File updated', 'success'));
  };
}

function deleteFile(file, entity) {
  return async (dispatch) => {
    await _api.default.delete('files', new _RequestParams.RequestParams({ _id: file._id }));
    const documents = entity.documents.filter((f) => f._id !== file._id);

    const updatedEntity = Object.assign(entity, { documents });
    dispatch(_BasicReducer.actions.set('viewer/doc', updatedEntity));
    dispatch((0, _libraryActions.updateEntity)(updatedEntity));
    await dispatch((0, _libraryActions.selectSingleDocument)(updatedEntity));
    dispatch((0, _notificationsActions.notify)('File deleted', 'success'));
  };
}

function uploadAttachment(entity, file, storeKeys) {
  return async (dispatch) => {
    dispatch({ type: types.START_UPLOAD_ATTACHMENT, entity });
    _superagent.default.
    post(`${_config.APIURL}files/upload/attachment`).
    set('Accept', 'application/json').
    set('X-Requested-With', 'XMLHttpRequest').
    field('entity', entity).
    field('originalname', file.name).
    attach('file', file).
    on('progress', (data) => {
      dispatch({ type: types.ATTACHMENT_PROGRESS, entity, progress: Math.floor(data.percent) });
    }).
    on('response', (result) => {
      dispatch({ type: types.ATTACHMENT_PROGRESS, entity, progress: 100 });
      dispatch({
        type: types.ATTACHMENT_COMPLETE,
        entity,
        file: JSON.parse(result.text),
        __reducerKey: storeKeys.__reducerKey });

      dispatch((0, _notificationsActions.notify)('Attachment uploaded', 'success'));
    }).
    end();
  };
}

function uploadAttachmentFromUrl(entity, formData, storeKeys) {
  const { name, url } = formData;
  return (dispatch) => {
    dispatch({ type: types.START_UPLOAD_ATTACHMENT, entity });
    _api.default.
    post('files', new _RequestParams.RequestParams({ originalname: name, url, entity, type: 'attachment' })).
    then((newFile) => {
      dispatch({ type: types.ATTACHMENT_PROGRESS, entity, progress: 100 });
      dispatch({
        type: types.ATTACHMENT_COMPLETE,
        entity,
        file: newFile.json,
        __reducerKey: storeKeys.__reducerKey });

      dispatch((0, _notificationsActions.notify)('Attachment uploaded', 'success'));
    });
  };
}

function renameAttachment(entityId, form, __reducerKey, file) {
  return (dispatch) =>
  _api.default.
  post(
  'files',
  new _RequestParams.RequestParams({
    _id: file._id,
    originalname: file.originalname })).


  then((renamedFile) => {
    dispatch({
      type: types.ATTACHMENT_RENAMED,
      entity: entityId,
      file: renamedFile.json,
      __reducerKey });

    dispatch(_reactReduxForm.actions.reset(form));
    dispatch((0, _notificationsActions.notify)('Attachment renamed', 'success'));
  });
}

function deleteAttachment(entitySharedId, attachment, __reducerKey) {
  return async (dispatch) => {
    await _api.default.delete(
    'files',
    new _RequestParams.RequestParams({
      _id: attachment._id }));


    dispatch({
      type: types.ATTACHMENT_DELETED,
      entity: entitySharedId,
      file: attachment,
      __reducerKey });


    dispatch((0, _notificationsActions.notify)('Attachment deleted', 'success'));
  };
}

function loadForm(form, attachment) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.reset(form));
    dispatch(_reactReduxForm.actions.load(form, attachment));
  };
}

function submitForm(form) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.submit(form));
  };
}

function resetForm(form) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.reset(form));
  };
}