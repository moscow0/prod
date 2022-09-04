"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.DocumentTypesList = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = _interopRequireWildcard(require("immutable"));
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _I18N = require("../../I18N");
var _UI = require("../../UI");

var _filterActions = require("../actions/filterActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const getItemsToShow = (fromFilters, templates, settings) => {var _items;
  let items = fromFilters ? settings.collection.toJS().filters : [];
  if (!((_items = items) !== null && _items !== void 0 && _items.length)) {
    items = templates.toJS().map((tpl) => ({
      id: tpl._id,
      name: tpl.name }));

  }
  return items;
};

class DocumentTypesList extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      ui: {} };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      !(0, _immutable.is)(this.props.selectedTemplates, nextProps.selectedTemplates) ||
      !(0, _immutable.is)(this.props.settings, nextProps.settings) ||
      !(0, _immutable.is)(this.props.aggregations, nextProps.aggregations) ||
      this.stateChanged(nextState));

  }

  changeAll(item, e) {
    const { selectedTemplates: selectedItems } = this.props;
    if (e.target.checked) {
      item.items.forEach((_item) => {
        if (!this.checked(_item)) {
          selectedItems.push(_item.id);
        }
      });
    }

    if (!e.target.checked) {
      item.items.forEach((_item) => {
        if (this.checked(_item)) {
          const index = selectedItems.indexOf(_item.id);
          selectedItems.splice(index, 1);
        }
      });
    }

    this.props.filterDocumentTypes(selectedItems);
  }

  change(item) {
    const { selectedTemplates: selectedItems } = this.props;

    if (selectedItems.includes(item.id)) {
      const index = selectedItems.indexOf(item.id);
      selectedItems.splice(index, 1);
    } else {
      selectedItems.push(item.id);
    }

    this.props.filterDocumentTypes(selectedItems);
  }

  toggleOptions(item, e) {
    e.preventDefault();
    if (!this.checked(item) && item.items.find((itm) => this.checked(itm))) {
      return;
    }
    const { ui } = this.state;
    ui[item.id] = !ui[item.id];
    this.setState({ ui });
  }

  aggregations(item) {
    const aggregations = this.aggs;
    const buckets =
    aggregations.all && aggregations.all._types ? aggregations.all._types.buckets : [];
    const found = buckets.find((agg) => agg.key === item.id);
    if (found) {
      return found.filtered.doc_count;
    }

    if (item.items) {
      return item.items.reduce((result, _item) => result + this.aggregations(_item), 0);
    }

    return 0;
  }

  showSubOptions(parent) {
    const toggled = this.state.ui[parent.id];
    return !!(toggled || !!(!this.checked(parent) && parent.items.find((itm) => this.checked(itm))));
  }

  checked(item) {
    if (item.items) {
      return item.items.reduce(
      (result, _item) => result && this.checked(_item),
      item.items.length > 0);

    }

    return this.props.selectedTemplates.includes(item.id);
  }

  stateChanged(nextState) {
    return (
      Object.keys(nextState.ui).length === Object.keys(this.state.ui).length ||
      Object.keys(nextState.ui).reduce(
      (result, key) => result || nextState.ui[key] === this.state.ui[key],
      false));


  }

  renderSingleType(item, index) {
    const context = item.id === 'missing' ? 'System' : item.id;
    return /*#__PURE__*/(
      _jsx("li", { className: "multiselectItem", title: item.name }, index, /*#__PURE__*/
      _jsx("input", {
        type: "checkbox",
        className: "multiselectItem-input",
        value: item.id,
        id: item.id,
        onChange: this.change.bind(this, item),
        checked: this.checked(item) }), /*#__PURE__*/

      _jsx("label", { className: "multiselectItem-label", htmlFor: item.id }, void 0, /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['far', 'square'], className: "checkbox-empty" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check", className: "checkbox-checked" })), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { context: context }, void 0, item.name))), /*#__PURE__*/


      _jsx("span", { className: "multiselectItem-results" }, void 0, this.aggregations(item))));


  }

  renderGroupType(item, index) {
    return /*#__PURE__*/(
      _jsx("li", {}, index, /*#__PURE__*/
      _jsx("div", { className: "multiselectItem" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "checkbox",
        className: "form-control multiselectItem-input",
        id: item.id,
        onChange: this.changeAll.bind(this, item),
        checked: this.checked(item) }), /*#__PURE__*/

      _jsx("label", { htmlFor: item.id, className: "multiselectItem-label" }, void 0, /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['far', 'square'], className: "checkbox-empty" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check", className: "checkbox-checked" })), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, (0, _I18N.t)('Filters', item.name)))), /*#__PURE__*/


      _jsx("span", { className: "multiselectItem-results" }, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, this.aggregations(item)), /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-action", onClick: this.toggleOptions.bind(this, item) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: this.state.ui[item.id] ? 'caret-up' : 'caret-down' })))), /*#__PURE__*/



      _jsx(_ShowIf.default, { if: this.showSubOptions(item) }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "multiselectChild is-active" }, void 0,
      item.items.map((_item, i) => this.renderSingleType(_item, i))))));




  }

  render() {
    const { fromFilters, templates, settings } = this.props;
    const items = getItemsToShow(fromFilters, templates, settings);
    this.aggs = this.props.aggregations.toJS();
    return /*#__PURE__*/(
      _jsx("ul", { className: "multiselect is-active" }, void 0,
      items.map((item, index) => {
        if (item.items) {
          return this.renderGroupType(item, index);
        }
        return this.renderSingleType(item, index);
      })));


  }}exports.DocumentTypesList = DocumentTypesList;


DocumentTypesList.defaultProps = {
  fromFilters: true,
  templates: _immutable.default.fromJS([]),
  settings: {},
  aggregations: _immutable.default.fromJS({}),
  selectedTemplates: [],
  filterDocumentTypes: {} };











function mapStateToProps(state) {
  return {
    settings: state.settings,
    templates: state.templates,
    aggregations: state.library.aggregations };

}

//parent ts component requires ownProps to inferring types
function mapDispatchToProps(dispatch, _ownProps) {
  return (0, _redux.bindActionCreators)({ filterDocumentTypes: _filterActions.filterDocumentTypes }, dispatch);
}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(DocumentTypesList);exports.default = _default;