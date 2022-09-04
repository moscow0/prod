"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.registerEventListeners = void 0;var _lodash = _interopRequireDefault(require("lodash"));

var _entities = _interopRequireDefault(require("../entities"));
var _EntityDeletedEvent = require("../entities/events/EntityDeletedEvent");
var _EntityUpdatedEvent = require("../entities/events/EntityUpdatedEvent");

var _FileCreatedEvent = require("../files/events/FileCreatedEvent");
var _FilesDeletedEvent = require("../files/events/FilesDeletedEvent");
var _FileUpdatedEvent = require("../files/events/FileUpdatedEvent");
var _settings = _interopRequireDefault(require("../settings"));
var _objectIndex = require("../../shared/data_utils/objectIndex");
var _shallowObjectDiff = require("../../shared/data_utils/shallowObjectDiff");
var _tsUtils = require("../../shared/tsUtils");

var _configurationManager = require("./configurationManager");
var _suggestions = require("./suggestions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const extractedMetadataChanged = async (existingEntity, newEntity) => {var _await$settings$get$f, _await$settings$get$f2;
  const extractionTemplates = (_await$settings$get$f = (await _settings.default.get({})).features) === null || _await$settings$get$f === void 0 ? void 0 : (_await$settings$get$f2 = _await$settings$get$f.metadataExtraction) === null || _await$settings$get$f2 === void 0 ? void 0 : _await$settings$get$f2.templates;
  if (!extractionTemplates || !newEntity.metadata) return false;
  const extractionTemplatesIndexed = (0, _objectIndex.objectIndex)(
  extractionTemplates,
  (d) => d.template.toString(),
  (d) => new Set(d.properties));

  if (!existingEntity || !(existingEntity.template.toString() in extractionTemplatesIndexed)) {
    return false;
  }
  const extractedProperties = extractionTemplatesIndexed[existingEntity.template.toString()];
  const changedMetadata = (0, _shallowObjectDiff.shallowObjectDiff)(newEntity.metadata, existingEntity.metadata || {}).all;
  if (newEntity.title !== existingEntity.title) changedMetadata.push('title');
  return changedMetadata.some((m) => extractedProperties.has(m));
};

const registerEventListeners = (eventsBus) => {
  eventsBus.on(_EntityUpdatedEvent.EntityUpdatedEvent, async ({ before, after, targetLanguageKey }) => {
    const originalDoc = before.find((doc) => doc.language === targetLanguageKey);
    const modifiedDoc = after.find((doc) => doc.language === targetLanguageKey);

    if (await extractedMetadataChanged(originalDoc, modifiedDoc)) {
      await _suggestions.Suggestions.updateStates({ entityId: originalDoc.sharedId });
    }
  });

  eventsBus.on(_FileCreatedEvent.FileCreatedEvent, async ({ newFile }) => {
    if (newFile.entity && newFile.type === 'document') {var _features$metadataExt, _features$metadataExt2;
      const { languages, features } = await _settings.default.get({}, 'languages features');
      const entityTemplateId = (
      await _entities.default.get({ sharedId: newFile.entity }, 'template'))[
      0].template.toString();
      const settingsTemplate = features === null || features === void 0 ? void 0 : (_features$metadataExt = features.metadataExtraction) === null || _features$metadataExt === void 0 ? void 0 : (_features$metadataExt2 = _features$metadataExt.templates) === null || _features$metadataExt2 === void 0 ? void 0 : _features$metadataExt2.find(
      (t) => t.template === entityTemplateId);

      if (settingsTemplate) {var _languages$find;
        const defaultLanguage = (0, _tsUtils.ensure)(languages === null || languages === void 0 ? void 0 : (_languages$find = languages.find((lang) => lang.default)) === null || _languages$find === void 0 ? void 0 : _languages$find.key);
        await (0, _configurationManager.createDefaultSuggestionsForFiles)([newFile], settingsTemplate, defaultLanguage);
      }
    }
  });

  eventsBus.on(_EntityDeletedEvent.EntityDeletedEvent, async ({ entity }) => {
    await _suggestions.Suggestions.deleteByEntityId(entity[0].sharedId);
  });

  eventsBus.on(_FileUpdatedEvent.FileUpdatedEvent, async ({ before, after }) => {
    if (!_lodash.default.isEqual(before.extractedMetadata, after.extractedMetadata)) {
      await _suggestions.Suggestions.updateStates({ fileId: after._id });
    }
  });

  eventsBus.on(_FilesDeletedEvent.FilesDeletedEvent, async ({ files }) => {
    await _suggestions.Suggestions.delete({ fileId: { $in: files.map((f) => f._id) } });
  });
};exports.registerEventListeners = registerEventListeners;