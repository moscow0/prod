"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.SortButtons = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _Multireducer = require("../../Multireducer");
var _reactReduxForm = require("react-redux-form");
var _I18N = require("../../I18N");
var _UI = require("../../UI");
var _Forms = require("../../Forms");
var _propertyTypes = require("../../../shared/propertyTypes");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const isSortableType = (type) =>
[_propertyTypes.propertyTypes.text, _propertyTypes.propertyTypes.date, _propertyTypes.propertyTypes.numeric, _propertyTypes.propertyTypes.select].includes(
type);


const getMetadataSorts = (templates) =>
templates.toJS().reduce((sorts, template) => {
  template.properties.forEach((property) => {
    const sortable =
    property.filter && (
    isSortableType(property.type) ||
    property.inherit && isSortableType(property.inherit.type));

    if (sortable && !sorts.find((s) => s.name === property.name)) {
      const sortString = `metadata.${property.name}${property.inherit ? '.inheritedValue' : ''}`;
      sorts.push({
        label: property.label,
        name: property.name,
        value: sortString,
        type: property.type,
        context: template._id });

    }
  });
  return sorts;
}, []);

class SortButtons extends _react.Component {
  constructor(props) {
    super(props);
    this.changeOrder = this.changeOrder.bind(this);
  }

  changeOrder() {
    const { sort, treatAs } = this.props.search;
    this.sort(sort, treatAs, this.props.search.order === 'asc' ? 'desc' : 'asc');
  }

  sort(property, defaultTreatAs, selectedSort) {
    const treatAs = defaultTreatAs;
    let order = selectedSort;

    if (treatAs && !selectedSort) {
      order = treatAs === 'string' ? 'asc' : 'desc';
    }

    const sort = { sort: property, order, treatAs };

    this.props.merge(this.props.stateProperty, sort);

    // TEST!!!
    const filters = _objectSpread(_objectSpread(_objectSpread({}, this.props.search), sort), {}, { userSelectedSorting: true });
    // -------
    delete filters.treatAs;

    if (this.props.sortCallback) {
      this.props.sortCallback({ search: filters }, this.props.storeKey);
    }
  }

  validateSearch() {
    const { search } = this.props;
    const _search = _objectSpread({}, search);
    if (_search.sort === '_score' && !_search.searchTerm) {
      _search.sort = 'creationDate';
      _search.order = 'desc';
    }
    return _search;
  }

  render() {
    const { templates } = this.props;
    const search = this.validateSearch();
    const metadataSorts = getMetadataSorts(templates);
    const commonSorts = [
    { label: 'Title', value: 'title', type: 'text', context: 'System' },
    { label: 'Date added', value: 'creationDate', type: 'number', context: 'System' },
    { label: 'Date modified', value: 'editDate', type: 'number', context: 'System' }];

    if (search.searchTerm) {
      commonSorts.push({
        label: 'Search relevance',
        value: '_score',
        type: 'number',
        context: 'System' });

    }
    const sortOptions = [...commonSorts, ...metadataSorts].map((option) => _objectSpread(_objectSpread({},
    option), {}, {
      label: (0, _I18N.t)(option.context, option.label, undefined, false) }));


    return /*#__PURE__*/(
      _jsx("div", { className: "sort-buttons" }, void 0, /*#__PURE__*/
      _jsx(_Forms.DropdownList, {
        className: "sort-dropdown",
        value: search.sort,
        data: sortOptions,
        valueField: "value",
        textField: "label",
        onChange: (selected) =>
        this.sort(
        selected.value,
        selected.type === 'text' || selected.type === 'select' ? 'string' : 'number') }), /*#__PURE__*/



      _jsx("button", {
        type: "button",
        disabled: search.sort === '_score',
        className: `sorting-toggle ${search.sort === '_score' && 'disabled'}`,
        onClick: this.changeOrder }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, {
        icon: search.order === 'asc' && search.sort !== '_score' ? 'arrow-up' : 'arrow-down' }))));




  }}exports.SortButtons = SortButtons;












function mapStateToProps(state, ownProps) {
  let { templates } = state;
  const stateProperty = ownProps.stateProperty ?
  ownProps.stateProperty :
  `${ownProps.storeKey}.search`;

  if (ownProps.selectedTemplates && ownProps.selectedTemplates.count()) {
    templates = templates.filter((i) => ownProps.selectedTemplates.includes(i.get('_id')));
  }

  const search = stateProperty.
  split(/[.,/]/).
  reduce(
  (memo, property) => Object.keys(memo).indexOf(property) !== -1 ? memo[property] : null,
  state);

  return { stateProperty, search, templates };
}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)({ merge: _reactReduxForm.actions.merge }, (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));
}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SortButtons);exports.default = _default;