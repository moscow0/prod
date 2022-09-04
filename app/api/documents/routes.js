"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.documentRoutes = void 0;

var _utils = require("../utils");
var _documents = require("./documents");

const documentRoutes = (app) => {
  app.get(
  '/api/documents/page',
  _utils.validation.validateRequest({
    type: 'object',
    properties: {
      query: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          page: { type: 'string' } } } } }),





  async (req, res, next) => {
    _documents.documents.
    page(req.query._id, req.query.page).
    then((result) => {
      res.json({ data: result });
    }).
    catch(next);
  });

};exports.documentRoutes = documentRoutes;