"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.deletePage = deletePage;exports.loadPages = loadPages;exports.resetPage = resetPage;exports.savePage = savePage;exports.updateValue = updateValue;var _reactRouter = require("react-router");

var _reactReduxForm = require("react-redux-form");

var _BasicReducer = require("../../BasicReducer");
var _RequestParams = require("../../utils/RequestParams");
var _Notifications = require("../../Notifications");
var _PagesAPI = _interopRequireDefault(require("../PagesAPI"));
var types = _interopRequireWildcard(require("./actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



function loadPages() {
  return async (dispatch) => {
    const pages = await _PagesAPI.default.get(new _RequestParams.RequestParams());
    dispatch(_BasicReducer.actions.set('pages', pages));
  };
}

function resetPage() {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.reset('page.data'));
    dispatch(_reactReduxForm.actions.setInitial('page.data'));
  };
}

function updateValue(model, value) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.change(`page.data${model}`, value));
  };
}

function savePage(data) {
  return (dispatch) => {
    dispatch({ type: types.SAVING_PAGE });
    return _PagesAPI.default.
    save(new _RequestParams.RequestParams(data)).
    then((response) => {
      dispatch(_Notifications.notificationActions.notify('Saved successfully.', 'success'));
      dispatch(
      _reactReduxForm.actions.merge('page.data', {
        _id: response._id,
        sharedId: response.sharedId,
        _rev: response._rev }));


      dispatch({ type: types.PAGE_SAVED, data: response });
      _reactRouter.browserHistory.push(`/settings/pages/edit/${response.sharedId}`);
    }).
    catch(() => {
      dispatch({ type: types.PAGE_SAVED, data: {} });
    });
  };
}

function deletePage(page) {
  return (dispatch) =>
  _PagesAPI.default.delete(new _RequestParams.RequestParams({ sharedId: page.sharedId })).then(() => {
    dispatch(_BasicReducer.actions.remove('pages', page));
  });
}