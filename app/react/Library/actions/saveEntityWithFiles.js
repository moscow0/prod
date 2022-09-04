"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveEntityWithFiles = exports.readFileAsBase64 = void 0;var _superagent = _interopRequireDefault(require("superagent"));

var _lodash = require("lodash");

var attachmentsTypes = _interopRequireWildcard(require("../../Attachments/actions/actionTypes"));
var uploadsActionTypes = _interopRequireWildcard(require("../../Uploads/actions/actionTypes"));
var _tsUtils = require("../../../shared/tsUtils");
var _fileUploadUtils = require("../../../shared/fileUploadUtils");const _excluded = ["serializedFile"];function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const readFileAsBase64 = async (file, cb) =>
new Promise((resolve) => {
  const reader = new FileReader();

  reader.onload = (base64) => {
    const info = (0, _tsUtils.ensure)(base64.target.result);
    cb(info);
    resolve();
  };
  reader.readAsDataURL(file);
});exports.readFileAsBase64 = readFileAsBase64;

const saveEntityWithFiles = async (entity, dispatch) => {
  const [attachments, supportingFiles] = entity.attachments ?
  entity.attachments.reduce(
  (accumulator, attachmentInfo) => {
    const { serializedFile } = attachmentInfo,attachment = _objectWithoutProperties(attachmentInfo, _excluded);
    accumulator[0].push(attachment);
    if (serializedFile) {
      accumulator[1].push((0, _fileUploadUtils.constructFile)(attachmentInfo));
    }
    return accumulator;
  },
  [[], []]) :

  [[], []];

  const { oldDocuments = [], newDocuments = [] } = (0, _lodash.groupBy)(entity.documents || [], (document) =>
  document._id !== undefined ? 'oldDocuments' : 'newDocuments');

  const entityToSave = _objectSpread(_objectSpread({}, entity), {}, { documents: oldDocuments });

  const addedDocuments = await Promise.all(
  newDocuments.map(async (file) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    const blob = await fetch(file.data).then(async (r) => r.blob());
    const newDocument = new File([blob], file.originalFile.name, { type: blob.type });
    URL.revokeObjectURL(file.data);
    return newDocument;
  }));


  return new Promise((resolve, reject) => {
    const request = _superagent.default.
    post('/api/entities').
    set('Accept', 'application/json').
    set('X-Requested-With', 'XMLHttpRequest').
    field(
    'entity',
    JSON.stringify(_objectSpread(_objectSpread({},
    entityToSave),
    attachments.length > 0 && { attachments })));



    if (dispatch) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      request.on('progress', (data) => {
        dispatch({
          type: attachmentsTypes.ATTACHMENT_PROGRESS,
          entity: entity.sharedId || 'NEW_ENTITY',
          progress: data.percent ? Math.floor(data.percent) : data.percent });

      });
    }

    supportingFiles.forEach((file, index) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      request.attach(`attachments[${index}]`, file);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      request.field(`attachments_originalname[${index}]`, file.name);
    });

    addedDocuments.forEach((file, index) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      request.attach(`documents[${index}]`, file);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      request.field(`documents_originalname[${index}]`, file.name);
    });

    request.end((err, res) => {
      if (err) return reject(err);

      if (dispatch && addedDocuments.length) {
        dispatch({
          type: uploadsActionTypes.NEW_UPLOAD_DOCUMENT,
          doc: res.body.entity.sharedId });

      }
      resolve(res.body);
    });
  });
};exports.saveEntityWithFiles = saveEntityWithFiles;