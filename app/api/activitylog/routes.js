"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _commonSchemas = require("../../shared/types/commonSchemas");
var _utils = require("../utils");
var _authMiddleware = _interopRequireDefault(require("../auth/authMiddleware"));
var _activitylog = _interopRequireDefault(require("./activitylog"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.get(
  '/api/activitylog',
  (0, _authMiddleware.default)(['admin']),
  _utils.parseQuery,
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        additionalProperties: false,
        type: 'object',
        properties: {
          user: _commonSchemas.objectIdSchema,
          username: { type: 'string' },
          find: { type: 'string' },
          time: {
            type: 'object',
            properties: {
              from: { type: 'number' },
              to: { type: 'number' } } },


          before: { type: 'number' },
          limit: { type: 'number' },
          method: { type: 'array', items: { type: 'string' } },
          search: { type: 'string' } } } } }),




  (req, res, next) =>
  _activitylog.default.
  get(req.query).
  then((response) => res.json(response)).
  catch(next));

};exports.default = _default;