"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.checkWritePermissions = void 0;


const checkWritePermissions = (
user,
permissions) =>
{
  if (!user) {
    return false;
  }

  if (['admin', 'editor'].includes(user.role)) {
    return true;
  }

  const ids = permissions ?
  permissions.filter((p) => p.level === 'write').map((p) => p.refId.toString()) :
  [];
  const userIds = [user._id.toString(), ...(user.groups || []).map((g) => g._id.toString())];

  return !!ids.find((p) => userIds.includes(p));
};exports.checkWritePermissions = checkWritePermissions;