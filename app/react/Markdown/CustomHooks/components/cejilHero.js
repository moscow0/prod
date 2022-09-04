"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.cejilChart001 = void 0;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");

var _I18N = require("../../../I18N");
var _UI = require("../../../UI");

var _SearchAPI = _interopRequireDefault(require("../../../Search/SearchAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const processesIds = ['58b2f3a35d59f31e1345b48a'];
const provisionalMeasuresIds = ['58b2f3a35d59f31e1345b4a4'];
const documentsIds = [
'58b2f3a35d59f31e1345b4ac',
'58b2f3a35d59f31e1345b471',
'58b2f3a35d59f31e1345b482',
'58b2f3a35d59f31e1345b479'];


class cejilChart001 extends _react.Component {
  getData() {
    _SearchAPI.default.search({ limit: 0 }).then((results) => {
      this.setState({ data: results.aggregations.all });
    });
  }

  conformLibraryLink(types, link) {
    const escapedValues = types.map((t) => `%27${t}%27`);
    if (link && link.indexOf('/library/') !== -1) {
      return link.substring(link.indexOf('/library/'), link.length);
    }
    return `/library/?q=(order:desc,sort:creationDate,types:!(${escapedValues.join(
    ',')
    }),userSelectedSorting:!t)`;
  }

  getCount(ids) {
    return ids.reduce((count, id) => {
      const bucket = this.state.data.types.buckets.find((b) => b.key === id);
      return count + (bucket ? bucket.filtered.doc_count : 0);
    }, 0);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const { title = '', buttons = [], links = [] } = this.props;
    const Loader = /*#__PURE__*/_jsx(_UI.Icon, { icon: "spinner", pulse: true, fixedWidth: true });

    let processesCount = Loader;
    let provisionalMeasuresCount = Loader;
    let documentsCount = Loader;

    if (this.state && this.state.data) {
      processesCount = this.getCount(processesIds);
      provisionalMeasuresCount = this.getCount(provisionalMeasuresIds);
      documentsCount = this.getCount(documentsIds);
    }

    return /*#__PURE__*/(
      _jsx("div", { className: "hero" }, void 0, /*#__PURE__*/
      _jsx("h1", {}, void 0, title), /*#__PURE__*/
      _jsx("div", { className: "hero-stats" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: this.conformLibraryLink(processesIds, links.length && links[0] ? links[0] : null) }, void 0, /*#__PURE__*/

      _jsx("h2", {}, void 0, processesCount), /*#__PURE__*/
      _jsx("span", {}, void 0, buttons[0])), /*#__PURE__*/

      _jsx(_I18N.I18NLink, {
        to: this.conformLibraryLink(
        provisionalMeasuresIds,
        links.length && links[1] ? links[1] : null) }, void 0, /*#__PURE__*/


      _jsx("h2", {}, void 0, provisionalMeasuresCount), /*#__PURE__*/
      _jsx("span", {}, void 0, buttons[1])), /*#__PURE__*/

      _jsx(_I18N.I18NLink, {
        to: this.conformLibraryLink(documentsIds, links.length && links[2] ? links[2] : null) }, void 0, /*#__PURE__*/

      _jsx("h2", {}, void 0, documentsCount), /*#__PURE__*/
      _jsx("span", {}, void 0, buttons[2])))));




  }}exports.cejilChart001 = cejilChart001;









function mapStateToProps({ templates, thesauris }) {
  return { templates, thesauris };
}var _default =

(0, _reactRedux.connect)(mapStateToProps)(cejilChart001);exports.default = _default;