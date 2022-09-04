"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _auth = require("../auth");
var _utils = require("../utils");
var _userGroups = _interopRequireDefault(require("./userGroups"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.get(
  '/api/usergroups',
  (0, _auth.needsAuthorization)(['admin']),
  async (_req, res, next) => {
    try {
      const groups = await _userGroups.default.get({});
      res.json(groups);
    } catch (err) {
      next(err);
    }
  });


  app.post(
  '/api/usergroups',
  (0, _auth.needsAuthorization)(['admin']),
  async (req, res) => {
    const userGroup = await _userGroups.default.save(req.body);
    res.json(userGroup);
  });


  app.delete(
  '/api/usergroups',
  (0, _auth.needsAuthorization)(['admin']),
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        required: ['_id'],
        properties: {
          _id: { type: 'string' } } } } }),




  async (req, res, next) => {
    try {
      const deletedGroup = await _userGroups.default.delete(req.query);
      res.json(deletedGroup);
    } catch (err) {
      next(err);
    }
  });

};exports.default = _default;