"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.showByType = exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _lodash = require("lodash");
var _I18N = require("../../I18N");
var _Markdown = _interopRequireDefault(require("../../Markdown"));
var _GroupedGeolocationViewer = require("./GroupedGeolocationViewer");
var _GeolocationViewer = _interopRequireDefault(require("./GeolocationViewer"));
var _RelationshipLink = require("./RelationshipLink");
var _ValueList = _interopRequireDefault(require("./ValueList"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const renderRelationshipLinks = (linksProp, compact) => {
  const formattedLinkValues = Array.isArray(linksProp.value) ? linksProp.value : [linksProp.value];
  const hydratedValues = formattedLinkValues.map((linkValue) => ({
    value: /*#__PURE__*/_jsx(_RelationshipLink.RelationshipLink, { propValue: linkValue }) }));

  const hydratedProp = _objectSpread(_objectSpread({}, linksProp), {}, { value: hydratedValues });
  return /*#__PURE__*/_jsx(_ValueList.default, { compact: compact, property: hydratedProp });
};

const showByType = (prop, compact, templateId) => {
  let result = prop.value;

  switch (prop.type) {
    case null:
      result = (0, _I18N.t)('System', 'No property');
      break;
    case 'markdown':
      result = /*#__PURE__*/_jsx(_Markdown.default, { html: true, markdown: prop.value });
      break;
    case 'link':
      result = /*#__PURE__*/
      _jsx("a", { href: prop.value.url, target: "_blank", rel: "noopener noreferrer" }, void 0,
      prop.value.label ? prop.value.label : prop.value.url);


      break;
    case 'image':
      result = prop.value && /*#__PURE__*/
      _jsx("img", {

        className: `multimedia-img ${prop.style}`,
        src: prop.value,
        alt: prop.label }, prop.value);


      break;
    case 'media':{
        result = prop.value && /*#__PURE__*/_jsx(_Markdown.default, { markdown: `{media}(${prop.value})`, compact: true });
        break;
      }
    case 'geolocation':
      result = /*#__PURE__*/
      _jsx(_GeolocationViewer.default, {
        points: prop.value,
        onlyForCards: Boolean(prop.onlyForCards || compact) });


      break;
    case 'select':
      result = prop.parent ? `${prop.parent}: ${prop.value}` : result;
      break;
    case 'geolocation_group':
      result = /*#__PURE__*/_jsx(_GroupedGeolocationViewer.GroupedGeolocationViewer, { members: prop.members, templateId: templateId });
      break;
    case 'relationship':
      result = renderRelationshipLinks(prop, compact);
      break;
    default:
      if (prop.value && prop.value.map) {
        const propValue = (0, _lodash.flattenDeep)(
        prop.value.map((_value) =>
        _value.parent && Array.isArray(_value.value) ?
        (0, _lodash.flattenDeep)(
        _value.value.map((v) => _objectSpread(_objectSpread({}, v), {}, { value: `${_value.parent}: ${v.value}` }))) :

        _value));



        // eslint-disable-next-line no-param-reassign
        prop.value = propValue.map((_value) => {
          const value = showByType(_value, compact, templateId);
          return value && value.value ?
          value : _objectSpread({
            value }, _value.icon !== undefined ? { icon: _value.icon } : {});
        });
        result = /*#__PURE__*/_jsx(_ValueList.default, { compact: compact, property: prop });
      }
      break;}


  return result;
};exports.showByType = showByType;

const computeGroup = (metadata, startIndex) => {
  const members = [];
  let index = startIndex;
  let lastIndexInTemplate = metadata[index].indexInTemplate - 1;

  while (
  index < metadata.length &&
  metadata[index].type === 'geolocation' &&
  metadata[index].indexInTemplate === lastIndexInTemplate + 1)
  {
    members.push(metadata[index]);
    lastIndexInTemplate = metadata[index].indexInTemplate;
    index += 1;
  }

  return [members, index];
};

const getNewGroupedGeolocationField = (members) => {
  if (members.length === 1) {
    return {
      type: 'geolocation_group',
      name: 'geolocation_group',
      label: members[0].label,
      translateContext: members[0].translateContext,
      members };

  }

  return {
    type: 'geolocation_group',
    label: 'Combined geolocations',
    members };

};

const groupAdjacentGeolocations = (metadata) => {
  const groupedMetadata = [];
  let index = 0;

  while (index < metadata.length) {
    if (metadata[index].type !== 'geolocation') {
      groupedMetadata.push(metadata[index]);
      index += 1;
    } else {
      const [members, i] = computeGroup(metadata, index);

      index = i;
      groupedMetadata.push(getNewGroupedGeolocationField(members));
    }
  }

  return groupedMetadata;
};

function filterProps(showSubset) {
  return (p) => {
    if (showSubset && !showSubset.includes(p.name)) {
      return false;
    }
    if (Array.isArray(p.value)) {
      return p.value.length;
    }
    return p.value || p.type === null || p.type === 'numeric' && p.value === 0;
  };
}

const flattenInherittedRelationships = (metadata) =>
metadata.map((property) => {
  if (property.type === 'inherit' && property.inheritedType === 'relationship') {
    // eslint-disable-next-line no-param-reassign
    property.value = property.value.reduce(
    (flattenedValues, v) => flattenedValues.concat(v.value || []),
    []);

  }
  return property;
});

const Metadata = ({
  metadata,
  compact,
  renderLabel,
  showSubset,
  highlight,
  groupGeolocations,
  templateId }) =>
{
  const filteredMetadata = metadata.filter(filterProps(showSubset));
  const flattenedMetadata = flattenInherittedRelationships(filteredMetadata);
  const groupedMetadata = groupGeolocations ?
  groupAdjacentGeolocations(flattenedMetadata) :
  flattenedMetadata;

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null,
    groupedMetadata.map((prop, index) => {
      let type = prop.type ? prop.type : 'default';
      type = type === 'image' || type === 'media' ? 'multimedia' : type;
      const highlightClass = highlight.includes(prop.name) ? 'highlight' : '';
      const fullWidthClass = prop.fullWidth ? 'full-width' : '';

      return /*#__PURE__*/(
        _jsx("dl", {
          className: `metadata-type-${type} metadata-name-${prop.name} ${fullWidthClass} ${highlightClass}` },
        `${prop.name}_${index}`,

        renderLabel(prop, /*#__PURE__*/_jsx("dt", {}, void 0, (0, _I18N.t)(prop.translateContext || 'System', prop.label))), /*#__PURE__*/
        _jsx("dd", { className: prop.sortedBy ? 'item-current-sort' : '' }, void 0,
        showByType(prop, compact, templateId))));



    })));


};

Metadata.defaultProps = {
  compact: false,
  showSubset: undefined,
  renderLabel: (_prop, label) => label,
  highlight: [],
  groupGeolocations: false };var _default =




























Metadata;exports.default = _default;