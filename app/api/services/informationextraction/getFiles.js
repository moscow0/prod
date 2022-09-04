"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getFilesForSuggestions = getFilesForSuggestions;exports.getFilesForTraining = getFilesForTraining;

var _filesModel = require("../../files/filesModel");

var _entitiesModel = _interopRequireDefault(require("../../entities/entitiesModel"));
var _segmentationModel = require("../pdfsegmentation/segmentationModel");
var _IXSuggestionsModel = require("../../suggestions/IXSuggestionsModel");
var _ixmodels = _interopRequireDefault(require("./ixmodels"));

var _objectIndex = require("../../../shared/data_utils/objectIndex");
var _settings = _interopRequireDefault(require("../../settings/settings"));
var _templates = _interopRequireDefault(require("../../templates/templates"));
var _propertyTypes = require("../../../shared/propertyTypes");
var _languages = _interopRequireDefault(require("../../../shared/languages"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const BATCH_SIZE = 50;
const MAX_TRAINING_FILES_NUMBER = 500;


















async function getFilesWithAggregations(files) {
  const filesIds = files.filter((x) => x.filename).map((x) => x.filename);

  const segmentationForFiles = await _segmentationModel.SegmentationModel.get(
  { filename: { $in: filesIds } },
  'filename segmentation xmlname');


  const segmentationDictionary = Object.assign(
  {},
  ...segmentationForFiles.map((segmentation) => ({ [segmentation.filename]: segmentation })));


  return files.map((file) => ({
    _id: file._id,
    language: file.language,
    extractedMetadata: file.extractedMetadata ? file.extractedMetadata : [],
    entity: file.entity,
    segmentation: segmentationDictionary[file.filename ? file.filename : 'no value'],
    propertyValue: file.propertyValue }));

}

async function getSegmentedFilesIds() {
  const segmentations = await _segmentationModel.SegmentationModel.get({ status: 'ready' }, 'fileID');
  return segmentations.filter((x) => x.fileID).map((x) => x.fileID);
}

async function getFilesForTraining(templates, property) {var _await$settings$getDe;
  const entities = await _entitiesModel.default.getUnrestricted(
  { template: { $in: templates } },
  `sharedId metadata.${property} language`);

  const entitiesFromTrainingTemplatesIds = entities.filter((x) => x.sharedId).map((x) => x.sharedId);

  const files = await _filesModel.filesModel.get(
  {
    type: 'document',
    filename: { $exists: true },
    language: { $exists: true },
    'extractedMetadata.name': property,
    _id: { $in: await getSegmentedFilesIds() },
    entity: { $in: entitiesFromTrainingTemplatesIds } },

  'extractedMetadata entity language filename',
  { limit: MAX_TRAINING_FILES_NUMBER });


  const indexedEntities = (0, _objectIndex.objectIndex)(entities, (e) => e.sharedId + e.language);
  const template = await _templates.default.getById(templates[0]);

  let type = 'text';
  if (property !== 'title') {var _template$properties;
    const prop = template === null || template === void 0 ? void 0 : (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.find((p) => p.name === property);
    type = prop === null || prop === void 0 ? void 0 : prop.type;
  }

  if (!type) {
    throw new Error(`Property "${property}" does not exists`);
  }
  const defaultLang = (_await$settings$getDe = await _settings.default.getDefaultLanguage()) === null || _await$settings$getDe === void 0 ? void 0 : _await$settings$getDe.key;

  const filesWithEntityValue = files.map((file) => {var _entity$metadata$prop;
    const fileLang = _languages.default.get(file.language, 'ISO639_1') || defaultLang;
    const entity = indexedEntities[file.entity + fileLang];
    if (!(entity !== null && entity !== void 0 && entity.metadata) || !(entity !== null && entity !== void 0 && (_entity$metadata$prop = entity.metadata[property]) !== null && _entity$metadata$prop !== void 0 && _entity$metadata$prop.length)) {
      return file;
    }

    let [{ value }] = entity.metadata[property] || [{}];
    if (type === _propertyTypes.propertyTypes.date) {
      value = new Date(value * 1000).toLocaleDateString(entity.language);
    }

    return _objectSpread(_objectSpread({}, file), {}, { propertyValue: value });
  });

  return getFilesWithAggregations(filesWithEntityValue);
}

async function getFilesForSuggestions(property) {
  const [currentModel] = await _ixmodels.default.get({ propertyName: property });

  const suggestions = await _IXSuggestionsModel.IXSuggestionsModel.get(
  { propertyName: property, date: { $lt: currentModel.creationDate } },
  'fileId',
  { limit: BATCH_SIZE });


  const fileIds = suggestions.filter((x) => x.fileId).map((x) => x.fileId);

  const files = await _filesModel.filesModel.get(
  {
    $and: [
    {
      type: 'document',
      filename: { $exists: true },
      _id: { $in: await getSegmentedFilesIds() },
      language: { $exists: true } },

    { _id: { $in: fileIds } }] },


  'extractedMetadata entity language filename');


  return getFilesWithAggregations(files);
}