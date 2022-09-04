"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.emitSchemaTypes = void 0;Object.defineProperty(exports, "getCompatibleTypes", { enumerable: true, get: function () {return _propertyTypes.getCompatibleTypes;} });exports.validateTemplate = exports.templateSchema = void 0;var _ajv = _interopRequireDefault(require("ajv"));


var _templatesModel = _interopRequireDefault(require("../../api/templates/templatesModel"));
var _templates = _interopRequireDefault(require("../../api/templates"));
var _pages = _interopRequireDefault(require("../../api/pages"));
var _thesauri = require("../../api/thesauri/thesauri");

var _tsUtils = require("../tsUtils");
var _commonSchemas = require("./commonSchemas");
var _propertyTypes = require("../propertyTypes");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}




const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;

const ajv = new _ajv.default({ allErrors: true });
ajv.addVocabulary(['tsType']);

ajv.addKeyword({
  keyword: 'uniqueName',
  async: true,
  errors: false,
  type: 'object',
  async validate(schema, data) {
    if (!schema) {
      return true;
    }
    const regex = new RegExp(`^${data.name}$`, 'i');
    const [similarTemplate] = await _templatesModel.default.get({ _id: { $ne: data._id }, name: regex });
    if (similarTemplate) {
      return false;
    }
    return true;
  } });


ajv.addKeyword({
  keyword: 'requireTitleProperty',
  errors: false,
  type: 'array',
  validate(_schema, properties) {
    return properties.some((prop) => prop.name === 'title');
  } });


ajv.addKeyword({
  keyword: 'uniquePropertyFields',
  errors: false,
  type: 'object',
  validate(fields, data) {
    const uniqueValues = fields.reduce(
    (memo, field) => _objectSpread(_objectSpread({}, memo), {}, { [field]: new Set() }),
    {});


    const allProperties = (data.properties || []).concat(data.commonProperties || []);

    const errors = [];
    allProperties.forEach((property) => {
      fields.forEach((field) => {var _property$field;
        const value = property[field] && (((_property$field = property[field]) === null || _property$field === void 0 ? void 0 : _property$field.toString()) || '').toLowerCase().trim();
        if (value && uniqueValues[field].has(value)) {
          errors.push({
            keyword: 'uniquePropertyFields',
            schemaPath: '',
            params: { keyword: 'uniquePropertyFields', fields },
            message: `duplicated property value { ${field}: "${value}" }`,
            instancePath: `.properties.${field}` });

        }
        uniqueValues[field].add(value || '');
      });
    });

    if (errors.length) {
      throw new _ajv.default.ValidationError(errors);
    }

    return true;
  } });


ajv.addKeyword({
  keyword: 'requireOrInvalidContentForSelectFields',
  async: true,
  errors: false,
  type: 'object',
  async validate(schema, data) {
    if (!schema) {
      return true;
    }
    if (['multiselect', 'select'].includes(data.type)) {
      if (!data.content || !data.content.length) {
        return false;
      }

      const found = await _thesauri.thesauri.getById(data.content);
      return !!found;
    }

    return true;
  } });


ajv.addKeyword({
  keyword: 'requireRelationTypeForRelationship',
  errors: false,
  type: 'object',
  validate(schema, data) {
    if (!schema) {
      return true;
    }
    if (data.type === 'relationship') {
      return !!(data.relationType && data.relationType.length);
    }
    return true;
  } });


ajv.addKeyword({
  keyword: 'cantDeleteInheritedProperties',
  async: true,
  errors: true,
  type: 'object',
  async validate(_schema, template) {
    const [currentTemplate] = await _templatesModel.default.get({ _id: template._id });
    if (!currentTemplate) {
      return true;
    }

    const toRemoveProperties = (currentTemplate.properties || []).filter(
    (prop) =>
    !(template.properties || []).find(
    (p) => p._id && p._id.toString() === (prop._id || '').toString()));



    const errors = [];
    await Promise.all(
    toRemoveProperties.map(async (property) => {
      const canDelete = await _templates.default.canDeleteProperty(
      (0, _tsUtils.ensure)(template._id),
      property._id);


      if (!canDelete) {
        errors.push({
          keyword: 'noDeleteInheritedProperty',
          schemaPath: '',
          params: { keyword: 'noDeleteInheritedProperty' },
          message: "Can't delete properties being inherited",
          instancePath: `.properties.${property.name}` });

      }
    }));


    if (errors.length) {
      throw new _ajv.default.ValidationError(errors);
    }

    return true;
  } });


