"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.NavlinksSettings = void 0;var _reactDnd = require("react-dnd");
var _reactDndHtml5Backend = require("react-dnd-html5-backend");
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _UI = require("../../UI");
var _utils = require("../../utils");
var _navlinksActions = require("../actions/navlinksActions");
var _I18N = require("../../I18N");
var _ValidateNavlinks = _interopRequireDefault(require("../utils/ValidateNavlinks"));

var _NavlinkForm = _interopRequireDefault(require("./NavlinkForm"));
require("./styles/menu.scss");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class NavlinksSettings extends _react.Component {
  componentDidMount() {
    this.props.loadLinks(this.props.collection.get('links').toJS());
    this.firstLoad = true;
  }

  // TEST!!!
  componentDidUpdate(previousProps) {
    if (this.firstLoad) {
      this.firstLoad = false;
      return;
    }

    this.focusOnNewElement(previousProps);
  }

  // TEST!!!
  focusOnNewElement(previousProps) {
    const { links } = this.props;
    const previousLinks = previousProps.links;
    const hasNewBlock = links.length > previousLinks.length;
    if (hasNewBlock) {
      this.blockReferences[this.blockReferences.length - 1].focus();
    }
  }

  render() {
    const { collection, links } = this.props;
    const nameGroupClass = 'template-name';
    const hostname = _utils.isClient ? window.location.origin : '';

    const payload = { _id: collection.get('_id'), _rev: collection.get('_rev'), links };

    this.blockReferences = [];

    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "NavlinksSettings" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, {
        model: "settings.navlinksData",
        onSubmit: this.props.saveLinks.bind(this, payload),
        className: "navLinks",
        validators: (0, _ValidateNavlinks.default)(links) }, void 0, /*#__PURE__*/

      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx("div", { className: nameGroupClass }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Menu"))), /*#__PURE__*/


      _jsx("ul", { className: "list-group" }, void 0, /*#__PURE__*/
      _jsx("li", { className: "list-group-item" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "If it is an external URL, use a fully formed URL. Ie. http://www.uwazi.io."), /*#__PURE__*/


      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "If it is an internal URL within this website, be sure to delete the first part"),


      ' ', "(",
      hostname, "),", ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "leaving only a relative URL starting with a slash character. Ie. /some_url.")))),





      links.map((link, i) => /*#__PURE__*/
      _jsx(_NavlinkForm.default, {

        index: i,
        id: link.localID || link._id,
        link: link,
        sortLink: this.props.sortLink,
        blockReferences: this.blockReferences }, link.localID || link._id))), /*#__PURE__*/



      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-default",
        id: "main-add-link-button",
        onClick: this.props.addLink.bind(this, links, 'link') }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "link" }), "\xA0", /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add link")), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        className: "btn btn-default",
        onClick: this.props.addLink.bind(this, links, 'group') }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "caret-square-down" }), "\xA0", /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add group"))), /*#__PURE__*/


      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "submit",
        className: "btn btn-success btn-extra-padding",
        disabled: !!this.props.savingNavlinks }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save"))))))))));









  }}exports.NavlinksSettings = NavlinksSettings;












const mapStateToProps = (state) => {
  const { settings } = state;
  const { collection } = settings;
  const { links } = settings.navlinksData;
  return { links, collection, savingNavlinks: settings.uiState.get('savingNavlinks') };
};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ loadLinks: _navlinksActions.loadLinks, addLink: _navlinksActions.addLink, sortLink: _navlinksActions.sortLink, saveLinks: _navlinksActions.saveLinks }, dispatch);
}var _default =



(0, _reactDnd.DragDropContext)(_reactDndHtml5Backend.HTML5Backend)(
(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NavlinksSettings));exports.default = _default;