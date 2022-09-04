"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.entityWithFilesSchema = exports.entitySchema = exports.emitSchemaTypes = void 0;var _commonSchemas = require("./commonSchemas");
var _fileSchema = require("./fileSchema");
var _permissionSchema = require("./permissionSchema");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const entitySchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  definitions: {
    objectIdSchema: _commonSchemas.objectIdSchema,
    metadataSchema: _commonSchemas.metadataSchema,
    permissionSchema: _permissionSchema.permissionSchema },

  properties: {
    _id: _commonSchemas.objectIdSchema,
    sharedId: { type: 'string', minLength: 1 },
    language: { type: 'string', minLength: 1 },
    mongoLanguage: { type: 'string' },
    title: { type: 'string', minLength: 1 },
    template: _commonSchemas.objectIdSchema,
    published: { type: 'boolean' },
    generatedToc: { type: 'boolean' },
    icon: {
      type: 'object',
      additionalProperties: false,
      properties: {
        _id: { anyOf: [{ type: 'string' }, { type: 'null' }] },
        label: { type: 'string' },
        type: { type: 'string' } } },


    creationDate: { type: 'number' },
    user: _commonSchemas.objectIdSchema,
    metadata: _commonSchemas.metadataSchema,
    suggestedMetadata: _commonSchemas.metadataSchema,
    permissions: {
      type: 'array',
      items: _permissionSchema.permissionSchema } } };exports.entitySchema = entitySchema;




const entityWithFilesSchema = {
  type: 'object',

  definitions: {
    fileSchema: _fileSchema.fileSchema,
    objectIdSchema: _commonSchemas.objectIdSchema,
    metadataSchema: _commonSchemas.metadataSchema },

  allOf: [
  entitySchema,
  {
    properties: {
      attachments: {
        type: 'array',
        items: _fileSchema.fileSchema },

      documents: {
        type: 'array',
        items: _fileSchema.fileSchema } } }] };exports.entityWithFilesSchema = entityWithFilesSchema;