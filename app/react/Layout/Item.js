"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.Item = void 0;var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _Metadata = require("../Metadata");
var _prioritySortingCriteria = _interopRequireDefault(require("../utils/prioritySortingCriteria"));

var _FeatureToggle = require("../components/Elements/FeatureToggle");
var _Favorites = require("../Favorites");
var _helpers = _interopRequireDefault(require("../Documents/helpers"));
var _I18N = require("../I18N");
var _Lists = require("./Lists");
var _DocumentLanguage = _interopRequireDefault(require("./DocumentLanguage"));
var _Icon = _interopRequireDefault(require("./Icon"));
var _Tip = _interopRequireDefault(require("./Tip"));
var _ItemSnippet = _interopRequireDefault(require("./ItemSnippet"));
var _TemplateLabel = _interopRequireDefault(require("./TemplateLabel"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Item extends _react.Component {
  getSearchSnipett(doc) {
    if (!doc.snippets || !doc.snippets.count) {
      return false;
    }
    return /*#__PURE__*/(
      _jsx(_ItemSnippet.default, { onSnippetClick: this.props.onSnippetClick, snippets: doc.snippets, doc: doc }));

  }

  render() {
    const { onClick, onMouseEnter, onMouseLeave, active, additionalIcon, additionalText, buttons } =
    this.props;

    const doc = _helpers.default.performantDocToJSWithoutRelations(this.props.doc);
    const Snippet = additionalText ? /*#__PURE__*/
    _jsx("div", { className: "item-snippet-wrapper" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "item-snippet" }, void 0, additionalText)) :

    null;
    const baseClasName = `item-document template-${doc.template}`;
    const itemClassName = `${baseClasName} ${this.props.className || ''}`;
    const itemProps = {
      className: itemClassName,
      onClick,
      onMouseEnter,
      onMouseLeave,
      active,
      tabIndex: '1' };


    return /*#__PURE__*/(
      _react.default.createElement(_Lists.RowList.Item, itemProps,
      this.props.itemHeader, /*#__PURE__*/
      _jsx("div", { className: "item-info" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "item-name" }, void 0,
      additionalIcon || '', /*#__PURE__*/
      _jsx(_Icon.default, { className: "item-icon item-icon-center", data: doc.icon }), /*#__PURE__*/
      _jsx("span", {}, void 0, doc[this.props.titleProperty]), /*#__PURE__*/
      _jsx(_DocumentLanguage.default, { doc: this.props.doc })),

      Snippet,
      this.getSearchSnipett(doc)), /*#__PURE__*/

      _jsx("div", { className: "item-metadata" }, void 0, /*#__PURE__*/
      _jsx(_Metadata.FormatMetadata, {
        entity: this.props.noMetadata ? {} : doc,
        sortedProperty: this.props.search.sort,
        additionalMetadata: this.props.additionalMetadata,
        renderLabel: (prop, label) => !prop.noLabel && label })), /*#__PURE__*/


      _jsx(_Lists.ItemFooter, {}, void 0, /*#__PURE__*/
      _react.default.createElement(_react.default.Fragment, null,
      doc.template ? /*#__PURE__*/_jsx(_TemplateLabel.default, { template: doc.template }) : false,
      doc.published ?
      '' : /*#__PURE__*/

      _jsx(_Tip.default, { icon: "lock" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "This entity is restricted from public view."))),



      this.props.labels,
      buttons), /*#__PURE__*/

      _jsx(_FeatureToggle.FeatureToggle, { feature: "favorites" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "item-favorite" }, void 0, /*#__PURE__*/
      _jsx(_Favorites.FavoriteBanner, { sharedId: doc.sharedId })))));




  }}exports.Item = Item;


Item.defaultProps = {
  onClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
  noMetadata: false };
























Item.defaultProps = {
  search: _prioritySortingCriteria.default.get(),
  titleProperty: 'title' };


const mapStateToProps = ({ templates, thesauris }, ownProps) => {
  const search = ownProps.searchParams;
  const _templates = ownProps.templates || templates;
  return { templates: _templates, thesauris, search };
};exports.mapStateToProps = mapStateToProps;var _default =

(0, _reactRedux.connect)(mapStateToProps)(Item);exports.default = _default;