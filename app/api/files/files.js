"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.files = void 0;var _entities = _interopRequireDefault(require("../entities"));
var _eventsbus = require("../eventsbus");
var _extensionHelper = require("./extensionHelper");
var _ocrRecords = require("../services/ocr/ocrRecords");
var _relationships = _interopRequireDefault(require("../relationships"));
var _search = require("../search");
var _fileSchema = require("../../shared/types/fileSchema");

var _FileCreatedEvent = require("./events/FileCreatedEvent");
var _FilesDeletedEvent = require("./events/FilesDeletedEvent");
var _FileUpdatedEvent = require("./events/FileUpdatedEvent");
var _filesModel = require("./filesModel");
var _storage = require("./storage");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const deduceMimeType = (_file) => {
  const file = _objectSpread({}, _file);
  if (file.url && !file._id) {
    const mimetype = (0, _extensionHelper.mimeTypeFromUrl)(file.url);
    file.mimetype = mimetype;
  }

  return file;
};

const files = {
  async save(_file, index = true) {
    const file = deduceMimeType(_file);

    const existingFile = file._id ? await _filesModel.filesModel.getById(file._id) : undefined;
    const savedFile = await _filesModel.filesModel.save(await (0, _fileSchema.validateFile)(file));
    if (index) {
      await _search.search.indexEntities({ sharedId: savedFile.entity }, '+fullText');
    }

    if (existingFile) {
      await _eventsbus.applicationEventsBus.emit(
      new _FileUpdatedEvent.FileUpdatedEvent({ before: existingFile, after: savedFile }));

    } else {
      await _eventsbus.applicationEventsBus.emit(new _FileCreatedEvent.FileCreatedEvent({ newFile: savedFile }));
    }

    return savedFile;
  },

  get: _filesModel.filesModel.get.bind(_filesModel.filesModel),

  async delete(query = {}) {
    const toDeleteFiles = await _filesModel.filesModel.get(query);
    await _filesModel.filesModel.delete(query);
    if (toDeleteFiles.length > 0) {
      await _relationships.default.delete({ file: { $in: toDeleteFiles.map((f) => {var _f$_id;return (_f$_id = f._id) === null || _f$_id === void 0 ? void 0 : _f$_id.toString();}) } });

      await Promise.all(
      toDeleteFiles.map(async ({ filename, type }) =>
      _storage.storage.removeFile(filename || '', type || 'document')));


      await _search.search.indexEntities(
      { sharedId: { $in: toDeleteFiles.map((f) => {var _f$entity;return (_f$entity = f.entity) === null || _f$entity === void 0 ? void 0 : _f$entity.toString();}) } },
      '+fullText');


      await _eventsbus.applicationEventsBus.emit(new _FilesDeletedEvent.FilesDeletedEvent({ files: toDeleteFiles }));
    }

    await (0, _ocrRecords.cleanupRecordsOfFiles)(toDeleteFiles.map((f) => f._id));

    return toDeleteFiles;
  },

  async tocReviewed(_id, language) {
    const savedFile = await files.save({ _id, generatedToc: false });
    const sameEntityFiles = await files.get({ entity: savedFile.entity }, { generatedToc: 1 });
    const [entity] = await _entities.default.get({
      sharedId: savedFile.entity });


    await _entities.default.save(
    {
      _id: entity._id,
      sharedId: entity.sharedId,
      template: entity.template,
      generatedToc: sameEntityFiles.reduce(
      (generated, file) => generated || Boolean(file.generatedToc),
      false) },


    { user: {}, language });


    return savedFile;
  } };exports.files = files;