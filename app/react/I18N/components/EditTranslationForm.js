"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.EditTranslationForm = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactReduxForm = require("react-redux-form");
var _reactRedux = require("react-redux");
var _ = require("./..");
var _Layout = require("../../Layout");
var _UI = require("../../UI");

var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));
var _SelectFileButton = require("../../App/SelectFileButton");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class EditTranslationForm extends _react.Component {
  static getDefaultTranslation(translations, languages) {
    const defaultLocale = languages.find((lang) => lang.default).key;
    return translations.find((tr) => tr.locale === defaultLocale);
  }

  static translationExists(translations, locale) {
    return translations.find((tr) => tr.locale === locale);
  }

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.importTranslationsFile = this.importTranslationsFile.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.translationsForm.length !== nextProps.translationsForm.length;
  }

  componentWillUnmount() {
    this.props.resetForm();
  }

  importTranslationsFile(file) {
    this.props.importTranslations(this.props.context, file);
  }

  prepareTranslations() {
    const { translationsForm, settings } = this.props;

    if (translationsForm.length) {
      const { languages } = settings.collection.toJS();
      languages.forEach((lang) => {
        if (!EditTranslationForm.translationExists(translationsForm, lang.key)) {
          const defaultTranslation = EditTranslationForm.getDefaultTranslation(
          translationsForm,
          languages);

          const translation = {
            locale: lang.key,
            values: _objectSpread({}, defaultTranslation.values) };


          translationsForm.push(translation);
        }
      });
    }

    return translationsForm;
  }

  save(_translations) {
    const translations = _translations.map((translationLanguage) => _objectSpread(_objectSpread({},
    translationLanguage), {}, {
      contexts: translationLanguage.contexts.filter((ctx) => ctx.id === this.props.context) }));

    this.props.saveTranslations(translations);
  }

  render() {
    const contextId = this.props.context;
    let defaultTranslationContext = { values: [] };

    const translations = this.prepareTranslations.call(this);
    if (translations.length) {
      defaultTranslationContext =
      translations[0].contexts.find((ctx) => ctx.id === contextId) || defaultTranslationContext;
    }

    const importButton =
    contextId === 'System' ? /*#__PURE__*/
    _jsx(_SelectFileButton.SelectFileButton, { onFileImported: this.importTranslationsFile }, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn btn-default import-template" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "upload" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_.Translate, {}, void 0, "Import")))) :




    false;


    const contextKeys = Object.keys(defaultTranslationContext.values);

    const contextName = defaultTranslationContext.label;
    return /*#__PURE__*/(
      _jsx("div", { className: "EditTranslationForm" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, { model: "translationsForm", onSubmit: this.save }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0,
      (0, _.t)('System', 'Translations'), " ", /*#__PURE__*/_jsx(_UI.Icon, { icon: "angle-right" }), " ", contextName), /*#__PURE__*/

      _jsx("ul", { className: "list-group" }, void 0,
      (() => {
        if (translations.length) {
          return contextKeys.sort().map((value) => /*#__PURE__*/
          _jsx("li", { className: "list-group-item" }, value, /*#__PURE__*/
          _jsx("h5", {}, void 0, value),
          translations.map((translation, i) => {
            const context = translation.contexts.find((ctx) => ctx.id === contextId);
            const index = translation.contexts.indexOf(context);
            return /*#__PURE__*/(
              _jsx(_FormGroup.default, {}, `${translation.locale}-${value}-${i}`, /*#__PURE__*/
              _jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
              _jsx("span", { className: "input-group-addon" }, void 0, translation.locale), /*#__PURE__*/
              _jsx(_reactReduxForm.Field, {
                model: ['translationsForm', i, 'contexts', index, 'values', value] }, void 0, /*#__PURE__*/

              _jsx("input", { className: "form-control", type: "text" })))));




          })));


        }
      })())), /*#__PURE__*/


      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx(_Layout.BackButton, { to: "/settings/translations", className: "btn-plain" }),
      importButton), /*#__PURE__*/

      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx(_.I18NLink, { to: "/settings/translations", className: "btn btn-extra-padding btn-default" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("button", { type: "submit", className: "btn btn-extra-padding btn-success save-template" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_.Translate, {}, void 0, "Save"))))))));







  }}exports.EditTranslationForm = EditTranslationForm;












function mapStateToProps({ translationsForm, translationsFormState, settings }) {
  return {
    translationsForm,
    settings,
    formState: translationsFormState };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    saveTranslations: _.actions.saveTranslations,
    resetForm: _.actions.resetForm,
    importTranslations: _.actions.importTranslations },

  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EditTranslationForm);exports.default = _default;