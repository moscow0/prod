"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SearchBar = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");

var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _I18N = require("../../I18N");
var _UI = require("../../UI");

var _actions = require("../actions/actions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class SearchBar extends _react.Component {
  constructor(props) {
    super(props);
    this.changeSearchTerm = (0, _debounce.default)(this.props.searchReferences, 400);
  }

  componentDidUpdate(prevProps) {
    if (this.props.entityId !== prevProps.entityId) {
      this.resetSearchTerm();
    }
  }

  componentWillUnmount() {
    this.resetSearchTerm();
  }

  resetSearchTerm() {
    this.props.change('relationships/list/search.searchTerm', '');
  }

  resetSearch() {
    this.resetSearchTerm();
    this.props.searchReferences();
  }

  render() {
    const { search } = this.props;
    const searchTerm = search.searchTerm && search.searchTerm.value ? search.searchTerm.value : '';

    return /*#__PURE__*/(
      _jsx("div", { className: "search-box" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, {
        model: "relationships/list/search",
        onSubmit: this.props.searchReferences,
        autoComplete: "off" }, void 0, /*#__PURE__*/

      _jsx("div", { className: `input-group${searchTerm ? ' is-active' : ''}` }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: "relationships/list/search.searchTerm" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "search" }), /*#__PURE__*/
      _jsx("input", {
        type: "text",
        placeholder: (0, _I18N.t)('System', 'Search related entities or documents', null, false),
        className: "form-control",
        onChange: this.changeSearchTerm.bind(this),
        autoComplete: "off",
        value: searchTerm }), /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times", onClick: this.resetSearch.bind(this) }))))));





  }}exports.SearchBar = SearchBar;









function mapStateToProps({ relationships }) {
  const { entityId, search } = relationships.list;
  return {
    entityId,
    search };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    searchReferences: _actions.searchReferences,
    change: _reactReduxForm.actions.change },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SearchBar);exports.default = _default;