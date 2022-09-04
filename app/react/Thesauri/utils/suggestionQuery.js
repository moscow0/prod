"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.buildLabelCounts = buildLabelCounts;exports.flattenLabelCounts = flattenLabelCounts;

/* An Un-sanitized Elastic Search Result
.
└── template results: []
    ├── result 1: {}
    └── result 2: {}
        ├── rows: []
        ├── totalRows: number
        └── aggregations: []
            └── aggregation: {}
                └── all: {}
                    ├── meta
                    ├── doc_count: number
                    ├── thesaurus: {}
                    │   └── buckets: []
                    └── _thesaurus: {}
                        └── buckets: []
                            └── bucket: {}
                                ├── key: string
                                ├── doc_count: number
                                └── filtered: {}
                                    ├── meta
                                    └── doc_count: number
                                    */

/* Takes an elastic query response and transforms it into a SuggestionResult.*/
function buildLabelCounts(
raw,
thesaurusPropertyName,
countSuggestions = true)
{
  const suggestionFieldName = `${countSuggestions ? '__' : ''}${thesaurusPropertyName}`;
  const result = {};
  result.totalRows = raw.totalRows || 0;
  result.totalLabels = 0;
  if (
  raw.aggregations !== undefined &&
  raw.aggregations.all !== undefined &&
  raw.aggregations.all.hasOwnProperty(suggestionFieldName))
  {
    const { buckets: rawValues } = raw.aggregations.all[suggestionFieldName];
    const totalValues = {};
    rawValues.forEach((rawResult) => {
      totalValues[rawResult.key] = rawResult.filtered.doc_count;
      result.totalLabels += rawResult.filtered.doc_count;
    });
    result.thesaurus = {
      propertyName: thesaurusPropertyName,
      totalValues };

  }
  return result;
}

/* Flattens SuggestionResult[] into a single SuggestionResult. */
function flattenLabelCounts(
perTemplate,
thesaurusPropertyName)
{
  const result = {
    totalRows: 0,
    totalLabels: 0,
    thesaurus: { propertyName: thesaurusPropertyName, totalValues: {} } };

  perTemplate.forEach((templateResult) => {
    result.totalRows += templateResult.totalRows;
    result.totalLabels += templateResult.totalLabels;
    if (
    templateResult.hasOwnProperty('thesaurus') &&
    templateResult.thesaurus.hasOwnProperty('totalValues'))
    {
      Object.entries(templateResult.thesaurus.totalValues).forEach(([key, value]) => {
        if (!result.thesaurus.totalValues.hasOwnProperty(key)) {
          result.thesaurus.totalValues[key] = 0;
        }
        result.thesaurus.totalValues[key] += value || 0;
      });
    }
  });
  return result;
}