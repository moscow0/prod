"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SearchEntities = void 0;var _react = _interopRequireWildcard(require("react"));

var _SearchResults = _interopRequireDefault(require("../../Connections/components/SearchResults"));

var _SearchInput = _interopRequireDefault(require("../../Layout/SearchInput"));
var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _RequestParams = require("../../utils/RequestParams");

var _immutable = _interopRequireDefault(require("immutable"));
var _SearchAPI = _interopRequireDefault(require("../../Search/SearchAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}













class SearchEntities extends _react.Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: _immutable.default.fromJS([]), searching: false, touched: false };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.search = this.search.bind(this);
  }

  componentDidMount() {
    if (this.props.initialSearchTerm) {
      this.search(this.props.initialSearchTerm);
    }
  }

  onSelect(_sharedId, entity) {
    this.props.onSelect(entity);
  }

  search(searchTerm) {
    this.setState({ searching: true });
    const requestParams = new _RequestParams.RequestParams({
      searchTerm,
      fields: ['title'],
      includeUnpublished: true });


    return _SearchAPI.default.search(requestParams).then(
    ({ rows: searchResults }) => {
      this.setState({
        searchResults: _immutable.default.fromJS(searchResults),
        searching: false });

      this.props.onFinishSearch(searchTerm);
    });

  }

  onChange(e) {
    this.setState({ touched: true });
    const searchTerm = e.target.value;
    return (0, _debounce.default)(this.search, 400)(searchTerm);
  }

  render() {
    const { searchResults, searching } = this.state;
    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "search-box" }, void 0, /*#__PURE__*/
      _jsx(_SearchInput.default, {
        onChange: this.onChange,
        value: !this.state.touched ? this.props.initialSearchTerm : undefined })), /*#__PURE__*/


      _jsx(_SearchResults.default, { results: searchResults, searching: searching, onClick: this.onSelect })));


  }}exports.SearchEntities = SearchEntities;