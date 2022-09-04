"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.populateGeneratedIdByTemplate = void 0;
var _IDGenerator = require("../../shared/IDGenerator");
var _propertyTypes = require("../../shared/propertyTypes");

var _promisePool = _interopRequireDefault(require("@supercharge/promise-pool"));
var _entitiesModel = _interopRequireDefault(require("./entitiesModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const updateRecursively = async (
templateId,
generatedIdProperties,
searchQuery) =>
{
  const batchSize = 1000;
  const sharedIds = (
  await _entitiesModel.default.db.aggregate([
  { $match: { $and: [{ template: templateId }, _objectSpread({}, searchQuery)] } },
  { $group: { _id: '$sharedId' } },
  { $limit: batchSize }])).

  map((g) => g._id);

  if (sharedIds.length === 0) {
    return Promise.resolve();
  }

  await Promise.all(
  sharedIds.map(async (sharedId) =>
  _entitiesModel.default.updateMany(
  { sharedId }, _objectSpread({},

  generatedIdProperties.reduce(
  (values, property) => _objectSpread({}, _objectSpread(_objectSpread({},
  values), {}, { [`metadata.${property.name}`]: [{ value: (0, _IDGenerator.generateID)(3, 4, 4) }] })),

  {})))));






  if (sharedIds.length === batchSize) {
    return updateRecursively(templateId, generatedIdProperties, searchQuery);
  }
  return Promise.resolve();
};

const populateGeneratedIdByTemplate = async (
templateId,
properties) =>
{
  const generatedIdProperties = properties.filter((prop) => prop.type === _propertyTypes.propertyTypes.generatedid);
  const searchQuery = generatedIdProperties.reduce(
  (values, property) => _objectSpread({}, _objectSpread(_objectSpread({},
  values), {}, { [`metadata.${property.name}`]: { $exists: false } })),

  {});


  const stepSize = 5000;
  const entitiesQty = await _entitiesModel.default.count({ template: templateId });
  const steps = Array(Math.floor(entitiesQty / stepSize) || 1);
  await new _promisePool.default().
  for(steps).
  withConcurrency(Math.min(5, steps.length)).
  process(async () => {
    await updateRecursively(templateId, generatedIdProperties, searchQuery);
  });
};exports.populateGeneratedIdByTemplate = populateGeneratedIdByTemplate;