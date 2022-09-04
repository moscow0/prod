"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.dropTarget = exports.dragSource = exports.default = exports.MetadataProperty = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactDnd = require("react-dnd");
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _uiActions = require("../actions/uiActions");
var _modalActions = require("../../Modals/actions/modalActions");
var _templateActions = require("../actions/templateActions");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _UI = require("../../UI");
var _StateSelector = require("../../Review/components/StateSelector");
var _reselect = require("reselect");
var _I18N = require("../../I18N");

var _FormConfigInput = _interopRequireDefault(require("./FormConfigInput"));
var _FormConfigSelect = _interopRequireDefault(require("./FormConfigSelect"));
var _FormConfigRelationship = _interopRequireDefault(require("./FormConfigRelationship"));
var _FormConfigNested = _interopRequireDefault(require("./FormConfigNested"));
var _FormConfigCommon = _interopRequireDefault(require("./FormConfigCommon"));
var _FormConfigMultimedia = _interopRequireDefault(require("./FormConfigMultimedia"));
var _Icons = _interopRequireDefault(require("./Icons"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const isLabelDuplicated = (index, template, formState) => {
  const commonPropIndex = index + template.commonProperties.length;
  return (
    Boolean(formState.$form.errors[`properties.${index}.label.duplicated`]) ||
    Boolean(formState.$form.errors[`commonProperties.${commonPropIndex}.label.duplicated`]));

};

const isErrorOnThisField = (error, index, isCommonProperty, template) => {
  const commonPropIndex = index + template.commonProperties.length;
  const [errorRoot, errorIndex] = error.split('.');
  return errorRoot === 'commonProperties' ?
  errorIndex === commonPropIndex.toString() && isCommonProperty :
  errorIndex === index.toString() && !isCommonProperty;
};

class MetadataProperty extends _react.Component {
  renderForm() {
    const { type, index } = this.props;
    let defaultInput = /*#__PURE__*/_jsx(_FormConfigInput.default, { type: type, index: index });

    if (this.props.isCommonProperty) {
      return /*#__PURE__*/_jsx(_FormConfigCommon.default, { index: index, type: type });
    }
    if (type === 'relationship') {
      defaultInput = /*#__PURE__*/_jsx(_FormConfigRelationship.default, { index: index, type: type });
    }
    if (type === 'select' || type === 'multiselect') {
      defaultInput = /*#__PURE__*/_jsx(_FormConfigSelect.default, { index: index, type: type });
    }
    if (type === 'nested') {
      defaultInput = /*#__PURE__*/_jsx(_FormConfigNested.default, { index: index, type: type });
    }
    if (type === 'media' || type === 'image' || type === 'preview') {
      defaultInput = /*#__PURE__*/
      _jsx(_FormConfigMultimedia.default, {
        type: type,
        index: index,
        canSetStyle: type === 'image' || type === 'preview',
        canBeRequired: type !== 'preview' });


    }
    if (type === 'geolocation' || type === 'link') {
      defaultInput = /*#__PURE__*/_jsx(_FormConfigInput.default, { type: type, index: index, canBeFilter: false });
    }
    return defaultInput;
  }

  render() {
    const {
      label,
      connectDragSource,
      isDragging,
      connectDropTarget,
      uiState,
      index,
      localID,
      inserting,
      hasErrors,
      submitFailed } =
    this.props;
    const { editingProperty } = uiState.toJS();

    let propertyClass = 'list-group-item';
    if (isDragging || inserting) {
      propertyClass += ' dragging';
    }

    if (hasErrors && submitFailed) {
      propertyClass += ' error';
    }

    const iconClass = _Icons.default[this.props.type] || 'font';
    const beingEdited = editingProperty === localID;

    const property = /*#__PURE__*/
    _jsx("div", { className: propertyClass }, void 0, /*#__PURE__*/
    _jsx("span", { className: "property-name" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: this.props.isCommonProperty ? 'lock' : 'bars', fixedWidth: true }), /*#__PURE__*/
    _jsx(_UI.Icon, { icon: iconClass, fixedWidth: true }),
    label !== null ?
    label : /*#__PURE__*/

    _jsx(_StateSelector.StateSelector, {
      propertyLabel: (0, _reselect.createSelector)(
      (state) =>
      state.template.data.properties[this.props.index] ?
      state.template.data.properties[this.props.index].label :
      '',
      (value) => value) }, void 0,


    ({ propertyLabel }) => propertyLabel)), /*#__PURE__*/



    _jsx("div", { className: "list-group-item-actions" }, void 0,
    this.props.isLabelDuplicated && /*#__PURE__*/
    _jsx("span", { className: "validation-error" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exclamation-triangle" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Duplicated label")),


    this.props.isRelationDuplicated && /*#__PURE__*/
    _jsx("span", { className: "validation-error" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exclamation-triangle" }), /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cannot use 'any entity or document' if another relationship of the same type is already with a specific entity.")),





    !this.props.syncedTemplate && /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "btn btn-default btn-xs property-edit",
      onClick: () => this.props.editProperty(beingEdited ? null : localID) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "pencil-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Edit")),

    !this.props.isCommonProperty && /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "btn btn-danger btn-xs property-remove",
      onClick: () => this.props.removeProperty('RemovePropertyModal', index) }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "trash-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Delete")))));








    if (this.props.isCommonProperty) {
      return /*#__PURE__*/(
        _jsx("li", {}, void 0,
        property, /*#__PURE__*/
        _jsx(_ShowIf.default, { if: beingEdited && !isDragging }, void 0, /*#__PURE__*/
        _jsx("div", { className: `propery-form${editingProperty === localID ? ' expand' : ''}` }, void 0,
        this.renderForm()))));




    }

    return connectDropTarget( /*#__PURE__*/
    _jsx("li", {}, void 0,
    connectDragSource(property), /*#__PURE__*/
    _jsx(_ShowIf.default, { if: beingEdited && !isDragging }, void 0, /*#__PURE__*/
    _jsx("div", { className: `propery-form${editingProperty === localID ? ' expand' : ''}` }, void 0,
    this.renderForm()))));




  }}exports.MetadataProperty = MetadataProperty;


