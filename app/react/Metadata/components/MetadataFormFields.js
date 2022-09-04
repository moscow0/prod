"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.translateOptions = exports.mapStateToProps = exports.mapDispatchToProps = exports.default = exports.MetadataFormFields = void 0;

var _Forms = require("../../Forms");
var _I18N = require("../../I18N");
var _config = require("../../../shared/config");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _propertyTypes = require("../../../shared/propertyTypes");
var _actions = require("../actions/actions");
var _IDGenerator = require("../../../shared/IDGenerator");
var _redux = require("redux");
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));

var _ReactReduxForms = require("../../ReactReduxForms");















var _MultipleEditionFieldWarning = _interopRequireDefault(require("./MultipleEditionFieldWarning"));
var _MediaModal = require("./MediaModal");
var _MetadataExtractor = require("./MetadataExtractor");
var _DeleteSelectionButton = require("./DeleteSelectionButton");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const translateOptions = (thesauri) =>
thesauri.
get('values').
map((optionIm) => {
  const option = optionIm.toJS();
  option.label = (0, _I18N.t)(thesauri.get('_id'), option.label, null, false);
  if (option.values) {
    option.options = option.values.map((val) => _objectSpread(_objectSpread({},
    val), {}, {
      label: (0, _I18N.t)(thesauri.get('_id'), val.label, null, false) }));

  }
  return option;
}).
toJS();exports.translateOptions = translateOptions;

const groupSameRelationshipFields = (fields) =>
fields.
map((field) => {
  if (field.type !== 'relationship') {
    return field;
  }

  const multiEditingRelationshipFields = fields.filter(
  (f) =>
  f.content === field.content &&
  f.relationType === field.relationType &&
  f._id !== field._id);


  if (multiEditingRelationshipFields.length) {
    return _objectSpread(_objectSpread({},
    field), {}, {
      multiEditingRelationshipFields });

  }

  return field;
}).
filter((f) => f);

