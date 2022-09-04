"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.testingEnvironment = void 0;var _AppContext = require("./AppContext");
var _testing_db = _interopRequireDefault(require("./testing_db"));
var _testingTenants = require("./testingTenants");
var _elastic_testing = require("./elastic_testing");

var _testingUserInContext = require("./testingUserInContext");
var _files = require("../files");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const testingEnvironment = {
  async setUp(fixtures, elasticIndex) {
    await this.setTenant();
    this.setPermissions();
    this.setRequestId();
    await this.setFixtures(fixtures);
    await this.setElastic(elasticIndex);
  },

  async setTenant(name = 'defaultDB') {
    _testingTenants.testingTenants.mockCurrentTenant({
      name: _testing_db.default.dbName || name,
      dbName: _testing_db.default.dbName || name,
      indexName: 'index' });

    await (0, _files.setupTestUploadedPaths)();
  },

  async setFixtures(fixtures) {
    if (fixtures) {
      await _testing_db.default.connect();
      await _testing_db.default.clearAllAndLoadFixtures(fixtures);
    }
  },

  async setElastic(elasticIndex) {
    if (elasticIndex) {
      _testingTenants.testingTenants.changeCurrentTenant({ indexName: elasticIndex });
      await _elastic_testing.elasticTesting.reindex();
    }
  },

  setPermissions(user) {
    const userInContextMockFactory = new _testingUserInContext.UserInContextMockFactory();
    if (!user) {
      userInContextMockFactory.mockEditorUser();
    } else {
      userInContextMockFactory.mock(user);
    }
  },

  setRequestId(requestId = '1234') {
    jest.
    spyOn(_AppContext.appContext, 'get').
    mockImplementation((key) => key === 'requestId' ? requestId : null);
  },
  async tearDown() {
    await _testing_db.default.disconnect();
  } };exports.testingEnvironment = testingEnvironment;