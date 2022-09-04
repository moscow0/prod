"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserGroupSidePanel = void 0;var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../../UI");
var _reactHookForm = require("react-hook-form");

var _I18N = require("../../../I18N");
var _Layout = require("../../../Layout");
var _MultiSelect = require("../../../Forms/components/MultiSelect");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}












const sortByName = (members) =>
members.sort((m1, m2) => (m1.username || '').localeCompare(m2.username || ''));

const mapUserIds = (members) =>
members.map((member) => member.refId ? member.refId.toString() : '');

const UserGroupSidePanel = ({
  userGroup,
  users,
  userGroups,
  opened,
  closePanel,
  onSave,
  onDelete }) =>
{
  const [selectedUsers, setSelectedUsers] = (0, _react.useState)(mapUserIds(userGroup.members));
  const { register, handleSubmit, errors } = (0, _reactHookForm.useForm)({ defaultValues: userGroup });
  const availableUsers = sortByName(users);

  const saveGroup = (groupToSave) => {
    const updatedMembers = users.
    filter((user) => selectedUsers.includes(user._id)).
    map((user) => ({
      refId: user._id }));

    onSave(_objectSpread(_objectSpread({}, groupToSave), {}, { members: [...updatedMembers] }));
  };

  const isUnique = (nameVal) =>
  !userGroups.find(
  (existingGroup) =>
  existingGroup._id !== userGroup._id &&
  existingGroup.name.trim().toLowerCase() === nameVal.trim().toLowerCase());


  return /*#__PURE__*/(
    _jsx(_Layout.SidePanel, { open: opened }, void 0, /*#__PURE__*/
    _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, `${userGroup._id ? 'Edit' : 'Add'} Group`)), /*#__PURE__*/

    _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
    _jsx("form", { id: "userGroupFrom", className: "user-group-form", onSubmit: handleSubmit(saveGroup) }, void 0, /*#__PURE__*/
    _react.default.createElement("input", { type: "hidden", name: "_id", ref: register }), /*#__PURE__*/
    _jsx("div", { id: "name_field", className: "form-group nested-selector" }, void 0, /*#__PURE__*/
    _jsx("label", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Name of the group")), /*#__PURE__*/

    _react.default.createElement("input", {
      type: "text",
      className: "form-control",
      autoComplete: "off",
      name: "name",
      ref: register({
        required: true,
        validate: isUnique,
        maxLength: 50,
        minLength: 3 }) }),


    errors.name && /*#__PURE__*/
    _jsx("div", { className: "validation-error" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "xs" }),
    errors.name.type === 'required' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Name is required"),
    errors.name.type === 'validate' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Duplicated name"),
    errors.name.type === 'maxLength' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Name is too long"),
    errors.name.type === 'minLength' && /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Name is too short"))), /*#__PURE__*/



    _jsx("div", { className: "search-user" }, void 0, /*#__PURE__*/
    _jsx(_MultiSelect.MultiSelect, {
      placeholder: (0, _I18N.t)('System', 'Add users', null, false),
      options: availableUsers,
      optionsLabel: "username",
      optionsValue: "_id",
      value: selectedUsers,
      onChange: (usersIds) => {
        setSelectedUsers(usersIds);
      },
      optionsToShow: 8,
      sortbyLabel: true })))), /*#__PURE__*/




    _jsx("div", { className: "sidepanel-footer" }, void 0,
    userGroup._id && /*#__PURE__*/
    _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
    _jsx(_Layout.ConfirmButton, {
      id: "deleteBtn",
      className: "btn btn-danger",
      action: () => onDelete(userGroup) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "trash-alt" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Delete")))), /*#__PURE__*/




    _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
    _jsx("button", {
      id: "discardChangesBtn",
      type: "button",
      className: "btn btn-default",
      onClick: closePanel,
      "aria-label": "Close side panel" }, void 0, /*#__PURE__*/

    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


    _jsx("button", {
      id: "saveChangesBtn",
      type: "submit",
      form: "userGroupFrom",
      className: "btn btn-success" }, void 0, /*#__PURE__*/

    _jsx("span", { id: "submitLabel", className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Save")))))));






};exports.UserGroupSidePanel = UserGroupSidePanel;