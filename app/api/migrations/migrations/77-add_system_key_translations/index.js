"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;
var fs = _interopRequireWildcard(require("fs"));

var _csv = _interopRequireDefault(require("../../../csv/csv"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;} //eslint-disable-next-line node/no-restricted-import

/*
This migration is meant to be repeatable.
After copy pasting:
  - change the contents of system_keys.csv to the new keyset
  - change the file location in the readCsvToSystemKeys call
  - change the tests, if necessary
*/

// eslint-disable-next-line max-statements
async function readCsvToSystemKeys(db, filename) {
  const fstream = fs.createReadStream(filename);
  const rows = await (0, _csv.default)(fstream).read();
  fstream.close();
  const translations = await db.collection('translations').find().toArray();
  const locales = translations.map((tr) => tr.locale);

  const locToSystemContext = {};
  translations.forEach((tr) => {
    locToSystemContext[tr.locale] = tr.contexts.find((c) => c.id === 'System');
  });
  const locToKeys = {};
  Object.entries(locToSystemContext).forEach(([loc, context]) => {
    locToKeys[loc] = new Set(context.values.map((v) => v.key));
  });

  rows.forEach((row) => {
    const { key, optionalValue } = row;

    locales.forEach((loc) => {
      if (!locToKeys[loc].has(key)) {
        const newValue = optionalValue || key;
        locToSystemContext[loc].values.push({ key, value: newValue });
        locToKeys[loc].add(key);
      }
    });
  });

  await Promise.all(
  translations.map((tr) => db.collection('translations').replaceOne({ _id: tr._id }, tr)));

}var _default =

{
  delta: 77,

  reindex: false,

  name: 'add_system_key_translations',

  description: 'Adding missing translations for system keys, through importing from a csv file.',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    await readCsvToSystemKeys(
    db,
    'app/api/migrations/migrations/77-add_system_key_translations/system_keys.csv');

  } };exports.default = _default;