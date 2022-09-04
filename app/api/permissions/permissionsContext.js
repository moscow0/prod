"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.permissionsContext = void 0;
var _AppContext = require("../utils/AppContext");


const permissionsContext = {
  getUserInContext: () =>
  _AppContext.appContext.get('user'),

  permissionsRefIds() {var _user$_id;
    const user = this.getUserInContext();
    return [...((user === null || user === void 0 ? void 0 : user.groups) || []).map((g) => g._id.toString()), user === null || user === void 0 ? void 0 : (_user$_id = user._id) === null || _user$_id === void 0 ? void 0 : _user$_id.toString()].filter(
    (v) => !!v);

  },

  needsPermissionCheck() {
    const user = this.getUserInContext();
    return !['admin', 'editor'].includes((user === null || user === void 0 ? void 0 : user.role) || '');
  },

  setCommandContext: () => {
    _AppContext.appContext.set('user', { _id: 'commandId', role: 'editor' });
  } };exports.permissionsContext = permissionsContext;