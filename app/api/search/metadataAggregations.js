"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.publishingStatusAgreggations = exports.propertyToAggregation = exports.permissionsUsersAgreggations = exports.permissionsLevelAgreggations = exports.generatedTocAggregations = void 0;var _config = require("../../shared/config");
var _permissionsContext = require("../permissions/permissionsContext");

const aggregation = (key, should, filters) => ({
  terms: {
    field: key,
    missing: 'missing',
    size: _config.preloadOptionsSearch },

  aggregations: {
    filtered: {
      filter: {
        bool: {
          should,
          filter: filters } } } } });






const aggregationWithGroupsOfOptions = (key, should, filters, dictionary) => {
  const agg = {
    filters: { filters: {} },
    aggregations: {
      filtered: {
        filter: {
          bool: {
            should,
            filter: filters } } } } };





  const addMatch = (value) => {
    const match = { terms: {} };
    match.terms[key] = value.values ? value.values.map((v) => v.id) : [value.id];
    agg.filters.filters[value.id.toString()] = match;
    if (value.values) {
      value.values.forEach(addMatch);
    }
  };
  dictionary.values.forEach(addMatch);

  const missingMatch = { bool: { must_not: { exists: { field: key } } } };
  agg.filters.filters.missing = missingMatch;

  return agg;
};

const nestedMatcherIsAggregationProperty = (nestedMatcher, nestedPropPath) =>
!nestedMatcher.nested ||
!nestedMatcher.nested.query.bool.must ||
!nestedMatcher.nested.query.bool.must[0].terms ||
!nestedMatcher.nested.query.bool.must[0].terms[nestedPropPath] ||
!nestedMatcher.nested.query.bool.must_not ||
!nestedMatcher.nested.query.bool.must_not[0].exists ||
!nestedMatcher.nested.query.bool.must[0].exists.field[nestedPropPath];

const nestedAggregation = (property, should, readOnlyFilters, path, missing = false) => {
  const nestedPath = path || `metadata.${property.name}`;
  const agg = {
    nested: {
      path: nestedPath },

    aggregations: {} };

  let nestedFilters = readOnlyFilters.
  filter((match) => match.nested && match.nested.path === nestedPath).
  map((nestedFilter) => nestedFilter.nested.query.bool.must).
  reduce((result, propFilters) => result.concat(propFilters), []);

  property.nestedProperties.forEach((prop) => {
    const nestedPropPath = path ?
    `${path}.metadata.${prop}.raw` :
    `metadata.${property.name}.${prop}.raw`;
    const filters = readOnlyFilters.
    map((match) => {
      if (match.bool && match.bool.must && match.bool.must[0] && match.bool.must[0].nested) {
        match.bool.must = match.bool.must.filter((nestedMatcher) =>
        nestedMatcherIsAggregationProperty(nestedMatcher, nestedPropPath));


        if (!match.bool.must.length) {
          return;
        }
      }
      if (match.nested) {
        return;
      }
      return match;
    }).
    filter((f) => f);

    nestedFilters = nestedFilters.filter((filter) => !filter.terms || !filter.terms[nestedPropPath]);

    agg.aggregations[prop] = {
      terms: {
        field: nestedPropPath,
        missing: missing ? 'missing' : undefined,
        size: _config.preloadOptionsSearch },

      aggregations: {
        filtered: {
          filter: {
            bool: {
              must: nestedFilters } },


          aggregations: {
            total: {
              reverse_nested: {},
              aggregations: {
                filtered: {
                  filter: {
                    bool: {
                      should,
                      must: filters } } } } } } } } };









  });

  return agg;
};

const extractFilters = (baseQuery, path) => {
  let filters = baseQuery.query.bool.filter.filter(
  (match) =>
  match && (
  !match.terms || match.terms && !match.terms[path]) && (
  !match.bool ||
  !match.bool.should ||
  !match.bool.should[1] ||
  !match.bool.should[1].terms ||
  !match.bool.should[1].terms[path]));

  filters = filters.concat(baseQuery.query.bool.must);
  return filters;
};

const getpath = (property, suggested) =>
suggested ? `suggestedMetadata.${property.name}` : `metadata.${property.name}`;

