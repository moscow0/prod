"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deleteEntities = deleteEntities;exports.deleteEntity = deleteEntity;exports.resetForm = resetForm;exports.saveEntity = saveEntity;var _BasicReducer = require("../../BasicReducer");
var _EntitiesAPI = _interopRequireDefault(require("../EntitiesAPI"));
var _libraryActions = require("../../Library/actions/libraryActions");





var _saveEntityWithFiles = require("../../Library/actions/saveEntityWithFiles");
var _Notifications = require("../../Notifications");
var _Relationships = require("../../Relationships");
var _RequestParams = require("../../utils/RequestParams");
var _reactReduxForm = require("react-redux-form");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function saveEntity(entity) {
  return async (dispatch) => {
    const { entity: updatedDoc, errors } = await (0, _saveEntityWithFiles.saveEntityWithFiles)(entity, dispatch);
    if (!errors.length) {
      dispatch(_Notifications.notificationActions.notify('Entity saved', 'success'));
    } else {
      dispatch(
      _Notifications.notificationActions.notify(
      `Entity saved with the following errors: ${JSON.stringify(errors, null, 2)}`,
      'warning'));


    }
    dispatch(_reactReduxForm.actions.reset('entityView.entityForm'));
    dispatch(_BasicReducer.actions.set('entityView/entity', updatedDoc));
    dispatch(_Relationships.actions.reloadRelationships(updatedDoc.sharedId));
  };
}

function resetForm() {
  return (dispatch) => dispatch(_reactReduxForm.actions.reset('entityView.entityForm'));
}

function deleteEntity(entity) {
  return async (dispatch) => {
    await _EntitiesAPI.default.delete(new _RequestParams.RequestParams({ sharedId: entity.sharedId }));
    dispatch(_Notifications.notificationActions.notify('Entity deleted', 'success'));
    dispatch((0, _libraryActions.removeDocument)(entity));
    await dispatch((0, _libraryActions.unselectDocument)(entity._id));
  };
}

function deleteEntities(entities) {
  return async (dispatch) => {
    await _EntitiesAPI.default.deleteMultiple(new _RequestParams.RequestParams({ sharedIds: entities.map((e) => e.sharedId) }));
    dispatch(_Notifications.notificationActions.notify('Deletion success', 'success'));
    await dispatch((0, _libraryActions.unselectAllDocuments)());
    dispatch((0, _libraryActions.removeDocuments)(entities));
  };
}