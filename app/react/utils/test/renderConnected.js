"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.renderConnectedMount = exports.renderConnectedContainer = exports.renderConnected = exports.defaultState = void 0;var _react = _interopRequireDefault(require("react"));
var _enzyme = require("enzyme");
var _reduxMockStore = _interopRequireDefault(require("redux-mock-store"));
var _reactRedux = require("react-redux");
var _reduxThunk = _interopRequireDefault(require("redux-thunk"));
var _immutable = _interopRequireDefault(require("immutable"));
var _react2 = require("@testing-library/react");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const middlewares = [_reduxThunk.default];
const mockStoreCreator = (0, _reduxMockStore.default)(middlewares);

const defaultState = {
  locale: 'en',
  inlineEdit: _immutable.default.fromJS({ inlineEdit: true }),
  translations: _immutable.default.fromJS([
  {
    locale: 'en',
    contexts: [] }]) };exports.defaultState = defaultState;




const renderConnected = (
Component,
props,
storeData = {
  template: {
    data: { properties: [], commonProperties: [] },
    formState: {
      fields: [],
      $form: {
        errors: {} } } } },




confirm = () => {}) =>
{
  const store = mockStoreCreator(storeData);
  return (0, _enzyme.shallow)( /*#__PURE__*/
  _jsx(_reactRedux.Provider, { store: store }, void 0, /*#__PURE__*/
  _react.default.createElement(Component, props))).


  dive({ context: { store, confirm } }).
  dive();
};exports.renderConnected = renderConnected;

const renderConnectedMount = (
Component,
state = {},
props = {},
useDefaultTranslationState = false) =>
{
  const reduxStore = _objectSpread(_objectSpread({}, defaultState), state);
  const store = mockStoreCreator(useDefaultTranslationState ? reduxStore : state);
  return (0, _enzyme.mount)( /*#__PURE__*/
  _jsx(_reactRedux.Provider, { store: store }, void 0, /*#__PURE__*/
  _react.default.createElement(Component, props)));


};exports.renderConnectedMount = renderConnectedMount;

const renderConnectedContainer = (children, stateFunc) => {
  const store = (0, _reduxMockStore.default)(middlewares)(stateFunc);
  return {
    renderResult: (0, _react2.render)( /*#__PURE__*/_jsx(_reactRedux.Provider, { store: store }, void 0, children)),
    store };

};exports.renderConnectedContainer = renderConnectedContainer;