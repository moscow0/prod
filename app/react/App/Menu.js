"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Menu = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _Multireducer = require("../Multireducer");
var _Auth = require("../Auth");
var _I18N = require("../I18N");
var _libraryActions = require("../Library/actions/libraryActions");
var _actions = require("../SemanticSearch/actions/actions");
var _FeatureToggleSemanticSearch = require("../SemanticSearch/components/FeatureToggleSemanticSearch");
var _UI = require("../UI");
var _libraryViewInfo = require("./libraryViewInfo");
var _DropdownMenu = require("./DropdownMenu");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Menu extends _react.Component {
  libraryUrl() {
    const { location, librarySearch, libraryFilters, defaultLibraryView } = this.props;
    const { searchTerm } = location.query;
    const params = (0, _libraryActions.processFilters)(librarySearch, libraryFilters.toJS());
    params.searchTerm = searchTerm;

    return `/${_libraryViewInfo.libraryViewInfo[defaultLibraryView].url}/${(0, _libraryActions.encodeSearch)(params)}`;
  }

  render() {
    const { links, defaultLibraryView } = this.props;
    const user = this.props.user.toJS();

    const navLinks = links.map((link, index) => {
      const type = link.get('type') || 'link';

      if (type === 'link') {
        const url = link.get('url') || '/';
        if (url.startsWith('http')) {
          return /*#__PURE__*/(
            _jsx("li", { className: "menuNav-item" }, link.get('_id'), /*#__PURE__*/
            _jsx("a", {
              href: url,
              className: "btn menuNav-btn",
              activeClassName: "active-link",
              target: "_blank",
              rel: "noreferrer" }, void 0,

            (0, _I18N.t)('Menu', link.get('title')))));



        }
        return /*#__PURE__*/(
          _jsx("li", { className: "menuNav-item" }, link.get('_id'), /*#__PURE__*/
          _jsx(_I18N.I18NLink, { to: url, className: "btn menuNav-btn", activeClassName: "active-link" }, void 0,
          (0, _I18N.t)('Menu', link.get('title')))));



      }

      return /*#__PURE__*/_jsx(_DropdownMenu.DropdownMenu, { link: link, position: index }, index);
    });

    return /*#__PURE__*/(
      _jsx("ul", { className: this.props.className }, void 0, /*#__PURE__*/
      _jsx("li", { className: "menuItems", onClick: this.props.onClick }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "menuNav-list" }, void 0, navLinks)), /*#__PURE__*/

      _jsx(_I18N.I18NMenu, {}), /*#__PURE__*/
      _jsx("li", { className: "menuActions mobile-menuActions", onClick: this.props.onClick }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "menuNav-list" }, void 0, /*#__PURE__*/
      _jsx(_FeatureToggleSemanticSearch.FeatureToggleSemanticSearch, {}, void 0, /*#__PURE__*/
      _jsx("li", { className: "menuNav-item semantic-search" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.props.showSemanticSearch,
        className: "menuNav-btn btn btn-default",
        "aria-label": (0, _I18N.t)('System', 'Semantic search', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "flask" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-tooltip" }, void 0, (0, _I18N.t)('System', 'Semantic search'))))), /*#__PURE__*/



      _jsx("li", { className: "menuNav-item" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: this.libraryUrl(),
        className: "menuNav-btn btn btn-default public-documents",
        activeClassName: "active-link",
        "aria-label": (0, _I18N.t)('System', 'Library', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: _libraryViewInfo.libraryViewInfo[defaultLibraryView].icon }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-label" }, void 0, (0, _I18N.t)('System', 'Library')))), /*#__PURE__*/


      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor', 'collaborator'] }, void 0, /*#__PURE__*/
      _jsx("li", { className: "menuNav-item" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: "/settings/account",
        className: "menuNav-btn btn btn-default settings-section",
        activeClassName: "active-link",
        "aria-label": (0, _I18N.t)('System', 'Settings', null, false) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "cog" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-label" }, void 0, (0, _I18N.t)('System', 'Settings'))))), /*#__PURE__*/



      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor', 'collaborator'] }, void 0, /*#__PURE__*/
      _jsx("li", { className: "menuNav-item only-mobile" }, void 0, /*#__PURE__*/
      _jsx("a", { href: "/logout", className: "menuNav-btn btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "power-off" }), /*#__PURE__*/
      _jsx("span", { className: "tab-link-label" }, void 0, (0, _I18N.t)('System', 'Logout'))))),



      (() => {
        if (!user._id) {
          return /*#__PURE__*/(
            _jsx("li", { className: "menuNav-item" }, void 0, /*#__PURE__*/
            _jsx(_I18N.I18NLink, {
              to: "/login",
              className: "menuNav-btn btn btn-default",
              "aria-label": (0, _I18N.t)('System', 'Sign in', null, false) }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "power-off" }), /*#__PURE__*/
            _jsx("span", { className: "tab-link-label" }, void 0, (0, _I18N.t)('System', 'Sign in')))));



        }

        return null;
      })()))));




  }}exports.Menu = Menu;


Menu.defaultProps = {
  showSemanticSearch: () => {},
  defaultLibraryView: 'cards' };














function mapStateToProps({ user, settings, library, uploads }) {
  return {
    user,
    librarySearch: library.search,
    libraryFilters: library.filters,
    uploadsSearch: uploads.search,
    uploadsFilters: uploads.filters,
    uploadsSelectedSorting: uploads.selectedSorting,
    links: settings.collection.get('links'),
    defaultLibraryView: settings.collection.get('defaultLibraryView') };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    showSemanticSearch: _actions.showSemanticSearch },

  (0, _Multireducer.wrapDispatch)(dispatch, 'library'));

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Menu);exports.default = _default;