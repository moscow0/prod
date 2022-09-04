"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Login = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactRouter = require("react-router");
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactReduxForm = require("react-redux-form");

var _UI = require("../UI");

var _I18N = require("../I18N");
var _utils = require("../utils");
var _socket = require("../socket");
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _thesaurisActions = require("../Thesauri/actions/thesaurisActions");

var _Auth = _interopRequireDefault(require("../Auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const reloadHome = () => {
  window.location.assign('/');
};

class Login extends _RouteHandler.default {
  constructor(props, context) {
    super(props, context);
    this.state = { error: false, error2fa: false, recoverPassword: false, tokenRequired: false };
    this.submit = this.submit.bind(this);
    this.setLogin = this.setLogin.bind(this);
    this.setRecoverPassword = this.setRecoverPassword.bind(this);
  }

  attachDispatch(dispatch) {
    this.formDispatch = dispatch;
  }

  submit(credentials) {
    if (this.state.recoverPassword) {
      return this.recoverPassword(credentials.username);
    }

    return this.login(credentials);
  }

  recoverPassword(email) {
    this.setState({ recoverPassword: false, error: false });
    this.formDispatch(_reactReduxForm.actions.reset('loginForm'));
    return this.props.recoverPassword(email);
  }

  resolveSuccessfulLogin() {
    if (this.props.private) {
      reloadHome();
      return;
    }
    (0, _socket.reconnectSocket)();
    this.props.reloadThesauris();
    this.props.change('library.search.publishedStatus.values', ['published', 'restricted']);
    _reactRouter.browserHistory.push('/');
  }

  async login(credentials) {
    try {
      await this.props.login(credentials);
      this.resolveSuccessfulLogin();
    } catch (err) {
      if (!this.state.tokenRequired && err.status === 409) {
        this.setState({ tokenRequired: true });
      } else {
        const { tokenRequired } = this.state;
        this.formDispatch(_reactReduxForm.actions.change('loginForm.token', undefined));
        const error2fa = tokenRequired;
        this.setState({ error: true, tokenRequired, error2fa });
      }
    }
  }

  setRecoverPassword() {
    this.formDispatch(_reactReduxForm.actions.reset('loginForm'));
    this.setState({ recoverPassword: true, error: false });
  }

  setLogin() {
    this.formDispatch(_reactReduxForm.actions.reset('loginForm'));
    this.setState({ recoverPassword: false, tokenRequired: false, error: false, error2fa: false });
  }

  render() {
    let submitLabel = this.state.recoverPassword ? /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Send recovery email") : /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Login");


    if (this.state.tokenRequired) {
      submitLabel = /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Verify");
    }

    return /*#__PURE__*/(
      _jsx("div", { className: "content login-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "col-xs-12 col-sm-4 col-sm-offset-4", suppressHydrationWarning: true }, void 0, /*#__PURE__*/
      _jsx("h1", { className: "login-title" }, void 0, /*#__PURE__*/
      _jsx("img", { src: "/public/logo.svg", title: "uwazi", alt: "uwazi" })),

      _utils.isClient && /*#__PURE__*/
      _jsx(_reactReduxForm.LocalForm, {
        onSubmit: this.submit,
        model: "loginForm",
        getDispatch: (dispatch) => {
          this.formDispatch = dispatch;
        } }, void 0,

      !this.state.tokenRequired && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", {
        className: `form-group login-email${this.state.error ? ' has-error' : ''}` }, void 0, /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: ".username" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "username" }, void 0,
      this.state.recoverPassword ? /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Email") : /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "User")), /*#__PURE__*/


      _jsx("input", { type: "text", name: "username", id: "username", className: "form-control" }))), /*#__PURE__*/


      _jsx("div", {
        className: `form-group login-password ${this.state.error ? 'has-error' : ''}${
        this.state.recoverPassword ? ' is-hidden' : ''
        }` }, void 0, /*#__PURE__*/

      _jsx("label", { className: "form-group-label", htmlFor: "password" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Password")), /*#__PURE__*/

      _jsx(_reactReduxForm.Field, { model: ".password" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "password",
        name: "password",
        id: "password",
        className: "form-control" })), /*#__PURE__*/


      _jsx("div", { className: "form-text" }, void 0,
      this.state.error && /*#__PURE__*/_jsx("span", {}, void 0, (0, _I18N.t)('System', 'Login failed'), " - "), /*#__PURE__*/
      _jsx("span", {
        title: (0, _I18N.t)('System', 'Forgot Password?', null, false),
        onClick: this.setRecoverPassword,
        className: `button forgot-password ${
        this.state.error ? 'label-danger' : ''
        }` }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Forgot Password?"))))),





      this.state.tokenRequired && /*#__PURE__*/
      _jsx("div", {
        className: `form-group login-token${this.state.error2fa ? ' has-error' : ''}` }, void 0, /*#__PURE__*/

      _jsx("h5", {}, void 0, (0, _I18N.t)('System', 'Two-step verification')), /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".token" }, void 0, /*#__PURE__*/
      _jsx("label", { className: "form-group-label", htmlFor: "token" }, void 0,
      (0, _I18N.t)('System', 'Authentication code')), /*#__PURE__*/

      _jsx("input", { type: "text", name: "token", id: "token", className: "form-control" }), /*#__PURE__*/
      _jsx("div", { className: "form-text" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0,
      this.state.error2fa && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle" }), /*#__PURE__*/
      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Two-factor verification failed')))), /*#__PURE__*/



      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Open the two-factor Authenticator app on your device"),

      ' ', /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "to view your authentication code and verify your identity.")), /*#__PURE__*/



      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx("span", {
        onClick: this.setLogin,
        className: `button forgot-password ${
        this.state.error2fa ? 'label-danger' : ''
        }` }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Return to login")))))), /*#__PURE__*/






      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "submit",
        className: `btn btn-block btn-lg ${
        this.state.recoverPassword ? 'btn-success' : 'btn-primary'
        }` }, void 0,

      submitLabel)),


      this.state.recoverPassword && /*#__PURE__*/
      _jsx("div", { className: "form-text" }, void 0, /*#__PURE__*/
      _jsx("span", {
        title: (0, _I18N.t)('System', 'Cancel', null, false),
        onClick: this.setLogin,
        className: "button cancel" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Cancel"))))))));









  }}exports.Login = Login;


Login.propTypes = {
  login: _propTypes.default.func,
  recoverPassword: _propTypes.default.func,
  reloadThesauris: _propTypes.default.func,
  change: _propTypes.default.func };


function mapStateToProps({ settings }) {
  return {
    private: settings.collection.get('private') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    login: _Auth.default.actions.login,
    recoverPassword: _Auth.default.actions.recoverPassword,
    reloadThesauris: _thesaurisActions.reloadThesauri,
    change: _reactReduxForm.actions.change },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Login);exports.default = _default;