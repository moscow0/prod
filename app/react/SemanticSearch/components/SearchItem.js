"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchItem = void 0;exports.mapDispatchToProps = mapDispatchToProps;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _I18N = require("../../I18N");
var _SearchDescription = _interopRequireDefault(require("../../Library/components/SearchDescription"));
var _UI = require("../../UI");

var _actions = require("../actions/actions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class SearchItem extends _react.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
    this.handleResumeClicked = this.handleResumeClicked.bind(this);
    this.handleStopClicked = this.handleStopClicked.bind(this);
  }

  delete(e) {
    const { confirm } = this.context;
    const { onDeleteClicked, search } = this.props;
    e.preventDefault();
    confirm({
      accept: onDeleteClicked.bind(this, search._id),
      title: 'Confirm delete',
      message: 'Are you sure you want to delete this search?' });

  }

  handleStopClicked(e) {
    const { search, onStopClicked } = this.props;
    onStopClicked(search._id);
    e.preventDefault();
  }

  handleResumeClicked(e) {
    const { search, onResumeClicked } = this.props;
    onResumeClicked(search._id);
    e.preventDefault();
  }

  renderButtons() {
    const { search } = this.props;
    const { status } = search;
    return /*#__PURE__*/(
      _jsx("div", { className: "buttons" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-danger delete-search btn-xs", onClick: this.delete }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "trash-alt", size: "sm" })),

      ['inProgress', 'pending'].includes(status) && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-warning stop-search btn-xs",
        onClick: this.handleStopClicked }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "stop", size: "sm" })),


      status === 'stopped' && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-success resume-search btn-xs",
        onClick: this.handleResumeClicked }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "play", size: "sm" }))));




  }

  render() {
    const { search } = this.props;
    const { status, documents } = search;
    const completed = documents.filter((doc) => doc.status === 'completed').length;
    const max = documents.length;
    return /*#__PURE__*/(
      _jsx(_I18N.I18NLink, { className: "semantic-search-list-item", to: `semanticsearch/${search._id}` }, void 0, /*#__PURE__*/
      _jsx("div", { className: "item-header" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "title" }, void 0, /*#__PURE__*/
      _jsx(_SearchDescription.default, { searchTerm: search.searchTerm, query: search.query })),

      this.renderButtons()), /*#__PURE__*/

      _jsx("div", {}, void 0, status !== 'completed' && /*#__PURE__*/_jsx(_UI.ProgressBar, { value: completed, max: max }))));


  }}exports.SearchItem = SearchItem;


SearchItem.contextTypes = {
  confirm: _propTypes.default.func };















function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    onDeleteClicked: _actions.deleteSearch,
    onStopClicked: _actions.stopSearch,
    onResumeClicked: _actions.resumeSearch },

  dispatch);

}var _default =

(0, _reactRedux.connect)(null, mapDispatchToProps)(SearchItem);exports.default = _default;