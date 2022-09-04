"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.prepareAssets = void 0;
var _Metadata = require("../Metadata");
var _lodash = require("lodash");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




























const pickEntityFields = (entity) =>
(0, _lodash.pick)(entity, [
'title',
'sharedId',
'creationDate',
'editDate',
'language',
'template',
'inheritedProperty']);


const metadataFields = (property) => {
  switch (property.type) {
    case 'geolocation':
      return { displayValue: 'value[0]', value: 'value' };
    default:
      return { displayValue: 'value', value: ['timestamp', 'originalValue', 'value'] };}

};

const propertyDisplayType = (property) => {
  switch (property.type) {
    case 'relationship':
      return 'inherit';
    default:
      return property.type;}

};

const formatPropertyValue = (
target,
metadataField) =>
{
  const availableProperties = (0, _lodash.pick)(target, metadataField.value);
  const firstValue =
  (0, _lodash.isObject)(availableProperties) && !(0, _lodash.isEmpty)(availableProperties) ?
  (0, _lodash.take)((0, _lodash.toPairs)(availableProperties), 1)[0][1] :
  target;
  return firstValue;
};

const formatProperty = (item) => {
  const values = !(0, _lodash.isArray)(item.value) || !item.value.length ? [item] : item.value;
  const formattedItem = values.map((target) => {
    const relatedEntity = pickEntityFields(target.relatedEntity);
    const metadataField = metadataFields(item);
    const value = formatPropertyValue(target, metadataField);
    return _objectSpread({
      displayValue: (0, _lodash.get)(target, metadataField.displayValue, value),
      value,
      name: item.name,
      type: propertyDisplayType(item) },
    !(0, _lodash.isEmpty)(relatedEntity) ? { reference: relatedEntity } : {});

  });
  return formattedItem;
};

const formatAggregationsMetadata = (metadata) =>
Object.entries(metadata).reduce((memo, [propertyName, values]) => {
  const formmatedValues = values.map((value) =>
  value.label && value.label.length ? value.label : value.value);

  const result = { [propertyName]: formmatedValues };
  return _objectSpread(_objectSpread({}, memo), result);
}, {});

const aggregateByTemplate = (
relations,
relationship,
inheritingProperties) =>

relations.reduce((groupedRelations, relation) => {
  const { template } = relation.entityData;
  const groupName = `${relationship.name}-${template}`;
  const relationMetadata = (0, _lodash.pick)(
  relation.entityData.metadata,
  inheritingProperties[template]);

  const metadata = formatAggregationsMetadata(relationMetadata || {});
  const relatedEntity = {
    title: relation.entityData.title,
    sharedId: relation.entityData.sharedId,
    metadata };

  return !(0, _lodash.has)(groupedRelations, groupName) ? _objectSpread(_objectSpread({},
  groupedRelations), {}, { [groupName]: [relatedEntity] }) : _objectSpread(_objectSpread({},
  groupedRelations), {}, { [groupName]: [...groupedRelations[groupName], relatedEntity] });
}, {});

const getInheritingProperties = (templates, entityTemplate) =>
templates.reduce((inheriting, template) => {var _entityTemplate$prope;
  const inheritedProperties = (_entityTemplate$prope = entityTemplate.properties) === null || _entityTemplate$prope === void 0 ? void 0 : _entityTemplate$prope.
  map((entityProperty) => {var _template$properties;
    if (!(entityProperty !== null && entityProperty !== void 0 && entityProperty.inherit)) return undefined;
    const inheritingPropertyName = (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.find(
    (property) => {var _entityProperty$inher;return (property === null || property === void 0 ? void 0 : property._id) === (entityProperty === null || entityProperty === void 0 ? void 0 : (_entityProperty$inher = entityProperty.inherit) === null || _entityProperty$inher === void 0 ? void 0 : _entityProperty$inher.property);});

    return inheritingPropertyName === null || inheritingPropertyName === void 0 ? void 0 : inheritingPropertyName.name;
  }).
  filter((value) => !!value);
  return inheritedProperties !== null && inheritedProperties !== void 0 && inheritedProperties.length ? _objectSpread(_objectSpread({},
  inheriting), {}, { [template._id]: inheritedProperties }) :
  inheriting;
}, {});

const filterInheritedRelations = (
entity,
inheritingProperties) =>
{
  const targetEntities = (0, _lodash.flatMap)(entity.metadata, (property) =>
  property.value && property.value.length ?
  (0, _lodash.flatMap)(property.value, (value) => value.relatedEntity) :
  []).

  filter((v) => v).
  map((relatedEntity) => relatedEntity.sharedId);
  return entity.relations.filter(
  (relation) =>
  relation.entityData &&
  (0, _lodash.has)(inheritingProperties, relation.entityData.template) &&
  targetEntities.includes(relation.entityData.sharedId));

};

const aggregateRelationships = (
entity,
relationTypes,
entityTemplate,
_templates) =>
{
  if (!entity.relations || !entity.relations.length || !entityTemplate) {
    return {};
  }
  const templates = _templates.
  filter((template) => (template === null || template === void 0 ? void 0 : template.get('_id')) !== entityTemplate.get('_id')).
  toJS();

  const inheritingProperties = getInheritingProperties(templates, entityTemplate.toJS());
  const filteredRelations = filterInheritedRelations(entity, inheritingProperties);
  const relationshipGroups = (0, _lodash.groupBy)(filteredRelations, 'template');

  const namedRelationshipGroups = Object.entries(relationshipGroups).reduce(
  (aggregated, [relationshipId, relations]) => {
    const relationship = relationTypes.find(({ _id }) => _id === relationshipId);
    if (relationship) {
      const aggregatedByTemplate = aggregateByTemplate(
      relations,
      relationship,
      inheritingProperties);

      return _objectSpread(_objectSpread({}, aggregated), aggregatedByTemplate);
    }
    return aggregated;
  },
  {});


  return namedRelationshipGroups;
};

const formatEntityData = (
formattedEntity,
relationTypes,
entityTemplate,
templates) =>
{
  const entity = pickEntityFields(formattedEntity);

  const formattedMetadata = formattedEntity.metadata.reduce((memo, property) => {
    const formattedProperty = formatProperty(property);
    return _objectSpread(_objectSpread({}, memo), {}, { [property.name]: formattedProperty });
  }, {});

  const relationshipAggregations = aggregateRelationships(
  formattedEntity,
  relationTypes,
  entityTemplate,
  templates);


  return _objectSpread(_objectSpread({},
  entity), {}, {
    metadata: formattedMetadata,
    inherited_relationships: relationshipAggregations });

};

const formatEntity = (formattedEntity) => {
  const originalMetadata = formattedEntity.metadata;
  const metadata = originalMetadata.reduce(
  (memo, property) => _objectSpread(_objectSpread({}, memo), {}, { [property.name]: property }),
  {});

  return _objectSpread(_objectSpread({}, formattedEntity), {}, { metadata });
};

const prepareAssets = (
entityRaw,
template,
state,
relationTypes) =>
{
  const formattedEntity = _Metadata.formater.prepareMetadata(entityRaw, state.templates, state.thesauris);
  const entity = formatEntity(formattedEntity);
  const entityData = formatEntityData(formattedEntity, relationTypes, template, state.templates);
  return { entity, entityRaw, entityData, template: template.toJS() };
};exports.prepareAssets = prepareAssets;