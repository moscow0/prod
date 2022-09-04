"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.defaultProps = exports.MultiSelectTristate = exports.MultiSelect = void 0;

var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _optionsUtils = require("../../../shared/optionsUtils");
var _I18N = require("../../I18N");

var _Icon = require("../../Layout/Icon");
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var



SelectStates;(function (SelectStates) {SelectStates[SelectStates["OFF"] = 0] = "OFF";SelectStates[SelectStates["PARTIAL"] = 1] = "PARTIAL";SelectStates[SelectStates["ON"] = 2] = "ON";SelectStates[SelectStates["GROUP"] = 3] = "GROUP";})(SelectStates || (SelectStates = {}));



























const defaultProps = {
  optionsLabel: 'label',
  optionsValue: 'value',
  prefix: '',
  options: [],
  filter: '',
  optionsToShow: 5,
  showAll: false,
  hideSearch: false,
  showSearch: false,
  sort: false,
  sortbyLabel: false,
  forceHoist: false,
  placeholder: '',
  onChange: (_v) => {},
  onFilter: async (_searchTerm) => {},
  totalPossibleOptions: 0,
  allowSelectGroup: false };exports.defaultProps = defaultProps;








const isNotAnEmptyGroup = (option) => !option.options || option.options.length;

class MultiSelectBase extends _react.Component


{




  constructor(props) {
    super(props);_defineProperty(this, "searchInputRef", void 0);
    this.state = { showAll: props.showAll, ui: {}, filter: '' };
    this.filter = this.filter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.showAll = this.showAll.bind(this);
    this.focusSearch = this.focusSearch.bind(this);
    this.searchInputRef = /*#__PURE__*/(0, _react.createRef)();
  }

  static getDerivedStateFromProps(props) {
    if (props.filter) {
      return { filter: props.filter };
    }

    return null;
  }

  getPartialList() {
    return [];
  }

  getPinnedList() {
    return [];
  }







  getStateValue(
  value,
  group,
  {
    markGroup,
    conditionValue,
    markOptions })





  {
    let newValue = markGroup(value, group);
    group.options.forEach((_item) => {
      if (this.checked(_item) !== conditionValue) {
        newValue = markOptions(newValue, _item);
      }
    });

    return newValue;
  }

  getGroupStateValue(value, group) {
    return this.getStateValue(value, group, {
      markGroup: this.markChecked.bind(this),
      conditionValue: SelectStates.OFF,
      markOptions: this.markUnchecked.bind(this) });

  }

  getOnStateValue(value, group) {
    return this.getStateValue(value, group, {
      markGroup: this.markUnchecked.bind(this),
      conditionValue: SelectStates.ON,
      markOptions: this.markChecked.bind(this) });

  }

  getOffStateValue(value, group) {
    return this.getStateValue(value, group, {
      markGroup: this.markUnchecked.bind(this),
      conditionValue: SelectStates.OFF,
      markOptions: this.markUnchecked.bind(this) });

  }

  changeGroup(group, e) {
    const { value, allowSelectGroup } = this.props;
    const previousState = parseInt(e.target.dataset.state, 10);

    const transitionCallbacks =

    {
      [SelectStates.OFF]: this.getOnStateValue,
      [SelectStates.GROUP]: this.getOffStateValue,
      [SelectStates.PARTIAL]: this.getOffStateValue,
      [SelectStates.ON]: allowSelectGroup ? this.getGroupStateValue : this.getOffStateValue };


    this.props.onChange(transitionCallbacks[previousState].call(this, value, group));
  }

  checked(option) {
    if (!this.props.value) {
      return SelectStates.OFF;
    }

    const checkedList = this.getCheckedList();
    const partialList = this.getPartialList();

    if (option.options) {
      if (checkedList.includes(option[this.props.optionsValue])) {
        return SelectStates.GROUP;
      }

      const numChecked = option.options.reduce(
      (nc, _option) => nc + (checkedList.includes(_option[this.props.optionsValue]) ? 1 : 0),
      0);

      const numPartial = option.options.reduce(
      (np, _option) => np + (partialList.includes(_option[this.props.optionsValue]) ? 1 : 0),
      0);

      if (numChecked === option.options.length) {
        return SelectStates.ON;
      }
      if (numChecked + numPartial > 0) {
        return SelectStates.PARTIAL;
      }
      return SelectStates.OFF;
    }

    if (checkedList.includes(option[this.props.optionsValue])) {
      return SelectStates.ON;
    }

    if (partialList.includes(option[this.props.optionsValue])) {
      return SelectStates.PARTIAL;
    }

    return SelectStates.OFF;
  }

