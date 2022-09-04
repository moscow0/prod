"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateTranslation = exports.translationValueSchema = exports.translationSchema = exports.translationContextSchema = exports.emitSchemaTypes = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _commonSchemas = require("./types/commonSchemas");
var _tsUtils = require("./tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const ajv = new _ajv.default({ allErrors: true, removeAdditional: true });
ajv.addVocabulary(['tsType']);

const translationValueSchema = {
  title: 'TranslationValue',
  type: 'object',
  additionalProperties: false,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    key: { type: 'string', minLength: 1 },
    value: { type: 'string', minLength: 1 } } };exports.translationValueSchema = translationValueSchema;



const translationContextSchema = {
  title: 'TranslationContext',
  type: 'object',
  additionalProperties: false,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, translationValueSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    id: { type: 'string', minLength: 1 },
    label: { type: 'string', minLength: 1 },
    type: { type: 'string', minLength: 1 },
    values: {
      type: 'array',
      items: translationValueSchema } } };exports.translationContextSchema = translationContextSchema;




const translationSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  additionalProperties: false,
  title: 'TranslationType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, translationContextSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    locale: { type: 'string', minLength: 1 },
    contexts: {
      type: 'array',
      items: translationContextSchema } } };exports.translationSchema = translationSchema;




const validate = (0, _tsUtils.wrapValidator)(ajv.compile(translationSchema));

const validateTranslation = async (translation) =>
validate(_objectSpread({}, translation));exports.validateTranslation = validateTranslation;