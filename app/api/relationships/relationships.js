"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _immutable = require("immutable");
var _lodash = _interopRequireDefault(require("lodash"));

var _templates = _interopRequireDefault(require("../templates"));
var _settings = _interopRequireDefault(require("../settings"));
var _relationtypes = _interopRequireDefault(require("../relationtypes"));
var _entities = _interopRequireDefault(require("../entities/entities"));
var _odm = require("../odm");
var _utils = require("../utils");

var _model = _interopRequireDefault(require("./model"));
var _search = require("../search");
var _utils2 = require("../templates/utils");

var _groupByRelationships = require("./groupByRelationships");
var _relationshipsHelpers = require("./relationshipsHelpers");




var _validateConnectionSchema = require("./validateConnectionSchema");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function excludeRefs(template) {
  delete template.refs;
  return template;
}

function getPropertiesToBeConnections(template) {
  const props = [];
  template.properties.forEach((prop) => {
    const repeated = props.find(
    (p) => p.content === prop.content && p.relationType === prop.relationType);


    if (prop.type === 'relationship' && !repeated) {
      props.push(prop);
    }
  });
  return props;
}

// Code mostly copied from react/Relationships/reducer/hubsReducer.js, abstract this QUICKLY!!!
const conformRelationships = (rows, parentEntitySharedId) => {
  let order = -1;
  const hubsObject = (0, _immutable.fromJS)(rows || []).reduce((hubs, row) => {
    let hubsImmutable = hubs;
    row.get('connections').forEach((connection) => {
      const hubId = connection.get('hub').toString();
      if (!hubsImmutable.has(hubId)) {
        order += 1;
        hubsImmutable = hubsImmutable.set(
        hubId,
        (0, _immutable.fromJS)({ hub: hubId, order, leftRelationship: {}, rightRelationships: {} }));

      }

      if (row.get('sharedId') === parentEntitySharedId) {
        hubsImmutable = hubsImmutable.setIn([hubId, 'leftRelationship'], connection);
      } else {
        const templateId = connection.get('template');
        if (!hubsImmutable.getIn([hubId, 'rightRelationships']).has(templateId)) {
          hubsImmutable = hubsImmutable.setIn(
          [hubId, 'rightRelationships', templateId],
          (0, _immutable.fromJS)([]));

        }
        const newConnection = connection.set('entity', row.delete('connections'));
        hubsImmutable = hubsImmutable.setIn(
        [hubId, 'rightRelationships', templateId],
        hubsImmutable.getIn([hubId, 'rightRelationships', templateId]).push(newConnection));

      }
    });

    return hubsImmutable;
  }, (0, _immutable.fromJS)({}));

  return hubsObject.reduce((hubs, hub) => {
    const rightRelationships = hub.
    get('rightRelationships').
    reduce((memo, relationshipsArray, template) => {
      const newMemo = memo.push(
      (0, _immutable.fromJS)({}).set('template', template).set('relationships', relationshipsArray));

      return newMemo;
    }, (0, _immutable.fromJS)([]));
    return hubs.set(hub.get('order'), hub.set('rightRelationships', rightRelationships));
  }, (0, _immutable.fromJS)([]));
};

const limitRelationshipResults = (results, entitySharedId, hubsLimit) => {
  const hubs = conformRelationships(results.rows, entitySharedId).toJS();
  results.totalHubs = hubs.length;
  results.requestedHubs = Number(hubsLimit);

  if (hubsLimit) {
    const hubsToReturn = hubs.slice(0, hubsLimit).map((h) => h.hub.toString());
    results.rows = results.rows.reduce((limitedResults, row) => {
      let rowInHubsToReturn = false;
      row.connections = row.connections.reduce((limitedConnections, connection) => {
        if (hubsToReturn.indexOf(connection.hub.toString()) !== -1) {
          limitedConnections.push(connection);
          rowInHubsToReturn = true;
        }
        return limitedConnections;
      }, []);

      if (rowInHubsToReturn) {
        limitedResults.push(row);
      }

      return limitedResults;
    }, []);
  }

  return results;
};

const determinePropertyValues = (entity, propertyName) => {
  const metadata = entity.metadata || {};
  const propertyValues = metadata[propertyName] || [];
  return propertyValues.map((mo) => mo.value);
};var _default =

