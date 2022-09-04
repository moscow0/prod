"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.runMigration = void 0;
var _odm = require("../odm");
var _tenantContext = require("../tenants/tenantContext");
var _config = require("../config");
var _log = require("../log");
var _migrator = require("./migrator");

let auth;

if (process.env.DBUSER) {
  auth = {
    user: process.env.DBUSER,
    pass: process.env.DBPASS };

}

const runMigration = async () => {
  await _odm.DB.connect(_config.config.DBHOST, auth);
  const { db } = _odm.DB.connectionForDB(_config.config.defaultTenant.dbName);
  let migrations = [];
  await _tenantContext.tenants.run(async () => {
    migrations = await _migrator.migrator.migrate(db);
  });
  //@ts-ignore
  _log.errorLog.closeGraylog();
  await _odm.DB.disconnect();

  const reindexNeeded = migrations.some((migration) => migration.reindex === true);
  return { reindex: reindexNeeded };
};exports.runMigration = runMigration;