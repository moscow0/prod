"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveGroup = exports.getGroups = exports.deleteGroup = void 0;var _api = _interopRequireDefault(require("../../../utils/api"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}




const getGroups = async (requestParams) => {
  const response = await _api.default.get('usergroups', requestParams);
  return response.json;
};exports.getGroups = getGroups;
const saveGroup = async (requestParams) => {
  const response = await _api.default.post('usergroups', requestParams);
  return response.json;
};exports.saveGroup = saveGroup;
const deleteGroup = async (requestParams) => {
  const response = await _api.default.delete('usergroups', requestParams);
  return response.json;
};exports.deleteGroup = deleteGroup;