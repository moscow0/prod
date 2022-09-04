"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.collaborators = void 0;var _users = _interopRequireDefault(require("../users/users"));
var _userGroups = _interopRequireDefault(require("../usergroups/userGroups"));
var _permissionSchema = require("../../shared/types/permissionSchema");



var _permissionsContext = require("./permissionsContext");
var _publicPermission = require("./publicPermission");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const collaborators = {
  search: async (filterTerm) => {
    const exactFilterTerm = new RegExp(`^${filterTerm}$`, 'i');
    const partialFilterTerm = new RegExp(`^${filterTerm}`, 'i');

    const matchedUsers = await _users.default.get({
      $or: [{ email: exactFilterTerm }, { username: exactFilterTerm }] });

    const groups = await _userGroups.default.get({ name: { $regex: partialFilterTerm } });

    const availableCollaborators = [];

    matchedUsers.forEach((user) => {
      availableCollaborators.push({
        refId: user._id,
        type: _permissionSchema.PermissionType.USER,
        label: user.username });

    });

    groups.forEach((group) => {
      availableCollaborators.push({
        refId: group._id.toString(),
        type: _permissionSchema.PermissionType.GROUP,
        label: group.name });

    });

    const user = _permissionsContext.permissionsContext.getUserInContext();

    if (user && ['admin', 'editor'].includes(user.role)) {
      availableCollaborators.push(_objectSpread({},
      _publicPermission.PUBLIC_PERMISSION));

    }

    return availableCollaborators;
  } };exports.collaborators = collaborators;