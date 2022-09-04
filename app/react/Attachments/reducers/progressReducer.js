"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = documents;var _immutable = require("immutable");
var types = _interopRequireWildcard(require("../actions/actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const initialState = {};

function documents(state = initialState, action = {}) {
  if (action.type === types.START_UPLOAD_ATTACHMENT) {
    return state.set(action.entity, 0);
  }

  if (action.type === types.ATTACHMENT_PROGRESS) {
    return state.set(action.entity, action.progress);
  }

  if (action.type === types.ATTACHMENT_COMPLETE) {
    return state.delete(action.entity);
  }

  if (action.type === types.ATTACHMENT_LOCAL_COMPLETE) {
    return state.delete(action.entity);
  }

  return (0, _immutable.fromJS)(state);
}