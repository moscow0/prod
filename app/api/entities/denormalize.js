"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.denormalizeMetadata = denormalizeMetadata;exports.denormalizeThesauriLabelInMetadata = exports.denormalizeRelated = void 0;

var _translations = _interopRequireDefault(require("../i18n/translations"));
var _search = require("../search");
var _templates = _interopRequireDefault(require("../templates"));
var _dictionariesModel = _interopRequireDefault(require("../thesauri/dictionariesModel"));



var _translate = _interopRequireWildcard(require("../../shared/translate"));

var _util = require("util");

var _entitiesModel = _interopRequireDefault(require("./entitiesModel"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}













const metadataChanged = (
newMetadata = [],
oldMetadata = []) =>

newMetadata.every(
(elem, index) => {var _oldMetadata$index;return JSON.stringify(elem.value) !== JSON.stringify((_oldMetadata$index = oldMetadata[index]) === null || _oldMetadata$index === void 0 ? void 0 : _oldMetadata$index.value);}) ||
newMetadata.length !== oldMetadata.length;

const diffEntities = (newEntity, oldEntity) => {var _newEntity$icon, _oldEntity$icon;return (
    Object.keys(newEntity.metadata || {}).reduce(
    (theDiff, key) => {var _newEntity$metadata, _oldEntity$metadata;
      if (metadataChanged(newEntity === null || newEntity === void 0 ? void 0 : (_newEntity$metadata = newEntity.metadata) === null || _newEntity$metadata === void 0 ? void 0 : _newEntity$metadata[key], oldEntity === null || oldEntity === void 0 ? void 0 : (_oldEntity$metadata = oldEntity.metadata) === null || _oldEntity$metadata === void 0 ? void 0 : _oldEntity$metadata[key])) {var _newEntity$metadata2;
        // eslint-disable-next-line no-param-reassign
        theDiff.metadata = theDiff.metadata || {};
        // eslint-disable-next-line no-param-reassign
        theDiff.metadata[key] = (_newEntity$metadata2 = newEntity.metadata) === null || _newEntity$metadata2 === void 0 ? void 0 : _newEntity$metadata2[key];
      }
      return theDiff;
    }, _objectSpread(_objectSpread({},

    newEntity.title !== oldEntity.title ? { title: oldEntity.title } : {}),
    ((_newEntity$icon = newEntity.icon) === null || _newEntity$icon === void 0 ? void 0 : _newEntity$icon._id) !== ((_oldEntity$icon = oldEntity.icon) === null || _oldEntity$icon === void 0 ? void 0 : _oldEntity$icon._id) ? { icon: oldEntity.icon } : {})));};



function getPropertiesThatChanged(entityDiff, template) {
  const diffPropNames = Object.keys(entityDiff.metadata || {});
  const metadataPropsThatChanged = (template.properties || []).
  filter((p) => diffPropNames.includes(p.name)).
  map((p) => {var _p$_id;return (_p$_id = p._id) === null || _p$_id === void 0 ? void 0 : _p$_id.toString();}).
  filter(_util.isString);

  if (entityDiff.title) {
    metadataPropsThatChanged.push('label');
  }
  if (entityDiff.icon) {
    metadataPropsThatChanged.push('icon');
  }
  return metadataPropsThatChanged;
}

const uniqueByNameAndInheritProperty = (updates) =>
Object.values(
updates.reduce(

(memo, update) => _objectSpread(_objectSpread({}, memo), {}, { [update.propertyName + update.inheritProperty]: update }), {}));


const oneJumpRelatedProps = async (contentId) => {
  const anyEntityOrDocument = '';
  const contentIds = [contentId, anyEntityOrDocument];
  return (await _templates.default.get({ 'properties.content': { $in: contentIds } })).reduce(


  (props, template) =>
  props.concat(
  (template.properties || []).
  filter((p) => {var _p$content;return contentIds.includes(((_p$content = p.content) === null || _p$content === void 0 ? void 0 : _p$content.toString()) || '');}).
  map((p) => _objectSpread(_objectSpread({},
  p), {}, {
    template: template._id.toString() }))),


  []);

};

const oneJumpUpdates = async (
contentId,
metadataPropsThatChanged,
titleOrIconChanged) =>
{
  let updates = (await oneJumpRelatedProps(contentId)).map((p) => {var _p$inherit, _p$inherit2;return _objectSpread(_objectSpread({
      propertyName: p.name,
      inheritProperty: (_p$inherit = p.inherit) === null || _p$inherit === void 0 ? void 0 : _p$inherit.property },
    (_p$inherit2 = p.inherit) !== null && _p$inherit2 !== void 0 && _p$inherit2.property ? { template: p.template } : {}), {}, {
      filterPath: `metadata.${p.name}.value`,
      valuePath: `metadata.${p.name}` });});


  if (metadataPropsThatChanged !== null && metadataPropsThatChanged !== void 0 && metadataPropsThatChanged.length && !titleOrIconChanged) {
    updates = updates.filter((u) => metadataPropsThatChanged.includes(u.inheritProperty || ''));
  }
  return updates;
};

const twoJumpsRelatedProps = async (contentId) => {
  const properties = (await _templates.default.get({ 'properties.content': contentId })).
  reduce((m, t) => m.concat(t.properties || []), []).
  filter((p) => {var _p$content2;return contentId === ((_p$content2 = p.content) === null || _p$content2 === void 0 ? void 0 : _p$content2.toString());});

  const contentIds = properties.
  map((p) => {var _p$_id2;return (_p$_id2 = p._id) === null || _p$_id2 === void 0 ? void 0 : _p$_id2.toString();}).
  filter((v) => !!v);

  return (await _templates.default.get({ 'properties.inherit.property': { $in: contentIds } })).reduce(


  (props, template) =>
  props.concat(
  (template.properties || []).filter((p) => {var _p$inherit3;return contentIds.includes(((_p$inherit3 = p.inherit) === null || _p$inherit3 === void 0 ? void 0 : _p$inherit3.property) || '');})),

  []);

};

const twoJumpUpdates = async (contentId) =>
(await twoJumpsRelatedProps(contentId)).map((p) => {var _p$inherit4;return {
    propertyName: p.name,
    inheritProperty: (_p$inherit4 = p.inherit) === null || _p$inherit4 === void 0 ? void 0 : _p$inherit4.property,
    filterPath: `metadata.${p.name}.inheritedValue.value`,
    valuePath: `metadata.${p.name}.$[].inheritedValue` };});


async function denormalizationUpdates(contentId, templatePropertiesThatChanged) {
  const titleOrIconChanged =
  templatePropertiesThatChanged.includes('label') ||
  templatePropertiesThatChanged.includes('icon');

  const metadataPropsThatChanged = templatePropertiesThatChanged.filter(
  (v) => !['icon', 'label'].includes(v));


  return uniqueByNameAndInheritProperty([
  ...(await oneJumpUpdates(contentId, metadataPropsThatChanged, titleOrIconChanged)),
  ...(titleOrIconChanged ? await twoJumpUpdates(contentId) : [])]);

}

const reindexUpdates = async (
value,
language,
updates) =>
{
  if (updates.length) {
    await _search.search.indexEntities({
      $and: [{ language }, { $or: updates.map((update) => ({ [update.filterPath]: value })) }] });

  }
};

const denormalizeRelated = async (
newEntity,
template,
existingEntity = {}) =>
{
  if (!newEntity.title || !newEntity.language || !newEntity.sharedId) {
    throw new Error('denormalization requires an entity with title, sharedId and language');
  }

  const entityDiff = diffEntities(newEntity, existingEntity);
  const templatePropertiesThatChanged = getPropertiesThatChanged(entityDiff, template);
  if (templatePropertiesThatChanged.length === 0) {
    return false;
  }

  const updates = await denormalizationUpdates(
  template._id.toString(),
  templatePropertiesThatChanged);


  await Promise.all(
  updates.map(async (update) => {var _newEntity$metadata3;
    const inheritProperty = (template.properties || []).find(
    (p) => {var _p$_id3;return update.inheritProperty === ((_p$_id3 = p._id) === null || _p$_id3 === void 0 ? void 0 : _p$_id3.toString());});


    return _entitiesModel.default.updateMany(_objectSpread({

      [update.filterPath]: newEntity.sharedId,
      language: newEntity.language },
    update.template ? { template: update.template } : {}),

    {
      $set: _objectSpread({
        [`${update.valuePath}.$[valueIndex].label`]: newEntity.title,
        [`${update.valuePath}.$[valueIndex].icon`]: newEntity.icon },
      inheritProperty ?
      {
        [`${update.valuePath}.$[valueIndex].inheritedValue`]: (_newEntity$metadata3 =
        newEntity.metadata) === null || _newEntity$metadata3 === void 0 ? void 0 : _newEntity$metadata3[inheritProperty.name] } :

      {}) },


    { arrayFilters: [{ 'valueIndex.value': newEntity.sharedId }] });

  }));


  return reindexUpdates(newEntity.sharedId, newEntity.language, updates);
};exports.denormalizeRelated = denormalizeRelated;

const denormalizeThesauriLabelInMetadata = async (
valueId,
newLabel,
thesaurusId,
language,
parent) =>
{
  const updates = await denormalizationUpdates(thesaurusId.toString(), ['label']);
  await Promise.all(
  updates.map(async (entry) =>
  _entitiesModel.default.updateMany(_objectSpread({

    [entry.filterPath]: valueId,
    language },
  entry.template ? { template: entry.template } : {}),

  {
    $set: _objectSpread({
      [`${entry.valuePath}.$[valueIndex].label`]: newLabel },
    parent ?
    {
      [`${entry.valuePath}.$[valueIndex].parent.label`]: parent.label } :

    {}) },


  { arrayFilters: [{ 'valueIndex.value': valueId }] })));




  await reindexUpdates(valueId, language, updates);
};exports.denormalizeThesauriLabelInMetadata = denormalizeThesauriLabelInMetadata;

const denormalizeSelectProperty = async (
property,
values,
thesauriByKey,
translation) =>
{var _thesaurus$values;
  const thesaurus = thesauriByKey ?
  thesauriByKey[property.content] :
  await _dictionariesModel.default.getById(property.content);
  if (!thesaurus) {
    return undefined;
  }

  const context = (0, _translate.getContext)(translation, property.content);

  const flattenValues = [];
  (_thesaurus$values = thesaurus.values) === null || _thesaurus$values === void 0 ? void 0 : _thesaurus$values.forEach((dv) => {
    if (dv.values) {
      dv.values.map((v) => _objectSpread(_objectSpread({}, v), {}, { parent: dv })).forEach((v) => flattenValues.push(v));
    } else {
      flattenValues.push(dv);
    }
  });

  return values.map((value) => {
    const denormalizedValue = _objectSpread({}, value);
    const thesaurusValue = flattenValues.find((v) => v.id === denormalizedValue.value);

    if (thesaurusValue && thesaurusValue.label) {
      denormalizedValue.label = (0, _translate.default)(context, thesaurusValue.label, thesaurusValue.label);
    }

    if (thesaurusValue && thesaurusValue.parent) {
      denormalizedValue.parent = {
        value: thesaurusValue.parent.id,
        label: (0, _translate.default)(context, thesaurusValue.parent.label, thesaurusValue.parent.label) };

    }
    return denormalizedValue;
  });
};

const denormalizeInheritedProperty = (
property,
value,
partner,
allTemplates) =>
{var _metadata;
  const partnerTemplate = allTemplates.find(
  (t) => t._id.toString() === partner.template.toString());


  const inheritedProperty = partnerTemplate.properties.find(
  (p) => p._id && p._id.toString() === property.inherit.property.toString());


  return _objectSpread(_objectSpread({},
  value), {}, {
    inheritedValue: ((_metadata = partner.metadata) === null || _metadata === void 0 ? void 0 : _metadata[inheritedProperty.name]) || [],
    inheritedType: inheritedProperty.type });

};

const denormalizeRelationshipProperty = async (
property,
values,
language,
allTemplates) =>
{
  const partners = await _entitiesModel.default.getUnrestricted({
    sharedId: { $in: values.map((value) => value.value) },
    language });


  const partnersBySharedId = {};
  partners.forEach((partner) => {
    partnersBySharedId[partner.sharedId] = partner;
  });

  return values.map((value) => {
    let denormalizedValue = _objectSpread({}, value);

    const partner = partnersBySharedId[denormalizedValue.value];

    if (partner && partner.title) {
      denormalizedValue.label = partner.title;
      denormalizedValue.icon = partner.icon;
      denormalizedValue.type = partner.file ? 'document' : 'entity';
    }

    if (property.inherit && property.inherit.property && partner) {
      denormalizedValue = denormalizeInheritedProperty(
      property,
      denormalizedValue,
      partner,
      allTemplates);

    }

    return denormalizedValue;
  });
};

const validateValuesAreDenormalizable = (values) => {
  if (!Array.isArray(values)) {
    throw new Error('denormalizeMetadata received non-array prop!');
  }

  if (values.some((value) => !value.hasOwnProperty('value'))) {
    throw new Error('denormalizeMetadata received non-value prop!');
  }
};

const denormalizeProperty = async (
property,
values,
language,
{
  thesauriByKey,
  translation,
  allTemplates }) =>





{
  validateValuesAreDenormalizable(values);

  if (!property) {
    return values;
  }

  if (property.content && ['select', 'multiselect'].includes(property.type)) {
    return denormalizeSelectProperty(property, values, thesauriByKey, translation);
  }

  if (property.type === 'relationship') {
    return denormalizeRelationshipProperty(property, values, language, allTemplates);
  }

  return values;
};

async function denormalizeMetadata(
metadata,
language,
templateId,
thesauriByKey)
{
  if (!metadata) {
    return metadata;
  }

  const translation = (await _translations.default.get({ locale: language }))[0];
  const allTemplates = await _templates.default.get();

  const template = allTemplates.find((t) => t._id.toString() === templateId);
  if (!template) {
    return metadata;
  }

  const denormalizedProperties =


  await Promise.all(
  Object.keys(metadata).map(async (propertyName) => {var _template$properties;return {
      propertyName,
      denormalizedValue: await denormalizeProperty((_template$properties =
      template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.find((p) => p.name === propertyName),
      metadata[propertyName],
      language,
      { thesauriByKey, translation, allTemplates }) };}));




  const denormalizedMetadata = {};
  denormalizedProperties.forEach(({ propertyName, denormalizedValue }) => {
    denormalizedMetadata[propertyName] = denormalizedValue;
  });

  return denormalizedMetadata;
}