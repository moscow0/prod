"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateUniquePermissions = exports.permissionsDataSchema = exports.permissionType = exports.permissionSchema = exports.permissionLevel = exports.emitSchemaTypes = exports.PermissionType = exports.MixedAccess = exports.AccessLevels = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _commonSchemas = require("./commonSchemas");
var _filters = require("../../api/utils/filters");
var _tsUtils = require("../tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;let

AccessLevels;exports.AccessLevels = AccessLevels;(function (AccessLevels) {AccessLevels["READ"] = "read";AccessLevels["WRITE"] = "write";})(AccessLevels || (exports.AccessLevels = AccessLevels = {}));let




MixedAccess;exports.MixedAccess = MixedAccess;(function (MixedAccess) {MixedAccess["MIXED"] = "mixed";})(MixedAccess || (exports.MixedAccess = MixedAccess = {}));let





PermissionType;exports.PermissionType = PermissionType;(function (PermissionType) {PermissionType["USER"] = "user";PermissionType["GROUP"] = "group";PermissionType["PUBLIC"] = "public";})(PermissionType || (exports.PermissionType = PermissionType = {}));





const permissionType = { type: 'string', enum: Object.values(PermissionType) };exports.permissionType = permissionType;
const permissionLevel = {
  type: 'string',
  enum: Object.values(_objectSpread(_objectSpread({}, AccessLevels), MixedAccess)) };exports.permissionLevel = permissionLevel;


const permissionSchema = {
  type: 'object',
  additionalProperties: false,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    refId: _commonSchemas.objectIdSchema,
    type: permissionType,
    level: permissionLevel },

  required: ['refId', 'type', 'level'] };exports.permissionSchema = permissionSchema;


ajv.addKeyword({
  keyword: 'uniqueIds',
  type: 'object',
  errors: true,
  validate: (fields, data) => {
    const allowedIds = data.permissions.map((item) => item.refId);
    const uniqueIds = allowedIds.filter(_filters.unique);
    if (allowedIds.length !== uniqueIds.length) {
      throw new _ajv.default.ValidationError([
      {
        keyword: 'duplicatedPermissions',
        schemaPath: '',
        params: { keyword: 'duplicatedPermissions', fields },
        message: 'Permissions should be unique by person/group',
        instancePath: '.permissions' }]);


    }
    return true;
  } });


const permissionsDataSchema = {
  type: 'object',
  additionalProperties: false,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    ids: { type: 'array', items: { type: 'string' } },
    permissions: {
      type: 'array',
      items: _objectSpread({}, permissionSchema) } },


  required: ['ids', 'permissions'] };exports.permissionsDataSchema = permissionsDataSchema;


const validateUniquePermissions = (0, _tsUtils.wrapValidator)(
ajv.compile({ type: 'object', uniqueIds: true }));exports.validateUniquePermissions = validateUniquePermissions;