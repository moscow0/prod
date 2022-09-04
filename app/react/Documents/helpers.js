"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;

var _moment = _interopRequireDefault(require("moment"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var _default =

{
  performantDocToJSWithoutRelations(doc) {
    return doc.delete('relations').toJS();
  },

  prepareMetadata(doc, templates, thesauris) {
    const template = templates.find((t) => t._id === doc.template);

    if (!template || !thesauris.length) {
      return _objectSpread(_objectSpread({}, doc), {}, { metadata: [], documentType: '' });
    }

    const metadata = template.properties.map((property) => {
      let value = null;
      if (doc.metadata[property.name] && doc.metadata[property.name][0]) {
        [{ value }] = doc.metadata[property.name];
      }
      if (property.type === 'select' && value) {
        const thesauri = thesauris.
        find((t) => t._id === property.content).
        values.find((v) => v.id.toString() === value.toString());

        value = '';
        if (thesauri) {
          value = thesauri.label;
        }
      }

      if (property.type === 'date' && value) {
        value = (0, _moment.default)(value, 'X').format('MMM DD, YYYY');
      }

      return { label: property.label, value };
    });

    return _objectSpread(_objectSpread({}, doc), {}, { metadata, documentType: template.name });
  } };exports.default = _default;