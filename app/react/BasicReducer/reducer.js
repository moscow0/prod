"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.actions = void 0;exports.concat = concat;exports.concatIn = concatIn;exports.default = createReducer;exports.push = push;exports.remove = remove;exports.set = set;exports.setIn = setIn;exports.unset = unset;exports.update = update;exports.updateIn = updateIn;

var _immutable = _interopRequireDefault(require("immutable"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /** @format */

const SET = 'SET';
const SET_IN = 'SET_IN';
const UPDATE = 'UPDATE';
const UPDATE_IN = 'UPDATE_IN';
const UNSET = 'UNSET';
const REMOVE = 'REMOVE';
const PUSH = 'PUSH';
const CONCAT = 'CONCAT';
const CONCAT_IN = 'CONCAT_IN';

function createReducer(namespace, defaultValue) {
  return (currentState = defaultValue, action = {}) => {
    let index;

    switch (action.type) {
      case `${namespace}/${SET}`:
        return _immutable.default.fromJS(action.value);

      case `${namespace}/${SET_IN}`:
        return currentState.set(action.key, _immutable.default.fromJS(action.value));

      case `${namespace}/${UNSET}`:
        return _immutable.default.fromJS(defaultValue);

      case `${namespace}/${PUSH}`:
        return currentState.push(_immutable.default.fromJS(action.value));

      case `${namespace}/${CONCAT}`:
        return currentState.concat(_immutable.default.fromJS(action.value));

      case `${namespace}/${CONCAT_IN}`:
        return currentState.updateIn(action.key, (collection) =>
        collection.concat(_immutable.default.fromJS(action.value)));


      case `${namespace}/${REMOVE}`:
        return _immutable.default.fromJS(currentState).filter(
        (object) => object.get('_id') !== action.value._id);


      case `${namespace}/${UPDATE}`:
        if (currentState instanceof _immutable.default.Map) {
          return currentState.merge(action.value);
        }

        index = currentState.findIndex((o) => o.get('_id') === action.value._id);
        if (index === -1) {
          return currentState.push(_immutable.default.fromJS(action.value));
        }
        return currentState.set(index, _immutable.default.fromJS(action.value));

      case `${namespace}/${UPDATE_IN}`:
        index = currentState.
        getIn(action.key).
        findIndex(
        (o) =>
        o.get(action.customIndex || '_id') === (
        action.customIndex ? action.value[action.customIndex] : action.value._id));

        if (index === -1) {
          return currentState.updateIn(action.key, (collection) =>
          collection.push(_immutable.default.fromJS(action.value)));

        }
        return currentState.setIn([...action.key, index], _immutable.default.fromJS(action.value));

      default:
        return _immutable.default.fromJS(currentState);}

  };
}

function update(namespace, value) {
  return {
    type: `${namespace}/${UPDATE}`,
    value };

}

function updateIn(namespace, key, value, customIndex = '') {
  return {
    type: `${namespace}/${UPDATE_IN}`,
    key,
    value,
    customIndex };

}

function set(namespace, value) {
  return {
    type: `${namespace}/${SET}`,
    value };

}

function setIn(namespace, key, value) {
  return {
    type: `${namespace}/${SET_IN}`,
    key,
    value };

}

function unset(namespace) {
  return {
    type: `${namespace}/${UNSET}` };

}

function push(namespace, value) {
  return {
    type: `${namespace}/${PUSH}`,
    value };

}

function concat(namespace, value) {
  return {
    type: `${namespace}/${CONCAT}`,
    value };

}

function concatIn(namespace, key, value) {
  return {
    type: `${namespace}/${CONCAT_IN}`,
    key,
    value };

}

function remove(namespace, value) {
  return {
    type: `${namespace}/${REMOVE}`,
    value };

}

const actions = {
  update,
  updateIn,
  set,
  setIn,
  unset,
  push,
  concat,
  concatIn,
  remove };exports.actions = actions;