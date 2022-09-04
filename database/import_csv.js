"use strict";var _csv = require("../app/api/csv");
var _odm = require("../app/api/odm");
var _users = _interopRequireDefault(require("../app/api/users/users"));
var _handleError = require("../app/api/utils/handleError");
var _tenantContext = require("../app/api/tenants/tenantContext");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const { template, importThesauri, username, language, file, stop } = require('yargs') // eslint-disable-line
.option('template', {
  alias: 't',
  describe: '_id of a template or thesauri' }).

option('importThesauri', {
  alias: 'T',
  describe: 'flag to import a thesauri csv instead of entities',
  type: 'boolean',
  default: false }).

option('file', {
  alias: 'f',
  describe: 'path to the csv file to import' }).

option('username', {
  alias: 'u',
  describe: 'user to be assigned to imported entities',
  default: 'admin' }).

option('language', {
  alias: 'l',
  describe: 'language to be used for the import',
  default: 'en' }).

option('stop', {
  alias: 's',
  describe: 'stop when there is an error',
  type: 'boolean',
  default: false }).

demandOption(['template', 'file'], '\n\n').argv;

const loader = new _csv.CSVLoader({ stopOnError: stop });

if (importThesauri) {
  _odm.DB.connect().
  then(() => _tenantContext.tenants.run(async () => loader.loadThesauri(file, template, { language }))).
  then(() => {
    process.stdout.write(' 🎉 imported thesauri succesfully\n');
    process.stdout.write('\n\n');
    _odm.DB.disconnect();
  }).
  catch((e) => {
    const error = (0, _handleError.prettifyError)(e);
    process.stdout.write('\n\n');
    process.stdout.write('There was an error and importation stoped !!\n');
    process.stdout.write(error.message);
    process.stdout.write('\n');
    if (error.validations) {
      process.stdout.write(JSON.stringify(error.validations, null, ' '));
    }
    process.stdout.write('\n\n');
    _odm.DB.disconnect();
  });
} else {
  let loaded = 0;
  let errors = 0;

  loader.on('entityLoaded', () => {
    loaded += 1;
    process.stdout.write(`imported ${loaded} entities ...\r`);
  });

  loader.on('loadError', (error, entity, index) => {
    errors += 1;
    process.stdout.write(`\n an error ocurred importing entity number ${index} ${entity.title} =>`);
    process.stdout.write(`\n ${error} \n`);
  });

  process.stdout.write('\n');

  _odm.DB.connect().then(() =>
  _tenantContext.tenants.
  run(async () => {
    const [user] = await _users.default.get({ username });
    await loader.load(file, template, { language, user });
  }).
  then(() => {
    process.stdout.write(` 🎉 imported ${loaded} entities succesfully\n`);
    process.stdout.write('\n\n');
    _odm.DB.disconnect();
  }).
  catch((e) => {
    _odm.DB.disconnect();
    process.stdout.write('\n\n');
    if (stop) {
      process.stdout.write('There was an error and importation stoped !!\n');
      process.stdout.write(e.message);
      process.stdout.write(e.stack || '');
    }

    if (!stop) {
      process.stdout.write(` 🎉 imported ${loaded} entities succesfully\n`);
      process.stdout.write(` ‼ ${errors} entities had errors and were not imported\n`);
    }
    process.stdout.write('\n\n');
  }));

}