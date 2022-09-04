"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.MetadataFormButtons = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Multireducer = require("../../Multireducer");

var _Auth = require("../../Auth");
var _I18N = require("../../I18N");
var _UI = require("../../UI");

var _ShareButton = require("../../Permissions/components/ShareButton");
var actions = _interopRequireWildcard(require("../actions/actions"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class MetadataFormButtons extends _react.Component {
  render() {
    const { entityBeingEdited, exclusivelyViewButton, formName, hideDelete, uploadFileprogress } =
    this.props;
    const data = this.props.data.toJS();

    const ViewButton = /*#__PURE__*/
    _jsx(_I18N.I18NLink, {
      to: `entity/${data.sharedId}`,
      className: "edit-metadata btn btn-default",
      tabIndex: "0" }, void 0, /*#__PURE__*/

    _jsx(_UI.Icon, { icon: "file" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "View")));




    if (exclusivelyViewButton) {
      return /*#__PURE__*/_jsx("span", {}, void 0, ViewButton);
    }

    return /*#__PURE__*/(
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0,
      this.props.includeViewButton && ViewButton, /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [data] }, void 0,
      !entityBeingEdited && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: () => {
          this.props.loadInReduxForm(
          this.props.formStatePath,
          data,
          this.props.templates.toJS());

          this.props.clearMetadataSelections();
        },
        className: "edit-metadata btn btn-default" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Edit")))), /*#__PURE__*/




      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [data] }, void 0,
      !entityBeingEdited && !hideDelete && data && data.sharedId && /*#__PURE__*/
      _jsx(_ShareButton.ShareButton, { sharedIds: [data.sharedId], storeKey: this.props.storeKey })),


      entityBeingEdited && /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-default copy-from-btn",
        onClick: this.props.copyFrom,
        disabled: uploadFileprogress !== undefined }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "copy-from", transform: "left-0.07 up-0.06" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0,
      ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Copy From")))), /*#__PURE__*/




      _jsx("div", { className: "btn-cluster content-right" }, void 0,
      entityBeingEdited && /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        disabled: uploadFileprogress !== undefined,
        onClick: () => this.props.resetForm(this.props.formStatePath),
        className: "cancel-edit-metadata btn btn-default btn-extra-padding" }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


      _jsx("button", {
        type: "submit",
        form: formName,
        className: "btn btn-success btn-extra-padding",
        disabled: uploadFileprogress !== undefined }, void 0,

      uploadFileprogress ? /*#__PURE__*/_jsx(_UI.Icon, { icon: "spinner", spin: true }) : null, /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0,
      uploadFileprogress ? /*#__PURE__*/
      _jsx("span", {}, void 0, `${uploadFileprogress}%`) : /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Save")))), /*#__PURE__*/





      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [data] }, void 0,
      !entityBeingEdited && !hideDelete && /*#__PURE__*/
      _jsx("button", {
        className: "delete-metadata btn btn-danger",
        type: "button",
        onClick: this.props.delete }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Delete")))))));







  }}exports.MetadataFormButtons = MetadataFormButtons;


MetadataFormButtons.contextTypes = {
  confirm: _propTypes.default.func };


MetadataFormButtons.defaultProps = {
  entityBeingEdited: false,
  includeViewButton: true,
  hideDelete: false,
  formName: 'metadataForm',
  delete: () => {},
  copyFrom: () => {},
  storeKey: undefined,
  uploadFileprogress: undefined };




















const mapStateToProps = (state, ownProps) => {
  const { sharedId } = ownProps.data.toJS();
  return {
    templates: state.templates,
    uploadFileprogress: sharedId ?
    state.attachments.progress.get(sharedId) :
    state.attachments.progress.get('NEW_ENTITY') };

};

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  {
    loadInReduxForm: actions.loadInReduxForm,
    resetForm: actions.resetReduxForm,
    clearMetadataSelections: actions.clearMetadataSelections },

  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MetadataFormButtons);exports.default = _default;