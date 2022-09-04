"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getValuesSortedByConfidence = getValuesSortedByConfidence;exports.getValuesSortedByName = getValuesSortedByName;exports.getValuesSortedByToBeReviewed = getValuesSortedByToBeReviewed;




/* Get thesaurus values sorted by name. */
function getValuesSortedByName(thesaurus) {
  const { values = [] } = thesaurus;
  // Ascending
  return values.sort((a, b) => `${a.label}`.localeCompare(b.label));
}

/* Get thesaurus values sorted by classifier model quality for that value. */
function getValuesSortedByConfidence(
thesaurus,
model)
{
  const { values: thesaurusValues = [] } = thesaurus;
  const { topics: modelValues = {} } = model;
  // Descending
  return thesaurusValues.sort(
  (a, b) => {var _modelValues$quality, _modelValues, _b$id, _modelValues$quality2, _modelValues2, _a$id;return ((_modelValues$quality = (_modelValues = modelValues[(_b$id = b.id) !== null && _b$id !== void 0 ? _b$id : '']) === null || _modelValues === void 0 ? void 0 : _modelValues.quality) !== null && _modelValues$quality !== void 0 ? _modelValues$quality : 0) - ((_modelValues$quality2 = (_modelValues2 = modelValues[(_a$id = a.id) !== null && _a$id !== void 0 ? _a$id : '']) === null || _modelValues2 === void 0 ? void 0 : _modelValues2.quality) !== null && _modelValues$quality2 !== void 0 ? _modelValues$quality2 : 0);});

}

/* Get thesaurus values sorted by number of documents with outstanding suggestions of that value. */
function getValuesSortedByToBeReviewed(
thesaurus,
suggestionResult)
{
  const { values: thesaurusValues = [] } = thesaurus;
  const { values: suggestionValues = {} } = suggestionResult.thesaurus;
  // Descending
  return thesaurusValues.sort(
  (a, b) => {var _suggestionValues, _b$id2, _suggestionValues2, _a$id2;return ((_suggestionValues = suggestionValues[(_b$id2 = b.id) !== null && _b$id2 !== void 0 ? _b$id2 : '']) !== null && _suggestionValues !== void 0 ? _suggestionValues : 0) - ((_suggestionValues2 = suggestionValues[(_a$id2 = a.id) !== null && _a$id2 !== void 0 ? _a$id2 : '']) !== null && _suggestionValues2 !== void 0 ? _suggestionValues2 : 0);});

}