"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getSuggestionState = void 0;var _isSameDate = require("./isSameDate");

var _suggestionSchema = require("./types/suggestionSchema");










const equalsForType = (type) => (first, second) =>
type === 'date' ? (0, _isSameDate.isSameDate)(first, second) : first === second;

const getLabelingState = ({ currentValue, labeledValue }) => {
  if (labeledValue) {
    return 'Label';
  }

  if (currentValue) {
    return 'Value';
  }

  return 'Empty';
};

const getMatchingState = (
{ suggestedValue, currentValue },
propertyType) =>
{
  const equals = equalsForType(propertyType);

  if (suggestedValue === '') {
    return 'Empty';
  }

  if (equals(suggestedValue, currentValue)) {
    return 'Match';
  }

  return 'Mismatch';
};

const getSuggestionState = (
values,
propertyType) =>
{
  const { modelCreationDate, error, date } = values;

  if (!!error && error !== '') {
    return _suggestionSchema.SuggestionState.error;
  }

  if (date < modelCreationDate) {
    return _suggestionSchema.SuggestionState.obsolete;
  }

  const matchState = getMatchingState(values, propertyType);
  const labelState = getLabelingState(values);

  const state = {
    Empty: {
      Empty: _suggestionSchema.SuggestionState.empty,
      Label: _suggestionSchema.SuggestionState.labelEmpty,
      Value: _suggestionSchema.SuggestionState.valueEmpty },

    Match: {
      Empty: null,
      Label: _suggestionSchema.SuggestionState.labelMatch,
      Value: _suggestionSchema.SuggestionState.valueMatch },

    Mismatch: {
      Empty: _suggestionSchema.SuggestionState.emptyMismatch,
      Label: _suggestionSchema.SuggestionState.labelMismatch,
      Value: _suggestionSchema.SuggestionState.valueMismatch } }[

  matchState][labelState];

  if (state === null) throw new Error('Invalid suggestion state');

  return state;
};exports.getSuggestionState = getSuggestionState;