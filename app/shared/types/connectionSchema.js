"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.emitSchemaTypes = exports.connectionSchema = void 0;var _commonSchemas = require("./commonSchemas");
var _entitySchema = require("./entitySchema");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const connectionSchema = {
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  type: 'object',
  additionalProperties: false,
  properties: {
    _id: _commonSchemas.objectIdSchema,
    hub: _commonSchemas.objectIdSchema,
    template: {
      oneOf: [{ type: 'null' }, _commonSchemas.objectIdSchema] },

    file: _commonSchemas.objectIdSchema,
    entity: { type: 'string' },
    entityData: _entitySchema.entitySchema,
    reference: {
      type: 'object',
      additionalProperties: false,
      required: ['text', 'selectionRectangles'],
      properties: {
        text: { type: 'string' },
        selectionRectangles: {
          type: 'array',
          minItems: 1,
          items: {
            type: 'object',
            additionalProperties: false,
            required: ['top', 'left', 'width', 'height', 'page'],
            properties: {
              top: { type: 'number' },
              left: { type: 'number' },
              width: { type: 'number' },
              height: { type: 'number' },
              page: { type: 'string' } } } } } } } };exports.connectionSchema = connectionSchema;