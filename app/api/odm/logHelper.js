"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UpdateLogHelper = exports.NoLogger = exports.EntitiesUpdateLogHelper = void 0;exports.createUpdateLogHelper = createUpdateLogHelper;

var _promisePool = _interopRequireDefault(require("@supercharge/promise-pool"));

var _updatelogs = require("../updatelogs");


var _model = require("./model");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const getBatchSteps = async (
model,
query,
batchSize) =>
{
  const allIds = await model.get(query, '_id', { sort: { _id: 1 } });

  const steps = [];
  for (let i = 0; i < allIds.length; i += batchSize) {
    steps.push(allIds[i]);
  }

  return steps;
};

class UpdateLogHelper {




  constructor(collectionName) {_defineProperty(this, "collectionName", void 0);
    this.collectionName = collectionName;
  }

  async getAffectedIds(conditions) {
    return _model.models[this.collectionName].db.distinct('_id', conditions);
  }

  async upsertLogOne(doc) {
    const logData = { namespace: this.collectionName, mongoId: doc._id };
    await _updatelogs.model.findOneAndUpdate(
    logData, _objectSpread(_objectSpread({},
    logData), {}, { timestamp: Date.now(), deleted: false }),
    { upsert: true });

  }

  async upsertLogMany(
  query,
  deleted = false,
  batchSize = UpdateLogHelper.batchSizeUpsertMany)
  {
    await new _promisePool.default().
    for(await getBatchSteps(_model.models[this.collectionName], query, batchSize)).
    withConcurrency(5).
    process(async (stepIndex) => {
      const batch = await _model.models[this.collectionName].get(_objectSpread(_objectSpread({},
      query), {}, { $and: [{ _id: { $gte: stepIndex } }] }),
      { _id: 1 },
      { limit: batchSize });


      await _updatelogs.model._updateMany(
      { mongoId: { $in: batch }, namespace: this.collectionName },
      { $set: { timestamp: Date.now(), deleted } },
      { lean: true });

    });
  }}exports.UpdateLogHelper = UpdateLogHelper;_defineProperty(UpdateLogHelper, "batchSizeUpsertMany", 50000);


class NoLogger {
  // eslint-disable-next-line class-methods-use-this
  async getAffectedIds() {
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  async upsertLogOne() {
    return Promise.resolve();
  }

  // eslint-disable-next-line class-methods-use-this
  async upsertLogMany() {
    return Promise.resolve();
  }}exports.NoLogger = NoLogger;


class EntitiesUpdateLogHelper extends UpdateLogHelper {


  constructor(collectionName, filesHelper) {
    super(collectionName);_defineProperty(this, "filesHelper", void 0);
    this.filesHelper = filesHelper;
  }

  async upsertLogOne(entity) {
    await super.upsertLogOne(entity);
    const typedEntity = entity;
    await this.filesHelper.upsertLogMany({ entity: typedEntity.sharedId });
  }}exports.EntitiesUpdateLogHelper = EntitiesUpdateLogHelper;


function createUpdateLogHelper(collectionName) {
  if (collectionName === 'activitylog') return new NoLogger();
  if (collectionName === 'entities') {
    return new EntitiesUpdateLogHelper(collectionName, createUpdateLogHelper('files'));
  }
  return new UpdateLogHelper(collectionName);
}