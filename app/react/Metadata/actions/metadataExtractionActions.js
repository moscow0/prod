"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.updateSelection = exports.updateFormField = exports.deleteSelection = void 0;
var _reactReduxForm = require("react-redux-form");

var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));
var _BasicReducer = require("../../BasicReducer");
var _Notifications = require("../../Notifications");
var _I18N = require("../../I18N");
var _RequestParams = require("../../utils/RequestParams");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


const updateSelection = (
selection,
fieldName,
fieldId) =>
{
  const selected = _objectSpread({}, selection);

  const data = _objectSpread(_objectSpread({},
  fieldId && { propertyID: fieldId }), {}, {
    name: fieldName,
    timestamp: Date(),
    selection: selected });


  return _BasicReducer.actions.updateIn('documentViewer.metadataExtraction', ['selections'], data, 'propertyID');
};exports.updateSelection = updateSelection;

const deleteSelection =
(entityDocument, propertyName, propertyID) =>
(dispatch) => {var _document$extractedMe;
  const document = entityDocument === null || entityDocument === void 0 ? void 0 : entityDocument.toJS();

  const updatedSelections = document === null || document === void 0 ? void 0 : (_document$extractedMe = document.extractedMetadata) === null || _document$extractedMe === void 0 ? void 0 : _document$extractedMe.filter(
  (selection) =>
  propertyName === 'title' && selection.name !== 'title' ||
  selection.propertyID !== propertyID);


  const data = _objectSpread(_objectSpread({},
  propertyID && { propertyID }), {}, {
    name: propertyName,
    selection: { text: '', selectionRectangles: [] },
    deleteSelection: true });


  return [
  dispatch(
  _BasicReducer.actions.setIn('viewer/doc', 'defaultDoc', _objectSpread(_objectSpread({},
  document), {}, {
    extractedMetadata: updatedSelections }))),


  dispatch(
  _BasicReducer.actions.updateIn('documentViewer.metadataExtraction', ['selections'], data, 'propertyID'))];


};exports.deleteSelection = deleteSelection;

const updateFormField = async (
value,
model,
fieldType,
locale) =>
{
  if (fieldType === 'date') {
    const requestParams = new _RequestParams.RequestParams({
      locale,
      value,
      type: 'date' });

    const { value: coercedValue, success } = await _EntitiesAPI.default.coerceValue(requestParams);
    if (!success) {
      return _Notifications.notificationActions.notify(
      (0, _I18N.t)('System', 'Value cannot be transformed to date', null, false),
      'danger');

    }
    return _reactReduxForm.actions.change(model, coercedValue);
  }

  if (fieldType === 'numeric' && Number.isNaN(Number.parseInt(value, 10))) {
    return _reactReduxForm.actions.change(model, '0');
  }

  return _reactReduxForm.actions.change(model, value);
};exports.updateFormField = updateFormField;