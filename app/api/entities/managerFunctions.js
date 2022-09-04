"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveFiles = exports.processFiles = exports.handleAttachmentInMetadataProperties = void 0;var _lodash = require("lodash");

var _files = require("../files");
var _processDocument = require("../files/processDocument");
var _search = require("../search");
var _log = require("../log");
var _handleError = require("../utils/handleError");




var _fileSchema = require("../../shared/types/fileSchema");


var _fs = require("fs");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const prepareNewFiles = async (
entity,
updatedEntity,
newAttachments = [],
newDocuments = []) =>
{var _entity$attachments;
  const attachments = [];
  const documents = [];

  const newUrls = (_entity$attachments = entity.attachments) === null || _entity$attachments === void 0 ? void 0 : _entity$attachments.filter((attachment) => !attachment._id && attachment.url);

  if (newAttachments.length) {
    await Promise.all(
    newAttachments.map(async (file) => {
      await _files.storage.storeFile(file.filename, (0, _fs.createReadStream)(file.path), 'attachment');
      attachments.push(_objectSpread(_objectSpread({},
      file), {}, {
        entity: updatedEntity.sharedId,
        type: _fileSchema.TypeOfFile.attachment }));

    }));

  }

  if (newDocuments.length) {
    await Promise.all(
    newDocuments.map(async (doc) => {
      await _files.storage.storeFile(doc.filename, (0, _fs.createReadStream)(doc.path), 'document');
      documents.push(_objectSpread(_objectSpread({},
      doc), {}, {
        entity: updatedEntity.sharedId,
        type: _fileSchema.TypeOfFile.document }));

    }));

  }

  if (newUrls && newUrls.length) {
    newUrls.map(async (url) => {
      attachments.push(_objectSpread(_objectSpread({},
      url), {}, {
        entity: updatedEntity.sharedId,
        type: _fileSchema.TypeOfFile.attachment }));

    });
  }

  return { attachments, documents };
};

const updateDeletedFiles = async (
entityFiles,
entity,
type) =>
{
  const deletedFiles = entityFiles.filter(
  (existingFile) => {var _entity;return (
      existingFile._id &&
      existingFile.type === type &&
      !((_entity = entity[type === _fileSchema.TypeOfFile.attachment ? 'attachments' : 'documents']) !== null && _entity !== void 0 && _entity.find(
      (attachment) => {var _attachment$_id;return ((_attachment$_id = attachment._id) === null || _attachment$_id === void 0 ? void 0 : _attachment$_id.toString()) === existingFile._id.toString();})));});


  const fileIdList = deletedFiles.map((file) => file._id.toString());
  const fileNameList = fileIdList.map((fileId) => `${fileId}.jpg`);
  await _files.files.delete({
    $or: [{ _id: { $in: fileIdList } }, { filename: { $in: fileNameList } }] });

};

const filterRenamedFiles = (entity, entityFiles) => {
  const process = (files) =>
  files.
  filter(
  (file) =>
  file._id &&
  entityFiles.find(
  (entityFile) => {var _file$_id;return (
      ((_file$_id = file._id) === null || _file$_id === void 0 ? void 0 : _file$_id.toString()) === entityFile._id.toString() &&
      file.originalname !== entityFile.originalname);})).


  map((file) => ({
    _id: file._id.toString(),
    originalname: file.originalname }));


  const renamedAttachments = entity.attachments ? process(entity.attachments) : [];

  const renamedDocuments = entity.documents ? process(entity.documents) : [];

  return { renamedAttachments, renamedDocuments };
};

const processFiles = async (
entity,
updatedEntity,
fileAttachments,
documentAttachments) =>
{
  const { attachments, documents } = await prepareNewFiles(
  entity,
  updatedEntity,
  fileAttachments,
  documentAttachments);


  if (entity._id && (entity.attachments || entity.documents)) {
    const entityFiles = await _files.files.get(
    { entity: entity.sharedId, type: { $in: [_fileSchema.TypeOfFile.attachment, _fileSchema.TypeOfFile.document] } },
    '_id, originalname, type');


    await updateDeletedFiles(entityFiles, entity, _fileSchema.TypeOfFile.attachment);
    await updateDeletedFiles(entityFiles, entity, _fileSchema.TypeOfFile.document);

    const { renamedAttachments, renamedDocuments } = filterRenamedFiles(entity, entityFiles);

    attachments.push(...renamedAttachments);
    documents.push(...renamedDocuments);
  }

  return { proccessedAttachments: attachments, proccessedDocuments: documents };
};exports.processFiles = processFiles;

const bindAttachmentToMetadataProperty = (
_values,
attachments) =>
{
  const values = _values;
  if (_values[0].attachment !== undefined) {
    values[0].value = attachments[_values[0].attachment] ?
    `/api/files/${attachments[_values[0].attachment].filename}` :
    '';
  }
  return values;
};

const handleAttachmentInMetadataProperties = (
entity,
attachments) =>
{
  Object.entries(entity.metadata || {}).forEach(([_property, _values]) => {
    if (_values && _values.length) {
      const values = bindAttachmentToMetadataProperty(_values, attachments);
      delete values[0].attachment;
    }
  });

  return entity;
};exports.handleAttachmentInMetadataProperties = handleAttachmentInMetadataProperties;

const saveFiles = async (
attachments,
documents,
entity,
socketEmiter) =>
{
  const saveResults = [];

  const { documentsToProcess = [], documentsToSave = [] } = (0, _lodash.groupBy)(documents, (document) =>
  document._id ? 'documentsToSave' : 'documentsToProcess');


  const filesToSave = [...attachments, ...documentsToSave];

  await Promise.all(
  filesToSave.map(async (file) => {
    try {
      await _files.files.save(file, false);
    } catch (e) {
      _log.errorLog.error((0, _handleError.prettifyError)(e));
      saveResults.push(`Could not save file/s: ${file.originalname}`);
    }
  }));


  if (documentsToProcess.length) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Promise.allSettled(
    documentsToProcess.map(async (document) => (0, _processDocument.processDocument)(entity.sharedId, document))).
    then((results) => {
      results.
      filter((result) => result.status === 'rejected').
      map((rejected) => {
        const { reason } = rejected;
        return _log.errorLog.error((0, _handleError.prettifyError)(reason));
      });

      if (socketEmiter) {
        socketEmiter('documentProcessed', entity.sharedId);
      }
    });
  }

  if (attachments.length || documents.length) {
    await _search.search.indexEntities({ sharedId: entity.sharedId }, '+fullText');
  }

  return saveResults;
};exports.saveFiles = saveFiles;