"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.AddRelationshipTypeButton = void 0;var _react = _interopRequireWildcard(require("react"));
var _redux = require("redux");
var _reactRedux = require("react-redux");
var _reactHookForm = require("react-hook-form");
var _I18N = require("../../I18N");

var _Modal = _interopRequireDefault(require("../../Layout/Modal"));
var _UI = require("../../UI");
var _relationTypeActions = require("../actions/relationTypeActions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{
  relationshipTypeSave: _relationTypeActions.saveRelationType },

dispatch);


const mapStateToProps = (state) => ({
  relationshipTypes: state.relationTypes });


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



const AddRelationshipTypeButton = ({ relationshipTypeSave, relationshipTypes }) => {var _errors$relationshipT, _errors$relationshipT2;
  const [open, setOpen] = (0, _react.useState)(false);

  const { register, handleSubmit, errors } = (0, _reactHookForm.useForm)({
    mode: 'onSubmit' });


  const onSave = (data) => {
    const relationship = {
      name: data.relationshipType,
      properties: [] };

    relationshipTypeSave(relationship);
    setOpen(false);
  };

  const isNotDuplicated = (value) =>
  !(relationshipTypes !== null && relationshipTypes !== void 0 && relationshipTypes.find((type) => (type === null || type === void 0 ? void 0 : type.get('name')) === value));

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn btn-default", onClick: () => setOpen(true) }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "exchange-alt" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Add relationship type" }, void 0, "Add relationship type"))), /*#__PURE__*/



    _jsx(_Modal.default, { isOpen: open, type: "content", className: "new-relationshipType-modal" }, void 0, /*#__PURE__*/
    _jsx(_Modal.default.Header, {}, void 0, /*#__PURE__*/
    _jsx("h3", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Add relationship type" }, void 0, "Add relationship type"))), /*#__PURE__*/



    _jsx("form", {}, void 0, /*#__PURE__*/
    _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
    _jsx("label", { htmlFor: "relationshipTypeInput" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Relationship" }, void 0, "Relationship")), /*#__PURE__*/

    _react.default.createElement("input", {
      type: "text",
      name: "relationshipType",
      id: "relationshipTypeInput",
      ref: register({
        required: true,
        validate: {
          duplicated: (value) => isNotDuplicated(value) } }),


      autoComplete: "off" }),


    ((_errors$relationshipT = errors.relationshipType) === null || _errors$relationshipT === void 0 ? void 0 : _errors$relationshipT.type) === 'required' && /*#__PURE__*/
    _jsx("p", { className: "error", role: "alert" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "This field is required" }, void 0, "This field is required")),





    ((_errors$relationshipT2 = errors.relationshipType) === null || _errors$relationshipT2 === void 0 ? void 0 : _errors$relationshipT2.type) === 'duplicated' && /*#__PURE__*/
    _jsx("p", { className: "error", role: "alert" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Duplicated name" }, void 0, "Duplicated name"))), /*#__PURE__*/




    _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn", onClick: () => setOpen(false) }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Cancel" }, void 0, "Cancel")), /*#__PURE__*/

    _jsx("button", { type: "button", className: "btn btn-success", onClick: handleSubmit(onSave) }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "Save" }, void 0, "Save")))))));






};

const container = connector(AddRelationshipTypeButton);exports.AddRelationshipTypeButton = container;