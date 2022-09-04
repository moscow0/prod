"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.setSelection = setSelection;exports.setTargetSelection = setTargetSelection;exports.unsetSelection = unsetSelection;exports.unsetTargetSelection = unsetTargetSelection;var types = _interopRequireWildcard(require("./actionTypes"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

function setSelection(sourceRange, sourceFile) {
  return {
    type: types.SET_SELECTION,
    sourceRange,
    sourceFile };

}

function setTargetSelection(targetRange, targetFile) {
  return {
    type: types.SET_TARGET_SELECTION,
    targetRange,
    targetFile };

}

function unsetSelection() {
  return {
    type: types.UNSET_SELECTION };

}

function unsetTargetSelection() {
  return {
    type: types.UNSET_TARGET_SELECTION };

}