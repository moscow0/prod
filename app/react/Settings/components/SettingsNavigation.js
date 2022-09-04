"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SettingsNavigation = void 0;var _react = _interopRequireDefault(require("react"));
var _I18N = require("../../I18N");
var _Auth = require("../../Auth");
var _UI = require("../../UI");
var _FeatureToggle = require("../../components/Elements/FeatureToggle");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const SettingsNavigation = () => /*#__PURE__*/
_jsx("div", {}, void 0, /*#__PURE__*/
_jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
_jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Settings")), /*#__PURE__*/

_jsx("div", { className: "list-group" }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/account", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Account")), /*#__PURE__*/

_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/users", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Users"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/collection", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Collection"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/navlinks", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Menu"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/pages", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Pages"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/languages", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Languages"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/translations", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Translations"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/filters", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Filters configuration"))))), /*#__PURE__*/




_jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Metadata"))), /*#__PURE__*/


_jsx("div", { className: "list-group" }, void 0, /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/templates", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Templates"))), /*#__PURE__*/


_jsx(_FeatureToggle.FeatureToggle, { feature: "metadataExtraction.url" }, void 0, /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, {
  to: "settings/metadata_extraction",
  activeClassName: "active",
  className: "list-group-item" }, void 0, /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Metadata Extraction")))), /*#__PURE__*/



_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/dictionaries", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Thesauri"))), /*#__PURE__*/


_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/connections", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Relationship types")))), /*#__PURE__*/




_jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Tools")), /*#__PURE__*/

_jsx("div", { className: "list-group" }, void 0, /*#__PURE__*/
_jsx(_FeatureToggle.FeatureToggle, { feature: "preserve.host" }, void 0, /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "/settings/preserve", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Preserve Extension"), " ", /*#__PURE__*/_jsx(_UI.Icon, { icon: "square" })))), /*#__PURE__*/



_jsx(_Auth.NeedAuthorization, { roles: ['admin'] }, void 0, /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "settings/activitylog", activeClassName: "active", className: "list-group-item" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Activity log")), /*#__PURE__*/

_jsx(_I18N.I18NLink, {
  to: "/settings/customisation",
  activeClassName: "active",
  className: "list-group-item" }, void 0, /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Global CSS")), /*#__PURE__*/

_jsx(_I18N.I18NLink, {
  to: "/settings/custom-uploads",
  activeClassName: "active",
  className: "list-group-item" }, void 0, /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Uploads"))), /*#__PURE__*/


_jsx("a", {
  className: "list-group-item",
  href: "https://uwazi.readthedocs.io/en/latest/",
  target: "_blank",
  rel: "noopener noreferrer" }, void 0, /*#__PURE__*/

_jsx("span", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Documentation"), " ", /*#__PURE__*/_jsx(_UI.Icon, { icon: "external-link-alt" }))))));exports.SettingsNavigation = SettingsNavigation;