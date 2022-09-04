"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.MultiSuggestBase = exports.MultiSuggest = void 0;exports.acceptSuggestion = acceptSuggestion;exports.mapStateToProps = mapStateToProps;

var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactReduxForm = require("react-redux-form");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _UI = require("../../UI");
var _propertyTypes = require("../../../shared/propertyTypes");
var _I18N = require("../../I18N");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

























const defaultProps = {
  // The suggestions value, provided by redux Component.
  value: [],
  // The 'main' value, provided by mapStateToProps.
  selectValue: [] };


function acceptSuggestion(
suggestion,
propertyType,
selectModel,
selectValue)
{
  return (dispatch) => {
    switch (propertyType) {
      case _propertyTypes.propertyTypes.multiselect:
        if (!selectValue.includes(suggestion)) {
          dispatch(_reactReduxForm.actions.change(selectModel, [...selectValue, suggestion]));
        }
        break;
      case _propertyTypes.propertyTypes.select:
        if (!selectValue.length || selectValue[0] !== suggestion) {
          dispatch(_reactReduxForm.actions.change(selectModel, suggestion));
        }
        break;
      default:
        break;}

  };
}

class MultiSuggestBase extends _react.Component {


  static confidenceBlob(suggestionConfidence) {
    let label = 'low';
    if ((suggestionConfidence !== null && suggestionConfidence !== void 0 ? suggestionConfidence : 0.0) >= 0.75) {
      label = 'high';
    } else if ((suggestionConfidence !== null && suggestionConfidence !== void 0 ? suggestionConfidence : 0.0) >= 0.5) {
      label = 'medium';
    }
    return /*#__PURE__*/_jsx("span", { className: `confidence-bubble ${label}` }, void 0, label);
  }

  acceptSuggestion(id) {
    const { propertyType, selectModel, selectValue } = this.props;
    this.props.acceptSuggestion(id, propertyType, selectModel, selectValue);
  }

  rejectSuggestion(id, e) {
    // Don't bubble the event up to onClick handlers of parents.
    e.stopPropagation();
    e.preventDefault();
    const suggestedValues = (this.props.value || []).slice();
    const index = suggestedValues.findIndex((v) => v.value === id);
    if (index < 0) {
      return;
    }
    suggestedValues.splice(index, 1);
    this.props.onChange(suggestedValues);
    this.props.notify('The suggestion has been rejected', 'success', 1000);
  }

  render() {
    const { selectValue, value: proposedValues } = this.props;
    const filteredValues = proposedValues.filter(
    (value) => value.value && !selectValue.includes(value.value));

    if (!filteredValues.length) {
      return null;
    }
    return /*#__PURE__*/(
      _jsx("div", { className: "suggestions multiselect" }, void 0, /*#__PURE__*/
      _jsx("b", { className: "suggestions-title" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Suggestions"), "\xA0", /*#__PURE__*/
      _jsx("span", {}, void 0, "(", filteredValues.length, ")")),

      filteredValues.map((value) => /*#__PURE__*/
      _jsx("div", { className: "multiselectItem" }, value.value, /*#__PURE__*/
      _jsx("label", {
        className: "multiselectItem-label",
        onClick: this.acceptSuggestion.bind(this, value.value) }, void 0, /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['far', 'square'], className: "checkbox-empty" })), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, value.label),
      MultiSuggestBase.confidenceBlob(value.suggestion_confidence), /*#__PURE__*/
      _jsx("div", {
        className: "multiselectItem-button",
        onClick: this.rejectSuggestion.bind(this, value.value) }, void 0, /*#__PURE__*/

      _jsx("div", { className: "property-help no-margin" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Reject"), /*#__PURE__*/
      _jsx("div", { className: "property-description-top-left" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Is the suggestion incorrect? Click on 'Reject' and Uwazi will improve on the suggestions it makes")))))))));











  }}exports.MultiSuggestBase = MultiSuggestBase;_defineProperty(MultiSuggestBase, "defaultProps", defaultProps);


function mapStateToProps(state, props) {
  let { selectModel } = props;
  if (selectModel && selectModel[0] === '.') {
    // TODO(bdittes): Correctly inherit parent path.
    selectModel = `entityView.entityForm${selectModel}`;
  }
  const rawValue = (0, _reactReduxForm.getModel)(state, selectModel) || [];
  return { selectModel, selectValue: Array.isArray(rawValue) ? rawValue : [rawValue] };
}


const MultiSuggest = (0, _reactRedux.connect)(mapStateToProps, { acceptSuggestion, notify: _notificationsActions.notify })(
MultiSuggestBase);exports.MultiSuggest = MultiSuggest;