"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.saveEntitiesPermissions = saveEntitiesPermissions;


var _Notifications = require("../../Notifications");
var _PermissionsAPI = require("../PermissionsAPI");

var _Multireducer = require("../../Multireducer");
var _actionTypes = require("../../Library/actions/actionTypes");



var _libraryActions = require("../../Library/actions/libraryActions");
var _permissionSchema = require("../../../shared/types/permissionSchema"); /* eslint-disable max-statements */

function saveEntitiesPermissions(permissionsData, storeKey) {
  return async (dispatch, getState) => {
    const response = await (0, _PermissionsAPI.savePermissions)(permissionsData);
    const publicPermission = response.permissions.find((p) => p.type === _permissionSchema.PermissionType.PUBLIC);
    const publicIsMixed = (publicPermission === null || publicPermission === void 0 ? void 0 : publicPermission.level) === _permissionSchema.MixedAccess.MIXED;

    if (storeKey && !publicIsMixed) {
      const { unpublished: showingUnpublished, includeUnpublished } =
      getState()[storeKey].search || {};

      const notShowingPublicAndPrivate = showingUnpublished || !includeUnpublished;
      const toMoveFromCollection = showingUnpublished === !!publicPermission;

      const wrappedDispatch = (0, _Multireducer.wrapDispatch)(dispatch, storeKey);

      if (notShowingPublicAndPrivate) {
        if (toMoveFromCollection) {
          wrappedDispatch({
            type: _actionTypes.REMOVE_DOCUMENTS_SHAREDIDS,
            sharedIds: permissionsData.ids });


          wrappedDispatch((0, _libraryActions.unselectAllDocuments)());
        }
      } else {
        wrappedDispatch({
          type: _actionTypes.UPDATE_DOCUMENTS_PUBLISHED,
          sharedIds: permissionsData.ids,
          published: !!publicPermission });

      }
    }

    dispatch(_Notifications.notificationActions.notify('Update success', 'success'));
  };
}