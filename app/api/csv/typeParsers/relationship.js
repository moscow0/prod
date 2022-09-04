"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _entities = _interopRequireDefault(require("../../entities"));
var _filters = require("../../utils/filters");

var _tsUtils = require("../../../shared/tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



const relationship = async (entityToImport, property) => {
  const values = entityToImport[(0, _tsUtils.ensure)(property.name)].
  split('|').
  filter(_filters.emptyString).
  filter(_filters.unique);

  // On newer mongoose versions, replace "any" with "FilterQuery"
  const query = { title: { $in: values } };

  if (property.content) {
    query.template = property.content;
  }

  const current = await _entities.default.get(query);
  const newValues = values.filter((v) => !current.map((c) => c.title).includes(v));

  if (property.content) {
    await newValues.reduce(async (promise, title) => {
      await promise;
      return _entities.default.save(
      {
        title,
        template: property.content },

      {
        language: entityToImport.language,
        user: {} });


    }, Promise.resolve([]));
  }

  const toRelateEntities = await _entities.default.get(query);
  return toRelateEntities.
  map((e) => ({ value: e.sharedId, label: e.title })).
  filter((mo, index, mos) => mos.findIndex((e) => e.value === mo.value) === index);
};var _default =

relationship;exports.default = _default;