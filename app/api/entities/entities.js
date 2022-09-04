"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _eventsbus = require("../eventsbus");
var filesystem = _interopRequireWildcard(require("../files"));

var _permissionsContext = require("../permissions/permissionsContext");
var _relationships = _interopRequireDefault(require("../relationships/relationships"));
var _search = require("../search");
var _templates2 = _interopRequireDefault(require("../templates/templates"));
var _utils = require("../templates/utils");
var _date = _interopRequireDefault(require("../utils/date"));
var _filters = require("../utils/filters");
var _permissionSchema = require("../../shared/types/permissionSchema");
var _propertyTypes = require("../../shared/propertyTypes");
var _uniqueID = _interopRequireDefault(require("../../shared/uniqueID"));

var _denormalize = require("./denormalize");
var _entitiesModel = _interopRequireDefault(require("./entitiesModel"));
var _EntityUpdatedEvent = require("./events/EntityUpdatedEvent");
var _EntityDeletedEvent = require("./events/EntityDeletedEvent");
var _saveSelections = require("./metadataExtraction/saveSelections");
var _validateEntity = require("./validateEntity");
var _settings = _interopRequireDefault(require("../settings"));const _excluded = ["documentsFullText"],_excluded2 = ["withoutDocuments", "documentsFullText"],_excluded3 = ["diffMetadata"],_excluded4 = ["__v", "_id"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const FIELD_TYPES_TO_SYNC = [
_propertyTypes.propertyTypes.select,
_propertyTypes.propertyTypes.multiselect,
_propertyTypes.propertyTypes.date,
_propertyTypes.propertyTypes.multidate,
_propertyTypes.propertyTypes.multidaterange,
_propertyTypes.propertyTypes.nested,
_propertyTypes.propertyTypes.relationship,
_propertyTypes.propertyTypes.relationship,
_propertyTypes.propertyTypes.geolocation,
_propertyTypes.propertyTypes.numeric];


async function updateEntity(entity, _template, unrestricted = false) {
  const docLanguages = await this.getAllLanguages(entity.sharedId);

  if (
  docLanguages[0].template &&
  entity.template &&
  docLanguages[0].template.toString() !== entity.template.toString())
  {
    await Promise.all([
    this.deleteRelatedEntityFromMetadata(docLanguages[0]),
    _relationships.default.delete({ entity: entity.sharedId }, null, false)]);

  }
  const template = _template || { properties: [] };
  const toSyncProperties = template.properties.
  filter((p) => p.type.match(FIELD_TYPES_TO_SYNC.join('|'))).
  map((p) => p.name);
  const currentDoc = docLanguages.find((d) => d._id.toString() === entity._id.toString());
  const saveFunc = !unrestricted ? _entitiesModel.default.save : _entitiesModel.default.saveUnrestricted;

  const thesauriByKey = await _templates2.default.getRelatedThesauri(template);

  const result = await Promise.all(
  docLanguages.map(async (d) => {
    if (d._id.toString() === entity._id.toString()) {
      const toSave = _objectSpread({}, entity);
      delete toSave.published;
      delete toSave.permissions;

      if (entity.metadata) {
        toSave.metadata = await (0, _denormalize.denormalizeMetadata)(
        entity.metadata,
        d.language,
        template._id.toString(),
        thesauriByKey);

      }

      if (entity.suggestedMetadata) {
        toSave.suggestedMetadata = await (0, _denormalize.denormalizeMetadata)(
        entity.suggestedMetadata,
        entity.language,
        template._id.toString(),
        thesauriByKey);

      }

      const fullEntity = _objectSpread(_objectSpread({}, currentDoc), toSave);

      if (template._id) {
        await (0, _denormalize.denormalizeRelated)(fullEntity, template, currentDoc);
      }
      return saveFunc(toSave);
    }

    const toSave = _objectSpread({}, d);

    await ['metadata', 'suggestedMetadata'].reduce(async (prev, metadataParent) => {
      await prev;
      if (entity[metadataParent]) {
        toSave[metadataParent] = _objectSpread({}, toSave[metadataParent] || entity[metadataParent]);
        toSyncProperties.forEach((p) => {
          toSave[metadataParent][p] = entity[metadataParent][p] || [];
        });
        toSave[metadataParent] = await (0, _denormalize.denormalizeMetadata)(
        toSave[metadataParent],
        toSave.language,
        template._id.toString(),
        thesauriByKey);

      }
    }, Promise.resolve());

    if (typeof entity.template !== 'undefined') {
      toSave.template = entity.template;
    }

    if (typeof entity.generatedToc !== 'undefined') {
      toSave.generatedToc = entity.generatedToc;
    }

    if (template._id) {
      await (0, _denormalize.denormalizeRelated)(toSave, template, d);
    }

    return saveFunc(toSave);
  }));


  await _eventsbus.applicationEventsBus.emit(
  new _EntityUpdatedEvent.EntityUpdatedEvent({
    before: docLanguages,
    after: result,
    targetLanguageKey: entity.language }));



  return result;
}

async function createEntity(doc, languages, sharedId, docTemplate) {
  if (!docTemplate) docTemplate = await _templates2.default.getById(doc.template);
  const thesauriByKey = await _templates2.default.getRelatedThesauri(docTemplate);
  return Promise.all(
  languages.map(async (lang) => {
    const langDoc = _objectSpread({}, doc);
    const avoidIdDuplication = doc._id && !lang.default;
    if (avoidIdDuplication) {
      delete langDoc._id;
    }
    langDoc.language = lang.key;
    langDoc.sharedId = sharedId;
    langDoc.metadata = await (0, _denormalize.denormalizeMetadata)(
    langDoc.metadata,
    langDoc.language,
    langDoc.template.toString(),
    thesauriByKey);


    langDoc.suggestedMetadata = await (0, _denormalize.denormalizeMetadata)(
    langDoc.suggestedMetadata,
    langDoc.language,
    langDoc.template.toString(),
    thesauriByKey);


    return _entitiesModel.default.save(langDoc);
  }));

}

async function getEntityTemplate(doc, language) {
  let template = null;
  if (doc.template) {
    template = await _templates2.default.getById(doc.template);
  } else if (doc.sharedId) {
    const storedDoc = await this.getById(doc.sharedId, language);
    if (storedDoc) {
      template = await _templates2.default.getById(storedDoc.template);
    }
  }
  return template;
}

const uniqueMetadataObject = (elem, pos, arr) =>
elem.value && arr.findIndex((e) => e.value === elem.value) === pos;

function sanitize(doc, template) {
  if (!doc.metadata || !template) {
    return doc;
  }

  const metadata = template.properties.reduce((sanitizedMetadata, { type, name }) => {
    if (
    [_propertyTypes.propertyTypes.multiselect, _propertyTypes.propertyTypes.relationship].includes(type) &&
    sanitizedMetadata[name])
    {
      return Object.assign(sanitizedMetadata, {
        [name]: sanitizedMetadata[name].filter(uniqueMetadataObject) });

    }

    if ([_propertyTypes.propertyTypes.date, _propertyTypes.propertyTypes.multidate].includes(type) && sanitizedMetadata[name]) {
      return Object.assign(sanitizedMetadata, {
        [name]: sanitizedMetadata[name].filter((value) => value.value) });

    }

    if (
    [_propertyTypes.propertyTypes.daterange, _propertyTypes.propertyTypes.multidaterange].includes(type) &&
    sanitizedMetadata[name])
    {
      return Object.assign(sanitizedMetadata, {
        [name]: sanitizedMetadata[name].filter((value) => value.value.from || value.value.to) });

    }

    if (
    type === _propertyTypes.propertyTypes.select && (
    !sanitizedMetadata[name] || !sanitizedMetadata[name][0] || !sanitizedMetadata[name][0].value))
    {
      return Object.assign(sanitizedMetadata, { [name]: [] });
    }

    return sanitizedMetadata;
  }, doc.metadata);

  return Object.assign(doc, { metadata });
}

function updateMetadataWithDiff(metadata, diffMetadata) {
  if (!diffMetadata) {
    return metadata;
  }
  const newMetadata = _objectSpread({}, metadata);
  Object.keys(diffMetadata).forEach((p) => {
    const dm = diffMetadata[p];
    const toAdd = dm.added || [];
    const toRemove = dm.removed || [];
    if (!dm || toAdd.length + toRemove.length === 0) {
      return;
    }
    if (!newMetadata[p] || !newMetadata[p].length) {
      newMetadata[p] = toAdd;
      return;
    }
    newMetadata[p] = [
    ...newMetadata[p].filter((v) => !toRemove.map((vr) => vr.value).includes(v.value)),
    ...toAdd.filter((va) => !newMetadata[p].map((v) => v.value).includes(va.value))];

  });
  return newMetadata;
}

const validateWritePermissions = (ids, entitiesToUpdate) => {
  const user = _permissionsContext.permissionsContext.getUserInContext();
  if (!['admin', 'editor'].includes(user.role)) {
    const userIds = user.groups.map((g) => g._id.toString());
    userIds.push(user._id.toString());

    const allowedEntitiesToUpdate = entitiesToUpdate.filter((e) => {
      const writeGranted = (e.permissions || []).
      filter((p) => p.level === _permissionSchema.AccessLevels.WRITE).
      map((p) => p.refId).
      filter((id) => userIds.includes(id));
      return writeGranted.length > 0;
    });
    const uniqueIdsLength = allowedEntitiesToUpdate.map((e) => e.sharedId).filter(_filters.unique).length;
    if (uniqueIdsLength !== ids.length) {
      throw Error('Have not permissions granted to update the requested entities');
    }
  }
};

const withDocuments = async (entities, documentsFullText) => {
  const sharedIds = entities.map((entity) => entity.sharedId);
  const allFiles = await filesystem.files.get(
  { entity: { $in: sharedIds } },
  documentsFullText ? '+fullText ' : ' ');

  const idFileMap = new Map();
  allFiles.forEach((file) => {
    if (idFileMap.has(file.entity)) {
      idFileMap.get(file.entity).push(file);
    } else {
      idFileMap.set(file.entity, [file]);
    }
  });
  const result = entities.map((entity) => {
    // intentionally passing copies
    // consumers of the result do not handle it immutably (sometimes even delete data)
    // changes result in possibly breaking side-effects when file objects are shared between entities
    const entityFiles = idFileMap.has(entity.sharedId) ?
    idFileMap.get(entity.sharedId).map((file) => _objectSpread({}, file)) :
    [];
    entity.documents = entityFiles.filter((f) => f.type === 'document');
    entity.attachments = entityFiles.filter((f) => f.type === 'attachment');
    return entity;
  });
  return result;
};

const reindexEntitiesByTemplate = async (template, options) => {var _template$properties;
  const templateHasRelationShipProperty = (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.find(
  (p) => p.type === _propertyTypes.propertyTypes.relationship);

  if (options.reindex && (options.generatedIdAdded || !templateHasRelationShipProperty)) {
    return _search.search.indexEntities({ template: template._id });
  }
  return Promise.resolve();
};

const extendSelect = (select) => {
  if (!select) {
    return select;
  }
  if (typeof select === 'string') {
    return select.includes('+') ? `${select} +sharedId` : `${select} sharedId`;
  }
  if (Array.isArray(select)) {
    return select.concat(['sharedId']);
  }
  return Object.keys(select).length > 0 ? _objectSpread({ sharedId: 1 }, select) : select;
};var _default =

{
  denormalizeMetadata: _denormalize.denormalizeMetadata,
  sanitize,
  updateEntity,
  createEntity,
  getEntityTemplate,
  async save(_doc, { user, language }, options = {}) {
    const { updateRelationships = true, index = true, includeDocuments = true } = options;
    await (0, _validateEntity.validateEntity)(_doc);
    await (0, _saveSelections.saveSelections)(_doc);
    const doc = _doc;

    if (!doc.sharedId) {
      doc.user = user._id;
      doc.creationDate = _date.default.currentUTC();
      doc.published = false;
    }
    const sharedId = doc.sharedId || (0, _uniqueID.default)();
    const template = await this.getEntityTemplate(doc, language);
    let docTemplate = template;
    doc.editDate = _date.default.currentUTC();

    if (doc.sharedId) {
      await this.updateEntity(this.sanitize(doc, template), template);
    } else {
      const [{ languages }, [defaultTemplate]] = await Promise.all([
      _settings.default.get(),
      _templates2.default.get({ default: true })]);


      if (!doc.template) {
        doc.template = defaultTemplate._id;
        docTemplate = defaultTemplate;
      }
      doc.metadata = doc.metadata || {};
      await this.createEntity(this.sanitize(doc, docTemplate), languages, sharedId, docTemplate);
    }

    const [entity] = includeDocuments ?
    await this.getUnrestrictedWithDocuments({ sharedId, language }, '+permissions') :
    await this.getUnrestricted({ sharedId, language }, '+permissions');

    if (updateRelationships) {
      await _relationships.default.saveEntityBasedReferences(entity, language, docTemplate);
    }

    if (index) {
      await _search.search.indexEntities({ sharedId }, '+fullText');
    }

    return entity;
  },

  async denormalize(_doc, { user, language }) {
    await (0, _validateEntity.validateEntity)(_doc);
    const doc = _doc;
    if (!doc.sharedId) {
      doc.user = user._id;
      doc.creationDate = _date.default.currentUTC();
      doc.published = false;
    }

    doc.sharedId = doc.sharedId || (0, _uniqueID.default)();
    const [template, [defaultTemplate]] = await Promise.all([
    this.getEntityTemplate(doc, language),
    _templates2.default.get({ default: true })]);

    let docTemplate = template;
    if (!doc.template) {
      doc.template = defaultTemplate._id;
      doc.metadata = {};
      docTemplate = defaultTemplate;
    }
    const entity = this.sanitize(doc, docTemplate);
    entity.metadata = await (0, _denormalize.denormalizeMetadata)(
    entity.metadata,
    entity.language,
    entity.template.toString());

    entity.suggestedMetadata = await (0, _denormalize.denormalizeMetadata)(
    entity.suggestedMetadata,
    entity.language,
    entity.template.toString());

    return entity;
  },

  /** Bulk rebuild relationship-based metadata objects as {value = id, label: title}. */
  async bulkUpdateMetadataFromRelationships(query, language, limit = 200, reindex = true) {
    const process = async (offset, totalRows) => {
      if (offset >= totalRows) {
        return;
      }

      const entities = await this.get(query, 'sharedId', { skip: offset, limit });
      await this.updateMetdataFromRelationships(
      entities.map((entity) => entity.sharedId),
      language,
      reindex);

      await process(offset + limit, totalRows);
    };
    const totalRows = await this.count(query);
    await process(0, totalRows);
  },

  async getWithoutDocuments(query, select, options = {}) {
    return _entitiesModel.default.getUnrestricted(query, select, options);
  },

  async getUnrestricted(query, select, options) {
    const extendedSelect = extendSelect(select);
    return _entitiesModel.default.getUnrestricted(query, extendedSelect, options);
  },

  async getUnrestrictedWithDocuments(query, select, options = {}) {
    const { documentsFullText } = options,restOfOptions = _objectWithoutProperties(options, _excluded);
    const entities = await this.getUnrestricted(query, select, restOfOptions);
    return withDocuments(entities, documentsFullText);
  },

  async get(query, select, options = {}) {
    const { withoutDocuments, documentsFullText } = options,restOfOptions = _objectWithoutProperties(options, _excluded2);
    const extendedSelect = withoutDocuments ? select : extendSelect(select);
    const entities = await _entitiesModel.default.get(query, extendedSelect, restOfOptions);
    return withoutDocuments ? entities : withDocuments(entities, documentsFullText);
  },

  async getWithRelationships(query, select, pagination) {
    const entities = await this.get(query, select, pagination);
    return Promise.all(
    entities.map(async (entity) => {
      entity.relations = await _relationships.default.getByDocument(entity.sharedId, entity.language);
      return entity;
    }));

  },

  async getById(sharedId, language) {
    let doc;
    if (!language) {
      doc = await _entitiesModel.default.getById(sharedId);
    } else {
      doc = await _entitiesModel.default.get({ sharedId, language }).then((result) => result[0]);
    }
    return doc;
  },

  async saveMultiple(docs) {
    await docs.reduce(async (prev, doc) => {
      await prev;
      await (0, _validateEntity.validateEntity)(doc);
    }, Promise.resolve());

    const response = await _entitiesModel.default.saveMultiple(docs);
    await _search.search.indexEntities({ _id: { $in: response.map((d) => d._id) } }, '+fullText');
    return response;
  },

  async multipleUpdate(ids, values, params) {
    const { diffMetadata = {} } = values,pureValues = _objectWithoutProperties(values, _excluded3);

    const entitiesToUpdate = await this.getUnrestricted({ sharedId: { $in: ids } }, '+permissions');
    validateWritePermissions(ids, entitiesToUpdate);
    await Promise.all(
    ids.map(async (id) => {
      const entity = await entitiesToUpdate.find(
      (e) => e.sharedId === id && e.language === params.language);


      if (entity) {
        await this.save(_objectSpread(_objectSpread(_objectSpread({},

        entity),
        pureValues), {}, {
          metadata: updateMetadataWithDiff(_objectSpread(_objectSpread({},
          entity.metadata), pureValues.metadata),
          diffMetadata),

          permissions: entity.permissions || [] }),

        params,
        true,
        false);

      }
    }));


    await _search.search.indexEntities({ sharedId: { $in: ids } });
    return this.get({ sharedId: { $in: ids }, language: params.language });
  },

  getAllLanguages(sharedId) {
    return _entitiesModel.default.get({ sharedId });
  },

  countByTemplate(template, language) {
    const query = language ? { template, language } : { template };
    return _entitiesModel.default.count(query);
  },

  getByTemplate(template, language, limit, onlyPublished = true) {
    const query = _objectSpread({
      template,
      language },
    onlyPublished ? { published: true } : {});

    const queryLimit = limit ? { limit } : {};
    return _entitiesModel.default.get(query, ['title', 'icon', 'file', 'sharedId'], queryLimit);
  },

  /** Rebuild relationship-based metadata objects as {value = id, label: title}. */
  async updateMetdataFromRelationships(entities, language, reindex = true) {
    const entitiesToReindex = [];
    const _templates = await _templates2.default.get();
    await Promise.all(
    entities.map(async (entityId) => {
      const entity = await this.getById(entityId, language);
      const relations = await _relationships.default.getByDocument(entityId, language);

      if (entity && entity.template) {
        entity.metadata = entity.metadata || {};
        const template = _templates.find((t) => t._id.toString() === entity.template.toString());

        const relationshipProperties = template.properties.filter((p) => p.type === 'relationship');
        relationshipProperties.forEach((property) => {
          const relationshipsGoingToThisProperty = relations.filter(
          (r) =>
          r.template &&
          r.template.toString() === property.relationType.toString() && (
          !property.content || r.entityData.template.toString() === property.content));


          entity.metadata[property.name] = relationshipsGoingToThisProperty.map((r) => ({
            value: r.entity,
            label: r.entityData.title }));

        });
        if (relationshipProperties.length) {
          entitiesToReindex.push(entity.sharedId);
          await this.updateEntity(this.sanitize(entity, template), template, true);
        }
      }
    }));


    if (reindex) {
      await _search.search.indexEntities({ sharedId: { $in: entitiesToReindex } });
    }
  },

  /** Handle property deletion and renames. */
  async updateMetadataProperties(
  template,
  currentTemplate,
  language,
  options = { reindex: true, generatedIdAdded: false })
  {
    const actions = { $rename: {}, $unset: {} };
    template.properties = await (0, _utils.generateNames)(template.properties);
    template.properties.forEach((property) => {
      const currentProperty = currentTemplate.properties.find(
      (p) => p._id.toString() === (property._id || '').toString());

      if (currentProperty && currentProperty.name !== property.name) {
        actions.$rename[`metadata.${currentProperty.name}`] = `metadata.${property.name}`;
      }
    });

    currentTemplate.properties.forEach((property) => {
      if (!template.properties.find((p) => (p._id || '').toString() === property._id.toString())) {
        actions.$unset[`metadata.${property.name}`] = '';
      }
    });

    const noneToUnset = !Object.keys(actions.$unset).length;
    const noneToRename = !Object.keys(actions.$rename).length;

    if (noneToUnset) {
      delete actions.$unset;
    }
    if (noneToRename) {
      delete actions.$rename;
    }

    if (actions.$unset || actions.$rename) {
      await _entitiesModel.default.updateMany({ template: template._id }, actions);
    }

    await reindexEntitiesByTemplate(template, options);
    return this.bulkUpdateMetadataFromRelationships(
    { template: template._id, language },
    language,
    200,
    options.reindex);

  },

  async deleteIndexes(sharedIds) {
    const deleteIndexBatch = (offset, totalRows) => {
      const limit = 200;
      if (offset >= totalRows) {
        return Promise.resolve();
      }
      return this.get({ sharedId: { $in: sharedIds } }, null, { skip: offset, limit }).
      then((entities) => _search.search.bulkDelete(entities)).
      then(() => deleteIndexBatch(offset + limit, totalRows));
    };

    return this.count({ sharedId: { $in: sharedIds } }).then((totalRows) =>
    deleteIndexBatch(0, totalRows));

  },

  async deleteMultiple(sharedIds) {
    return this.deleteIndexes(sharedIds).then(() =>
    sharedIds.reduce(
    (previousPromise, sharedId) => previousPromise.then(() => this.delete(sharedId, false)),
    Promise.resolve()));


  },

  async delete(sharedId, deleteIndex = true) {
    const docs = await this.get({ sharedId });
    if (!docs.length) {
      return docs;
    }
    if (deleteIndex) {
      await Promise.all(docs.map((doc) => _search.search.delete(doc)));
    }
    try {
      await _entitiesModel.default.delete({ sharedId });
    } catch (e) {
      await _search.search.indexEntities({ sharedId }, '+fullText');
      throw e;
    }
    await Promise.all([
    _relationships.default.delete({ entity: sharedId }, null, false),
    filesystem.files.delete({ entity: sharedId }),
    this.deleteRelatedEntityFromMetadata(docs[0])]);


    await _eventsbus.applicationEventsBus.emit(new _EntityDeletedEvent.EntityDeletedEvent({ entity: docs }));

    return docs;
  },

  async removeValuesFromEntities(properties, template) {
    const query = { template, $or: [] };
    const changes = {};

    properties.forEach((prop) => {
      const propQuery = {};
      propQuery[`metadata.${prop}`] = { $exists: true };
      query.$or.push(propQuery);
      changes[`metadata.${prop}`] = [];
    });

    const entitiesToReindex = await this.get(query, { _id: 1 });
    await _entitiesModel.default.updateMany(query, { $set: changes });
    return _search.search.indexEntities({ _id: { $in: entitiesToReindex.map((e) => e._id.toString()) } });
  },

  /** Propagate the deletion metadata.value id to all entity metadata. */
  async deleteFromMetadata(deletedId, propertyContent, propTypes) {
    const allTemplates = await _templates2.default.get({ 'properties.content': propertyContent });
    const allProperties = allTemplates.reduce((m, t) => m.concat(t.properties), []);
    const properties = allProperties.filter((p) => propTypes.includes(p.type));
    const query = { $or: [] };
    const changes = {};
    query.$or = properties.
    filter(
    (p) => propertyContent && p.content && propertyContent.toString() === p.content.toString()).

    map((property) => {
      const p = {};
      p[`metadata.${property.name}.value`] = deletedId;
      changes[`metadata.${property.name}`] = { value: deletedId };
      return p;
    });
    if (!query.$or.length) {
      return;
    }
    const entities = await this.get(query, { _id: 1 });
    await _entitiesModel.default.updateMany(query, { $pull: changes });
    if (entities.length > 0) {
      await _search.search.indexEntities({ _id: { $in: entities.map((e) => e._id.toString()) } }, null, 1000);
    }
  },

  /** Propagate the deletion of a thesaurus entry to all entity metadata. */
  async deleteThesaurusFromMetadata(deletedId, thesaurusId) {
    await this.deleteFromMetadata(deletedId, thesaurusId, [
    _propertyTypes.propertyTypes.select,
    _propertyTypes.propertyTypes.multiselect]);

  },

  /** Propagate the deletion of a related entity to all entity metadata. */
  async deleteRelatedEntityFromMetadata(deletedEntity) {
    await this.deleteFromMetadata(deletedEntity.sharedId, deletedEntity.template, [
    _propertyTypes.propertyTypes.select,
    _propertyTypes.propertyTypes.multiselect,
    _propertyTypes.propertyTypes.relationship]);

  },

  async createThumbnail(entity) {
    const filePath = filesystem.uploadsPath(entity.file.filename);
    return new filesystem.PDF({ filename: filePath }).createThumbnail(entity._id.toString());
  },

  async generateNewEntitiesForLanguage(entities, language) {
    return Promise.all(
    entities.map(async (_entity) => {var _entity$template, _entity$template2;
      const { __v, _id } = _entity,entity = _objectWithoutProperties(_entity, _excluded4);
      entity.language = language;
      entity.metadata = await this.denormalizeMetadata(
      entity.metadata,
      language, (_entity$template =
      entity.template) === null || _entity$template === void 0 ? void 0 : _entity$template.toString());

      entity.suggestedMetadata = await this.denormalizeMetadata(
      entity.suggestedMetadata,
      language, (_entity$template2 =
      entity.template) === null || _entity$template2 === void 0 ? void 0 : _entity$template2.toString());

      return entity;
    }));

  },

  async addLanguage(language, limit = 50) {
    const [languageTranslationAlreadyExists] = await this.getUnrestrictedWithDocuments(
    { locale: language },
    null,
    {
      limit: 1 });


    if (languageTranslationAlreadyExists) {
      return;
    }

    const { languages } = await _settings.default.get();

    const defaultLanguage = languages.find((l) => l.default).key;
    const duplicate = async (offset, totalRows) => {
      if (offset >= totalRows) {
        return;
      }

      const entities = await this.getUnrestrictedWithDocuments(
      { language: defaultLanguage },
      '+permissions',
      {
        skip: offset,
        limit });


      const newLanguageEntities = await this.generateNewEntitiesForLanguage(entities, language);
      const newSavedEntities = await _entitiesModel.default.saveMultiple(newLanguageEntities);
      await _search.search.indexEntities({ _id: { $in: newSavedEntities.map((d) => d._id) } }, '+fullText');
      await newSavedEntities.reduce(async (previous, entity) => {
        await previous;
        if (entity.file) {
          return this.createThumbnail(entity);
        }
        return Promise.resolve();
      }, Promise.resolve());
      await duplicate(offset + limit, totalRows);
    };

    const totalRows = await this.count({ language: defaultLanguage });
    await duplicate(0, totalRows);
  },

  async removeLanguage(locale) {
    const deleteFilesByLanguage = (offset, totalRows) => {
      const limit = 200;
      if (offset >= totalRows) {
        return Promise.resolve();
      }

      return this.get({ language: locale }, null, { skip: offset, limit }).then(() =>
      deleteFilesByLanguage(offset + limit, totalRows));

    };

    return this.count({ language: locale }).
    then((totalRows) => deleteFilesByLanguage(0, totalRows)).
    then(() => _entitiesModel.default.delete({ language: locale })).
    then(() => _search.search.deleteLanguage(locale));
  },

  count: _entitiesModel.default.count.bind(_entitiesModel.default) };exports.default = _default;