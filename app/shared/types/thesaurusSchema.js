"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.thesaurusValueSchema = exports.thesaurusSchema = exports.emitSchemaTypes = void 0;

var _commonSchemas = require("./commonSchemas"); /** @format */

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const thesaurusValueSchema = {
  type: 'object',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  required: ['label'],
  additionalProperties: false,
  properties: {
    _id: _commonSchemas.objectIdSchema,
    id: {
      type: 'string',
      minLength: 1 },

    label: {
      type: 'string',
      minLength: 1 },

    values: {
      type: 'array',
      items: {
        type: 'object',
        required: ['label'],
        additionalProperties: false,
        properties: {
          _id: _commonSchemas.objectIdSchema,
          id: {
            type: 'string',
            minLength: 1 },

          label: {
            type: 'string',
            minLength: 1 },

          name: { type: 'string' } } } } } };exports.thesaurusValueSchema = thesaurusValueSchema;






const thesaurusSchema = {
  $async: true,
  type: 'object',
  required: ['name'],
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, thesaurusValueSchema },
  uniqueName: true,
  uniqueLabels: true,
  properties: {
    _id: _commonSchemas.objectIdSchema,
    type: { type: 'string', enum: ['thesauri'] },
    name: {
      type: 'string',
      minLength: 1 },

    enable_classification: { type: 'boolean' },
    values: {
      type: 'array',
      items: thesaurusValueSchema } } };exports.thesaurusSchema = thesaurusSchema;