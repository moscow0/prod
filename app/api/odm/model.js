"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.generateID = exports.OdmModel = void 0;exports.instanceModel = instanceModel;exports.models = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));







var _modelBulkWriteStream = require("./modelBulkWriteStream");
var _MultiTenantMongooseModel = require("./MultiTenantMongooseModel");
var _logHelper = require("./logHelper");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


















const generateID = _mongoose.default.Types.ObjectId;exports.generateID = generateID;


class OdmModel {




  documentExists(data) {
    return this.db.findById(data._id, '_id');
  }

  constructor(logHelper, collectionName, schema) {_defineProperty(this, "db", void 0);_defineProperty(this, "logHelper", void 0);
    this.db = new _MultiTenantMongooseModel.MultiTenantMongooseModel(collectionName, schema);
    this.logHelper = logHelper;
  }

  async save(data, query) {
    if (await this.documentExists(data)) {
      const saved = await this.db.findOneAndUpdate(
      query || { _id: data._id },
      data,
      {
        new: true });


      if (saved === null) {
        throw Error('The document was not updated!');
      }
      await this.logHelper.upsertLogOne(saved);
      return saved.toObject();
    }
    const saved = await this.db.create(data);
    await this.logHelper.upsertLogOne(saved);
    return saved.toObject();
  }

  async saveMultiple(
  dataArray,
  query,
  updateExisting = true)
  {
    const { existingIds, existingData, updated } = await this.saveExisting(
    dataArray,
    query,
    updateExisting);

    const created = await this.saveNew(existingIds, dataArray);

    if (updated.length !== existingData.length) {
      throw Error('A document was not updated!');
    }

    const saved = updated.concat(created);
    await Promise.all(saved.map(async (s) => this.logHelper.upsertLogOne(s)));
    return saved.map((s) => s.toObject());
  }

  async saveNew(existingIds, dataArray) {
    const newData = dataArray.filter((d) => !d._id || !existingIds.has(d._id.toString()));
    return (await this.db.createMany(newData)) || [];
  }

  async saveExisting(
  dataArray,
  query,
  updateExisting = true)
  {
    const ids = [];
    dataArray.forEach((d) => {
      if (d._id) {
        ids.push(d._id);
      }
    });
    const existingIds = new Set(
    (
    await this.db.find({ _id: { $in: ids } }, '_id', {
      lean: true })).

    map((d) => d._id.toString()));


    const existingData = dataArray.filter((d) => d._id && existingIds.has(d._id.toString()));
    if (updateExisting) {
      await this.db.bulkWrite(
      existingData.map((data) => ({
        updateOne: {
          filter: _objectSpread(_objectSpread({}, query), {}, { _id: data._id }),
          update: data } })));




      const updated = await this.db.find(_objectSpread(_objectSpread({},
      query), {}, {
        _id: { $in: Array.from(existingIds) } }));


      return { existingIds, existingData, updated };
    }

    return { existingIds, existingData, updated: [] };
  }

  async updateMany(
  conditions,
  doc,
  options = {})
  {
    await this.logHelper.upsertLogMany(conditions);
    return this.db._updateMany(conditions, doc, options);
  }

  async count(query = {}) {
    return this.db.countDocuments(query);
  }

  async get(
  query = {},
  select = '',
  options = {})
  {
    const results = await this.db.find(query, select, _objectSpread({ lean: true }, options));
    return results;
  }

  async getById(id, select) {
    const results = await this.db.findById(id, select);
    return results;
  }

  async delete(condition) {
    let cond = condition;
    if (_mongoose.default.Types.ObjectId.isValid(condition)) {
      cond = { _id: condition };
    }
    await this.logHelper.upsertLogMany(cond, true);
    return this.db.deleteMany(cond);
  }

  async facet(aggregations, pipelines, project) {
    return this.db.facet(aggregations, pipelines, project);
  }

  openBulkWriteStream(stackLimit, ordered) {
    return new _modelBulkWriteStream.ModelBulkWriteStream(this, stackLimit, ordered);
  }}


// models are accessed in api/sync, which cannot be type-safe since the document
// type is a request parameter. Thus, we store all OdmModels as type Document.
exports.OdmModel = OdmModel;const models = {};exports.models = models;

function instanceModel(collectionName, schema) {
  const logHelper = (0, _logHelper.createUpdateLogHelper)(collectionName);
  const model = new OdmModel(logHelper, collectionName, schema);
  models[collectionName] = model;
  return model;
}