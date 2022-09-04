"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PreserveSettings = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _api = _interopRequireDefault(require("../../utils/api"));
var _I18N = require("../../I18N");
var _UI = require("../../UI");

require("./styles/preserve.scss");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function mapStateToProps({ settings, user }) {
  return {
    settings: settings.collection,
    user };

}

const connector = (0, _reactRedux.connect)(mapStateToProps);



const PreserveSettingsComp = ({ settings, user }) => {
  const [token, setToken] = (0, _react.useState)('');
  const requestToken = async (e) => {
    e.preventDefault();
    const result = await _api.default.post('preserve');
    setToken(result.json.token);
  };

  (0, _react.useEffect)(() => {var _settings$get, _preserve$get;
    const preserve = (_settings$get = settings.get('features')) === null || _settings$get === void 0 ? void 0 : _settings$get.get('preserve');
    const userConfigs = preserve === null || preserve === void 0 ? void 0 : (_preserve$get = preserve.
    get('config')) === null || _preserve$get === void 0 ? void 0 : _preserve$get.
    find((conf) => {var _conf$get, _user$get;return (conf === null || conf === void 0 ? void 0 : (_conf$get = conf.get('user')) === null || _conf$get === void 0 ? void 0 : _conf$get.toString()) === ((_user$get = user.get('_id')) === null || _user$get === void 0 ? void 0 : _user$get.toString());});

    if (userConfigs) {
      const savedToken = userConfigs.get('token');
      setToken(savedToken);
    }
  }, []);

  return /*#__PURE__*/(
    _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "panel panel-preserve" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "panel-preserve-heading" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "square" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Preserve Extension")), /*#__PURE__*/

    _jsx("div", { className: "panel-preserve-content" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "status" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "You have not connected an Uwazi instance, yet")), /*#__PURE__*/

    _jsx("div", { className: "setup" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "span" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "INSTALL the browser extension")), /*#__PURE__*/

    _jsx("br", {}), /*#__PURE__*/
    _jsx("div", { className: "span" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Preserve Setup Description" }, void 0, "If you know your Uwazi URL and TOKEN click the link below, and fill the required information.")), /*#__PURE__*/




    _jsx("div", { className: "install-buttons" }, void 0, /*#__PURE__*/
    _jsx("button", { type: "button" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Install browser extension (dynamic link)")), /*#__PURE__*/

    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("a", {
      href: "https://uwazi.readthedocs.io/en/latest/",
      target: "_blank",
      rel: "noopener noreferrer" }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Chrome extension store link"))), /*#__PURE__*/


    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("a", {
      href: "https://uwazi.readthedocs.io/en/latest/",
      target: "_blank",
      rel: "noopener noreferrer" }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Firefox extension store link")))), /*#__PURE__*/



    _jsx("hr", {}), /*#__PURE__*/
    _jsx("div", { className: "preserve-token" }, void 0, /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Configuration")), /*#__PURE__*/

    _jsx("form", { onSubmit: requestToken }, void 0, /*#__PURE__*/
    _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
    _jsx("label", { className: "form-group-label", htmlFor: "collection_name" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Extension Token")), /*#__PURE__*/

    _jsx("input", { value: token, className: "form-control", disabled: true })),

    token && /*#__PURE__*/
    _jsx("button", {
      className: "btn btn-success",
      type: "button",
      onClick: async () => {
        await navigator.clipboard.writeText(token);
      } }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Copy token")),


    !token && /*#__PURE__*/
    _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Request token"))), /*#__PURE__*/



    _jsx("div", { className: "info" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Some information about the token"))))))));







};
const container = connector(PreserveSettingsComp);exports.PreserveSettings = container;