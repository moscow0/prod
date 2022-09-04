"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TableCellComponent = exports.TableCell = void 0;var _react = _interopRequireDefault(require("react"));

var _Metadata = require("../../Metadata/components/Metadata");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}


















const formatProperty = (prop) => {
  if (!(prop !== null && prop !== void 0 && prop.value)) {
    return undefined;
  }

  const inheritedMedia =
  prop.type === 'inherit' && (prop.inheritedType === 'image' || prop.inheritedType === 'media');
  const typeMedia = prop.type === 'image' || prop.type === 'media';

  if (inheritedMedia || typeMedia) {
    return undefined;
  }
  return (0, _Metadata.showByType)(prop, true);
};

const TableCellComponent = (props) => {
  const cellValue = formatProperty(props.content);
  return /*#__PURE__*/(
    _jsx("div", { className: `table-view-cell table-view-row-zoom-${props.zoomLevel}` }, void 0, cellValue));

};exports.TableCellComponent = TableCellComponent;

const TableCell = /*#__PURE__*/_react.default.memo(TableCellComponent);exports.TableCell = TableCell;