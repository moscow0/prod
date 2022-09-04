"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.mapDispatchToProps = exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _component = _interopRequireDefault(require("@loadable/component"));

var _UI = require("../UI");
var _RequestParams = require("../utils/RequestParams");
var _I18N = require("../I18N");
var _actions = require("./actions/actions");
var _Auth2faAPI = _interopRequireDefault(require("./Auth2faAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}

const QRCodeSVG = (0, _component.default)(
async () => Promise.resolve().then(() => _interopRequireWildcard(require('qrcode.react'))),
{
  resolveComponent: (components) => components.QRCodeSVG });














const goToAccount = (type, label) => /*#__PURE__*/
_jsx(_I18N.I18NLink, { to: "/settings/account", className: `btn btn-${type}` }, void 0,
(0, _I18N.t)('System', label));



class Configure2fa extends _react.Component {


  constructor(props) {
    super(props);
    this.state = {
      conflict: false,
      otpauth: '',
      secret: '' };

    this.setSecret = this.setSecret.bind(this);
    this.enable2fa = this.enable2fa.bind(this);
  }

  async componentDidMount() {
    const { userUsing2fa } = this.props;
    if (!userUsing2fa) {
      await this.setSecret();
    }
  }

  async setSecret() {
    const { otpauth, secret } = await _Auth2faAPI.default.setSecret(new _RequestParams.RequestParams());
    this.setState({ otpauth, secret });
  }

  async enable2fa(values) {
    const { token } = values;
    const { enable2fa } = this.props;
    try {
      const { success } = await _Auth2faAPI.default.enable(new _RequestParams.RequestParams({ token }));
      if (success) {
        enable2fa();
      }
    } catch (err) {
      if (err.status === 409) {
        this.setState({ conflict: true });
      }
    }
  }

  render() {
    const { otpauth, secret, conflict } = this.state;
    const { userUsing2fa } = this.props;

    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "configure2fa-settings" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Two-step verification")), /*#__PURE__*/

      _jsx("div", { className: "panel-body" }, void 0,
      userUsing2fa && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "alert alert-success" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Congratulations!"), /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "You have successfully configured two-step verification."))),


      goToAccount('success', 'OK')),


      !userUsing2fa && /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Activate this feature for enhanced account security")), /*#__PURE__*/

      _jsx("h3", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Using Google Authenticator")), /*#__PURE__*/

      _jsx(_reactReduxForm.LocalForm, { model: "2fa", onSubmit: this.enable2fa }, void 0, /*#__PURE__*/
      _jsx("ol", {}, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Install the Google Authenticator app on your mobile device")), /*#__PURE__*/



      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Open the app and select \"Add Account\" (usually a plus symbol)")), /*#__PURE__*/



      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Scan the following QR code selecting the \"scan barcode\" option:"), /*#__PURE__*/


      _jsx("div", { className: "qr-code" }, void 0,
      otpauth && /*#__PURE__*/
      _jsx(QRCodeSVG, {
        value: otpauth,
        level: "Q",
        includeMargin: false,
        size: 200,
        bgColor: "white",
        fgColor: "black" })), /*#__PURE__*/



      _jsx(_I18N.Translate, {}, void 0, "Or enter this secret key into your Authenticator app"), /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "(please keep this key secret and don't share it):"), /*#__PURE__*/
      _jsx("div", { className: "secret-key" }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, secret))), /*#__PURE__*/


      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Enter the 6-digit verification code generated by your Authenticator app:"), /*#__PURE__*/


      _jsx("br", {}), /*#__PURE__*/
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: `col-8 col-md-4 col-lg-2 ${conflict ? 'has-error' : ''}` }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Control.text, { className: "form-control", model: ".token", id: "token" }))))), /*#__PURE__*/




      _jsx("p", {}, void 0,
      goToAccount('default', 'Cancel'), /*#__PURE__*/
      _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Confirm"))))))))));










  }}_defineProperty(Configure2fa, "defaultProps", void 0);


Configure2fa.defaultProps = {
  userUsing2fa: false,
  enable2fa: () => {} };


const mapStateToProps = (state) => ({
  userUsing2fa: state.user.toJS().using2fa });exports.mapStateToProps = mapStateToProps;


const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ enable2fa: _actions.enable2fa }, dispatch);exports.mapDispatchToProps = mapDispatchToProps;var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Configure2fa);exports.default = _default;