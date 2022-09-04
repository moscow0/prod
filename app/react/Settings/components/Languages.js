"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Languages = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _languagesList = require("../../../shared/languagesList");
var _Warning = _interopRequireDefault(require("../../Layout/Warning"));
var _Tip = _interopRequireDefault(require("../../Layout/Tip"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Languages extends _react.Component {
  static defaultLanguage() {
    return /*#__PURE__*/(
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Default language"), /*#__PURE__*/
      _jsx(_Tip.default, { position: "right" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Default language description" }, void 0, "This language will be used as default translation when adding new languages, and the default language for the site when no other language has been selected."))));






  }

  static notSupportedLanguage() {
    return /*#__PURE__*/(
      _jsx(_Warning.default, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Some adavanced search features may not be available for this language.")));




  }

  constructor(props) {
    super(props);
    this.state = {
      languageToDelete: {},
      languageToAdd: {} };

  }

  setAsDeafultButton(language) {
    return /*#__PURE__*/(
      _jsx("button", {
        type: "button",
        onClick: this.setDefault.bind(this, language),
        className: "btn btn-success btn-xs template-remove" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { prefix: "far", icon: "star" }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Set as default"))));



  }

  setDefault(language) {
    this.props.setDefaultLanguage(language.key);
  }

  deleteButton(language) {
    return /*#__PURE__*/(
      _jsx("button", {
        disabled: language.key === this.props.locale,
        className: "btn btn-danger btn-xs template-remove",
        onClick: this.deleteLanguage.bind(this, language),
        type: "button" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Delete language"))));



  }

  deleteLanguage(language) {
    this.context.confirm({
      accept: () => this.props.deleteLanguage(language.key),
      title: /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Confirm delete "), " ", language.label),


      message: /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Are you sure you want to delete"), "\xA0",
      language.label, " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, " language? "), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This action may take some time, can not be undone and will delete all the information in that language.")),





      extraConfirm: true });

  }

  addLanguage({ key, label, localized_label: localizedLabel, rtl }) {
    this.context.confirm({
      accept: () => this.props.addLanguage({ key, label, localized_label: localizedLabel, rtl }),
      title: /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Confirm add"), "\xA0", label),


      message:
      'This action may take some time while we add the extra language to the entire collection.',
      extraConfirm: true,
      type: 'success' });

  }

  render() {
    const currentLanguages = this.props.languages.toJS();
    const currentLanguagesIsos = currentLanguages.map((l) => l.key);
    const elasticSupportedIsos = Object.keys(_languagesList.elasticLanguages).map(
    (k) => _languagesList.elasticLanguages[k].ISO639_1);

    const filteredLanguagesList = _languagesList.availableLanguages.filter((l) => !currentLanguagesIsos.includes(l.key));
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content without-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Active Languages")), /*#__PURE__*/

      _jsx("ul", { className: "list-group document-types" }, void 0,
      currentLanguages.map((language, index) => /*#__PURE__*/
      _jsx("li", { className: "list-group-item" }, index, /*#__PURE__*/
      _jsx("span", { className: "force-ltr" }, void 0, `${language.label} (${language.key})`),
      language.default ? Languages.defaultLanguage() : '', /*#__PURE__*/
      _jsx("div", { className: "list-group-item-actions" }, void 0,
      !language.default ? this.setAsDeafultButton(language) : '',
      !language.default ? this.deleteButton(language) : '')))), /*#__PURE__*/




      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Available Languages")), /*#__PURE__*/

      _jsx("ul", { className: "list-group document-types" }, void 0,
      filteredLanguagesList.map((language, index) => {
        const notSupported = !elasticSupportedIsos.includes(language.key);
        return /*#__PURE__*/(
          _jsx("li", { className: "list-group-item" }, index, /*#__PURE__*/
          _jsx("span", { className: "force-ltr" }, void 0,
          `${language.label} (${language.key}) `,
          notSupported ? Languages.notSupportedLanguage() : ''), /*#__PURE__*/

          _jsx("div", { className: "list-group-item-actions" }, void 0, "\xA0", /*#__PURE__*/

          _jsx("button", {
            type: "button",
            onClick: this.addLanguage.bind(this, language),
            className: "btn btn-success btn-xs template-remove" }, void 0, /*#__PURE__*/

          _jsx(_UI.Icon, { icon: "plus" }), "\xA0", /*#__PURE__*/

          _jsx("span", {}, void 0, /*#__PURE__*/
          _jsx(_I18N.Translate, {}, void 0, "Add language"))))));





      })))));




  }}exports.Languages = Languages;


Languages.contextTypes = {
  confirm: _propTypes.default.func };










function mapStateToProps(state) {
  const { settings, locale } = state;
  return { languages: settings.collection.get('languages'), locale };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    addLanguage: _I18N.actions.addLanguage,
    deleteLanguage: _I18N.actions.deleteLanguage,
    setDefaultLanguage: _I18N.actions.setDefaultLanguage },

  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Languages);exports.default = _default;