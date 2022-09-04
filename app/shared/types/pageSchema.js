"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validatePage = exports.emitSchemaTypes = exports.PageSchema = void 0;var _ajv = _interopRequireDefault(require("ajv"));

var _templatesModel = _interopRequireDefault(require("../../api/templates/templatesModel"));

var _commonSchemas = require("./commonSchemas");
var _tsUtils = require("../tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);

ajv.addKeyword({
  keyword: 'validatePageIsNotEntityView',
  async: true,
  errors: true,
  type: 'object',
  async validate(_fields, page) {
    if (page.sharedId) {
      const templates = await _templatesModel.default.get({
        entityViewPage: page.sharedId });


      if (templates.length > 0 && !page.entityView) {
        const templatesTitles = templates.map((template) => template.name);
        throw new _ajv.default.ValidationError([
        {
          keyword: 'validatePageIsNotEntityView',
          schemaPath: '',
          params: { keyword: 'validatePageIsEntityView', _fields },
          message: `This page is in use by the following templates: ${templatesTitles.join(
          ', ')
          }`,
          instancePath: '.pages' }]);


      }
    }
    return true;
  } });


const PageSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  validatePageIsNotEntityView: true,
  additionalProperties: false,
  title: 'PageType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    title: { type: 'string' },
    language: { type: 'string' },
    sharedId: { type: 'string' },
    creationDate: { type: 'number' },
    metadata: {
      type: 'object',
      additionalProperties: false,
      definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
      properties: {
        _id: _commonSchemas.objectIdSchema,
        content: { type: 'string' },
        script: { type: 'string' } } },


    user: _commonSchemas.objectIdSchema,
    entityView: { type: 'boolean' },
    __v: { type: 'number' } },

  required: ['title'] };exports.PageSchema = PageSchema;


const validatePage = (0, _tsUtils.wrapValidator)(ajv.compile(PageSchema));exports.validatePage = validatePage;