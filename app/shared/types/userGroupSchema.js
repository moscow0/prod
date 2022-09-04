"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.userGroupSchema = exports.groupMemberSchema = exports.emitSchemaTypes = void 0;var _commonSchemas = require("./commonSchemas");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const groupMemberSchema = {
  type: 'object',
  additionalProperties: false,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    refId: _commonSchemas.objectIdSchema },

  required: ['refId'] };exports.groupMemberSchema = groupMemberSchema;

const userGroupSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  additionalProperties: false,
  uniqueName: true,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, groupMemberSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    name: { type: 'string' },
    members: {
      type: 'array',
      items: groupMemberSchema },

    __v: { type: 'number' } },

  required: ['name', 'members'] };exports.userGroupSchema = userGroupSchema;