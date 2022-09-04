"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = _default;var _immutable = require("immutable");
var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const initialState = { open: false, connecting: false };

function _default(state = initialState, action = {}) {
  switch (action.type) {
    case types.OPEN_CONNECTION_PANEL:
      return state.set('open', true);

    case types.CLOSE_CONNECTION_PANEL:
      return state.set('connecting', false).set('open', false);

    case types.SEARCHING_CONNECTIONS:
      return state.set('searching', true);

    case 'connections/searchResults/SET':
      return state.set('searching', false);

    case types.CREATING_CONNECTION:
      return state.set('creating', true);

    case types.CREATING_RANGED_CONNECTION:
      return state.set('connecting', true);

    case types.CANCEL_RANGED_CONNECTION:
      return state.set('connecting', false);

    case types.CONNECTION_CREATED:
      return state.set('creating', false).set('connecting', false).set('open', false);

    default:
      return (0, _immutable.fromJS)(state);}

}