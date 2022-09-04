"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.emitSchemaTypes = exports.ModelStatus = exports.IXModelSchema = void 0;var _commonSchemas = require("./commonSchemas");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;let

ModelStatus;exports.ModelStatus = ModelStatus;(function (ModelStatus) {ModelStatus["processing"] = "processing";ModelStatus["failed"] = "failed";ModelStatus["ready"] = "ready";})(ModelStatus || (exports.ModelStatus = ModelStatus = {}));





const IXModelSchema = {
  type: 'object',
  additionalProperties: false,
  title: 'IXModelType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  required: ['propertyName', 'creationDate'],
  properties: {
    _id: _commonSchemas.objectIdSchema,
    propertyName: { type: 'string', minLength: 1 },
    creationDate: { type: 'number' },
    status: { type: 'string', enum: Object.values(ModelStatus), default: ModelStatus.processing },
    findingSuggestions: { type: 'boolean', default: true } } };exports.IXModelSchema = IXModelSchema;