{
  get(query, select, pagination) {
    return _model.default.get(query, select, pagination);
  },

  getById(id) {
    return _model.default.getById(id);
  },

  async getDocumentHubs(entity, file, onlyTextReferences) {
    let ownRelations;
    if (onlyTextReferences) {
      ownRelations = await _model.default.get(
      {
        entity,
        $and: [{ file: { $exists: true } }, { file }] },

      {},
      { limit: 300 });

    } else {
      ownRelations = await _model.default.get({
        entity,
        $or: [
        { $and: [{ file: { $exists: false } }] },
        file ? { $and: [{ file: { $exists: true } }, { file }] } : {}] });


    }
    const hubsIds = ownRelations.map((relationship) => relationship.hub);
    return _model.default.get({ hub: { $in: hubsIds } });
  },

  getByDocument(
  sharedId,
  language,
  unpublished = true,
  file = undefined,
  onlyTextReferences = false,
  unrestricted = true)
  {
    return this.getDocumentHubs(sharedId, file, onlyTextReferences).then((_relationships) => {
      const connectedEntitiesSharedId = _relationships.map((relationship) => relationship.entity);
      const method = unrestricted ? 'getUnrestrictedWithDocuments' : 'get';
      return _entities.default[method]({ sharedId: { $in: connectedEntitiesSharedId }, language }, [
      'template',
      'creationDate',
      'title',
      'file',
      'sharedId',
      'uploaded',
      'processed',
      'type',
      'published',
      'metadata',
      'icon']).
      then((_connectedDocuments) => {
        const connectedDocuments = _connectedDocuments.reduce((res, doc) => {
          res[doc.sharedId] = doc;
          return res;
        }, {});

        const relationshipsCollection = (0, _relationshipsHelpers.processRelationshipCollection)(
        _relationships,
        connectedDocuments,
        sharedId,
        unpublished);


        return relationshipsCollection;
      });
    });
  },

  getGroupsByConnection(id, language, options = {}) {
    return Promise.all([
    this.getByDocument(id, language, undefined, undefined, undefined, false),
    _templates.default.get(),
    _relationtypes.default.get()]).
    then(([references, templates, relationTypes]) => {
      const relevantReferences = (0, _groupByRelationships.filterRelevantRelationships)(
      references,
      id,
      language,
      options.user);

      const groupedReferences = (0, _groupByRelationships.groupRelationships)(relevantReferences, templates, relationTypes);

      if (options.excludeRefs) {
        groupedReferences.forEach((g) => {
          g.templates = g.templates.map(excludeRefs);
        });
      }
      return groupedReferences;
    });
  },

  getHub(hub) {
    return _model.default.get({ hub });
  },

  countByRelationType(typeId) {
    return _model.default.count({ template: typeId });
  },

  getAllLanguages(sharedId) {
    return _model.default.get({ sharedId });
  },

  async bulk(bulkData, language) {
    const saves = await this.save(bulkData.save, language);
    const deletions = await this.delete(
    { _id: { $in: bulkData.delete.map((r) => r._id) } },
    language);

    return { saves, deletions };
  },

  arrangeRelationshipGroups(_relationships) {
    if (!Array.isArray(_relationships)) return [[_relationships]];

    const [groups, ungrouped] = _lodash.default.partition(_relationships, (relOrGroup) =>
    Array.isArray(relOrGroup));


    if (ungrouped.length) groups.push(ungrouped);

    return groups;
  },

  async prepareRelationshipsToSave(_relationships, language) {
    const rels = this.arrangeRelationshipGroups(_relationships);
    const relsFlat = rels.flat();
    await (0, _validateConnectionSchema.validateConnectionSchema)(relsFlat);

    const existingEntities = new Set(
    (
    await _entities.default.get({
      sharedId: { $in: relsFlat.map((r) => r.entity) },
      language })).

    map((r) => r.sharedId));


    const relationships = rels.map((_group) => {
      let group = _group.filter((r) => existingEntities.has(r.entity));
      if (group.length === 1 && !group[0].hub) {
        throw (0, _utils.createError)('Single relationships must have a hub');
      }
      if (!(group.every((r) => !r.hub) || group.every((r) => !!r.hub))) {
        throw (0, _utils.createError)('In a group, either all relationships must have a hub or none of them.');
      }
      if (group.length && !group[0].hub) {
        const newHub = (0, _odm.generateID)();
        group = group.map((r) => _objectSpread(_objectSpread({}, r), {}, { hub: r.hub || newHub }));
      }
      return group;
    });

    return relationships.flat();
  },

  async appendRelatedEntityData(savedRelationships, language) {
    const relatedEntities = {};
    (
    await _entities.default.get(
    {
      sharedId: { $in: savedRelationships.map((r) => r.entity) },
      language },

    {},
    { withoutDocuments: true })).

    forEach((e) => {
      relatedEntities[e.sharedId] = e;
    });

    return savedRelationships.map((r) => _objectSpread(_objectSpread({}, r), {}, { entityData: relatedEntities[r.entity] }));
  },

  async save(_relationships, language, updateEntities = true) {
    if (!language) {
      throw (0, _utils.createError)('Language cant be undefined');
    }

    const relationships = await this.prepareRelationshipsToSave(_relationships, language);

    if (relationships.length === 0) {
      return [];
    }

    const savedRelationships = await _model.default.saveMultiple(
    relationships.map((r) =>
    r._id ? _objectSpread(_objectSpread({},

    r), {}, {
      template: r.template && r.template._id !== null ? r.template : null }) :

    r));



    const result = await this.appendRelatedEntityData(savedRelationships, language);

    if (updateEntities) {
      const touchedHubs = Array.from(new Set(relationships.map((r) => r.hub)));
      for (let i = 0; i < touchedHubs.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await this.updateEntitiesMetadataByHub(touchedHubs[i], language);
      }
    }
    return result;
  },

  async updateEntitiesMetadataByHub(hubId, language) {
    const hub = await this.getHub(hubId);
    const entitiesIds = hub.map((r) => r.entity);
    return _entities.default.updateMetdataFromRelationships(entitiesIds, language);
  },

  updateEntitiesMetadata(entitiesIds, language) {
    return _entities.default.updateMetdataFromRelationships(entitiesIds, language);
  },

  async generateCreatedReferences(property, newValues, entity, existingReferences) {
    const { relationType: propertyRelationType } = property;

    const toCreate = newValues.filter(
    (v) =>
    !(existingReferences[propertyRelationType] && existingReferences[propertyRelationType][v]));


    let newReferencesBase = [];
    let newReferences = [];
    if (toCreate.length) {
      const candidateHub = await (0, _relationshipsHelpers.guessRelationshipPropertyHub)(
      entity.sharedId,
      (0, _odm.generateID)(propertyRelationType));


      const hubId = candidateHub[0] && candidateHub[0]._id || (0, _odm.generateID)();
      newReferencesBase = candidateHub[0] ? [] : [{ entity: entity.sharedId, hub: hubId }];

      newReferences = toCreate.map((value) => ({
        entity: value,
        hub: hubId,
        template: (0, _odm.generateID)(propertyRelationType) }));

    }

    return { newReferencesBase, newReferences };
  },

  async separateCreatedDeletedReferences(property, entity, existingReferences) {
    const newValues = determinePropertyValues(entity, property.name);
    const newValueSet = new Set(newValues);

    const { relationType: propertyRelationType, content: propertyEntityType } = property;

    const { newReferencesBase, newReferences } = await this.generateCreatedReferences(
    property,
    newValues,
    entity,
    existingReferences);


    const toDelete = Object.entries(existingReferences[propertyRelationType] || {}).
    map((entry) => entry[1]).
    filter(
    (r) =>
    r.rightSide.entity !== entity.sharedId && (
    !propertyEntityType ||
    r.rightSide.entityData[0].template.toString() === propertyEntityType) &&
    !newValueSet.has(r.rightSide.entity)).

    map((r) => r.rightSide._id);

    return { newReferencesBase, newReferences, toDelete };
  },

  async prepareSaveEntityBasedReferences(entity, language, _template) {
    if (!language) throw (0, _utils.createError)('Language cant be undefined');
    if (!entity.template) return { relationshipProperties: [], existingReferences: {} };

    const template = _template || (await _templates.default.getById(entity.template));
    const relationshipProperties = getPropertiesToBeConnections(template);

    if (!relationshipProperties.length) {
      return { relationshipProperties, existingReferences: {} };
    }

    const existingReferences = await (0, _relationshipsHelpers.getEntityReferencesByRelationshipTypes)(
    entity.sharedId,
    relationshipProperties.map((p) => (0, _odm.generateID)(p.relationType)));


    return { relationshipProperties, existingReferences };
  },

  async saveEntityBasedReferences(entity, language, _template) {
    const { relationshipProperties, existingReferences } =
    await this.prepareSaveEntityBasedReferences(entity, language, _template);

    const relationshipsToCreate = [];
    const relationshipsToDelete = [];

    for (let i = 0; i < relationshipProperties.length; i += 1) {
      const { newReferencesBase, newReferences, toDelete } =
      // eslint-disable-next-line no-await-in-loop
      await this.separateCreatedDeletedReferences(
      relationshipProperties[i],
      entity,
      existingReferences);

      relationshipsToCreate.push(...newReferencesBase, ...newReferences);
      relationshipsToDelete.push(...toDelete);
    }

    if (relationshipsToCreate.length) await this.save(relationshipsToCreate, language, false);
    if (relationshipsToDelete.length) {
      await this.delete(
      {
        _id: { $in: relationshipsToDelete } },

      language,
      false);

    }
  },

  search(entitySharedId, query, language, user) {
    const hubsLimit = query.limit || 0;

    if (!language) {
      return Promise.reject((0, _utils.createError)('Language cant be undefined'));
    }
    return Promise.all([
    this.getByDocument(entitySharedId, language),
    _entities.default.getById(entitySharedId, language)]).
    then(([relationships, entity]) => {
      relationships.sort((a, b) =>
      (a.entity + a.hub.toString()).localeCompare(b.entity + b.hub.toString()));


      const filter = Object.keys(query.filter).reduce(
      (result, filterGroupKey) => result.concat(query.filter[filterGroupKey]),
      []);

      const filteredRelationships = relationships.filter(
      (relationship) =>
      !filter.length ||
      filter.includes(relationship.template + relationship.entityData.template));


      const ids = filteredRelationships.
      map((relationship) => relationship.entity).
      reduce((result, id) => {
        if (!result.includes(id) && id !== entitySharedId) {
          result.push(id);
        }
        return result;
      }, []);
      query.ids = ids.length ? ids : ['no_results'];
      query.includeUnpublished = true;
      query.limit = 9999;
      delete query.filter;

      return _search.search.search(query, language, user).then((results) => {
        results.rows.forEach((item) => {
          item.connections = filteredRelationships.filter(
          (relationship) => relationship.entity === item.sharedId);

        });

        if (results.rows.length) {
          let filteredRelationshipsHubs = results.rows.map((item) =>
          item.connections.map((relationship) => relationship.hub.toString()));

          filteredRelationshipsHubs = Array.prototype.concat(...filteredRelationshipsHubs);
          entity.connections = relationships.filter(
          (relationship) =>
          relationship.entity === entitySharedId &&
          filteredRelationshipsHubs.includes(relationship.hub.toString()));

          results.rows.push(entity);
        }

        return limitRelationshipResults(results, entitySharedId, hubsLimit);
      });
    });
  },

  async delete(relationQuery, _language, updateMetdata = true) {
    if (!relationQuery) {
      return Promise.reject((0, _utils.createError)('Cant delete without a condition'));
    }

    const unique = (elem, pos, arr) => arr.indexOf(elem) === pos;
    const relationsToDelete = await _model.default.get(relationQuery, 'hub');
    const hubsAffected = relationsToDelete.map((r) => r.hub).filter(unique);

    const { languages } = await _settings.default.get();
    const entitiesAffected = await _model.default.db.aggregate([
    { $match: { hub: { $in: hubsAffected } } },
    { $group: { _id: '$entity' } }]);


    const response = await _model.default.delete(relationQuery);

    const hubsToDelete = await _model.default.db.aggregate([
    { $match: { hub: { $in: hubsAffected } } },
    { $group: { _id: '$hub', length: { $sum: 1 } } },
    { $match: { length: { $lt: 2 } } }]);


    await _model.default.delete({ hub: { $in: hubsToDelete.map((h) => h._id) } });

    if (updateMetdata) {
      await Promise.all(
      languages.map((l) =>
      this.updateEntitiesMetadata(
      entitiesAffected.map((e) => e._id),
      l.key)));



    }

    return response;
  },

  async deleteTextReferences(sharedId, language) {
    const [{ _id, file = {} }] = await _entities.default.get({ sharedId, language }, 'file');
    const languagesWithSameFile = await _entities.default.count({
      'file.filename': file.filename,
      sharedId,
      _id: { $ne: _id } });

    if (!languagesWithSameFile && file.filename) {
      return this.delete({ filename: file.filename });
    }
    return Promise.resolve();
  },

  async updateMetadataProperties(template, currentTemplate) {
    const actions = {};
    actions.$rename = {};
    actions.$unset = {};
    template.properties = await (0, _utils2.generateNames)(template.properties);
    template.properties.forEach((property) => {
      const currentProperty = currentTemplate.properties.find((p) => p.id === property.id);
      if (currentProperty && currentProperty.name !== property.name) {
        actions.$rename[`metadata.${currentProperty.name}`] = `metadata.${property.name}`;
      }
    });
    currentTemplate.properties = currentTemplate.properties || [];
    currentTemplate.properties.forEach((property) => {
      if (!template.properties.find((p) => p.id === property.id)) {
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

    if (noneToRename && noneToUnset) {
      return Promise.resolve();
    }

    return _model.default.updateMany({ template }, actions);
  },

  count: _model.default.count.bind(_model.default),

  async swapTextReferencesFile(originalFileId, targetFileId) {
    return _model.default.updateMany({ file: originalFileId }, { $set: { file: targetFileId } });
  } };exports.default = _default;