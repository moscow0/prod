"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FiltersForm = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _immutable = require("immutable");

var _RequestParams = require("../../utils/RequestParams");
var _DragAndDrop = require("../../Layout/DragAndDrop");
var _uniqueID = _interopRequireDefault(require("../../../shared/uniqueID"));
var _BasicReducer = require("../../BasicReducer");
var _SettingsAPI = _interopRequireDefault(require("../SettingsAPI"));
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _I18N = require("../../I18N");
var _UI = require("../../UI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const removeItem = (itemId) => {
  const removeItemIterator = (items) =>
  items.
  filter((item) => item.id !== itemId).
  map((_item) => {
    const item = _objectSpread({}, _item);
    if (item.items) {
      item.items = removeItemIterator(item.items);
    }
    return item;
  });

  return removeItemIterator;
};

class FiltersForm extends _react.Component {
  constructor(props) {
    super(props);
    const activeFilters = props.settings.collection.toJS().filters || [];
    const inactiveFilters = props.templates.
    toJS().
    filter(
    (tpl) =>
    !activeFilters.find((filt) => {
      const matchId = filt.id === tpl._id;
      let insideGroup = false;
      if (filt.items) {
        insideGroup = filt.items.find((_filt) => _filt.id === tpl._id);
      }

      return matchId || insideGroup;
    })).

    map((tpl) => ({ id: tpl._id, name: tpl.name }));

    this.state = { activeFilters, inactiveFilters };
    this.activesChange = this.activesChange.bind(this);
    this.unactivesChange = this.unactivesChange.bind(this);
    this.renderActiveItems = this.renderActiveItems.bind(this);
    this.renderInactiveItems = this.renderInactiveItems.bind(this);
  }

  activesChange(items) {
    items.forEach((item) => {
      if (!item.items) {
        return;
      }
      // eslint-disable-next-line
      item.items = item.items.filter((subitem) => {
        if (subitem.items) {
          items.push(subitem);
          return false;
        }
        return true;
      });
    });
    this.setState({ activeFilters: items });
  }

  unactivesChange(items) {
    this.setState({ inactiveFilters: items });
  }

  sanitizeFilterForSave(_filter) {
    const filter = _objectSpread({}, _filter);
    delete filter.container;
    delete filter.index;
    if (filter.items) {
      filter.items = filter.items.map((item) => this.sanitizeFilterForSave(item));
    } else {
      delete filter._id;
    }

    return filter;
  }

  save() {
    const { activeFilters } = this.state;
    const { settings: propSettings, notify, setSettings } = this.props;

    const settings = propSettings.collection.toJS();
    const filters = activeFilters.map((filter) => this.sanitizeFilterForSave(filter));
    settings.filters = filters;
    _SettingsAPI.default.save(new _RequestParams.RequestParams(settings)).then((result) => {
      notify((0, _I18N.t)('System', 'Settings updated', null, false), 'success');
      setSettings(Object.assign(settings, result));
    });
  }

  addGroup() {
    const { activeFilters } = this.state;
    const newGroup = { id: (0, _uniqueID.default)(), name: 'New group', items: [] };
    this.setState({ activeFilters: activeFilters.concat([newGroup]) });
  }

  removeGroup(group) {
    const { activeFilters: activeFiltersState } = this.state;
    const activeFilters = activeFiltersState.filter((item) => item.id !== group.id);
    this.setState({ activeFilters });
  }

  removeItem(item) {
    const { activeFilters: activeFiltersState, inactiveFilters } = this.state;
    const activeFilters = removeItem(item.id)(activeFiltersState);
    this.setState({ activeFilters, inactiveFilters: inactiveFilters.concat([item]) });
  }

  renderGroup(group) {
    const onChange = (items) => {
      group.items = items;
      this.setState(this.state);
    };

    const nameChange = (e) => {
      const name = e.target.value;
      group.name = name;
      this.setState(this.state);
    };

    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", { className: "input-group" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "text",
        className: "form-control",
        value: group.name,
        onChange: nameChange.bind(this) }), /*#__PURE__*/

      _jsx("span", { className: "input-group-btn" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-danger",
        onClick: this.removeGroup.bind(this, group),
        disabled: group.items.length }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" })))), /*#__PURE__*/



      _jsx(_DragAndDrop.DragAndDropContainer, {
        id: group.id,
        onChange: onChange.bind(this),
        renderItem: this.renderActiveItems,
        items: group.items })));



  }

  renderActiveItems(item) {
    if (item.items) {
      return this.renderGroup(item);
    }
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, item.name), /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "btn btn-xs btn-danger",
        onClick: this.removeItem.bind(this, item) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }))));



  }

  renderInactiveItems(item) {
    if (item.items) {
      return this.renderGroup(item);
    }
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("span", {}, void 0, item.name)));


  }

  render() {
    const { activeFilters, inactiveFilters } = this.state;
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "FiltersForm" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "FiltersForm-list" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Filters configuration")), /*#__PURE__*/

      _jsx("div", { className: "panel-body" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "row" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "col-sm-9" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "alert alert-info" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "info-circle", size: "2x" }), /*#__PURE__*/
      _jsx("div", { className: "force-ltr" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Filters configuration description" }, void 0, "By default, users can filter the entities in the library based on the types you have defined. However, you can configure how these entity types will be displayed:")), /*#__PURE__*/





      _jsx("ul", {}, void 0, /*#__PURE__*/
      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Filters configuration" }, void 0, "drag and drop each entity type into the window in order to configure their order")), /*#__PURE__*/




      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Filters configuration example" }, void 0, "select \"Create group\" below to group filters under a label e.g (\"Documents \"or \"People\")"))))), /*#__PURE__*/







      _jsx(_DragAndDrop.DragAndDropContainer, {
        id: "active",
        onChange: this.activesChange,
        renderItem: this.renderActiveItems,
        items: activeFilters })), /*#__PURE__*/


      _jsx("div", { className: "col-sm-3" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "FiltersForm-constructor" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("i", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Entity types"))), /*#__PURE__*/


      _jsx(_DragAndDrop.DragAndDropContainer, {
        id: "inactive",
        onChange: this.unactivesChange,
        renderItem: this.renderInactiveItems,
        items: inactiveFilters }))))))), /*#__PURE__*/







      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "btn-cluster" }, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", onClick: this.addGroup.bind(this), className: "btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "plus" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Create group")))), /*#__PURE__*/



      _jsx("div", { className: "btn-cluster content-right" }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.save.bind(this),
        className: "btn btn-success btn-extra-padding" }, void 0, /*#__PURE__*/

      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Save"))))))));







  }}exports.FiltersForm = FiltersForm;









const mapStateToProps = (state) => ({
  templates: state.templates,
  settings: state.settings });


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  { setSettings: _BasicReducer.actions.set.bind(null, 'settings/collection'), notify: _notificationsActions.notify },
  dispatch);

}var _default =



(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(FiltersForm);exports.default = _default;