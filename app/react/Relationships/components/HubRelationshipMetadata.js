"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;exports.mapStateToProps = mapStateToProps;var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactRedux = require("react-redux");
var _immutable = require("immutable");

var _I18N = require("../../I18N");
var _formater = _interopRequireDefault(require("../../Metadata/helpers/formater"));
var _UI = require("../../UI");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const conformQuote = (text) => /*#__PURE__*/
_jsx("div", { className: "relationship-quote" }, void 0, /*#__PURE__*/
_jsx("span", { className: "quoteIconStart" }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "quote-left" })),

text, /*#__PURE__*/
_jsx("span", { className: "quoteIconEnd" }, void 0, /*#__PURE__*/
_jsx(_UI.Icon, { icon: "quote-right" })));




const conformDl = ({ label, name, value }) => /*#__PURE__*/
_jsx("dl", { className: "item-property-default" }, name, /*#__PURE__*/
_jsx("dt", {}, void 0, label), /*#__PURE__*/
_jsx("dd", {}, void 0, Array.isArray(value) ? value.map((v) => v.value).join(', ') : value));









const extendedMetadata = (relationship, text, relationTypes, thesauris) => {
  const formattedMetadata = _formater.default.prepareMetadata(
  relationship.toJS(),
  relationTypes,
  thesauris).
  metadata;
  return /*#__PURE__*/(
    _jsx("div", { className: "relationship-metadata" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "item-metadata" }, void 0,
    formattedMetadata.map(conformDl),
    text &&
    conformDl({
      label: (0, _I18N.t)('System', 'Text'),
      name: 'text',
      value: conformQuote(text) }))));




};

const justText = (text) => /*#__PURE__*/_jsx("div", { className: "relationship-metadata" }, void 0, conformQuote(text));

const HubRelationshipMetadata = (props) => {
  const { relationship, relationTypes, thesauris } = props;
  const text = relationship.getIn(['reference', 'text']);
  const metadata = relationship.get('metadata');

  if (metadata && metadata.size) {
    return extendedMetadata(relationship, text, relationTypes, thesauris);
  }

  if (text) {
    return justText(text);
  }

  return null;
};

HubRelationshipMetadata.defaultProps = {
  relationship: (0, _immutable.Map)({}) };








function mapStateToProps({ relationTypes, thesauris }) {
  return { relationTypes, thesauris };
}var _default =

(0, _reactRedux.connect)(mapStateToProps)(HubRelationshipMetadata);exports.default = _default;