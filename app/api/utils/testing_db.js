"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.testingDB = exports.fixturer = exports.default = exports.createNewMongoDB = void 0;var _mongoose = _interopRequireDefault(require("mongoose"));





var _odm = require("../odm");
var _filesystem = require("../files/filesystem");




var _testingUserInContext = require("./testingUserInContext");
var _uniqueID = _interopRequireDefault(require("../../shared/uniqueID"));
var _tsUtils = require("../../shared/tsUtils");
var _elastic_testing = require("./elastic_testing");
var _testingTenants = require("./testingTenants");
var _createMongoInstance = require("./createMongoInstance");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}



_mongoose.default.set('useFindAndModify', false);
_mongoose.default.Promise = Promise;
let connected = false;
let mongod;
let mongodb;













const fixturer = {
  async clear(db, _collections = undefined) {
    const collections =
    _collections || (await db.listCollections().toArray()).map((c) => c.name);

    await Promise.all(
    collections.map(async (c) => {
      await db.collection(c).deleteMany({});
    }));

  },

  async clearAllAndLoad(db, fixtures) {
    await this.clear(db);
    await Promise.all(
    Object.keys(fixtures).map(async (collectionName) => {
      await db.collection(collectionName).insertMany(fixtures[collectionName]);
    }));

  } };exports.fixturer = fixturer;


let mongooseConnection;

const createNewMongoDB = async (dbName = '') =>
(0, _tsUtils.ensure)(await (0, _createMongoInstance.createMongoInstance)(dbName));exports.createNewMongoDB = createNewMongoDB;

const initMongoServer = async (dbName) => {
  mongod = await createNewMongoDB(dbName);
  const uri = mongod.getUri();
  mongooseConnection = await _odm.DB.connect(`${uri}${dbName}`);
  connected = true;
};

const testingDB =

















{
  mongodb: null,
  dbName: '',
  UserInContextMockFactory: new _testingUserInContext.UserInContextMockFactory(),

  async connect(options = { defaultTenant: true }) {
    if (!connected) {
      this.dbName = (0, _uniqueID.default)();
      await initMongoServer(this.dbName);
      // mongo/mongoose types collisions
      //@ts-ignore
      mongodb = mongooseConnection.db;
      this.mongodb = mongodb;

      if (options.defaultTenant) {
        _testingTenants.testingTenants.mockCurrentTenant({
          dbName: this.dbName,
          name: this.dbName,
          indexName: 'index' });

        await (0, _filesystem.setupTestUploadedPaths)();
      }
    }

    return mongooseConnection;
  },

  async disconnect() {
    await _mongoose.default.disconnect();
    if (mongod) {
      await mongod.stop();
    }
    _testingTenants.testingTenants.restoreCurrentFn();
  },

  id(id = undefined) {
    return _mongoose.default.Types.ObjectId(id);
  },

  async clear(collections = undefined) {
    await fixturer.clear(mongodb, collections);
  },

  async setupFixturesAndContext(fixtures, elasticIndex, dbName) {
    await this.connect();
    let optionalMongo = null;
    if (dbName) {
      optionalMongo = _odm.DB.connectionForDB(dbName).db;
    }
    await fixturer.clearAllAndLoad(optionalMongo || mongodb, fixtures);
    this.UserInContextMockFactory.mockEditorUser();

    if (elasticIndex) {
      _testingTenants.testingTenants.changeCurrentTenant({ indexName: elasticIndex });
      await _elastic_testing.elasticTesting.reindex();
    }
  },

  /**
   * @deprecated
   */
  async clearAllAndLoad(fixtures, elasticIndex) {
    await this.setupFixturesAndContext(fixtures, elasticIndex);
  },

  async clearAllAndLoadFixtures(fixtures) {
    await fixturer.clearAllAndLoad(mongodb, fixtures);
  } };exports.testingDB = testingDB;




// deprecated, for backward compatibility
var _default = testingDB;exports.default = _default;