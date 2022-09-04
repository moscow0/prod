"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireDefault(require("react"));

var _ThesauriAPI = _interopRequireDefault(require("../Thesauri/ThesauriAPI"));
var _RelationTypesAPI = _interopRequireDefault(require("../RelationTypes/RelationTypesAPI"));
var _BasicReducer = require("../BasicReducer");
var _TemplateCreator = _interopRequireDefault(require("./components/TemplateCreator"));
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class NewTemplate extends _RouteHandler.default {
  static async requestState(requestParams) {
    const [thesauri, relationTypes] = await Promise.all([
    _ThesauriAPI.default.get(requestParams.onlyHeaders()),
    _RelationTypesAPI.default.get(requestParams.onlyHeaders())]);


    return [_BasicReducer.actions.set('thesauris', thesauri), _BasicReducer.actions.set('relationTypes', relationTypes)];
  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content sm-footer-extra-row" }, void 0, /*#__PURE__*/
      _jsx(_TemplateCreator.default, {})));


  }}exports.default = NewTemplate;