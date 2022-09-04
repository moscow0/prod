"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IndexTargetTypes = void 0;exports.objectIndex = objectIndex;var _lodash = _interopRequireDefault(require("lodash"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var

IndexTargetTypes;exports.IndexTargetTypes = IndexTargetTypes;(function (IndexTargetTypes) {IndexTargetTypes["one"] = "one";IndexTargetTypes["array"] = "array";IndexTargetTypes["set"] = "set";})(IndexTargetTypes || (exports.IndexTargetTypes = IndexTargetTypes = {}));







const IndexTargetTransformations = {
  one: (group) => group.length ? group[0] : undefined,
  array: (group) => group,
  set: (group) => new Set(group) };


function objectIndex(
dataArray,
indexingFunction,
dataTransformation = (data) => data,
targetType = IndexTargetTypes.one)
{
  // const  = IndexTargetTransformations[targetType];
  const grouped = _lodash.default.groupBy(dataArray, indexingFunction);
  const transformed = Object.fromEntries(
  Object.entries(grouped).map(([key, group]) => [
  key,
  IndexTargetTransformations[targetType](group.map((value) => dataTransformation(value)))]));


  return transformed;
}