  change(option) {
    let { value } = this.props;
    if (this.checked(option) === SelectStates.ON) {
      value = this.markUnchecked(value, option);
    } else {
      value = this.markChecked(value, option);
    }
    this.props.onChange(value);
  }

  async filter(e) {
    this.setState({ filter: e.target.value });
    await this.props.onFilter(e.target.value);
  }

  async resetFilter() {
    this.setState({ filter: '' });
    await this.props.onFilter('');
  }

  showAll(e) {
    e.preventDefault();
    this.setState((prevState) => ({ showAll: !prevState.showAll }));
  }

  sort(options, isSubGroup = false) {
    const { optionsValue, optionsLabel } = this.props;
    const pinnedList = this.getPinnedList();
    const sortedOptions = options.sort((a, b) => {
      const aPinned = this.checked(a) !== SelectStates.OFF || pinnedList.includes(a[optionsValue]);
      const bPinned = this.checked(b) !== SelectStates.OFF || pinnedList.includes(b[optionsValue]);
      let sorting = 0;
      if (!this.state.showAll) {
        sorting = (bPinned ? 1 : 0) - (aPinned ? 1 : 0);
      }

      if (sorting === 0 && typeof options[0].results !== 'undefined' && a.results !== b.results) {
        sorting = (a.results || 0) > (b.results || 0) ? -1 : 1;
      }

      const showingAll = this.state.showAll || options.length < this.props.optionsToShow;
      if (sorting === 0 || showingAll || this.props.sortbyLabel || isSubGroup) {
        sorting = a[optionsLabel] < b[optionsLabel] ? -1 : 1;
      }

      return sorting;
    });

    return this.moveNoValueOptionToBottom(sortedOptions);
  }

  sortOnlyAggregates(options) {
    const { optionsLabel } = this.props;
    if (!options.length || typeof options[0].results === 'undefined') {
      return options;
    }
    const sortedOptions = options.sort((a, b) => {
      let sorting = (b.results || 0) - (a.results || 0);

      if (sorting === 0) {
        sorting = a[optionsLabel] < b[optionsLabel] ? -1 : 1;
      }

      return sorting;
    });
    return this.moveNoValueOptionToBottom(sortedOptions);
  }

  moveNoValueOptionToBottom(options) {
    let _options = [...options];
    ['any', 'missing'].forEach((bottomId) => {
      const bottomOption = _options.find((opt) => opt.id === bottomId);
      if (bottomOption && this.checked(bottomOption) === SelectStates.OFF) {
        _options = _options.filter((opt) => opt.id !== bottomId);
        _options.push(bottomOption);
      }
    });
    return _options;
  }

  hoistCheckedOptions(options) {
    const [checkedOptions, otherOptions] = options.reduce(
    ([checked, others], option) => {
      if (this.checked(option) !== SelectStates.OFF) {
        return [checked.concat([option]), others];
      }
      return [checked, others.concat([option])];
    },
    [[], []]);

    const partitionedOptions = checkedOptions.concat(otherOptions);
    return this.moveNoValueOptionToBottom(partitionedOptions);
  }

  moreLessLabel(totalOptions) {
    const { totalPossibleOptions } = this.props;
    const amount = totalPossibleOptions || totalOptions.length;

    if (this.state.showAll) {
      return /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "x less");
    }

    return /*#__PURE__*/(
      _jsx("span", {}, void 0,
      amount - this.props.optionsToShow, " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "x more")));


  }

  toggleOptions(group, e) {
    e.preventDefault();
    const groupKey = group[this.props.optionsValue];
    const { ui } = this.state;
    ui[groupKey] = !ui[groupKey];
    this.setState({ ui });
  }

  showSubOptions(parent) {
    const toggled = this.state.ui[parent.id];
    return toggled || this.checked(parent) !== SelectStates.OFF;
  }

  label(option) {
    const { optionsValue, optionsLabel, prefix } = this.props;
    return /*#__PURE__*/(
      _jsx("label", { className: "multiselectItem-label", htmlFor: prefix + option[optionsValue] }, void 0, /*#__PURE__*/
      _jsx("span", { className: "multiselectItem-icon" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['far', 'square'], className: "checkbox-empty" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check", className: "checkbox-checked" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "minus", className: "checkbox-partial" }), /*#__PURE__*/
      _jsx(_UI.Icon, { icon: ['fas', 'square'], className: "checkbox-group" })), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-name" }, void 0, /*#__PURE__*/
      _jsx(_Icon.Icon, { className: "item-icon", data: option.icon }),
      option[optionsLabel]), /*#__PURE__*/

      _jsx("span", { className: "multiselectItem-results" }, void 0,
      option.results && /*#__PURE__*/_jsx("span", {}, void 0, option.results),
      option.options && /*#__PURE__*/
      _jsx("span", {
        className: "multiselectItem-action",
        onClick: this.toggleOptions.bind(this, option) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: this.state.ui[option.id] ? 'caret-up' : 'caret-down' })))));





  }

