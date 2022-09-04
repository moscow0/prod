"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /*
This migration is meant to be repeatable.
After copy pasting:
  - change the contents of system_keys.csv to the new keyset
  - change the file location in the readCsvToSystemKeys call
  - change the tests, if necessary
*/

async function insertSystemKeys(db, newKeys) {
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

  newKeys.forEach((row) => {
    const { key, value: optionalValue } = row;

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
  delta: 65,

  reindex: false,

  name: 'add_system_key_translations',

  description: 'Adding missing translations for system keys.',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);
    const systemKeys = [
    {
      key: 'Google Maps' },

    {
      key: 'MapBox' },

    {
      key: 'Map api key tooltip',
      value: 'An API key is required to use Mapbox or Google Maps.' },

    {
      key: 'Streets' },

    {
      key: 'Hybrid' }];


    await insertSystemKeys(db, systemKeys);
  } };exports.default = _default;