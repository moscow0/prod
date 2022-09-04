"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.elasticTesting = void 0;var _search = require("../search");

var _elastic_mapping = _interopRequireDefault(require("../../../database/elastic_mapping/elastic_mapping"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const elasticTesting = {
  async resetIndex() {
    await _search.elastic.indices.delete({ ignore_unavailable: true });
    await _search.elastic.indices.create({ body: _elastic_mapping.default });
    await _search.search.updateTemplatesMapping();
    return this.refresh();
  },

  async reindex() {
    await this.resetIndex();
    await _search.search.indexEntities({}, '+fullText');
    await this.refresh();
  },

  async putMapping(body) {
    await _search.elastic.indices.putMapping({ body });
  },

  async refresh() {
    await _search.elastic.indices.refresh();
  },

  async getIndexedEntities(sort = 'title.sort') {
    return (await _search.elastic.search({ sort: [sort] })).body.hits.hits.map((i) => i._source);
  } };exports.elasticTesting = elasticTesting;