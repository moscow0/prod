"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserSidePanel = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactHookForm = require("react-hook-form");
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _Layout = require("../../Layout");
var _userSchema = require("../../../shared/types/userSchema");

var _MultiSelect = require("../../Forms/components/MultiSelect");

var _PermissionsList = require("./PermissionsList");
var _UserManagement = require("../UserManagement");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}













const UserSidePanel = ({
  user,
  users,
  groups,
  opened,
  closePanel,
  onSave,
  onDelete,
  onReset2fa,
  onResetPassword }) =>
{
  const [permissionsModalOpened, setPermissionsModalOpened] = (0, _react.useState)(false);
  const [selectedGroups, setSelectedGroups] = (0, _react.useState)(
  user.groups ? user.groups.map((group) => group._id.toString()) : []);

  const { register, handleSubmit, errors } = (0, _reactHookForm.useForm)({ defaultValues: user });
  const availableGroups = groups;
  const userRoles = Object.values(_userSchema.UserRole).map((role) => (0, _I18N.t)('System', role, null, false));

  const saveUser = (userToSave) => {
    const updatedGroups = groups.
    filter((group) => selectedGroups.includes(group._id)).
    map((group) => ({
      _id: group._id,
      name: group.name }));

    onSave(_objectSpread(_objectSpread({}, userToSave), {}, { groups: updatedGroups }));
  };
  const isUnique = (nameVal) =>
  !users.find(
  (existingUser) => {var _existingUser$usernam, _existingUser$email;return (
      existingUser._id !== user._id && (
      ((_existingUser$usernam = existingUser.username) === null || _existingUser$usernam === void 0 ? void 0 : _existingUser$usernam.trim().toLowerCase()) === nameVal.trim().toLowerCase() ||
      ((_existingUser$email = existingUser.email) === null || _existingUser$email === void 0 ? void 0 : _existingUser$email.trim().toLowerCase()) === nameVal.trim().toLowerCase()));});

  const togglePermissionList = () => {
    setPermissionsModalOpened(!permissionsModalOpened);
  };

  return /*#__PURE__*/(
    _jsx(_Layout.SidePanel, { open: opened }, void 0, /*#__PURE__*/
    _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, `${user._id ? 'Edit' : 'Add'} User`)), /*#__PURE__*/

    _jsx("div", { className: `sidepanel-body ${user._id ? 'footer-extra-row' : ''}` }, void 0, /*#__PURE__*/
    _jsx("form", { id: "userFrom", className: "user-form", onSubmit: handleSubmit(saveUser) }, void 0, /*#__PURE__*/
    _react.default.createElement("input", { type: "hidden", name: "_id", ref: register }), /*#__PURE__*/
    _react.default.createElement("input", { type: "hidden", name: "using2fa", ref: register }), /*#__PURE__*/

    _jsx("div", { id: "email_field", className: "form-group nested-selector" }, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Email")), /*#__PURE__*/

    _react.default.createElement("input", {
      type: "email",
      className: "form-control",
      autoComplete: "off",
      name: "email",
      ref: register({
        required: true,
        validate: isUnique,
        maxLength: 256 }) }),


    errors.email && /*#__PURE__*/
    _jsx("div", { className: "validation-error" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "xs" }),
    errors.email.type === 'required' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Email is required"),
    errors.email.type === 'validate' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Duplicated email"),
    errors.email.type === 'pattern' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Invalid email"))), /*#__PURE__*/



    _jsx("div", { id: "role_field", className: "form-group nested-selector" }, void 0, /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Role")), /*#__PURE__*/

    _jsx("button", {
      id: "role-info",
      className: "role-info",
      type: "button",
      onClick: togglePermissionList }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "info-circle" }))), /*#__PURE__*/


    _react.default.createElement("select", { name: "role", className: "form-control", ref: register },
    userRoles.map((role) => /*#__PURE__*/
    _jsx("option", { value: role }, role,
    (0, _I18N.t)('System', _UserManagement.roleTranslationKey[role], null, false))))), /*#__PURE__*/




    _jsx("div", { id: "username_field", className: "form-group nested-selector" }, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Username")), /*#__PURE__*/

    _react.default.createElement("input", {
      type: "text",
      className: "form-control",
      autoComplete: "off",
      name: "username",
      ref: register({
        required: true,
        validate: isUnique,
        maxLength: 50,
        minLength: 3 }) }),


    errors.username && /*#__PURE__*/
    _jsx("div", { className: "validation-error" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "xs" }),
    errors.username.type === 'required' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Username is required"),
    errors.username.type === 'validate' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Duplicated username"),
    errors.username.type === 'maxLength' && /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Username is too long"),

    errors.username.type === 'minLength' && /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Username is too short"))), /*#__PURE__*/




    _jsx("div", { id: "password_field", className: "form-group nested-selector" }, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Password")), /*#__PURE__*/

    _react.default.createElement("input", {
      type: "password",
      className: "form-control",
      autoComplete: "off",
      name: "password",
      ref: register({ maxLength: 50 }) }),

    errors.password && /*#__PURE__*/
    _jsx("div", { className: "validation-error" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "xs" }),
    errors.password.type === 'maxLength' && /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Password is too long"))), /*#__PURE__*/




    _jsx("div", { className: "user-memberships" }, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Groups")), /*#__PURE__*/

    _jsx(_MultiSelect.MultiSelect, {
      options: availableGroups,
      optionsLabel: "name",
      optionsValue: "_id",
      value: selectedGroups,
      onChange: (groupIds) => {
        setSelectedGroups(groupIds);
      },
      optionsToShow: 8,
      sortbyLabel: true }))), /*#__PURE__*/



    _jsx(_PermissionsList.PermissionsList, { isOpen: permissionsModalOpened, onClose: togglePermissionList })), /*#__PURE__*/

    _jsx("div", { className: "sidepanel-footer" }, void 0,
    user._id && /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("div", { className: "footer-extra-row" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
    _jsx(_Layout.ConfirmButton, {
      id: "resetPasswordBtn",
      className: "btn btn-outline-warning",
      action: () => onResetPassword(user) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "key" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Reset Password"))),


    user.using2fa && /*#__PURE__*/
    _jsx(_Layout.ConfirmButton, {
      id: "reset2faBtn",
      className: "btn btn-outline-danger",
      action: () => onReset2fa(user) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "two-factor-auth" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0,
    ' ', /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Reset 2FA"))))), /*#__PURE__*/





    _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
    _jsx(_Layout.ConfirmButton, {
      id: "deleteBtn",
      className: "btn btn-danger",
      action: () => onDelete(user) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "trash-alt" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Delete"))))), /*#__PURE__*/





    _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
    _jsx("button", {
      id: "discardChangesBtn",
      type: "button",
      className: "btn btn-default",
      onClick: closePanel,
      "aria-label": "Cancel" }, void 0, /*#__PURE__*/

    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


    _jsx("button", { id: "saveChangesBtn", type: "submit", form: "userFrom", className: "btn btn-success" }, void 0, /*#__PURE__*/
    _jsx("span", { id: "submitLabel", className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Save")))))));






};exports.UserSidePanel = UserSidePanel;