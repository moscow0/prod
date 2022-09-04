"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _users = _interopRequireDefault(require("../users/users"));

var _validateUserGroup = require("./validateUserGroup");


var _userGroupsModel = _interopRequireDefault(require("./userGroupsModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  async get(query, select = '', options = {}) {
    const userGroups = await _userGroupsModel.default.get(query, select, options);
    const usersInGroups = userGroups.reduce(
    (memo, group) => memo.concat(group.members.map((m) => m.refId.toString())),
    []);

    const usersFound = await _users.default.get(
    { _id: { $in: usersInGroups } },
    { username: 1, role: 1, email: 1 });


    const members = usersFound.map((u) => ({
      refId: u._id,
      username: u.username,
      role: u.role,
      email: u.email }));


    return userGroups.map((group) => _objectSpread(_objectSpread({},
    group), {}, {
      members: group.members.map(
      (m) => members.find((u) => u.refId.toString() === m.refId.toString()) || m) }));


  },

  async save(userGroup) {
    await (0, _validateUserGroup.validateUserGroup)(userGroup);
    const members = userGroup.members.map((m) => ({ refId: m.refId }));

    return _userGroupsModel.default.save(_objectSpread(_objectSpread({}, userGroup), {}, { members }));
  },

  async saveMultiple(userGroups) {
    const groupsToUpdate = userGroups.map((userGroup) => {
      const members = userGroup.members.map((m) => ({ refId: m.refId.toString() }));
      return _objectSpread(_objectSpread({}, userGroup), {}, { members });
    });
    await Promise.all(
    groupsToUpdate.map(async (group) => {
      await (0, _validateUserGroup.validateUserGroup)(group);
    }));

    return _userGroupsModel.default.saveMultiple(groupsToUpdate);
  },

  async delete(query) {
    return _userGroupsModel.default.delete(query);
  } };exports.default = _default;