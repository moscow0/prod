"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateFile = exports.fileSchema = exports.emitSchemaTypes = exports.TypeOfFile = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _commonSchemas = require("./commonSchemas");
var _tsUtils = require("../tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const ajv = new _ajv.default({ allErrors: true, removeAdditional: true });
ajv.addVocabulary(['tsType']);var

TypeOfFile;exports.TypeOfFile = TypeOfFile;(function (TypeOfFile) {TypeOfFile["custom"] = "custom";TypeOfFile["document"] = "document";TypeOfFile["thumbnail"] = "thumbnail";TypeOfFile["attachment"] = "attachment";})(TypeOfFile || (exports.TypeOfFile = TypeOfFile = {}));






const fileSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  additionalProperties: false,
  title: 'FileType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, tocSchema: _commonSchemas.tocSchema, extractedMetadataSchema: _commonSchemas.extractedMetadataSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    entity: { type: 'string', minLength: 1 },
    originalname: { type: 'string', minLength: 1 },
    filename: { type: 'string', minLength: 1 },
    mimetype: { type: 'string', minLength: 1 },
    size: { type: 'number' },
    creationDate: { type: 'number' },
    language: { type: 'string', minLength: 1 },
    type: { type: 'string', enum: Object.values(TypeOfFile) },
    url: { type: 'string', pattern: '^https://' },
    status: { type: 'string', enum: ['processing', 'failed', 'ready'] },
    totalPages: { type: 'number' },
    generatedToc: { type: 'boolean' },
    uploaded: { type: 'boolean' },
    fullText: {
      type: 'object',
      additionalProperties: false,
      patternProperties: {
        '^[0-9]+$': { type: 'string' } } },


    toc: {
      type: 'array',
      items: _commonSchemas.tocSchema },

    extractedMetadata: { type: 'array', items: _commonSchemas.extractedMetadataSchema } } };exports.fileSchema = fileSchema;



const validate = (0, _tsUtils.wrapValidator)(ajv.compile(fileSchema));

const validateFile = async (file) => validate(_objectSpread({}, file));exports.validateFile = validateFile;