class MetadataFormFields extends _react.Component {
  getField(property, _model, thesauris, formModel) {
    let thesauri;
    let totalPossibleOptions = 0;
    const {
      dateFormat,
      version,
      entityThesauris,
      attachments,
      localAttachments,
      multipleEdition,
      locale } =
    this.props;
    const propertyType = property.type;
    const plainAttachments = attachments.toJS();
    const plainLocalAttachments = localAttachments;

    switch (propertyType) {
      case 'select':
        thesauri = thesauris.find((opt) => opt.get('_id').toString() === property.content.toString());
        return /*#__PURE__*/(
          _jsx(_ReactReduxForms.Select, {
            model: _model,
            optionsValue: "id",
            options: translateOptions(thesauri),
            placeholder: "Select..." }));


      case 'multiselect':
        thesauri = thesauris.find((opt) => opt.get('_id').toString() === property.content.toString());
        return /*#__PURE__*/(
          _jsx(_ReactReduxForms.MultiSelect, {
            model: _model,
            optionsValue: "id",
            options: translateOptions(thesauri),
            prefix: _model,
            forceHoist: version === 'OneUp',
            placeholder:
            version === 'OneUp' ?
            `${(0, _I18N.t)('System', 'Search', null, false)} '${thesauri.get('name')}'` :
            null }));



      case 'relationship':
        if (property.content) {
          const source = thesauris.find(
          (opt) => opt.get('_id').toString() === property.content.toString());


          totalPossibleOptions = source.get('optionsCount');
          thesauri = translateOptions(source);
        }

        if (!property.content) {
          thesauri = Array.prototype.
          concat(
          ...thesauris.
          filter((filterThesauri) => filterThesauri.get('type') === 'template').
          map((source) => {
            totalPossibleOptions += source.get('optionsCount');
            return translateOptions(source);
          })).

          slice(0, _config.preloadOptionsLimit);
        }

        if (entityThesauris.get(property.name)) {
          entityThesauris.
          get(property.name).
          toJS().
          forEach((o) => {
            thesauri.push({ id: o.value, label: o.label });
          });
        }

        return /*#__PURE__*/(
          _jsx(_ReactReduxForms.LookupMultiSelect, {
            lookup: _actions.getSuggestions.bind(null, property.content ? [property.content] : []),
            model: _model,
            optionsValue: "id",
            options: thesauri,
            totalPossibleOptions: totalPossibleOptions,
            prefix: _model,
            onChange: this.relationshipChange.bind(this, property),
            sort: true }));


      case 'date':
        return /*#__PURE__*/_jsx(_ReactReduxForms.DatePicker, { model: _model, format: dateFormat, locale: locale });
      case 'daterange':
        return /*#__PURE__*/_jsx(_ReactReduxForms.DateRange, { model: _model, format: dateFormat, locale: locale });
      case 'numeric':
        return /*#__PURE__*/_jsx(_ReactReduxForms.Numeric, { model: _model });
      case 'markdown':
        return /*#__PURE__*/_jsx(_ReactReduxForms.MarkDown, { model: _model });
      case 'nested':
        return /*#__PURE__*/_jsx(_ReactReduxForms.Nested, { model: _model });
      case 'multidate':
        return /*#__PURE__*/_jsx(_ReactReduxForms.MultiDate, { model: _model, format: dateFormat, locale: locale });
      case 'multidaterange':
        return /*#__PURE__*/_jsx(_ReactReduxForms.MultiDateRange, { model: _model, format: dateFormat, locale: locale });
      case 'geolocation':
        return /*#__PURE__*/_jsx(_ReactReduxForms.Geolocation, { model: _model });
      case 'link':
        return /*#__PURE__*/_jsx(_ReactReduxForms.LinkField, { model: _model });
      case 'media':
        return /*#__PURE__*/(
          _jsx(_ReactReduxForms.MediaField, {
            model: _model,
            formModel: formModel,
            attachments: plainAttachments,
            localAttachments: plainLocalAttachments,
            type: _MediaModal.MediaModalType.Media,
            multipleEdition: multipleEdition }));


      case 'image':
        return /*#__PURE__*/(
          _jsx(_ReactReduxForms.MediaField, {
            model: _model,
            formModel: formModel,
            attachments: plainAttachments,
            localAttachments: plainLocalAttachments,
            type: _MediaModal.MediaModalType.Image,
            multipleEdition: multipleEdition }));


      case 'preview':
        return /*#__PURE__*/(
          _jsx("div", {}, void 0, /*#__PURE__*/
          _jsx("em", {}, void 0, /*#__PURE__*/
          _jsx(_I18N.Translate, {}, void 0, "This content is automatically generated"))));



      case 'generatedid':
        return /*#__PURE__*/(
          _jsx(_reactReduxForm.Field, { model: _model }, void 0, /*#__PURE__*/
          _jsx("input", {
            type: "text",
            className: "form-control",
            defaultValue: formModel === 'publicform' ? (0, _IDGenerator.generateID)(3, 4, 4) : undefined })));



      case 'text':
        return /*#__PURE__*/(
          _jsx(_reactReduxForm.Field, { model: _model }, void 0, /*#__PURE__*/
          _jsx("input", { type: "text", className: "form-control" })));


      default:
        return false;}

  }

  relationshipChange(prop, value) {var _prop$multiEditingRel;
    const { change, model } = this.props;
    (_prop$multiEditingRel = prop.multiEditingRelationshipFields) === null || _prop$multiEditingRel === void 0 ? void 0 : _prop$multiEditingRel.forEach((p) => {
      change(`${model}.metadata.${p.name}`, value);
    });
  }

  renderLabel(property) {
    const { template, multipleEdition, model } = this.props;
    const templateID = template.get('_id');
    let label = templateID ? /*#__PURE__*/
    _jsx(_I18N.Translate, { context: templateID }, void 0, property.label) :

    property.label;


    if (property.multiEditingRelationshipFields) {
      label = /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_I18N.Translate, { context: templateID }, void 0, property.label), "\xA0(", /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "affects"), "\xA0",
      property.multiEditingRelationshipFields.map((p) => /*#__PURE__*/
      _jsx("span", {}, p._id, "\"", /*#__PURE__*/
      _jsx(_I18N.Translate, { context: templateID }, void 0, p.label), "\"\xA0")), ")", /*#__PURE__*/