MetadataProperty.defaultProps = {
  label: null,
  submitFailed: false,
  hasErrors: false,
  isLabelDuplicated: false,
  isRelationDuplicated: false,
  syncedTemplate: false };






















const target = {
  hover(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;
    const item = monitor.getItem();
    if (props.localID === item.editingProperty) {
      props.editProperty(null);
    }
    if (typeof dragIndex === 'undefined') {
      item.inserting = true;
      item.index = 0;
      props.addProperty({ label: item.label, type: item.type, inserting: true }, 0);
      return;
    }

    if (dragIndex === hoverIndex) {
      return;
    }

    if (item.alreadyReordered) {
      item.alreadyReordered = false;
      return;
    }

    props.reorderProperty(dragIndex, hoverIndex);
    item.index = hoverIndex;
    item.alreadyReordered = true;
  } };


const dropTarget = (0, _reactDnd.DropTarget)(['METADATA_PROPERTY', 'METADATA_OPTION'], target, (connector) => ({
  connectDropTarget: connector.dropTarget() }))(
MetadataProperty);exports.dropTarget = dropTarget;

const source = {
  beginDrag(props) {
    return {
      index: props.index,
      label: props.label,
      type: props.type,
      editingProperty: props.uiState.get('editingProperty') };

  },
  endDrag(props, monitor) {
    const item = monitor.getItem();
    props.editProperty(item.editingProperty);
  } };


const dragSource = (0, _reactDnd.DragSource)('METADATA_PROPERTY', source, (connector, monitor) => ({
  connectDragSource: connector.dragSource(),
  isDragging: monitor.isDragging() }))(
dropTarget);exports.dragSource = dragSource;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  { removeProperty: _modalActions.showModal, reorderProperty: _templateActions.reorderProperty, addProperty: _templateActions.addProperty, editProperty: _uiActions.editProperty },
  dispatch);

}

const mapStateToProps = ({ template }, ownProps) => ({
  uiState: template.uiState,
  hasErrors: Object.keys(template.formState.$form.errors || {}).reduce(
  (result, error) =>
  result ||
  isErrorOnThisField(error, ownProps.index, ownProps.isCommonProperty, template.data) &&
  template.formState.$form.errors[error],
  false),

  isLabelDuplicated: isLabelDuplicated(ownProps.index, template.data, template.formState),
  isRelationDuplicated: Boolean(
  template.formState.$form.errors[`properties.${ownProps.index}.relationType.duplicated`]),

  submitFailed: template.formState.$form.submitFailed });var _default =




(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(dragSource);exports.default = _default;