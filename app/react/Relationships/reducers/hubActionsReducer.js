"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;var _immutable = require("immutable");
var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const initialState = {
  editing: false,
  saving: false,
  addTo: { hubIndex: null, rightRelationshipIndex: null } };


function _default(state = initialState, action = {}) {
  switch (action.type) {
    case types.EDIT_RELATIONSHIPS:
      return state.set('editing', action.value);

    case types.SET_RELATIONSHIPS_ADD_TO_DATA:
      return state.
      setIn(['addTo', 'hubIndex'], action.index).
      setIn(['addTo', 'rightRelationshipIndex'], action.rightIndex);

    case types.SAVING_RELATIONSHIPS:
      return state.set('saving', true);

    case types.SAVED_RELATIONSHIPS:
      return state.set('saving', false);

    default:
      return (0, _immutable.fromJS)(state);}

}