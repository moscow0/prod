"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.UnlockAccount = void 0;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reactRouter = require("react-router");
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _I18N = require("../I18N");

var _Auth = _interopRequireDefault(require("../Auth"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class UnlockAccount extends _RouteHandler.default {
  unlockAccount() {
    const { username, code } = this.props.params;
    this.props.
    unlockAccount({ username, code }).
    then(() => {
      _reactRouter.browserHistory.push('/login');
    }).
    catch(() => {
      _reactRouter.browserHistory.push('/login');
    });
  }

  componentDidMount() {
    this.unlockAccount();
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "content login-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "col-xs-12 col-sm-4 col-sm-offset-4 text-center" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Verifying...")))));




  }}exports.UnlockAccount = UnlockAccount;


UnlockAccount.propTypes = {
  unlockAccount: _propTypes.default.func,
  params: _propTypes.default.shape({
    username: _propTypes.default.string,
    code: _propTypes.default.string }) };



function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    unlockAccount: _Auth.default.actions.unlockAccount },

  dispatch);

}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(UnlockAccount);exports.default = _default;