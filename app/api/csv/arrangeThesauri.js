"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.arrangeThesauri = exports.ArrangeThesauriError = void 0;

var _thesauri = _interopRequireDefault(require("../thesauri"));




var _thesauri2 = require("../thesauri/thesauri");
var _csv = _interopRequireDefault(require("./csv"));
var _entityRow = require("./entityRow");
var _multiselect = require("./typeParsers/multiselect");
var _select = require("./typeParsers/select");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const filterJSObject = (input, keys) => {
  const result = {};
  keys.forEach((k) => {
    if (input.hasOwnProperty(k)) {
      result[k] = input[k];
    }
  });
  return result;
};

class ArrangeThesauriError extends Error {






  constructor(source, row, index) {
    super(source.message);_defineProperty(this, "source", void 0);_defineProperty(this, "row", void 0);_defineProperty(this, "index", void 0);
    this.source = source;
    this.row = row;
    this.index = index;
  }}exports.ArrangeThesauriError = ArrangeThesauriError;


const createNameToIdMap = (
thesauriRelatedProperties,
languages) =>
{
  const nameToThesauriId = {};

  thesauriRelatedProperties === null || thesauriRelatedProperties === void 0 ? void 0 : thesauriRelatedProperties.forEach((p) => {
    if (p.content && p.type) {
      const thesarusID = p.content.toString();
      nameToThesauriId[p.name] = thesarusID;
      languages === null || languages === void 0 ? void 0 : languages.forEach((suffix) => {
        nameToThesauriId[`${p.name}__${suffix}`] = thesarusID;
      });
    }
  });

  return nameToThesauriId;
};







const setupIdValueMaps = (allRelatedThesauri) => {
  const thesauriIdToExistingValues = new Map();
  const thesauriIdToNewValues = new Map();
  const thesauriIdToNormalizedNewValues = new Map();

  allRelatedThesauri.forEach((t) => {
    const id = t._id.toString();
    const a = (0, _thesauri2.flatThesaurusValues)(t, true);
    const thesaurusValues = a.map((v) => (0, _select.normalizeThesaurusLabel)(v.label));
    thesauriIdToExistingValues.set(id, new Set(thesaurusValues));
    thesauriIdToNewValues.set(id, new Set());
    thesauriIdToNormalizedNewValues.set(id, new Set());
  });

  return { thesauriIdToExistingValues, thesauriIdToNewValues, thesauriIdToNormalizedNewValues };
};

const syncSaveThesauri = async (
allRelatedThesauri,
thesauriIdToNewValues) =>
{
  const thesauriWithNewValues = allRelatedThesauri.filter(
  (t) => (thesauriIdToNewValues.get(t._id.toString()) || new Set()).size > 0);

  for (let i = 0; i < thesauriWithNewValues.length; i += 1) {
    const thesaurus = thesauriWithNewValues[i];
    const newValues = Array.from(thesauriIdToNewValues.get(thesaurus._id.toString()) || []).map(
    (tval) => ({ label: tval }));

    const thesaurusValues = thesaurus.values || [];
    // eslint-disable-next-line no-await-in-loop
    await _thesauri.default.save(_objectSpread(_objectSpread({},
    thesaurus), {}, {
      values: thesaurusValues.concat(newValues) }));

  }
};

const arrangeThesauri = async (
file,
template,
newNameGeneration,
languages,
stopOnError = true) =>
{var _template$properties;
  const thesauriRelatedProperties = (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.filter((p) =>
  ['select', 'multiselect'].includes(p.type));


  const nameToThesauriId = createNameToIdMap(thesauriRelatedProperties, languages);

  const allRelatedThesauri = await _thesauri.default.get({
    $in: Array.from(
    new Set(thesauriRelatedProperties === null || thesauriRelatedProperties === void 0 ? void 0 : thesauriRelatedProperties.map((p) => {var _p$content;return (_p$content = p.content) === null || _p$content === void 0 ? void 0 : _p$content.toString();}).filter((t) => t))) });



  const thesauriValueData = setupIdValueMaps(allRelatedThesauri);

  await (0, _csv.default)(await file.readStream(), stopOnError).
  onRow(async (row) => {
    const safeNamedRow = (0, _entityRow.toSafeName)(row, newNameGeneration);
    Object.entries(filterJSObject(nameToThesauriId, Object.keys(safeNamedRow))).forEach(
    ([name, id]) => {
      const labels = (0, _multiselect.splitMultiselectLabels)(safeNamedRow[name]);
      Object.entries(labels).forEach(([normalizedLabel, originalLabel]) => {var _thesauriValueData$th, _thesauriValueData$th2;
        if (
        !((_thesauriValueData$th = thesauriValueData.thesauriIdToExistingValues.get(id)) !== null && _thesauriValueData$th !== void 0 && _thesauriValueData$th.has(normalizedLabel)) &&
        !((_thesauriValueData$th2 = thesauriValueData.thesauriIdToNormalizedNewValues.get(id)) !== null && _thesauriValueData$th2 !== void 0 && _thesauriValueData$th2.has(normalizedLabel)))
        {var _thesauriValueData$th3, _thesauriValueData$th4;
          (_thesauriValueData$th3 = thesauriValueData.thesauriIdToNewValues.get(id)) === null || _thesauriValueData$th3 === void 0 ? void 0 : _thesauriValueData$th3.add(originalLabel);
          (_thesauriValueData$th4 = thesauriValueData.thesauriIdToNormalizedNewValues.get(id)) === null || _thesauriValueData$th4 === void 0 ? void 0 : _thesauriValueData$th4.add(normalizedLabel);
        }
      });
    });

  }).
  onError(async (e, row, index) => {
    throw new ArrangeThesauriError(e, row, index);
  }).
  read();

  await syncSaveThesauri(allRelatedThesauri, thesauriValueData.thesauriIdToNewValues);
};exports.arrangeThesauri = arrangeThesauri;