  focusSearch() {
    const node = this.searchInputRef.current;
    node.focus();
  }

  renderGroup(group, index) {
    const { prefix } = this.props;
    const state = this.checked(group);
    return /*#__PURE__*/(
      _jsx("li", { className: "multiselect-group" }, index, /*#__PURE__*/
      _jsx("div", { className: "multiselectItem" }, void 0, /*#__PURE__*/
      _jsx("input", {
        type: "checkbox",
        className: "group-checkbox multiselectItem-input",
        id: prefix + group.id,
        onChange: this.changeGroup.bind(this, group),
        checked: state !== SelectStates.OFF,
        "data-state": state }),

      this.label(_objectSpread(_objectSpread({}, group), {}, { results: group.results }))), /*#__PURE__*/

      _jsx(_ShowIf.default, { if: this.showSubOptions(group) }, void 0, /*#__PURE__*/
      _jsx("ul", { className: "multiselectChild is-active" }, void 0,
      group.options.map((_item, i) =>
      this.renderOption(_item, i, index.toString(), state === SelectStates.GROUP))))));





  }

  renderOption(option, index, groupIndex = '', disabled = false) {
    const { optionsValue, optionsLabel, prefix } = this.props;
    const key = `${groupIndex}${index}`;
    return /*#__PURE__*/(
      _jsx("li", {
        className: "multiselectItem",

        title: option.title ? option.title : option[optionsLabel] }, key, /*#__PURE__*/

      _jsx("input", {
        type: "checkbox",
        className: "multiselectItem-input",
        value: option[optionsValue],
        id: prefix + option[optionsValue],
        onChange: this.change.bind(this, option),
        checked: this.checked(option) !== SelectStates.OFF,
        "data-state": this.checked(option),
        disabled: disabled }),

      this.label(option)));


  }

