"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getLabelsQuery = getLabelsQuery;exports.getReadyToPublishSuggestionsQuery = getReadyToPublishSuggestionsQuery;exports.getReadyToReviewSuggestionsQuery = getReadyToReviewSuggestionsQuery;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function baseQuery(templateID, includeUnpublished, unpublishedOnly) {
  const query = {
    select: ['sharedId'],
    limit: 1,
    filters: {},
    includeUnpublished,
    unpublished: unpublishedOnly,
    allAggregations: true,
    types: [templateID],
    includeReviewAggregations: true };

  return query;
}

function getReadyToReviewSuggestionsQuery(
templateID,
templateProperty)
{
  if (!templateProperty || !templateProperty.name) {
    return null;
  }
  const { name } = templateProperty;
  return _objectSpread(_objectSpread({},
  baseQuery(templateID, true, false)), {}, {
    filters: {
      [name]: {
        values: ['missing'] },

      [`__${name}`]: {
        values: ['any'] } } });



}

function getReadyToPublishSuggestionsQuery(
templateID,
templateProperty)
{
  if (!templateProperty || !templateProperty.name) {
    return null;
  }
  const { name } = templateProperty;
  return _objectSpread(_objectSpread({},
  baseQuery(templateID, false, true)), {}, {
    filters: {
      [name]: {
        values: ['any'] },

      [`__${name}`]: {
        values: ['any'] } } });



}

function getLabelsQuery(templateID, templateProperty) {
  if (!templateProperty || !templateProperty.name) {
    return null;
  }
  const { name } = templateProperty;
  return _objectSpread(_objectSpread({},
  baseQuery(templateID, true, false)), {}, {
    filters: {
      [name]: {
        values: ['any'] } } });



}