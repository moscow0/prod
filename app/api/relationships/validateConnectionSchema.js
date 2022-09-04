"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateConnectionSchema = void 0;
var _ajv = _interopRequireDefault(require("ajv"));
var _tsUtils = require("../../shared/tsUtils");
var _connectionSchema = require("../../shared/types/connectionSchema");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable max-statements */

const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);

const validateConnectionSchema = (0, _tsUtils.wrapValidator)(
ajv.compile({ $async: true, type: 'array', items: _connectionSchema.connectionSchema }));exports.validateConnectionSchema = validateConnectionSchema;