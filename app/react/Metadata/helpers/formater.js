"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.propertyValueFormatter = exports.default = void 0;
var _momentTimezone = _interopRequireDefault(require("moment-timezone"));
var _immutable = _interopRequireDefault(require("immutable"));
var _advancedSort = require("../../utils/advancedSort");
var _store = require("../../store");
var _ViolatedArticlesNestedProperties = _interopRequireDefault(require("../../Templates/components/ViolatedArticlesNestedProperties"));const _excluded = ["parent"];function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const prepareRelatedEntity = (options, propValue, templates, property) => {
  const relation =
  options.doc && options.doc.relations ?
  options.doc.relations.find((rel) => rel.entity === propValue.value) :
  undefined;

  if (relation && relation.entityData) {
    const template = templates.find((t) => relation.entityData.template === t.get('_id'));
    const inheritedProperty = template.
    get('properties').
    find((p) => p.get('_id') === property.get('inherit').get('property'));
    return _objectSpread(_objectSpread({},
    relation.entityData), {}, {
      inheritedProperty: inheritedProperty.get('name') });

  }

  return undefined;
};

const addSortedProperties = (templates, sortedProperties) =>
templates.reduce((_property, template) => {
  if (!template.get('properties')) {
    return _property;
  }

  let matchProp = template.
  get('properties').
  find((prop) => sortedProperties.includes(`metadata.${prop.get('name')}`));

  if (matchProp) {
    matchProp = matchProp.set('type', null).set('translateContext', template.get('_id'));
  }

  return _property || matchProp;
}, false);

const formatMetadataSortedProperties = (metadata, sortedProperties) =>
metadata.map((prop) => {
  const newProp = _objectSpread({}, prop);
  newProp.sortedBy = false;
  if (sortedProperties.includes(`metadata.${prop.name}`)) {
    newProp.sortedBy = true;
    if (!prop.value && prop.value !== 0) {
      newProp.value = 'No value';
      newProp.translateContext = 'System';
    }
  }
  return newProp;
});

const addCreationDate = (result, doc) =>
result.push({
  value: (0, _momentTimezone.default)(doc.creationDate).format('ll'),
  label: 'Date added',
  name: 'creationDate',
  translateContext: 'System',
  sortedBy: true });


const addModificationDate = (result, doc) =>
result.push({
  value: (0, _momentTimezone.default)(doc.editDate).format('ll'),
  label: 'Date modified',
  name: 'editDate',
  translateContext: 'System',
  sortedBy: true });


const groupByParent = (options) =>
options.reduce((groupedOptions, _ref) => {let { parent } = _ref,option = _objectWithoutProperties(_ref, _excluded);
  if (!parent) {
    groupedOptions.push(option);
    return groupedOptions;
  }

  const alreadyDefinedOption = groupedOptions.find((o) => o.parent === parent);
  if (alreadyDefinedOption) {
    alreadyDefinedOption.value.push(option);
    return groupedOptions;
  }

  const parentOption = { value: [option], parent };
  groupedOptions.push(parentOption);

  return groupedOptions;
}, []);

const conformSortedProperty = (metadata, templates, doc, sortedProperties) => {
  const sortPropertyInMetadata = metadata.find((p) =>
  sortedProperties.includes(`metadata.${p.name}`));

  if (
  !sortPropertyInMetadata &&
  !sortedProperties.includes('creationDate') &&
  !sortedProperties.includes('editDate'))
  {
    return metadata.push(addSortedProperties(templates, sortedProperties)).filter((p) => p);
  }

  let result = formatMetadataSortedProperties(metadata, sortedProperties);

  if (sortedProperties.includes('creationDate')) {
    result = addCreationDate(result, doc);
  }

  if (sortedProperties.includes('editDate')) {
    result = addModificationDate(result, doc);
  }

  return result;
};

const propertyValueFormatter = {
  date: (timestamp) => _momentTimezone.default.utc(timestamp, 'X').format('ll') };exports.propertyValueFormatter = propertyValueFormatter;var _default =


