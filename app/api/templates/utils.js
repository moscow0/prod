"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.denormalizeInheritedProperties = void 0;exports.generateIds = generateIds;exports.generateNames = void 0;exports.getDeletedProperties = getDeletedProperties;exports.getRenamedTitle = getRenamedTitle;exports.getUpdatedNames = getUpdatedNames;exports.updateExtractedMetadataProperties = exports.safeName = exports.newThesauriId = void 0;var _nodeUuid = _interopRequireDefault(require("node-uuid"));
var _mongodb = require("mongodb");
var _lodash = require("lodash");

var _settings = _interopRequireDefault(require("../settings/settings"));
var _files = require("../files");
var _comonProperties = _interopRequireDefault(require("../../shared/comonProperties"));
var _propertyNames = require("../../shared/propertyNames");
var _tsUtils = require("../../shared/tsUtils");



var _templatesModel = _interopRequireDefault(require("./templatesModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const safeName = _propertyNames.safeName;exports.safeName = safeName;

const getInheritedProps = async (templates) => {
  const properties = _comonProperties.default.
  allUniqueProperties(templates).
  filter((p) => {var _p$inherit;return (_p$inherit = p.inherit) === null || _p$inherit === void 0 ? void 0 : _p$inherit.property;});

  return (
  await _templatesModel.default.db.aggregate([
  {
    $match: {
      'properties._id': {
        $in: properties.map((p) => {var _p$inherit2;return new _mongodb.ObjectID((_p$inherit2 = p.inherit) === null || _p$inherit2 === void 0 ? void 0 : _p$inherit2.property);}) } } },



  {
    $project: {
      properties: {
        $filter: {
          input: '$properties',
          as: 'property',
          cond: {
            $or: properties.map((p) => {var _p$inherit3;return {
                $eq: ['$$property._id', new _mongodb.ObjectID((_p$inherit3 = p.inherit) === null || _p$inherit3 === void 0 ? void 0 : _p$inherit3.property)] };}) } } },




      _id: 0 } },


  { $unwind: '$properties' },
  { $replaceRoot: { newRoot: '$properties' } }])).

  reduce((indexed, prop) => _objectSpread(_objectSpread({}, indexed), {}, { [prop._id.toString()]: prop }), {});
};

const denormalizeInheritedProperties = async (template) => {var _template$properties;
  if (template.synced) return template.properties;

  const inheritedProperties = await getInheritedProps([template]);

  return (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.map((prop) => {var _prop$inherit;
    if (!((_prop$inherit = prop.inherit) !== null && _prop$inherit !== void 0 && _prop$inherit.property)) {
      // eslint-disable-next-line no-param-reassign
      delete prop.inherit;
      return prop;
    }

    const { type } = inheritedProperties[prop.inherit.property];
    // eslint-disable-next-line no-param-reassign
    prop.inherit.type = type;
    return prop;
  });
};exports.denormalizeInheritedProperties = denormalizeInheritedProperties;

const generateName = (property, newNameGeneration) => {
  const name = property.label ? safeName(property.label, newNameGeneration) : property.name;
  return property.type === 'geolocation' || property.type === 'nested' ?
  `${name}_${property.type}` :
  name;
};

const generateNames = async (properties) => {
  const { newNameGeneration = false } = await _settings.default.get();
  return properties.map((property) => _objectSpread(_objectSpread({},
  property), {}, {
    name: generateName(property, newNameGeneration) }));

};exports.generateNames = generateNames;

const newThesauriId = () => _nodeUuid.default.v4();exports.newThesauriId = newThesauriId;

function generateIds(properties = []) {
  return properties.map((property) => _objectSpread(_objectSpread({},
  property), {}, {
    id: property.id || newThesauriId() }));

}




const flattenProperties = (properties) =>
properties.reduce((flatProps, p) => {
  if (p.values) {
    return [...flatProps, ...p.values, p];
  }

  return [...flatProps, p];
}, []);

function getUpdatedNames(
{
  prop,
  outKey,
  filterBy },





oldProperties = [],
newProperties = [])
{
  const propertiesWithNewName = {};
  flattenProperties(oldProperties).forEach((property) => {
    const newProperty = flattenProperties(newProperties).find(
    (p) => {var _p$filterBy, _property$filterBy;return ((_p$filterBy = p[filterBy]) === null || _p$filterBy === void 0 ? void 0 : _p$filterBy.toString()) === ((_property$filterBy = property[filterBy]) === null || _property$filterBy === void 0 ? void 0 : _property$filterBy.toString());});

    if (newProperty && newProperty[prop] !== property[prop]) {
      const key = property[outKey];
      const theValue = newProperty[prop];
      if (key && typeof theValue === 'string') {
        propertiesWithNewName[key] = theValue;
      }
    }
  });

  return propertiesWithNewName;
}

const notIncludedIn =
(propertyCollection, filterBy) =>
(property) =>
!propertyCollection.find((p) => {var _p$filterBy2, _property$filterBy2;return ((_p$filterBy2 = p[filterBy]) === null || _p$filterBy2 === void 0 ? void 0 : _p$filterBy2.toString()) === ((_property$filterBy2 = property[filterBy]) === null || _property$filterBy2 === void 0 ? void 0 : _property$filterBy2.toString());});

function getDeletedProperties(
oldProperties = [],
newProperties = [],
filterBy = '_id',
prop = 'name')
{
  return flattenProperties(oldProperties).
  filter(notIncludedIn(flattenProperties(newProperties), filterBy)).
  filter((property) => typeof property[prop] === 'string').
  map((property) => property[prop]);
}

function getRenamedTitle(
oldCommonProperties,
newCommonProperties)
{
  const oldTitle = (0, _tsUtils.ensure)(oldCommonProperties.find((p) => p.name === 'title'));
  const newTitle = (0, _tsUtils.ensure)(newCommonProperties.find((p) => p.name === 'title'));
  return oldTitle.label !== newTitle.label ? [oldTitle.label] : [];
}

const propertyUpdater = async (
modifiedProperties = [],
updateFunction =


() => []) =>

modifiedProperties.reduce(async (previousPromise, property) => {var _property$_id;
  await previousPromise;
  const affectedFiles = await _files.files.get({
    'extractedMetadata.propertyID': (_property$_id = property._id) === null || _property$_id === void 0 ? void 0 : _property$_id.toString() });


  await affectedFiles.reduce(async (prevPromise, file) => {
    await prevPromise;
    await _files.files.save(_objectSpread(_objectSpread({},
    file), {}, {
      extractedMetadata: updateFunction(file.extractedMetadata || [], property) }));

  }, Promise.resolve());
}, Promise.resolve());

const updateExtractedMetadataProperties = async (
oldProperties = [],
newProperties = []) =>
{
  const currentProperties = oldProperties.map((property) => {var _property$_id2;return _objectSpread(_objectSpread({},
    property), {}, {
      _id: (_property$_id2 = property._id) === null || _property$_id2 === void 0 ? void 0 : _property$_id2.toString() });});


  const differentProperties = (0, _lodash.differenceBy)(newProperties, currentProperties, 'name').filter(
  (property) => ['text', 'markdown', 'numeric', 'date'].includes(property.type));


  const renamedProperties = (0, _lodash.intersectionBy)(differentProperties, currentProperties, '_id');

  const removedProperties = (0, _lodash.differenceBy)(currentProperties, newProperties, '_id').filter((property) =>
  ['text', 'markdown', 'numeric', 'date'].includes(property.type));


  if (removedProperties.length > 0) {
    await propertyUpdater(removedProperties, (metadata, property) =>
    metadata.filter((data) => {var _property$_id3;return data.propertyID !== ((_property$_id3 = property._id) === null || _property$_id3 === void 0 ? void 0 : _property$_id3.toString());}));

  }

  if (renamedProperties.length > 0) {
    await propertyUpdater(renamedProperties, (metadata, property) =>
    metadata.map((data) => {var _property$_id4;
      if (data.propertyID === ((_property$_id4 = property._id) === null || _property$_id4 === void 0 ? void 0 : _property$_id4.toString())) {
        return _objectSpread(_objectSpread({}, data), {}, { name: property.name });
      }
      return data;
    }));

  }

  return null;
};exports.updateExtractedMetadataProperties = updateExtractedMetadataProperties;