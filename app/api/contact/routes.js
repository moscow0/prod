"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _contact = _interopRequireDefault(require("./contact"));
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var _default =

(app) => {
  app.post(
  '/api/contact',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      body: {
        type: 'object',
        properties: {
          email: { type: 'string', format: 'email' },
          name: { type: 'string', minLength: 3 },
          message: { type: 'string', minLength: 5 } },

        required: ['email', 'name', 'message'] } } }),



  async (req, res, next) => {
    try {
      await _contact.default.sendMessage(req.body);
      res.json('ok');
    } catch (err) {
      next(err);
    }
  });

};exports.default = _default;