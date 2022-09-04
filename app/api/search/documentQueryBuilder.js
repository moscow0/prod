"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;

var _config = require("../../shared/config");
var _permissionsContext = require("../permissions/permissionsContext");
var _userSchema = require("../../shared/types/userSchema");
var _metadataMatchers = _interopRequireWildcard(require("./metadataMatchers"));
var _metadataAggregations = require("./metadataAggregations");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} /* eslint-disable camelcase, max-lines */







const nested = (filters, path) => ({
  nested: {
    path,
    query: {
      bool: {
        must: filters } } } });





const matchAggregationsToFilter = (aggregations, baseQuery) => {
  const { filter } = aggregations._types.aggregations.filtered.filter.bool;
  filter.splice(0, 1, baseQuery.query.bool.filter[0]);
};

function _default() {
  const getDefaultFilter = () => [
  {
    bool: {
      should: [
      {
        term: {
          published: true } }] } }];







  const baseQuery = {
    explain: false,
    _source: {
      include: [
      'title',
      'icon',
      'processed',
      'creationDate',
      'editDate',
      'template',
      'metadata',
      'type',
      'sharedId',
      'toc',
      'attachments',
      'language',
      'documents',
      'uploaded',
      'published',
      'relationships'],

      excludes: ['documents.__v'] },

    from: 0,
    size: 30,
    query: {
      bool: {
        must: [{ bool: { should: [] } }],
        must_not: [],
        filter: getDefaultFilter() } },


    sort: [],
    aggregations: {
      all: {
        global: {},
        aggregations: {
          _types: {
            terms: {
              field: 'template.raw',
              missing: 'missing',
              size: _config.preloadOptionsSearch },

            aggregations: {
              filtered: {
                filter: {
                  bool: {
                    must: [{ bool: { should: [] } }],
                    filter: getDefaultFilter() } } } } } } } } };










  const { aggregations } = baseQuery.aggregations.all;
  const fullTextBool = baseQuery.query.bool.must[0];
  const aggregationsFullTextBool = aggregations._types.aggregations.filtered.filter.bool.must[0];
  function addFullTextFilter(filter) {
    fullTextBool.bool.should.push(filter);
    aggregationsFullTextBool.bool.should.push(filter);
  }

  function addFilter(filter) {
    baseQuery.query.bool.filter.push(filter);
    baseQuery.aggregations.all.aggregations._types.aggregations.filtered.filter.bool.filter.push(
    filter);

  }

  function addPermissionsAssigneeFilter(filter) {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    if (!user) return;
    const ownRefIds = _permissionsContext.permissionsContext.permissionsRefIds();
    const values =
    (user === null || user === void 0 ? void 0 : user.role) === _userSchema.UserRole.ADMIN ?
    filter.values :
    filter.values.filter((v) => ownRefIds.includes(v.refId));

    addFilter({
      bool: {
        [`${filter.and ? 'must' : 'should'}`]: values.map(({ refId, level }) =>
        nested(
        [{ term: { 'permissions.refId': refId } }, { term: { 'permissions.level': level } }],
        'permissions')) } });




  }

  return {
    query() {
      return baseQuery;
    },

    // eslint-disable-next-line max-statements
    fullTextSearch(
    term,
    fieldsToSearch = ['title', 'fullText'],
    number_of_fragments = 1,
    searchTextType = 'query_string')
    {
      if (!term) {
        return this;
      }
      const type = 'fvh';
      const fragment_size = 300;
      const should = [];
      const includeFullText = fieldsToSearch.includes('fullText');
      const fields = fieldsToSearch.filter((field) => field !== 'fullText');
      if (fields.length) {
        should.push({
          [searchTextType]: {
            query: term,
            fields,
            boost: 2 } });



        baseQuery.highlight = {
          order: 'score',
          pre_tags: ['<b>'],
          post_tags: ['</b>'],
          encoder: 'html',
          fields: fields.map((field) => ({ [field]: {} })) };

      }

      if (includeFullText) {
        const fullTextQuery = {
          has_child: {
            type: 'fullText',
            score_mode: 'max',
            inner_hits: {
              _source: false,
              highlight: {
                order: 'score',
                pre_tags: ['<b>'],
                post_tags: ['</b>'],
                encoder: 'html',
                fields: {
                  'fullText_*': {
                    number_of_fragments,
                    type,
                    fragment_size,
                    fragmenter: 'span' } } } },




            query: {
              [searchTextType]: {
                query: term,
                fields: ['fullText_*'] } } } };





        should.unshift(fullTextQuery);
      }

      addFullTextFilter({ bool: { should } });
      return this;
    },

    select(fields) {
      baseQuery._source.include = fields;
      return this;
    },

    include(fields = []) {
      baseQuery._source.include = baseQuery._source.include.concat(fields);
      return this;
    },

    language(language) {
      const match = { term: { language } };
      baseQuery.query.bool.filter.push(match);
      aggregations._types.aggregations.filtered.filter.bool.must.push(match);
      return this;
    },

    onlyUnpublished() {
      baseQuery.query.bool.filter[0].bool.must = baseQuery.query.bool.filter[0].bool.should;
      baseQuery.query.bool.filter[0].bool.must[0].term.published = false;
      delete baseQuery.query.bool.filter[0].bool.should;
      matchAggregationsToFilter(aggregations, baseQuery);
      return this;
    },

    includeUnpublished() {
      const user = _permissionsContext.permissionsContext.getUserInContext();
      if (user && ['admin', 'editor'].includes(user.role)) {
        const shouldFilter = baseQuery.query.bool.filter[0].bool.should[0];
        if (shouldFilter.term && shouldFilter.term.published) {
          delete baseQuery.query.bool.filter[0].bool.should.splice(shouldFilter, 1);
        }
      }
      matchAggregationsToFilter(aggregations, baseQuery);
      return this;
    },

    publishingStatusAggregations() {
      if (_permissionsContext.permissionsContext.getUserInContext()) {
        baseQuery.aggregations.all.aggregations._published =
        (0, _metadataAggregations.publishingStatusAgreggations)(baseQuery);
      }
      return this;
    },

    owner(user) {
      const match = { match: { user: user._id } };
      baseQuery.query.bool.must.push(match);
      return this;
    },

    sort(property, order = 'desc', sortByLabel = false) {
      if (property === '_score') {
        return baseQuery.sort.push('_score');
      }
      const sort = {};
      const isAMetadataProperty = property.includes('metadata');
      const sortingKey = sortByLabel ? 'label' : 'value';
      const sortKey = isAMetadataProperty ? `${property}.${sortingKey}.sort` : `${property}.sort`;
      sort[sortKey] = { order, unmapped_type: 'boolean' };

      baseQuery.sort.push(sort);
      return this;
    },

    hasMetadataProperties(fieldNames) {
      const match = { bool: { should: [] } };
      match.bool.should = fieldNames.map((field) => ({ exists: { field: `metadata.${field}` } }));
      addFilter(match);
      return this;
    },

    filterMetadataByFullText(filters = []) {
      const match = {
        bool: {
          minimum_should_match: 1,
          should: [] } };


      filters.forEach((filter) => {
        const _match = (0, _metadataMatchers.multiselectFilter)(filter);
        if (_match) {
          match.bool.should.push(_match);
        }
      });

      if (match.bool.should.length) {
        addFullTextFilter(match);
      }
    },

    customFilters(filters = {}) {
      Object.keys(filters).
      filter((key) => {var _filters$key$values;return (_filters$key$values = filters[key].values) === null || _filters$key$values === void 0 ? void 0 : _filters$key$values.length;}).
      forEach((key) => {
        if (key === 'permissions') {
          addPermissionsAssigneeFilter(filters[key]);
          return;
        }

        addFilter({ terms: { [key]: filters[key].values } });
      });
      return this;
    },

    filterMetadata(filters = []) {
      filters.forEach((filter) => {
        const match = (0, _metadataMatchers.default)(filter, filter.suggested ? 'suggestedMetadata' : 'metadata');
        if (match) {
          addFilter(match);
        }
      });
      return this;
    },

    generatedTocAggregations() {
      baseQuery.aggregations.all.aggregations.generatedToc = (0, _metadataAggregations.generatedTocAggregations)(baseQuery);
    },

    permissionsLevelAgreggations() {
      baseQuery.aggregations.all.aggregations['_permissions.self'] =
      (0, _metadataAggregations.permissionsLevelAgreggations)(baseQuery);
    },

    permissionsUsersAgreggations() {
      if (!_permissionsContext.permissionsContext.getUserInContext()) return;

      baseQuery.aggregations.all.aggregations['_permissions.read'] = (0, _metadataAggregations.permissionsUsersAgreggations)(
      baseQuery,
      'read');

      baseQuery.aggregations.all.aggregations['_permissions.write'] = (0, _metadataAggregations.permissionsUsersAgreggations)(
      baseQuery,
      'write');

    },

    aggregations(properties, dictionaries, includeReviewAggregations) {
      properties.forEach((property) => {
        baseQuery.aggregations.all.aggregations[property.name] = (0, _metadataAggregations.propertyToAggregation)(
        property,
        dictionaries,
        baseQuery);

      });
      if (includeReviewAggregations) {
        // suggested has an implied '__' as a prefix
        properties.forEach((property) => {
          baseQuery.aggregations.all.aggregations[`__${property.name}`] = (0, _metadataAggregations.propertyToAggregation)(
          property,
          dictionaries,
          baseQuery,
          true);

        });
      }
      return this;
    },

    filterByTemplate(templates = []) {
      if (templates.includes('missing')) {
        const _templates = templates.filter((t) => t !== 'missing');
        const match = {
          bool: {
            should: [
            {
              bool: {
                must_not: [
                {
                  exists: {
                    field: 'template' } }] } },





            {
              terms: {
                template: _templates } }] } };





        baseQuery.query.bool.filter.push(match);
        return this;
      }

      if (templates.length) {
        const match = { terms: { template: templates } };
        baseQuery.query.bool.filter.push(match);
      }
      return this;
    },

    filterById(ids = []) {
      let _ids;
      if (typeof ids === 'string') {
        _ids = [ids];
      }
      if (Array.isArray(ids)) {
        _ids = ids;
      }
      if (_ids.length) {
        const match = { terms: { 'sharedId.raw': _ids } };
        baseQuery.query.bool.filter.push(match);
      }
      return this;
    },

    highlight(fields) {
      baseQuery.highlight = {
        pre_tags: ['<b>'],
        post_tags: ['</b>'] };

      baseQuery.highlight.fields = {};
      fields.forEach((field) => {
        baseQuery.highlight.fields[field] = {};
      });
      return this;
    },

    from(from) {
      baseQuery.from = from;
      return this;
    },

    limit(size) {
      baseQuery.size = size;
      return this;
    },

    resetAggregations() {
      baseQuery.aggregations.all.aggregations = {};
      return this;
    },

    filterByPermissions(onlyPublished) {
      if (onlyPublished) {
        return this;
      }

      const user = _permissionsContext.permissionsContext.getUserInContext();
      if (user && !['admin', 'editor'].includes(user.role)) {
        const permissionsFilter = nested(
        [{ terms: { 'permissions.refId': _permissionsContext.permissionsContext.permissionsRefIds() } }],
        'permissions');

        baseQuery.query.bool.filter[0].bool.should.push(permissionsFilter);
      }

      return this;
    } };

}