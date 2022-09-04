"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.syncWorker = void 0;require("../entities");
var _urlJoin = _interopRequireDefault(require("url-join"));
var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));

var _tenants = require("../tenants");
var _settings = _interopRequireDefault(require("../settings"));
var _permissionsContext = require("../permissions/permissionsContext");
var _synchronizer = require("./synchronizer");
var _syncConfig = require("./syncConfig");
var _syncsModel = _interopRequireDefault(require("./syncsModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const updateSyncs = async (name, lastSync) =>
_syncsModel.default._updateMany({ name }, { $set: { lastSync } }, {});

async function createSyncIfNotExists(config) {
  const syncs = await _syncsModel.default.find({ name: config.name });
  if (syncs.length === 0) {
    await _syncsModel.default.create({ lastSync: 0, name: config.name });
  }
}

class InvalidSyncConfig extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidSyncConfig';
  }}



















const validateConfig = (config) => {
  if (!config.name) throw new InvalidSyncConfig('Name is not defined on sync config');
  if (!config.url) throw new InvalidSyncConfig('url is not defined on sync config');
  if (!config.config) throw new InvalidSyncConfig('config is not defined on sync config');
  return config;
};

const syncWorker = {
  async runAllTenants() {
    return Object.keys(_tenants.tenants.tenants).reduce(async (previous, tenantName) => {
      await previous;
      return _tenants.tenants.run(async () => {
        _permissionsContext.permissionsContext.setCommandContext();
        const { sync } = await _settings.default.get({}, 'sync');
        if (sync) {
          await this.syncronize(sync);
        }
      }, tenantName);
    }, Promise.resolve());
  },

  async syncronize(syncSettings) {
    await syncSettings.reduce(async (previousSync, config) => {
      await previousSync;
      const syncConfig = validateConfig(config);
      if (syncConfig.active) {
        const cookie = await this.login(syncConfig);
        await this.syncronizeConfig(syncConfig, cookie);
      }
    }, Promise.resolve());
  },

  async syncronizeConfig(config, cookie) {
    await createSyncIfNotExists(config);

    const syncConfig = await (0, _syncConfig.createSyncConfig)(config, config.name);

    await (
    await syncConfig.lastChanges()).
    reduce(async (previousChange, change) => {
      await previousChange;
      const shouldSync = await syncConfig.shouldSync(change);
      if (shouldSync.skip) {
        await _synchronizer.synchronizer.syncDelete(change, config.url, cookie);
      }

      if (shouldSync.data) {
        await _synchronizer.synchronizer.syncData(
        {
          url: config.url,
          change,
          data: shouldSync.data,
          cookie },

        'post');

      }
      await updateSyncs(config.name, change.timestamp);
    }, Promise.resolve());
  },

  async login({ url, username, password }) {
    const response = await _JSONRequest.default.post((0, _urlJoin.default)(url, 'api/login'), { username, password });

    return response.cookie || '';
  } };exports.syncWorker = syncWorker;