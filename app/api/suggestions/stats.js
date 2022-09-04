"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getStats = void 0;var _suggestionSchema = require("../../shared/types/suggestionSchema");

var _IXSuggestionsModel = require("./IXSuggestionsModel");











const addCount = (sum, group) => sum + group.count;

const addCountsOf = (groups, states) =>
groups.buckets.filter((g) => states.includes(g._id)).reduce(addCount, 0);

const getGroups = async (propertyName) =>
_IXSuggestionsModel.IXSuggestionsModel.db.
aggregate([
{ $match: { propertyName } },
{
  $facet: {
    buckets: [
    {
      $group: {
        _id: '$state',
        count: {
          $sum: 1 } } }],




    all: [
    {
      $count: 'count' }] } }]).





then(([result]) => result);

const getStats = async (propertyName) => {var _groups$all$;
  const groups = await getGroups(propertyName);

  const labeled = addCountsOf(groups, [
  _suggestionSchema.SuggestionState.labelMatch,
  _suggestionSchema.SuggestionState.labelMismatch,
  _suggestionSchema.SuggestionState.labelEmpty]);

  const nonLabeledMatching = addCountsOf(groups, [_suggestionSchema.SuggestionState.valueMatch]);
  const nonLabeledNotMatching = addCountsOf(groups, [_suggestionSchema.SuggestionState.valueMismatch]);
  const emptyOrObsolete = addCountsOf(groups, [
  _suggestionSchema.SuggestionState.empty,
  _suggestionSchema.SuggestionState.obsolete,
  _suggestionSchema.SuggestionState.valueEmpty,
  _suggestionSchema.SuggestionState.emptyMismatch]);

  const all = ((_groups$all$ = groups.all[0]) === null || _groups$all$ === void 0 ? void 0 : _groups$all$.count) || 0;

  const labeledNonEmpty = nonLabeledMatching + nonLabeledNotMatching;
  const accuracy = labeledNonEmpty ? nonLabeledMatching / labeledNonEmpty : 0;

  return {
    counts: {
      labeled,
      nonLabeledMatching,
      nonLabeledNotMatching,
      emptyOrObsolete,
      all },

    accuracy };

};exports.getStats = getStats;