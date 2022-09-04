"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getFixturesFactory = getFixturesFactory;exports.getIdMapper = getIdMapper;
var _testing_db = _interopRequireDefault(require("./testing_db"));


var _userSchema = require("../../shared/types/userSchema");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











function getIdMapper() {
  const map = new Map();

  return function setAndGet(key) {
    if (!map.has(key)) map.set(key, _testing_db.default.id());

    return map.get(key);
  };
}

const thesaurusNestedValues = (
rootValue,
children,
idMapper) =>
{
  const nestedValues = children.map((nestedValue) => ({
    _id: idMapper(nestedValue),
    id: nestedValue,
    label: nestedValue }));

  return { _id: idMapper(rootValue), id: rootValue, label: rootValue, values: nestedValues };
};

function getFixturesFactory() {
  const idMapper = getIdMapper();

  return Object.freeze({
    id: idMapper,

    template: (name, properties = []) => ({
      _id: idMapper(name),
      name,
      properties }),


    entity: (
    id,
    template,
    metadata = {},
    props = { language: 'en' }) =>
    {
      const language = props.language || 'en';
      return _objectSpread(_objectSpread({
        _id: idMapper(`${id}-${language}`),
        sharedId: id,
        title: `${id}` },
      template ? { template: idMapper(template) } : {}), {}, {
        metadata,
        language },
      props);

    },

    inherit(name, content, property, props = {}) {
      return this.relationshipProp(name, content, _objectSpread({
        inherit: { property: idMapper(property).toString() } },
      props));

    },

    file: (
    id,
    entity,
    type,
    filename,
    language = 'en',
    originalname = undefined,
    extractedMetadata = []) => (
    {
      _id: idMapper(`${id}`),
      entity,
      language,
      type,
      filename,
      originalname: originalname || filename,
      extractedMetadata }),


    relationshipProp(name, content, props = {}) {
      return this.property(name, 'relationship', _objectSpread({
        relationType: idMapper('rel1').toString(),
        content: idMapper(content).toString() },
      props));

    },

    property: (
    name,
    type = 'text',
    props = {}) => _objectSpread({

      _id: idMapper(name),
      label: name,
      name,
      type },
    props),


    metadataValue: (value) => ({
      value }),


    thesauri: (name, values) => ({
      name,
      _id: idMapper(name),
      values: values.map((value) =>
      typeof value === 'string' ?
      { _id: idMapper(value), id: value, label: value } :
      { _id: idMapper(value[0]), id: value[0], label: value[1] }) }),



    nestedThesauri: (name, values) => {
      const thesaurusValues = values.reduce(
      (accumulator, item) => {
        const nestedItems =
        typeof item === 'string' ?
        [{ _id: idMapper(item), id: item, label: item }] :
        Object.entries(item).map(([rootValue, children]) =>
        thesaurusNestedValues(rootValue, children, idMapper));

        return [...accumulator, ...nestedItems];
      },
      []);

      return {
        name,
        _id: idMapper(name),
        values: thesaurusValues };

    },

    user: (username, role, email, password) => ({
      username,
      _id: idMapper(username),
      role: role || _userSchema.UserRole.COLLABORATOR,
      email: email || `${username}@provider.tld`,
      password }),


    updatelog: (
    namespace,
    mongoId,
    deleted = false,
    timestamp = Date.now()) => (
    {
      _id: idMapper(`${namespace}-${mongoId}`),
      namespace,
      mongoId: idMapper(mongoId),
      timestamp,
      deleted }) });


}