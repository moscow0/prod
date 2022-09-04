"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.searchCollaborators = exports.savePermissions = exports.loadGrantedPermissions = void 0;var _api = _interopRequireDefault(require("../utils/api"));
var _RequestParams = require("../utils/RequestParams");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



const searchCollaborators = async (value) => {
  const response = await _api.default.get('collaborators', new _RequestParams.RequestParams({ filterTerm: value }));
  return response.json;
};exports.searchCollaborators = searchCollaborators;

const loadGrantedPermissions = async (
sharedIds) =>
{
  const response = await _api.default.put('entities/permissions', new _RequestParams.RequestParams({ sharedIds }));
  return response.json;
};exports.loadGrantedPermissions = loadGrantedPermissions;

const savePermissions = async (
permissionsData) =>
{
  const response = await _api.default.post('entities/permissions', new _RequestParams.RequestParams(permissionsData));
  return response.json;
};exports.savePermissions = savePermissions;