async function getPropertiesWithSameNameAndDifferentKind(template) {
  const condition = (0, _tsUtils.ensure)(template.properties).map((property) => {var _property$inherit;return {
      $and: [
      {
        name: property.name,
        $or: [
        { content: { $ne: property.content } },
        { type: { $ne: property.type } },
        { relationtype: { $ne: property.relationType } },
        { 'inherit.type': { $ne: (_property$inherit = property.inherit) === null || _property$inherit === void 0 ? void 0 : _property$inherit.type } }] }] };});




  const query = {
    $and: [{ _id: { $ne: template._id } }, { properties: { $elemMatch: { $or: [...condition] } } }] };

  return _templatesModel.default.get(query);
}

function filterInconsistentProperties(template, allProperties) {
  return (0, _tsUtils.ensure)(template.properties).reduce(
  (propertyNames, property) => {
    const matches = allProperties.find(
    (p) => {var _p$inherit, _property$inherit2;return (
        p.name === property.name && (
        p.content !== property.content ||
        !(0, _propertyTypes.getCompatibleTypes)(property.type).includes(p.type) ||
        p.relationType !== property.relationType ||
        ((_p$inherit = p.inherit) === null || _p$inherit === void 0 ? void 0 : _p$inherit.type) !== ((_property$inherit2 = property.inherit) === null || _property$inherit2 === void 0 ? void 0 : _property$inherit2.type)));});


    if (matches && !propertyNames.includes((0, _tsUtils.ensure)(property.name))) {
      return propertyNames.concat([(0, _tsUtils.ensure)(property.name)]);
    }

    return propertyNames;
  },
  []);

}

ajv.addKeyword({
  keyword: 'cantReuseNameWithDifferentType',
  async: true,
  errors: true,
  type: 'object',
  async validate(_schema, template) {
    if (!template.properties || template.properties.length === 0) {
      return true;
    }
    const matchedTemplates = await getPropertiesWithSameNameAndDifferentKind(template);
    if (matchedTemplates.length > 0) {
      const allProperties = matchedTemplates.reduce(
      (memo, t) => memo.concat(t.properties || []),
      []);


      const errorProperties = filterInconsistentProperties(template, allProperties);

      throw new _ajv.default.ValidationError(
      errorProperties.map((property) => ({
        keyword: 'cantReuseNameWithDifferentType',
        schemaPath: '',
        params: { keyword: 'cantReuseNameWithDifferentType' },
        message:
        'Entered label is already in use on another property with a different type, thesaurus or inherit',
        instancePath: `.properties.${property}` })));


    }

    return true;
  } });


ajv.addKeyword({
  keyword: 'entityViewPageExistsAndIsEnabled',
  async: true,
  errors: true,
  type: 'object',
  async validate(fields, template) {
    if (template.entityViewPage) {
      const page = await _pages.default.get({
        sharedId: template.entityViewPage });

      if (page.length === 0) {
        throw new _ajv.default.ValidationError([
        {
          keyword: 'entityViewPageExists',
          schemaPath: '',
          params: { keyword: 'entityViewPageExists', fields },
          message: 'The selected page does not exist',
          instancePath: '.templates' }]);


      }
      if (!page[0].entityView) {
        throw new _ajv.default.ValidationError([
        {
          keyword: 'entityViewPageIsEnabled',
          schemaPath: '',
          params: { keyword: 'entityViewPageIsEnabled', fields },
          message: 'The selected page is not enabled for entity view',
          instancePath: '.templates' }]);


      }
      return true;
    }
    return true;
  } });


const templateSchema = {
  $schema: 'http://json-schema.org/schema#',
  $async: true,
  type: 'object',
  uniqueName: true,
  cantDeleteInheritedProperties: true,
  cantReuseNameWithDifferentType: true,
  entityViewPageExistsAndIsEnabled: true,
  required: ['name'],
  uniquePropertyFields: ['id', 'name'],
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema, propertySchema: _commonSchemas.propertySchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    name: { type: 'string', minLength: 1 },
    color: { type: 'string', default: '' },
    default: { type: 'boolean', default: false },
    entityViewPage: { type: 'string', default: '' },
    synced: { type: 'boolean' },
    commonProperties: {
      type: 'array',
      requireTitleProperty: true,
      minItems: 1,
      items: _commonSchemas.propertySchema },

    properties: {
      type: 'array',
      items: _commonSchemas.propertySchema } } };exports.templateSchema = templateSchema;




const validateTemplate = (0, _tsUtils.wrapValidator)(ajv.compile(templateSchema));exports.validateTemplate = validateTemplate;