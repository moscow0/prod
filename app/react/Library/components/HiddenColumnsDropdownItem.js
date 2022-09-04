"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ValueItem = exports.ColumnItem = void 0;var _react = _interopRequireDefault(require("react"));
var _UI = require("../../UI");


var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const updateIndeterminate = (item) => (elem) => {
  if (item.selectAll && elem && item.indeterminate !== undefined) {
    // eslint-disable-next-line no-param-reassign
    elem.indeterminate = item.indeterminate;
  }
};

const ColumnItem = ({ item }) => /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_react.default.createElement("input", {
  ref: updateIndeterminate(item),
  type: "checkbox",
  checked: !item.hidden,
  onChange: () => {} }), /*#__PURE__*/

_jsx(_I18N.Translate, { context: item.translationContext }, void 0, item.label));exports.ColumnItem = ColumnItem;



const ValueItem =
(hiddenColumns, isOpen, closeFunction) => () => /*#__PURE__*/

_jsx("span", { className: "columns-hint", onClick: closeFunction }, void 0,
isOpen ? /*#__PURE__*/_jsx(_UI.Icon, { icon: "times" }) : /*#__PURE__*/_jsx(_UI.Icon, { icon: "bars", rotation: 90 }),
hiddenColumns.length ? `${hiddenColumns.length} ` : '', /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, hiddenColumns.length ? 'columns hidden' : 'Hide columns'));exports.ValueItem = ValueItem;