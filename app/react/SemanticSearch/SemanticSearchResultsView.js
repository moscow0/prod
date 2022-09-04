"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));

var _BasicReducer = require("../BasicReducer");
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _SearchButton = _interopRequireDefault(require("../Library/components/SearchButton"));

var _SemanticSearchResults = _interopRequireDefault(require("./components/SemanticSearchResults"));
var _SemanticSearchAPI = _interopRequireDefault(require("./SemanticSearchAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class SemanticSearchResultsView extends _RouteHandler.default {
  static async requestState(requestParams, state) {
    const filters = state.semanticSearch ?
    state.semanticSearch.resultsFilters :
    { threshold: 0.4, minRelevantSentences: 5 };
    const args = requestParams.add(filters);
    const search = await _SemanticSearchAPI.default.getSearch(args);
    return [_BasicReducer.actions.set('semanticSearch/search', search)];
  }

  static renderTools() {
    return /*#__PURE__*/(
      _jsx("div", { className: "searchBox" }, void 0, /*#__PURE__*/
      _jsx(_SearchButton.default, { storeKey: "library" })));


  }

  render() {
    return /*#__PURE__*/_jsx(_SemanticSearchResults.default, {});
  }}exports.default = SemanticSearchResultsView;