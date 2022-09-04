"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _tsUtils = require("../../../shared/tsUtils");

const geolocation = async (
entityToImport,
property) =>
{
  const [lat, lon] = entityToImport[(0, _tsUtils.ensure)(property.name)].split('|');
  if (lat && lon) {
    return [{ value: { lat: Number(lat), lon: Number(lon), label: '' } }];
  }

  return [];
};var _default =

geolocation;exports.default = _default;