"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserGroupList = void 0;var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../../UI");

var _I18N = require("../../../I18N");
var _Pill = require("../../../Metadata/components/Pill");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const UserGroupList = ({
  userGroups,
  handleSelect,
  handleAddGroup,
  className }) =>
{
  const [selectedId, setSelectedId] = (0, _react.useState)('');
  const addGroup = () => {
    setSelectedId(undefined);
    handleAddGroup();
  };
  const selectRow = (userGroup) => {var _userGroup$_id;
    setSelectedId((_userGroup$_id = userGroup._id) === null || _userGroup$_id === void 0 ? void 0 : _userGroup$_id.toString());
    handleSelect(userGroup);
  };
  return /*#__PURE__*/(
    _jsx("div", { className: "group-list" }, void 0, /*#__PURE__*/
    _jsx("table", { className: className }, void 0, /*#__PURE__*/
    _jsx("thead", {}, void 0, /*#__PURE__*/
    _jsx("tr", {}, void 0, /*#__PURE__*/
    _jsx("th", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Groups")), /*#__PURE__*/

    _jsx("th", { align: "center" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Members")))), /*#__PURE__*/



    _jsx("tbody", {}, void 0,
    userGroups.map((userGroup) => /*#__PURE__*/
    _jsx("tr", {
      className: selectedId === userGroup._id ? 'selected' : '',

      onClick: () => selectRow(userGroup) }, userGroup._id, /*#__PURE__*/

    _jsx("td", {}, void 0, userGroup.name), /*#__PURE__*/
    _jsx("td", { align: "center" }, void 0, /*#__PURE__*/
    _jsx(_Pill.Pill, { color: "white" }, void 0, /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "users" }),
    ` ${userGroup.members.length}`))))))), /*#__PURE__*/







    _jsx("div", { className: `settings-footer ${className}` }, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn btn-default", onClick: addGroup }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Add group"))))));





};exports.UserGroupList = UserGroupList;