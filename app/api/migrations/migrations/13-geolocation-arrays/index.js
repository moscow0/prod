"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} /* eslint-disable no-await-in-loop */var _default =
{
  delta: 13,

  name: 'geolocation-arrays',

  description: 'Change the current single-entry geolocation to arrays',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const templates = await db.collection('templates').find().toArray();

    const templatesByKey = templates.reduce((memo, t) => _objectSpread(_objectSpread({}, memo), {}, { [t._id.toString()]: t }), {});

    const templatesWithGeolocation = templates.
    filter((t) => {
      let hasGeolocation = false;
      t.properties.forEach((p) => {
        if (p.type === 'geolocation') {
          hasGeolocation = true;
        }
      });

      return hasGeolocation;
    }).
    map((t) => t._id);

    let index = 1;
    const cursor = db.collection('entities').find({ template: { $in: templatesWithGeolocation } });

    while (await cursor.hasNext()) {
      const entity = await cursor.next();

      if (entity.metadata) {
        const newMetadata = Object.keys(entity.metadata).reduce((metadata, property) => {
          const propertyData = templatesByKey[entity.template.toString()].properties.find(
          (p) => p.name === property);

          if (
          propertyData &&
          propertyData.type === 'geolocation' &&
          !Array.isArray(entity.metadata[property]))
          {
            return _objectSpread(_objectSpread({}, metadata), {}, { [property]: [entity.metadata[property]] });
          }
          return _objectSpread(_objectSpread({}, metadata), {}, { [property]: entity.metadata[property] });
        }, {});

        await db.
        collection('entities').
        updateOne({ _id: entity._id }, { $set: { metadata: newMetadata } });
      }

      process.stdout.write(`processed -> ${index}\r`);
      index += 1;
    }

    process.stdout.write('\r\n');
  } };exports.default = _default;