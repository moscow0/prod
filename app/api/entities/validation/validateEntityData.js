"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateEntityData = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _templatesModel = _interopRequireDefault(require("../../templates/templatesModel"));
var _tsUtils = require("../../../shared/tsUtils");



var _validation_error = _interopRequireDefault(require("ajv/dist/runtime/validation_error"));

var _validateMetadataField = require("./validateMetadataField");
var _metadataValidators = require("./metadataValidators");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);

const validateField =
(entity, template) =>
async (err, property) => {
  try {
    await (0, _validateMetadataField.validateMetadataField)(property, entity, template);
    return err;
  } catch (e) {
    const currentErrors = await err;
    if (e instanceof _validation_error.default) {
      return currentErrors.concat(e.errors);
    }
    throw e;
  }
};

const validateFields = async (template, entity) => {
  const errors = await (template.properties || []).reduce(
  validateField(entity, template),
  Promise.resolve([]));

  return errors;
};

const validateAllowedProperties = async (template, entity) => {
  const errors = [];
  const allowedProperties = (template.properties || []).map((p) => p.name);
  Object.keys(entity.metadata || {}).forEach((propName) => {
    if (!allowedProperties.includes(propName)) {
      errors.push({
        keyword: 'metadataMatchesTemplateProperties',
        schemaPath: '',
        params: { keyword: 'metadataMatchesTemplateProperties', data: entity },
        message: _metadataValidators.customErrorMessages.property_not_allowed,
        instancePath: `.metadata['${propName}']` });

    }
  });
  return errors;
};

ajv.addKeyword({
  keyword: 'metadataMatchesTemplateProperties',
  async: true,
  errors: true,
  type: 'object',
  async validate(_fields, entity) {
    if (!entity.template) {
      return true;
    }

    const [template = {}] = await _templatesModel.default.get({ _id: entity.template });

    const errors = [
    ...(await validateFields(template, entity)),
    ...(await validateAllowedProperties(template, entity))];


    if (errors.length) {
      throw new _ajv.default.ValidationError(errors);
    }

    return true;
  } });


ajv.addKeyword({
  keyword: 'validateTemplateExists',
  async: true,
  errors: true,
  type: 'object',
  async validate(fields, entity) {
    if (!entity.template) {
      return true;
    }
    const [template] = await _templatesModel.default.get({ _id: entity.template });
    if (!template) {
      throw new _ajv.default.ValidationError([
      {
        keyword: 'metadataMatchesTemplateProperties',
        schemaPath: '',
        params: { keyword: 'metadataMatchesTemplateProperties', fields },
        message: 'template does not exist',
        instancePath: '.template' }]);


    }
    return true;
  } });


ajv.addKeyword({
  keyword: 'stringMeetsLuceneMaxLimit',
  errors: false,
  type: 'string',
  validate(_schema, data) {
    return _metadataValidators.validators.validateLuceneBytesLimit(data);
  } });


const dataSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  metadataMatchesTemplateProperties: true,
  validateTemplateExists: true,
  properties: {
    title: { type: 'string', minLength: 1, stringMeetsLuceneMaxLimit: true } } };



const validateEntityData = async (entity) =>
(0, _tsUtils.wrapValidator)(ajv.compile(dataSchema))(entity);exports.validateEntityData = validateEntityData;