"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ocrManager = exports.isOcrEnabled = exports.getOcrStatus = exports.OcrManager = void 0;
var _urlJoin = _interopRequireDefault(require("url-join"));
var _files = require("../../files");
var _filesystem = require("../../files/filesystem");
var _processDocument = require("../../files/processDocument");
var _settings = _interopRequireDefault(require("../../settings/settings"));
var _TaskManager = require("../tasksmanager/TaskManager");
var _setupSockets = require("../../socketio/setupSockets");
var _tenantContext = require("../../tenants/tenantContext");
var _Error = _interopRequireDefault(require("../../utils/Error"));
var _JSONRequest = _interopRequireDefault(require("../../../shared/JSONRequest"));

var _relationships = _interopRequireDefault(require("../../relationships"));
var _handleError = require("../../utils/handleError");
var _languagesList = require("../../../shared/languagesList");
var _ocrModel = require("./ocrModel");

var _ocrRecords = require("./ocrRecords");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











const isEnabled = async () => {var _settingsObject$featu, _settingsObject$featu2;
  const settingsObject = await _settings.default.get();
  return Boolean((_settingsObject$featu = settingsObject.features) === null || _settingsObject$featu === void 0 ? void 0 : (_settingsObject$featu2 = _settingsObject$featu.ocr) === null || _settingsObject$featu2 === void 0 ? void 0 : _settingsObject$featu2.url) && Boolean(settingsObject.ocrServiceEnabled);
};exports.isOcrEnabled = isEnabled;

const validateNotInQueue = async (file) => {
  const [record] = await (0, _ocrRecords.getForSourceFile)(file);

  if (record) {
    throw Error(`An OCR task for ${file.filename} is already in the queue`);
  }
};

const validateFileIsDocument = (file) => {
  if (file.type !== 'document') {
    throw (0, _Error.default)('The file is not a document.', 400);
  }
};

const getSettings = async () => {var _settingsValues$featu;
  const settingsValues = await _settings.default.get();
  const ocrServiceConfig = settingsValues === null || settingsValues === void 0 ? void 0 : (_settingsValues$featu = settingsValues.features) === null || _settingsValues$featu === void 0 ? void 0 : _settingsValues$featu.ocr;

  if (!ocrServiceConfig) {
    throw Error('Ocr settings are missing from the database (settings.features.ocr).');
  }

  return ocrServiceConfig;
};

const fetchSupportedLanguages = async (ocrSettings) => {
  const response = await fetch((0, _urlJoin.default)(ocrSettings.url, 'info'));
  const body = await response.json();
  return body.supported_languages;
};

const saveResultFile = async (message, originalFile) => {
  const fileResponse = await fetch(message.file_url);
  const fileStream = fileResponse.body;
  if (!fileStream) {
    throw new Error(
    `Error requesting for OCR file: ${message.params.filename}, tenant: ${message.tenant}`);

  }

  const newFileName = (0, _filesystem.generateFileName)(originalFile);
  await _files.storage.storeFile(newFileName, fileStream, 'document');
  return (0, _processDocument.processDocument)(
  originalFile.entity,
  {
    originalname: `ocr_${originalFile.originalname}`,
    filename: newFileName,
    mimetype: fileResponse.headers.get('Content-Type'),
    size: parseInt(fileResponse.headers.get('Content-Length'), 10),
    language: originalFile.language,
    type: 'document',
    destination: (0, _files.uploadsPath)() },

  false);

};

const processFiles = async (
record,
message,
originalFile) =>
{
  const resultFile = await saveResultFile(message, originalFile);
  await _files.files.save(_objectSpread(_objectSpread({}, originalFile), {}, { type: 'attachment' }));
  await (0, _ocrRecords.markReady)(record, resultFile);
  await _relationships.default.swapTextReferencesFile(
  originalFile._id.toHexString(),
  resultFile._id.toHexString());

};

const handleOcrError = async (
record,
originalFile,
message) =>
{
  await (0, _ocrRecords.markError)(record);
  (0, _setupSockets.emitToTenant)(message.tenant, 'ocr:error', originalFile._id.toHexString());
};

const processResults = async (message) => {
  await _tenantContext.tenants.run(async () => {
    try {
      const [originalFile] = await _files.files.get({ filename: message.params.filename });
      const [record] = await (0, _ocrRecords.getForSourceFile)(originalFile);

      if (!record) return;

      if (!message.success) {
        await handleOcrError(record, originalFile, message);
        return;
      }

      await processFiles(record, message, originalFile);
      (0, _setupSockets.emitToTenant)(message.tenant, 'ocr:ready', originalFile._id.toHexString());
    } catch (e) {
      (0, _handleError.handleError)(e);
    }
  }, message.tenant);
};

const validateLanguage = async (language, ocrSettings) => {
  const _ocrSettings = ocrSettings || (await getSettings());
  const supportedLanguages = await fetchSupportedLanguages(_ocrSettings);
  return supportedLanguages.includes((0, _languagesList.language)(language, 'ISO639_1'));
};

const getStatus = async (file) => {
  const [record] = await (0, _ocrRecords.getForSourceOrTargetFile)(file);

  const status = record ? record.status : _ocrModel.OcrStatus.NONE;

  if (status === _ocrModel.OcrStatus.NONE) {
    validateFileIsDocument(file);
  }

  if (status !== _ocrModel.OcrStatus.READY && !(await validateLanguage(file.language || 'other'))) {
    return { status: _ocrModel.OcrStatus.UNSUPPORTED_LANGUAGE };
  }

  return _objectSpread({ status }, record ? { lastUpdated: record.lastUpdated } : {});
};exports.getOcrStatus = getStatus;

const validateTaskIsAdmissible = async (
file,
settingsValues) =>
{
  await validateFileIsDocument(file);
  await validateNotInQueue(file);

  if (!(await validateLanguage(file.language || 'other', settingsValues))) {
    throw Error('Language not supported');
  }
};

class OcrManager {




  constructor() {_defineProperty(this, "SERVICE_NAME", 'ocr');_defineProperty(this, "ocrTaskManager", void 0);
    this.ocrTaskManager = new _TaskManager.TaskManager({
      serviceName: this.SERVICE_NAME,
      processResults });

  }

  start() {
    this.ocrTaskManager.subscribeToResults();
  }

  async stop() {var _this$ocrTaskManager;
    await ((_this$ocrTaskManager = this.ocrTaskManager) === null || _this$ocrTaskManager === void 0 ? void 0 : _this$ocrTaskManager.stop());
  }

  async addToQueue(file) {
    if (!file.filename) {
      return;
    }
    const settingsValues = await getSettings();

    await validateTaskIsAdmissible(file, settingsValues);

    const fileContent = await _files.storage.fileContents(file.filename, 'document');
    const tenant = _tenantContext.tenants.current();

    await _JSONRequest.default.uploadFile(
    (0, _urlJoin.default)(settingsValues.url, 'upload', tenant.name),
    file.filename,
    fileContent);


    await this.ocrTaskManager.startTask({
      task: this.SERVICE_NAME,
      tenant: tenant.name,
      params: {
        filename: file.filename,
        language: (0, _languagesList.language)(file.language, 'ISO639_1') } });



    await (0, _ocrRecords.createForFile)(file);
  }}exports.OcrManager = OcrManager;


const ocrManager = new OcrManager();exports.ocrManager = ocrManager;