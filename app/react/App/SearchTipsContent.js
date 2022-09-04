"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SearchTipsContent = void 0;var _react = _interopRequireDefault(require("react"));
var _I18N = require("../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const SearchTipsContent = () => {
  return /*#__PURE__*/(
    _jsx("ul", {}, void 0, /*#__PURE__*/
    _jsx("li", {}, void 0,
    (0, _I18N.t)(
    'System',
    'Search Tips: wildcard',
    'Use an * for wildcard search. Ie: "juris*" will match words  ' +
    'such as jurisdiction, jurisdictional, jurists, jurisprudence, etc.',
    false)), /*#__PURE__*/


    _jsx("li", {}, void 0,
    (0, _I18N.t)(
    'System',
    'Search Tips: one char wildcard',
    '? for one character wildcard. Ie: "198?" will match 1980 to 1989 and also 198a, 198b, etc.',
    false)), /*#__PURE__*/


    _jsx("li", {}, void 0,
    (0, _I18N.t)(
    'System',
    'Search Tips: exact term',
    'Exact term match by enclosing your search string with quotes. Ie. "Costa Rica"' +
    ' will toss different results compared to Costa Rica without quotes.',
    false)), /*#__PURE__*/


    _jsx("li", {}, void 0,
    (0, _I18N.t)(
    'System',
    'Search Tips: proximity',
    '~ for proximity searches. Ie: "the status"~5 will find anything having "the" and' +
    '"status" within a distance of 5 words, such as "the procedural status", "the specific legal status".',
    false)), /*#__PURE__*/


    _jsx("li", {}, void 0,
    (0, _I18N.t)(
    'System',
    'Search Tips: boolean',
    'AND, OR and NOT for boolean searches. Ie. "status AND women NOT Nicaragua" will match anything ' +
    'containing both the words status and women, and necessarily not containing the word Nicaragua.',
    false))));




};exports.SearchTipsContent = SearchTipsContent;