"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;const _excluded = ["inherit"];function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;} /* eslint-disable no-await-in-loop */var _default =

{
  delta: 46,

  name: 'inherit-conflict',

  description: 'Disable inherit for conflicting inherited types',

  async up(db) {
    const cursor = await db.collection('templates').find({});

    while (await cursor.hasNext()) {
      const template = await cursor.next();
      const properties = await Promise.all(
      template.properties.map(async (prop) => {
        if (prop.inherit) {
          const matchingTemplates = await db.
          collection('templates').
          find({ 'properties.name': prop.name }).
          toArray();

          const sameProps = matchingTemplates.
          reduce((props, tmpl) => props.concat(tmpl.properties), []).
          filter((p) => p.name === prop.name);

          const sameInheritConfigured = sameProps.every(
          (p) => {var _p$inherit;return ((_p$inherit = p.inherit) === null || _p$inherit === void 0 ? void 0 : _p$inherit.type) === prop.inherit.type;});


          if (sameInheritConfigured) {
            return prop;
          }

          const { inherit } = prop,newProp = _objectWithoutProperties(prop, _excluded);
          return newProp;
        }

        return prop;
      }));


      await db.collection('templates').updateOne({ _id: template._id }, { $set: { properties } });
    }
    process.stdout.write(`${this.name}...\r\n`);
  } };exports.default = _default;