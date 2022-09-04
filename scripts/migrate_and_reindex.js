"use strict";var _odm = require("../app/api/odm");
var _migrate = require("../app/api/migrations/migrate");

process.on('unhandledRejection', (error) => {
  throw error;
});

process.stdout.write('Starting migrations...\r\n');
(0, _migrate.runMigration)().
then((result) => {
  if (result.reindex) {
    // eslint-disable-next-line import/no-dynamic-require,global-require
    require(`${__dirname}/../database/reindex_elastic.js`);
  }
}).
catch(async (e) => {
  await _odm.DB.disconnect();
  throw e;
});