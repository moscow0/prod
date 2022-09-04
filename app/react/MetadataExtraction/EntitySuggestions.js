"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.EntitySuggestions = void 0;
var _react = _interopRequireWildcard(require("react"));

var _UI = require("../UI");

var _I18N = require("../I18N");
var _socket = require("../socket");
var _store = require("../store");

var _Pagination = require("../UI/BasicTable/Pagination");
var _RequestParams = require("../utils/RequestParams");
var _SuggestionAcceptanceModal = require("./SuggestionAcceptanceModal");
var _notificationsActions = require("../Notifications/actions/notificationsActions");
var _SuggestionsTable = require("./SuggestionsTable");


var _suggestionSchema = require("../../shared/types/suggestionSchema");
var _getIXSuggestionState = require("../../shared/getIXSuggestionState");

var _SuggestionsAPI = require("./SuggestionsAPI");






var _PDFSidePanel = require("./PDFSidePanel");
var _TrainingHealthDashboard = require("./TrainingHealthDashboard");
var _CancelFindingSuggestionsModal = require("./CancelFindingSuggestionsModal");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _extends() {_extends = Object.assign ? Object.assign.bind() : function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};return _extends.apply(this, arguments);}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}






const EntitySuggestions = ({
  property: reviewedProperty,
  acceptIXSuggestion }) =>
{
  const isMounted = (0, _react.useRef)(false);
  const [suggestions, setSuggestions] = (0, _react.useState)([]);
  const [totalPages, setTotalPages] = (0, _react.useState)(0);
  const [resetActivePage, setResetActivePage] = (0, _react.useState)(false);
  const [status, setStatus] = (0, _react.useState)({
    key: 'ready' });

  const [acceptingSuggestion, setAcceptingSuggestion] = (0, _react.useState)(false);
  const [openCancelFindingSuggestions, setOpenCancelFindingSuggestions] = (0, _react.useState)(false);
  const [sidePanelOpened, setSidePanelOpened] = (0, _react.useState)(false);
  const [stats, setStats] = (0, _react.useState)(undefined);

  const showConfirmationModal = (row) => {
    row.toggleRowSelected();
    setAcceptingSuggestion(true);
  };

  const actionsCellButtonClassNames = (state) => {
    let className = 'btn ';
    if (state === _suggestionSchema.SuggestionState.labelMatch) {
      className += 'btn-outline-success label-match';
    }
    if (state === _suggestionSchema.SuggestionState.labelMismatch || state === _suggestionSchema.SuggestionState.valueMismatch) {
      className += 'btn-outline-warning label-value-mismatch';
    }

    if (state === _suggestionSchema.SuggestionState.valueMatch) {
      className += 'btn-outline-primary value-match';
    }
    if (
    state === _suggestionSchema.SuggestionState.labelEmpty ||
    state === _suggestionSchema.SuggestionState.valueEmpty ||
    state === _suggestionSchema.SuggestionState.obsolete ||
    state === _suggestionSchema.SuggestionState.empty ||
    state === _suggestionSchema.SuggestionState.error)
    {
      className += 'btn-outline-secondary disabled';
    }

    return className;
  };

  const isRequiredFieldWithoutSuggestion = (row) =>
  row.propertyName === 'title' && row.suggestedValue === '' ||
  reviewedProperty.required && row.suggestedValue === '';

  const actionsCell = ({ row }) => {
    const suggestion = row.values;
    const { state } = suggestion;
    return /*#__PURE__*/(
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        "aria-label": "Accept suggestion",
        className: actionsCellButtonClassNames(state),
        disabled:
        state === _suggestionSchema.SuggestionState.labelEmpty ||
        state === _suggestionSchema.SuggestionState.valueEmpty ||
        state === _suggestionSchema.SuggestionState.obsolete ||
        state === _suggestionSchema.SuggestionState.labelMatch ||
        state === _suggestionSchema.SuggestionState.error ||
        isRequiredFieldWithoutSuggestion(row.original),

        onClick: async () => showConfirmationModal(row) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "arrow-right" }))));



  };

  const showPDF = (row) => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    toggleAllRowsSelected(false);
    row.toggleRowSelected();
    setSidePanelOpened(true);
  };

  const closePDFSidePanel = () => {
    setSidePanelOpened(false);
  };

  const segmentCell = ({ row }) => /*#__PURE__*/
  _jsx("div", { onClick: () => showPDF(row) }, void 0, /*#__PURE__*/
  _jsx("span", { className: "segment-pdf" }, void 0, /*#__PURE__*/
  _jsx(_I18N.Translate, {}, void 0, "Open PDF")), /*#__PURE__*/

  _jsx("span", { className: "segment-context" }, void 0, row.original.segment));



  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    gotoPage,
    setPageSize,
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { pageIndex, pageSize, filters } } =
  (0, _SuggestionsTable.suggestionsTable)(reviewedProperty, suggestions, totalPages, actionsCell, segmentCell);

  const retrieveSuggestions = (pageNumber = pageIndex + 1) => {
    const queryFilter = filters.reduce(
    (filteredValues, f) => _objectSpread(_objectSpread({}, filteredValues), {}, { [f.id]: f.value }),
    {});

    const params = new _RequestParams.RequestParams({
      page: { number: pageNumber, size: pageSize },
      filter: _objectSpread(_objectSpread({}, queryFilter), {}, { propertyName: reviewedProperty.name }) });

    (0, _SuggestionsAPI.getSuggestions)(params).
    then((response) => {
      setSuggestions(response.suggestions);
      setTotalPages(response.totalPages);
    }).
    catch(() => {});
  };

  const retriveStats = () => {
    const params = new _RequestParams.RequestParams({
      propertyName: reviewedProperty.name });

    (0, _SuggestionsAPI.getStats)(params).
    then((response) => {
      setStats(response);
    }).
    catch(() => {});
  };

  const getWrappedSuggestionState = (
  acceptedSuggestion,
  newCurrentValue) =>

  (0, _getIXSuggestionState.getSuggestionState)(_objectSpread(_objectSpread({},
  acceptedSuggestion), {}, { currentValue: newCurrentValue, modelCreationDate: 0 }),
  reviewedProperty.type);


  const acceptSuggestion = async (allLanguages) => {
    if (selectedFlatRows.length > 0) {var _acceptedSuggestion$s;
      const acceptedSuggestion = selectedFlatRows[0].original;
      await acceptIXSuggestion(acceptedSuggestion, allLanguages);
      let { labeledValue } = acceptedSuggestion;
      if (!labeledValue && (_acceptedSuggestion$s = acceptedSuggestion.selectionRectangles) !== null && _acceptedSuggestion$s !== void 0 && _acceptedSuggestion$s.length) {
        labeledValue = acceptedSuggestion.suggestedValue;
      }
      selectedFlatRows[0].toggleRowSelected();
      selectedFlatRows[0].values.state = getWrappedSuggestionState(_objectSpread(_objectSpread({},
      acceptedSuggestion), {}, { labeledValue }),
      acceptedSuggestion.suggestedValue);

      selectedFlatRows[0].values.currentValue = acceptedSuggestion.suggestedValue;
      selectedFlatRows[0].setState({});
    }

    setAcceptingSuggestion(false);
    toggleAllRowsSelected(false);
    retriveStats();
  };

  const handlePDFSidePanelSave = (entity) => {var _entity$metadata;
    setSidePanelOpened(false);
    const changedPropertyValue = entity[reviewedProperty.name] || ((_entity$metadata =
    entity.metadata) === null || _entity$metadata === void 0 ? void 0 : _entity$metadata[reviewedProperty.name]);
    selectedFlatRows[0].values.currentValue = Array.isArray(changedPropertyValue) ?
    changedPropertyValue[0].value || '-' :
    changedPropertyValue;
    selectedFlatRows[0].setState({});
    selectedFlatRows[0].toggleRowSelected();
    const acceptedSuggestion = selectedFlatRows[0].original;
    selectedFlatRows[0].values.state = getWrappedSuggestionState(
    acceptedSuggestion,
    entity.title);

    selectedFlatRows[0].setState({});
    retriveStats();
  };

  const _trainModel = async () => {
    setStatus({ key: 'sending_labeled_data' });
    const params = new _RequestParams.RequestParams({
      property: reviewedProperty.name });


    const response = await (0, _SuggestionsAPI.trainModel)(params);
    const type = response.status === 'error' ? 'danger' : 'success';
    setStatus({ key: response.status, data: response.data });
    _store.store === null || _store.store === void 0 ? void 0 : _store.store.dispatch((0, _notificationsActions.notify)(response.message, type));
    if (status.key === 'ready') {
      await retrieveSuggestions();
    }
  };

  const _cancelFindingSuggestions = async () => {
    setOpenCancelFindingSuggestions(false);
    const params = new _RequestParams.RequestParams({
      property: reviewedProperty.name });


    if (status.key !== 'ready') {
      setStatus({ key: 'cancel' });
      await (0, _SuggestionsAPI.cancelFindingSuggestions)(params);
    }
  };

  const onFindSuggestionButtonClicked = async () => {
    if (status.key === 'ready') {
      setStatus({ key: 'sending_labeled_data' });
      await _trainModel();
    } else {
      setOpenCancelFindingSuggestions(true);
    }
  };

  (0, _react.useEffect)(retrieveSuggestions, [pageIndex, pageSize, filters]);
  (0, _react.useEffect)(() => {
    if (isMounted.current) {
      retrieveSuggestions(1);
      gotoPage(0);
      setResetActivePage(true);
    } else {
      isMounted.current = true;
    }
  }, [filters]);
  (0, _react.useEffect)(() => {
    const params = new _RequestParams.RequestParams({
      property: reviewedProperty.name });

    (0, _SuggestionsAPI.ixStatus)(params).
    then((response) => {
      setStatus({ key: response.status, data: response.data });
    }).
    catch(() => {
      setStatus({ key: 'error' });
    });

    _socket.socket.on(
    'ix_model_status',
    (propertyName, modelStatus, _, data) => {
      if (propertyName === reviewedProperty.name) {
        setStatus({ key: modelStatus, data });
        if (data && data.total === data.processed || modelStatus === 'ready') {
          setStatus({ key: 'ready' });
          retrieveSuggestions();
        }
        retriveStats();
      }
    });


    retriveStats();

    return () => {
      _socket.socket.off('ix_model_status');
    };
  }, []);

  const ixmessages = {
    ready: 'Find suggestions',
    sending_labeled_data: 'Sending labeled data...',
    processing_model: 'Training model...',
    processing_suggestions: 'Finding suggestions',
    cancel: 'Cancelling...',
    error: 'Error' };


  const formatData = (data) =>
  data ? `${data.processed}/${data.total}` : '';

  return /*#__PURE__*/(
    _react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
    _jsx("div", { className: "panel entity-suggestions" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "dashboard-link" }, void 0, /*#__PURE__*/
    _jsx(_I18N.I18NLink, { to: "settings/metadata_extraction" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "arrow-left" }), /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Back to dashboard"))), /*#__PURE__*/


    _jsx("div", { className: "panel-subheading" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "property-info-container" }, void 0, /*#__PURE__*/
    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("span", { className: "suggestion-header" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Reviewing"), ":\xA0"), /*#__PURE__*/

    _jsx("span", { className: "suggestion-property" }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, reviewedProperty.label))), /*#__PURE__*/


    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      title: status.key !== 'ready' ? 'Cancel' : 'Train',
      className: `btn service-request-button ${status.key}`,
      onClick: onFindSuggestionButtonClicked }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, ixmessages[status.key]), " ", formatData(status.data)))), /*#__PURE__*/



    _jsx(_TrainingHealthDashboard.TrainingHealthDashboard, { stats: stats })), /*#__PURE__*/

    _react.default.createElement("table", _extends({}, getTableProps(), { className: "table sticky" }), /*#__PURE__*/
    _jsx("thead", { className: "header" }, void 0,
    headerGroups.map((headerGroup) => /*#__PURE__*/
    _react.default.createElement("tr", headerGroup.getHeaderGroupProps(),
    headerGroup.headers.map((column) => {
      const className =
      column.className + (filters.find((f) => f.id === column.id) ? ' filtered' : '');
      return /*#__PURE__*/(
        _react.default.createElement("th", column.getHeaderProps({ className }),
        column.render('Header'),
        column.canFilter && column.Filter && column.render('Filter')));


    })))), /*#__PURE__*/



    _react.default.createElement("tbody", getTableBodyProps(),
    page.map((row) => {
      prepareRow(row);
      return /*#__PURE__*/(
        _react.default.createElement("tr", row.getRowProps(),
        row.cells.map((cell) => /*#__PURE__*/
        _react.default.createElement("td", cell.getCellProps({ className: cell.column.className }),
        cell.render('Cell')))));




    }))), /*#__PURE__*/


    _jsx(_Pagination.Pagination, {
      resetActivePage: resetActivePage,
      onPageChange: gotoPage,
      onPageSizeChange: setPageSize,
      totalPages: totalPages }), /*#__PURE__*/

    _jsx(_SuggestionAcceptanceModal.SuggestionAcceptanceModal, {
      isOpen: acceptingSuggestion,
      propertyType: reviewedProperty.type,
      onClose: () => setAcceptingSuggestion(false),
      onAccept: async (allLanguages) => acceptSuggestion(allLanguages) }), /*#__PURE__*/

    _jsx(_CancelFindingSuggestionsModal.CancelFindingSuggestionModal, {
      isOpen: openCancelFindingSuggestions,
      onClose: () => setOpenCancelFindingSuggestions(false),
      onAccept: async () => _cancelFindingSuggestions() })),


    Boolean(selectedFlatRows.length) && /*#__PURE__*/
    _jsx(_PDFSidePanel.PDFSidePanel, {
      open: sidePanelOpened,
      closeSidePanel: closePDFSidePanel,
      handleSave: handlePDFSidePanelSave,
      entitySuggestion: selectedFlatRows[0].original })));




};exports.EntitySuggestions = EntitySuggestions;