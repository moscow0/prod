"use strict";var _config = require("../app/api/config");
var _tenantContext = require("../app/api/tenants/tenantContext");
var _odm = require("../app/api/odm");
var _permissionsContext = require("../app/api/permissions/permissionsContext");
var _entitiesIndex = require("../app/api/search/entitiesIndex");
var _search = require("../app/api/search");
var _dictionariesModel = _interopRequireDefault(require("../app/api/thesauri/dictionariesModel"));
var _JSONRequest = _interopRequireDefault(require("../app/shared/JSONRequest"));
var _elastic_mapping = _interopRequireDefault(require("./elastic_mapping/elastic_mapping"));

var _templates = _interopRequireDefault(require("../app/api/templates"));
var _elasticMapFactory = _interopRequireDefault(require("./elastic_mapping/elasticMapFactory"));
var _log = require("../app/api/log");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const getIndexUrl = () => {
  const elasticUrl = _config.config.elasticsearch_nodes[0];
  return `${elasticUrl}/${_config.config.defaultTenant.indexName}`;
};

const setReindexSettings = async (refreshInterval, numberOfReplicas, translogDurability) =>
_JSONRequest.default.put(`${getIndexUrl()}/_settings`, {
  index: {
    refresh_interval: refreshInterval,
    number_of_replicas: numberOfReplicas,
    translog: {
      durability: translogDurability } } });




const restoreSettings = async () => {
  process.stdout.write('Restoring index settings...');
  const result = setReindexSettings('1s', 0, 'request');
  process.stdout.write(' [done]\n');
  return result;
};

const endScriptProcedures = async () =>
new Promise((resolve, reject) => {
  _log.errorLog.closeGraylog(async () => {
    try {
      await restoreSettings();
      await _odm.DB.disconnect();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
});

const indexEntities = async () => {
  const spinner = ['|', '/', '-', '\\'];
  let docsIndexed = 0;
  let pos = 0;

  await _search.search.indexEntities({}, '+fullText', 10, (indexed) => {
    process.stdout.write(
    `Indexing documents and entities... ${spinner[pos]} - ${docsIndexed} indexed\r`);

    pos = (pos + 1) % 4;
    docsIndexed += indexed;
  });

  return docsIndexed;
};

/*eslint-disable max-statements*/
const prepareIndex = async () => {
  process.stdout.write(`Deleting index ${_config.config.defaultTenant.indexName}...`);
  try {
    await _JSONRequest.default.delete(getIndexUrl());
  } catch (err) {
    // Should not stop on index_not_found_exception
    if (err.json.error.type === 'index_not_found_exception') {
      process.stdout.write('\r\nThe index was not found:\r\n');
      process.stdout.write(`${JSON.stringify(err, null, ' ')}\r\nMoving on.\r\n`);
    } else {
      throw err;
    }
  }
  process.stdout.write(' [done]\n');

  process.stdout.write(`Creating index ${_config.config.defaultTenant.indexName}...\r\n`);
  process.stdout.write(' - Base properties mapping\r\n');
  await _JSONRequest.default.put(getIndexUrl(), _elastic_mapping.default);
  process.stdout.write(' - Custom templates mapping\r\n');
  const templates = await _templates.default.get();
  const dictionaries = await _dictionariesModel.default.get({ enable_classification: true });
  const templatesMapping = _elasticMapFactory.default.mapping(templates, !!dictionaries.length);
  await _JSONRequest.default.put(`${getIndexUrl()}/_mapping`, templatesMapping);
  process.stdout.write(' [done]\n');
};

const tweakSettingsForPerformmance = async () => {
  process.stdout.write('Tweaking index settings for reindex performance...');
  const result = setReindexSettings(-1, 0, 'async');
  process.stdout.write(' [done]\n');
  return result;
};

const reindex = async () => {
  process.stdout.write('Starting reindex...\r\n');
  const docsIndexed = await indexEntities();
  process.stdout.write(`Indexing documents and entities... - ${docsIndexed} indexed\r\n`);
};

const processErrors = async (err) => {
  if (err instanceof _entitiesIndex.IndexError) {
    process.stdout.write('\r\nWarning! Errors found during reindex.\r\n');
  } else {
    const errorMsg = err instanceof Error ? err.message : JSON.stringify(err, null, ' ');
    _log.errorLog.error(`Uncaught Reindex error.\r\n${errorMsg}\r\nWill exit with (1)\r\n`);
    await endScriptProcedures();
    throw err;
  }
};

process.on('unhandledRejection', (error) => {
  throw error;
});

let dbAuth = {};

if (process.env.DBUSER) {
  dbAuth = {
    auth: { authSource: 'admin' },
    user: process.env.DBUSER,
    pass: process.env.DBPASS };

}

_odm.DB.connect(_config.config.DBHOST, dbAuth).then(async () => {
  const start = Date.now();

  await _tenantContext.tenants.run(async () => {
    try {
      _permissionsContext.permissionsContext.setCommandContext();
      await prepareIndex();
      await tweakSettingsForPerformmance();
      await reindex();
    } catch (err) {
      await processErrors(err);
    }
    await endScriptProcedures();
  });

  const end = Date.now();
  process.stdout.write(`Done, took ${(end - start) / 1000} seconds\n`);
});