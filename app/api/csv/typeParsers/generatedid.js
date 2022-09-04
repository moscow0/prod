"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _tsUtils = require("../../../shared/tsUtils");
var _IDGenerator = require("../../../shared/IDGenerator");

const generatedid = async (
entityToImport,
property) =>
{
  const value = entityToImport[(0, _tsUtils.ensure)(property.name)] || (0, _IDGenerator.generateID)(3, 4, 4);
  return [{ value }];
};var _default =

generatedid;exports.default = _default;