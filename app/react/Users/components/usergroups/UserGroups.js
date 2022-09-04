"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserGroups = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");



var _UserGroupList = require("./UserGroupList");
var _actions = require("./actions/actions");




var _actions2 = require("../../actions/actions");
var _UserGroupSidePanel = require("./UserGroupSidePanel");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}










const UserGroupsComponent = ({
  userGroups,
  users,
  loadUserGroups: loadGroups,
  saveUserGroup: saveGroup,
  deleteUserGroup: deleteGroup,
  loadUsers: loadAllUsers }) =>
{
  const [sidePanelOpened, setSidePanelOpened] = (0, _react.useState)(false);
  const [selectedGroup, setSelectedGroup] = (0, _react.useState)();
  const groupList = userGroups ? userGroups.toJS() : [];
  const userList = users ? users.toJS() : [];

  (0, _react.useEffect)(() => {
    if (groupList.length === 0) {
      loadGroups().then();
    }
  }, []);

  function closeSidePanel() {
    setSelectedGroup(undefined);
    setSidePanelOpened(false);
  }

  const handlers = {
    handleSelect: (userGroup) => {
      setSelectedGroup(userGroup);
      setSidePanelOpened(true);
    },
    handleAddGroup: () => {
      setSelectedGroup({ name: '', members: [] });
      setSidePanelOpened(true);
    },
    handleSave: async (userGroup) => {
      if (!userGroup._id) {
        delete userGroup._id;
      }
      await saveGroup(userGroup);
      await loadAllUsers();
      closeSidePanel();
    },
    handleDelete: async (userGroup) => {
      await deleteGroup(userGroup);
      await loadAllUsers();
      closeSidePanel();
    } };


  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx(_UserGroupList.UserGroupList, {
      userGroups: groupList,
      handleSelect: handlers.handleSelect,
      handleAddGroup: handlers.handleAddGroup,
      className: sidePanelOpened ? 'with-sidepanel' : '' }),

    selectedGroup && /*#__PURE__*/
    _jsx(_UserGroupSidePanel.UserGroupSidePanel, {

      userGroup: selectedGroup,
      users: userList,
      userGroups: groupList,
      opened: sidePanelOpened,
      closePanel: closeSidePanel,
      onSave: handlers.handleSave,
      onDelete: handlers.handleDelete }, selectedGroup._id ? selectedGroup._id.toString() : '')));




};

const mapStateToProps = (state) => ({
  userGroups: state.userGroups,
  users: state.users });


const mapDispatchToProps = {
  loadUsers: _actions2.loadUsers,
  loadUserGroups: _actions.loadUserGroups,
  saveUserGroup: _actions.saveUserGroup,
  deleteUserGroup: _actions.deleteUserGroup };


const UserGroups = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserGroupsComponent);exports.UserGroups = UserGroups;