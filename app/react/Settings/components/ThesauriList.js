"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ThesauriList = void 0;exports.mapStateToProps = mapStateToProps;var _I18N = require("../../I18N");
var _thesaurisActions = require("../../Thesauri/actions/thesaurisActions");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _UI = require("../../UI");
var _sortThesauri = _interopRequireDefault(require("../utils/sortThesauri"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ThesauriList extends _react.Component {
  getThesaurusSuggestionActions(thesaurus) {
    const showSuggestions =
    this.props.topicClassificationEnabled || thesaurus.enable_classification;
    return (
      showSuggestions && /*#__PURE__*/
      _jsx("div", { className: "vertical-line" }, void 0,
      thesaurus.enable_classification && /*#__PURE__*/
      _jsx("span", { className: "thesaurus-suggestion-count" }, void 0,
      thesaurus.suggestions ? thesaurus.suggestions.toLocaleString() : 'No', "\xA0",
      (0, _I18N.t)('System', 'documents to be reviewed')), /*#__PURE__*/


      _jsx(_I18N.I18NLink, {
        to: `/settings/dictionaries/cockpit/${thesaurus._id}`,
        className: "btn btn-default btn-xs" }, void 0, /*#__PURE__*/

      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Configure suggestions')))));




  }

  getThesaurusModifyActions(thesaurus) {
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `/settings/dictionaries/edit/${thesaurus._id}`,
        className: "btn btn-default btn-xs",
        confirmTitle:
        thesaurus.enable_classification ? 'Confirm edit suggestion-enabled Thesaurus' : '',

        confirmMessage:
        thesaurus.enable_classification ?
        'Uwazi suggests labels based on the current content of the document collection and its metadata. ' +
        'Editing this thesaurus, the content of the documents or other metadata can affect Uwazi’s understanding of what to suggest.' :
        '' }, void 0, /*#__PURE__*/


      _jsx(_UI.Icon, { icon: "pencil-alt" }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Edit'))),

      '  ', /*#__PURE__*/
      _jsx("button", {
        onClick: this.deleteThesaurus.bind(this, thesaurus),
        className: "btn btn-danger btn-xs template-remove",
        type: "button" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Delete')))));



  }

  deleteThesaurus(thesaurus) {
    return this.props.
    checkThesaurusCanBeDeleted(thesaurus).
    then(() => {
      this.context.confirm({
        accept: () => {
          this.props.deleteThesaurus(thesaurus);
        },
        title: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Confirm delete thesaurus:"), "\xA0", thesaurus.name),


        message: 'Are you sure you want to delete this thesaurus?' });

    }).
    catch(() => {
      this.context.confirm({
        accept: () => {},
        noCancel: true,
        title: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Cannot delete thesaurus:\xA0"), "\xA0", thesaurus.name),


        message: 'This thesaurus is being used in document types and cannot be deleted.' });

    });
  }

  thesaurusNode(thesaurus) {
    return /*#__PURE__*/(
      _jsx("tr", {}, thesaurus.name, /*#__PURE__*/
      _jsx("th", { scope: "row" }, void 0, thesaurus.name), /*#__PURE__*/
      _jsx("td", {}, void 0, this.getThesaurusSuggestionActions(thesaurus)), /*#__PURE__*/
      _jsx("td", {}, void 0, this.getThesaurusModifyActions(thesaurus))));


  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "flex panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, (0, _I18N.t)('System', 'Thesauri')), /*#__PURE__*/
      _jsx("div", { className: "thesauri-list" }, void 0, /*#__PURE__*/
      _jsx("table", {}, void 0, /*#__PURE__*/
      _jsx("thead", {}, void 0, /*#__PURE__*/
      _jsx("tr", {}, void 0, /*#__PURE__*/
      _jsx("th", { className: "nameCol", scope: "col" }), /*#__PURE__*/
      _jsx("th", { scope: "col" }), /*#__PURE__*/
      _jsx("th", { scope: "col" }))), /*#__PURE__*/


      _jsx("tbody", {}, void 0,
      (0, _sortThesauri.default)(this.props.dictionaries.toJS()).map((thesaurus) =>
      this.thesaurusNode(thesaurus))))), /*#__PURE__*/




      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings/dictionaries/new", className: "btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Add thesaurus')))))));





  }}exports.ThesauriList = ThesauriList;









ThesauriList.contextTypes = {
  confirm: _propTypes.default.func };


function mapStateToProps(state) {
  return {
    dictionaries: state.dictionaries,
    topicClassificationEnabled: (state.settings.collection.toJS().features || {}).
    topicClassification };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    deleteThesaurus: _thesaurisActions.deleteThesaurus,
    checkThesaurusCanBeDeleted: _thesaurisActions.checkThesaurusCanBeDeleted },

  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ThesauriList);exports.default = _default;