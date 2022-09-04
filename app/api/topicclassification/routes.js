"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.CLASSIFIER_MODELS_ENDPOINT = void 0;


var _auth = require("../auth");
var _thesauri = _interopRequireDefault(require("../thesauri"));
var _api = require("./api");




var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
 * Uwazi routes that fetch Topic Classification information.
 */

// Register tasks.
require("./sync");

const CLASSIFIER_MODELS_ENDPOINT = 'models';exports.CLASSIFIER_MODELS_ENDPOINT = CLASSIFIER_MODELS_ENDPOINT;
const tcModelPrefix = `/api/${CLASSIFIER_MODELS_ENDPOINT}`;var _default =

(app) => {
  app.get(
  tcModelPrefix,
  (0, _auth.needsAuthorization)(),
  _utils.validation.validateRequest({
    type: 'object',
    required: ['query'],
    properties: {
      query: {
        type: 'object',
        required: ['thesaurus'],
        properties: {
          thesaurus: { type: 'string' } } } } }),





  async (req, res) => {
    try {
      const model = await (0, _api.getModelForThesaurus)(req.query.thesaurus);
      return res.json(model);
    } catch (e) {
      return res.json({});
    }
  });

  app.get(
  `${tcModelPrefix}/train`,
  _utils.validation.validateRequest({
    type: 'object',
    required: ['query'],
    properties: {
      query: {
        type: 'object',
        required: ['thesaurus'],
        properties: {
          thesaurus: { type: 'string' } } } } }),





  async (req, res) => {
    try {
      const status = await (0, _api.getTrainStateForThesaurus)(req.query.thesaurus);
      return res.json(status);
    } catch (e) {
      return res.json({ state: 'undefined', result: {} });
    }
  });


  app.post(
  `${tcModelPrefix}/train`,
  (0, _auth.needsAuthorization)(),
  _utils.validation.validateRequest({
    type: 'object',
    required: ['body'],
    properties: {
      body: {
        type: 'object',
        required: ['thesaurusId'],
        properties: {
          thesaurusId: { type: 'string' } } } } }),





  async (req, res) => {
    try {
      const thes = await _thesauri.default.getById(req.body.thesaurusId);
      if (!thes) {
        return res.json({ state: 'undefined', result: {} });
      }
      const status = await (0, _api.startTraining)(thes);
      return res.json(status);
    } catch (e) {
      return res.json({ state: 'undefined', result: {} });
    }
  });

};exports.default = _default;