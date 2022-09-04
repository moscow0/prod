"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.addGroup = addGroup;exports.addValue = addValue;exports.importThesaurus = importThesaurus;exports.removeValue = removeValue;exports.saveThesaurus = saveThesaurus;exports.sortValues = sortValues;exports.updateValues = updateValues;var _reactReduxForm = require("react-redux-form");
var _I18N = require("../../I18N");
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var types = _interopRequireWildcard(require("./actionTypes"));
var _ThesauriAPI = _interopRequireDefault(require("../ThesauriAPI"));
var notifications = _interopRequireWildcard(require("../../Notifications/actions/notificationsActions"));
var _advancedSort = require("../../utils/advancedSort");
var _RequestParams = require("../../utils/RequestParams");
var _superagent = require("../../../shared/superagent");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function saveThesaurus(thesaurus) {
  return (dispatch) =>
  _ThesauriAPI.default.save(new _RequestParams.RequestParams(thesaurus)).then((_thesauri) => {
    dispatch({ type: types.THESAURI_SAVED });
    notifications.notify((0, _I18N.t)('System', 'Thesaurus saved', null, false), 'success')(dispatch);
    dispatch(_reactReduxForm.actions.change('thesauri.data', _thesauri));
  });
}

function importThesaurus(thesaurus, file) {
  return async (dispatch) => {
    try {
      const headers = {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest' };

      const fields = {
        thesauri: JSON.stringify(thesaurus) };


      const data = await (0, _superagent.httpRequest)('thesauris', fields, headers, file);
      dispatch({ type: types.THESAURI_SAVED });
      notifications.notify((0, _I18N.t)('System', 'Data imported', null, false), 'success')(dispatch);
      dispatch(_reactReduxForm.actions.change('thesauri.data', data));
    } catch (e) {
      notifications.notify((0, _I18N.t)('System', e.error, null, false), 'danger')(dispatch);
    }
  };
}

function sortValues() {
  return (dispatch, getState) => {
    let values = getState().thesauri.data.values.slice(0);
    values = (0, _advancedSort.advancedSort)(values, { property: 'label' });
    values = values.map((value) => _objectSpread(_objectSpread({},
    value),
    value.values ?
    { values: (0, _advancedSort.advancedSort)(value.values.slice(0), { property: 'label' }) } :
    {}));

    dispatch(_reactReduxForm.actions.change('thesauri.data.values', values));
  };
}

function moveEmptyItemToBottom(values) {
  const _values = [...values];
  const emptyIdx = _values.reduce((found, value, index) => {
    if (!value.label && index < _values.length) {
      return found.concat([index]);
    }
    return found;
  }, []);
  if (emptyIdx.length > 1) {
    return null;
  }
  if (emptyIdx.length === 1) {
    const index = emptyIdx[0];
    const emptyValue = _values[index];
    _values.splice(index, 1);
    _values.push(emptyValue);
  }
  return _values;
}

function areGroupsRemovedFromList(newValues, oldValues) {
  return oldValues.some((item) => {
    if (!item.values) {
      return false;
    }
    return !newValues.some((oldItem) => oldItem.id === item.id);
  });
}

function listContainsGroups(values) {
  return values.some((value) => value.values);
}

function updateValues(updatedValues, groupIndex) {
  return (dispatch, getState) => {
    const values = getState().thesauri.data.values.slice(0);
    const _updatedValues = moveEmptyItemToBottom(updatedValues);
    if (!_updatedValues) {
      return;
    }
    if (groupIndex !== undefined) {
      if (listContainsGroups(_updatedValues)) {
        return;
      }
      values[groupIndex] = _objectSpread(_objectSpread({}, values[groupIndex]), {}, { values: _updatedValues });
      dispatch(_reactReduxForm.actions.change('thesauri.data.values', values));
      return;
    }
    if (areGroupsRemovedFromList(updatedValues, values)) {
      return;
    }
    dispatch(_reactReduxForm.actions.change('thesauri.data.values', _updatedValues));
  };
}

function addValue(group) {
  return (dispatch, getState) => {
    const values = getState().thesauri.data.values.slice(0);
    if (group !== undefined) {
      values[group] = _objectSpread({}, values[group]);
      values[group].values = values[group].values.slice(0);
      values[group].values.push({ label: '', id: (0, _uniqueID.default)() });
    } else {
      values.push({ label: '', id: (0, _uniqueID.default)() });
    }

    dispatch(_reactReduxForm.actions.change('thesauri.data.values', values));
  };
}

function addGroup() {
  return (dispatch, getState) => {
    const values = getState().thesauri.data.values.slice(0);
    const lastIndex = values.length - 1;
    const newGroup = { label: '', id: (0, _uniqueID.default)(), values: [{ label: '', id: (0, _uniqueID.default)() }] };
    if (!values[lastIndex].values) {
      values[lastIndex] = newGroup;
    } else {
      values.push(newGroup);
    }
    dispatch(_reactReduxForm.actions.change('thesauri.data.values', values));
  };
}

function removeValue(index, groupIndex) {
  return (dispatch, getState) => {
    const values = getState().thesauri.data.values.slice(0);
    if (typeof groupIndex === 'number') {
      values[groupIndex] = _objectSpread({}, values[groupIndex]);
      values[groupIndex].values = values[groupIndex].values.slice(0);
      values[groupIndex].values.splice(index, 1);
    } else {
      values.splice(index, 1);
    }
    dispatch(_reactReduxForm.actions.change('thesauri.data.values', values));
  };
}