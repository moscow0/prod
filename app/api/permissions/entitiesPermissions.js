"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.entitiesPermissions = void 0;var _entities = _interopRequireDefault(require("../entities/entities"));
var _users = _interopRequireDefault(require("../users/users"));
var _userGroups = _interopRequireDefault(require("../usergroups/userGroups"));
var _filters = require("../utils/filters");

var _permissionSchema = require("../../shared/types/permissionSchema");








var _permissionsContext = require("./permissionsContext");
var _publicPermission = require("./publicPermission");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const setAdditionalData = (
referencedList,
permission,
additional) =>
{
  const referencedData = referencedList.find(
  (u) => u._id.toString() === permission.refId.toString());

  return referencedData ? _objectSpread(_objectSpread({}, permission), additional(referencedData)) : undefined;
};

async function setAccessLevelAndPermissionData(
grantedPermissions,
entitiesPermissionsData,
publishedData)
{
  const grantedIds = Object.keys(grantedPermissions);
  const [usersData, groupsData] = await Promise.all([
  _users.default.get({ _id: { $in: grantedIds } }),
  _userGroups.default.get({ _id: { $in: grantedIds } })]);


  const permissionsData = Object.keys(grantedPermissions).map((id) => {
    const differentLevels = grantedPermissions[id].access.filter(_filters.unique);
    const level =
    grantedPermissions[id].access.length !== entitiesPermissionsData.length ||
    differentLevels.length > 1 ?
    _permissionSchema.MixedAccess.MIXED :
    differentLevels[0];
    const sourceData =
    grantedPermissions[id].permission.type === _permissionSchema.PermissionType.USER ? usersData : groupsData;
    const additional =
    grantedPermissions[id].permission.type.toString() === _permissionSchema.PermissionType.USER ?
    (p) => ({ label: p.username }) :
    (g) => ({ label: g.name });
    return _objectSpread(_objectSpread({},
    setAdditionalData(sourceData, grantedPermissions[id].permission, additional)), {}, {
      level });

  });

  const publishedEntities = publishedData.filter((published) => published).length;
  const totalEntities = publishedData.length;

  if (publishedEntities) {
    permissionsData.push(_objectSpread(_objectSpread({},
    _publicPermission.PUBLIC_PERMISSION), {}, {
      level: totalEntities === publishedEntities ? _permissionSchema.AccessLevels.READ : _permissionSchema.MixedAccess.MIXED }));

  }

  return permissionsData.filter((p) => p.refId !== undefined);
}

const publishingChanged = (newPublishedValue, currentEntities) =>
currentEntities.reduce(
(changed, entity) => changed || !!entity.published !== newPublishedValue,
false);


const replaceMixedAccess = (entity, newPermissions) =>
newPermissions.
map((newPermission) => {var _entity$permissions;
  if (newPermission.level !== _permissionSchema.MixedAccess.MIXED) return newPermission;

  return (_entity$permissions = entity.permissions) === null || _entity$permissions === void 0 ? void 0 : _entity$permissions.find((p) => p.refId.toString() === newPermission.refId.toString());
}).
filter((p) => p);

const getPublishingQuery = (newPublicPermission) => {
  if (newPublicPermission && newPublicPermission.level === _permissionSchema.MixedAccess.MIXED) return {};

  return { published: !!newPublicPermission };
};

const entitiesPermissions = {
  set: async (permissionsData) => {
    await (0, _permissionSchema.validateUniquePermissions)(permissionsData);

    const user = _permissionsContext.permissionsContext.getUserInContext();

    const currentEntities = await _entities.default.get(
    { sharedId: { $in: permissionsData.ids } },
    { published: 1, permissions: 1 });


    const nonPublicPermissions = permissionsData.permissions.filter(
    (p) => p.type !== _permissionSchema.PermissionType.PUBLIC);

    const publicPermission = permissionsData.permissions.find(
    (p) => p.type === _permissionSchema.PermissionType.PUBLIC);


    if (
    !['admin', 'editor'].includes(user.role) &&
    (publicPermission === null || publicPermission === void 0 ? void 0 : publicPermission.level) !== _permissionSchema.MixedAccess.MIXED &&
    publishingChanged(!!publicPermission, currentEntities))
    {
      throw new Error('Insuficient permissions to share/unshare publicly');
    }

    const toSave = currentEntities.map((entity) => _objectSpread({
      _id: entity._id,
      permissions: replaceMixedAccess(entity, nonPublicPermissions) },
    getPublishingQuery(publicPermission)));


    await _entities.default.saveMultiple(toSave);
  },

  get: async (sharedIds) => {
    const entitiesPermissionsData = (
    await _entities.default.get(
    { sharedId: { $in: sharedIds } },
    { permissions: 1, published: 1 },
    { withoutDocuments: true })).

    map((entity) => ({
      permissions: entity.permissions || [],
      published: !!entity.published }));


    const grantedPermissions =

    {};

    const publishedStatuses = [];

    entitiesPermissionsData.forEach((entityPermissions) => {
      entityPermissions.permissions.forEach((permission) => {
        const grantedPermission = grantedPermissions[permission.refId.toString()];

        if (grantedPermission) {
          grantedPermission.access.push(permission.level);
        } else {
          grantedPermissions[permission.refId.toString()] = {
            permission,
            access: [permission.level] };

        }
      });

      publishedStatuses.push(entityPermissions.published);
    });

    const permissions = await setAccessLevelAndPermissionData(
    grantedPermissions,
    entitiesPermissionsData,
    publishedStatuses);


    return permissions.sort((a, b) =>
    (a.type + a.label).localeCompare(b.type + b.label));

  } };exports.entitiesPermissions = entitiesPermissions;