  renderSearch() {
    const { placeholder, options, optionsToShow, hideSearch, showSearch } = this.props;

    return /*#__PURE__*/(
      _jsx("li", { className: "multiselectActions" }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: options.length > optionsToShow && !hideSearch || showSearch }, void 0, /*#__PURE__*/
      _jsx("div", { className: "form-group" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: this.state.filter ? 'times-circle' : 'search', onClick: this.resetFilter }), /*#__PURE__*/
      _react.default.createElement("input", {
        ref: this.searchInputRef,
        className: "form-control",
        type: "text",
        placeholder: placeholder || (0, _I18N.t)('System', 'Search item', null, false),
        value: this.state.filter,
        onChange: this.filter })))));





  }

  renderOptionsCount(totalOptions, renderedOptions) {
    const { totalPossibleOptions } = this.props;
    let count = `${totalPossibleOptions - renderedOptions.length}`;
    if (totalPossibleOptions > 1000) {
      count = `${count}+`;
    }

    return /*#__PURE__*/(
      _jsx("li", { className: "multiselectActions" }, void 0, /*#__PURE__*/
      _jsx(_ShowIf.default, { if: totalOptions.length > this.props.optionsToShow }, void 0, /*#__PURE__*/
      _jsx("button", { onClick: this.showAll, className: "btn btn-xs btn-default", type: "button" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: this.state.showAll ? 'caret-up' : 'caret-down' }), "\xA0",

      this.moreLessLabel(totalOptions))),


      totalPossibleOptions > totalOptions.length && this.state.showAll && /*#__PURE__*/
      _jsx("div", { className: "total-options" }, void 0,
      count, " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "more options."), ' ', /*#__PURE__*/
      _jsx("button", { onClick: this.focusSearch, type: "button" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Narrow your search")))));





  }

  render() {
    const { optionsLabel } = this.props;

    let totalOptions = this.props.options.filter((option) => {
      let notDefined;
      return (
        isNotAnEmptyGroup(option) && (
        option.results === notDefined ||
        option.results > 0 ||
        option.options && option.options.length ||
        this.checked(option)));

    });

    totalOptions = totalOptions.map((option) => {
      if (!option.options) {
        return option;
      }
      return _objectSpread(_objectSpread({},
      option), {}, {
        options: option.options.filter((_opt) => {
          let notDefined;

          return _opt.results === notDefined || _opt.results > 0 || this.checked(_opt);
        }) });

    });

    if (this.state.filter) {
      totalOptions = (0, _optionsUtils.filterOptions)(this.state.filter, totalOptions, optionsLabel);
    }

    let options = totalOptions.slice();
    const tooManyOptions = !this.state.showAll && options.length > this.props.optionsToShow;

    if (this.props.sort) {
      options = this.sort(options);
    } else {
      options = this.sortOnlyAggregates(options);
    }

    if (this.props.forceHoist || !this.props.sort && !this.state.showAll) {
      options = this.hoistCheckedOptions(options);
    }

    let renderingOptions = options;

    if (tooManyOptions) {
      const numberOfActiveOptions = options.filter((opt) => this.checked(opt)).length;
      const optionsToShow =
      this.props.optionsToShow > numberOfActiveOptions ?
      this.props.optionsToShow :
      numberOfActiveOptions;
      renderingOptions = options.slice(0, optionsToShow);
    }

    renderingOptions = renderingOptions.map((option) => {
      if (!option.options) {
        return option;
      }
      return _objectSpread(_objectSpread({}, option), {}, { options: this.sort(option.options, true) });
    });

    return /*#__PURE__*/(
      _jsx("ul", { className: "multiselect is-active" }, void 0,
      this.renderSearch(),
      !renderingOptions.length && /*#__PURE__*/
      _jsx("span", { className: "no-options-message" }, void 0, (0, _I18N.t)('System', 'No options found')),

      renderingOptions.map((option, index) => {
        if (option.options) {
          return this.renderGroup(option, index);
        }

        return this.renderOption(option, index);
      }),
      this.renderOptionsCount(options, renderingOptions)));


  }}_defineProperty(MultiSelectBase, "defaultProps", defaultProps);


class MultiSelect extends MultiSelectBase {


  markChecked(value, option) {
    const newValue = value.slice(0);
    newValue.push(option[this.props.optionsValue]);
    return newValue;
  }

  markUnchecked(value, option) {
    const opt = option[this.props.optionsValue];
    if (!value.includes(opt)) {
      return value;
    }
    return value.filter((v) => v !== opt);
  }

  getCheckedList() {
    return this.props.value || [];
  }}exports.MultiSelect = MultiSelect;_defineProperty(MultiSelect, "defaultProps", _objectSpread(_objectSpread({}, defaultProps), {}, { value: [] }));


class MultiSelectTristate extends MultiSelectBase {


  markChecked(value, option) {
    const opt = option[this.props.optionsValue];
    const newValue = _objectSpread(_objectSpread({}, value), {}, { added: value.added.slice(0), removed: value.removed.slice(0) });
    newValue.removed = value.removed.filter((v) => v !== opt);
    if (value.originalFull.includes(opt)) {
      return newValue;
    }
    // Flip originally partial options from off to partial, and then from partial to on.
    if (!value.originalPartial.includes(opt) || !value.removed.includes(opt)) {
      newValue.added.push(opt);
    }
    return newValue;
  }

  markUnchecked(value, option) {
    const opt = option[this.props.optionsValue];
    const newValue = _objectSpread(_objectSpread({}, value), {}, { added: value.added.slice(0), removed: value.removed.slice(0) });
    if (value.originalFull.includes(opt) || value.originalPartial.includes(opt)) {
      newValue.removed.push(option[this.props.optionsValue]);
    }
    newValue.added = value.added.filter((v) => v !== option[this.props.optionsValue]);
    return newValue;
  }

  getCheckedList() {
    const { value } = this.props;
    return value.originalFull.filter((v) => !value.removed.includes(v)).concat(value.added);
  }

  getPartialList() {
    const { value } = this.props;
    return value.originalPartial.filter((v) => !value.removed.includes(v));
  }

  getPinnedList() {
    const { value } = this.props;
    return value.originalPartial.concat(value.originalFull);
  }}exports.MultiSelectTristate = MultiSelectTristate;_defineProperty(MultiSelectTristate, "defaultProps", _objectSpread(_objectSpread({}, defaultProps), {}, { value: {} }));