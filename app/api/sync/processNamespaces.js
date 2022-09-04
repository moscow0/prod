"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ProcessNamespaces = void 0;
var _sift = _interopRequireDefault(require("sift"));
var _odm = require("../odm");





var _tsUtils = require("../../shared/tsUtils");
var _settingsModel = require("../settings/settingsModel");
var _templatesModel = _interopRequireDefault(require("../templates/templatesModel"));

var _entitiesModel = _interopRequireDefault(require("../entities/entitiesModel"));

var _filesModel = require("../files/filesModel");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}



const noDataFound = 'NO_DATA_FOUND';

const namespaces = [
'settings',
'templates',
'entities',
'connections',
'files',
'dictionaries',
'relationtypes',
'translations'];






















const getTemplate = async (template) => {
  const templateData = await _templatesModel.default.getById(template);
  if (!(templateData !== null && templateData !== void 0 && templateData._id)) throw new Error('missing id');
  return templateData;
};

const getEntityTemplate = async (sharedId) => {var _entitiesData$0$templ;
  const entitiesData = await _entitiesModel.default.get({ sharedId });
  return (_entitiesData$0$templ = entitiesData[0].template) === null || _entitiesData$0$templ === void 0 ? void 0 : _entitiesData$0$templ.toString();
};

const extractAllowedMetadata = (
{ metadata },
templateData,
templateConfig) =>

(templateData.properties || []).
filter((p) => templateConfig.properties.includes((p._id || '').toString())).
map((p) => p.name).
reduce(
(prevMetadata, propertyName) => _objectSpread(_objectSpread({},
prevMetadata), {}, {
  [propertyName]: metadata === null || metadata === void 0 ? void 0 : metadata[propertyName] }),

{});


class ProcessNamespaces {












  constructor({
    change,
    templatesConfig,
    relationtypesConfig,
    whitelistedThesauri,
    whitelistedRelationtypes })
  {_defineProperty(this, "change", void 0);_defineProperty(this, "templatesConfig", void 0);_defineProperty(this, "relationtypesConfig", void 0);_defineProperty(this, "templatesConfigKeys", void 0);_defineProperty(this, "whitelistedThesauri", void 0);_defineProperty(this, "whitelistedRelationtypes", void 0);
    this.change = change;
    this.templatesConfig = templatesConfig;
    this.relationtypesConfig = relationtypesConfig;
    this.templatesConfigKeys = Object.keys(templatesConfig);
    this.whitelistedThesauri = whitelistedThesauri;
    this.whitelistedRelationtypes = whitelistedRelationtypes;
  }

  async fetchData() {
    const { namespace, mongoId } = this.change;
    const data = await _odm.models[namespace].getById(mongoId);
    if (data) {
      return data;
    }

    throw new Error(noDataFound);
  }

  assessTranslationApproved(context) {
    const isSystem = context.id.toString() === 'System';
    const isApprovedRelationtype = this.whitelistedRelationtypes.includes(context.id.toString());
    const isApprovedThesauri = this.whitelistedThesauri.includes(context.id.toString());

    return Boolean(isSystem || isApprovedRelationtype || isApprovedThesauri);
  }

  isPossibleRightMetadataRel(
  data,
  templateData,
  hubOtherTemplates)
  {
    return hubOtherTemplates.reduce((_isRightRelationship, template) => {
      let isRightRelationship = _isRightRelationship;
      (template.properties || []).forEach((p) => {
        if (
        p.type === 'relationship' &&
        p._id &&
        this.templatesConfig[template._id.toString()].properties.includes(p._id.toString()))
        {var _templateData$_id;
          const belongsToType =
          (p.relationType || '').toString() === (data.template ? data.template.toString() : null);
          const belongsToSpecificContent =
          (p.content || '').toString() === ((_templateData$_id = templateData._id) === null || _templateData$_id === void 0 ? void 0 : _templateData$_id.toString());
          const belongsToGenericContent = p.content === '';
          if (belongsToType && (belongsToSpecificContent || belongsToGenericContent)) {
            isRightRelationship = true;
          }
        }
      });

      return isRightRelationship;
    }, false);
  }

  async shouldSkipRel(
  data,
  templateData,
  templateHasValidRelationProperties)
  {
    const hubOtherConnections = await _odm.models.connections.get({
      hub: data.hub,
      _id: { $ne: data._id } });


    const hubOtherEntities = await _entitiesModel.default.get(
    { sharedId: { $in: hubOtherConnections.map((h) => h.entity) } },
    'template');


    const hubWhitelistedTemplateIds = hubOtherEntities.
    map((h) => (h.template || '').toString()).
    filter((id) => this.templatesConfigKeys.includes(id));

    const hubOtherTemplates = await _templatesModel.default.get({
      _id: { $in: hubWhitelistedTemplateIds } });


    const belongsToWhitelistedType = this.relationtypesConfig.includes(
    data.template ? data.template.toString() : null);


    const isPossibleLeftMetadataRel = templateHasValidRelationProperties && !data.template;
    const isPossibleRightMetadataRel = this.isPossibleRightMetadataRel(
    data,
    templateData,
    hubOtherTemplates);


    return !belongsToWhitelistedType && !isPossibleLeftMetadataRel && !isPossibleRightMetadataRel;
  }

  async default() {
    const data = await this.fetchData();
    return { data };
  }

