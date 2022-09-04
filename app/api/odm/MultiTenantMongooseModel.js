"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MultiTenantMongooseModel = void 0;








var _tenantContext = require("../tenants/tenantContext");
var _DB = require("./DB");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class MultiTenantMongooseModel {






  constructor(collectionName, schema) {_defineProperty(this, "dbs", void 0);_defineProperty(this, "collectionName", void 0);_defineProperty(this, "schema", void 0);
    this.dbs = {};
    this.collectionName = collectionName;
    this.schema = schema;
  }

  dbForCurrentTenant() {
    const currentTenant = _tenantContext.tenants.current();
    return _DB.DB.connectionForDB(currentTenant.dbName).model(
    this.collectionName,
    this.schema);

  }

  findById(id, select) {
    return this.dbForCurrentTenant().findById(id, select, { lean: true });
  }

  find(query, select = '', options = {}) {
    return this.dbForCurrentTenant().find(query, select, options);
  }

  async findOneAndUpdate(
  query,
  update,
  options)
  {
    return this.dbForCurrentTenant().findOneAndUpdate(query, update, options);
  }

  async create(data) {
    return this.dbForCurrentTenant().create(data);
  }

  async createMany(dataArray) {
    return this.dbForCurrentTenant().create(dataArray);
  }

  async _updateMany(
  conditions,
  doc,
  options)
  {
    return this.dbForCurrentTenant().updateMany(conditions, doc, options);
  }

  async findOne(conditions, projection) {
    const result = await this.dbForCurrentTenant().findOne(conditions, projection, { lean: true });
    return result;
  }

  async replaceOne(conditions, replacement) {
    return this.dbForCurrentTenant().replaceOne(conditions, replacement);
  }

  async countDocuments(query = {}) {
    return this.dbForCurrentTenant().countDocuments(query);
  }

  async distinct(field, query = {}) {
    return this.dbForCurrentTenant().distinct(field, query);
  }

  async deleteMany(query) {
    return this.dbForCurrentTenant().deleteMany(query);
  }

  async aggregate(aggregations) {
    return this.dbForCurrentTenant().aggregate(aggregations);
  }

  aggregateCursor(aggregations) {
    return this.dbForCurrentTenant().aggregate(aggregations);
  }

  async facet(aggregations, pipelines, project) {
    return this.dbForCurrentTenant().aggregate(aggregations).facet(pipelines).project(project);
  }

  async updateOne(conditions, doc) {
    return this.dbForCurrentTenant().updateOne(conditions, doc);
  }

  async bulkWrite(writes, options) {
    return this.dbForCurrentTenant().bulkWrite(writes, options);
  }}exports.MultiTenantMongooseModel = MultiTenantMongooseModel;