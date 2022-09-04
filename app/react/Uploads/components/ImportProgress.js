"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.ImportProgress = void 0;

var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _redux = require("redux");
var _uploadsActions = require("../actions/uploadsActions");
var _immutable = _interopRequireDefault(require("immutable"));
var _StackTrace = _interopRequireDefault(require("../../components/Elements/StackTrace"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ImportProgress extends _react.Component {
  render() {
    const {
      close,
      importState: { importStart, importProgress, importError, importEnd } } =
    this.props;
    if (!importStart && !importProgress) {
      return false;
    }
    if (importEnd) {
      return /*#__PURE__*/(
        _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
        _jsx(_UI.Icon, { icon: "check", size: "2x" }), /*#__PURE__*/
        _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Import completed:"), "\xA0", importProgress, ' ', /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "created"), /*#__PURE__*/
        _jsx("br", {}), /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "Indexing entities may take a few minutes")), /*#__PURE__*/

        _jsx(_UI.Icon, { style: { cursor: 'pointer' }, icon: "times", onClick: close })));


    }

    if (importError.get('prettyMessage')) {
      return /*#__PURE__*/(
        _jsx("div", {}, void 0, /*#__PURE__*/
        _jsx("div", { className: "alert alert-danger" }, void 0, /*#__PURE__*/
        _jsx(_UI.Icon, { icon: "exclamation-triangle", size: "2x" }), /*#__PURE__*/
        _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, "The import process threw an error:")), /*#__PURE__*/

        _jsx(_UI.Icon, { style: { cursor: 'pointer' }, icon: "times", onClick: close })), /*#__PURE__*/

        _jsx(_StackTrace.default, {
          message: importError.get('prettyMessage'),
          validations: importError.get('validations') })));



    }

    return /*#__PURE__*/(
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "cog", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Importing data in progress"), ": ", importProgress)));



  }}exports.ImportProgress = ImportProgress;












const mapStateToProps = (state) => ({
  importState: state.importEntities });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ close: _uploadsActions.closeImportProgress }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ImportProgress);exports.default = _default;