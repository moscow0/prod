"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getTableColumns = getTableColumns;

var _tsUtils = require("../../../shared/tsUtils");function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





function columnsFromTemplates(templates) {
  return templates.reduce((properties, template) => {
    const propsToAdd = [];
    (template.properties || []).forEach((property) => {
      if (
      !['image', 'preview', 'media', 'nested'].includes(property.type) &&
      !properties.find((columnProperty) => property.name === columnProperty.name))
      {
        propsToAdd.push(_objectSpread(_objectSpread({}, property), {}, { translationContext: (0, _tsUtils.ensure)(template._id) }));
      }
    });
    return properties.concat(propsToAdd);
  }, []);
}

const getTemplatesToProcess = (
documents,
templates,
useTemplates) =>
{
  const queriedTemplates = documents.aggregations.all._types.buckets;
  if (useTemplates.length || queriedTemplates) {
    const templateIds = useTemplates.length ?
    useTemplates :
    queriedTemplates.
    filter((template) => template.filtered.doc_count > 0).
    map((template) => template.key);

    return templates.filter((t) =>
    templateIds.find((id) => t._id === id));

  }
  return [];
};

function getTableColumns(
documents,
templates,
useTemplates = [])
{
  let columns = [];
  const templatesToProcess = getTemplatesToProcess(
  documents,
  templates,
  useTemplates);

  if (templatesToProcess.length > 0) {
    const commonColumns = [
    ...(templatesToProcess[0].commonProperties || []),
    {
      label: 'Template',
      name: 'templateName',
      type: 'text',
      isCommonProperty: true }];



    columns = commonColumns.
    map((c) => _objectSpread(_objectSpread({}, c), {}, { showInCard: true })).
    concat(columnsFromTemplates(templatesToProcess));
  }
  return columns;
}