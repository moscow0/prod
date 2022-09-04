"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.search = void 0;
var _date = _interopRequireDefault(require("../utils/date"));
var _comonProperties = _interopRequireDefault(require("../../shared/comonProperties"));
var _dictionariesModel = _interopRequireDefault(require("../thesauri/dictionariesModel"));
var _utils = require("../utils");
var _optionsUtils = require("../../shared/optionsUtils");
var _config = require("../../shared/config");
var _permissionsContext = require("../permissions/permissionsContext");
var _permissionsUtils = require("../../shared/permissionsUtils");
var _users = _interopRequireDefault(require("../users/users"));
var _userGroups = _interopRequireDefault(require("../usergroups/userGroups"));
var _propertyTypes = require("../../shared/propertyTypes");
var _userSchema = require("../../shared/types/userSchema");
var _documentQueryBuilder = _interopRequireDefault(require("./documentQueryBuilder"));
var _elastic = require("./elastic");
var _entitiesModel = _interopRequireDefault(require("../entities/entitiesModel"));
var _templates = _interopRequireDefault(require("../templates"));
var _entitiesIndex = require("./entitiesIndex");
var _thesauri = _interopRequireDefault(require("../thesauri"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function processParentThesauri(property, values, dictionaries, properties) {
  if (!values) {
    return values;
  }

  const sourceProperty =
  property.type === 'relationship' && property.inherit ?
  properties.find((p) => p._id.toString() === property.inherit.property.toString()) :
  property;

  if (!sourceProperty || !['select', 'multiselect'].includes(sourceProperty.type)) {
    return values;
  }

  const dictionary = dictionaries.find((d) => d._id.toString() === sourceProperty.content.toString());
  return values.reduce((memo, v) => {
    const dictionaryValue = dictionary.values.find((dv) => dv.id === v);

    if (!dictionaryValue || !dictionaryValue.values) {
      return [...memo, v];
    }

    return [...memo, ...dictionaryValue.values.map((dvv) => dvv.id)];
  }, []);
}

function processFilters(filters, properties, dictionaries) {
  return Object.keys(filters || {}).reduce((res, filterName) => {
    const suggested = filterName.startsWith('__');
    const propertyName = suggested ? filterName.substring(2) : filterName;
    const property = properties.find((p) => p.name === propertyName);

    if (!property) {
      return res;
    }

    let { type } = property;
    let value = filters[filterName];

    if (property.inherit) {
      ({ type } = _comonProperties.default.getInheritedProperty(property, properties));
    }

    if (['multidaterange', 'daterange', 'date', 'multidate'].includes(type)) {
      value.from = _date.default.descriptionToTimestamp(value.from);
      value.to = _date.default.descriptionToTimestamp(value.to);
    }

    if (['text', 'markdown', 'generatedid'].includes(type) && typeof value === 'string') {
      value = value.toLowerCase();
    }

    if (['date', 'multidate', 'numeric'].includes(type)) {
      type = 'range';
    }

    if (['select', 'multiselect', 'relationship'].includes(type)) {
      type = 'multiselect';
      value.values = processParentThesauri(property, value.values, dictionaries, properties);
    }

    if (type === 'multidaterange' || type === 'daterange') {
      type = 'daterange';
    }

    return [
    ...res, _objectSpread(_objectSpread({},

    property), {}, {
      value,
      suggested,
      type,
      name: property.inherit ? `${property.name}.inheritedValue.value` : `${property.name}.value` })];


  }, []);
}

function aggregationProperties(propertiesToBeAggregated, allProperties) {
  return propertiesToBeAggregated.
  filter((property) => {
    const type = property.inherit ? property.inherit.type : property.type;

    return (
      type === 'select' || type === 'multiselect' || type === 'relationship' || type === 'nested');

  }).
  map((property) => _objectSpread(_objectSpread({},
  property), {}, {
    name: property.inherit ? `${property.name}.inheritedValue.value` : `${property.name}.value`,
    content: property.inherit ?
    _comonProperties.default.getInheritedProperty(property, allProperties).content :
    property.content }));

}

function metadataSnippetsFromSearchHit(hit) {
  const defaultSnippets = { count: 0, snippets: [] };
  if (hit.highlight) {
    const metadataHighlights = hit.highlight;
    const metadataSnippets = Object.keys(metadataHighlights).reduce((foundSnippets, field) => {
      const fieldSnippets = { field, texts: metadataHighlights[field] };
      return {
        count: foundSnippets.count + fieldSnippets.texts.length,
        snippets: [...foundSnippets.snippets, fieldSnippets] };

    }, defaultSnippets);
    return metadataSnippets;
  }
  return defaultSnippets;
}

function getSnippets() {
  return (snippet) => {
    const regex = /\[\[(\d+)\]\]/g;
    const matches = regex.exec(snippet);
    return {
      text: snippet.replace(regex, ''),
      page: matches ? Number(matches[1]) : 0 };

  };
}

function getHits(hit) {
  return hit.inner_hits &&
  hit.inner_hits.fullText.hits.hits &&
  hit.inner_hits.fullText.hits.hits.length > 0 &&
  hit.inner_hits.fullText.hits.hits[0].highlight ?
  hit.inner_hits.fullText.hits.hits :
  undefined;
}
function fullTextSnippetsFromSearchHit(hit) {
  const hits = getHits(hit);
  if (hits) {
    const fullTextHighlights = hits[0].highlight;
    const fullTextLanguageKey = Object.keys(fullTextHighlights)[0];
    return fullTextHighlights[fullTextLanguageKey].map(getSnippets());
  }
  return [];
}

function snippetsFromSearchHit(hit) {
  const snippets = {
    count: 0,
    metadata: [],
    fullText: [] };


  const metadataSnippets = metadataSnippetsFromSearchHit(hit);
  const fullTextSnippets = fullTextSnippetsFromSearchHit(hit);
  snippets.count = metadataSnippets.count + fullTextSnippets.length;
  snippets.metadata = metadataSnippets.snippets;
  snippets.fullText = fullTextSnippets;

  return snippets;
}

function searchGeolocation(documentsQuery, templates) {
  documentsQuery.limit(9999);
  documentsQuery.from(0);
  const geolocationProperties = [];

  templates.forEach((template) => {
    template.properties.forEach((prop) => {
      if (prop.type === 'geolocation') {
        geolocationProperties.push(`${prop.name}`);
      }

      if (prop.type === 'relationship' && prop.inherit) {
        const contentTemplate = templates.find((t) => t._id.toString() === prop.content.toString());
        const inheritedProperty = _comonProperties.default.getInheritedProperty(
        prop,
        contentTemplate.properties);

        if ((inheritedProperty === null || inheritedProperty === void 0 ? void 0 : inheritedProperty.type) === 'geolocation') {
          geolocationProperties.push(`${prop.name}`);
        }
      }
    });
  });

  documentsQuery.hasMetadataProperties(geolocationProperties);

  const selectProps = geolocationProperties.
  map((p) => `metadata.${p}`).
  concat(['title', 'template', 'sharedId', 'language']);

  documentsQuery.select(selectProps);
}

const _sanitizeAgregationNames = (aggregations) =>
Object.keys(aggregations).reduce((allAggregations, key) => {
  const sanitizedKey = key.replace('.inheritedValue.value', '').replace('.value', '');
  return Object.assign(allAggregations, { [sanitizedKey]: aggregations[key] });
}, {});

const indexedDictionaryValues = (dictionary) =>
dictionary.values.
reduce((values, v) => {
  if (v.values) {
    return values.concat(v.values, [v]);
  }
  values.push(v);
  return values;
}, []).
reduce((v, value) => {
  // eslint-disable-next-line no-param-reassign
  v[value.id] = value;
  return v;
}, {});

const _getAggregationDictionary = async (aggregation, language, property, dictionaries) => {
  if (property.type === 'relationship') {
    const entitiesSharedId = aggregation.buckets.map((bucket) => bucket.key);

    const bucketEntities = await _entitiesModel.default.getUnrestricted(
    {
      sharedId: { $in: entitiesSharedId },
      language },

    {
      sharedId: 1,
      title: 1,
      icon: 1 });



    const dictionary = _thesauri.default.entitiesToThesauri(bucketEntities);
    return [dictionary, indexedDictionaryValues(dictionary)];
  }

  const dictionary = dictionaries.find((d) => d._id.toString() === property.content.toString());
  return [dictionary, indexedDictionaryValues(dictionary)];
};

const _formatDictionaryWithGroupsAggregation = (aggregation, dictionary) => {
  const buckets = dictionary.values.
  map((dictionaryValue) => {
    const bucket = aggregation.buckets.find((b) => b.key === dictionaryValue.id);
    if (bucket && dictionaryValue.values) {
      bucket.values = dictionaryValue.values.
      map((v) => aggregation.buckets.find((b) => b.key === v.id)).
      filter((b) => b);
    }
    return bucket;
  }).
  filter((b) => b);
  const bucketsIncludeMissing = aggregation.buckets.find((b) => b.key === 'missing');
  if (bucketsIncludeMissing) {
    buckets.push(bucketsIncludeMissing);
  }
  return Object.assign(aggregation, { buckets });
};

const _denormalizeAggregations = async (aggregations, templates, dictionaries, language) => {
  const properties = _comonProperties.default.allProperties(templates);
  return Object.keys(aggregations).reduce(async (denormaLizedAgregationsPromise, key) => {
    const denormaLizedAgregations = await denormaLizedAgregationsPromise;
    if (
    !aggregations[key].buckets ||
    aggregations[key].type === 'nested' ||
    ['_types', 'generatedToc', '_permissions.self', '_published'].includes(key))
    {
      return Object.assign(denormaLizedAgregations, { [key]: aggregations[key] });
    }

    if (['_permissions.read', '_permissions.write'].includes(key)) {var _permissionsContext$g;
      const [users, groups] = await Promise.all([_users.default.get(), _userGroups.default.get()]);

      const info = [
      ...users.map((u) => ({ type: 'user', refId: u._id, label: u.username })),
      ...groups.map((g) => ({ type: 'group', refId: g._id, label: g.name }))];


      const role = (_permissionsContext$g = _permissionsContext.permissionsContext.getUserInContext()) === null || _permissionsContext$g === void 0 ? void 0 : _permissionsContext$g.role;
      const refIds = _permissionsContext.permissionsContext.permissionsRefIds();

      const buckets = aggregations[key].buckets.
      filter((bucket) => role === _userSchema.UserRole.ADMIN || refIds.includes(bucket.key)).
      map((bucket) => {
        const itemInfo = info.find((i) => i.refId.toString() === bucket.key);

        if (!itemInfo) return null;

        return _objectSpread(_objectSpread({},
        bucket), {}, {
          label: itemInfo.label },
        itemInfo.type === 'group' ? { icon: 'users' } : {});

      }).
      filter((b) => b);

      return Object.assign(denormaLizedAgregations, { [key]: _objectSpread(_objectSpread({}, aggregations[key]), {}, { buckets }) });
    }

    let property = properties.find((prop) => prop.name === key || `__${prop.name}` === key);

    if (property.inherit) {
      property = _comonProperties.default.getInheritedProperty(property, properties);
    }

    const [dictionary, dictionaryValues] = await _getAggregationDictionary(
    aggregations[key],
    language,
    property,
    dictionaries);


    const buckets = aggregations[key].buckets.
    map((bucket) => {
      const labelItem =
      bucket.key === 'missing' ? { label: 'No label' } : dictionaryValues[bucket.key];

      if (labelItem) {
        const { label, icon } = labelItem;
        return Object.assign(bucket, { label, icon });
      }
      return null;
    }).
    filter((item) => item);

    let denormalizedAggregation = Object.assign(aggregations[key], { buckets });

    if (dictionary && dictionary.values.find((v) => v.values)) {
      denormalizedAggregation = _formatDictionaryWithGroupsAggregation(
      denormalizedAggregation,
      dictionary);

    }
    return Object.assign(denormaLizedAgregations, { [key]: denormalizedAggregation });
  }, {});
};

const _sanitizeAggregationsStructure = (aggregations, limit) => {
  const result = {};
  Object.keys(aggregations).forEach((aggregationKey) => {
    const aggregation = aggregations[aggregationKey];

    //grouped dictionary
    if (aggregation.buckets && !Array.isArray(aggregation.buckets)) {
      aggregation.buckets = Object.keys(aggregation.buckets).map((key) => _objectSpread({
        key },
      aggregation.buckets[key]));

    }

    //permissions
    if (['_permissions.read', '_permissions.write', '_permissions.self'].includes(aggregationKey)) {
      aggregation.buckets = aggregation.nestedPermissions.filtered.buckets.map((b) => ({
        key: b.key,
        filtered: { doc_count: b.filteredByUser.uniqueEntities.doc_count } }));

    }

    //published
    if (aggregationKey === '_published') {
      aggregation.buckets = aggregation.filtered.buckets.map((b) => ({
        key: b.key,
        filtered: { doc_count: b.doc_count } }));

    }

    //nested
    if (!aggregation.buckets) {
      Object.keys(aggregation).forEach((key) => {
        if (aggregation[key].buckets) {
          const buckets = aggregation[key].buckets.map((option) => _objectSpread({
            key: option.key },
          option.filtered.total));

          result[key] = {
            type: 'nested',
            doc_count: aggregation[key].doc_count,
            buckets };

        }
      });
    }

    if (aggregation.buckets) {
      aggregation.buckets = aggregation.buckets.filter((b) => b.filtered.doc_count);
      const missingBucket = aggregation.buckets.find((b) => b.key === 'missing');

      aggregation.count = aggregation.buckets.length;
      aggregation.buckets = aggregation.buckets.slice(0, limit);

      const bucketsIncludeMissing = aggregation.buckets.find((b) => b.key === 'missing');
      if (!bucketsIncludeMissing && missingBucket) {
        aggregation.buckets = aggregation.buckets.slice(0, limit - 1);
        aggregation.buckets.push(missingBucket);
      }
    }

    result[aggregationKey] = aggregation;
  });

  return result;
};

const _addAnyAggregation = (aggregations, filters, response) => {
  const result = {};
  Object.keys(aggregations).map((aggregationKey) => {
    const aggregation = aggregations[aggregationKey];

    if (aggregation.buckets && aggregationKey !== '_types') {
      const missingBucket = aggregation.buckets.find((b) => b.key === 'missing');
      const keyFilters = ((filters || {})[aggregationKey.replace('.value', '')] || {}).values || [];
      const filterNoneOrMissing =
      !keyFilters.filter((v) => v !== 'any').length || keyFilters.find((v) => v === 'missing');

      const anyCount =
      (typeof response.body.hits.total === 'object' ?
      response.body.hits.total.value :
      response.body.hits.total) - (
      missingBucket && filterNoneOrMissing ? missingBucket.filtered.doc_count : 0);

      aggregation.buckets.push({
        key: 'any',
        doc_count: anyCount,
        label: 'Any',
        filtered: { doc_count: anyCount } });

      aggregation.count += 1;
    }

    result[aggregationKey] = aggregation;
  });

  return result;
};

const _sanitizeAggregations = async (
aggregations,
templates,
dictionaries,
language,
limit = _config.preloadOptionsLimit) =>
{
  const sanitizedAggregations = _sanitizeAggregationsStructure(aggregations, limit);
  const sanitizedAggregationNames = _sanitizeAgregationNames(sanitizedAggregations);
  return _denormalizeAggregations(sanitizedAggregationNames, templates, dictionaries, language);
};

const permissionsInformation = (hit, user) => {
  const { permissions } = hit._source;

  const canWrite = (0, _permissionsUtils.checkWritePermissions)(user, permissions);

  return canWrite ? permissions : undefined;
};

const processResponse = async (response, templates, dictionaries, language, filters) => {
  const user = _permissionsContext.permissionsContext.getUserInContext();
  const rows = response.body.hits.hits.map((hit) => {
    const result = hit._source;
    result._explanation = hit._explanation;
    result.snippets = snippetsFromSearchHit(hit);
    result._id = hit._id;
    result.permissions = permissionsInformation(hit, user);
    return result;
  });
  const sanitizedAggregations = await _sanitizeAggregations(
  response.body.aggregations.all,
  templates,
  dictionaries,
  language);


  const aggregationsWithAny = _addAnyAggregation(sanitizedAggregations, filters, response);

  return {
    rows,
    totalRows: response.body.hits.total.value,
    relation: response.body.hits.total.relation,
    aggregations: { all: aggregationsWithAny } };

};

const entityHasGeolocation = (entity) =>
entity.metadata &&
!!Object.keys(entity.metadata).
filter((field) => entity.metadata[field]).
find((field) => {
  if (/_geolocation/.test(field) && entity.metadata[field].length) {
    return true;
  }
  if (Array.isArray(entity.metadata[field])) {
    return !!entity.metadata[field].find(
    (f) => f.inherit_geolocation && f.inherit_geolocation.length);

  }
  return false;
});

const processGeolocationResults = (_results) => {
  const results = _results;
  results.rows = results.rows.
  filter((r) => r.metadata).
  map((_row) => _objectSpread(_objectSpread({},
  _row), {}, {
    metadata: Object.fromEntries(
    Object.entries(_row.metadata).map(([key, values]) => [
    key,
    values.map((_v) => {
      const newValue = _objectSpread({}, _v);
      if (_v.inheritedType === _propertyTypes.propertyTypes.geolocation) {
        newValue.inherit_geolocation = (_v.inheritedValue || []).filter((iv) => iv.value);
      }
      return newValue;
    })])) })).



  filter((r) => r.metadata && Object.keys(r.metadata).length && entityHasGeolocation(r));
  results.totalRows = results.rows.length;
  return results;
};

const _getTextFields = (query, templates) =>
query.fields ||
_comonProperties.default.
allUniqueProperties(templates).
map((prop) =>
['text', 'markdown', 'generatedid'].includes(prop.type) ?
`metadata.${prop.name}.value` :
`metadata.${prop.name}.label`).

concat(['title', 'fullText']);

async function searchTypeFromSearchTermValidity(searchTerm) {
  const validationResult = await _elastic.elastic.indices.validateQuery({
    body: { query: { query_string: { query: searchTerm } } } });

  return validationResult.body.valid ? 'query_string' : 'simple_query_string';
}

const buildQuery = async (query, language, user, resources, includeReviewAggregations) => {
  const [templates, dictionaries] = resources;
  const textFieldsToSearch = _getTextFields(query, templates);
  const searchTextType = query.searchTerm ?
  await searchTypeFromSearchTermValidity(query.searchTerm) :
  'query_string';
  const onlyPublished = query.published || !(query.includeUnpublished || query.unpublished);
  const queryBuilder = (0, _documentQueryBuilder.default)().
  include(query.include).
  fullTextSearch(query.searchTerm, textFieldsToSearch, 2, searchTextType).
  filterByTemplate(query.types).
  filterById(query.ids).
  language(language).
  filterByPermissions(onlyPublished);

  if (Number.isInteger(parseInt(query.from, 10))) {
    queryBuilder.from(query.from);
  }

  if (Number.isInteger(parseInt(query.limit, 10))) {
    queryBuilder.limit(query.limit);
  }

  if (query.includeUnpublished && user && !query.unpublished) {
    queryBuilder.includeUnpublished();
  }

  if (query.unpublished && user) {
    queryBuilder.onlyUnpublished();
  }

  const allProps = _comonProperties.default.allProperties(templates);
  if (query.sort) {
    const sortingProp = allProps.find((p) =>
    [`metadata.${p.name}`, `metadata.${p.name}.inheritedValue`].includes(query.sort));

    const sortByLabel =
    sortingProp && (
    sortingProp.type === 'select' ||
    sortingProp.inherit && sortingProp.inherit.type === 'select');
    queryBuilder.sort(query.sort, query.order, sortByLabel);
  }

  const allTemplates = templates.map((t) => t._id);
  const filteringTypes = query.types && query.types.length ? query.types : allTemplates;
  let properties =
  !query.types || !query.types.length ?
  _comonProperties.default.defaultFilters(templates) :
  _comonProperties.default.comonFilters(templates, filteringTypes);

  if (query.allAggregations) {
    properties = allProps;
  }

  // this is where we decide which aggregations to send to elastic
  const aggregations = aggregationProperties(properties, allProps);

  const filters = processFilters(query.filters, [...allProps, ...properties], dictionaries);
  // this is where the query filters are built
  queryBuilder.filterMetadata(filters);
  queryBuilder.customFilters(query.customFilters);
  // this is where the query aggregations are built
  queryBuilder.aggregations(aggregations, dictionaries, includeReviewAggregations);

  return queryBuilder;
};

const search = {
  async search(query, language, user) {
    const resources = await Promise.all([_templates.default.get(), _dictionariesModel.default.get()]);
    const [templates, dictionaries] = resources;
    const includeReviewAggregations = query.includeReviewAggregations || false;
    const queryBuilder = await buildQuery(
    query,
    language,
    user,
    resources,
    includeReviewAggregations);

    if (query.geolocation) {
      searchGeolocation(queryBuilder, templates);
    }

    if (query.aggregatePermissionsByLevel) {
      queryBuilder.permissionsLevelAgreggations();
    }

    if (query.aggregatePermissionsByUsers) {
      queryBuilder.permissionsUsersAgreggations();
    }

    if (query.aggregateGeneratedToc) {
      queryBuilder.generatedTocAggregations();
    }

    if (query.aggregatePublishingStatus) {
      queryBuilder.publishingStatusAggregations();
    }

    return _elastic.elastic.
    search({ body: queryBuilder.query() }).
    then((response) => processResponse(response, templates, dictionaries, language, query.filters)).
    catch((e) => {
      throw (0, _utils.createError)(e, 400);
    });
  },

  async searchGeolocations(query, language, user) {
    let results = await this.search(_objectSpread(_objectSpread({}, query), {}, { geolocation: true }), language, user);

    if (results.rows.length) {
      results = processGeolocationResults(results);
    }

    return results;
  },

  async searchSnippets(searchTerm, sharedId, language, user) {
    const templates = await _templates.default.get();

    const searchTextType = searchTerm ?
    await searchTypeFromSearchTermValidity(searchTerm) :
    'query_string';
    const searchFields = _comonProperties.default.
    textFields(templates).
    map((prop) => `metadata.${prop.name}.value`).
    concat(['title', 'fullText']);
    const query = (0, _documentQueryBuilder.default)().
    fullTextSearch(searchTerm, searchFields, 9999, searchTextType).
    filterById(sharedId).
    language(language);

    if (user) {
      query.includeUnpublished();
    }

    const response = await _elastic.elastic.search({
      body: query.query() });


    if (response.body.hits.hits.length === 0) {
      return {
        count: 0,
        metadata: [],
        fullText: [] };

    }
    return snippetsFromSearchHit(response.body.hits.hits[0]);
  },

  async indexEntities(query, select = '', limit = 50, batchCallback = () => {}) {
    return (0, _entitiesIndex.indexEntities)({
      query,
      select,
      limit,
      batchCallback,
      searchInstance: this });

  },

  async bulkIndex(docs, action = 'index') {
    return (0, _entitiesIndex.bulkIndex)(docs, action);
  },

  bulkDelete(docs) {
    const body = docs.map((doc) => ({
      delete: { _id: doc._id } }));

    return _elastic.elastic.bulk({ body });
  },

  delete(entity) {
    const id = entity._id.toString();
    return _elastic.elastic.delete({ id });
  },

  deleteLanguage(language) {
    const query = { query: { match: { language } } };
    return _elastic.elastic.deleteByQuery({ body: query });
  },

  async autocompleteAggregations(query, language, propertyName, searchTerm, user) {
    const [templates, dictionaries] = await Promise.all([
    _templates.default.get(),
    _dictionariesModel.default.get()]);


    const queryBuilder = await buildQuery(_objectSpread(_objectSpread({}, query), {}, { limit: 0 }), language, user, [
    templates,
    dictionaries]);


    const property = _comonProperties.default.
    allUniqueProperties(templates).
    find((p) => p.name === propertyName);

    queryBuilder.
    resetAggregations().
    aggregations([_objectSpread(_objectSpread({}, property), {}, { name: `${propertyName}.value` })], dictionaries);

    const body = queryBuilder.query();

    const aggregation = body.aggregations.all.aggregations[`${propertyName}.value`];

    aggregation.aggregations.filtered.filter.bool.filter.push({
      wildcard: { [`metadata.${propertyName}.label`]: { value: `*${searchTerm.toLowerCase()}*` } } });


    const response = await _elastic.elastic.search({
      body });


    const sanitizedAggregations = await _sanitizeAggregations(
    response.body.aggregations.all,
    templates,
    dictionaries,
    language,
    _config.preloadOptionsSearch);


    const options = sanitizedAggregations[propertyName].buckets.
    map((bucket) => ({
      label: bucket.label,
      value: bucket.key,
      icon: bucket.icon,
      results: bucket.filtered.doc_count })).

    filter((o) => o.results);

    const filteredOptions = (0, _optionsUtils.filterOptions)(searchTerm, options);

    return {
      options: filteredOptions.slice(0, _config.preloadOptionsLimit),
      count: filteredOptions.length };

  },

  async autocomplete(searchTerm, language, templates = []) {
    const queryBuilder = (0, _documentQueryBuilder.default)().
    include(['title', 'template', 'sharedId', 'icon']).
    language(language).
    limit(_config.preloadOptionsSearch).
    filterByPermissions().
    includeUnpublished();

    if (templates.length) {
      queryBuilder.filterByTemplate(templates);
    }

    const body = queryBuilder.query();

    body.query.bool.must = [
    {
      multi_match: {
        query: searchTerm,
        type: 'bool_prefix',
        fields: ['title.sayt', 'title.sayt._2gram', 'title.sayt._3gram', 'title.sayt_ngram'] } }];




    delete body.aggregations;

    const response = await _elastic.elastic.search({ body });

    const options = response.body.hits.hits.slice(0, _config.preloadOptionsLimit).map((hit) => ({
      value: hit._source.sharedId,
      label: hit._source.title,
      template: hit._source.template,
      icon: hit._source.icon }));


    return { count: response.body.hits.hits.length, options };
  },

  async updateTemplatesMapping() {
    const templates = await _templates.default.get();
    return (0, _entitiesIndex.updateMapping)(templates);
  },

  async countPerTemplate(language) {
    const queryBuilder = (0, _documentQueryBuilder.default)().language(language).includeUnpublished().limit(0);

    return (
    await _elastic.elastic.search({ body: queryBuilder.query() })).
    body.aggregations.all._types.buckets.reduce((map, bucket) => {
      // eslint-disable-next-line no-param-reassign
      map[bucket.key] = bucket.filtered.doc_count;
      return map;
    }, {});
  } };exports.search = search;