  async settings() {
    const { mongoId } = this.change;
    const data = (0, _tsUtils.ensure)(await _settingsModel.settingsModel.getById(mongoId), noDataFound);
    return { data: { _id: data._id, languages: data.languages } };
  }

  async templates() {
    const templateConfig = this.templatesConfig[this.change.mongoId.toString()];

    if (!templateConfig) {
      return { skip: true };
    }

    const { mongoId } = this.change;
    const data = (0, _tsUtils.ensure)(await _templatesModel.default.getById(mongoId), noDataFound);

    if (data.properties) {
      const templateConfigProperties = this.templatesConfig[data._id.toString()].properties;
      data.properties = data.properties.filter((property) => {var _property$_id;return (
          templateConfigProperties.includes(((_property$_id = property._id) === null || _property$_id === void 0 ? void 0 : _property$_id.toString()) || ''));});

    }

    delete data.entityViewPage;

    data.synced = true;

    return { data };
  }

  async entityIsAllowed(entity) {
    if (!(entity.template && this.templatesConfigKeys.includes(entity.template.toString()))) {
      return false;
    }

    const templateConfig = this.templatesConfig[entity.template.toString()];

    if (templateConfig.filter) {
      if (!(0, _sift.default)(JSON.parse(templateConfig.filter))(entity)) {
        return false;
      }
    }

    return true;
  }

  async entities() {
    const data = (0, _tsUtils.ensure)(
    await _entitiesModel.default.getById(this.change.mongoId),
    noDataFound);


    if (!(await this.entityIsAllowed(data))) {
      return { skip: true };
    }

    const templateConfig = this.templatesConfig[data.template.toString()];

    const templateData = await getTemplate(data.template.toString());
    data.metadata = extractAllowedMetadata(data, templateData, templateConfig);

    return { data };
  }

  async connections() {
    const data = await this.fetchData();
    const entityTemplate = await getEntityTemplate(data.entity);

    const belongsToValidEntity = this.templatesConfigKeys.includes(entityTemplate || '');
    const templateData = await _templatesModel.default.getById(entityTemplate);

    if (!belongsToValidEntity || !templateData) {
      return { skip: true };
    }

    const templateConfigProps = this.templatesConfig[templateData._id.toString()].properties;
    const templateHasValidRelationProperties = (templateData.properties || []).reduce(
    (hasValid, p) => {var _p$_id;
      const isValid =
      p.type === 'relationship' && templateConfigProps.includes(((_p$_id = p._id) === null || _p$_id === void 0 ? void 0 : _p$_id.toString()) || '');
      return isValid || hasValid;
    },
    false);


    const shouldSkipRel = await this.shouldSkipRel(
    data,
    templateData,
    templateHasValidRelationProperties);


    return shouldSkipRel ? { skip: true } : { data };
  }

  async files() {
    const { mongoId } = this.change;
    const data = (0, _tsUtils.ensure)(await _filesModel.filesModel.getById(mongoId), noDataFound);

    if (data.type === 'custom') {
      return { data };
    }

    if (data.entity) {
      const [entity] = await _entitiesModel.default.get({ sharedId: data.entity });

      if (!(await this.entityIsAllowed(entity))) {
        return { skip: true };
      }
    }

    return { data };
  }

  async dictionaries() {
    if (!this.whitelistedThesauri.includes(this.change.mongoId.toString())) {
      return { skip: true };
    }

    return this.default();
  }

  async relationtypes() {
    if (!this.whitelistedRelationtypes.includes(this.change.mongoId.toString())) {
      return { skip: true };
    }

    return this.default();
  }

  async translations() {
    const data = await this.fetchData();
    const templatesData = await _templatesModel.default.get({
      _id: { $in: this.templatesConfigKeys } });


    data.contexts = data.contexts.
    map((context) => {
      if (this.assessTranslationApproved(context)) {
        return context;
      }

      if (this.templatesConfigKeys.includes(context.id.toString())) {var _contextTemplate$comm, _contextTemplate$comm2;
        const contextTemplate = (0, _tsUtils.ensure)(
        templatesData.find((t) => t._id.toString() === context.id.toString()));

        const templateConfigProperties = this.templatesConfig[context.id.toString()].properties;
        const templateTitle = (_contextTemplate$comm = contextTemplate.commonProperties) === null || _contextTemplate$comm === void 0 ? void 0 : (_contextTemplate$comm2 = _contextTemplate$comm.find(
        (p) => p.name === 'title')) === null || _contextTemplate$comm2 === void 0 ? void 0 : _contextTemplate$comm2.
        label;

        const approvedKeys = [contextTemplate.name, templateTitle].
        concat(
        (contextTemplate.properties || []).
        filter((p) => {var _p$_id2;return templateConfigProperties.includes(((_p$_id2 = p._id) === null || _p$_id2 === void 0 ? void 0 : _p$_id2.toString()) || '');}).
        map((p) => p.label)).

        filter((k) => Boolean(k));

        context.values = (context.values || []).filter((v) => approvedKeys.includes(v.key));
        return context;
      }

      return null;
    }).
    filter((c) => Boolean(c));

    return { data };
  }

  async process() {
    const { namespace } = this.change;
    let method = namespace;
    if (!namespaces.includes(namespace)) {
      method = 'default';
    }

    try {
      return await this[method]();
    } catch (err) {
      if (err.message === noDataFound) {
        return { skip: true };
      }
      throw err;
    }
  }}exports.ProcessNamespaces = ProcessNamespaces;