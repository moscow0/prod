"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getUserPermissionIds = exports.ModelWithPermissions = void 0;exports.instanceModelWithPermissions = instanceModelWithPermissions;
var _permissionsContext = require("../permissions/permissionsContext");
var _permissionSchema = require("../../shared/types/permissionSchema");



var _logHelper = require("./logHelper");
var _model = require("./model");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}













const appendPermissionData = (
data,
user) =>
{
  if (!user) {
    return data;
  }

  return _objectSpread(_objectSpread({},
  data), {}, {
    permissions: [
    {
      refId: user._id.toString(),
      type: _permissionSchema.PermissionType.USER,
      level: _permissionSchema.AccessLevels.WRITE }] });



};

const requestingPermissions = (select) =>
select && (select.includes && select.includes('+permissions') || select.permissions === 1);

const getUserPermissionIds = (user) => {
  const userIds = user.groups ? user.groups.map((group) => group._id.toString()) : [];
  if (user._id) {
    userIds.push(user._id.toString());
  }
  return userIds;
};exports.getUserPermissionIds = getUserPermissionIds;

const addPermissionsCondition = (user, level) => {
  let permissionCond = {};
  if (!['admin', 'editor'].includes(user.role)) {
    const userIds = getUserPermissionIds(user);
    if (level === _permissionSchema.AccessLevels.WRITE) {
      permissionCond = {
        permissions: { $elemMatch: { refId: { $in: userIds }, level: _permissionSchema.AccessLevels.WRITE } } };

    } else {
      permissionCond = {
        $or: [{ permissions: { $elemMatch: { refId: { $in: userIds } } } }, { published: true }] };

    }
  }
  return permissionCond;
};

const appendPermissionQuery = (
query,
level,
user) =>
{
  let permissionCond = { _id: null };
  if (user) {
    permissionCond = addPermissionsCondition(user, level);
  } else if (level === _permissionSchema.AccessLevels.READ) {
    permissionCond = { published: true };
  }
  return _objectSpread(_objectSpread({}, query), permissionCond);
};

function checkPermissionAccess(
elem,
userIds,
level = _permissionSchema.AccessLevels.WRITE)
{
  const hasAccessLevel = (p) =>
  level === _permissionSchema.AccessLevels.WRITE ?
  p.level === _permissionSchema.AccessLevels.WRITE && userIds.includes(p.refId) :
  userIds.includes(p.refId);

  const hasAccess = elem.permissions && elem.permissions.find((p) => hasAccessLevel(p)) !== undefined;
  if (!hasAccess) {
    return _objectSpread(_objectSpread({}, elem), {}, { permissions: undefined });
  }
  return elem;
}

const filterPermissionsData = (
data,
user) =>
{
  let filteredData = data || [];
  if (user && !['admin', 'editor'].includes(user.role)) {
    if (filteredData.length > 0) {
      const userIds = getUserPermissionIds(user);
      filteredData = filteredData.map((elem) => checkPermissionAccess(elem, userIds));
    }
  }
  return filteredData;
};

const controlPermissionsData = (
data,
user) =>
{
  if (user) {
    if (['admin', 'editor'].includes(user.role)) {
      return data;
    }

    return checkPermissionAccess(data, getUserPermissionIds(user), _permissionSchema.AccessLevels.WRITE);
  }

  return _objectSpread(_objectSpread({}, data), {}, { permissions: undefined });
};

class ModelWithPermissions extends _model.OdmModel {
  async save(data) {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    const query = { _id: data._id };
    return data._id || data.permissions ?
    super.save(data, appendPermissionQuery(query, _permissionSchema.AccessLevels.WRITE, user)) :
    super.save(appendPermissionData(data, user));
  }

  async saveMultiple(dataArray) {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    const dataArrayWithPermissions = dataArray.map((data) =>
    data._id || data.permissions ? data : appendPermissionData(data, user));

    const query = appendPermissionQuery({}, _permissionSchema.AccessLevels.WRITE, user);
    return super.saveMultiple(dataArrayWithPermissions, query, !!user);
  }

  async saveUnrestricted(data) {
    return data._id || data.permissions ? super.save(data, { _id: data._id }) : super.save(data);
  }

  async get(
  query = {},
  select = '',
  options = {})
  {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    const results = await super.get(
    appendPermissionQuery(query, _permissionSchema.AccessLevels.READ, user),
    select,
    options);

    const returnResult = requestingPermissions(select) ?
    filterPermissionsData(results, user) :
    results;
    return returnResult;
  }

  async count(query = {}) {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    return super.count(appendPermissionQuery(query, _permissionSchema.AccessLevels.READ, user));
  }

  async getUnrestricted(
  query = {},
  select = '',
  options = {})
  {
    return super.get(query, select, options);
  }

  async getById(id, select) {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    const query = { _id: id || null };
    const doc = await this.db.findOne(
    appendPermissionQuery(query, _permissionSchema.AccessLevels.READ, user),
    select);


    if (doc && requestingPermissions(select)) {
      return controlPermissionsData(doc, user);
    }

    return doc;
  }

  async delete(condition) {
    const user = _permissionsContext.permissionsContext.getUserInContext();
    return super.delete(appendPermissionQuery(condition, _permissionSchema.AccessLevels.WRITE, user));
  }}exports.ModelWithPermissions = ModelWithPermissions;


function instanceModelWithPermissions(
collectionName,
schema)
{
  const logHelper = (0, _logHelper.createUpdateLogHelper)(collectionName);
  const model = new ModelWithPermissions(logHelper, collectionName, schema);
  _model.models[collectionName] = model;
  return model;
}