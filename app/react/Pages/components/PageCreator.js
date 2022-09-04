"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PageCreator = void 0;var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));

var _UI = require("../../UI");
var _ReactReduxForms = require("../../ReactReduxForms");
var _pageActions = require("../actions/pageActions");




var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _Layout = require("../../Layout");
var _I18N = require("../../I18N");


var _ValidatePage = _interopRequireDefault(require("./ValidatePage"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const mapStateToProps = ({ page }) => ({
  page,
  formState: page.formState,
  savingPage: page.uiState.get('savingPage') });


const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{ resetPage: _pageActions.resetPage, savePage: _pageActions.savePage, updateValue: _pageActions.updateValue },
dispatch);


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



class PageCreator extends _react.Component {
  componentWillUnmount() {
    const { resetPage } = this.props;
    resetPage();
  }

  render() {
    const { formState, page, savePage, updateValue, savingPage } = this.props;
    const backUrl = '/settings/pages';
    const pageUrl = `/page/${page.data.sharedId}/${_lodash.default.kebabCase(page.data.title)}`;

    let nameGroupClass = 'template-name form-group';
    if (
    formState.title &&
    !formState.title.valid && (
    formState.submitFailed || formState.title.touched))
    {
      nameGroupClass += ' has-error';
    }

    return /*#__PURE__*/(
      _jsx("div", { className: "page-creator" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, { model: "page.data", onSubmit: savePage, validators: (0, _ValidatePage.default)() }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "metadataTemplate-heading panel-heading" }, void 0, /*#__PURE__*/
      _jsx("div", { className: nameGroupClass }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".title" }, void 0, /*#__PURE__*/
      _jsx("input", { placeholder: "Page name", className: "form-control" })))), /*#__PURE__*/



      _jsx("div", { className: "panel-body page-viewer document-viewer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "entity-view" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Enable this page to be used as an entity view page:"), /*#__PURE__*/
      _jsx(_reactReduxForm.Control, {
        model: ".entityView",
        component: _UI.ToggleButton,
        checked: Boolean(page.data.entityView),
        onClick: () => {
          updateValue('.entityView', !page.data.entityView);
        } })), /*#__PURE__*/


      _jsx(_ShowIf.default, { if: Boolean(page.data._id) && !page.data.entityView }, void 0, /*#__PURE__*/
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "angle-right" }), " ", pageUrl, "\xA0", /*#__PURE__*/

      _jsx("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: pageUrl,
        className: "pull-right" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "(view page)")))), /*#__PURE__*/



      _jsx(_ReactReduxForms.MarkDown, {
        htmlOnViewer: true,
        model: ".metadata.content",
        rows: 18,
        showPreview: !page.data.entityView }), /*#__PURE__*/

      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Use"), ' ', /*#__PURE__*/
      _jsx("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://guides.github.com/features/mastering-markdown/" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Markdown")),
      ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "syntax to create page content"), /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You can also embed advanced components like maps, charts and entity lists in your page."), "\xA0", /*#__PURE__*/




      _jsx("a", {
        target: "_blank",
        rel: "noopener noreferrer",
        href: "https://uwazi.readthedocs.io/en/latest/admin-docs/analysing-and-visualising-your-collection.html" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Click here")),
      ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "to learn more about the components."))), /*#__PURE__*/


      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("span", { className: "form-group-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Page Javascript"))), /*#__PURE__*/


      _jsx("div", { className: "alert alert-warning" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "With great power comes great responsibility!"), /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This area allows you to append custom Javascript to the page. This opens up a new universe of possibilities."), /*#__PURE__*/



      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "It could also very easily break the app. Only write code here if you know exactly what you are doing."))), /*#__PURE__*/





      _jsx(_reactReduxForm.Field, { model: ".metadata.script" }, void 0, /*#__PURE__*/
      _jsx("textarea", {
        placeholder: "// Javascript - With great power comes great responsibility!",
        className: "form-control",
        rows: 12 }))))), /*#__PURE__*/





      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx(_Layout.BackButton, { to: backUrl, className: "btn-plain" })), /*#__PURE__*/

      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: backUrl, className: "btn btn-extra-padding btn-default" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("button", {
        type: "submit",
        className: "btn btn-extra-padding btn-success save-template",
        disabled: !!savingPage }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save"))))))));







  }}


const container = connector(PageCreator);exports.PageCreator = container;