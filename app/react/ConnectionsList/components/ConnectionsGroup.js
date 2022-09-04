"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapDispatchToProps = exports.default = exports.ConnectionsGroup = void 0;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _immutable = require("immutable");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));

var _I18N = require("../../I18N");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _UI = require("../../UI");

var _actions = require("../actions/actions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class ConnectionsGroup extends _react.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.group.get('templates').size > state.groupTemplates.size) {
      return {
        selected: false,
        groupTemplates: props.group.get('templates') };

    }

    return { groupTemplates: props.group.get('templates') };
  }

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      selected: false,
      selectedItems: (0, _immutable.fromJS)([]),
      groupTemplates: (0, _immutable.fromJS)([]) };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !(0, _immutable.is)(this.props.group, nextProps.group) ||
      this.state.expanded !== nextState.expanded ||
      this.state.selected !== nextState.selected ||
      this.state.selectedItems.size !== nextState.selectedItems.size);

  }

  setGroupFilter(selectedItems) {
    const newFilter = {};
    newFilter[this.props.group.get('key')] = selectedItems;
    this.props.setFilter(newFilter);
  }

  toggleSelectItem(item) {
    let selectedItems;
    let groupSelected;

    if (this.state.selectedItems.includes(item)) {
      groupSelected = false;
      selectedItems = this.state.selectedItems.splice(this.state.selectedItems.indexOf(item), 1);
    }

    if (!this.state.selectedItems.includes(item)) {
      selectedItems = this.state.selectedItems.push(item);
      groupSelected = selectedItems.size === this.props.group.get('templates').size;
    }

    this.setGroupFilter(selectedItems);
    this.setState({ selectedItems, selected: groupSelected });
  }

  toggleSelectGroup() {
    const { group } = this.props;
    const selectedItems = !this.state.selected ?
    group.get('templates').map((i) => group.get('key') + i.get('_id')) :
    (0, _immutable.fromJS)([]);

    this.setGroupFilter(selectedItems);
    this.setState((currentState) => ({ selected: !currentState.selected, selectedItems }));
  }

  toggleExpandGroup() {
    this.setState((currentState) => ({ expanded: !currentState.expanded }));
  }

  render() {
    const group = this.props.group.toJS();
    const { connectionLabel, templates } = group;
    return /*#__PURE__*/(
      _jsx("li", { className: "relationshipFilters" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "multiselectItem" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "checkbox",
        className: "form-control multiselectItem-input",
        id: `group${group.key}`,
        onChange: this.toggleSelectGroup.bind(this),
        checked: this.state.selected }), /*#__PURE__*/

      _jsx("label", { htmlFor: `group${group.key}`, className: "multiselectItem-label" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['far', 'square'], className: "checkbox-empty" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check", className: "checkbox-checked" })), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, group.key ? (0, _I18N.t)(group.context, connectionLabel) : (0, _I18N.t)('System', 'No Label')))), /*#__PURE__*/


      _jsx("span", { className: "multiselectItem-results" }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, group.templates.reduce((size, i) => size + i.count, 0)), /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-action", onClick: this.toggleExpandGroup.bind(this) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: this.state.expanded ? 'caret-up' : 'caret-down' })))), /*#__PURE__*/



      _jsx(_ShowIf.default, { if: this.state.expanded }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "multiselectChild is-active" }, void 0,
      templates.map((template, index) => /*#__PURE__*/
      _jsx("li", { className: "multiselectItem", title: template.label }, index, /*#__PURE__*/
      _jsx("input", {
        type: "checkbox",
        className: "multiselectItem-input",
        id: group.key + template._id,
        onChange: this.toggleSelectItem.bind(this, group.key + template._id),
        checked: this.state.selectedItems.includes(group.key + template._id) }), /*#__PURE__*/

      _jsx("label", { className: "multiselectItem-label", htmlFor: group.key + template._id }, void 0, /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['far', 'square'], className: "checkbox-empty" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check", className: "checkbox-checked" })), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, (0, _I18N.t)(template._id, template.label))), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-results" }, void 0, template.count)))))));






  }}exports.ConnectionsGroup = ConnectionsGroup;







const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)(
{
  setFilter: _actions.setFilter },

dispatch);exports.mapDispatchToProps = mapDispatchToProps;var _default =


(0, _reactRedux.connect)(null, mapDispatchToProps)(ConnectionsGroup);exports.default = _default;