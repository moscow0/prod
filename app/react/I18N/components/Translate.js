"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.Translate = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _ = require("./..");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Translate extends _react.Component {
  static resetCachedTranslation() {
    Translate.translation = null;
  }

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.i18nmode) {
      e.stopPropagation();
      e.preventDefault();
      this.props.edit(this.props.context, this.props.translationKey);
    }
  }

  render() {
    return /*#__PURE__*/(
      _jsx("span", {
        onClick: this.onClick,
        className: this.props.i18nmode ? 'translation active' : 'translation' }, void 0,

      this.props.children));


  }}exports.Translate = Translate;


Translate.defaultProps = {
  i18nmode: false,
  context: 'System',
  edit: false,
  translationKey: '' };










const mapStateToProps = (state, props) => {
  if (!Translate.translation || Translate.translation.locale !== state.locale) {
    const translations = state.translations.toJS();
    Translate.translation = translations.find((t) => t.locale === state.locale) || { contexts: [] };
  }
  const _ctx = props.context || 'System';
  const key = props.translationKey || props.children;
  const context = Translate.translation.contexts.find((ctx) => ctx.id === _ctx) || { values: {} };
  const canEditThisValue = _ctx === 'System' || !!context.values[props.children];
  return {
    translationKey: key,
    children: context.values[key] || props.children,
    i18nmode: state.inlineEdit.get('inlineEdit') && canEditThisValue };

};exports.mapStateToProps = mapStateToProps;

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)({ edit: _.actions.inlineEditTranslation }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Translate);exports.default = _default;