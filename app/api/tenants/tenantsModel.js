"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.tenantsModel = exports.TenantsModel = void 0;var _events = require("events");
var _mongoose = _interopRequireDefault(require("mongoose"));
var _config = require("../config");
var _DB = require("../odm/DB");
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




const schemaValidator = {
  $jsonSchema: {
    bsonType: 'object',
    properties: {
      name: {
        bsonType: 'string',
        description: 'must be a string and is required',
        minLength: 1 } } } };





const mongoSchema = new _mongoose.default.Schema({
  name: { type: String, unique: true },
  dbName: String,
  indexName: String,
  uploadedDocuments: String,
  attachments: String,
  customUploads: String,
  temporalFiles: String,
  activityLogs: String });





class TenantsModel extends _events.EventEmitter {






  constructor() {
    super();_defineProperty(this, "model", void 0);_defineProperty(this, "tenantsDB", void 0);_defineProperty(this, "collectionName", void 0);
    this.collectionName = 'tenants';
    this.tenantsDB = _DB.DB.connectionForDB(_config.config.SHARED_DB);
  }

  initializeModel() {
    this.model = this.tenantsDB.model(this.collectionName, mongoSchema);

    const changeStream = this.model.watch();
    changeStream.on('change', () => {
      this.change().catch(_utils.handleError);
    });

    changeStream.on('error', (error) => {
      //The $changeStream stage is only supported on replica sets
      if (error.code === 40573) {
        // mongo documentation and ts types says changeStream.close returns a promise
        // but actually it does not in the current version,
        // catching the promise to prevent the eslint error results in a "catch of undefined" error
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        changeStream.close();
      } else {
        (0, _utils.handleError)(error);
      }
    });
  }

  async initialize() {
    const collections = (await this.tenantsDB.db.listCollections().toArray()).map((c) => c.name);

    if (collections.includes(this.collectionName)) {
      await this.tenantsDB.db.command({
        collMod: this.collectionName,
        validator: schemaValidator });

    } else {
      await this.tenantsDB.db.createCollection(this.collectionName, {
        validator: schemaValidator });

    }

    this.initializeModel();
  }

  async change() {
    const tenants = await this.get();
    this.emit('change', tenants);
  }

  async get() {
    if (!this.model) {
      throw new Error(
      'tenants model has not been initialized, make sure you called initialize() method');

    }
    return this.model.find({});
  }}exports.TenantsModel = TenantsModel;


const tenantsModel = async () => {
  const model = new TenantsModel();
  await model.initialize();
  return model;
};exports.tenantsModel = tenantsModel;