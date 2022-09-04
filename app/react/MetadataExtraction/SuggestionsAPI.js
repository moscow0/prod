"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.trainModel = exports.saveConfigurations = exports.ixStatus = exports.getSuggestions = exports.getStats = exports.cancelFindingSuggestions = exports.acceptEntitySuggestion = void 0;
var _api = _interopRequireDefault(require("../utils/api"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



const getSuggestions = async (requestParams) => {
  const { json: response } = await _api.default.get('suggestions', requestParams);
  return {
    suggestions: response.suggestions,
    totalPages: response.totalPages };

};exports.getSuggestions = getSuggestions;

const getStats = async (requestParams) => {
  const { json: response } = await _api.default.get('suggestions/stats', requestParams);
  return response;
};exports.getStats = getStats;

const trainModel = async (requestParams) => {
  const { json: response } = await _api.default.post('suggestions/train', requestParams);
  return response;
};exports.trainModel = trainModel;

const cancelFindingSuggestions = async (requestParams) => {
  const { json: response } = await _api.default.post('suggestions/stop', requestParams);
  return response;
};exports.cancelFindingSuggestions = cancelFindingSuggestions;

const ixStatus = async (requestParams) => {
  const { json: response } = await _api.default.post('suggestions/status', requestParams);
  return response;
};exports.ixStatus = ixStatus;

const acceptEntitySuggestion = async (requestParams) => {
  const { json: response } = await _api.default.post('suggestions/accept', requestParams);
  return response;
};exports.acceptEntitySuggestion = acceptEntitySuggestion;
const saveConfigurations = async (requestParams) => {
  const { json: response } = await _api.default.post('suggestions/configurations', requestParams);
  return response;
};exports.saveConfigurations = saveConfigurations;