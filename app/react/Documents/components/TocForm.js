"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.TocForm = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactReduxForm = require("react-redux-form");
var _UI = require("../../UI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class TocForm extends _react.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  indentButton(direction, tocElement) {
    const { indent } = this.props;
    const onClick = indent.bind(
    null,
    tocElement,
    tocElement.indentation + (direction === 'more' ? 1 : -1));

    return /*#__PURE__*/(
      _jsx("button", { type: "button", onClick: onClick, className: `toc-indent-${direction} btn btn-default` }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: direction === 'more' ? 'arrow-right' : 'arrow-left', directionAware: true })));


  }

  submit(toc) {
    this.props.onSubmit(toc, this.props.file._id);
  }

  render() {
    const { toc, model, removeEntry } = this.props;
    return /*#__PURE__*/(
      _jsx(_reactReduxForm.Form, { className: "toc", id: "tocForm", model: model, onSubmit: this.submit }, void 0,
      toc.map((tocElement, index) => /*#__PURE__*/
      _jsx("div", { className: `toc-indent-${tocElement.indentation}` }, index, /*#__PURE__*/
      _jsx("div", { className: "toc-edit" }, void 0,
      this.indentButton('less', tocElement),
      this.indentButton('more', tocElement), /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: `${model}[${index}].label` }, void 0, /*#__PURE__*/
      _jsx("input", { className: "form-control" })), /*#__PURE__*/

      _jsx("button", {
        type: "button",
        onClick: removeEntry.bind(this, tocElement),
        className: "btn btn-danger" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" })))))));






  }}exports.TocForm = TocForm;


TocForm.defaultProps = {
  toc: [],
  removeEntry: () => {},
  indent: () => {},
  onSubmit: () => {} };var _default =











TocForm;exports.default = _default;