const propertyToAggregation = (property, dictionaries, baseQuery, suggested = false) => {
  const path = getpath(property, suggested);
  const filters = extractFilters(baseQuery, path);
  const { should } = baseQuery.query.bool;

  if (property.type === 'nested') {
    return nestedAggregation(property, should, filters);
  }

  const dictionary = property.content ?
  dictionaries.find((d) => property.content.toString() === d._id.toString()) :
  null;

  const isADictionaryWithGroups = dictionary && dictionary.values.find((v) => v.values);
  if (isADictionaryWithGroups) {
    return aggregationWithGroupsOfOptions(path, should, filters, dictionary);
  }

  return aggregation(path, should, filters);
};exports.propertyToAggregation = propertyToAggregation;

const generatedTocAggregations = (baseQuery) => {
  const path = 'generatedToc';
  const filters = extractFilters(baseQuery, path);
  const { should } = baseQuery.query.bool;
  return aggregation(path, should, filters);
};exports.generatedTocAggregations = generatedTocAggregations;

const permissionsAggregations = (baseQuery, path, terms) => {
  const filters = extractFilters(baseQuery, path);
  const { should } = baseQuery.query.bool;

  const baseFilters = filters.filter(
  (f) => {var _f$bool, _f$bool$should;return (
      !(
      f.nested && f.nested.path === 'permissions' ||
      f !== null && f !== void 0 && (_f$bool = f.bool) !== null && _f$bool !== void 0 && (_f$bool$should = _f$bool.should) !== null && _f$bool$should !== void 0 && _f$bool$should.find((i) => {var _i$nested;return (i === null || i === void 0 ? void 0 : (_i$nested = i.nested) === null || _i$nested === void 0 ? void 0 : _i$nested.path) === 'permissions';})));});



  return {
    filter: {
      bool: {
        should,
        filter: baseFilters } },


    aggregations: {
      nestedPermissions: {
        nested: { path: 'permissions' },
        aggregations: {
          filtered: {
            terms: {
              field: path,
              size: _config.preloadOptionsSearch },

            aggregations: {
              filteredByUser: {
                filter: {
                  bool: {
                    filter: [
                    {
                      terms }] } },




                aggregations: {
                  uniqueEntities: {
                    reverse_nested: {} } } } } } } } } };









};

const permissionsLevelAgreggations = (baseQuery) =>
permissionsAggregations(baseQuery, 'permissions.level', {
  'permissions.refId': _permissionsContext.permissionsContext.permissionsRefIds() });exports.permissionsLevelAgreggations = permissionsLevelAgreggations;


const permissionsUsersAgreggations = (baseQuery, level) =>
permissionsAggregations(baseQuery, 'permissions.refId', {
  'permissions.level': [level] });exports.permissionsUsersAgreggations = permissionsUsersAgreggations;


const publishingStatusAgreggations = (baseQuery) => {
  const path = 'published';
  const filters = extractFilters(baseQuery, path);
  const { should } = baseQuery.query.bool;
  const user = _permissionsContext.permissionsContext.getUserInContext();
  const needsPermissions = user && !['admin', 'editor'].includes(user.role);

  const baseFilters = filters.filter(
  (f) => {var _ref, _ref$, _ref$$term, _f$bool2, _f$bool3;return !(((_ref = (f === null || f === void 0 ? void 0 : (_f$bool2 = f.bool) === null || _f$bool2 === void 0 ? void 0 : _f$bool2.must) || (f === null || f === void 0 ? void 0 : (_f$bool3 = f.bool) === null || _f$bool3 === void 0 ? void 0 : _f$bool3.should)) === null || _ref === void 0 ? void 0 : (_ref$ = _ref[0]) === null || _ref$ === void 0 ? void 0 : (_ref$$term = _ref$.term) === null || _ref$$term === void 0 ? void 0 : _ref$$term.published) !== undefined);});


  if (needsPermissions) {
    baseFilters.push({
      bool: {
        should: [
        {
          term: {
            published: true } },


        {
          bool: {
            must: [
            {
              term: {
                published: false } },


            {
              nested: {
                path: 'permissions',
                query: {
                  bool: {
                    must: [
                    {
                      terms: {
                        'permissions.refId': _permissionsContext.permissionsContext.permissionsRefIds() } }] } } } }] } }] } });













  }

  return {
    filter: {
      bool: {
        should,
        filter: baseFilters } },


    aggregations: {
      filtered: {
        terms: {
          field: path,
          missing: 'false',
          size: _config.preloadOptionsSearch } } } };




};exports.publishingStatusAgreggations = publishingStatusAgreggations;