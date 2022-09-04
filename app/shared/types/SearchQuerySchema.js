"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.emitSchemaTypes = exports.SearchQuerySchema = exports.RangeFilterSchema = exports.PageSchema = exports.CompoundFilterSchema = void 0;const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const PageSchema = {
  title: 'Page',
  type: 'object',
  additionalProperties: false,
  properties: { limit: { type: 'number' }, offset: { type: 'number' } } };exports.PageSchema = PageSchema;


const RangeFilterSchema = {
  title: 'RangeFilter',
  type: 'object',
  additionalProperties: false,
  properties: { from: { type: 'number' }, to: { type: 'number' } } };exports.RangeFilterSchema = RangeFilterSchema;


const CompoundFilterSchema = {
  title: 'CompoundFilter',
  type: 'object',
  additionalProperties: false,
  properties: {
    values: { type: 'array', items: { type: 'string' } },
    operator: { type: 'string', enum: ['AND', 'OR'] } } };exports.CompoundFilterSchema = CompoundFilterSchema;



const SearchQuerySchema = {
  title: 'SearchQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    page: PageSchema,
    filter: {
      type: 'object',
      additionalProperties: {
        anyOf: [
        RangeFilterSchema,
        CompoundFilterSchema,
        { type: 'string' },
        { type: 'number' },
        { type: 'boolean' }] },


      properties: {
        searchString: { type: 'string' },
        sharedId: { type: 'string' },
        published: { type: 'boolean' } } },


    sort: { type: 'string' },
    fields: { type: 'array', items: { type: 'string', minLength: 1 } } } };exports.SearchQuerySchema = SearchQuerySchema;