"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tocGenerationActions = void 0;var _reducer = require("../../BasicReducer/reducer");
var _reactReduxForm = require("react-redux-form");
var _RequestParams = require("../../utils/RequestParams");
var _api = _interopRequireDefault(require("../../utils/api"));
var _Notifications = require("../../Notifications");


var _tsUtils = require("../../../shared/tsUtils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const tocGenerationActions = {
  reviewToc(fileId) {
    return async (dispatch, getState) => {
      const currentDoc = getState().documentViewer.doc.toJS();
      dispatch(_reactReduxForm.actions.reset('documentViewer.sidepanel.metadata'));

      const updatedFile = (await _api.default.post('files/tocReviewed', new _RequestParams.RequestParams({ fileId }))).json;
      const doc = _objectSpread(_objectSpread({},
      currentDoc), {}, {
        defaultDoc: updatedFile,
        documents: (0, _tsUtils.ensure)(currentDoc.documents).map((d) => {
          if (d._id === updatedFile._id) {
            return updatedFile;
          }
          return d;
        }) });


      dispatch(_Notifications.notificationActions.notify('Document updated', 'success'));
      dispatch(_reactReduxForm.actions.reset('documentViewer.sidepanel.metadata'));
      dispatch(_reducer.actions.set('viewer/doc', doc));
    };
  } };exports.tocGenerationActions = tocGenerationActions;