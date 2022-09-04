"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getSemanticData = void 0;var helpers = _interopRequireWildcard(require("./helpers"));

var _activityLogBuilder = require("./activityLogBuilder");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const entryValues = {
  'POST/api/users': {
    desc: 'Updated user',
    method: _activityLogBuilder.Methods.Update,
    idField: '_id',
    nameField: 'username' },

  'POST/api/entities/multipleupdate': { desc: 'Updated multiple entities' },
  'POST/api/entities/bulkdelete': { desc: 'Deleted multiple entities', method: _activityLogBuilder.Methods.Delete },
  'POST/api/attachments/upload': {
    desc: 'Uploaded attachment',
    method: _activityLogBuilder.Methods.Create,
    related: helpers.loadEntity,
    nameField: 'title' },

  'POST/api/settings': { desc: 'Updated settings' },
  'POST/api/relationships/bulk': { desc: 'Updated relationships' },
  'POST/api/upload': { desc: 'Uploaded document', method: _activityLogBuilder.Methods.Create },
  'POST/api/reupload': { desc: 'Re-uploaded document' },
  'POST/api/customisation/upload': { desc: 'Uploaded custom file', method: _activityLogBuilder.Methods.Create },
  'POST/api/import': { desc: 'Imported entities from file', method: _activityLogBuilder.Methods.Create },
  'POST/api/public': {
    desc: 'Created entity coming from a public form',
    method: _activityLogBuilder.Methods.Create,
    nameField: 'title',
    related: helpers.loadEntityFromPublicForm,
    extra: helpers.extraTemplate },

  'POST/api/remotepublic': {
    desc: 'Submitted entity to a remote instance',
    method: _activityLogBuilder.Methods.Create },

  'POST/api/references': { desc: 'Created relationship', method: _activityLogBuilder.Methods.Create, idField: '_id' },
  'POST/api/pages': {
    desc: 'Created page',
    method: _activityLogBuilder.Methods.Create,
    idField: 'sharedId',
    nameField: 'title' },

  'POST/api/templates': {
    desc: 'Created template',
    method: _activityLogBuilder.Methods.Create,
    idField: '_id',
    nameField: 'name' },

  'POST/api/thesauris': {
    desc: 'Created thesaurus',
    method: _activityLogBuilder.Methods.Create,
    idField: '_id',
    nameField: 'name' },

  'POST/api/relationtypes': {
    desc: 'Created relation type',
    method: _activityLogBuilder.Methods.Create,
    idField: '_id',
    nameField: 'name' },

  'POST/api/translations/import': {
    desc: 'Imported translations from file',
    method: _activityLogBuilder.Methods.Update },

  'POST/api/entities': {
    desc: 'Created entity / document',
    method: _activityLogBuilder.Methods.Create,
    idField: 'sharedId',
    nameField: 'title',
    related: helpers.loadTemplate,
    extra: helpers.extraTemplate },

  'POST/api/documents': {
    desc: 'Created entity / document',
    method: _activityLogBuilder.Methods.Create,
    idField: 'sharedId',
    nameField: 'title',
    related: helpers.loadTemplate,
    extra: helpers.extraTemplate },

  'DELETE/api/entities': {
    desc: 'Deleted entity / document',
    method: _activityLogBuilder.Methods.Delete,
    nameField: 'sharedId' },

  'DELETE/api/documents': {
    desc: 'Deleted entity / document',
    method: _activityLogBuilder.Methods.Delete,
    nameField: 'sharedId' },

  'POST/api/attachments/rename': {
    desc: 'Renamed attachment',
    idField: '_id',
    nameFunc: (data) => `${data.originalname} (${data._id})`,
    related: helpers.loadEntity,
    extra: helpers.extraAttachmentLanguage },

  'DELETE/api/attachments/delete': {
    desc: 'Deleted attachment',
    method: _activityLogBuilder.Methods.Delete,
    nameField: 'attachmentId' },

  'POST/api/templates/setasdefault': {
    desc: 'Set default template',
    related: helpers.loadTemplate,
    nameFunc: helpers.templateName },

  'DELETE/api/templates': { desc: 'Deleted template', method: _activityLogBuilder.Methods.Delete, nameField: '_id' },
  'DELETE/api/thesauris': { desc: 'Deleted thesaurus', method: _activityLogBuilder.Methods.Delete, nameField: '_id' },
  'DELETE/api/relationtypes': {
    desc: 'Deleted relation type',
    method: _activityLogBuilder.Methods.Delete,
    nameField: '_id' },

  'POST/api/translations': {
    desc: 'Updated translations',
    nameFunc: helpers.translationsName,
    extra: (data) => `in ${helpers.formatLanguage(data.locale)}` },

  'POST/api/translations/languages': { desc: 'Added language', method: _activityLogBuilder.Methods.Create, nameFunc: helpers.nameFunc },
  'DELETE/api/translations/languages': {
    desc: 'Removed language',
    method: _activityLogBuilder.Methods.Delete,
    nameFunc: helpers.formatDataLanguage },

  'POST/api/translations/setasdeafult': {
    desc: 'Set default language',
    nameFunc: helpers.formatDataLanguage },

  'DELETE/api/pages': { desc: 'Deleted page', method: _activityLogBuilder.Methods.Delete, nameField: 'sharedId' },
  'DELETE/api/references': {
    desc: 'Deleted relationship',
    method: _activityLogBuilder.Methods.Delete,
    nameField: '_id' },

  'DELETE/api/customisation/upload': {
    desc: 'Deleted custom file',
    method: _activityLogBuilder.Methods.Delete,
    nameField: '_id' },

  'POST/api/users/new': {
    desc: 'Added new user',
    method: _activityLogBuilder.Methods.Create,
    nameField: 'username',
    extra: (data) => `with ${data.role} role` },

  'POST/api/files/upload/document': {
    desc: 'Uploaded file',
    method: _activityLogBuilder.Methods.Create,
    related: helpers.loadEntity,
    nameField: 'title' },

  'DELETE/api/files': { desc: 'Delete file', method: _activityLogBuilder.Methods.Delete, nameField: '_id' },
  'POST/api/files': {
    desc: 'Updated file',
    related: helpers.loadFile,
    nameFunc: helpers.updatedFile },

  'DELETE/api/users': { desc: 'Delete user', method: _activityLogBuilder.Methods.Delete, nameField: '_id' },
  'POST/api/usergroups': {
    desc: 'Created user group',
    method: _activityLogBuilder.Methods.Create,
    idField: '_id',
    nameField: 'name',
    extra: helpers.groupMembers },

  'DELETE/api/usergroups': {
    desc: 'Delete user group',
    method: _activityLogBuilder.Methods.Delete,
    nameField: '_id' },

  'POST/api/entities/permissions': {
    desc: 'Updated permissions on entity',
    method: _activityLogBuilder.Methods.Update,
    related: helpers.loadPermissionsData,
    nameFunc: helpers.entitiesNames,
    extra: helpers.loadAllowedUsersAndGroups },

  'POST/api/suggestions/accept': {
    desc: 'Accepted suggestion on entity',
    method: _activityLogBuilder.Methods.Update,
    related: helpers.loadSuggestionData,
    nameField: 'entityId',
    extra: (data) =>
    ` updated property: ${data.propertyName}, with value: ${data.suggestedValue} . All languages: ${data.allLanguages}` },

  'POST/api/suggestions/train': {
    desc: 'Information extraction training',
    method: _activityLogBuilder.Methods.Create,
    extra: (data) => ` property ${data.property} ` },

  'POST/api/suggestions/configurations': {
    desc: 'Saved template configurations for suggestions',
    method: _activityLogBuilder.Methods.Update,
    extra: (data) => {
      const configs = Object.values(data);
      const props = configs.reduce((acc, curr) => {
        const currProps = curr.properties;
        return [...acc, ...currProps];
      }, []);
      const uniqueProps = Array.from(new Set(props));
      return ` Properties changed: ${uniqueProps}`;
    } } };



const getSemanticData = async (data) => {
  const action = `${data.method}${data.url}`;
  if (action === 'MIGRATE') {
    return helpers.migrationLog(data);
  }
  const entryValue = entryValues[action] || {
    desc: '',
    extra: () => `${data.method}: ${data.url}`,
    method: 'RAW' };

  let activityEntry;
  try {
    activityEntry = await (0, _activityLogBuilder.buildActivityEntry)(entryValue, data);
  } catch (e) {
    activityEntry = {
      action: 'WARNING',
      description: 'The Activity log encountered an error in building the entry',
      extra: `${data.method}: ${data.url}`,
      errorStack: e.stack };

  }
  return _objectSpread({}, activityEntry);
};exports.getSemanticData = getSemanticData;