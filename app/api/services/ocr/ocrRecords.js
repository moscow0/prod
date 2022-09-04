"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.markReady = exports.markError = exports.getForSourceOrTargetFile = exports.getForSourceFile = exports.createForFile = exports.cleanupRecordsOfFiles = void 0;
var _tsUtils = require("../../../shared/tsUtils");


var _ocrModel = require("./ocrModel");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const createForFile = async (file) =>
_ocrModel.OcrModel.save({
  sourceFile: file._id,
  language: file.language,
  status: _ocrModel.OcrStatus.PROCESSING,
  lastUpdated: Date.now() });exports.createForFile = createForFile;


const cleanupRecordsOfFiles = async (fileIds) => {
  const idStrings = fileIds.
  filter((fid) => fid !== undefined).
  map((fid) => (0, _tsUtils.ensure)(fid).toString());
  const records = await _ocrModel.OcrModel.get({
    $or: [{ sourceFile: { $in: idStrings } }, { resultFile: { $in: idStrings } }] });

  const idRecordMap = new Map();
  const recordsToNullSource = [];
  const recordIdsToDelete = [];

  records.forEach((record) => {
    if (record.sourceFile) {
      idRecordMap.set(record.sourceFile.toString(), record);
    }
    if (record.resultFile) {
      idRecordMap.set(record.resultFile.toString(), record);
    }
  });

  idStrings.forEach((fileId) => {
    if (idRecordMap.has(fileId)) {var _record$sourceFile, _record$resultFile;
      const record = idRecordMap.get(fileId);
      if (((_record$sourceFile = record.sourceFile) === null || _record$sourceFile === void 0 ? void 0 : _record$sourceFile.toString()) === fileId) {
        recordsToNullSource.push(_objectSpread(_objectSpread({}, record), {}, { sourceFile: null }));
      } else if (((_record$resultFile = record.resultFile) === null || _record$resultFile === void 0 ? void 0 : _record$resultFile.toString()) === fileId) {
        recordIdsToDelete.push(record._id.toString());
      }
    }
  });

  await _ocrModel.OcrModel.saveMultiple(recordsToNullSource);
  await _ocrModel.OcrModel.delete({ _id: { $in: recordIdsToDelete } });
};exports.cleanupRecordsOfFiles = cleanupRecordsOfFiles;

const markReady = async (record, resultFile) =>
_ocrModel.OcrModel.save(_objectSpread(_objectSpread({},
record), {}, {
  status: _ocrModel.OcrStatus.READY,
  resultFile: resultFile._id,
  lastUpdated: Date.now() }));exports.markReady = markReady;


const markError = async (record) =>
_ocrModel.OcrModel.save(_objectSpread(_objectSpread({},
record), {}, {
  status: _ocrModel.OcrStatus.ERROR,
  lastUpdated: Date.now() }));exports.markError = markError;


const getForSourceFile = async (file) =>
_ocrModel.OcrModel.get({ sourceFile: file._id });exports.getForSourceFile = getForSourceFile;

const getForSourceOrTargetFile = async (file) =>
_ocrModel.OcrModel.get({
  $or: [{ sourceFile: file._id }, { resultFile: file._id }] });exports.getForSourceOrTargetFile = getForSourceOrTargetFile;