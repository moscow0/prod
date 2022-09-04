"use strict";var _odm = require("../app/api/odm");
var _migrate = require("../app/api/migrations/migrate");

process.on('unhandledRejection', (error) => {
  throw error;
});

(0, _migrate.runMigration)().catch(async (e) => {
  await _odm.DB.disconnect();
  throw e;
});