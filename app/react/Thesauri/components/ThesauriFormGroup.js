"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ThesauriFormGroup = void 0;var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactReduxForm = require("react-redux-form");
var _DragAndDrop = require("../../Layout/DragAndDrop");
var _UI = require("../../UI");
var _I18N = require("../../I18N");

var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));

var _ThesauriFormField = _interopRequireDefault(require("./ThesauriFormField"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}

class ThesauriFormGroup extends _react.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-unused-class-component-methods
    this.focus = () => {
      this.groupInput.focus();
    };
    this.renderItem = this.renderItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.removeGroup = this.removeGroup.bind(this);
  }

  onChange(values) {
    const { index, onChange: onGroupChanged } = this.props;
    onGroupChanged(values, index);
  }

  removeGroup() {
    const { index, removeValue } = this.props;
    removeValue(index);
  }

  renderItem(item, index) {
    const { index: groupIndex } = this.props;
    return /*#__PURE__*/_react.default.createElement(_ThesauriFormField.default, _extends({}, this.props, { value: item, index: index, groupIndex: groupIndex }));
  }

  render() {
    const { value, index: groupIndex } = this.props;
    return /*#__PURE__*/(
      _jsx("div", { className: "group" }, `group-${groupIndex}`, /*#__PURE__*/
      _jsx(_FormGroup.default, {}, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: `thesauri.data.values[${groupIndex}].label` }, void 0, /*#__PURE__*/
      _react.default.createElement("input", {
        ref: (i) => {
          this.groupInput = i;
        },
        className: "form-control",
        type: "text",
        placeholder: "Group name" }), /*#__PURE__*/

      _jsx("button", {
        tabIndex: groupIndex + 500,
        type: "button",
        className: "btn btn-xs btn-danger",
        onClick: this.removeGroup }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Delete Group")))), /*#__PURE__*/



      _jsx(_DragAndDrop.DragAndDropContainer, {
        items: value.values,
        iconHandle: true,
        renderItem: this.renderItem,
        onChange: this.onChange })));



  }}exports.ThesauriFormGroup = ThesauriFormGroup;var _default =













ThesauriFormGroup;exports.default = _default;