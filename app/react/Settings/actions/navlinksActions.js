"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addGroupLink = addGroupLink;exports.addLink = addLink;exports.loadLinks = loadLinks;exports.removeGroupLink = removeGroupLink;exports.removeLink = removeLink;exports.saveLinks = saveLinks;exports.sortLink = sortLink;var _reactReduxForm = require("react-redux-form");
var _RequestParams = require("../../utils/RequestParams");

var _BasicReducer = require("../../BasicReducer");
var _uiActions = require("./uiActions");
var _Notifications = require("../../Notifications");

var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var _SettingsAPI = _interopRequireDefault(require("../SettingsAPI"));
var types = _interopRequireWildcard(require("./actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

function loadLinks(links) {
  return _reactReduxForm.actions.load('settings.navlinksData', { links });
}

function addLink(links, type = 'link') {
  const link = { title: `Item ${links.length + 1}`, localID: (0, _uniqueID.default)(), type, sublinks: [] };
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.push('settings.navlinksData.links', link));
    dispatch((0, _uiActions.editLink)(link.localID));
  };
}

function addGroupLink(links, index) {
  const link = { title: `Item ${index + 1} - ${links[index].sublinks.length + 1}`, localID: (0, _uniqueID.default)() };
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.push(`settings.navlinksData.links[${index}].sublinks`, link));
    dispatch((0, _uiActions.editLink)(link.localID));
  };
}

function sortLink(originIndex, targetIndex) {
  return _reactReduxForm.actions.move('settings.navlinksData.links', originIndex, targetIndex);
}

function removeLink(index) {
  return _reactReduxForm.actions.remove('settings.navlinksData.links', index);
}

function removeGroupLink(groupLinkIndex, sublinkIndex) {
  return _reactReduxForm.actions.remove(
  `settings.navlinksData.links[${groupLinkIndex}].sublinks`,
  sublinkIndex);

}

function saveLinks(data) {
  return (dispatch) => {
    dispatch({ type: types.SAVING_NAVLINKS });
    return _SettingsAPI.default.
    save(new _RequestParams.RequestParams(data)).
    then((response) => {
      dispatch({ type: types.NAVLINKS_SAVED, data: response });
      dispatch(_BasicReducer.actions.set('settings/collection', response));
      dispatch(_Notifications.notificationActions.notify('Saved successfully.', 'success'));
    }).
    catch(() => {
      dispatch({ type: types.NAVLINKS_SAVED, data });
    });
  };
}