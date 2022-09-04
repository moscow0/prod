"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.AccountSettings = void 0;Object.defineProperty(exports, "createSelector", { enumerable: true, get: function () {return _reselect.createSelector;} });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _BasicReducer = require("../../BasicReducer");
var _UsersAPI = _interopRequireDefault(require("../../Users/UsersAPI"));
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _RequestParams = require("../../utils/RequestParams");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _reselect = require("reselect");
var _Pill = require("../../Metadata/components/Pill");
var _UserManagement = require("../../Users/UserManagement");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class AccountSettings extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      email: props.user.email || '',
      password: '',
      repeatPassword: '',
      using2fa: props.user.using2fa };

    this.passwordChange = this.passwordChange.bind(this);
    this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.emailChange = this.emailChange.bind(this);
  }

  passwordChange(e) {
    this.setState({ password: e.target.value });
    this.setState({ passwordError: false });
  }

  repeatPasswordChange(e) {
    this.setState({ repeatPassword: e.target.value });
    this.setState({ passwordError: false });
  }

  updateEmail(e) {
    const { email } = this.state;
    const { user, notify, setUser } = this.props;

    e.preventDefault();
    const userData = _objectSpread(_objectSpread({}, user), {}, { email });
    _UsersAPI.default.save(new _RequestParams.RequestParams(userData)).then((result) => {
      notify((0, _I18N.t)('System', 'Email updated', null, false), 'success');
      setUser(Object.assign(userData, { _rev: result.rev }));
    });
  }

  updatePassword(e) {
    e.preventDefault();

    const { password, repeatPassword } = this.state;
    const { user, notify, setUser } = this.props;

    const passwordsDontMatch = password !== repeatPassword;
    const emptyPassword = password.trim() === '';
    if (emptyPassword || passwordsDontMatch) {
      this.setState({ passwordError: true });
      return;
    }

    _UsersAPI.default.save(new _RequestParams.RequestParams(_objectSpread(_objectSpread({}, user), {}, { password }))).then((result) => {
      notify((0, _I18N.t)('System', 'Password updated', null, false), 'success');
      setUser(Object.assign(user, { _rev: result.rev }));
    });
    this.setState({ password: '', repeatPassword: '' });
  }

  emailChange(e) {
    this.setState({ email: e.target.value });
  }

  renderPasswordField(id, value, label, passwordError) {
    return /*#__PURE__*/(
      _jsx("div", { className: `form-group${passwordError ? ' has-error' : ''}` }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: id }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, label)), /*#__PURE__*/

      _jsx("input", {
        type: "password",
        onChange: this[`${id}Change`],
        value: value,
        id: id,
        className: "form-control" })));



  }

  render() {
    const { email, password, repeatPassword, passwordError, using2fa } = this.state;
    const { username, groups = [], role } = this.props.user;
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "account-settings" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Account")), /*#__PURE__*/

      _jsx("div", { className: "panel-body" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "user-details" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Username"), ":\xA0\xA0", /*#__PURE__*/
      _jsx("strong", {}, void 0, username)), /*#__PURE__*/

      _jsx("div", { className: "user-details-role" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Role"), ":\xA0\xA0", /*#__PURE__*/
      _jsx(_Pill.Pill, {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: _UserManagement.roleTranslationKey[role] }, void 0, role))),


      groups.length > 0 && /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Groups"), ":\xA0\xA0",
      groups.map((g) => /*#__PURE__*/
      _jsx(_Pill.Pill, {}, void 0, g.name)))), /*#__PURE__*/




      _jsx("hr", {}), /*#__PURE__*/
      _jsx("h5", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Email address")), /*#__PURE__*/

      _jsx("form", { onSubmit: this.updateEmail }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "collection_name" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Email")), /*#__PURE__*/

      _jsx("input", {
        type: "email",
        onChange: this.emailChange,
        value: email,
        className: "form-control" })), /*#__PURE__*/


      _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Update"))), /*#__PURE__*/


      _jsx("hr", {}), /*#__PURE__*/
      _jsx("h5", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Change password")), /*#__PURE__*/

      _jsx("form", { onSubmit: this.updatePassword }, void 0,
      this.renderPasswordField('password', password, 'New password', passwordError),
      this.renderPasswordField(
      'repeatPassword',
      repeatPassword,
      'Confirm new password',
      passwordError),

      passwordError && /*#__PURE__*/
      _jsx("div", { className: "validation-error validation-error-centered" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Password Error")), /*#__PURE__*/


      _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Update"))), /*#__PURE__*/


      _jsx("hr", {}), /*#__PURE__*/
      _jsx("h5", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Two-step verification")),

      using2fa && /*#__PURE__*/
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Your account is protected by 2fa."))),



      !using2fa && /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "alert alert-warning" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You should activate this feature for enhanced account security"))), /*#__PURE__*/




      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings/2fa", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Protect your account")))))), /*#__PURE__*/






      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx("a", { href: "/logout", className: "btn btn-danger" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "power-off" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Logout")))))));






  }}exports.AccountSettings = AccountSettings;


AccountSettings.defaultProps = {
  user: {} };








const selectUser = (0, _reselect.createSelector)(
(state) => state.user,
(user) => user.toJS());


function mapStateToProps(state) {
  return { user: selectUser(state) };
}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  { setUser: _BasicReducer.actions.set.bind(null, 'auth/user'), notify: _notificationsActions.notify },
  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AccountSettings);exports.default = _default;