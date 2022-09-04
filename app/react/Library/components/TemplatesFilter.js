"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TemplatesFilterComponent = exports.TemplatesFilter = void 0;var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _ReactReduxForms = require("../../ReactReduxForms");
var _I18N = require("../../I18N");

var _filterActions = require("../actions/filterActions");
var _DocumentTypesList = _interopRequireDefault(require("./DocumentTypesList"));
var _Auth = require("../../Auth");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const mapStateToProps = (state) => ({
  collection: state.settings.collection,
  libraryFilters: state.library.filters });


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ filterDocumentTypes: _filterActions.filterDocumentTypes }, dispatch);
}

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



const filterValidSelectedTemplates = (configuredFilters, selectedTemplates) =>
configuredFilters.length ?
selectedTemplates.filter((t) => configuredFilters.includes(t)) :
selectedTemplates;

const flattenConfiguredFilters = (configuredFilters) =>
configuredFilters.reduce((result, filter) => {
  if (filter.items && filter.items.length) {
    const items = filter.items.map((item) => item.id);
    result.push(...items);
  }
  result.push(filter.id);
  return result;
}, []);

class TemplatesFilterComponent extends _react.default.Component


{
  constructor(props) {
    super(props);
    const configuredFilters = flattenConfiguredFilters(
    props.collection.toJS().filters || []);

    const currentSelection = props.libraryFilters.toJS().documentTypes || [];
    const newSelection = filterValidSelectedTemplates(configuredFilters, currentSelection);
    const documentTypeFromFilters = _lodash.default.isEqual(currentSelection, newSelection);

    this.state = {
      documentTypeFromFilters,
      selectedTemplates: newSelection,
      configuredFilters };

  }

  static getDerivedStateFromProps(props, state) {
    const currentSelection = props.libraryFilters.toJS().documentTypes || [];
    const newSelection = state.documentTypeFromFilters ?
    filterValidSelectedTemplates(state.configuredFilters, currentSelection) :
    currentSelection;
    return { selectedTemplates: newSelection };
  }

  toggleTemplateFilter(
  checked,
  configuredFilters,
  selectedTemplates)
  {
    if (checked) {
      const newSelectedItems = filterValidSelectedTemplates(configuredFilters, selectedTemplates);
      this.setState({ selectedTemplates: newSelectedItems });
      this.props.filterDocumentTypes(newSelectedItems);
    }
    this.setState({ documentTypeFromFilters: checked });
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "search__filter" }, void 0,
      this.state.configuredFilters.length > 0 && /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor', 'collaborator'] }, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, "\xA0", /*#__PURE__*/

      _jsx(_ReactReduxForms.Switcher, {
        className: "template-filter-switcher",
        model: "",
        value: this.state.documentTypeFromFilters,
        onChange: (checked) =>
        this.toggleTemplateFilter(
        checked,
        this.state.configuredFilters,
        this.state.selectedTemplates),


        leftLabel: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "FEATURED"),
        rightLabel: /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "ALL") }))), /*#__PURE__*/




      _jsx("li", { className: "wide documentTypes-selector" }, void 0, /*#__PURE__*/
      _jsx(_DocumentTypesList.default, {
        fromFilters:
        this.state.documentTypeFromFilters && this.state.configuredFilters.length > 0,

        selectedTemplates: this.state.selectedTemplates })))));





  }}exports.TemplatesFilterComponent = TemplatesFilterComponent;


const TemplatesFilter = connector(TemplatesFilterComponent);exports.TemplatesFilter = TemplatesFilter;