{
  formatDateRange(daterange = {}) {
    let from = '';
    let to = '';
    if (daterange.value.from) {
      from = _momentTimezone.default.utc(daterange.value.from, 'X').format('ll');
    }
    if (daterange.value.to) {
      to = _momentTimezone.default.utc(daterange.value.to, 'X').format('ll');
    }
    return `${from} ~ ${to}`;
  },

  getSelectOptions(option, thesaurus, doc) {
    let value = '';
    let originalValue = '';
    let icon;
    let parent;

    if (option) {var _option$parent;
      value = option.label || option.value;
      originalValue = option.value;
      icon = option.icon;
      parent = (_option$parent = option.parent) === null || _option$parent === void 0 ? void 0 : _option$parent.label;
    }

    let url;
    if (option && thesaurus && thesaurus.get('type') === 'template') {
      url = `/entity/${option.value}`;
    }

    let relatedEntity;
    if (doc && doc.relations && doc.relations.length > 0) {
      const relation = doc.relations.find((e) => e.entity === option.value);
      relatedEntity = relation === null || relation === void 0 ? void 0 : relation.entityData;
      relatedEntity = relatedEntity ? _objectSpread(_objectSpread({},
      relatedEntity), {}, { inheritedProperty: 'title' }) :
      relatedEntity;
    }

    return { value, originalValue, url, icon, parent, relatedEntity };
  },

  multimedia(property, [{ value }], type) {
    return {
      type,
      label: property.get('label'),
      name: property.get('name'),
      style: property.get('style') || 'contain',
      noLabel: Boolean(property.get('noLabel')),
      value };

  },

  date(property, date = [{}]) {
    const timestamp = date[0].value;
    const value = propertyValueFormatter.date(timestamp);
    return {
      label: property.get('label'),
      name: property.get('name'),
      value,
      timestamp };

  },

  daterange(property, daterange) {
    return {
      label: property.get('label'),
      name: property.get('name'),
      value: this.formatDateRange(daterange[0]),
      originalValue: daterange[0].value };

  },

  multidate(property, timestamps = []) {
    const value = timestamps.map((timestamp) => ({
      timestamp: timestamp.value,
      value: _momentTimezone.default.utc(timestamp.value, 'X').format('ll') }));

    return { label: property.get('label'), name: property.get('name'), value };
  },

  multidaterange(property, dateranges = []) {
    const value = dateranges.map((range) => ({
      value: this.formatDateRange(range),
      originalValue: range.value }));

    return {
      label: property.get('label'),
      name: property.get('name'),
      value };

  },

  image(property, value) {
    return this.multimedia(property, value, 'image');
  },

  link(_property, [value]) {
    return _objectSpread(_objectSpread({}, value), {}, { type: 'link' });
  },

  preview(property, _value, _thesauri, { doc }) {
    const defaultDoc = doc.defaultDoc || {};
    return this.multimedia(
    property,
    [{ value: defaultDoc._id ? `/api/files/${defaultDoc._id}.jpg` : null }],
    'image');

  },

  media(property, value) {
    return this.multimedia(property, value, 'media');
  },

  default(_property, [value]) {
    return value;
  },

  geolocation(property, value, _thesauri, { onlyForCards }) {
    return {
      label: property.get('label'),
      name: property.get('name'),
      value: value.map((geolocation) => geolocation.value),
      onlyForCards: Boolean(onlyForCards),
      type: 'geolocation' };

  },

  select(property, [metadataValue]) {
    const { value, url, icon, parent } = this.getSelectOptions(metadataValue);
    return {
      label: property.get('label'),
      name: property.get('name'),
      originalValue: metadataValue.value,
      value,
      icon,
      url,
      parent };

  },

  multiselect(property, thesauriValues) {
    const sortedValues = this.getThesauriValues(thesauriValues);
    const groupsOptions = groupByParent(sortedValues);
    return {
      label: property.get('label'),
      name: property.get('name'),
      value: groupsOptions };

  },

  inherit(property, propValue, thesauri, options, templates) {
    const propertyInfo = _immutable.default.fromJS({
      label: property.get('label'),
      name: property.get('name'),
      type: property.get('inherit').get('type'),
      noLabel: property.get('noLabel') });


    const type = propertyInfo.get('type');
    const methodType = this[type] ? type : 'default';
    let value = (propValue || []).
    map((v) => {
      if (v && v.inheritedValue) {
        if (
        !v.inheritedValue.length ||
        v.inheritedValue.every(
        (iv) => !(iv.value || type === null || type === 'numeric' && iv.value === 0)))

        {
          return null;
        }

        const relatedEntity = prepareRelatedEntity(options, v, templates, property);

        const formattedValue = this[methodType](
        propertyInfo,
        v.inheritedValue,
        thesauri,
        options,
        templates);

        return _objectSpread(_objectSpread({},
        formattedValue),
        relatedEntity && { relatedEntity });

      }

      return {};
    }).
    filter((v) => v);
    let propType = 'inherit';
    if (['multidate', 'multidaterange', 'multiselect', 'geolocation'].includes(type)) {
      propType = type;
      value = this.flattenInheritedMultiValue(value, type, propValue || [], undefined, {
        doc: options.doc });

    }
    value = value.filter((v) => v);
    return _objectSpread(_objectSpread({
      translateContext: property.get('content') },
    propertyInfo.toJS()), {}, {
      name: property.get('name'),
      value,
      label: property.get('label'),
      type: propType,
      inheritedType: type,
      onlyForCards: Boolean(options.onlyForCards),
      indexInTemplate: property.get('indexInTemplate') });

  },

  flattenInheritedMultiValue(
  relationshipValues,
  type,
  thesaurusValues,
  templateThesaurus,
  { doc })
  {
    const result = relationshipValues.map((relationshipValue, index) => {
      let { value } = relationshipValue;
      if (!value) return [];
      if (type === 'geolocation') {
        const options = this.getSelectOptions(thesaurusValues[index], templateThesaurus, doc);
        const entityLabel = options.value;
        value = value.map((v) => _objectSpread(_objectSpread({},
        v), {}, {
          relatedEntity: options.relatedEntity ? options.relatedEntity : undefined,
          label: `${entityLabel}${v.label ? ` (${v.label})` : ''}` }));

      }
      return value;
    });
    return result.flat();
  },

  relationship(property, thesaurusValues, _thesauri, { doc }) {
    const thesaurus = _immutable.default.fromJS({
      type: 'template' });

    const sortedValues = this.getThesauriValues(thesaurusValues, thesaurus, doc);
    return { label: property.get('label'), name: property.get('name'), value: sortedValues };
  },

  markdown(property, [{ value }], _thesauris, { type }) {
    return {
      label: property.get('label'),
      name: property.get('name'),
      value,
      type: type || 'markdown' };

  },

  nested(property, rows, thesauri) {
    if (!rows[0]) {
      return { label: property.get('label'), name: property.get('name'), value: '' };
    }

    const { locale } = _store.store.getState();
    const keys = Object.keys(rows[0].value).sort();
    const translatedKeys = keys.map((key) =>
    _ViolatedArticlesNestedProperties.default[key.toLowerCase()] ?
    _ViolatedArticlesNestedProperties.default[key.toLowerCase()][`key_${locale}`] :
    key);

    let result = `| ${translatedKeys.join(' | ')}|\n`;
    result += `| ${keys.map(() => '-').join(' | ')}|\n`;
    result += `${rows.
    map((row) => `| ${keys.map((key) => (row.value[key] || []).join(', ')).join(' | ')}`).
    join('|\n')}|`;

    return this.markdown(property, [{ value: result }], thesauri, { type: 'markdown' });
  },

  getThesauriValues(thesaurusValues, thesaurus, doc) {
    return (0, _advancedSort.advancedSort)(
    thesaurusValues.
    map((thesaurusValue) => this.getSelectOptions(thesaurusValue, thesaurus, doc)).
    filter((v) => v.value),
    { property: 'value' });

  },

  prepareMetadataForCard(doc, templates, thesauri, sortedProperty) {
    return this.prepareMetadata(doc, templates, thesauri, null, {
      onlyForCards: true,
      sortedProperties: [sortedProperty] });

  },

  prepareMetadata(_doc, templates, thesauri, relationships, _options = {}) {
    const doc = _objectSpread({ metadata: {} }, _doc);
    const options = _objectSpread({ sortedProperties: [] }, _options);
    const template = templates.find((temp) => temp.get('_id') === doc.template);

    if (!template || !thesauri.size) {
      return _objectSpread(_objectSpread({}, doc), {}, { metadata: [], documentType: '' });
    }

    let metadata = template.
    get('properties').
    map((p, index) => p.set('indexInTemplate', index)).
    filter(
    this.filterProperties(options.onlyForCards, options.sortedProperties, {
      excludePreview: options.excludePreview })).


    map((property) =>
    this.applyTransformation(property, {
      doc,
      thesauri,
      options,
      template,
      templates,
      relationships }));



    metadata = conformSortedProperty(metadata, templates, doc, options.sortedProperties);

    return _objectSpread(_objectSpread({}, doc), {}, { metadata: metadata.toJS(), documentType: template.get('name') });
  },

  applyTransformation(property, { doc, thesauri, options, template, templates }) {
    const value = doc.metadata[property.get('name')];
    const showInCard = property.get('showInCard');

    if (property.get('inherit')) {
      return this.inherit(property, value, thesauri, _objectSpread(_objectSpread({}, options), {}, { doc }), templates);
    }

    const methodType = this[property.get('type')] ? property.get('type') : 'default';

    if (value && value.length || methodType === 'preview') {
      return _objectSpread(_objectSpread({
        translateContext: template.get('_id') },
      property.toJS()),
      this[methodType](property, value, thesauri, _objectSpread(_objectSpread({}, options), {}, { doc })));

    }

    return {
      label: property.get('label'),
      name: property.get('name'),
      type: property.get('type'),
      value,
      showInCard,
      translateContext: template.get('_id') };

  },

  filterProperties(onlyForCards, sortedProperties, options = {}) {
    return (p) => {
      if (options.excludePreview && p.get('type') === 'preview') {
        return false;
      }

      if (!onlyForCards) {
        return true;
      }

      if (p.get('showInCard') || sortedProperties.includes(`metadata.${p.get('name')}`)) {
        return true;
      }

      return false;
    };
  } };exports.default = _default;