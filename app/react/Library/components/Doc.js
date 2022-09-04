"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Doc = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _Auth = require("../../Auth");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _I18N = require("../../I18N");
var _UploadEntityStatus = _interopRequireDefault(require("./UploadEntityStatus"));
var _ViewDocButton = _interopRequireDefault(require("./ViewDocButton"));
var _UI = require("../../UI");

var _Layout = require("../../Layout");
var _immutable = require("immutable");
var _helpers = _interopRequireDefault(require("../../Documents/helpers"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Doc extends _react.Component {
  shouldComponentUpdate(nextProps) {
    return (
      !(0, _immutable.is)(this.props.doc, nextProps.doc) ||
      !(0, _immutable.is)(this.props.targetReference, nextProps.targetReference) ||
      this.props.additionalText !== nextProps.additionalText ||
      this.props.active !== nextProps.active ||
      this.props.searchParams &&
      nextProps.searchParams &&
      this.props.searchParams.sort !== nextProps.searchParams.sort);

  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e, this.props.doc, this.props.active);
    }
  }

  getConnections(connections) {
    return /*#__PURE__*/(
      _jsx("div", {}, void 0,
      connections.map((connection, index) => /*#__PURE__*/
      _jsx("div", { className: "item-connection" }, index, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "exchange-alt" }), /*#__PURE__*/
      _jsx("span", {}, void 0,
      (0, _I18N.t)(connection.context, connection.label),
      connection.type === 'metadata' ? ` ${(0, _I18N.t)('System', 'in')}...` : '')), /*#__PURE__*/


      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'] }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: connection.sourceType !== 'metadata' }, void 0, /*#__PURE__*/
      _jsx("button", {
        className: "btn btn-default btn-hover-danger btn-xs",
        onClick: (e) => this.deleteConnection(e, connection),
        type: "button" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }))))))));







  }

  deleteConnection(e, connection) {
    e.stopPropagation();
    const { _id, sourceType } = connection;
    this.props.deleteConnection({ _id, sourceType });
  }

  render() {
    const { className, additionalText, targetReference } = this.props;
    const doc = _helpers.default.performantDocToJSWithoutRelations(this.props.doc);
    const { sharedId, file, processed } = doc;

    let itemConnections = null;
    if (doc.connections && doc.connections.length) {
      itemConnections = this.getConnections(doc.connections);
    }

    const buttons = /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_ViewDocButton.default, {
      file: file,
      sharedId: sharedId,
      processed: processed,
      storeKey: this.props.storeKey,
      targetReference: targetReference }));




    return /*#__PURE__*/(
      _jsx(_Layout.Item, {
        onClick: this.onClick.bind(this),
        onSnippetClick: this.props.onSnippetClick,
        active: this.props.active,
        doc: this.props.doc,
        additionalText: additionalText,
        searchParams: this.props.searchParams,
        deleteConnection: this.props.deleteConnection,
        itemHeader: itemConnections,
        buttons: buttons,
        labels: /*#__PURE__*/_jsx(_UploadEntityStatus.default, { doc: this.props.doc }),
        className: className }));


  }}exports.Doc = Doc;


Doc.defaultProps = {
  targetReference: null };
















Doc.contextTypes = {
  confirm: _propTypes.default.func };


function mapStateToProps(state, ownProps) {
  const active = ownProps.storeKey ?
  !!state[ownProps.storeKey].ui.
  get('selectedDocuments').
  find((doc) => doc.get('_id') === ownProps.doc.get('_id')) :
  false;
  return {
    active };

}var _default =

(0, _reactRedux.connect)(mapStateToProps)(Doc);exports.default = _default;