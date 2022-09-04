"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.EntityTypesList = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactRouter = require("react-router");
var _templatesActions = require("../../Templates/actions/templatesActions");




var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _Notifications = require("../../Notifications");
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class EntityTypesList extends _react.Component {
  setAsDefaultButton(template) {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null,
      !template.synced && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.props.setAsDefault.bind(null, template),
        className: "btn btn-success btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Set as default"))));




  }

  deleteTemplate(template) {
    return this.props.
    checkTemplateCanBeDeleted(template).
    then(() => {
      this.context.confirm({
        accept: () => {
          this.props.deleteTemplate(template);
        },
        title: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Confirm delete of template:"), "\xA0", template.name),


        messageKey: 'confirm delete template',
        message: `Are you sure you want to delete this entity type?
        This will delete the template and all relationship properties from other templates pointing to this one.` });

    }).
    catch(() => {
      this.context.confirm({
        accept: () => {},
        noCancel: true,
        title: /*#__PURE__*/
        _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Can not delete template:"), "\xA0", template.name),


        message: 'This template has associated entities' });

    });
  }

  defaultTemplateMessage() {
    return /*#__PURE__*/(
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Default template"), /*#__PURE__*/
      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This template will be used as default for new entities."))));



  }

  syncedTemplateMessage() {
    return /*#__PURE__*/(
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Synced template"), /*#__PURE__*/
      _jsx(_Tip.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "syncedTemplateListMessage" }, void 0, "The source of this template is a sync. All editing options will be disabled."))));





  }

  deleteTemplateButton(template) {
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null,
      !template.synced && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.deleteTemplate.bind(this, template),
        className: "btn btn-danger btn-xs template-remove" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Delete"))));




  }

  sortTemplates() {
    return this.props.templates.toJS().sort((a, b) => a.name > b.name ? 1 : -1);
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Templates")), /*#__PURE__*/

      _jsx("ul", { className: "list-group document-types" }, void 0,
      this.sortTemplates().map((template, index) => /*#__PURE__*/
      _jsx("li", { className: "list-group-item" }, index, /*#__PURE__*/
      _jsx(_reactRouter.Link, { to: `/settings/templates/edit/${template._id}` }, void 0, template.name),
      template.default ? this.defaultTemplateMessage() : '',
      template.synced ? this.syncedTemplateMessage() : '', /*#__PURE__*/
      _jsx("div", { className: "list-group-item-actions" }, void 0,
      !template.default ? this.setAsDefaultButton(template) : '', /*#__PURE__*/
      _jsx(_reactRouter.Link, {
        to: `/settings/templates/edit/${template._id}`,
        className: "btn btn-default btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Edit")),

      !template.default ? this.deleteTemplateButton(template) : '')))), /*#__PURE__*/




      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx(_reactRouter.Link, { to: "/settings/templates/new", className: "btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add template")))))));






  }}exports.EntityTypesList = EntityTypesList;










EntityTypesList.contextTypes = {
  confirm: _propTypes.default.func };


function mapStateToProps(state) {
  return { templates: state.templates };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(_objectSpread(_objectSpread({},
  _Notifications.notificationActions), {}, { deleteTemplate: _templatesActions.deleteTemplate, checkTemplateCanBeDeleted: _templatesActions.checkTemplateCanBeDeleted, setAsDefault: _templatesActions.setAsDefault }),
  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EntityTypesList);exports.default = _default;