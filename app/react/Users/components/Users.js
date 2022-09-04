"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Users = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");


var _userSchema = require("../../../shared/types/userSchema");


var _UserList = require("./UserList");
var _actions = require("../actions/actions");
var _actions2 = require("./usergroups/actions/actions");
var _UserSidePanel = require("./UserSidePanel");

var _actions3 = require("../../Auth2fa/actions/actions");
var _actions4 = require("../../Auth/actions");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}












const UsersComponent = ({
  users,
  userGroups,
  loadUsers: loadAllUsers,
  loadUserGroups: loadAllGroups,
  newUser: createUser,
  saveUser: saveUserData,
  deleteUser: deleteUserData,
  reset2fa: resetTwoFactorAuth,
  recoverPassword: resetUserPassword }) =>
{var _selectedUser$_id;
  const userList = users ? users.toJS() : [];
  const userGroupList = userGroups ? userGroups.toJS() : [];
  const [selectedUser, setSelectedUser] = (0, _react.useState)();
  const [sidePanelOpened, setSidePanelOpened] = (0, _react.useState)(false);

  (0, _react.useEffect)(() => {
    if (userList.length === 0) {
      loadAllUsers().
      then().
      catch(() => {});
    }
    if (loadAllGroups.length === 0) {
      loadAllGroups().
      then().
      catch(() => {});
    }
  }, []);

  const closeSidePanel = () => {
    setSelectedUser(undefined);
    setSidePanelOpened(false);
  };

  const handlers = {
    handleSelect: (user) => {
      setSelectedUser(user);
      setSidePanelOpened(true);
    },

    handleSave: async (user) => {
      if (!user.password) {
        delete user.password;
      }
      delete user.using2fa;
      if (user._id) {
        await saveUserData(user);
      } else {
        delete user._id;
        await createUser(user);
      }
      await loadAllGroups();
      closeSidePanel();
    },

    handleDelete: async (user) => {
      await deleteUserData({ _id: user._id });
      closeSidePanel();
    },

    handleAddUser: () => {
      setSelectedUser({ role: _userSchema.UserRole.COLLABORATOR, username: '', email: '' });
      setSidePanelOpened(true);
    },

    handleResetPassword: async (user) => {
      await resetUserPassword(
      user.email,
      (0, _I18N.t)('System', 'Instructions to reset user password have been sent', null, false));

    } };


  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx(_UserList.UserList, {
      users: userList,
      handleSelect: handlers.handleSelect,
      handleAddUser: handlers.handleAddUser,
      className: sidePanelOpened ? 'with-sidepanel' : '' }),

    selectedUser && /*#__PURE__*/
    _jsx(_UserSidePanel.UserSidePanel, {

      opened: sidePanelOpened,
      user: selectedUser,
      users: userList,
      groups: userGroupList,
      onSave: handlers.handleSave,
      onDelete: handlers.handleDelete,
      onReset2fa: resetTwoFactorAuth,
      closePanel: closeSidePanel,
      onResetPassword: handlers.handleResetPassword }, (_selectedUser$_id = selectedUser._id) === null || _selectedUser$_id === void 0 ? void 0 : _selectedUser$_id.toString())));




};

const mapStateToProps = (state) => ({
  users: state.users,
  userGroups: state.userGroups });


const mapDispatchToProps = {
  loadUsers: _actions.loadUsers,
  newUser: _actions.newUser,
  saveUser: _actions.saveUser,
  deleteUser: _actions.deleteUser,
  loadUserGroups: _actions2.loadUserGroups,
  reset2fa: _actions3.reset2fa,
  recoverPassword: _actions4.recoverPassword };



const Users = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UsersComponent);exports.Users = Users;