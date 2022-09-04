"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.DocumentCounter = void 0;var _react = _interopRequireDefault(require("react"));
var _I18N = require("../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}









const DocumentCounter = (props) => {
  const {
    totalConnectionsCount,
    selectedEntitiesCount,
    entityListCount,
    entityTotal,
    hitsTotalRelation } =
  props;
  const totalEntitiesValue = /*#__PURE__*/_jsx("b", {}, void 0, " ", `${entityTotal}${hitsTotalRelation === 'gte' ? '+' : ''}`, " ");
  const entityCounter = /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null,
  selectedEntitiesCount > 0 && /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
  _jsx("b", {}, void 0, " ", selectedEntitiesCount, " "), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "selected of")), /*#__PURE__*/


  _jsx("b", {}, void 0, " ", entityListCount, " "), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "shown of"),
  totalEntitiesValue, /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "entities"));


  const connectionsCounter = /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
  _jsx("b", {}, void 0, totalConnectionsCount, " "), /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "connections"), ", ", /*#__PURE__*/_jsx("b", {}, void 0, totalEntitiesValue, " "), /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "entities"));



  return /*#__PURE__*/_jsx("span", {}, void 0, totalConnectionsCount === undefined ? entityCounter : connectionsCounter);
};exports.DocumentCounter = DocumentCounter;