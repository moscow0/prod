"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MetadataExtractor = void 0;var _react = _interopRequireDefault(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");

var _UI = require("../../UI");

var _I18N = require("../../I18N");
var _Notifications = require("../../Notifications");

var _metadataExtractionActions = require("../actions/metadataExtractionActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}














const mapStateToProps = (state) => ({
  selection: state.documentViewer.uiState.
  get('reference').
  get('sourceRange') });


const mapDispatchToProps = (dispatch, ownProps) => {
  const { fieldName, fieldId, model, fieldType, locale } = ownProps;
  return (0, _redux.bindActionCreators)(
  {
    updateField: (value) => async (dis) => {
      const action = await (0, _metadataExtractionActions.updateFormField)(value, model, fieldType, locale);
      dis(action);
    },
    setSelection: (selection) => (0, _metadataExtractionActions.updateSelection)(selection, fieldName, fieldId),
    notify: _Notifications.notificationActions.notify },

  dispatch);

};

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



const MetadataExtractorComponent = ({
  selection,
  setSelection,
  updateField,
  notify }) =>
{
  const onClick = async () => {var _selection$selectionR;
    if (!((_selection$selectionR = selection.selectionRectangles) !== null && _selection$selectionR !== void 0 && _selection$selectionR.length)) {
      notify(
      (0, _I18N.t)('System', 'Could not detect the area for the selected text', null, false),
      'warning');

    }
    setSelection(selection);
    updateField(selection.text);
  };

  if (!selection) {
    return null;
  }

  return /*#__PURE__*/(
    _jsx("button", { type: "button", onClick: onClick, className: "extraction-button" }, void 0, /*#__PURE__*/
    _jsx("span", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Click to fill"), " ", /*#__PURE__*/_jsx(_UI.Icon, { icon: "bullseye" }))));



};

const container = connector(MetadataExtractorComponent);exports.MetadataExtractor = container;