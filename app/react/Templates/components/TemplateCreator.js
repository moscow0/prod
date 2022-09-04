"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TemplateCreator = void 0;require("../scss/templates.scss");

var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _templateActions = require("../actions/templateActions");
var _relationTypeActions = require("../../RelationTypes/actions/relationTypeActions");
var _MetadataTemplate = _interopRequireDefault(require("./MetadataTemplate"));
var _PropertyOption = _interopRequireDefault(require("./PropertyOption"));
var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class TemplateCreator extends _react.Component {
  componentWillUnmount() {
    this.props.resetTemplate();
  }

  render() {
    let save = this.props.saveTemplate;
    let backUrl = '/settings/templates';
    let environment = 'document';

    if (this.props.relationType) {
      save = this.props.saveRelationType;
      backUrl = '/settings/connections';
      environment = 'relationship';
    }

    return /*#__PURE__*/(
      _jsx("div", { className: "metadata" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Metadata creator")), /*#__PURE__*/

      _jsx("div", { className: "panel-body" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("main", { className: "col-xs-12 col-sm-9" }, void 0, /*#__PURE__*/
      _jsx(_MetadataTemplate.default, {
        saveTemplate: save,
        backUrl: backUrl,
        relationType: this.props.relationType })),


      environment !== 'relationship' && !this.props.syncedTemplate && /*#__PURE__*/
      _jsx("aside", { className: "col-xs-12 col-sm-3" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "metadataTemplate-constructor" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("i", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Properties"))), /*#__PURE__*/


      _jsx("ul", { className: "list-group property-options-list" }, void 0, /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Text", type: "text" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Numeric", type: "numeric" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, {
        label: "Select",
        type: "select",
        disabled: this.props.noDictionaries }), /*#__PURE__*/

      _jsx(_PropertyOption.default, {
        label: "Multi Select",
        type: "multiselect",
        disabled: this.props.noDictionaries }),

      environment !== 'relationship' && /*#__PURE__*/
      _jsx(_PropertyOption.default, {
        label: "Relationship",
        type: "relationship",
        disabled: this.props.noRelationtypes }), /*#__PURE__*/


      _jsx(_PropertyOption.default, { label: "Date", type: "date" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Date Range", type: "daterange" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Multi Date", type: "multidate" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Multi Date Range", type: "multidaterange" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Rich Text", type: "markdown" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Link", type: "link" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Image", type: "image" }),
      environment === 'document' && /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Preview", type: "preview" }), /*#__PURE__*/

      _jsx(_PropertyOption.default, { label: "Media", type: "media" }), /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Geolocation", type: "geolocation" }),
      this.props.project === 'cejil' && /*#__PURE__*/
      _jsx(_PropertyOption.default, { label: "Violated articles", type: "nested" }), /*#__PURE__*/

      _jsx(_PropertyOption.default, { label: "Generated ID", type: "generatedid" })),

      this.props.noRelationtypes && /*#__PURE__*/
      _jsx("div", { className: "alert alert-warning" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "No relationship types warning" }, void 0, "Relationship fields can not be added untill you have at least one relationship type to select.")))))))));













  }}exports.TemplateCreator = TemplateCreator;


TemplateCreator.defaultProps = {
  relationType: false,
  noRelationtypes: true,
  noDictionaries: true,
  project: '',
  syncedTemplate: false };













TemplateCreator.contextTypes = {
  router: _propTypes.default.object };


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ resetTemplate: _templateActions.resetTemplate, saveTemplate: _templateActions.saveTemplate, saveRelationType: _relationTypeActions.saveRelationType }, dispatch);
}

const mapStateToProps = ({ settings, relationTypes, thesauris, template }, props) => ({
  project: settings.collection.toJS().project,
  noRelationtypes: !relationTypes.size,
  noDictionaries: !thesauris.size,
  syncedTemplate: !props.relationType && template.data.synced });var _default =


(0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.HTML5Backend)(
(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TemplateCreator));exports.default = _default;