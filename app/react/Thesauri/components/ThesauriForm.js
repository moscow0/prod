"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ThesauriForm = void 0;exports.mapStateToProps = mapStateToProps;
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _FormGroup = _interopRequireDefault(require("../../DocumentForm/components/FormGroup"));
var _Layout = require("../../Layout");
var _DragAndDrop = require("../../Layout/DragAndDrop");
var _validator = require("../../Metadata/helpers/validator");
var _thesauriActions = require("../actions/thesauriActions");








var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _redux = require("redux");
var _UI = require("../../UI");
var _I18N = require("../../I18N");

var _SelectFileButton = require("../../App/SelectFileButton");
var _ThesauriFormItem = require("./ThesauriFormItem");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

function sanitizeThesauri(thesaurus) {
  const sanitizedThesauri = _objectSpread({}, thesaurus);
  sanitizedThesauri.values = sanitizedThesauri.values.
  filter((value) => value.label).
  filter((value) => !value.values || value.values.length).
  map((value) => {
    const _value = _objectSpread({}, value);
    if (_value.values) {
      _value.values = _value.values.filter((_v) => _v.label);
    }
    return _value;
  });
  return sanitizedThesauri;
}

class ThesauriForm extends _react.Component {
  static validation(thesauris, id) {
    return {
      name: {
        duplicated: (val) =>
        !thesauris.find(
        (thesauri) =>
        thesauri.type !== 'template' &&
        thesauri._id !== id &&
        thesauri.name.trim().toLowerCase() === val.trim().toLowerCase()),

        required: _validator.notEmpty } };


  }

  constructor(props) {
    super(props);
    this.save = this.save.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.onChange = this.onChange.bind(this);
    this.importThesaurusFile = this.importThesaurusFile.bind(this);
  }

  componentDidMount() {
    this.firstLoad = true;
  }

  componentDidUpdate(previousProps) {
    if (this.firstLoad) {
      this.firstLoad = false;
      return;
    }

    this.addEmptyValueAtTheEnd();

    this.focusIfWasGroup(previousProps);
  }

  componentWillUnmount() {
    this.props.resetForm('thesauri.data');
    this.props.setInitial('thesauri.data');
  }

  onChange(values, groupIndex) {
    this.props.updateValues(values, groupIndex);
  }

  importThesaurusFile(file) {
    const thes = sanitizeThesauri(this.props.thesauri);
    this.props.importThesaurus(thes, file);
  }

  focusIfWasGroup(previousProps) {
    const { values } = this.props.thesauri;
    const previousValues = previousProps.thesauri.values;
    const addedValue = values.length > previousProps.thesauri.values.length;
    const lastValueIsGroup = values.length && values[values.length - 1].values;
    const previousLastValueWasGroup =
    previousValues.length && previousValues[previousValues.length - 1].values;
    if (lastValueIsGroup && (!previousLastValueWasGroup || addedValue)) {
      this.groups[this.groups.length - 1].focus();
    }
  }

  addEmptyValueAtTheEnd() {
    this.props.thesauri.values.forEach((value, index) => {
      if (
      value.values && (
      !value.values.length || value.values[value.values.length - 1].label !== ''))
      {
        this.props.addValue(index);
      }
    });

    if (
    !this.props.thesauri.values.length ||
    this.props.thesauri.values[this.props.thesauri.values.length - 1].label !== '')
    {
      this.props.addValue();
    }
  }

  save(thesauri) {
    const sanitizedThesauri = sanitizeThesauri(thesauri);
    this.props.saveThesaurus(sanitizedThesauri);
  }

  renderItem(value, index) {
    return /*#__PURE__*/(
      _react.default.createElement(_ThesauriFormItem.ThesauriFormItem, {
        ref: (f) => this.groups.push(f),
        value: value,
        index: index,
        removeValue: this.props.removeValue,
        onChange: this.onChange }));


  }

  render() {
    const isNew = this.props.new;
    const id = this.props.thesauri._id;
    const { values } = this.props.thesauri;
    if (!isNew && !id) {
      return false;
    }

    this.groups = [];
    return /*#__PURE__*/(
      _jsx("div", { className: "thesauri" }, void 0, /*#__PURE__*/
      _jsx(_reactReduxForm.Form, {
        model: "thesauri.data",
        onSubmit: this.save,
        validators: ThesauriForm.validation(this.props.thesauris.toJS(), this.props.thesauri._id) }, void 0, /*#__PURE__*/

      _jsx("div", { className: "panel panel-default thesauri" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _react.default.createElement(_FormGroup.default, _extends({}, this.props.state.name, { submitFailed: this.props.state.submitFailed }), /*#__PURE__*/
      _jsx(_reactReduxForm.Field, { model: ".name" }, void 0, /*#__PURE__*/
      _jsx("input", {
        id: "thesauriName",
        className: "form-control",
        type: "text",
        placeholder: "Thesauri name" }), /*#__PURE__*/

      _jsx(_ShowIf.default, {
        if:
        this.props.state.$form.touched &&
        this.props.state.name &&
        this.props.state.name.errors.duplicated }, void 0, /*#__PURE__*/


      _jsx("div", { className: "validation-error" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "xs" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Duplicated name")))))), /*#__PURE__*/





      _jsx("div", { className: "thesauri-values" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "" }, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Items:"))), /*#__PURE__*/


      _jsx(_DragAndDrop.DragAndDropContainer, {
        onChange: this.onChange,
        renderItem: this.renderItem,
        items: values,
        iconHandle: true })), /*#__PURE__*/


      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx(_Layout.BackButton, { to: "/settings/dictionaries", className: "btn-plain" })), /*#__PURE__*/

      _jsx("div", { className: "btn-cluster lg-margin-left-12 sm-order-1 sm-footer-extra-row" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-default", onClick: this.props.addGroup }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Add group"))), /*#__PURE__*/


      _jsx("button", { type: "button", className: "btn btn-default", onClick: this.props.sortValues }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "sort-alpha-down" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Sort"))), /*#__PURE__*/


      _jsx(_SelectFileButton.SelectFileButton, { onFileImported: this.importThesaurusFile }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-default import-template" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "upload" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Import"))))), /*#__PURE__*/




      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings/dictionaries", className: "btn btn-default btn-extra-padding" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("button", { type: "submit", className: "btn btn-success btn-extra-padding save-template" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save")))))))));








  }}exports.ThesauriForm = ThesauriForm;


ThesauriForm.defaultProps = {
  new: false };


















function mapStateToProps(state) {
  return {
    thesauri: state.thesauri.data,
    thesauris: state.thesauris,
    state: state.thesauri.formState };

}

function bindActions(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    saveThesaurus: _thesauriActions.saveThesaurus,
    importThesaurus: _thesauriActions.importThesaurus,
    addValue: _thesauriActions.addValue,
    addGroup: _thesauriActions.addGroup,
    sortValues: _thesauriActions.sortValues,
    removeValue: _thesauriActions.removeValue,
    updateValues: _thesauriActions.updateValues,
    resetForm: _reactReduxForm.actions.reset,
    setInitial: _reactReduxForm.actions.setInitial,
    validate: _reactReduxForm.actions.validate },

  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, bindActions, null, { withRef: true })(ThesauriForm);exports.default = _default;