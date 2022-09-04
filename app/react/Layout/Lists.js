"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.RowList = exports.List = exports.ItemName = exports.ItemFooter = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _UI = require("../UI");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const List = ({ children }) => /*#__PURE__*/_jsx("div", { className: "item-group" }, void 0, children);exports.List = List;

const ItemName = ({ children }) => /*#__PURE__*/
_jsx("div", { className: "item-name" }, void 0, /*#__PURE__*/
_jsx("span", {}, void 0, children));exports.ItemName = ItemName;



const ItemFooter = ({ children, onClick }) => /*#__PURE__*/
_jsx("div", { className: "item-actions", onClick: onClick }, void 0,
children);exports.ItemFooter = ItemFooter;



const ProgressBar = ({ progress }) => {
  let message = `${progress} % Completed`;
  let icon = 'upload';
  if (progress === 0 || progress === 100) {
    message = 'Processing...';
    icon = 'clock';
  }
  return /*#__PURE__*/(
    _jsx("div", { className: "label-progress" }, void 0, /*#__PURE__*/
    _jsx("span", { className: "label label-info" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: icon }), " ", /*#__PURE__*/_jsx("span", {}, void 0, message)), /*#__PURE__*/

    _jsx("div", { className: "progress" }, void 0, /*#__PURE__*/
    _jsx("div", {
      className: "progress-bar progress-bar-striped active",
      style: { width: `${progress}%` } }))));




};

const ItemLabel = ({ children, status }) => {
  let icon = '';
  if (status === 'success') {
    icon = /*#__PURE__*/_jsx(_UI.Icon, { icon: "check" });
  }
  if (status === 'danger') {
    icon = /*#__PURE__*/_jsx(_UI.Icon, { icon: "times" });
  }
  if (status === 'warning') {
    icon = /*#__PURE__*/_jsx(_UI.Icon, { icon: "exclamation-triangle" });
  }
  return /*#__PURE__*/(
    _jsx("span", { className: `label label-${status || 'default'}` }, void 0,
    icon, " ", /*#__PURE__*/_jsx("span", {}, void 0, children)));


};

ItemFooter.Label = ItemLabel;
ItemFooter.ProgressBar = ProgressBar;

const RowList = ({ children, zoomLevel }) => /*#__PURE__*/
_jsx("div", { className: `item-group item-group-zoom-${zoomLevel}` }, void 0, children);exports.RowList = RowList;


const RowListItem = ({
  children,
  status,
  onClick,
  onMouseEnter,
  onMouseLeave,
  active,
  className }) =>
{
  let activeClass = '';
  if (active === true) {
    activeClass = 'is-active';
  }
  if (active === false) {
    activeClass = 'is-disabled';
  }

  return /*#__PURE__*/(
    _jsx("div", {
      className: `${className} item item-status item-${status || 'default'} ${activeClass}`,
      onClick: onClick,
      onMouseEnter: onMouseEnter,
      onMouseLeave: onMouseLeave }, void 0,

    children));


};

RowList.Item = RowListItem;





RowList.defaultProps = {
  children: '',
  zoomLevel: 0 };