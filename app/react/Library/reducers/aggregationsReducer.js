"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = aggregations;var _BasicReducer = _interopRequireWildcard(require("../../BasicReducer"));
var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const reducer = (0, _BasicReducer.default)('aggregations', {});

function aggregations(state, _action = {}) {
  let action = _action;
  if (action.type === types.INITIALIZE_FILTERS_FORM) {
    action = _BasicReducer.actions.set('aggregations', action.aggregations);
  }

  return reducer(state, action);
}