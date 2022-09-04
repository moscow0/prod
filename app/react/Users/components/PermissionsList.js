"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PermissionsList = void 0;var _react = _interopRequireDefault(require("react"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _Modal = _interopRequireDefault(require("../../Layout/Modal"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}









const permissionsByRole = [
{
  label: 'Create new entities and upload documents',
  roles: { admin: 'full', editor: 'full', collaborator: 'full' } },

{
  label: 'Create table of contents',
  roles: { admin: 'full', editor: 'full', collaborator: 'full' } },

{
  label: 'View entities',
  roles: { admin: 'full', editor: 'full', collaborator: 'partial' } },

{
  label: 'Edit metadata of entities',
  roles: { admin: 'full', editor: 'full', collaborator: 'partial' } },

{
  label: 'Delete entities and documents',
  roles: { admin: 'full', editor: 'full', collaborator: 'partial' } },

{
  label: 'Share edit access with other users',
  roles: { admin: 'full', editor: 'full', collaborator: 'partial' } },

{
  label: 'Create connections and references',
  roles: { admin: 'full', editor: 'full', collaborator: 'partial' } },

{
  label: 'Share entities with the public',
  roles: { admin: 'full', editor: 'full', collaborator: 'none' } },

{
  label: 'Manage site settings and configuration',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } },

{
  label: 'Add/delete users and assign roles',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } },

{
  label: 'Configure filters',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } },

{
  label: 'Add/edit translations',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } },

{
  label: 'Configure templates ',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } },

{
  label: 'Create and edit thesauri',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } },

{
  label: 'Create connection types',
  roles: { admin: 'full', editor: 'none', collaborator: 'none' } }];



const permissionIcons = {
  full: { icon: 'check', className: 'label-success' },
  partial: { icon: 'user-check', className: 'label-info' },
  none: { icon: 'times', className: 'label-warning' } };











const PermissionsList = ({
  isOpen,
  onClose,
  rolePermissions = permissionsByRole }) => /*#__PURE__*/

_jsx(_Modal.default, { isOpen: isOpen, type: "content", className: "permissions-modal" }, void 0, /*#__PURE__*/
_jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
_jsx("table", { className: "permissions-list" }, void 0, /*#__PURE__*/
_jsx("thead", {}, void 0, /*#__PURE__*/
_jsx("tr", {}, void 0, /*#__PURE__*/
_jsx("th", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Permission")), /*#__PURE__*/

_jsx("th", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Collaborator")), /*#__PURE__*/

_jsx("th", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Editor")), /*#__PURE__*/

_jsx("th", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Admin")))), /*#__PURE__*/



_jsx("tbody", {}, void 0,
rolePermissions.map((permission) => /*#__PURE__*/
_jsx("tr", {}, permission.label, /*#__PURE__*/
_jsx("td", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, permission.label)),

['collaborator', 'editor', 'admin'].map((role) => {
  const roleIcon =
  permissionIcons[permission.roles[role]];
  return /*#__PURE__*/(
    _jsx("td", {}, role, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: roleIcon.icon, className: roleIcon.className })));


}))))), /*#__PURE__*/




_jsx("div", { className: "legend" }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Legend"), /*#__PURE__*/
_jsx("div", { className: "legend-item" }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "user-check", className: "label-info" }),
'  ', /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Permission on entities explicitly shared with the user")))), /*#__PURE__*/



_jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
_jsx("button", { type: "button", className: "btn btn-default pristine", onClick: onClose }, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Close"))));exports.PermissionsList = PermissionsList;