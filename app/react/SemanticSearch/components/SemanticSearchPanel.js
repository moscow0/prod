"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SemanticSearchSidePanel = void 0;exports.mapDispatchToProps = mapDispatchToProps;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = require("immutable");
var _socket = require("../../socket");
var _UI = require("../../UI");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));

var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _actions = require("../actions/actions");







var _SearchList = _interopRequireDefault(require("./SearchList"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class SemanticSearchSidePanel extends _react.Component {
  constructor(props) {
    super(props);

    this.registeredForUpdates = false;
    this.onSearchUpdated = this.onSearchUpdated.bind(this);

    _socket.socket.on('semanticSearchUpdated', this.onSearchUpdated);
  }

  componentDidMount() {
    if (!this.registeredForUpdates) {
      this.props.registerForUpdates();
      this.registeredForUpdates = true;
    }
    this.props.fetchSearches();
  }

  componentWillUnmount() {
    _socket.socket.removeListener('semanticSearchUpdated', this.onSearchUpdated);
  }

  onSearchUpdated({ updatedSearch }) {
    this.props.updateSearch(updatedSearch);
  }

  render() {
    const searches = this.props.searches.toJS();
    const { open } = this.props;
    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: open, className: "metadata-sidepanel semantic-search" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: this.props.hideSemanticSearch }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-body" }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: !!searches }, void 0, /*#__PURE__*/
      _jsx(_SearchList.default, { searches: searches })))));




  }}exports.SemanticSearchSidePanel = SemanticSearchSidePanel;











function mapStateToProps(state) {
  return {
    searches: state.semanticSearch.searches,
    search: state.semanticSearch.search,
    open: state.semanticSearch.showSemanticSearchPanel };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    fetchSearches: _actions.fetchSearches,
    submitNewSearch: _actions.submitNewSearch,
    registerForUpdates: _actions.registerForUpdates,
    updateSearch: _actions.updateSearch,
    hideSemanticSearch: _actions.hideSemanticSearch },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SemanticSearchSidePanel);exports.default = _default;