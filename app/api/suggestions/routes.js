"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.suggestionsRoutes = void 0;

var _suggestions = require("./suggestions");
var _InformationExtraction = require("../services/informationextraction/InformationExtraction");
var _validateRequest = require("../utils/validateRequest");
var _auth = require("../auth");
var _parseQueryMiddleware = require("../utils/parseQueryMiddleware");
var _suggestionSchema = require("../../shared/types/suggestionSchema");



var _commonSchemas = require("../../shared/types/commonSchemas");
var _serviceMiddleware = require("./serviceMiddleware");
var _configurationManager = require("./configurationManager");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const IX = new _InformationExtraction.InformationExtraction();

async function processTrainFunction(
callback,
req,
res)
{
  if (!IX) {
    res.status(500).json({
      error: 'Information Extraction service is not available' });

    return;
  }

  const status = await callback(req.body.property);
  res.json(status);
}

function propertyRequestValidation(root = 'body') {
  return (0, _validateRequest.validateAndCoerceRequest)({
    type: 'object',
    properties: {
      [root]: {
        type: 'object',
        additionalProperties: false,
        required: ['property'],
        properties: {
          property: { type: 'string' } } } } });




}

const suggestionsRoutes = (app) => {
  app.get(
  '/api/suggestions/',
  _serviceMiddleware.serviceMiddleware,
  (0, _auth.needsAuthorization)(['admin']),
  _parseQueryMiddleware.parseQuery,
  (0, _validateRequest.validateAndCoerceRequest)({
    type: 'object',
    properties: {
      query: _suggestionSchema.IXSuggestionsQuerySchema } }),


  async (req, res, _next) => {
    const suggestionsList = await _suggestions.Suggestions.get(_objectSpread({
      language: req.language }, req.query.filter),
    { page: req.query.page });

    res.json(suggestionsList);
  });


  app.get(
  '/api/suggestions/stats',
  _serviceMiddleware.serviceMiddleware,
  (0, _auth.needsAuthorization)(['admin']),
  _parseQueryMiddleware.parseQuery,
  (0, _validateRequest.validateAndCoerceRequest)({
    properties: {
      query: _suggestionSchema.IXSuggestionsStatsQuerySchema } }),


  async (req, res, _next) => {
    const stats = await _suggestions.Suggestions.getStats(req.query.propertyName);
    res.json(stats);
  });


  app.post(
  '/api/suggestions/stop',
  _serviceMiddleware.serviceMiddleware,
  (0, _auth.needsAuthorization)(['admin']),
  propertyRequestValidation('body'),
  async (req, res, _next) => {
    await processTrainFunction(IX.stopModel, req, res);
  });


  app.post(
  '/api/suggestions/train',
  _serviceMiddleware.serviceMiddleware,
  (0, _auth.needsAuthorization)(['admin']),
  propertyRequestValidation('body'),
  async (req, res, _next) => {
    await processTrainFunction(IX.trainModel, req, res);
  });


  app.post(
  '/api/suggestions/configurations',
  (0, _auth.needsAuthorization)(['admin']),
  (0, _validateRequest.validateAndCoerceRequest)({
    properties: {
      body: {
        additionalProperties: false,
        properties: {
          configurations: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                template: { type: 'string' },
                properties: {
                  type: 'array',
                  items: { type: 'string' } } } } } } } } }),








  (req, res, next) => {
    (0, _configurationManager.saveConfigurations)(req.body).
    then((response) => res.json(response)).
    catch(next);
  });


  app.post(
  '/api/suggestions/status',
  _serviceMiddleware.serviceMiddleware,
  (0, _auth.needsAuthorization)(['admin']),
  propertyRequestValidation('body'),
  async (req, res, _next) => {
    await processTrainFunction(IX.status, req, res);
  });


  app.post(
  '/api/suggestions/accept',
  _serviceMiddleware.serviceMiddleware,
  (0, _auth.needsAuthorization)(['admin']),
  (0, _validateRequest.validateAndCoerceRequest)({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        additionalProperties: false,
        required: ['suggestion', 'allLanguages'],
        properties: {
          suggestion: {
            type: 'object',
            additionalProperties: false,
            required: ['_id', 'sharedId', 'entityId'],
            properties: {
              _id: _commonSchemas.objectIdSchema,
              sharedId: { type: 'string' },
              entityId: { type: 'string' } } },


          allLanguages: { type: 'boolean' } } } } }),




  async (req, res, _next) => {
    const { suggestion, allLanguages } = req.body;
    await _suggestions.Suggestions.accept(suggestion, allLanguages);
    res.json({ success: true });
  });

};exports.suggestionsRoutes = suggestionsRoutes;