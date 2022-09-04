"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveConfigurations = exports.createDefaultSuggestionsForFiles = exports.createDefaultSuggestions = void 0;var _entities = _interopRequireDefault(require("../entities"));
var _entitiesModel = _interopRequireDefault(require("../entities/entitiesModel"));
var _files = require("../files/files");
var _settings = _interopRequireDefault(require("../settings/settings"));
var _languages = _interopRequireDefault(require("../../shared/languages"));



var _IXSuggestionsModel = require("./IXSuggestionsModel");
var _suggestions = require("./suggestions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}






const deleteSuggestionsNotConfigured = async (
currentSettingsTemplates,
settingsTemplates) =>
{
  const deletedTemplates = currentSettingsTemplates.filter(
  (set) => !settingsTemplates.find((st) => st.template === set.template));


  const deletedTemplateProps = currentSettingsTemplates.
  map((currentTemplate) => {
    const currentTemplateId = currentTemplate.template;
    const property = {};
    const template = settingsTemplates.find((st) => st.template === currentTemplateId);
    if (template) {
      property.template = currentTemplateId;
      property.properties = [];
      currentTemplate.properties.forEach((prop) => {
        if (!template.properties.includes(prop)) {
          property.properties.push(prop);
        }
      });
    }
    return property;
  }).
  filter((prop) => prop.template && prop.properties.length);

  const deletedTemplatesAndDeletedTemplateProps = deletedTemplates.concat(deletedTemplateProps);

  if (deletedTemplatesAndDeletedTemplateProps.length > 0) {
    const deletedTemplateIds = deletedTemplatesAndDeletedTemplateProps.map((temps) => temps.template);

    const entitiesDoc = await _entities.default.get({ template: { $in: deletedTemplateIds } }, 'sharedId');

    const entitiesSharedIds = entitiesDoc.map((entity) => entity.sharedId);
    const propNames = deletedTemplatesAndDeletedTemplateProps.reduce(
    (acc, curr) => [...acc, ...curr.properties],
    []);

    const uniquePropNames = [...new Set(propNames)];

    await _IXSuggestionsModel.IXSuggestionsModel.db.deleteMany({
      $and: [{ entityId: { $in: entitiesSharedIds } }, { propertyName: { $in: uniquePropNames } }] });

  }
};

const getTemplatesWithNewProps = (
settingsTemplates,
currentSettingsTemplates) =>

settingsTemplates.
map((newTemp) => {
  const oldTemplate = currentSettingsTemplates === null || currentSettingsTemplates === void 0 ? void 0 : currentSettingsTemplates.find(
  (oldTemp) => oldTemp.template === newTemp.template);

  if (newTemp.properties.length === (oldTemplate === null || oldTemplate === void 0 ? void 0 : oldTemplate.properties.length) || !oldTemplate) {
    return null;
  }
  const newProps = newTemp.properties;
  const oldProps = (oldTemplate === null || oldTemplate === void 0 ? void 0 : oldTemplate.properties) || [];
  const addedProps = newProps.
  map((prop) => !oldProps.includes(prop) ? prop : false).
  filter((p) => p);
  return _objectSpread(_objectSpread({}, newTemp), {}, { properties: addedProps });
}).
filter((t) => t);

const getTemplateDifference = (
currentSettingsTemplates,
settingsTemplates) =>
{
  const newTemplates = settingsTemplates.filter((temp) => {
    const oldTemplateIds = (currentSettingsTemplates === null || currentSettingsTemplates === void 0 ? void 0 : currentSettingsTemplates.map((oldTemp) => oldTemp.template)) || [];
    return !oldTemplateIds.includes(temp.template);
  });

  const combedNewTemplates = getTemplatesWithNewProps(settingsTemplates, currentSettingsTemplates);

  return newTemplates.concat(combedNewTemplates);
};

const fetchEntitiesBatch = async (query, limit = 100) =>
_entitiesModel.default.db.find(query).select('sharedId').limit(limit).sort({ _id: 1 }).exec();

const fetchEntitiesSharedIds = async (
template,
defaultLanguage,
batchSize = 2000) =>
{
  const BATCH_SIZE = batchSize;
  let query = {
    template,
    language: defaultLanguage };


  let sharedIds = [];

  let fetchedEntities = await fetchEntitiesBatch(query, BATCH_SIZE);
  while (fetchedEntities.length) {
    sharedIds = sharedIds.concat(fetchedEntities.map((e) => e.sharedId));
    query = _objectSpread(_objectSpread({},
    query), {}, {
      _id: { $gt: fetchedEntities[fetchedEntities.length - 1]._id } });

    // eslint-disable-next-line no-await-in-loop
    fetchedEntities = await fetchEntitiesBatch(query, BATCH_SIZE);
  }

  return sharedIds;
};

const createDefaultSuggestionsForFiles = async (
fileList,
template,
defaultLanguage) =>
{
  const blankSuggestions = [];
  fileList.forEach((file) => {
    const language = file.language ?
    _languages.default.get(file.language, 'ISO639_1') || defaultLanguage :
    defaultLanguage;
    template.properties.forEach((propertyName) => {
      if (file.entity) {
        blankSuggestions.push({
          language,
          fileId: file._id,
          entityId: file.entity,
          propertyName,
          status: 'ready',
          error: '',
          segment: '',
          suggestedValue: '',
          date: new Date().getTime() });

      }
    });
  });

  await _suggestions.Suggestions.saveMultiple(blankSuggestions);
};exports.createDefaultSuggestionsForFiles = createDefaultSuggestionsForFiles;

const createDefaultSuggestions = async (
settingsTemplates,
defaultLanguage,
batchSize) =>
{
  const templatesPromises = settingsTemplates.map(async (template) => {
    const entitiesSharedIds = await fetchEntitiesSharedIds(
    template.template,
    defaultLanguage,
    batchSize);


    const fetchedFiles = await _files.files.get(
    { entity: { $in: entitiesSharedIds }, type: 'document' },
    '_id entity language extractedMetadata');


    await createDefaultSuggestionsForFiles(fetchedFiles, template, defaultLanguage);
  });
  await Promise.all(templatesPromises);
};exports.createDefaultSuggestions = createDefaultSuggestions;

const saveConfigurations = async (settingsTemplates) => {var _currentSettings$lang, _currentSettings$lang2, _currentSettings$feat, _currentSettings$feat2;
  const currentSettings = await _settings.default.get();
  const defaultLanguage = currentSettings === null || currentSettings === void 0 ? void 0 : (_currentSettings$lang = currentSettings.languages) === null || _currentSettings$lang === void 0 ? void 0 : (_currentSettings$lang2 = _currentSettings$lang.find((lang) => lang.default)) === null || _currentSettings$lang2 === void 0 ? void 0 : _currentSettings$lang2.key;
  let currentSettingsTemplates = (_currentSettings$feat =
  currentSettings.features) === null || _currentSettings$feat === void 0 ? void 0 : (_currentSettings$feat2 = _currentSettings$feat.metadataExtraction) === null || _currentSettings$feat2 === void 0 ? void 0 : _currentSettings$feat2.templates;
  currentSettingsTemplates = currentSettingsTemplates || [];

  await deleteSuggestionsNotConfigured(currentSettingsTemplates, settingsTemplates);
  // @ts-ignore
  currentSettings.features.metadataExtraction.templates = settingsTemplates;
  await _settings.default.save(currentSettings);

  const newTemplates = getTemplateDifference(currentSettingsTemplates, settingsTemplates);
  await createDefaultSuggestions(newTemplates, defaultLanguage);

  return currentSettings;
};exports.saveConfigurations = saveConfigurations;