"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.selectquickLabelThesaurus = exports.selectIsPristine = exports.mapStateToProps = exports.QuickLabelPanelBase = exports.QuickLabelPanel = void 0;var _I18N = require("../../I18N");
var _Notice = require("../../Thesauri/Notice");

var _SidePanel = _interopRequireDefault(require("../../Layout/SidePanel"));
var _libraryActions = require("../actions/libraryActions");
var metadataActions = _interopRequireWildcard(require("../../Metadata/actions/actions"));
var _MetadataFormFields = require("../../Metadata/components/MetadataFormFields");
var _Multireducer = require("../../Multireducer");
var _ReactReduxForms = require("../../ReactReduxForms");
var _StateSelector = require("../../Review/components/StateSelector");
var _immutable = _interopRequireDefault(require("immutable"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _reselect = require("reselect");




var _UI = require("../../UI");
var _quickLabelActions = require("../actions/quickLabelActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}





const defaultProps = {
  formKey: 'library.sidepanel.quickLabelMetadata',
  quickLabelMetadata: {},
  quickLabelThesaurus: undefined,
  opts: {},
  selectedDocuments: _immutable.default.fromJS([]),
  templates: _immutable.default.fromJS([]),
  unselectAllDocuments: () => {},
  toggleQuickLabelAutoSave: () => {},
  selectedDocumentsChanged: () => {},
  maybeSaveQuickLabels: (_force) => {},
  multipleUpdate: (_o, _diff) => {} };




const selectIsPristine = (0, _reselect.createSelector)(
(state) => state.library.sidepanel.quickLabelMetadataForm.$form.pristine,
(value) => value);exports.selectIsPristine = selectIsPristine;


class QuickLabelPanelBase extends _react.Component {






  constructor(props) {
    super(props);
    this.publish = this.publish.bind(this);
  }

  publish() {
    this.context.confirm({
      accept: () => {
        this.props.multipleUpdate(this.props.selectedDocuments, { published: true });
      },
      title: 'Confirm',
      message: 'Confirm publish multiple items',
      type: 'success' });

  }

  renderAutoSaveToggle() {
    const { opts } = this.props;
    return /*#__PURE__*/(
      _jsx("button", {
        type: "button",
        onClick: () => this.props.toggleQuickLabelAutoSave(),
        className: `btn btn-default btn-header btn-toggle-${opts.autoSave ? 'on' : 'off'}` }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: opts.autoSave ? 'toggle-on' : 'toggle-off' }), /*#__PURE__*/
      _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Auto-save"))));



  }

  renderButtons(canBePublished) {
    return /*#__PURE__*/(
      _jsx(_StateSelector.StateSelector, { isPristine: selectIsPristine }, void 0,
      ({ isPristine }) => {
        const btnClass = isPristine ? 'btn btn-default btn-disabled' : 'btn btn-default';
        return /*#__PURE__*/(
          _react.default.createElement(_react.default.Fragment, null,
          canBePublished && isPristine && /*#__PURE__*/
          _jsx("button", { type: "button", className: "publish btn btn-success", onClick: this.publish }, void 0, /*#__PURE__*/
          _jsx(_UI.Icon, { icon: "paper-plane" }), /*#__PURE__*/
          _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
          _jsx(_I18N.Translate, {}, void 0, "Publish"))), /*#__PURE__*/



          _jsx("button", {
            type: "button",
            onClick: () => this.props.selectedDocumentsChanged(),
            className: `cancel-edit-metadata ${!isPristine ? 'btn-danger' : ''} ${btnClass}` }, void 0, /*#__PURE__*/

          _jsx(_UI.Icon, { icon: "undo" }), /*#__PURE__*/
          _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
          _jsx(_I18N.Translate, {}, void 0, "Discard changes"))), /*#__PURE__*/


          _jsx("button", {
            type: "button",
            onClick: () => this.props.maybeSaveQuickLabels(true),
            className: `save-metadata ${btnClass}` }, void 0, /*#__PURE__*/

          _jsx(_UI.Icon, { icon: "save" }), /*#__PURE__*/
          _jsx("span", { className: "btn-label" }, void 0, /*#__PURE__*/
          _jsx(_I18N.Translate, {}, void 0, "Save document(s)")))));




      }));


  }

  renderProp(propName) {var _prop$get;
    const { quickLabelThesaurus, templates } = this.props;
    const prop = templates.
    map((tmpl) => {var _tmpl$get;return tmpl === null || tmpl === void 0 ? void 0 : (_tmpl$get = tmpl.get('properties')) === null || _tmpl$get === void 0 ? void 0 : _tmpl$get.find((p) => (p === null || p === void 0 ? void 0 : p.get('name')) === propName);}).
    filter((p) => !!p);
    return /*#__PURE__*/(
      _jsx("div", { className: "form-group" }, propName, /*#__PURE__*/
      _jsx("ul", { className: "search__filter is-active" }, void 0, /*#__PURE__*/
      _jsx("li", { className: "title" }, void 0, /*#__PURE__*/
      _jsx("label", {}, void 0, (0, _I18N.t)('System', prop.size ? (_prop$get = prop.get(0)) === null || _prop$get === void 0 ? void 0 : _prop$get.get('label') : propName))), /*#__PURE__*/

      _jsx("li", { className: "wide" }), /*#__PURE__*/
      _jsx(_ReactReduxForms.MultiSelectTristate, {
        model: `library.sidepanel.quickLabelMetadata.${propName}`,
        optionsValue: "id",
        options: (0, _MetadataFormFields.translateOptions)(quickLabelThesaurus),
        prefix: `library.sidepanel.quickLabelMetadata.${propName}`,
        sort: true,
        placeholder: `${(0, _I18N.t)('System', 'Search', null, false)} '${quickLabelThesaurus.get(
        'name')
        }'` }))));




  }

  static renderNotice() {
    return /*#__PURE__*/(
      _jsx(_Notice.Notice, { title: "Label your collection" }, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, { translationKey: "Label your collection note" }, void 0, "Note: Make the sample set of documents for each topic diverse and representative. For example, use various methods to find sample documents and don't just search for the term \"education\" to find documents for the topic \"Education\"."), /*#__PURE__*/




      _jsx("br", {}), /*#__PURE__*/
      _jsx("br", {}), /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Return to the thesaurus page when you finished labeling to start learning.")))));






  }

  renderSidePanelBody() {
    const { quickLabelThesaurus, quickLabelMetadata } = this.props;
    let content;
    if (!quickLabelThesaurus) {
      content = /*#__PURE__*/
      _jsx("div", {}, void 0,
      QuickLabelPanelBase.renderNotice(), /*#__PURE__*/
      _jsx("label", { className: "errormsg" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Oops! We couldn't find the thesaurus you're trying to edit. Try navigating back to this page through Settings.")));






    } else if (!Object.keys(quickLabelMetadata).length) {
      content = /*#__PURE__*/
      _jsx("div", {}, void 0,
      QuickLabelPanelBase.renderNotice(), /*#__PURE__*/
      _jsx("label", { className: "errormsg" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Nothing to see here! The selected documents are not using the selected thesaurus"), "\xA0", /*#__PURE__*/



      _jsx("b", {}, void 0, quickLabelThesaurus.get('name')), ".", ' ', /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Try selecting other documents.")));



    } else {
      content = /*#__PURE__*/
      _jsx("div", {}, void 0,
      QuickLabelPanelBase.renderNotice(),
      Object.keys(quickLabelMetadata).
      sort().
      map((p) => this.renderProp(p)));


    }

    return content;
  }

  render() {
    const { selectedDocuments } = this.props;
    const canBePublished = this.props.selectedDocuments.reduce((previousCan, entity) => {
      const isEntity = !entity.get('file');
      return (
        !!previousCan && (
        !!entity.get('processed') || isEntity) &&
        !entity.get('published') &&
        !!entity.get('template'));

    }, true);

    return /*#__PURE__*/(
      _jsx(_SidePanel.default, { open: selectedDocuments.size > 0, className: "quick-label" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "sidepanel-header" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "check" }), ' ', /*#__PURE__*/
      _jsx("span", {}, void 0,
      selectedDocuments.size, " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "selected")),

      this.renderAutoSaveToggle(), /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "closeSidepanel close-modal",
        onClick: () => this.props.unselectAllDocuments() }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/


      _jsx("div", { className: "sidepanel-body" }, void 0, this.renderSidePanelBody()), /*#__PURE__*/
      _jsx("div", { className: "sidepanel-footer" }, void 0, this.renderButtons(canBePublished))));


  }}exports.QuickLabelPanelBase = QuickLabelPanelBase;_defineProperty(QuickLabelPanelBase, "defaultProps", defaultProps);_defineProperty(QuickLabelPanelBase, "contextTypes", { confirm: _propTypes.default.func });


const selectquickLabelThesaurus = (0, _reselect.createSelector)(
(state) =>
state.thesauris.find(
(thes) => thes.get('_id') === state.library.sidepanel.quickLabelState.get('thesaurus')),

(thes) => thes);exports.selectquickLabelThesaurus = selectquickLabelThesaurus;


const mapStateToProps = (state) => ({
  selectedDocuments: state.library.ui.get('selectedDocuments'),
  quickLabelMetadata: state.library.sidepanel.quickLabelMetadata,
  quickLabelThesaurus: selectquickLabelThesaurus(state),
  opts: state.library.sidepanel.quickLabelState.toJS(),
  templates: (0, _reselect.createSelector)(
  (s) => s.templates,
  (tmpls) => tmpls)(
  state) });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    unselectAllDocuments: _libraryActions.unselectAllDocuments,
    toggleQuickLabelAutoSave: _quickLabelActions.toggleQuickLabelAutoSave,
    selectedDocumentsChanged: _quickLabelActions.selectedDocumentsChanged,
    maybeSaveQuickLabels: _quickLabelActions.maybeSaveQuickLabels,
    multipleUpdate: metadataActions.multipleUpdate },

  (0, _Multireducer.wrapDispatch)(dispatch, 'library'));

}

const QuickLabelPanel = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(QuickLabelPanelBase);exports.QuickLabelPanel = QuickLabelPanel;