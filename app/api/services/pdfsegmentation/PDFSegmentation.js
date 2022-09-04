"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PDFSegmentation = void 0;var _TaskManager = require("../tasksmanager/TaskManager");
var _files = require("../../files");

var _urlJoin = _interopRequireDefault(require("url-join"));
var _filesModel = require("../../files/filesModel");
var _path = _interopRequireDefault(require("path"));

var _settings = _interopRequireDefault(require("../../settings/settings"));
var _tenantContext = require("../../tenants/tenantContext");

var _JSONRequest = _interopRequireDefault(require("../../../shared/JSONRequest"));
var _utils = require("../../utils");
var _segmentationModel = require("./segmentationModel");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



class PDFSegmentation {








  constructor() {_defineProperty(this, "segmentationTaskManager", void 0);_defineProperty(this, "features", void 0);_defineProperty(this, "batchSize", 50);_defineProperty(this, "segmentOnePdf",










    async (
    file,
    serviceUrl,
    tenant) =>
    {
      try {
        const fileContent = await _files.storage.fileContents(file.filename, 'document');
        await _JSONRequest.default.uploadFile((0, _urlJoin.default)(serviceUrl, tenant), file.filename, fileContent);

        await this.segmentationTaskManager.startTask({
          task: PDFSegmentation.SERVICE_NAME,
          tenant,
          params: {
            filename: file.filename } });



        await this.storeProcess(file._id, file.filename);
      } catch (err) {
        if (err.code === 'ENOENT') {
          await this.storeProcess(file._id, file.filename, false);
          (0, _utils.handleError)(err);
          return;
        }

        throw err;
      }
    });_defineProperty(this, "storeProcess",

    async (fileID, filename, processing = true) =>
    _segmentationModel.SegmentationModel.save({
      fileID,
      filename,
      status: processing ? 'processing' : 'failed' }));_defineProperty(this, "getFilesToSegment",


    async () => {
      const segmentations = await _segmentationModel.SegmentationModel.get(
      { fileID: { $exists: true } },
      'fileID');


      const segmentedFiles = segmentations.map((segmentation) => segmentation.fileID);

      const files = await _filesModel.filesModel.get(
      {
        type: 'document',
        filename: { $exists: true },
        _id: { $nin: segmentedFiles } },

      'filename',
      { limit: this.batchSize });


      return files.map((file) => ({ _id: file._id, filename: file.filename }));
    });_defineProperty(this, "segmentPdfs",

    async () => {
      const pendingTasks = await this.segmentationTaskManager.countPendingTasks();
      if (pendingTasks > 0) {
        return;
      }

      try {
        await Promise.all(
        Object.keys(_tenantContext.tenants.tenants).map(async (tenant) => {
          await _tenantContext.tenants.run(async () => {var _settingsValues$featu;
            const settingsValues = await _settings.default.get();
            const segmentationServiceConfig = settingsValues === null || settingsValues === void 0 ? void 0 : (_settingsValues$featu = settingsValues.features) === null || _settingsValues$featu === void 0 ? void 0 : _settingsValues$featu.segmentation;

            if (!segmentationServiceConfig) {
              return;
            }

            const filesToSegment = await this.getFilesToSegment();
            for (let i = 0; i < filesToSegment.length; i += 1) {
              // eslint-disable-next-line no-await-in-loop
              await this.segmentOnePdf(filesToSegment[i], segmentationServiceConfig.url, tenant);
            }
          }, tenant);
        }));

      } catch (err) {
        if (err.code === 'ECONNREFUSED') {
          await new Promise((resolve) => {
            setTimeout(resolve, 60000);
          });
        }
        (0, _utils.handleError)(err, { useContext: false });
      }
    });_defineProperty(this, "requestResults",

    async (message) => {
      const response = await _JSONRequest.default.get(message.data_url);
      const fileStream = (await fetch(message.file_url)).body;

      if (!fileStream) {
        throw new Error(
        `Error requesting for segmentation file: ${message.params.filename}, tenant: ${
        message.tenant
        }`);

      }
      return { data: JSON.parse(response.json), fileStream: fileStream };
    });_defineProperty(this, "storeXML",




    async (filename, fileStream) => {
      const folderPath = (0, _files.uploadsPath)(PDFSegmentation.SERVICE_NAME);
      await (0, _files.createDirIfNotExists)(folderPath);
      const xmlname = PDFSegmentation.getXMLNAme(filename);

      await _files.storage.storeFile(xmlname, fileStream, 'segmentation');
    });_defineProperty(this, "saveSegmentation",

    async (filename, data) => {
      const [segmentation] = await _segmentationModel.SegmentationModel.get({ filename });
      // eslint-disable-next-line camelcase
      const { paragraphs, page_height, page_width } = data;
      await _segmentationModel.SegmentationModel.save(_objectSpread(_objectSpread({},
      segmentation), {}, {
        segmentation: { page_height, page_width, paragraphs },
        autoexpire: null,
        xmlname: PDFSegmentation.getXMLNAme(filename),
        status: 'ready' }));

    });_defineProperty(this, "saveSegmentationError",

    async (filename) => {
      const [segmentation] = await _segmentationModel.SegmentationModel.get({ filename });
      if (segmentation) {
        await _segmentationModel.SegmentationModel.save(_objectSpread(_objectSpread({},
        segmentation), {}, {
          filename,
          autoexpire: null,
          status: 'failed' }));

      }
    });_defineProperty(this, "processResults",

    async (message) => {
      await _tenantContext.tenants.run(async () => {
        try {
          if (!message.success) {var _message$params;
            await this.saveSegmentationError((_message$params = message.params) === null || _message$params === void 0 ? void 0 : _message$params.filename);
            return;
          }

          const { data, fileStream } = await this.requestResults(message);
          await this.storeXML(message.params.filename, fileStream);
          await this.saveSegmentation(message.params.filename, data);
        } catch (error) {
          (0, _utils.handleError)(error);
        }
      }, message.tenant);
    });this.segmentationTaskManager = new _TaskManager.TaskManager({ serviceName: PDFSegmentation.SERVICE_NAME, processResults: this.processResults });}start() {this.segmentationTaskManager.subscribeToResults();}}exports.PDFSegmentation = PDFSegmentation;_defineProperty(PDFSegmentation, "SERVICE_NAME", 'segmentation');_defineProperty(PDFSegmentation, "getXMLNAme", (filename) => `${_path.default.basename(filename, _path.default.extname(filename))}.xml`);