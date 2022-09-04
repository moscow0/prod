"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.IXSuggestions = void 0;var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactRedux = require("react-redux");

var _actions = require("./actions/actions");
var _EntitySuggestions = require("./EntitySuggestions");

var _tsUtils = require("../../shared/tsUtils");
var _GeneralError = _interopRequireDefault(require("../App/ErrorHandling/GeneralError"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const SuggestionComponent = ({
  routeParams: { propertyName },
  templates,
  acceptSuggestion: acceptIXSuggestion }) =>
{
  const propertiesKey = propertyName === 'title' ? 'commonProperties' : 'properties';

  const property = templates.
  map((template) => {var _ensure$get;return (_ensure$get =
    (0, _tsUtils.ensure)(template).
    get(propertiesKey)) === null || _ensure$get === void 0 ? void 0 : _ensure$get.
    find((p) => (p === null || p === void 0 ? void 0 : p.get('name')) === propertyName);}).

  filter((v) => !_lodash.default.isUndefined(v));
  if (property && property.size > 0) {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx(_EntitySuggestions.EntitySuggestions, {
        property: property.get(0).toJS(),
        acceptIXSuggestion: acceptIXSuggestion })));



  }
  return /*#__PURE__*/(
    _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
    _jsx(_GeneralError.default, {})));


};

const mapStateToProps = (state) => ({
  templates: state.templates });


const mapDispatchToProps = {
  acceptSuggestion: _actions.acceptSuggestion };


const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);











const IXSuggestions = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SuggestionComponent);exports.IXSuggestions = IXSuggestions;