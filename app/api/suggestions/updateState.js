"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateStates = void 0;

var _settings = _interopRequireDefault(require("../settings"));
var _templates = _interopRequireDefault(require("../templates"));
var _objectIndex = require("../../shared/data_utils/objectIndex");
var _getIXSuggestionState = require("../../shared/getIXSuggestionState");

var _IXSuggestionsModel = require("./IXSuggestionsModel");
var _pipelineStages = require("./pipelineStages");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}








const getModelCreationDateStage = () => [
{
  $lookup: {
    from: 'ixmodels',
    let: {
      localFieldPropertyName: '$propertyName' },

    pipeline: [
    {
      $match: {
        $expr: {
          $eq: ['$propertyName', '$$localFieldPropertyName'] } } }],




    as: 'model' } },


{
  $addFields: { model: { $arrayElemAt: ['$model', 0] } } },

{
  $addFields: {
    modelCreationDate: '$model.creationDate' } },


{
  $unset: 'model' }];



const findSuggestions = (query, languages) =>
_IXSuggestionsModel.IXSuggestionsModel.db.
aggregateCursor([
{ $match: _objectSpread(_objectSpread({}, query), {}, { status: { $ne: 'processing' } }) },
...(0, _pipelineStages.getEntityStage)(languages),
...(0, _pipelineStages.getCurrentValueStage)(),
{
  $unset: 'entity' },

...(0, _pipelineStages.getFileStage)(),
...(0, _pipelineStages.getLabeledValueStage)(),
{
  $unset: 'file' },

...getModelCreationDateStage(),
{
  $project: {
    _id: 1,
    currentValue: 1,
    labeledValue: 1,
    labeledText: 1,
    suggestedValue: 1,
    modelCreationDate: 1,
    error: 1,
    date: 1,
    propertyName: 1 } }]).



cursor().
exec();

const updateStates = async (query) => {
  const { languages } = await _settings.default.get();
  const propertyTypes = (0, _objectIndex.objectIndex)(
  (await _templates.default.get({})).map((t) => t.properties).flat(),
  (p) => p.name,
  (p) => p.type);

  const cursor = findSuggestions(query, languages || []);
  const writeStream = _IXSuggestionsModel.IXSuggestionsModel.openBulkWriteStream();
  let suggestion = await cursor.next();
  while (suggestion) {
    const propertyType = propertyTypes[suggestion.propertyName];
    // eslint-disable-next-line no-await-in-loop
    await writeStream.update(
    { _id: suggestion._id },
    { $set: { state: (0, _getIXSuggestionState.getSuggestionState)(suggestion, propertyType) } });

    // eslint-disable-next-line no-await-in-loop
    suggestion = await cursor.next();
  }
  await writeStream.flush();
};exports.updateStates = updateStates;