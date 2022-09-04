"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.ListChartComponent = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = _interopRequireDefault(require("immutable"));
var _risonNode = _interopRequireDefault(require("rison-node"));
var _qs = _interopRequireDefault(require("qs"));

var _Loader = _interopRequireDefault(require("../../components/Elements/Loader"));
var _Charts = require("../../Charts");
var _MarkdownLink = _interopRequireDefault(require("./MarkdownLink"));
var _markdownDatasets = _interopRequireDefault(require("../markdownDatasets"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const ListChartComponent = (props) => {
  const { excludeZero, property, data, classname, context, scatter, colors } = props;
  const sliceColors = colors.split(',');

  let output = /*#__PURE__*/_jsx(_Loader.default, {});

  if (data) {
    const formattedData = _Charts.arrayUtils.sortValues(
    _Charts.arrayUtils.formatDataForChart(data, property, {
      excludeZero: Boolean(excludeZero),
      context,
      scatter }));


    let query = { filters: {} };

    if (props.baseUrl) {
      const { q } = _qs.default.parse(props.baseUrl.substring(props.baseUrl.indexOf('?')), {
        ignoreQueryPrefix: true });

      query = _risonNode.default.decode(q);
      query.filters = query.filters || {};
    }

    output = /*#__PURE__*/
    _jsx("ul", {}, void 0,
    formattedData.map((item, index) => {
      const Content = /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", {
        className: "list-bullet",
        style: { backgroundColor: sliceColors[index % sliceColors.length] } }, void 0, /*#__PURE__*/

      _jsx("span", {}, void 0, item.results)), /*#__PURE__*/

      _jsx("span", { className: "list-label" }, void 0,
      scatter ? `${item.parent} - ${item.label}` : item.label));




      query.filters[property] = { values: [item.id] };

      return /*#__PURE__*/(
        _jsx("li", {}, item.id,
        props.baseUrl && /*#__PURE__*/
        _jsx(_MarkdownLink.default, { url: `/library/?q=${_risonNode.default.encode(query)}`, classname: "list-link" }, void 0,
        Content),


        !props.baseUrl && Content));


    }));


  }

  return /*#__PURE__*/_jsx("div", { className: `ListChart ${classname}` }, void 0, output);
};exports.ListChartComponent = ListChartComponent;

ListChartComponent.defaultProps = {
  context: 'System',
  excludeZero: false,
  scatter: false,
  classname: '',
  colors: '#ffcc00,#ffd633,#ffe066,#ffeb99,#fff5cc',
  data: null,
  baseUrl: null };













const mapStateToProps = (state, props) => ({
  data: _markdownDatasets.default.getAggregations(state, props),
  thesauris: state.thesauris });exports.mapStateToProps = mapStateToProps;var _default =


(0, _reactRedux.connect)(mapStateToProps)(ListChartComponent);exports.default = _default;