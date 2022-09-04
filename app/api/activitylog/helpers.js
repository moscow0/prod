"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updatedFile = exports.translationsName = exports.templateName = exports.nameFunc = exports.migrationLog = exports.loadTemplate = exports.loadSuggestionData = exports.loadPermissionsData = exports.loadFile = exports.loadEntityFromPublicForm = exports.loadEntity = exports.loadAllowedUsersAndGroups = exports.groupMembers = exports.formatLanguage = exports.formatDataLanguage = exports.extraTemplate = exports.extraAttachmentLanguage = exports.entitiesNames = void 0;var _languagesList = require("../../shared/languagesList");
var _migrationsParser = require("./migrationsParser");
var _templates = _interopRequireDefault(require("../templates/templates"));
var _entities = _interopRequireDefault(require("../entities/entities"));
var _users = _interopRequireDefault(require("../users/users"));
var _userGroups = _interopRequireDefault(require("../usergroups/userGroups"));
var _files = require("../files");
var _permissionSchema = require("../../shared/types/permissionSchema");
var _suggestions = require("../suggestions/suggestions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const formatLanguage = (langKey) => {
  const lang = _languagesList.availableLanguages.find(({ key }) => key === langKey);
  return lang ? `${lang.label} (${lang.key})` : langKey;
};exports.formatLanguage = formatLanguage;

const formatDataLanguage = (data) => formatLanguage(data.key);exports.formatDataLanguage = formatDataLanguage;

const translationsName = (data) => {
  const [context] = data.contexts;
  return data.contexts.length === 1 ?
  `in ${context.label} (${context.id})` :
  'in multiple contexts';
};exports.translationsName = translationsName;

const nameFunc = (data) => `${data.label} (${data.key})`;exports.nameFunc = nameFunc;

const migrationLog = (log) => {
  const data = JSON.parse(log.body);
  return _migrationsParser.typeParsers[data.type] ? _migrationsParser.typeParsers[data.type](data) : { action: 'RAW' };
};exports.migrationLog = migrationLog;

const templateName = (data) =>
data.templateData ? `${data.templateData.name} (${data._id})` : data._id;exports.templateName = templateName;

const loadEntityFromPublicForm = async (data) => {
  const entity = JSON.parse(data.entity);
  const templateData = await _templates.default.getById(entity.template);
  return _objectSpread(_objectSpread({}, data), {}, { templateData, title: entity.title });
};exports.loadEntityFromPublicForm = loadEntityFromPublicForm;

const loadTemplate = async (data) => {
  const templateData = await _templates.default.getById(data.template || data._id);
  return _objectSpread(_objectSpread({}, data), {}, { templateData });
};exports.loadTemplate = loadTemplate;

const loadEntity = async (data) => {
  const _id = data.entityId || data._id;
  const sharedId = data.sharedId || data.entity;
  const query = _objectSpread(_objectSpread({}, _id && { _id }), sharedId && { sharedId });
  const [entity] = await _entities.default.getUnrestricted(query);
  return _objectSpread(_objectSpread({}, data), {}, { entity, title: entity ? entity.title : undefined });
};exports.loadEntity = loadEntity;

const loadFile = async (data) => {
  const [file] = await _files.files.get({ _id: data._id });
  return _objectSpread(_objectSpread({}, data), {}, { file, title: file ? file.originalname : `id: ${data._id}` });
};exports.loadFile = loadFile;

const extraTemplate = (data) =>
`of type ${
data.templateData ?
data.templateData.name :
`(${data.template ? data.template.toString() : 'unassigned'})`
}`;exports.extraTemplate = extraTemplate;

const extraAttachmentLanguage = (data) =>
data.entity ?
`of entity '${data.entity.title}' (${data.entity.sharedId}) ${formatLanguage(
data.entity.language)
} version` :
null;exports.extraAttachmentLanguage = extraAttachmentLanguage;

const updatedFile = (data) => {
  let name;
  if (data.toc) {
    name = 'ToC, ';
  } else {
    name = '';
  }
  return `${name}${data.title}`;
};exports.updatedFile = updatedFile;

const groupMembers = (data) => {
  const members = data.members.map((member) => member.username).join(', ');
  return members.length > 0 ? `with members: ${members}` : 'with no members';
};exports.groupMembers = groupMembers;

const loadPermissionsData = async (data) => {
  const updateEntities = await _entities.default.getUnrestricted(
  { sharedId: { $in: data.ids } },
  { title: 1 });

  const permissionsIds = data.permissions.
  filter((p) => p.type !== _permissionSchema.PermissionType.PUBLIC).
  map((pu) => pu.refId);
  const allowedUsers = await _users.default.get({ _id: { $in: permissionsIds } }, { username: 1 });
  const allowedGroups = await _userGroups.default.get(
  { _id: { $in: permissionsIds } },
  { name: 1, members: 1 });

  const publicPermission = !!data.permissions.find((p) => p.type === _permissionSchema.PermissionType.PUBLIC);

  return _objectSpread(_objectSpread({},
  data), {}, {
    entities: updateEntities,
    users: allowedUsers,
    userGroups: allowedGroups,
    public: publicPermission });

};exports.loadPermissionsData = loadPermissionsData;

const entitiesNames = (data) => data.entities.map((e) => e.title).join(', ');exports.entitiesNames = entitiesNames;

function getNameOfAllowedPeople(source, field) {
  return (p) => {
    const people = source.find((u) => u._id.toString() === p.refId);
    return `${people && people[field] ? people[field] : p.refId} - ${p.level}`;
  };
}

const loadAllowedUsersAndGroups = (data) => {
  const usersPermissions = data.permissions.filter((p) => p.type === _permissionSchema.PermissionType.USER);
  const groupsPermissions = data.permissions.filter((p) => p.type === _permissionSchema.PermissionType.GROUP);
  const grantedUsers = usersPermissions.
  map(getNameOfAllowedPeople(data.users, 'username')).
  join(', ');
  const grantedNames = groupsPermissions.
  map(getNameOfAllowedPeople(data.userGroups, 'name')).
  join(', ');

  return ` with permissions for${grantedUsers.length ? ` USERS: ${grantedUsers};` : ''}${
  grantedNames.length ? ` GROUPS: ${grantedNames}` : ''
  }${data.public ? '; PUBLIC' : ''}`;
};exports.loadAllowedUsersAndGroups = loadAllowedUsersAndGroups;

const loadSuggestionData = async (data) => {
  const suggestion = await _suggestions.Suggestions.getById(data.suggestion._id);
  const entity = await _entities.default.getById(data.suggestion.entityId);
  return _objectSpread(_objectSpread(_objectSpread({}, data), suggestion), {}, { title: entity === null || entity === void 0 ? void 0 : entity.title });
};exports.loadSuggestionData = loadSuggestionData;