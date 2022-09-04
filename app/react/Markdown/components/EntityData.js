"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.EntityData = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");


var _formater = _interopRequireDefault(require("../../Metadata/helpers/formater"));
var _propertyNames = require("../../../shared/propertyNames");
var _Metadata = require("../../Metadata/components/Metadata");
var _I18N = require("../../I18N");

var _tsUtils = require("../../../shared/tsUtils");
var _utils = require("../utils");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}












const mapStateToProps = ({ entityView, templates, thesauris, settings }) => ({
  entity: entityView.entity,
  templates,
  thesauri: thesauris,
  newNameGeneration: settings.collection.get('newNameGeneration') || false });


const connector = (0, _reactRedux.connect)(mapStateToProps);




const rootProperties = ['title', 'creationDate', 'editDate'];

const getPropertyData = ({ formattedEntity, propertyName, newNameGeneration }) =>
formattedEntity.metadata.find((p) => p.name === (0, _propertyNames.safeName)(propertyName, newNameGeneration));

const extractRootProperty = ({ formattedEntity, propertyName }) =>
formattedEntity[propertyName];

const extractMetadataProperty = ({ formattedEntity, propertyName, newNameGeneration }) => {
  const propertyData = formattedEntity.metadata.find(
  (p) => p.name === (0, _propertyNames.safeName)(propertyName, newNameGeneration));

  return (0, _Metadata.showByType)(propertyData, false);
};

const extractRootLabel = ({ propertyName, template: _template }) => {var _template$get;
  const template = (0, _tsUtils.ensure)(_template);
  const term =
  ((_template$get = template.
  get('commonProperties')) === null || _template$get === void 0 ? void 0 : _template$get.
  find((p) => (p === null || p === void 0 ? void 0 : p.get('name')) === propertyName).
  get('label')) || '';

  const context = propertyName === 'title' ? template.get('_id') : 'System';
  return /*#__PURE__*/_jsx(_I18N.Translate, { context: context }, void 0, term);
};

const extractMetadataLabel = ({ formattedEntity, propertyName, newNameGeneration }) => {
  const propertyData = getPropertyData({ formattedEntity, propertyName, newNameGeneration });
  return /*#__PURE__*/_jsx(_I18N.Translate, { context: propertyData.translateContext }, void 0, propertyData.label);
};

const getProperty = (
propValueOf,
propLabelOf) =>
{
  if (propValueOf && propLabelOf) {
    throw new Error('Can\'t provide both "value-of" and "label-of".');
  }

  const property = propValueOf || propLabelOf;

  if (!property) {
    throw new Error('"value-of" or "label-of" must be provided.');
  }

  return property;
};

const getMethod = (propValueOf, propertyName) => {
  const isRootProperty = rootProperties.includes(propertyName);

  if (propValueOf) {
    return isRootProperty ? extractRootProperty : extractMetadataProperty;
  }

  return isRootProperty ? extractRootLabel : extractMetadataLabel;
};

const EntityData = ({
  entity,
  templates,
  thesauri,
  'value-of': propValueOf,
  'label-of': propLabelOf,
  newNameGeneration }) =>
{
  const formattedEntity = _formater.default.prepareMetadata(entity.toJS(), templates, thesauri);
  const template = templates.find((t) => (t === null || t === void 0 ? void 0 : t.get('_id')) === entity.get('template'));
  // eslint-disable-next-line react/jsx-no-useless-fragment
  let output = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null);

  try {
    const propertyName = getProperty(propValueOf, propLabelOf);
    const renderMethod = getMethod(propValueOf, propertyName);
    output = /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, renderMethod({ formattedEntity, propertyName, newNameGeneration, template }));
  } catch (err) {
    (0, _utils.logError)(err, propValueOf, propLabelOf);
  }

  return output;
};

const container = connector(EntityData);exports.EntityData = container;