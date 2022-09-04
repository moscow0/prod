"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.ThesaurusCockpitBase = void 0;
var _Footer = _interopRequireDefault(require("../App/Footer"));
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _BasicReducer = require("../BasicReducer");
var _Loader = _interopRequireDefault(require("../components/Elements/Loader"));
var _I18N = require("../I18N");

var _resolveProperty = require("../Settings/utils/resolveProperty");
var _TemplatesAPI = _interopRequireDefault(require("../Templates/TemplatesAPI"));
var _Notice = require("./Notice");
var _ThesauriAPI = _interopRequireDefault(require("./ThesauriAPI"));

var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _reselect = require("reselect");

var _UI = require("../UI");
var _cockpitActions = require("./actions/cockpitActions");




var _valuesSort = require("./utils/valuesSort");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











class ThesaurusCockpitBase extends _RouteHandler.default {constructor(...args) {super(...args);_defineProperty(this, "interval",



































































































































































































    undefined);}static async requestState(requestParams) {// Thesauri should always have a length of 1, because a specific thesaurus ID is passed in the requestParams.
    const [thesauri, templates] = await Promise.all([_ThesauriAPI.default.getThesauri(requestParams), _TemplatesAPI.default.get(requestParams.onlyHeaders())]);const thesaurus = thesauri[0];const assocProp = (0, _resolveProperty.resolveTemplateProp)(thesaurus, templates);return [_BasicReducer.actions.set('templates', templates), _BasicReducer.actions.set('thesauri.thesaurus', thesaurus), _BasicReducer.actions.set('thesauri.suggestInfo', { property: assocProp }), (0, _cockpitActions.updateCockpitData)(requestParams)];}topicNode(topic) {var _suggestInfo$docsWith, _suggestInfo$docsWith2, _suggestInfo$docsWith3, _suggestInfo$docsWith4, _suggestInfo$docsWith5, _suggestInfo$docsWith6, _label, _suggestInfo$model$to, _suggestInfo$model, _suggestInfo$model$to2, _suggestInfo$model2, _suggestInfo$property, _suggestInfo$property2, _suggestInfo$property3;const { thesaurus, suggestInfo } = this.props;const { label, id } = topic;const suggestionCount = (_suggestInfo$docsWith = (_suggestInfo$docsWith2 = suggestInfo.docsWithSuggestionsForReview) === null || _suggestInfo$docsWith2 === void 0 ? void 0 : (_suggestInfo$docsWith3 = _suggestInfo$docsWith2.thesaurus) === null || _suggestInfo$docsWith3 === void 0 ? void 0 : _suggestInfo$docsWith3.totalValues[`${id}`]) !== null && _suggestInfo$docsWith !== void 0 ? _suggestInfo$docsWith : 0;const labelCount = (_suggestInfo$docsWith4 = (_suggestInfo$docsWith5 = suggestInfo.docsWithLabels) === null || _suggestInfo$docsWith5 === void 0 ? void 0 : (_suggestInfo$docsWith6 = _suggestInfo$docsWith5.thesaurus) === null || _suggestInfo$docsWith6 === void 0 ? void 0 : _suggestInfo$docsWith6.totalValues[`${id}`]) !== null && _suggestInfo$docsWith4 !== void 0 ? _suggestInfo$docsWith4 : 0;const topicQuality = (_label = ((_suggestInfo$model$to = (_suggestInfo$model = suggestInfo.model) === null || _suggestInfo$model === void 0 ? void 0 : _suggestInfo$model.topics) !== null && _suggestInfo$model$to !== void 0 ? _suggestInfo$model$to : {})[label]) !== null && _label !== void 0 ? _label : ((_suggestInfo$model$to2 = (_suggestInfo$model2 = suggestInfo.model) === null || _suggestInfo$model2 === void 0 ? void 0 : _suggestInfo$model2.topics) !== null && _suggestInfo$model$to2 !== void 0 ? _suggestInfo$model$to2 : {})[id];return /*#__PURE__*/_jsx("tr", {}, label, /*#__PURE__*/_jsx("th", { scope: "row" }, void 0, label, topicQuality && !!topicQuality.quality && topicQuality.quality < 0.5 && /*#__PURE__*/_jsx("span", { className: "property-help confidence-bubble low" }, void 0, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "low"), /*#__PURE__*/_jsx("div", { className: "property-description" }, void 0, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Improve the quality of this topic's suggestions by finding more sample documents with this label.")))), /*#__PURE__*/_jsx("td", { title: "sample-count" }, void 0, labelCount ? labelCount.toLocaleString() : '-'), /*#__PURE__*/_jsx("td", { title: "suggestions-count" }, void 0, suggestionCount ? suggestionCount.toLocaleString() : '-'), /*#__PURE__*/_jsx("td", { title: "review-button" }, void 0, suggestionCount > 0 && thesaurus.enable_classification && (_suggestInfo$property = suggestInfo.property) !== null && _suggestInfo$property !== void 0 && _suggestInfo$property.name ? /*#__PURE__*/_jsx(_I18N.I18NLink, { to: `/review?q=(filters:(__${(_suggestInfo$property2 = suggestInfo.property) === null || _suggestInfo$property2 === void 0 ? void 0 : _suggestInfo$property2.name}:(values:!('${id}')),` + `${(_suggestInfo$property3 = suggestInfo.property) === null || _suggestInfo$property3 === void 0 ? void 0 : _suggestInfo$property3.name}:(values:!(missing))))&includeUnpublished=1`, className: "btn btn-default btn-xs" }, void 0, /*#__PURE__*/_jsx("span", { title: "review-button-title" }, void 0, (0, _I18N.t)('System', 'View suggestions'))) : null));}learningNotice() {var _suggestInfo$model$co, _suggestInfo$model3, _suggestInfo$model3$c, _suggestInfo$model$co2, _suggestInfo$model4, _suggestInfo$model4$c, _suggestInfo$docsWith7, _suggestInfo$model5, _tasksState$TrainStat, _tasksState$TrainStat2;const { thesaurus, tasksState, suggestInfo } = this.props;const numTopics = (0, _valuesSort.getValuesSortedByName)(thesaurus).length;const numTrained = ((_suggestInfo$model$co = (_suggestInfo$model3 = suggestInfo.model) === null || _suggestInfo$model3 === void 0 ? void 0 : (_suggestInfo$model3$c = _suggestInfo$model3.config) === null || _suggestInfo$model3$c === void 0 ? void 0 : _suggestInfo$model3$c.num_test) !== null && _suggestInfo$model$co !== void 0 ? _suggestInfo$model$co : 0) + ((_suggestInfo$model$co2 = (_suggestInfo$model4 = suggestInfo.model) === null || _suggestInfo$model4 === void 0 ? void 0 : (_suggestInfo$model4$c = _suggestInfo$model4.config) === null || _suggestInfo$model4$c === void 0 ? void 0 : _suggestInfo$model4$c.num_train) !== null && _suggestInfo$model$co2 !== void 0 ? _suggestInfo$model$co2 : 0);const numLabeled = (_suggestInfo$docsWith7 = suggestInfo.docsWithLabels) === null || _suggestInfo$docsWith7 === void 0 ? void 0 : _suggestInfo$docsWith7.totalRows;const modelTime = (_suggestInfo$model5 = suggestInfo.model) === null || _suggestInfo$model5 === void 0 ? void 0 : _suggestInfo$model5.preferred;const isLearning = ((_tasksState$TrainStat = tasksState.TrainState) === null || _tasksState$TrainStat === void 0 ? void 0 : _tasksState$TrainStat.state) === 'running';const modelDate = modelTime && +modelTime > 1000000000 && +modelTime < 2000000000 ? new Date(+modelTime * 1000) : null;let status;if (modelTime) {status = /*#__PURE__*/_jsx("div", { className: "block" }, void 0, /*#__PURE__*/_jsx("div", { className: "stretch" }, void 0, /*#__PURE__*/_jsx(_I18N.Translate, { translationKey: "Suggested labels description" }, void 0, "Uwazi has suggested labels for your collection. Review them using the \"View suggestions\" button next to each topic. Disable suggestions with the \"Show suggestions\" toggle."), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "You can also improve the model by providing more labeled documents.")), /*#__PURE__*/_jsx("div", { className: "footer" }, void 0, /*#__PURE__*/_jsx(_I18N.I18NLink, { title: "label-docs", to: `/library/?quickLabelThesaurus=${thesaurus._id}&q=(allAggregations:!t,includeUnpublished:!t)`, className: "btn btn-primary get-started" }, void 0, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Label more documents"))));} else {status = /*#__PURE__*/_jsx("div", { className: "block" }, void 0, /*#__PURE__*/_jsx("div", { className: "stretch" }, void 0, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "The first step is to label a sample of your documents, so Uwazi can learn which topics to suggest when helping you label your collection.")), /*#__PURE__*/_jsx("div", { className: "footer" }, void 0, /*#__PURE__*/_jsx(_I18N.I18NLink, { title: "label-docs", to: `/library/?quickLabelThesaurus=${thesaurus._id}&q=(allAggregations:!t,includeUnpublished:!t)`, className: "btn btn-primary get-started" }, void 0, /*#__PURE__*/_jsx("span", {}, void 0, (0, _I18N.t)('System', numLabeled === 0 ? 'Get started' : 'Label more documents')))));}const learning = /*#__PURE__*/_jsx("div", { className: "block" }, void 0, /*#__PURE__*/_jsx("div", { className: "stretch" }, void 0, modelDate && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "The current model was trained at"), "\xA0", modelDate.toLocaleString(), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "with"), " ", numTrained, "\xA0", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "documents."), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("br", {})), (numLabeled !== null && numLabeled !== void 0 ? numLabeled : 0) < numTopics * 30 && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "We recommend labeling"), " ", numTopics * 30, ' ', /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "documents before training (30 per topic)."), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("br", {})), /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "You have labeled"), " ", numLabeled, ' ', /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "documents so far."), isLearning && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx("br", {}), /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Uwazi is learning using the labelled documents. This may take up to 2 hours, and once completed you can review suggestions made by Uwazi for your collection."))), /*#__PURE__*/_jsx("div", { className: "footer" }, void 0, isLearning && /*#__PURE__*/_jsx("div", { className: "btn-label property-help" }, void 0, /*#__PURE__*/_jsx("span", {}, void 0, /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Learning..."), " ", /*#__PURE__*/_jsx(_UI.Icon, { icon: "spinner", spin: true })), /*#__PURE__*/_jsx("div", { className: "property-description" }, void 0, (_tasksState$TrainStat2 = tasksState.TrainState) === null || _tasksState$TrainStat2 === void 0 ? void 0 : _tasksState$TrainStat2.message)), !isLearning && numLabeled && numLabeled > numTrained && numLabeled > numTopics * 20 && /*#__PURE__*/_jsx("button", { type: "button", className: "btn btn-default", onClick: () => this.props.startTraining() }, void 0, /*#__PURE__*/_jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Train model')))));return /*#__PURE__*/_jsx(_Notice.Notice, { title: "Suggestion Status" }, void 0, status, learning);}topicNodes() {const { thesaurus } = this.props;const values = (0, _valuesSort.getValuesSortedByName)(thesaurus);return values.map((topic) => this.topicNode(topic));}
  componentDidMount() {
    this.interval = window.setInterval(() => this.props.updateCockpitData(), 10000);
  }

  componentWillUnmount() {
    this.emptyState();
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  emptyState() {
    this.context.store.dispatch(_BasicReducer.actions.unset('thesauri.suggestInfo'));
    this.context.store.dispatch(_BasicReducer.actions.unset('thesauri.thesaurus'));
    this.context.store.dispatch(_BasicReducer.actions.unset('thesauri.tasksState'));
  }

  renderEnableSuggestionsToggle() {
    const { thesaurus, suggestInfo } = this.props;
    const modelAvailable = suggestInfo.model && suggestInfo.model.preferred;
    return (
      (modelAvailable || thesaurus.enable_classification) && /*#__PURE__*/
      _jsx("button", {
        onClick: () => this.props.toggleEnableClassification(),
        className:
        thesaurus.enable_classification ?
        'btn btn-default btn-xs btn-toggle-on' :
        'btn btn-default btn-xs btn-toggle-off',

        type: "button" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: thesaurus.enable_classification ? 'toggle-on' : 'toggle-off' }), "\xA0", /*#__PURE__*/

      _jsx("span", {}, void 0, (0, _I18N.t)('System', 'Show Suggestions'))));



  }

  publishButton() {var _suggestInfo$docsWith8;
    const { thesaurus, suggestInfo } = this.props;

    // Don't show the 'publish' button when there's nothing to be published
    if (
    !thesaurus ||
    !suggestInfo.property ||
    !((_suggestInfo$docsWith8 = suggestInfo.docsWithSuggestionsForPublish) !== null && _suggestInfo$docsWith8 !== void 0 && _suggestInfo$docsWith8.totalLabels))
    {
      return null;
    }
    const thesaurusPropertyRefName = suggestInfo.property.name;

    return /*#__PURE__*/(
      _jsx(_I18N.I18NLink, {
        title: "publish-button",
        to:
        `/library/?quickLabelThesaurus=${thesaurus._id}&` +
        `q=(filters:(__${thesaurusPropertyRefName}:(values:!(any)),${thesaurusPropertyRefName}:(values:!(any))),` +
        'limit:100,order:desc,sort:creationDate,unpublished:!t)',

        className: "btn btn-primary btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Review unpublished document")));


  }

  render() {var _tasksState$SyncState;
    const { thesaurus, tasksState, topicClassificationEnabled } = this.
    props;
    const { name } = thesaurus;
    if (!name || !((_tasksState$SyncState = tasksState.SyncState) !== null && _tasksState$SyncState !== void 0 && _tasksState$SyncState.state)) {
      return /*#__PURE__*/(
        _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
        _jsx(_Loader.default, {})));


    }
    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "flex thesaurus-cockpit panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0,
      (0, _I18N.t)('System', `Thesauri > ${name}`),
      this.renderEnableSuggestionsToggle(),
      this.publishButton()), /*#__PURE__*/

      _jsx("div", { className: "cockpit" }, void 0,
      topicClassificationEnabled && this.learningNotice(), /*#__PURE__*/
      _jsx("table", {}, void 0, /*#__PURE__*/
      _jsx("thead", {}, void 0, /*#__PURE__*/
      _jsx("tr", {}, void 0, /*#__PURE__*/
      _jsx("th", { scope: "col" }, void 0, name), /*#__PURE__*/
      _jsx("th", { scope: "col" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Sample")), /*#__PURE__*/

      _jsx("th", { scope: "col" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Documents to be reviewed")), /*#__PURE__*/

      _jsx("th", { scope: "col" }))), /*#__PURE__*/


      _jsx("tbody", {}, void 0, this.topicNodes())), /*#__PURE__*/

      _jsx("div", { className: "sync-state" }, void 0, tasksState.SyncState.message)), /*#__PURE__*/

      _jsx("div", { className: "settings-footer" }, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, { to: "/settings/dictionaries", className: "btn btn-default" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "arrow-left" }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, (0, _I18N.t)('System', 'Back')))), /*#__PURE__*/


      _jsx(_Footer.default, {}))));



  }}exports.ThesaurusCockpitBase = ThesaurusCockpitBase;


const selectSuggestInfo = (0, _reselect.createSelector)(
(state) => state.thesauri.suggestInfo,
(info) => info.toJS());


const selectThesaurus = (0, _reselect.createSelector)(
(state) => state.thesauri.thesaurus,
(thesaurus) => thesaurus.toJS());


const selectTasksState = (0, _reselect.createSelector)(
(state) => state.thesauri.tasksState,
(s) => s.toJS());


function mapStateToProps(state) {
  return {
    suggestInfo: selectSuggestInfo(state),
    thesaurus: selectThesaurus(state),
    tasksState: selectTasksState(state),
    topicClassificationEnabled: (state.settings.collection.toJS().features || {}).
    topicClassification };

}var _default =




(0, _reactRedux.connect)(mapStateToProps, {
  updateCockpitData: _cockpitActions.updateCockpitData,
  startTraining: _cockpitActions.startTraining,
  toggleEnableClassification: _cockpitActions.toggleEnableClassification })(
ThesaurusCockpitBase);exports.default = _default;