"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.permissionsFilters = void 0;
var _permissionsContext = require("../permissions/permissionsContext");

var _queryHelpers = require("./queryHelpers");

const permissionsFilters = (query) => {var _query$filter, _query$filter2, _query$filter3, _query$filter4, _query$filter5, _query$filter6;
  const user = _permissionsContext.permissionsContext.getUserInContext();
  const publishedFilter = (_query$filter = query.filter) === null || _query$filter === void 0 ? void 0 : _query$filter.hasOwnProperty('published');

  return [
  !user && { term: { published: ((_query$filter2 = query.filter) === null || _query$filter2 === void 0 ? void 0 : _query$filter2.published) === false ? 'not_allowed' : 'true' } },

  ((_query$filter3 = query.filter) === null || _query$filter3 === void 0 ? void 0 : _query$filter3.published) && { term: { published: 'true' } },

  user && {
    bool: {
      [((_query$filter4 = query.filter) === null || _query$filter4 === void 0 ? void 0 : _query$filter4.published) === false ? 'must' : 'should']: [
      ...(_permissionsContext.permissionsContext.needsPermissionCheck() ?
      [
      {
        term: { published: publishedFilter ? (_query$filter5 = query.filter) === null || _query$filter5 === void 0 ? void 0 : _query$filter5.published : 'true' } },

      {
        nested: {
          path: 'permissions',
          query: {
            bool: {
              must: [
              {
                terms: { 'permissions.refId': _permissionsContext.permissionsContext.permissionsRefIds() } }] } } } }] :







      [publishedFilter && { term: { published: (_query$filter6 = query.filter) === null || _query$filter6 === void 0 ? void 0 : _query$filter6.published } }].filter(
      _queryHelpers.cleanUp))] } }].




  filter(_queryHelpers.cleanUp);
};exports.permissionsFilters = permissionsFilters;