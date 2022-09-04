"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");
var _ = require("./..");

var _Forms = require("../../Forms");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const prepareDropdownValues = (languageMap, locale, user) => {
  const languages = languageMap.toJS();

  const selectedLanguage =
  languages.find((lang) => lang.key === locale) || languages.find((lang) => lang.default);

  const loggedUser = user.get('_id') && user.get('role') !== 'collaborator';

  if (loggedUser) {
    languages.push({ label: 'Live translate', key: 'livetranslate', type: 'livetranslate' });
  }

  return { languages, selectedLanguage, loggedUser };
};

const listItem = (item, i18nmode) => {
  if (!item.type) {
    return /*#__PURE__*/_jsx("span", {}, void 0, item.localized_label || item.label);
  }

  return /*#__PURE__*/(
    _jsx("div", { className: "live-translate" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "circle", className: i18nmode ? 'live-on' : 'live-off' }), /*#__PURE__*/
    _jsx(_.Translate, {}, void 0, item.label)));


};
class I18NMenu extends _react.Component {
  static reload(url) {
    window.location.href = url;
  }

  render() {
    const {
      languages: languageMap,
      locale,
      location,
      i18nmode,
      toggleInlineEdit,
      user } =
    this.props;

    const { languages, selectedLanguage, loggedUser } = prepareDropdownValues(
    languageMap,
    locale,
    user);


    if (location.search.match(/page=/)) {
      const cleanSearch = location.search.split(/page=\d+|&page=\d+/).join('');
      location.search = cleanSearch === '?' ? '' : cleanSearch;
    }

    const regexp = new RegExp(`^/?${locale}/|^/?${locale}$`);
    const path = location.pathname.replace(regexp, '/');

    if (languageMap.size === 0) {
      return null;
    }
    return languageMap.count() > 1 || user.size ? /*#__PURE__*/
    _jsx("div", {
      className: `menuNav-I18NMenu ${!loggedUser === false ? ' only-language' : ' '} ${
      languageMap.count() === 1 ? ' one-language' : ' '
      } `,
      role: "navigation",
      "aria-label": "Languages" }, void 0,

    !i18nmode && /*#__PURE__*/
    _jsx(_Forms.DropdownList, {
      data: languages,
      id: "key",
      defaultValue: selectedLanguage,
      textField: "localized_label",
      className: "menuNav-language",
      itemComponent: ({ item }) => listItem(item),
      valueField: "key",
      valueComponent: ({ item }) => listItem(item),
      onSelect: (selected) => {
        if (selected.type === 'livetranslate') {
          toggleInlineEdit();
        } else {
          const url = `/${selected.key}${path}${
          path.match('document') ? '' : location.search
          }`;
          I18NMenu.reload(url);
        }
      } }),


    i18nmode && /*#__PURE__*/
    _jsx("div", { className: "menuNav-language" }, void 0, /*#__PURE__*/
    _jsx("button", {
      className: "singleItem",
      type: "button",
      onClick: toggleInlineEdit,
      "aria-label": (0, _.t)('System', 'Turn off inline translation', null, false) }, void 0, /*#__PURE__*/

    _jsx("div", { className: "live-translate" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "circle", className: i18nmode ? 'live-on' : 'live-off' }))), /*#__PURE__*/


    _jsx("span", { className: "singleItem" }, void 0, /*#__PURE__*/
    _jsx(_.Translate, {}, void 0, "Live translate")))) : /*#__PURE__*/





    _jsx("div", { className: "no-i18nmenu" });

  }}


I18NMenu.defaultProps = {
  locale: null };











function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ toggleInlineEdit: _.actions.toggleInlineEdit }, dispatch);
}

function mapStateToProps(state) {
  return {
    languages: state.settings.collection.get('languages'),
    i18nmode: state.inlineEdit.get('inlineEdit'),
    locale: state.locale,
    user: state.user };

}var _default =

(0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(I18NMenu));exports.default = _default;