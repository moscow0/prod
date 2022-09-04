"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ItemList = void 0;var _react = _interopRequireWildcard(require("react"));
var _immutable = require("immutable");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _qs = _interopRequireDefault(require("qs"));

var _Lists = require("../../Layout/Lists");
var _Doc = _interopRequireDefault(require("../../Library/components/Doc"));
var _I18N = require("../../I18N");
var _libraryActions = require("../../Library/actions/libraryActions");
var _Multireducer = require("../../Multireducer");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _slider = _interopRequireDefault(require("./slider"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ItemList extends _react.Component {
  render() {
    const { items, link } = this.props;
    const { sort } = _qs.default.parse(link.substring(link.indexOf('?')), { ignoreQueryPrefix: true });
    const searchParams = sort ? { sort } : { sort: 'title' };

    const mapDispatchToProps = (dispatch) =>
    (0, _redux.bindActionCreators)(
    {
      onClick: (_e, item) => (0, _libraryActions.selectSingleDocument)(item) },

    (0, _Multireducer.wrapDispatch)(dispatch, 'library'));


    const toRenderItems = items.map((item, index) => {
      const ConnectedItem = (0, _reactRedux.connect)(null, mapDispatchToProps)(_Doc.default);
      return /*#__PURE__*/(
        _jsx(ConnectedItem, {

          doc: (0, _immutable.fromJS)(item),
          searchParams: searchParams,
          storeKey: "library" }, index));


    });

    let list = /*#__PURE__*/_jsx(_Lists.RowList, {}, void 0, toRenderItems);

    if (this.props.options.slider) {
      list = /*#__PURE__*/
      _jsx(_Lists.RowList, {}, void 0, /*#__PURE__*/
      _jsx(_slider.default, { visibleCount: 3 }, void 0, toRenderItems));


    }

    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      list, /*#__PURE__*/
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "col-sm-12 text-center" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: `${link}` }, void 0, /*#__PURE__*/
      _jsx("button", { className: "btn btn-default" }, void 0, (0, _I18N.t)('System', 'View in library')))))));





  }}exports.ItemList = ItemList;


ItemList.defaultProps = {
  items: [],
  options: {} };var _default =








ItemList;exports.default = _default;