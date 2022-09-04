"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _logger = _interopRequireDefault(require("../../logger"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const migrationName = 'sanitize-string-geolocations';

function sanitizeGeolocation(property) {
  if (!Array.isArray(property) || !property.length) {
    return property;
  }

  const value = _objectSpread({}, property[0].value);

  const lat = Number(value.lat).valueOf();
  const lon = Number(value.lon).valueOf();

  if (Number.isNaN(lat) || Number.isNaN(lon)) {
    throw new Error('Value is NaN');
  }

  return [
  {
    value: _objectSpread(_objectSpread({}, value), {}, { lat, lon }) }];


}

function sanitizeMetadataCallback(entity, templates) {
  // eslint-disable-next-line max-statements
  return (memo, propertyName) => {
    const property = templates[entity.template.toString()].properties.find(
    (p) => p.name === propertyName);


    if (property && property.type === 'geolocation') {
      let sanitized = entity.metadata[propertyName];

      try {
        sanitized = sanitizeGeolocation(entity.metadata[propertyName]);
      } catch (e) {
        if (e.message === 'Value is NaN') {
          sanitized = [];
          _logger.default.logFieldParseError(
          {
            template: entity.template,
            sharedId: entity.sharedId,
            title: entity.title,
            propertyName,
            value: entity.metadata[propertyName] },

          migrationName);

        }
      }

      return _objectSpread(_objectSpread({}, memo), {}, { [propertyName]: sanitized });
    }

    return _objectSpread(_objectSpread({}, memo), {}, { [propertyName]: entity.metadata[propertyName] });
  };
}var _default =

{
  delta: 25,

  name: migrationName,

  description: 'change string geolocations to int',

  async up(db) {
    process.stdout.write(`${this.name}...\r\n`);

    const templates = await db.collection('templates').find().toArray();
    const templatesByKey = templates.reduce((memo, t) => _objectSpread(_objectSpread({}, memo), {}, { [t._id.toString()]: t }), {});

    const cursor = db.collection('entities').find();

    while (await cursor.hasNext()) {
      const entity = await cursor.next();

      if (entity.metadata) {
        const newMetadata = Object.keys(entity.metadata).reduce(
        sanitizeMetadataCallback(entity, templatesByKey),
        {});


        await db.
        collection('entities').
        updateOne({ _id: entity._id }, { $set: { metadata: newMetadata } });
      }
    }

    process.stdout.write('\r\n');
  } };exports.default = _default;