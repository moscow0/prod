"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var _ = require("./");var _default =

(app) => {
  app.get('/api/search/lookup', (req, res, next) => {
    const { query } = req;
    const templates = query.templates ? JSON.parse(query.templates) : [];
    _.search.
    autocomplete(query.searchTerm, req.language, templates).
    then((response) => res.json(response)).
    catch(next);
  });

  app.get('/api/search/lookupaggregation', (req, res, next) => {
    const query = JSON.parse(req.query.query);
    _.search.
    autocompleteAggregations(
    query,
    req.language,
    req.query.property,
    req.query.searchTerm,
    req.user).

    then((response) => res.json(response)).
    catch(next);
  });
};exports.default = _default;