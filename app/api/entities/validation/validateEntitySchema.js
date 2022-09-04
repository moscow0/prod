"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateEntitySchema = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _entitySchema = require("../../../shared/types/entitySchema");
var _tsUtils = require("../../../shared/tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);

const validateEntitySchema = async (entity) =>
(0, _tsUtils.wrapValidator)(ajv.compile(_entitySchema.entitySchema))(entity);exports.validateEntitySchema = validateEntitySchema;