"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PDFSidePanel = void 0;var _react = _interopRequireWildcard(require("react"));
var _UI = require("../UI");
var _store = require("../store");
var _Layout = require("../Layout");
var _I18N = require("../I18N");



var _SourceDocument = _interopRequireDefault(require("../Viewer/components/SourceDocument"));
var _DocumentForm = require("../Viewer/containers/DocumentForm");
var _actions = require("../Metadata/actions/actions");
var _actions2 = require("./actions/actions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const PDFSidePanel = ({
  open,
  entitySuggestion,
  closeSidePanel,
  handleSave }) =>
{
  const [entity, setEntity] = (0, _react.useState)({});
  const [file, setFile] = (0, _react.useState)({});
  const templates = _store.store === null || _store.store === void 0 ? void 0 : _store.store.getState().templates;

  (0, _react.useEffect)(() => {
    (0, _actions2.fetchEntity)(entitySuggestion.entityId, entitySuggestion.language).
    then((response) => {
      setEntity(response[0]);
      (0, _actions.loadFetchedInReduxForm)(
      'documentViewer.sidepanel.metadata',
      response[0],
      templates === null || templates === void 0 ? void 0 : templates.toJS()).
      forEach((action) => _store.store === null || _store.store === void 0 ? void 0 : _store.store.dispatch(action));
    }).
    catch((e) => e);
  }, [entitySuggestion]);

  (0, _react.useEffect)(() => {
    if (entitySuggestion.fileId) {
      (0, _actions2.fetchFile)(entitySuggestion.fileId).
      then((response) => {
        setFile(response.json[0]);
      }).
      catch((e) => e);
    }
  }, [entitySuggestion]);

  return open ? /*#__PURE__*/
  _jsx(_Layout.SidePanel, { className: "wide", open: open }, void 0, /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
  _jsx("div", { className: "sidepanel-header buttons-align-right" }, void 0, /*#__PURE__*/
  _jsx("button", {
    type: "button",
    className: "closeSidepanel close-modal",
    onClick: closeSidePanel,
    "aria-label": "Close side panel" }, void 0, /*#__PURE__*/

  _jsx(_UI.Icon, { icon: "times" })), /*#__PURE__*/

  _jsx("div", { className: "button-list" }, void 0, /*#__PURE__*/
  _jsx("button", { type: "button", className: "btn btn-default", onClick: closeSidePanel }, void 0, /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "Cancel")), /*#__PURE__*/

  _jsx("button", { type: "submit", className: "btn btn-success", form: "metadataForm" }, void 0, /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "Save")))),



  entity.sharedId && file.filename && /*#__PURE__*/
  _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
  _jsx(_DocumentForm.DocumentForm, {
    sharedId: entity.sharedId,
    showSubset: [entitySuggestion.propertyName],
    storeKey: "documentViewer",
    fileID: entitySuggestion.fileId,
    onEntitySave: handleSave }), /*#__PURE__*/

  _jsx("div", { className: "document-viewer" }, void 0, /*#__PURE__*/
  _jsx(_SourceDocument.default, {
    file: file,
    onPageLoaded: async () => {
      await (0, _actions2.scrollToPage)(entitySuggestion.page || 1);
    } }))))) : /*#__PURE__*/







  // eslint-disable-next-line react/jsx-no-useless-fragment
  _react.default.createElement(_react.default.Fragment, null);

};exports.PDFSidePanel = PDFSidePanel;