      _jsx(_Tip.default, { icon: "info-circle", position: "right" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Multiple relationships edit description" }, void 0, "Making changes to this property will affect other properties on this template because they all share relationships with the same configuration."))));







    }

    return /*#__PURE__*/(
      _jsx("li", { className: "title" }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, /*#__PURE__*/
      _jsx(_MultipleEditionFieldWarning.default, {
        multipleEdition: multipleEdition,
        model: model,
        field: `metadata.${property.name}` }),

      label,
      property.required ? /*#__PURE__*/_jsx("span", { className: "required" }, void 0, "*") : '')));



  }

  render() {
    const { thesauris, template, model, showSubset, storeKey, locale } = this.props;

    const mlThesauri = thesauris.
    filter((thes) => !!thes.get('enable_classification')).
    map((thes) => thes.get('_id')).
    toJS();
    const fields = groupSameRelationshipFields(template.get('properties').toJS());
    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      fields.
      filter((p) => !showSubset || showSubset.includes(p.name)).
      map((property) => {
        const showIXButtons =
        storeKey === 'documentViewer' &&
        ['text', 'date', 'numeric', 'markdown'].includes(property.type);
        return /*#__PURE__*/(
          _jsx(_Forms.FormGroup, {

            model: `.metadata.${property.name}`,
            className:
            model === 'publicform' && property.type === 'generatedid' ?
            ' hidden ' :
            property.type }, property.name, /*#__PURE__*/


          _jsx("ul", {
            className: `search__filter is-active ${
            this.props.highlightedProps.includes(property.name) ? 'highlight' : ''
            }` }, void 0,

          this.renderLabel(property),
          mlThesauri.includes(property.content) &&
          [_propertyTypes.propertyTypes.multiselect, _propertyTypes.propertyTypes.select].includes(property.type) ? /*#__PURE__*/
          _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
          _jsx(_ReactReduxForms.MultiSuggest, {
            model: `.suggestedMetadata.${property.name}`,
            selectModel: `.metadata.${property.name}`,
            propertyType: property.type })) :


          null, /*#__PURE__*/
          _jsx("li", { className: "wide" }, void 0, /*#__PURE__*/
          _jsx("div", { className: "metadata-extractor-container" }, void 0,
          showIXButtons && /*#__PURE__*/
          _jsx(_MetadataExtractor.MetadataExtractor, {
            fieldName: property.name,
            fieldId: property._id,
            fieldType: property.type,
            model: `${model}.metadata.${property.name}`,
            locale: locale }),


          this.getField(property, `.metadata.${property.name}`, thesauris, model))),


          showIXButtons && /*#__PURE__*/
          _jsx(_DeleteSelectionButton.DeleteSelectionButton, { propertyName: property.name, propertyID: property._id }))));




      })));


  }}exports.MetadataFormFields = MetadataFormFields;


MetadataFormFields.defaultProps = {
  multipleEdition: false,
  dateFormat: null,
  version: undefined,
  showSubset: undefined,
  entityThesauris: _immutable.default.fromJS({}),
  attachments: _immutable.default.fromJS([]),
  highlightedProps: [],
  localAttachments: [],
  storeKey: '',
  locale: '' };



















const mapStateToProps = (state, ownProps) => {
  const { storeKey } = ownProps;

  let attachments = _immutable.default.fromJS([]);
  let localAttachments;

  if (storeKey === 'library') {
    const selectedDocuments = state.library.ui.get('selectedDocuments');
    attachments = selectedDocuments.size ? selectedDocuments.get(0).get('attachments') : undefined;
    localAttachments = state.library.sidepanel.metadata.attachments;
  }

  if (storeKey === 'documentViewer') {
    const entity = state[storeKey].doc;
    attachments = entity.get('attachments');
    localAttachments = state[storeKey].sidepanel.metadata.attachments;
  }

  if (!storeKey) {
    const { entity } = state.entityView;
    attachments = entity.get('attachments');
    localAttachments = state.entityView.entityForm.attachments;
  }

  const { locale } = state;
  return {
    dateFormat: state.settings.collection.get('dateFormat'),
    entityThesauris: state.entityThesauris,
    attachments,
    localAttachments,
    locale };

};exports.mapStateToProps = mapStateToProps;

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.boundChange) {
    return { change: ownProps.boundChange };
  }
  return (0, _redux.bindActionCreators)({ change: _reactReduxForm.actions.change }, dispatch);
};exports.mapDispatchToProps = mapDispatchToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MetadataFormFields);exports.default = _default;