"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.InformationExtraction = void 0;



var _path = _interopRequireDefault(require("path"));
var _urlJoin = _interopRequireDefault(require("url-join"));
var _lodash = _interopRequireDefault(require("lodash"));
var _mongodb = require("mongodb");
var _files = require("../../files");
var _TaskManager = require("../tasksmanager/TaskManager");
var _IXSuggestionsModel = require("../../suggestions/IXSuggestionsModel");
var _segmentationModel = require("../pdfsegmentation/segmentationModel");
var _PDFSegmentation = require("../pdfsegmentation/PDFSegmentation");

var _tenantContext = require("../../tenants/tenantContext");
var _setupSockets = require("../../socketio/setupSockets");
var _filesModel = require("../../files/filesModel");
var _entities = _interopRequireDefault(require("../../entities/entities"));
var _settings = _interopRequireDefault(require("../../settings/settings"));
var _templates = _interopRequireDefault(require("../../templates/templates"));
var _JSONRequest = _interopRequireDefault(require("../../../shared/JSONRequest"));
var _languages = _interopRequireDefault(require("../../../shared/languages"));


var _IXModelSchema = require("../../../shared/types/IXModelSchema");


var _getFiles = require("./getFiles");




var _suggestions = require("../../suggestions/suggestions");

var _stringToTypeOfProperty = require("../../../shared/stringToTypeOfProperty");
var _ixmodels = _interopRequireDefault(require("./ixmodels"));
var _IXModelsModel = require("./IXModelsModel");const _excluded = ["page"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}
















class InformationExtraction {






