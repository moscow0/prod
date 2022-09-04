"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UnwrapMetadataObject = void 0;exports.changeTemplate = changeTemplate;exports.clearMetadataSelections = void 0;exports.getSuggestions = getSuggestions;exports.loadFetchedInReduxForm = loadFetchedInReduxForm;exports.loadInReduxForm = loadInReduxForm;exports.loadTemplate = loadTemplate;exports.multipleUpdate = multipleUpdate;exports.removeIcon = removeIcon;exports.resetMetadata = void 0;exports.resetReduxForm = resetReduxForm;var _reactReduxForm = require("react-redux-form");

var _advancedSort = require("../../utils/advancedSort");
var _Entities = require("../../Entities");
var _Notifications = require("../../Notifications");
var _libraryActions = require("../../Library/actions/libraryActions");
var _RequestParams = require("../../utils/RequestParams");
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));
var _BasicReducer = require("../../BasicReducer");
var _IDGenerator = require("../../../shared/IDGenerator");
var _defaultTemplate = _interopRequireDefault(require("../helpers/defaultTemplate"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function resetReduxForm(form) {
  return _reactReduxForm.actions.reset(form);
}

const propertyExists = (property, previousTemplate) =>
previousTemplate &&
Boolean(
previousTemplate.properties.find(
(p) => p.name === property.name && p.type === property.type && p.content === property.content));



const defaultValueByType = (type, options) => {
  switch (type) {
    case 'daterange':
      return { from: null, to: null };
    case 'generatedid':
      return !options.resetExisting ? (0, _IDGenerator.generateID)(3, 4, 4) : undefined;
    case 'multiselect':
    case 'relationship':
    case 'nested':
    case 'multidate':
    case 'multidaterange':
      return [];
    default:
      if (!['date', 'geolocation', 'link'].includes(type)) {
        return '';
      }
      return undefined;}

};

const resetMetadata = (metadata, template, options, previousTemplate) => {
  const resetedMetadata = {};
  template.properties.forEach((property) => {
    const resetValue =
    options.resetExisting ||
    !propertyExists(property, previousTemplate) ||
    !metadata[property.name];

    const { type, name } = property;
    if (!resetValue) {
      resetedMetadata[property.name] = metadata[property.name];
    }
    if (resetValue) {
      const defaultValue = defaultValueByType(type, options);
      if (defaultValue !== undefined) resetedMetadata[name] = defaultValue;
    }
  });
  return resetedMetadata;
};exports.resetMetadata = resetMetadata;

const getPropertyValue = (property, metadataProperty) => {
  switch (property.type) {
    case 'multiselect':
    case 'multidaterange':
    case 'nested':
    case 'relationship':
    case 'multidate':
    case 'geolocation':
      return metadataProperty.map((v) => v.value);
    case 'generatedid':
      return typeof metadataProperty === 'string' ? metadataProperty : metadataProperty[0].value;
    default:
      return metadataProperty[0].value;}

};

const UnwrapMetadataObject = (MetadataObject, Template) =>
Object.keys(MetadataObject).reduce((UnwrapedMO, key) => {
  if (!MetadataObject[key].length) {
    return UnwrapedMO;
  }
  const property = Template.properties.find((p) => p.name === key);
  const propertyValue = getPropertyValue(property, MetadataObject[key]);
  return _objectSpread(_objectSpread({}, UnwrapedMO), {}, { [key]: propertyValue });
}, {});exports.UnwrapMetadataObject = UnwrapMetadataObject;

function checkGeneratedTitle(entity, template) {
  const generatedTitle =
  !entity.title &&
  template.commonProperties.find((property) => property.name === 'title' && property.generatedId);
  if (generatedTitle) {
    return (0, _IDGenerator.generateID)(3, 4, 4);
  }
  return entity.title;
}

function loadFetchedInReduxForm(form, entity, templates) {
  const sortedTemplates = (0, _advancedSort.advancedSort)(templates, { property: 'name' });
  const defaultTemplate = sortedTemplates.find((t) => t.default);
  const templateId = entity.template || defaultTemplate._id;
  const template = sortedTemplates.find((t) => t._id === templateId) || _defaultTemplate.default;
  const title = checkGeneratedTitle(entity, template);

  const entitySelectedOptions = {};
  template.properties.forEach((property) => {
    if (property.type === 'relationship') {
      entitySelectedOptions[property.name] = entity.metadata ? entity.metadata[property.name] : [];
    }
  });

  const metadata = UnwrapMetadataObject(
  resetMetadata(_objectSpread({}, entity.metadata), template, { resetExisting: false }, template),
  template);


  // suggestedMetadata remains in metadata-object form (all components consuming it are new).
  return [
  _reactReduxForm.actions.reset(form),
  _reactReduxForm.actions.load(form, _objectSpread(_objectSpread({}, entity), {}, { metadata, template: templateId, title })),
  _reactReduxForm.actions.setPristine(form),
  _BasicReducer.actions.set('entityThesauris', entitySelectedOptions)];

}

function loadInReduxForm(form, _entity, templates) {
  return (dispatch) => {
    (_entity.sharedId ?
    _Entities.api.get(new _RequestParams.RequestParams({ sharedId: _entity.sharedId })) :
    Promise.resolve([_entity])).
    then(([response]) => {
      const { attachments } = response;
      const sortedAttachments = attachments ?
      (0, _advancedSort.advancedSort)(attachments, { property: 'originalname' }) :
      attachments;
      const entity = _objectSpread(_objectSpread({}, response), {}, { attachments: sortedAttachments });
      loadFetchedInReduxForm(form, entity, templates).forEach((action) => dispatch(action));
    });
  };
}

function changeTemplate(form, templateId) {
  return (dispatch, getState) => {
    const entity = _objectSpread({}, (0, _reactReduxForm.getModel)(getState(), form));
    const { templates } = getState();
    const template = templates.find((t) => t.get('_id') === templateId);
    const previousTemplate = templates.find((t) => t.get('_id') === entity.template);

    const templateJS = template.toJS();
    const title = checkGeneratedTitle(entity, templateJS);

    entity.metadata = resetMetadata(
    entity.metadata,
    templateJS,
    { resetExisting: false },
    previousTemplate.toJS());

    entity.template = template.get('_id');

    dispatch(_reactReduxForm.actions.reset(form));
    setTimeout(() => {
      dispatch(_reactReduxForm.actions.load(form, _objectSpread(_objectSpread({}, entity), {}, { title })));
    });
  };
}

function loadTemplate(form, template) {
  return (dispatch) => {
    const entity = { template: template._id, metadata: {} };
    entity.metadata = resetMetadata(entity.metadata, template, { resetExisting: true });
    dispatch(_reactReduxForm.actions.load(form, entity));
    dispatch(_reactReduxForm.actions.setPristine(form));
  };
}

function removeIcon(model) {
  return _reactReduxForm.actions.change(model, { _id: null, type: 'Empty' });
}

function multipleUpdate(entities, values) {
  return async (dispatch) => {
    const ids = entities.map((e) => e.get('sharedId')).toJS();
    const updatedEntities = await _Entities.api.multipleUpdate(new _RequestParams.RequestParams({ ids, values }));
    dispatch(_Notifications.notificationActions.notify('Update success', 'success'));
    if (values.published !== undefined) {
      await dispatch((0, _libraryActions.unselectAllDocuments)());
      dispatch((0, _libraryActions.removeDocuments)(updatedEntities));
    }
    return updatedEntities;
  };
}

async function getSuggestions(templates, searchTerm = '') {
  const request = new _RequestParams.RequestParams({ searchTerm, templates });
  return _SearchAPI.default.getSuggestions(request);
}

const clearMetadataSelections = () =>
_BasicReducer.actions.unset('documentViewer.metadataExtraction', ['selections']);exports.clearMetadataSelections = clearMetadataSelections;