"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserList = void 0;var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _Pill = require("../../Metadata/components/Pill");

var _UserManagement = require("../UserManagement");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const UserList = ({ users, handleSelect, handleAddUser, className }) => {
  const [selectedId, setSelectedId] = (0, _react.useState)();
  const selectRow = (user) => {var _user$_id;
    handleSelect(user);
    setSelectedId((_user$_id = user._id) === null || _user$_id === void 0 ? void 0 : _user$_id.toString());
  };
  const addUser = () => {
    setSelectedId(undefined);
    handleAddUser();
  };
  const sortedUsers = users.sort((a, b) => a.username.localeCompare(b.username));
  return /*#__PURE__*/(
    _jsx("div", { className: "user-list" }, void 0, /*#__PURE__*/
    _jsx("table", { className: className }, void 0, /*#__PURE__*/
    _jsx("thead", {}, void 0, /*#__PURE__*/
    _jsx("tr", {}, void 0, /*#__PURE__*/
    _jsx("th", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Name")), /*#__PURE__*/

    _jsx("th", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Protection")), /*#__PURE__*/

    _jsx("th", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Role")), /*#__PURE__*/

    _jsx("th", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Groups")))), /*#__PURE__*/



    _jsx("tbody", {}, void 0,
    sortedUsers.map((user) => {var _user$_id2, _user$groups;return /*#__PURE__*/(
        _jsx("tr", {
          className: selectedId === user._id ? 'selected' : '',

          onClick: () => selectRow(user) }, (_user$_id2 = user._id) === null || _user$_id2 === void 0 ? void 0 : _user$_id2.toString(), /*#__PURE__*/

        _jsx("td", {}, void 0, user.username), /*#__PURE__*/
        _jsx("td", {}, void 0, /*#__PURE__*/
        _jsx(_Pill.Pill, { color: user.using2fa ? 'palegreen' : 'lightgray' }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, { translationKey: "Password" }, void 0, "Password"),
        user.using2fa && ' + 2FA')), /*#__PURE__*/


        _jsx("td", {}, void 0, /*#__PURE__*/
        _jsx(_Pill.Pill, { color: "white" }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, { translationKey: _UserManagement.roleTranslationKey[user.role] }, void 0, user.role))), /*#__PURE__*/


        _jsx("td", {}, void 0, (_user$groups =
        user.groups) === null || _user$groups === void 0 ? void 0 : _user$groups.map((group) => {var _group$_id;return /*#__PURE__*/(
            _jsx(_Pill.Pill, { color: "white" }, (_group$_id = group._id) === null || _group$_id === void 0 ? void 0 : _group$_id.toString(), /*#__PURE__*/
            _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
            _jsx(_UI.Icon, { icon: "users" }),
            ` ${group.name}`)));}))));}))), /*#__PURE__*/








    _jsx("div", { className: `settings-footer ${className}` }, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn btn-default", onClick: addUser }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Add user"))))));





};exports.UserList = UserList;