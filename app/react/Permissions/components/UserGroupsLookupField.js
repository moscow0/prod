"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserGroupsLookupField = void 0;var _I18N = require("../../I18N");
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");

var _debounce = _interopRequireDefault(require("../../utils/debounce"));
var _MemberListItemInfo = require("./MemberListItemInfo");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}







const UserGroupsLookupField = ({
  onChange,
  onSelect,
  options }) =>
{
  const [selected, setSelected] = (0, _react.useState)(null);
  const [show, setShow] = (0, _react.useState)(false);
  const [searchTerm, setSearchTerm] = (0, _react.useState)('');
  const debouncedOnChange = (0, _react.useCallback)((0, _debounce.default)(onChange, 500), [onChange]);

  const onChangeHandler = (event) => {
    setShow(true);
    setSearchTerm(event.target.value);
    debouncedOnChange(event.target.value);
  };

  const getOnSelectHandler = (selection) => () => {
    onSelect(selection);
    setShow(false);
  };

  const onKeyPressHandler = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        if (!selected) {
          setSelected(options.length - 1);
        } else {
          setSelected((selected - 1) % options.length);
        }

        break;
      case 'ArrowDown':
        event.preventDefault();
        if (selected === null) {
          setSelected(0);
        } else {
          setSelected((selected + 1) % options.length);
        }

        break;
      case 'Enter':
        event.preventDefault();
        if (selected !== null) {
          onSelect(options[selected]);
          setShow(false);
        }
        break;
      case 'Escape':
        event.preventDefault();
        setShow(false);
        break;
      default:
        break;}

  };

  const optionsListRef = (0, _react.useRef)(null);

  return /*#__PURE__*/(
    _jsx("div", { className: "userGroupsLookupField" }, void 0, /*#__PURE__*/
    _jsx("input", {
      type: "text",
      placeholder: "Add people or groups",
      onChange: onChangeHandler,
      onKeyDown: onKeyPressHandler,
      onBlur: (e) => {
        if (e.relatedTarget !== optionsListRef.current) {
          setShow(false);
        }
      },
      onFocus: () => {
        setShow(true);
      },
      value: searchTerm }),

    show && options.length ? /*#__PURE__*/
    _react.default.createElement("ul", { tabIndex: -1, role: "listbox", ref: optionsListRef },
    options.map((result, index) => /*#__PURE__*/
    _jsx("li", {

      role: "option",
      "aria-selected": index === selected,
      onClick: getOnSelectHandler(result),
      className: index === selected ? 'selected' : '' }, `${result.type}-${result.refId}`, /*#__PURE__*/

    _jsx(_MemberListItemInfo.MemberListItemInfo, { value: result }), /*#__PURE__*/
    _jsx("div", { className: "press-enter-note" }, void 0, /*#__PURE__*/
    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Press enter to add")), /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "level-down-alt", transform: { rotate: 90 } }))))) :




    null));


};exports.UserGroupsLookupField = UserGroupsLookupField;