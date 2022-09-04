"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Suggestions = void 0;var _entities = _interopRequireDefault(require("../entities/entities"));
var _files = require("../files/files");
var _settings = _interopRequireDefault(require("../settings/settings"));
var _IXSuggestionsModel = require("./IXSuggestionsModel");


var _suggestionSchema = require("../../shared/types/suggestionSchema");

var _eventListeners = require("./eventListeners");
var _pipelineStages = require("./pipelineStages");





var _stats = require("./stats");
var _updateState = require("./updateState");const _excluded = ["language"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}







const updateEntitiesWithSuggestion = async (
allLanguages,
acceptedSuggestion,
suggestion) =>
{
  const query = allLanguages ?
  { sharedId: acceptedSuggestion.sharedId } :
  { sharedId: acceptedSuggestion.sharedId, _id: acceptedSuggestion.entityId };
  const storedEntities = await _entities.default.get(query, '+permissions');
  const entitiesToUpdate =
  suggestion.propertyName !== 'title' ?
  storedEntities.map((entity) => _objectSpread(_objectSpread({},
  entity), {}, {
    metadata: _objectSpread(_objectSpread({},
    entity.metadata), {}, {
      [suggestion.propertyName]: [{ value: suggestion.suggestedValue }] }),

    permissions: entity.permissions || [] })) :

  storedEntities.map((entity) => _objectSpread(_objectSpread({},
  entity), {}, {
    title: suggestion.suggestedValue }));


  await _entities.default.saveMultiple(entitiesToUpdate);
};

const updateExtractedMetadata = async (suggestion) => {
  const fetchedFiles = await _files.files.get({ _id: suggestion.fileId });

  if (!(fetchedFiles !== null && fetchedFiles !== void 0 && fetchedFiles.length)) return Promise.resolve();
  const file = fetchedFiles[0];

  file.extractedMetadata = file.extractedMetadata ? file.extractedMetadata : [];
  const extractedMetadata = file.extractedMetadata.find(
  (em) => em.name === suggestion.propertyName);


  if (!extractedMetadata) {var _suggestion$suggested;
    file.extractedMetadata.push({
      name: suggestion.propertyName,
      timestamp: Date(),
      selection: {
        text: suggestion.suggestedText || ((_suggestion$suggested = suggestion.suggestedValue) === null || _suggestion$suggested === void 0 ? void 0 : _suggestion$suggested.toString()),
        selectionRectangles: suggestion.selectionRectangles } });


  } else {var _suggestion$suggested2;
    extractedMetadata.timestamp = Date();
    extractedMetadata.selection = {
      text: suggestion.suggestedText || ((_suggestion$suggested2 = suggestion.suggestedValue) === null || _suggestion$suggested2 === void 0 ? void 0 : _suggestion$suggested2.toString()),
      selectionRectangles: suggestion.selectionRectangles };

  }
  return _files.files.save(file);
};

