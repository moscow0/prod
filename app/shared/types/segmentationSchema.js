"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateFile = exports.segmentationSchema = exports.emitSchemaTypes = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _commonSchemas = require("./commonSchemas");
var _tsUtils = require("../tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const ajv = new _ajv.default({ allErrors: true, removeAdditional: true });
ajv.addVocabulary(['tsType']);

const segmentationSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  additionalProperties: false,
  title: 'SegmentationType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    autoexpire: { oneOf: [{ type: 'number' }, { type: 'null' }] },
    fileID: _commonSchemas.objectIdSchema,
    filename: { type: 'string', minLength: 1 },
    xmlname: { type: 'string', minLength: 1 },
    status: { type: 'string', enum: ['processing', 'failed', 'ready'] },
    segmentation: {
      type: 'object',
      additionalProperties: false,
      properties: {
        page_width: { type: 'number' },
        page_height: { type: 'number' },
        paragraphs: {
          type: 'array',
          items: {
            type: 'object',
            additionalProperties: false,
            properties: {
              left: { type: 'number' },
              top: { type: 'number' },
              width: { type: 'number' },
              height: { type: 'number' },
              page_number: { type: 'number' },
              text: { type: 'string' } } } } } } } };exports.segmentationSchema = segmentationSchema;








const validate = (0, _tsUtils.wrapValidator)(ajv.compile(segmentationSchema));

const validateFile = async (file) =>
validate(_objectSpread({}, file));exports.validateFile = validateFile;