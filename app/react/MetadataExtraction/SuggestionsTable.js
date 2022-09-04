"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.suggestionsTable = void 0;
var _react = _interopRequireDefault(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _reactTable = require("react-table");









var _reactTableSticky = require("react-table-sticky");
var _I18N = require("../I18N");
var _UI = require("../UI");
var _formater = require("../Metadata/helpers/formater");


var _suggestionSchema = require("../../shared/types/suggestionSchema");
var _ModalTips = _interopRequireDefault(require("../App/ModalTips"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const suggestionsTable = (
reviewedProperty,
suggestions,
totalPages,
actionsCell,
segmentCell) =>
{
  const stateFilter = ({
    column: { filterValue, setFilter } }) => /*#__PURE__*/

  _jsx("select", {
    className: filterValue ? 'filtered' : '',
    value: filterValue,
    onChange: (e) => {
      setFilter(e.target.value || undefined);
    } }, void 0, /*#__PURE__*/

  _jsx("option", { value: "" }, void 0, (0, _I18N.t)('System', 'All', 'All', false)),
  Object.values(_suggestionSchema.SuggestionState).
  filter((state) => state !== _suggestionSchema.SuggestionState.processing).
  sort().
  map((state) => /*#__PURE__*/
  _jsx("option", { value: state }, state,
  (0, _I18N.t)('System', state, state, false))));





  const formatValue = (value) => {
    if (!value) return '-';
    if (reviewedProperty.type === 'date' && _lodash.default.isNumber(value)) {
      return _formater.propertyValueFormatter.date(value);
    }
    return value;
  };

  const currentValueCell = ({ row }) => {
    const propertyValue = row.values.currentValue || row.original.currentValue;
    const currentValue = formatValue(propertyValue);
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("p", { className: "current-value" }, void 0, currentValue)));


  };

  const suggestionCell = ({ row }) => {
    const suggestion = row.original;
    const suggestedValue = formatValue(suggestion.suggestedValue);
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("p", { className: "suggested-value" }, void 0, suggestedValue)));


  };

  const columns = _react.default.useMemo(
  () => [
  {
    accessor: 'segment',
    Header: () => /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Context"),
    className: reviewedProperty.label === 'Title' ? 'long-segment' : 'segment',
    Cell: segmentCell },

  {
    id: 'suggestion',
    Header: () => /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Suggestion"),
    Cell: suggestionCell,
    className: 'suggestion' },

  {
    id: 'action',
    Header: () => '',
    Cell: actionsCell,
    className: 'action' },

  {
    id: 'currentValue',
    Header: () => /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Current value"),
    Cell: currentValueCell,
    className: 'current' },

  {
    id: 'entityTitle',
    accessor: 'entityTitle',
    Header: () => /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Title"),
    className: 'title' },

  {
    accessor: 'language',
    Header: () => /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Language"),
    className: 'language',
    Cell: ({ row }) => /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, row.original.language) },


  {
    accessor: 'state',
    Header: () => /*#__PURE__*/
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx(_ModalTips.default, {
      label: /*#__PURE__*/_jsx(_UI.Icon, { icon: "question-circle" }),
      title: (0, _I18N.t)('System', 'State Legend', 'State Legend', false) }, void 0, /*#__PURE__*/

    _jsx("h5", {}, void 0, (0, _I18N.t)('System', _suggestionSchema.SuggestionState.labelMatch, _suggestionSchema.SuggestionState.labelMatch, false)), /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "labelMatchDesc" }, void 0, "It has a current value and a text selection matching with the modelsuggested value and selection. It will be used as a training sample.")), /*#__PURE__*/




    _jsx("h5", {}, void 0,
    (0, _I18N.t)('System', _suggestionSchema.SuggestionState.labelMismatch, _suggestionSchema.SuggestionState.labelMismatch, false)), /*#__PURE__*/

    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "labelMismatchDesc" }, void 0, "It has a current value and text selection but they do not match the model prediction. Accepting the suggestion will replace the current value and text selection with the suggested ones becoming a \"match / labeled\". If the labeled data is correct and the suggestion is wrong no action is needed. It will be used as a training sample.")), /*#__PURE__*/







    _jsx("h5", {}, void 0, (0, _I18N.t)('System', _suggestionSchema.SuggestionState.labelEmpty, _suggestionSchema.SuggestionState.labelEmpty, false)), /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "labelEmptyDesc" }, void 0, "Accepting is not available since there is no suggestion.If the value is correct and the suggestion is wrong no action is needed. It will be used as a training sample.")), /*#__PURE__*/





    _jsx("h5", {}, void 0, (0, _I18N.t)('System', _suggestionSchema.SuggestionState.valueMatch, _suggestionSchema.SuggestionState.valueMatch, false)), /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "valueMatchDesc" }, void 0, "It has a current value that matches the suggestion, but it doesn't have a text selection. Accepting will keep the value as it is and enrich it with the suggested text selection becoming a \"match / label\" that can be used as a training sample.")), /*#__PURE__*/





    _jsx("h5", {}, void 0,
    (0, _I18N.t)('System', _suggestionSchema.SuggestionState.valueMismatch, _suggestionSchema.SuggestionState.valueMismatch, false)), /*#__PURE__*/

    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "valueMismatchDesc" }, void 0, "Accepting the suggestion will replace the current value and text selection with the suggested ones becoming a \"match / label\" that will be used as a training sample. If the current value is correct, you can still click to fill the text selection so it becomes a \"mismatch / label\" that will be used as a training sample.")), /*#__PURE__*/







    _jsx("h5", {}, void 0,
    (0, _I18N.t)('System', _suggestionSchema.SuggestionState.emptyMismatch, _suggestionSchema.SuggestionState.emptyMismatch, false)), /*#__PURE__*/

    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "emptyMismatchDesc" }, void 0, "There is no current value and the model is suggesting a value. Accepting the suggestion will replace the current (empty) value and text selection with the suggested ones becoming a \"match / label\" that will be used as a training sample. Alternatively you can ignore the suggestion and click to fill the text selection so it becomes a \"mismatch / label\" that will be used as a training sample.")), /*#__PURE__*/







    _jsx("h5", {}, void 0, (0, _I18N.t)('System', _suggestionSchema.SuggestionState.valueEmpty, _suggestionSchema.SuggestionState.valueEmpty, false)), /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "valueEmptyDesc" }, void 0, "Accepting is not available since there is no suggestion. If the current value is correct, you can click to fill the text selection so it becomes a \"empty / label\" that will be used as a training sample.")), /*#__PURE__*/





    _jsx("h5", {}, void 0, (0, _I18N.t)('System', _suggestionSchema.SuggestionState.empty, _suggestionSchema.SuggestionState.empty, false)), /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "emptyDesc" }, void 0, "Both the current value and the suggestion are empty. You can click to fill the value and text selection so it becomes a \"empty / label\" that will be used as a training sample.")), /*#__PURE__*/





    _jsx("h5", {}, void 0, (0, _I18N.t)('System', _suggestionSchema.SuggestionState.obsolete, _suggestionSchema.SuggestionState.obsolete, false)), /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, { translationKey: "obsoleteDesc" }, void 0, "A new model is training and processing suggestions. This suggestion was created by a previous model so no actions are possible until the new suggestion is received."))), /*#__PURE__*/





    _jsx(_I18N.Translate, {}, void 0, "State")),


    Cell: ({ row }) => {
      const dirtyState = row.original.state !== row.values.state;
      return /*#__PURE__*/(
        _jsx("div", { className: dirtyState ? 'new-state' : '' }, void 0, /*#__PURE__*/
        _jsx(_I18N.Translate, {}, void 0, row.values.state)));


    },
    Filter: stateFilter,
    className: 'state' }],


  []);

  const hiddenColumns = reviewedProperty.label === 'Title' ? ['entityTitle'] : [];

  return (0, _reactTable.useTable)(
  {
    columns,
    data: suggestions,
    manualPagination: true,
    manualFilters: true,
    initialState: {
      hiddenColumns,
      pageIndex: 0,
      pageSize: 100 },


    pageCount: totalPages,
    autoResetPage: false,
    autoResetFilters: false },


  _reactTable.useFilters,
  _reactTable.usePagination,
  _reactTable.useRowSelect,
  _reactTable.useRowState,
  _reactTableSticky.useSticky);

};exports.suggestionsTable = suggestionsTable;