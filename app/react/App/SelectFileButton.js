"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.SelectFileButton = void 0;var _react = _interopRequireWildcard(require("react"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const SelectFileButton = ({ onFileImported, children }) => {
  // @ts-ignore
  const fileInputRef = (0, _react.useRef)();

  const show = () => {
    if (fileInputRef.current !== null) {var _fileInputRef$current;
      (_fileInputRef$current = fileInputRef.current) === null || _fileInputRef$current === void 0 ? void 0 : _fileInputRef$current.click();
    }
  };

  const select = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileImported(file);
    }
  };

  return /*#__PURE__*/(
    _jsx("div", { onClick: show, style: { display: 'inline' } }, void 0,
    children, /*#__PURE__*/
    _react.default.createElement("input", {
      ref: fileInputRef,
      type: "file",
      accept: "text/csv",
      style: { display: 'none' },
      onChange: select })));



};exports.SelectFileButton = SelectFileButton;