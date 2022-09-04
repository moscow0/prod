"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.MetadataPanelMenu = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _Metadata = require("../../Metadata");
var _ContextMenu = require("../../ContextMenu");
var _Auth = require("../../Auth");
var _UI = require("../../UI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class MetadataPanelMenu extends _react.Component {
  render() {
    if (this.props.targetDoc) {
      return false;
    }
    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      (() => {
        if (this.props.docForm && this.props.docForm._id) {
          let disabled = true;
          if (this.props.formState.dirty) {
            disabled = false;
          }

          return /*#__PURE__*/(
            _jsx(_ContextMenu.MenuButtons.Main, { disabled: disabled }, void 0, /*#__PURE__*/
            _jsx("button", { type: "submit", form: "metadataForm", disabled: disabled }, void 0, /*#__PURE__*/
            _jsx(_UI.Icon, { icon: "save" }))));



        }
        return /*#__PURE__*/(
          _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'] }, void 0, /*#__PURE__*/
          _jsx(_ContextMenu.MenuButtons.Main, {
            onClick: () =>
            this.props.loadInReduxForm(
            'documentViewer.docForm',
            this.props.doc.toJS(),
            this.props.templates.toJS()) }, void 0, /*#__PURE__*/



          _jsx(_UI.Icon, { icon: "pencil-alt" }))));



      })()));


  }}exports.MetadataPanelMenu = MetadataPanelMenu;











const mapStateToProps = ({ documentViewer, templates }) => ({
  doc: documentViewer.doc,
  templates,
  docForm: documentViewer.docForm,
  formState: documentViewer.docFormState,
  targetDoc: !!documentViewer.targetDoc.get('_id') });


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ loadInReduxForm: _Metadata.actions.loadInReduxForm }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MetadataPanelMenu);exports.default = _default;