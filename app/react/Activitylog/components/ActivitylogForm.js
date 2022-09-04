"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.mapDispatchToProps = exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _immutable = require("immutable");
var _ReactReduxForms = require("../../ReactReduxForms");
var _I18N = require("../../I18N");
var actions = _interopRequireWildcard(require("../actions/activitylogActions"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

class ActivitylogForm extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { query: {} };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  handleSubmit(values) {
    const { submit } = this.props;
    const query = Object.keys(values).reduce((_query, key) => {
      if (values[key]) {
        return Object.assign(_query, { [key]: values[key] });
      }
      return _query;
    }, {});

    this.setState({ query });
    submit(query);
  }

  loadMore() {
    const { searchResults, searchMore } = this.props;

    if (searchResults.get('remainingRows')) {
      const { query } = this.state;
      const lastResultTime = parseInt(searchResults.getIn(['rows', -1, 'time']), 10);
      searchMore(_objectSpread(_objectSpread({}, query), {}, { before: lastResultTime }));
    }
  }

  render() {
    const { children, searchResults } = this.props;

    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "activity-log-form" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.LocalForm, { onSubmit: this.handleSubmit }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group col-sm-12 col-md-6 col-lg-2" }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "find" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "User")), /*#__PURE__*/

      _jsx(_reactReduxForm.Control.text, { className: "form-control", model: ".username", id: "username" })), /*#__PURE__*/

      _jsx("div", { className: "form-group col-sm-12 col-md-6 col-lg-4" }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "find" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Find")), /*#__PURE__*/

      _jsx(_reactReduxForm.Control.text, {
        className: "form-control",
        model: ".find",
        id: "find",
        placeholder: "by ids, methods, keywords, etc." })), /*#__PURE__*/


      _jsx("div", { className: "form-group col-sm-12 col-lg-6" }, void 0, /*#__PURE__*/
      _jsx("label", { htmlFor: "time" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Time")), /*#__PURE__*/

      _jsx(_ReactReduxForms.DateRange, {
        className: "form-control",
        model: ".time",
        id: "time",
        format: "yyyy-MM-dd",
        useTimezone: true })), /*#__PURE__*/


      _jsx("div", { className: "form-group col-sm-12" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "submit", className: "btn btn-success" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Search"))))),





      children, /*#__PURE__*/

      _jsx("div", { className: "text-center" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: `btn btn-default btn-load-more ${
        searchResults.get('remainingRows') ? '' : 'disabled'
        }`,
        onClick: () => {
          this.loadMore();
        } }, void 0,

      (0, _I18N.t)('System', 'x more')))));




  }}


ActivitylogForm.defaultProps = {
  children: null };









const mapStateToProps = ({ activitylog }) => ({ searchResults: activitylog.search });exports.mapStateToProps = mapStateToProps;

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{ submit: actions.activitylogSearch, searchMore: actions.activitylogSearchMore },
dispatch);exports.mapDispatchToProps = mapDispatchToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ActivitylogForm);exports.default = _default;