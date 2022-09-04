"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchDescription = void 0;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");

var _libraryFilters = _interopRequireDefault(require("../helpers/libraryFilters"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function getPropertyText(prop, values) {
  const options = values.map((value) => prop.options.find((o) => o.id === value));
  const labels = options.map((o) => o && o.label).filter((l) => l);
  return labels.join(', ');
}

function getPropertiesTexts(query, properties) {
  return Object.keys(query.filters).reduce((descriptions, propName) => {
    const { values } = query.filters[propName];
    const property = properties.find((p) => p.name === propName);
    if (!values || !property) {
      return descriptions;
    }
    const propText = `${property.label}: ${getPropertyText(property, values)}`;
    return [...descriptions, propText];
  }, []);
}

class SearchDescription extends _react.Component {
  render() {
    const { searchTerm, query, properties } = this.props;
    const descriptions = query && query.filters ? getPropertiesTexts(query, properties) : [];
    const descriptionText = descriptions.length ? ` ${descriptions.join(' - ')}` : '';
    return /*#__PURE__*/(
      _jsx("span", {}, void 0,
      searchTerm,
      descriptionText));


  }}exports.SearchDescription = SearchDescription;


SearchDescription.defaultProps = {
  query: undefined };








function mapStateToProps({ templates, relationTypes }, { query }) {
  const properties =
  query && query.filters ?
  _libraryFilters.default.URLQueryToState(query, templates.toJS(), relationTypes.toJS()).properties :
  [];
  return {
    properties };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(SearchDescription);exports.default = _default;