  constructor() {_defineProperty(this, "taskManager", void 0);_defineProperty(this, "requestResults",










    async (message) => {
      const response = await _JSONRequest.default.get(message.data_url);

      return JSON.parse(response.json);
    });_defineProperty(this, "sendMaterials",
















    async (
    files,
    property,
    serviceUrl,
    type = 'labeled_data') =>
    {
      await Promise.all(
      files.map(async (file) => {var _file$extractedMetada, _file$segmentation$se, _file$segmentation$se2, _file$segmentation$se3;
        const xmlName = file.segmentation.xmlname;
        const xmlExists = await _files.storage.fileExists(
        _path.default.join(_PDFSegmentation.PDFSegmentation.SERVICE_NAME, xmlName),
        'document');


        const propertyLabeledData = (_file$extractedMetada = file.extractedMetadata) === null || _file$extractedMetada === void 0 ? void 0 : _file$extractedMetada.find(
        (labeledData) => labeledData.name === property);


        if (!xmlExists || type === 'labeled_data' && !propertyLabeledData) {
          return;
        }

        await InformationExtraction.sendXmlToService(serviceUrl, xmlName, property, type);

        let data = {
          xml_file_name: xmlName,
          property_name: property,
          tenant: _tenantContext.tenants.current().name,
          xml_segments_boxes: (_file$segmentation$se = file.segmentation.segmentation) === null || _file$segmentation$se === void 0 ? void 0 : _file$segmentation$se.paragraphs,
          page_width: (_file$segmentation$se2 = file.segmentation.segmentation) === null || _file$segmentation$se2 === void 0 ? void 0 : _file$segmentation$se2.page_width,
          page_height: (_file$segmentation$se3 = file.segmentation.segmentation) === null || _file$segmentation$se3 === void 0 ? void 0 : _file$segmentation$se3.page_height };


        if (type === 'labeled_data' && propertyLabeledData) {var _propertyLabeledData$, _propertyLabeledData$2, _propertyLabeledData$3;
          const defaultTrainingLanguage = 'en';
          data = _objectSpread(_objectSpread({},
          data), {}, {
            language_iso: _languages.default.get(file.language, 'ISO639_1') || defaultTrainingLanguage,
            label_text: file.propertyValue || ((_propertyLabeledData$ = propertyLabeledData.selection) === null || _propertyLabeledData$ === void 0 ? void 0 : _propertyLabeledData$.text),
            label_segments_boxes: (_propertyLabeledData$2 = propertyLabeledData.selection) === null || _propertyLabeledData$2 === void 0 ? void 0 : (_propertyLabeledData$3 = _propertyLabeledData$2.selectionRectangles) === null || _propertyLabeledData$3 === void 0 ? void 0 : _propertyLabeledData$3.map((r) => {
              const { page } = r,selection = _objectWithoutProperties(r, _excluded);
              return _objectSpread(_objectSpread({}, selection), {}, { page_number: page });
            }) });

        }
        await _JSONRequest.default.post((0, _urlJoin.default)(serviceUrl, type), data);
        if (type === 'prediction_data') {
          await this.saveSuggestionProcess(file, property);
        }
      }));

    });_defineProperty(this, "_getEntityFromFile",

    async (file) => {
      let [entity] = await _entities.default.getUnrestricted({
        sharedId: file.entity,
        language: _languages.default.get(file.language, 'ISO639_1') });


      if (!entity) {
        const defaultLanguage = await _settings.default.getDefaultLanguage();
        [entity] = await _entities.default.getUnrestricted({
          sharedId: file.entity,
          language: defaultLanguage === null || defaultLanguage === void 0 ? void 0 : defaultLanguage.key });

      }
      return entity;
    });_defineProperty(this, "_getEntityFromSuggestion",

    async (rawSuggestion) => {
      const [segmentation] = await _segmentationModel.SegmentationModel.get({
        xmlname: rawSuggestion.xml_file_name });


      if (!segmentation) {
        return null;
      }
      const [file] = await _filesModel.filesModel.get({ _id: segmentation.fileID });

      if (!file) {
        return null;
      }

      return this._getEntityFromFile(file);
    });_defineProperty(this, "saveSuggestions",

    async (message) => {
      const templates = await _templates.default.get();
      const rawSuggestions = await this.requestResults(message);

      return Promise.all(
      rawSuggestions.map(async (rawSuggestion) => {
        const entity = await this._getEntityFromSuggestion(rawSuggestion);
        if (!entity) {
          return Promise.resolve();
        }

        const [segmentation] = await _segmentationModel.SegmentationModel.get({
          xmlname: rawSuggestion.xml_file_name });


        if (!segmentation) {
          return Promise.resolve();
        }

        const [currentSuggestion] = await _IXSuggestionsModel.IXSuggestionsModel.get({
          entityId: entity.sharedId,
          propertyName: rawSuggestion.property_name,
          fileId: segmentation.fileID });


        let status = 'ready';
        let error = '';

        const allProps = _lodash.default.flatMap(
        templates,
        (template) => template.properties || []);

        const property = allProps.find((p) => p.name === rawSuggestion.property_name);

        const suggestedValue = (0, _stringToTypeOfProperty.stringToTypeOfProperty)(
        rawSuggestion.text,
        property === null || property === void 0 ? void 0 : property.type,
        (currentSuggestion === null || currentSuggestion === void 0 ? void 0 : currentSuggestion.language) || entity.language);


        if (suggestedValue === null) {
          status = 'failed';
          error = 'Invalid value for property type';
        }

        if (!message.success) {
          status = 'failed';
          error = message.error_message ? message.error_message : 'Unknown error';
        }

        const suggestion = _objectSpread(_objectSpread(_objectSpread({},
        currentSuggestion), {}, {
          suggestedValue },
        (property === null || property === void 0 ? void 0 : property.type) === 'date' ? { suggestedText: rawSuggestion.text } : {}), {}, {
          segment: rawSuggestion.segment_text,
          status,
          error,
          date: new Date().getTime(),
          selectionRectangles: rawSuggestion.segments_boxes.map((box) => {
            const rect = _objectSpread(_objectSpread({}, box), {}, { page: box.page_number.toString() });
            delete rect.page_number;
            return rect;
          }) });


        return _suggestions.Suggestions.save(suggestion);
      }));

    });_defineProperty(this, "saveSuggestionProcess",

    async (file, propertyName) => {
      const entity = await this._getEntityFromFile(file);
      const [existingSuggestions] = await _IXSuggestionsModel.IXSuggestionsModel.get({
        entityId: entity.sharedId,
        propertyName,
        fileId: file._id });

      const suggestion = _objectSpread(_objectSpread({},
      existingSuggestions), {}, {
        entityId: entity.sharedId,
        fileId: file._id,
        language: _languages.default.get(file.language, 'ISO639_1') || 'other',
        propertyName,
        status: 'processing',
        date: new Date().getTime() });


      return _suggestions.Suggestions.save(suggestion);
    });_defineProperty(this, "serviceUrl",

    async () => {var _settingsValues$featu, _settingsValues$featu2;
      const settingsValues = await _settings.default.get();
      const serviceUrl = (_settingsValues$featu = settingsValues.features) === null || _settingsValues$featu === void 0 ? void 0 : (_settingsValues$featu2 = _settingsValues$featu.metadataExtraction) === null || _settingsValues$featu2 === void 0 ? void 0 : _settingsValues$featu2.url;
      if (!serviceUrl) {
        throw new Error('No url for metadata extraction service');
      }

      return serviceUrl;
    });_defineProperty(this, "getSuggestions",

    async (property) => {
      const files = await (0, _getFiles.getFilesForSuggestions)(property);
      if (files.length === 0) {
        (0, _setupSockets.emitToTenant)(_tenantContext.tenants.current().name, 'ix_model_status', property, 'ready', 'Completed');
        return;
      }

      await this.materialsForSuggestions(files, property);
      await this.taskManager.startTask({
        task: 'suggestions',
        tenant: _tenantContext.tenants.current().name,
        params: { property_name: property } });

    });_defineProperty(this, "materialsForSuggestions",

    async (files, property) => {
      const serviceUrl = await this.serviceUrl();

      await this.sendMaterials(files, property, serviceUrl, 'prediction_data');
    });_defineProperty(this, "trainModel",

    async (property) => {
      const [model] = await _IXModelsModel.IXModelsModel.get({ propertyName: property });
      if (model && !model.findingSuggestions) {
        model.findingSuggestions = true;
        await _IXModelsModel.IXModelsModel.save(model);
      }
      const templates = await this.getTemplatesWithProperty(property);
      const serviceUrl = await this.serviceUrl();
      const materialsSent = await this.materialsForModel(templates, property, serviceUrl);
      if (!materialsSent) {
        return { status: 'error', message: 'No labeled data' };
      }

      await this.taskManager.startTask({
        task: 'create_model',
        tenant: _tenantContext.tenants.current().name,
        params: { property_name: property } });


      await this.saveModelProcess(property);

      return { status: 'processing_model', message: 'Training model' };
    });_defineProperty(this, "status",

    async (property) => {
      const [currentModel] = await _ixmodels.default.get({
        propertyName: property });


      if (!currentModel) {
        return { status: 'ready', message: 'Ready' };
      }

      if (currentModel.status === _IXModelSchema.ModelStatus.processing) {
        return { status: 'processing_model', message: 'Training model' };
      }

      if (currentModel.status === _IXModelSchema.ModelStatus.ready && currentModel.findingSuggestions) {
        const suggestionStatus = await this.getSuggestionsStatus(property, currentModel.creationDate);
        return {
          status: 'processing_suggestions',
          message: 'Finding suggestions',
          data: suggestionStatus };

      }

      return { status: 'ready', message: 'Ready' };
    });_defineProperty(this, "stopModel",

    async (propertyName) => {
      const res = await _IXModelsModel.IXModelsModel.db.findOneAndUpdate(
      { propertyName },
      { $set: { findingSuggestions: false } },
      {});

      if (res) {
        return { status: 'ready', message: 'Ready' };
      }

      return { status: 'error', message: '' };
    });_defineProperty(this, "materialsForModel",

    async (templates, property, serviceUrl) => {
      const files = await (0, _getFiles.getFilesForTraining)(templates, property);
      if (!files.length) {
        return false;
      }
      await this.sendMaterials(files, property, serviceUrl);
      return true;
    });_defineProperty(this, "saveModelProcess",

    async (property) => {
      const [currentModel] = await _ixmodels.default.get({
        propertyName: property });


      await _ixmodels.default.save(_objectSpread(_objectSpread({},
      currentModel), {}, {
        status: _IXModelSchema.ModelStatus.processing,
        creationDate: new Date().getTime(),
        propertyName: property }));

    });_defineProperty(this, "getTemplatesWithProperty",

    async (property) => {var _settingsValues$featu3, _settingsValues$featu4;
      const settingsValues = await _settings.default.get();
      const metadataExtractionSettings = ((_settingsValues$featu3 = settingsValues.features) === null || _settingsValues$featu3 === void 0 ? void 0 : (_settingsValues$featu4 = _settingsValues$featu3.metadataExtraction) === null || _settingsValues$featu4 === void 0 ? void 0 : _settingsValues$featu4.templates) || [];
      return metadataExtractionSettings.
      filter((t) => t.properties.includes(property) && t.template).
      map((t) => new _mongodb.ObjectId(t.template));
    });_defineProperty(this, "processResults",

    async (message) => {
      await _tenantContext.tenants.run(async () => {
        const [currentModel] = await _IXModelsModel.IXModelsModel.get({
          propertyName: message.params.property_name });


        if (message.task === 'create_model' && message.success) {
          await _ixmodels.default.save(_objectSpread(_objectSpread({},
          currentModel), {}, {
            status: _IXModelSchema.ModelStatus.ready,
            creationDate: new Date().getTime() }));

          await this.updateSuggestionStatus(message, currentModel);
        }

        if (message.task === 'suggestions') {
          await this.saveSuggestions(message);
          await this.updateSuggestionStatus(message, currentModel);
        }

        if (!currentModel.findingSuggestions) {
          (0, _setupSockets.emitToTenant)(
          message.tenant,
          'ix_model_status',
          message.params.property_name,
          'ready',
          'Canceled');

          return;
        }

        await this.getSuggestions(message.params.property_name);
      }, message.tenant);
    });_defineProperty(this, "getSuggestionsStatus",

    async (propertyName, modelCreationDate) => {
      const totalSuggestions = await _IXSuggestionsModel.IXSuggestionsModel.count({ propertyName });
      const processedSuggestions = await _IXSuggestionsModel.IXSuggestionsModel.count({
        propertyName,
        date: { $gt: modelCreationDate } });

      return {
        total: totalSuggestions,
        processed: processedSuggestions };

    });_defineProperty(this, "updateSuggestionStatus",

    async (message, currentModel) => {
      const suggestionsStatus = await this.getSuggestionsStatus(
      message.params.property_name,
      currentModel.creationDate);

      (0, _setupSockets.emitToTenant)(
      message.tenant,
      'ix_model_status',
      message.params.property_name,
      'processing_suggestions',
      '',
      suggestionsStatus);

    });this.taskManager = new _TaskManager.TaskManager({ serviceName: InformationExtraction.SERVICE_NAME, processResults: this.processResults });}start() {this.taskManager.subscribeToResults();}}exports.InformationExtraction = InformationExtraction;_defineProperty(InformationExtraction, "SERVICE_NAME", 'information_extraction');_defineProperty(InformationExtraction, "mock", void 0);_defineProperty(InformationExtraction, "sendXmlToService", async (serviceUrl, xmlName, property, type) => {const fileContent = await _files.storage.fileContents(_path.default.join(_PDFSegmentation.PDFSegmentation.SERVICE_NAME, xmlName), 'document');const endpoint = type === 'labeled_data' ? 'xml_to_train' : 'xml_to_predict';const url = (0, _urlJoin.default)(serviceUrl, endpoint, _tenantContext.tenants.current().name, property);return _JSONRequest.default.uploadFile(url, xmlName, fileContent);});