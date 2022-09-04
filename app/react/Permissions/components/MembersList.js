"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MembersList = void 0;
var _react = _interopRequireDefault(require("react"));

var _permissionSchema = require("../../../shared/types/permissionSchema");
var _Auth = require("../../Auth");
var _MemberListItemInfo = require("./MemberListItemInfo");
var _MemberListItemPermission = require("./MemberListItemPermission");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const notShowPublicToCollab = (member, children) =>
member.type === _permissionSchema.PermissionType.PUBLIC ? /*#__PURE__*/
_jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'] }, void 0, children) :

children;


const MembersList = ({ members, onChange }) => {
  const onChangeHandler = (index) => (value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    onChange(newMembers);
  };

  const onDeleteHandler = (value) => {
    onChange(members.filter((m) => m !== value));
  };

  return /*#__PURE__*/(
    _jsx("table", { className: "members-list" }, void 0, /*#__PURE__*/
    _jsx("tbody", {}, void 0,
    members.map((member, index) => /*#__PURE__*/
    _jsx("tr", {}, `${member.type}-${member.refId}`, /*#__PURE__*/
    _jsx("td", {}, void 0, /*#__PURE__*/
    _jsx(_MemberListItemInfo.MemberListItemInfo, { value: member })), /*#__PURE__*/

    _jsx("td", {}, void 0,
    notShowPublicToCollab(
    member, /*#__PURE__*/
    _jsx(_MemberListItemPermission.MemberListItemPermission, {
      value: member,
      onChange: onChangeHandler(index),
      onDelete: onDeleteHandler,
      disabled: !member.refId }))))))));








};exports.MembersList = MembersList;