"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

require("bootstrap/dist/css/bootstrap.css");
require("react-widgets/lib/scss/react-widgets.scss");
require("nprogress/nprogress.css");
require("flag-icon-css/sass/flag-icon.scss");
var _Notifications = _interopRequireDefault(require("../Notifications"));
var _Cookiepopup = _interopRequireDefault(require("./Cookiepopup"));
var _I18N = require("../I18N");

var _UI = require("../UI");

require("./scss/styles.scss");

var _Menu = _interopRequireDefault(require("./Menu"));
var _SiteName = _interopRequireDefault(require("./SiteName"));
var _Confirm = _interopRequireDefault(require("./Confirm"));
var _GoogleAnalytics = _interopRequireDefault(require("./GoogleAnalytics"));
var _Matomo = _interopRequireDefault(require("./Matomo"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class App extends _react.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { showmenu: false, confirmOptions: {} };

    this.toggleMenu = this.toggleMenu.bind(this);
  }

  getChildContext() {
    return {
      confirm: this.confirm.bind(this) };

  }

  toggleMenu() {
    this.setState({ showmenu: !this.state.showmenu });
  }

  confirm(options) {
    this.setState({ confirmOptions: options });
  }

  renderTools() {
    return _react.default.Children.map(this.props.children, (child) => {
      //condition not tested
      if (child.type.renderTools) {
        return child.type.renderTools();
      }

      return undefined;
    });
  }

  render() {
    const { routes, location, params } = this.props;
    let MenuButtonIcon = 'bars';
    let navClass = 'menuNav';

    if (this.state.showmenu) {
      MenuButtonIcon = 'times';
      navClass += ' is-active';
    }

    const customHomePageId = routes.reduce((memo, route) => {
      if (Object.keys(route).includes('customHomePageId')) {
        return route.customHomePageId;
      }
      return memo;
    }, '');

    const pageId = location.pathname.match('page/') && params.sharedId ? params.sharedId : '';

    const appClassName = customHomePageId || pageId ? `pageId_${customHomePageId || pageId}` : '';

    return /*#__PURE__*/(
      _jsx("div", { id: "app", className: appClassName }, void 0, /*#__PURE__*/
      _jsx(_Notifications.default, {}), /*#__PURE__*/
      _jsx(_Cookiepopup.default, {}), /*#__PURE__*/
      _jsx("div", { className: "content" }, void 0, /*#__PURE__*/
      _jsx("nav", {}, void 0, /*#__PURE__*/
      _jsx("h1", {}, void 0, /*#__PURE__*/
      _jsx(_SiteName.default, {}))), /*#__PURE__*/


      _jsx("header", {}, void 0, /*#__PURE__*/
      _jsx("button", {
        className: "menu-button",
        onClick: this.toggleMenu,
        "aria-label": (0, _I18N.t)('System', 'Menu', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: MenuButtonIcon })), /*#__PURE__*/

      _jsx("h1", { className: "logotype" }, void 0, /*#__PURE__*/
      _jsx(_SiteName.default, {})),

      this.renderTools(), /*#__PURE__*/
      _jsx(_Menu.default, { location: location, onClick: this.toggleMenu, className: navClass })), /*#__PURE__*/

      _jsx("div", { className: "app-content container-fluid" }, void 0, /*#__PURE__*/
      _react.default.createElement(_Confirm.default, this.state.confirmOptions), /*#__PURE__*/
      _jsx(_I18N.TranslateForm, {}),
      this.props.children, /*#__PURE__*/
      _jsx(_GoogleAnalytics.default, {}), /*#__PURE__*/
      _jsx(_Matomo.default, {})))));




  }}


App.defaultProps = {
  params: {},
  routes: [] };










App.childContextTypes = {
  confirm: _propTypes.default.func,
  locale: _propTypes.default.string };


App.contextTypes = {
  getUser: _propTypes.default.func,
  router: _propTypes.default.object };var _default =


App;exports.default = _default;