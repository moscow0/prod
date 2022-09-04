"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateMetadataField = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _util = require("util");
var _tsUtils = require("../../../shared/tsUtils");
var _propertyTypes = require("../../../shared/propertyTypes");
var _ = _interopRequireDefault(require("./.."));
var _thesauri = _interopRequireDefault(require("../../thesauri"));




var _thesauri2 = require("../../thesauri/thesauri");
var _metadataValidators = require("./metadataValidators");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const hasValue = (value) => !(0, _util.isUndefined)(value) && !(0, _util.isNull)(value);

const validationError = (
error,
property,
entity) => _objectSpread({

  keyword: 'metadataMatchesTemplateProperties',
  schemaPath: '',
  params: {
    keyword: 'metadataMatchesTemplateProperties',
    data: entity[(0, _tsUtils.ensure)(property.name)] },

  instancePath: `.metadata['${property.name}']` },
error);


const validateRequired = (
property,
entity,
value = []) =>
{
  if (!_metadataValidators.validators.validateRequiredProperty(property, value)) {
    return [validationError({ message: _metadataValidators.customErrorMessages.required }, property, entity)];
  }
  return [];
};

const validateType = (
property,
entity,
value = []) =>
{
  //@ts-ignore
  if (hasValue(value) && _metadataValidators.validators[property.type] && !_metadataValidators.validators[property.type](value)) {
    //@ts-ignore
    return [validationError({ message: _metadataValidators.customErrorMessages[property.type] }, property, entity)];
  }
  return [];
};

const compareThesaurusValue = async (property, value) => {
  const thesaurus = await _thesauri.default.getById(property.content);
  const thesaurusValues = (0, _thesauri2.flatThesaurusValues)(thesaurus).map((v) => v.id);

  return value.filter((v) => v.value && !thesaurusValues.includes(String(v.value)));
};

const validateDictionariesForeignIds = async (
property,
entity,
value = []) =>
{
  const usesDictionary =
  property.type === _propertyTypes.propertyTypes.select || property.type === _propertyTypes.propertyTypes.multiselect;

  if (value && usesDictionary) {
    const diff = await compareThesaurusValue(property, value);
    if (diff.length) {
      return [
      validationError(
      { message: _metadataValidators.customErrorMessages.dictionary_wrong_foreing_id, data: diff },
      property,
      entity)];


    }
  }
  return [];
};

const validateRelationshipForeignIds = async (
property,
entity,
value = []) =>
{
  if (value && property.type === _propertyTypes.propertyTypes.relationship) {
    const valueIds = value.map((v) => v.value);

    const entityIds = (
    await _.default.getUnrestrictedWithDocuments(_objectSpread({

      sharedId: { $in: valueIds } },
    property.content && { template: property.content }),

    { sharedId: 1 })).

    map((v) => v.sharedId);

    const diff = value.filter((v) => !entityIds.includes(String(v.value)));

    if (diff.length) {
      return [
      validationError(
      { message: _metadataValidators.customErrorMessages.relationship_wrong_foreign_id, data: diff },
      property,
      entity)];


    }
  }
  return [];
};

const validateSameRelationshipsMatch = (
property,
entity,
template,
value = []) =>
{var _template$properties;
  if (property.type !== _propertyTypes.propertyTypes.relationship) {
    return [];
  }

  const sameProps =
  ((_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.filter(
  (p) => {var _p$content, _property$content, _p$relationType, _property$relationTyp;return (
      p.type === _propertyTypes.propertyTypes.relationship &&
      ((_p$content = p.content) === null || _p$content === void 0 ? void 0 : _p$content.toString()) === ((_property$content = property.content) === null || _property$content === void 0 ? void 0 : _property$content.toString()) &&
      ((_p$relationType = p.relationType) === null || _p$relationType === void 0 ? void 0 : _p$relationType.toString()) === ((_property$relationTyp = property.relationType) === null || _property$relationTyp === void 0 ? void 0 : _property$relationTyp.toString()));})) ||
  [];

  const valid = sameProps.every((p) => {var _entity$metadata;
    const otherProp = ((_entity$metadata = entity.metadata) === null || _entity$metadata === void 0 ? void 0 : _entity$metadata[p.name]) || [];
    return (
      (otherProp === null || otherProp === void 0 ? void 0 : otherProp.length) === (value === null || value === void 0 ? void 0 : value.length) &&
      value.every((mo) => otherProp === null || otherProp === void 0 ? void 0 : otherProp.find((_mo) => _mo.value === mo.value)));

  });

  return valid ?
  [] :
  [
  validationError(
  { message: _metadataValidators.customErrorMessages.relationship_values_should_match },
  property,
  entity)];


};

const validateFieldSize = (
property,
entity,
value = []) =>
{
  if (
  property.type !== _propertyTypes.propertyTypes.markdown &&
  hasValue(value) &&
  !_metadataValidators.validators.validateLuceneBytesLimit(value))
  {
    return [validationError({ message: _metadataValidators.customErrorMessages.length_exceeded }, property, entity)];
  }
  return [];
};

const validateMetadataField = async (
property,
entity,
template) =>
{var _entity$metadata2;
  const value = (_entity$metadata2 = entity.metadata) === null || _entity$metadata2 === void 0 ? void 0 : _entity$metadata2[(0, _tsUtils.ensure)(property.name)];

  const errors = [
  ...validateRequired(property, entity, value),
  ...validateType(property, entity, value),
  ...validateFieldSize(property, entity, value),
  ...validateSameRelationshipsMatch(property, entity, template, value),
  ...(await validateRelationshipForeignIds(property, entity, value)),
  ...(await validateDictionariesForeignIds(property, entity, value))];


  if (errors.length) {
    throw new _ajv.default.ValidationError(errors);
  }
};exports.validateMetadataField = validateMetadataField;