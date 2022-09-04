"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.SnippetList = exports.MetadataFieldSnippets = exports.DocumentContentSnippets = void 0;

var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _I18N = require("../../I18N");
var _SafeHTML = _interopRequireDefault(require("../../utils/SafeHTML"));
var _getFieldLabel = _interopRequireDefault(require("../../Templates/utils/getFieldLabel"));
var _immutable = _interopRequireDefault(require("immutable"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const MetadataFieldSnippets = ({ fieldSnippets, documentViewUrl, template, searchTerm }) => /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx("li", { className: "snippet-list-item-header metadata-snippet-header" }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: `${documentViewUrl}?searchTerm=${searchTerm}` }, void 0,
(0, _getFieldLabel.default)(fieldSnippets.get('field'), template))),


fieldSnippets.get('texts').map((snippet, index) => /*#__PURE__*/
_jsx("li", { className: "snippet-list-item metadata-snippet" }, index, /*#__PURE__*/
_jsx("span", {}, void 0, /*#__PURE__*/
_jsx(_SafeHTML.default, {}, void 0, snippet)))));exports.MetadataFieldSnippets = MetadataFieldSnippets;






MetadataFieldSnippets.defaultProps = {
  searchTerm: '' };











MetadataFieldSnippets.defaultProps = {
  template: undefined };


const DocumentContentSnippets = ({
  selectSnippet,
  documentSnippets,
  documentViewUrl,
  searchTerm,
  selectedSnippet }) => /*#__PURE__*/

_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx("li", { className: "snippet-list-item-header fulltext-snippet-header" }, void 0,
(0, _I18N.t)('System', 'Document contents')),

documentSnippets.map((snippet, index) => {
  const selected = snippet.get('text') === selectedSnippet.get('text') ? 'selected' : '';
  return /*#__PURE__*/(
    _jsx("li", { className: `snippet-list-item fulltext-snippet ${selected}` }, index, /*#__PURE__*/
    _jsx(_I18N.I18NLink, {
      onClick: () => selectSnippet(snippet.get('page'), snippet),
      to: `${documentViewUrl}?page=${snippet.get('page')}&searchTerm=${searchTerm || ''}` }, void 0, /*#__PURE__*/

    _jsx("span", { className: "page-number" }, void 0, snippet.get('page')), /*#__PURE__*/
    _jsx("span", { className: "snippet-text" }, void 0, /*#__PURE__*/
    _jsx(_SafeHTML.default, {}, void 0, snippet.get('text'))))));




}));exports.DocumentContentSnippets = DocumentContentSnippets;















const SnippetList = ({
  snippets,
  documentViewUrl,
  searchTerm,
  selectSnippet,
  template,
  selectedSnippet }) => /*#__PURE__*/

_jsx("ul", { className: "snippet-list" }, void 0,
snippets.get('metadata').map((fieldSnippets) => /*#__PURE__*/
_jsx(MetadataFieldSnippets, {

  fieldSnippets: fieldSnippets,
  template: template,
  documentViewUrl: documentViewUrl,
  searchTerm: searchTerm }, fieldSnippets.get('field'))),


snippets.get('fullText').size ? /*#__PURE__*/
_jsx(DocumentContentSnippets, {
  documentSnippets: snippets.get('fullText'),
  documentViewUrl: documentViewUrl,
  selectSnippet: selectSnippet,
  selectedSnippet: selectedSnippet,
  searchTerm: searchTerm }) :


'');exports.SnippetList = SnippetList;



















SnippetList.defaultProps = {
  template: undefined };


const mapStateToProps = (state, ownProps) => ({
  template: state.templates.find((tmpl) => tmpl.get('_id') === ownProps.doc.get('template')),
  selectedSnippet: state.documentViewer.uiState.get('snippet') });exports.mapStateToProps = mapStateToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps)(SnippetList);exports.default = _default;