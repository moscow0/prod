"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MemberListItemPermission = void 0;var _react = _interopRequireWildcard(require("react"));

var _I18N = require("../../I18N");
var _permissionSchema = require("../../../shared/types/permissionSchema");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}









const MemberListItemPermission = ({
  value,
  onChange,
  onDelete,
  disabled }) =>
{
  const [stillIncludeMixed] = (0, _react.useState)(value.level === _permissionSchema.MixedAccess.MIXED);

  const onChangeHandler = (event) => {
    if (event.target.value === 'delete') {
      return onDelete(value);
    }

    return onChange(_objectSpread(_objectSpread({},
    value), {}, {
      level: event.target.value }));

  };

  return /*#__PURE__*/(
    _jsx("select", { value: value.level, onChange: onChangeHandler, disabled: disabled }, void 0,
    stillIncludeMixed ? /*#__PURE__*/
    _jsx("option", { value: _permissionSchema.MixedAccess.MIXED }, void 0, (0, _I18N.t)('System', 'Mixed access', null, false)) :
    null, /*#__PURE__*/
    _jsx("option", { value: _permissionSchema.AccessLevels.READ }, void 0, (0, _I18N.t)('System', 'Can see', null, false)),
    value.type !== _permissionSchema.PermissionType.PUBLIC ? /*#__PURE__*/
    _jsx("option", { value: _permissionSchema.AccessLevels.WRITE }, void 0, (0, _I18N.t)('System', 'Can edit', null, false)) :
    null, /*#__PURE__*/
    _jsx("option", { disabled: true }, void 0, "\u2500\u2500\u2500\u2500\u2500\u2500\u2500"), /*#__PURE__*/
    _jsx("option", { value: "delete" }, void 0, (0, _I18N.t)('System', 'Remove', null, false))));


};exports.MemberListItemPermission = MemberListItemPermission;