"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.emitSchemaTypes = exports.SuggestionsQueryFilterSchema = exports.SuggestionState = exports.IXSuggestionsStatsQuerySchema = exports.IXSuggestionsQuerySchema = exports.IXSuggestionSchema = exports.EntitySuggestionSchema = void 0;var _commonSchemas = require("./commonSchemas");




var _propertyTypes = require("../propertyTypes");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;let

SuggestionState;exports.SuggestionState = SuggestionState;(function (SuggestionState) {SuggestionState["labelMatch"] = "Match / Label";SuggestionState["labelMismatch"] = "Mismatch / Label";SuggestionState["valueMatch"] = "Match / Value";SuggestionState["valueMismatch"] = "Mismatch / Value";SuggestionState["empty"] = "Empty / Empty";SuggestionState["obsolete"] = "Obsolete";SuggestionState["labelEmpty"] = "Empty / Label";SuggestionState["valueEmpty"] = "Empty / Value";SuggestionState["error"] = "Error";SuggestionState["processing"] = "Processing";SuggestionState["emptyMismatch"] = "Mismatch / Empty";})(SuggestionState || (exports.SuggestionState = SuggestionState = {}));













const IXSuggestionSchema = {
  type: 'object',
  additionalProperties: false,
  title: 'IXSuggestionType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, propertyTypes: _propertyTypes.propertyTypes, propertyValueSchema: _commonSchemas.propertyValueSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    entityId: { type: 'string', minLength: 1 },
    fileId: _commonSchemas.objectIdSchema,
    propertyName: { type: 'string', minLength: 1 },
    suggestedValue: _commonSchemas.propertyValueSchema,
    suggestedText: { type: 'string' },
    segment: { type: 'string', minLength: 1 },
    language: { type: 'string', minLength: 1 },
    page: { type: 'number', minimum: 1 },
    status: { type: 'string', enum: ['processing', 'failed', 'ready'] },
    state: { type: 'string', enum: Object.values(SuggestionState) },
    date: { type: 'number' },
    error: { type: 'string' },
    selectionRectangles: _commonSchemas.selectionRectanglesSchema },

  required: ['propertyName', 'entityId', 'suggestedValue', 'segment', 'language'] };exports.IXSuggestionSchema = IXSuggestionSchema;


const EntitySuggestionSchema = {
  type: 'object',
  additionalProperties: false,
  title: 'EntitySuggestionType',
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, propertyTypes: _propertyTypes.propertyTypes, propertyValueSchema: _commonSchemas.propertyValueSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    entityId: { type: 'string', minLength: 1 },
    sharedId: { type: 'string', minLength: 1 },
    fileId: { type: 'string', minLength: 1 },
    entityTitle: { type: 'string', minLength: 1 },
    propertyName: { type: 'string', minLength: 1 },
    suggestedValue: _commonSchemas.propertyValueSchema,
    currentValue: _commonSchemas.propertyValueSchema,
    labeledValue: _commonSchemas.propertyValueSchema,
    selectionRectangles: _commonSchemas.selectionRectanglesSchema,
    segment: { type: 'string', minLength: 1 },
    language: { type: 'string', minLength: 1 },
    state: { type: 'string', enum: Object.values(SuggestionState) },
    page: { type: 'number', minimum: 1 },
    status: { type: 'string', enum: ['processing', 'failed', 'ready'] },
    date: { type: 'number' } },

  required: [
  'propertyName',
  'entityTitle',
  'entityId',
  'sharedId',
  'fileId',
  'suggestedValue',
  'segment',
  'language',
  'state',
  'date'] };exports.EntitySuggestionSchema = EntitySuggestionSchema;



const SuggestionsQueryFilterSchema = {
  type: 'object',
  title: 'IXSuggestionsFilter',
  additionalProperties: false,
  properties: {
    language: { type: 'string' },
    propertyName: { type: 'string' },
    state: { type: 'string', enum: Object.values(SuggestionState) } },

  required: ['propertyName'] };exports.SuggestionsQueryFilterSchema = SuggestionsQueryFilterSchema;


const IXSuggestionsQuerySchema = {
  type: 'object',
  title: 'IXSuggestionsQuery',
  additionalProperties: false,
  definitions: { SuggestionsQueryFilterSchema },
  properties: {
    filter: SuggestionsQueryFilterSchema,
    page: {
      type: 'object',
      additionalProperties: false,
      properties: {
        number: { type: 'number', minimum: 1 },
        size: { type: 'number', minimum: 1, maximum: 500 } } } } };exports.IXSuggestionsQuerySchema = IXSuggestionsQuerySchema;





const IXSuggestionsStatsQuerySchema = {
  title: 'IXSuggestionsStatsQuery',
  additionalProperties: false,
  definitions: { SuggestionsQueryFilterSchema },
  properties: {
    propertyName: { type: 'string' } },

  required: ['propertyName'] };exports.IXSuggestionsStatsQuerySchema = IXSuggestionsStatsQuerySchema;