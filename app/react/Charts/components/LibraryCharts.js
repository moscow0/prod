"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.LibraryCharts = void 0;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");

var _libraryFilters = require("../../Library/helpers/libraryFilters");

var _ = require("./..");
var _arrayUtils = _interopRequireDefault(require("../utils/arrayUtils"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function translateOptions(_property) {
  const property = _property;
  property.options = property.options.map((_option) => {
    const option = _option;
    option.label = (0, _I18N.t)(property.content, option.label, null, false);
    return option;
  });
  return property;
}

function sortFields(_field) {
  const field = _field;
  field.options = _arrayUtils.default.sortValues(field.options);
  return field;
}

class LibraryCharts extends _react.Component {
  itemResults(item) {
    const { aggregations } = this;
    const buckets =
    aggregations.all && aggregations.all.types ? aggregations.all.types.buckets : [];
    const found = buckets.find((agg) => agg.key === item.id);

    if (found) {
      return found.filtered.doc_count;
    }

    if (item.items) {
      return item.items.reduce((result, _item) => result + this.itemResults(_item), 0);
    }

    return 0;
  }

  conformDocumentTypesToFields() {
    let items = this.props.collection.toJS().filters || [];

    if (!items.length || this.props.storeKey === 'uploads') {
      items = this.props.templates.toJS().map((tpl) => ({ id: tpl._id, name: tpl.name }));
    }

    if (this.props.storeKey === 'uploads') {
      items.unshift({ id: 'missing', name: (0, _I18N.t)('System', 'No type') });
    }

    const fields = [
    {
      options: items.map((item) => ({
        label: (0, _I18N.t)(item.id, item.name),
        results: this.itemResults(item) })),

      label: (0, _I18N.t)('System', 'Document and entity types') }];



    return fields;
  }

  render() {
    let fields = [];

    if (this.props.aggregations) {
      this.aggregations = this.props.aggregations.toJS();

      if (this.props.fields.size) {
        fields = (0, _libraryFilters.parseWithAggregations)(this.props.fields.toJS(), this.aggregations).
        filter(
        (field) =>
        (field.type === 'select' || field.type === 'multiselect') &&
        field.options &&
        field.options.length).

        map(translateOptions).
        map(sortFields);
      }

      fields = fields.length ? fields : this.conformDocumentTypesToFields();
    }

    return /*#__PURE__*/(
      _jsx("div", { className: "documents-list" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "main-wrapper" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "item-group item-group-charts" }, void 0,
      fields.map((field, index) => /*#__PURE__*/
      _jsx(_.LibraryChart, {

        options: field.options,
        label: (0, _I18N.t)(this.props.translationContext, field.label) }, index))))));






  }}exports.LibraryCharts = LibraryCharts;











function mapStateToProps(state, props) {
  const documentTypesExist = props.storeKey && state[props.storeKey].filters.get('documentTypes');

  return {
    aggregations: props.storeKey ? state[props.storeKey].aggregations : null,
    fields: props.storeKey ? state[props.storeKey].filters.get('properties') : null,
    collection: state.settings.collection,
    templates: state.templates,
    translationContext: documentTypesExist ?
    state[props.storeKey].filters.getIn(['documentTypes', 0]) :
    null };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(LibraryCharts);exports.default = _default;