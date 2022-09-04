"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateUserMemberships = exports.getByMemberIdList = void 0;

var _userGroups = _interopRequireDefault(require("./userGroups"));
var _userGroupsModel = _interopRequireDefault(require("./userGroupsModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const getByMemberIdList = async (userIds) =>
_userGroupsModel.default.get({ 'members.refId': { $in: userIds } });exports.getByMemberIdList = getByMemberIdList;

const updateUserMemberships = async (
user,
groups) =>
{
  const storedUserGroups = await getByMemberIdList([user._id.toString()]);
  const newGroupsIds = groups.map((group) => group._id) || [];
  const groupsToUpdate = [];

  storedUserGroups.forEach((storedGroup) => {
    const keptGroup = newGroupsIds.find((groupId) => groupId === storedGroup._id.toString());
    if (!keptGroup) {
      const groupToUpdate = _objectSpread({}, storedGroup);
      groupToUpdate.members = storedGroup.members.filter(
      (m) => m.refId.toString() !== user._id.toString());

      groupsToUpdate.push(groupToUpdate);
    }
  });
  const missingGroupsIds = newGroupsIds.filter(
  (groupId) => !storedUserGroups.find((storedGroup) => storedGroup._id.toString() === groupId));

  const missingGroups = await _userGroups.default.get({ _id: { $in: missingGroupsIds } });
  missingGroups.forEach((group) => {
    group.members.push({ refId: user._id });
    groupsToUpdate.push(group);
  });
  await _userGroups.default.saveMultiple(groupsToUpdate);
};exports.updateUserMemberships = updateUserMemberships;