"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TranslationsList = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _I18N = require("../../I18N");
var _advancedSort = require("../../utils/advancedSort");
var _UI = require("../../UI");

var _notificationsActions = require("../../Notifications/actions/notificationsActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class TranslationsList extends _react.Component {
  render() {
    const { settings, translations } = this.props;
    const defaultLanguage = settings.
    get('languages').
    find((lang) => lang.get('default')).
    get('key');
    const defaultTranslation = translations.find(
    (translation) => translation.get('locale') === defaultLanguage);

    const contexts = (0, _advancedSort.advancedSort)(
    defaultTranslation.
    get('contexts').
    toJS().
    map((c) => {
      c.sort = c.type + c.label;
      return c;
    }),
    { property: 'sort' });

    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content without-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "TranslationsList panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, (0, _I18N.t)('System', 'Translations')), /*#__PURE__*/
      _jsx("ul", { className: "list-group relation-types" }, void 0,
      contexts.map((context, index) => /*#__PURE__*/
      _jsx("li", { className: "list-group-item" }, index, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("span", { className: "item-type item-type-empty" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "item-type__name" }, void 0, context.type)), /*#__PURE__*/

      _jsx(_I18N.I18NLink, { to: `/settings/translations/edit/${encodeURIComponent(context.id)}` }, void 0,
      context.label)), /*#__PURE__*/


      _jsx("div", { className: "list-group-item-actions" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `/settings/translations/edit/${encodeURIComponent(context.id)}`,
        className: "btn btn-default btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "language" }), " ", (0, _I18N.t)('System', 'Translate')))))))));








  }}exports.TranslationsList = TranslationsList;








function mapStateToProps(state) {
  return {
    translations: state.translations,
    settings: state.settings.collection };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ notify: _notificationsActions.notify }, dispatch);
}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(TranslationsList);exports.default = _default;