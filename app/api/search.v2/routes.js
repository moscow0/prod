"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.searchRoutes = void 0;

var _elastic = require("../search/elastic");
var _validateRequest = require("../utils/validateRequest");
var _SearchQuerySchema = require("../../shared/types/SearchQuerySchema");


var _searchResponse = require("./searchResponse");
var _qs = _interopRequireDefault(require("qs"));
var _buildQuery = require("./buildQuery");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}


















const link = (limit, offset) =>
`/api/v2/entities?${_qs.default.stringify({
  page: { limit, offset } })
}`;

const prevPaginationLink = (queryLimit, currentOffset) =>
queryLimit && currentOffset > 0 ? link(queryLimit, currentOffset - queryLimit) : undefined;

const nextPaginationLink = (queryLimit, currentOffset, lastOffset) =>
queryLimit && currentOffset < lastOffset ?
link(queryLimit, currentOffset + queryLimit) :
undefined;

const lastPaginationLink = (queryLimit, offset) =>
queryLimit ? link(queryLimit, offset) : undefined;

const pagination = (currentUrl, totalResults, page) => {
  const currentOffset = (page === null || page === void 0 ? void 0 : page.offset) || 0;
  const lastOffset = page !== null && page !== void 0 && page.limit ? totalResults - page.limit : 0;
  return {
    self: currentUrl,
    first: page !== null && page !== void 0 && page.limit ? currentUrl : undefined,
    prev: prevPaginationLink(page === null || page === void 0 ? void 0 : page.limit, currentOffset),
    next: nextPaginationLink(page === null || page === void 0 ? void 0 : page.limit, currentOffset, lastOffset),
    last: lastPaginationLink(page === null || page === void 0 ? void 0 : page.limit, lastOffset) };

};

const searchRoutes = (app) => {
  app.get(
  '/api/v2/entities',
  (0, _validateRequest.validateAndCoerceRequest)({
    type: 'object',
    properties: {
      query: _SearchQuerySchema.SearchQuerySchema } }),


  async (req, res) => {
    const { query, language, url } = req;
    const response = await _elastic.elastic.search({ body: await (0, _buildQuery.buildQuery)(query, language) });
    res.json({
      data: (0, _searchResponse.mapResults)(response.body, query),
      links: pagination(url, response.body.hits.total.value, query.page) });

  });

};exports.searchRoutes = searchRoutes;