"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.CopyFromEntity = void 0;var _react = _interopRequireWildcard(require("react"));




var _comonProperties = _interopRequireDefault(require("../../../shared/comonProperties"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _ = require("./..");
var _store = require("../../store");

var _SearchEntities = require("./SearchEntities");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}















class CopyFromEntity extends _react.Component {
  constructor(props) {
    super(props);

    this.state = { propsToCopy: [], selectedEntity: {}, lastSearch: undefined };
    this.onSelect = this.onSelect.bind(this);
    this.cancel = this.cancel.bind(this);
    this.copy = this.copy.bind(this);
    this.backToSearch = this.backToSearch.bind(this);
    this.onFinishedSearch = this.onFinishedSearch.bind(this);
  }

  onSelect(selectedEntity) {
    const copyFromTemplateId = selectedEntity.template;
    const templates = this.props.templates.toJS();
    const originalTemplate = this.props.originalEntity.template;

    const propsToCopy = _comonProperties.default.
    comonProperties(templates, [originalTemplate, copyFromTemplateId], ['generatedid']).
    map((p) => p.name);

    this.setState({ selectedEntity, propsToCopy });
    this.props.onSelect(propsToCopy, selectedEntity);
  }

  copy() {
    if (!this.state.selectedEntity.metadata) {
      return;
    }

    const updatedEntity = this.state.propsToCopy.reduce(
    (entity, propName) => {
      if (!entity.metadata) {
        entity.metadata = {};
      }

      entity.metadata[propName] = this.state.selectedEntity.metadata[propName];
      return entity;
    }, _objectSpread(_objectSpread({},
    this.props.originalEntity), {}, { metadata: _objectSpread({}, this.props.originalEntity.metadata) }));


    _.actions.
    loadFetchedInReduxForm(this.props.formModel, updatedEntity, this.props.templates.toJS()).
    forEach((action) => _store.store === null || _store.store === void 0 ? void 0 : _store.store.dispatch(action));

    this.props.onSelect([]);
    this.props.onCancel();
  }

  backToSearch() {
    this.setState({ propsToCopy: [], selectedEntity: {} });
    this.props.onSelect([]);
  }

  cancel() {
    this.props.onSelect([]);
    this.props.onCancel();
  }

  onFinishedSearch(searchTerm) {
    this.setState({ lastSearch: searchTerm });
  }

  renderPanel() {
    return this.state.selectedEntity._id ? /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("div", { className: "view" }, void 0, /*#__PURE__*/
    _jsx(_.FormatMetadata, {
      entity: this.state.selectedEntity,
      highlight: this.state.propsToCopy,
      excludePreview: true })), /*#__PURE__*/


    _jsx("div", { className: "copy-from-buttons" }, void 0, /*#__PURE__*/
    _jsx("button", { className: "back-copy-from btn btn-light", onClick: this.backToSearch }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "arrow-left" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Back to search"))), /*#__PURE__*/


    _jsx("button", { className: "cancel-copy-from btn btn-primary", onClick: this.cancel }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cancel"))), /*#__PURE__*/


    _jsx("button", { className: "copy-copy-from btn btn-success", onClick: this.copy }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "copy-from", transform: "left-0.075 up-0.1" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Copy Highlighted"))))) : /*#__PURE__*/





    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx(_SearchEntities.SearchEntities, {
      onSelect: this.onSelect,
      onFinishSearch: this.onFinishedSearch,
      initialSearchTerm: this.state.lastSearch }), /*#__PURE__*/

    _jsx("div", { className: "copy-from-buttons" }, void 0, /*#__PURE__*/
    _jsx("button", { className: "cancel-copy-from btn btn-primary", onClick: this.cancel }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
    _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cancel")))));





  }

  render() {
    return /*#__PURE__*/_jsx("div", { className: "copy-from" }, void 0, this.renderPanel());
  }}exports.CopyFromEntity = CopyFromEntity;