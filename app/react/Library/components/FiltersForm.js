"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FiltersForm = void 0;exports.mapStateToProps = mapStateToProps;var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _immutable = _interopRequireWildcard(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");

var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _libraryFilters = _interopRequireDefault(require("../helpers/libraryFilters"));
var _libraryActions = require("../actions/libraryActions");
var _I18N = require("../../I18N");
var _Multireducer = require("../../Multireducer");
var _tocGeneration = require("../../ToggledFeatures/tocGeneration");
var _TemplatesFilter = require("./TemplatesFilter");
var _AssigneeFilter = require("./AssigneeFilter");
var _PermissionsFilter = require("./PermissionsFilter");
var _PublishedFilters = require("./PublishedFilters");

var _FiltersFromProperties = _interopRequireDefault(require("./FiltersFromProperties"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class FiltersForm extends _react.Component {
  constructor(props) {
    super(props);
    this.search = (0, _debounce.default)((search) => {
      this.props.searchDocuments({ search }, this.props.storeKey);
    }, 300);

    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.activateAutoSearch = () => {
      this.autoSearch = true;
    };

    this.state = { documentTypeFromFilters: true };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !(0, _immutable.is)(this.props.fields, nextProps.fields) ||
      !(0, _immutable.is)(this.props.aggregations, nextProps.aggregations) ||
      !(0, _immutable.is)(this.props.documentTypes, nextProps.documentTypes) ||
      !(0, _immutable.is)(this.state.documentTypeFromFilters, nextState.documentTypeFromFilters));

  }

  onChange(search) {
    if (this.autoSearch) {
      this.autoSearch = false;
      this.search(search, this.props.storeKey);
    }
  }

  submit(search) {
    this.props.searchDocuments({ search }, this.props.storeKey);
  }

  render() {
    const { templates, documentTypes } = this.props;
    const aggregations = this.props.aggregations.toJS();
    const translationContext =
    documentTypes.get(0) || (templates.get(0) || (0, _immutable.fromJS)({})).get('_id') || 'System';
    const allFields = this.props.fields.toJS();
    const showNoValueOnFilters = allFields.size;
    const fields = _libraryFilters.default.
    parseWithAggregations(allFields.slice(0), aggregations, showNoValueOnFilters).
    filter((field) => !field.options || field.options.length);
    const model = `${this.props.storeKey}.search`;

    return /*#__PURE__*/(
      _jsx("div", { className: "filters-box" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, { model: model, id: "filtersForm", onSubmit: this.submit, onChange: this.onChange }, void 0, /*#__PURE__*/
      _jsx(_PublishedFilters.PublishedFilters, { onChange: this.activateAutoSearch, aggregations: aggregations }), /*#__PURE__*/
      _jsx(_PermissionsFilter.PermissionsFilter, { onChange: this.activateAutoSearch, aggregations: aggregations }), /*#__PURE__*/
      _jsx(_TemplatesFilter.TemplatesFilter, {}), /*#__PURE__*/
      _jsx(_FiltersFromProperties.default, {
        onChange: this.activateAutoSearch,
        properties: fields,
        translationContext: translationContext,
        storeKey: this.props.storeKey }), /*#__PURE__*/


      _jsx(_tocGeneration.FilterTocGeneration, { onChange: this.activateAutoSearch, aggregations: aggregations }), /*#__PURE__*/
      _jsx(_AssigneeFilter.AssigneeFilter, { onChange: this.activateAutoSearch, aggregations: aggregations })),


      (() => {
        const activeTypes = templates.filter((template) =>
        documentTypes.includes(template.get('_id')));

        if (activeTypes.size > 0 && fields.length === 0) {
          return /*#__PURE__*/(
            _jsx("div", { className: "blank-state" }, void 0, /*#__PURE__*/
            _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
            _jsx("h4", {}, void 0, /*#__PURE__*/
            _jsx(_I18N.Translate, {}, void 0, "No common filters")), /*#__PURE__*/

            _jsx("p", {}, void 0, /*#__PURE__*/
            _jsx(_I18N.Translate, {}, void 0, "The combination of entity types doesn't have any filters in common.")), /*#__PURE__*/



            _jsx("a", {
              href: "https://github.com/huridocs/uwazi/wiki/Filter",
              target: "_blank",
              rel: "noopener noreferrer" }, void 0, /*#__PURE__*/

            _jsx(_I18N.Translate, {}, void 0, "Learn more"))));



        }

        return null;
      })()));


  }}exports.FiltersForm = FiltersForm;












function mapStateToProps(state, props) {
  return {
    fields: state[props.storeKey].filters.get('properties'),
    aggregations: state[props.storeKey].aggregations,
    templates: state.templates,
    documentTypes: state[props.storeKey].filters.get('documentTypes') };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)({ searchDocuments: _libraryActions.searchDocuments }, (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FiltersForm);exports.default = _default;