const Suggestions = {
  getById: async (id) => _IXSuggestionsModel.IXSuggestionsModel.getById(id),
  getByEntityId: async (sharedId) => _IXSuggestionsModel.IXSuggestionsModel.get({ entityId: sharedId }),

  get: async (filter, options) => {var _options$page;
    const offset = options && options.page ? options.page.size * (options.page.number - 1) : 0;
    const DEFAULT_LIMIT = 30;
    const limit = ((_options$page = options.page) === null || _options$page === void 0 ? void 0 : _options$page.size) || DEFAULT_LIMIT;
    const { languages: setLanguages } = await _settings.default.get();

    const { language } = filter,filters = _objectWithoutProperties(filter, _excluded);

    const count = await _IXSuggestionsModel.IXSuggestionsModel.db.
    aggregate([{ $match: _objectSpread(_objectSpread({}, filters), {}, { status: { $ne: 'processing' } }) }, { $count: 'count' }]).
    then((result) => result !== null && result !== void 0 && result.length ? result[0].count : 0);

    const suggestions = await _IXSuggestionsModel.IXSuggestionsModel.db.aggregate([
    { $match: _objectSpread(_objectSpread({}, filters), {}, { status: { $ne: 'processing' } }) },
    { $sort: { date: 1, state: -1 } },
    { $skip: offset },
    { $limit: limit },
    ...(0, _pipelineStages.getEntityStage)(setLanguages),
    ...(0, _pipelineStages.getCurrentValueStage)(),
    ...(0, _pipelineStages.getFileStage)(),
    ...(0, _pipelineStages.getLabeledValueStage)(),
    {
      $project: {
        entityId: '$entity._id',
        sharedId: '$entity.sharedId',
        entityTitle: '$entity.title',
        fileId: 1,
        language: 1,
        propertyName: 1,
        suggestedValue: 1,
        segment: 1,
        currentValue: 1,
        state: 1,
        page: 1,
        date: 1,
        error: 1,
        labeledValue: 1,
        selectionRectangles: 1 } }]);




    const totalPages = Math.ceil(count / limit);
    return { suggestions, totalPages };
  },

  getStats: _stats.getStats,

  updateStates: _updateState.updateStates,

  setObsolete: async (query) =>
  _IXSuggestionsModel.IXSuggestionsModel.updateMany(query, { $set: { state: _suggestionSchema.SuggestionState.obsolete } }),

  save: async (suggestion) => Suggestions.saveMultiple([suggestion]),

  saveMultiple: async (_suggestions) => {
    const toSave = [];
    const toSaveAndUpdate = [];
    _suggestions.forEach((s) => {
      if (s.status === 'failed') {
        toSave.push(_objectSpread(_objectSpread({}, s), {}, { state: _suggestionSchema.SuggestionState.error }));
      } else if (s.status === 'processing') {
        toSave.push(_objectSpread(_objectSpread({}, s), {}, { state: _suggestionSchema.SuggestionState.processing }));
      } else {
        toSaveAndUpdate.push(s);
      }
    });
    await _IXSuggestionsModel.IXSuggestionsModel.saveMultiple(toSave);
    const toUpdate = await _IXSuggestionsModel.IXSuggestionsModel.saveMultiple(toSaveAndUpdate);
    if (toUpdate.length) await (0, _updateState.updateStates)({ _id: { $in: toUpdate.map((s) => s._id) } });
  },

  accept: async (acceptedSuggestion, allLanguages) => {
    const suggestion = await _IXSuggestionsModel.IXSuggestionsModel.getById(acceptedSuggestion._id);
    if (!suggestion) {
      throw new Error('Suggestion not found');
    }
    if (suggestion.error !== '') {
      throw new Error('Suggestion has an error');
    }
    await updateEntitiesWithSuggestion(allLanguages, acceptedSuggestion, suggestion);
    await updateExtractedMetadata(suggestion);
    await Suggestions.updateStates({ _id: acceptedSuggestion._id });
  },

  deleteByEntityId: async (sharedId) => {
    await _IXSuggestionsModel.IXSuggestionsModel.delete({ entityId: sharedId });
  },

  deleteByProperty: async (propertyName, templateId) => {
    const cursor = _IXSuggestionsModel.IXSuggestionsModel.db.find({ propertyName }).cursor();

    // eslint-disable-next-line no-await-in-loop
    for (let suggestion = await cursor.next(); suggestion; suggestion = await cursor.next()) {var _entity$template;
      const sharedId = suggestion.entityId;
      // eslint-disable-next-line no-await-in-loop
      const [entity] = await _entities.default.getUnrestricted({ sharedId });
      if (entity && ((_entity$template = entity.template) === null || _entity$template === void 0 ? void 0 : _entity$template.toString()) === templateId) {
        // eslint-disable-next-line no-await-in-loop
        await _IXSuggestionsModel.IXSuggestionsModel.delete({ _id: suggestion._id });
      }
    }
  },
  delete: _IXSuggestionsModel.IXSuggestionsModel.delete.bind(_IXSuggestionsModel.IXSuggestionsModel),
  registerEventListeners: _eventListeners.registerEventListeners };exports.Suggestions = Suggestions;