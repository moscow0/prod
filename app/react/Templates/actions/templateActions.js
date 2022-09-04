"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addProperty = addProperty;exports.countByTemplate = countByTemplate;exports.inserted = inserted;exports.prepareTemplate = void 0;exports.removeProperty = removeProperty;exports.reorderProperty = reorderProperty;exports.resetTemplate = resetTemplate;exports.sanitize = void 0;exports.saveTemplate = saveTemplate;exports.selectProperty = selectProperty;exports.setNestedProperties = setNestedProperties;exports.setPropertyDefaults = setPropertyDefaults;exports.updateProperty = updateProperty;exports.updateValue = updateValue;exports.validateMapping = validateMapping;var _reactReduxForm = require("react-redux-form");
var _RequestParams = require("../../utils/RequestParams");

var types = _interopRequireWildcard(require("./actionTypes"));
var _Notifications = require("../../Notifications");
var _TemplatesAPI = _interopRequireDefault(require("../TemplatesAPI"));
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var _BasicReducer = require("../../BasicReducer");
var _EntitiesAPI = _interopRequireDefault(require("../../Entities/EntitiesAPI"));
var _templateCommonProperties = _interopRequireDefault(require("../utils/templateCommonProperties"));const _excluded = ["localID"],_excluded2 = ["localID", "inserting"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const prepareTemplate = (template) => {
  const commonPropertiesExists = template.commonProperties && template.commonProperties.length;

  const commonProperties = commonPropertiesExists ?
  template.commonProperties :
  _templateCommonProperties.default.get();

  return _objectSpread(_objectSpread({},
  template), {}, {
    commonProperties: commonProperties.map((p) => _objectSpread(_objectSpread({}, p), {}, { localID: (0, _uniqueID.default)() })),
    properties: template.properties.map((p) => _objectSpread(_objectSpread({}, p), {}, { localID: (0, _uniqueID.default)() })) });

};exports.prepareTemplate = prepareTemplate;

function resetTemplate() {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.reset('template.data'));
    dispatch(_reactReduxForm.actions.setInitial('template.data'));
  };
}

function setPropertyDefaults(getState, property) {
  const propertyWithDefaults = property;
  propertyWithDefaults.localID = (0, _uniqueID.default)();
  if (property.type === 'select' || property.type === 'multiselect') {
    propertyWithDefaults.content = getState().thesauris.get(0).get('_id');
  }

  if (property.type === 'relationship') {
    propertyWithDefaults.inherit = false;
    propertyWithDefaults.content = '';
  }

  if (property.type === 'nested') {
    propertyWithDefaults.nestedProperties = [{ key: '', label: '' }];
  }
  return propertyWithDefaults;
}

function addProperty(property = {}, _index = undefined) {
  return (dispatch, getState) => {
    const properties = getState().template.data.properties.slice(0);
    const index = _index !== undefined ? _index : properties.length;
    const propertyWithDefaults = setPropertyDefaults(getState, property);
    properties.splice(index, 0, propertyWithDefaults);
    dispatch(_reactReduxForm.actions.change('template.data.properties', properties));
  };
}

function setNestedProperties(propertyIndex, properties) {
  return (dispatch) => {
    dispatch(
    _reactReduxForm.actions.load(`template.data.properties[${propertyIndex}].nestedProperties`, properties));

  };
}

function updateProperty(property, index) {
  return (dispatch, getState) => {
    const properties = getState().template.data.properties.slice(0);
    properties.splice(index, 1, property);
    dispatch(_reactReduxForm.actions.change('template.data.properties', properties));
  };
}

function inserted(index) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.change(`template.data.properties[${index}].inserting`, null));
  };
}

function selectProperty(index) {
  return {
    type: types.SELECT_PROPERTY,
    index };

}

function removeProperty(index) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.remove('template.data.properties', index));
    dispatch(_reactReduxForm.actions.resetErrors('template.data'));
  };
}

function reorderProperty(originIndex, targetIndex) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.move('template.data.properties', originIndex, targetIndex));
  };
}

const sanitize = (data) => {
  const commonProperties = data.commonProperties.map((prop) => {
    const { localID } = prop,sanitizedProp = _objectWithoutProperties(prop, _excluded);
    return sanitizedProp;
  });
  const properties = data.properties.map((prop) => {
    const { localID, inserting } = prop,sanitizedProp = _objectWithoutProperties(prop, _excluded2);
    if (sanitizedProp.inherit && !sanitizedProp.content) {
      sanitizedProp.inherit = false;
    }
    return sanitizedProp;
  });
  return _objectSpread(_objectSpread({}, data), {}, { properties, commonProperties });
};exports.sanitize = sanitize;

function validateMapping(template) {
  return _TemplatesAPI.default.validateMapping(new _RequestParams.RequestParams(template));
}

function saveTemplate(data) {
  let template = sanitize(data);
  return (dispatch) => {
    dispatch({ type: types.SAVING_TEMPLATE });
    return _TemplatesAPI.default.
    save(new _RequestParams.RequestParams(template)).
    then((response) => {
      template = prepareTemplate(response);
      dispatch({ type: types.TEMPLATE_SAVED, data: template });
      dispatch(_BasicReducer.actions.update('templates', template));
      dispatch(_reactReduxForm.actions.merge('template.data', template));
      dispatch(_Notifications.notificationActions.notify('Saved successfully.', 'success'));
    }).
    catch((e) => {
      dispatch({ type: types.TEMPLATE_SAVED, data });
      throw e;
    });
  };
}

function updateValue(model, value) {
  return (dispatch) => {
    dispatch(_reactReduxForm.actions.change(`template.data${model}`, value));
  };
}

function countByTemplate(template) {
  return _EntitiesAPI.default.countByTemplate(new _RequestParams.RequestParams({ templateId: template._id }));
}