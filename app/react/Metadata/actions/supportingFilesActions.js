"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.uploadLocalAttachmentFromUrl = exports.uploadLocalAttachment = exports.attachmentCompleted = void 0;
var _reactReduxForm = require("react-redux-form");
var _saveEntityWithFiles = require("../../Library/actions/saveEntityWithFiles");
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var types = _interopRequireWildcard(require("../../Attachments/actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const uploadLocalAttachment =
(
entitySharedId,
file,
storeKeys,
fileLocalID) =>

async (dispatch) =>
(0, _saveEntityWithFiles.readFileAsBase64)(file, (info) => {
  const newFile = {
    originalname: file.name,
    filename: file.name,
    serializedFile: info,
    type: 'attachment',
    mimetype: file.type,
    entity: entitySharedId,
    fileLocalID: fileLocalID || (0, _uniqueID.default)() };

  dispatch(_reactReduxForm.actions.push(`${storeKeys.model}.attachments`, newFile));
  dispatch({ type: types.ATTACHMENT_PROGRESS, entity: entitySharedId, progress: 100 });
});exports.uploadLocalAttachment = uploadLocalAttachment;

const uploadLocalAttachmentFromUrl =
(
entitySharedId,
formData,
storeKeys) =>

(dispatch) => {
  const { name, url } = formData;
  const newUrl = {
    originalname: name,
    url,
    entity: entitySharedId };

  dispatch(_reactReduxForm.actions.push(`${storeKeys.model}.attachments`, newUrl));
  dispatch({ type: types.ATTACHMENT_PROGRESS, entity: entitySharedId, progress: 100 });
};exports.uploadLocalAttachmentFromUrl = uploadLocalAttachmentFromUrl;

const attachmentCompleted = (entitySharedId) => (dispatch) => {
  dispatch({ type: types.ATTACHMENT_LOCAL_COMPLETE, entity: entitySharedId });
};exports.attachmentCompleted = attachmentCompleted;