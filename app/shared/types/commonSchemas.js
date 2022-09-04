"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tocSchema = exports.selectionRectanglesSchema = exports.selectionRectangleSchema = exports.propertyValueSchema = exports.propertySchema = exports.objectIdSchema = exports.metadataSchema = exports.metadataObjectSchema = exports.linkSchema = exports.latLonSchema = exports.languagesListSchema = exports.languageSchema = exports.inheritedValueSchema = exports.geolocationSchema = exports.extractedMetadataSchema = exports.emitSchemaTypes = exports.dateRangeSchema = exports.attachmentSchema = void 0;var _propertyTypes = require("../propertyTypes");
var _provenanceTypes = require("../provenanceTypes");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const objectIdSchema = {
  oneOf: [
  { type: 'string' },
  {
    type: 'object',
    tsType: 'ObjectId' }] };exports.objectIdSchema = objectIdSchema;




const attachmentSchema = {
  type: 'object',
  properties: {
    _id: objectIdSchema,
    originalname: { type: 'string' },
    filename: { type: 'string' },
    mimetype: { type: 'string' },
    url: { type: 'string' },
    timestamp: { type: 'number' },
    size: { type: 'number' } } };exports.attachmentSchema = attachmentSchema;



const linkSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    label: { oneOf: [{ type: 'string' }, { type: 'null' }] },
    url: { oneOf: [{ type: 'string' }, { type: 'null' }] } } };exports.linkSchema = linkSchema;



const dateRangeSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    from: { oneOf: [{ type: 'number' }, { type: 'null' }] },
    to: { oneOf: [{ type: 'number' }, { type: 'null' }] } } };exports.dateRangeSchema = dateRangeSchema;



const languageSchema = {
  type: 'object',
  required: ['key', 'label'],
  additionalProperties: false,
  properties: {
    _id: objectIdSchema,
    label: { type: 'string' },
    key: { type: 'string' },
    rtl: { type: 'boolean' },
    default: { type: 'boolean' },
    ISO639_3: { type: 'string' },
    localized_label: { type: 'string' },
    translationAvailable: { type: 'boolean' } } };exports.languageSchema = languageSchema;



const languagesListSchema = {
  type: 'array',
  items: languageSchema };exports.languagesListSchema = languagesListSchema;


const latLonSchema = {
  type: 'object',
  required: ['lon', 'lat'],
  additionalProperties: false,
  properties: {
    label: { type: 'string' },
    lat: { type: 'number', minimum: -90, maximum: 90 },
    lon: { type: 'number', minimum: -180, maximum: 180 } } };exports.latLonSchema = latLonSchema;



const geolocationSchema = {
  type: 'array',
  items: latLonSchema };exports.geolocationSchema = geolocationSchema;


const propertyValueSchema = {
  definitions: { linkSchema, dateRangeSchema, latLonSchema },
  oneOf: [
  { type: 'null' },
  { type: 'string' },
  { type: 'number' },
  { type: 'boolean' },
  linkSchema,
  dateRangeSchema,
  latLonSchema,
  geolocationSchema] };exports.propertyValueSchema = propertyValueSchema;



const inheritedValueSchema = {
  type: 'object',
  required: ['value'],
  properties: {
    value: propertyValueSchema,
    label: { type: 'string' } } };exports.inheritedValueSchema = inheritedValueSchema;



const metadataObjectSchema = {
  type: 'object',
  definitions: { propertyValueSchema },
  required: ['value'],
  properties: {
    value: propertyValueSchema,
    attachment: { type: 'number' },
    label: { type: 'string' },
    suggestion_confidence: { type: 'number' },
    suggestion_model: { type: 'string' },
    provenance: { type: 'string', enum: Object.values(_provenanceTypes.provenanceTypes) },
    inheritedValue: { type: 'array', items: inheritedValueSchema },
    inheritedType: { type: 'string' } } };exports.metadataObjectSchema = metadataObjectSchema;



const metadataSchema = {
  type: 'object',
  definitions: { metadataObjectSchema },
  additionalProperties: {
    anyOf: [{ type: 'array', items: metadataObjectSchema }] },

  patternProperties: {
    '^.*_nested$': { type: 'array', items: { type: 'object' } } } };exports.metadataSchema = metadataSchema;



const selectionRectangleSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    top: { type: 'number' },
    left: { type: 'number' },
    width: { type: 'number' },
    height: { type: 'number' },
    page: { type: 'string' } } };exports.selectionRectangleSchema = selectionRectangleSchema;



const selectionRectanglesSchema = {
  type: 'array',
  items: selectionRectangleSchema };exports.selectionRectanglesSchema = selectionRectanglesSchema;


const tocSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    selectionRectangles: selectionRectanglesSchema,
    label: { type: 'string' },
    indentation: { type: 'number' } } };exports.tocSchema = tocSchema;



const extractedMetadataSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    propertyID: { type: 'string' },
    name: { type: 'string' },
    timestamp: { type: 'string' },
    deleteSelection: { type: 'boolean' },
    selection: {
      type: 'object',
      additionalProperties: false,
      properties: {
        text: { type: 'string' },
        selectionRectangles: selectionRectanglesSchema } } } };exports.extractedMetadataSchema = extractedMetadataSchema;





const propertySchema = {
  type: 'object',
  required: ['label', 'type', 'name'],
  additionalProperties: false,
  requireOrInvalidContentForSelectFields: true,
  requireRelationTypeForRelationship: true,
  definitions: { objectIdSchema },
  properties: {
    _id: objectIdSchema,
    label: { type: 'string', minLength: 1 },
    name: { type: 'string', minLength: 1 },
    isCommonProperty: { type: 'boolean' },
    type: { type: 'string', enum: Object.values(_propertyTypes.propertyTypes) },
    prioritySorting: { type: 'boolean' },
    generatedId: { type: 'boolean' },
    content: { type: 'string' },
    relationType: { type: 'string' },
    inherit: {
      type: 'object',
      additionalProperties: false,
      properties: {
        property: { type: 'string' },
        type: { type: 'string', enum: Object.values(_propertyTypes.propertyTypes) } } },


    filter: { type: 'boolean' },
    noLabel: { type: 'boolean' },
    fullWidth: { type: 'boolean' },
    defaultfilter: { type: 'boolean' },
    required: { type: 'boolean' },
    sortable: { type: 'boolean' },
    showInCard: { type: 'boolean' },
    style: { type: 'string' },
    nestedProperties: {
      type: 'array',
      items: {
        type: 'string' } } } };exports.propertySchema = propertySchema;