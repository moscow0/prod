"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapDispatchToProps = exports.MetadataExtractionDashboard = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _UI = require("../UI");

var _I18N = require("../I18N");
var _notificationsActions = require("../Notifications/actions/notificationsActions");
var _store = require("../store");
var _Icons = _interopRequireDefault(require("../Templates/components/Icons"));




var _actions = require("./actions/actions");
var _PropertyConfigurationModal = require("./PropertyConfigurationModal");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

function mapStateToProps({ settings, templates }) {
  return {
    settings: settings.collection,
    templates };

}

class MetadataExtractionComponent extends _react.default.Component


{
  constructor(props) {
    super(props);
    this.saveConfigs = this.saveConfigs.bind(this);
    this.state = {
      configurationModalIsOpen: false };

  }

  arrangeTemplatesAndProperties() {var _this$props$settings$, _this$props$settings$2;
    const formatted = {};

    const extractionSettings =
    ((_this$props$settings$ = this.props.settings.get('features')) === null || _this$props$settings$ === void 0 ? void 0 : (_this$props$settings$2 = _this$props$settings$.get('metadataExtraction')) === null || _this$props$settings$2 === void 0 ? void 0 : _this$props$settings$2.get('templates')) || [];

    extractionSettings.forEach((setting) => {
      const template = setting.has('template') ?
      this.props.templates.find((temp) => (temp === null || temp === void 0 ? void 0 : temp.get('_id')) === setting.get('template')) :
      this.props.templates.find((temp) => (temp === null || temp === void 0 ? void 0 : temp.get('name')) === setting.get('name'));

      if (!template) {
        _store.store === null || _store.store === void 0 ? void 0 : _store.store.dispatch(
        (0, _notificationsActions.notify)(`Template "${setting.get('_id') || setting.get('name')}" not found.`, 'warning'));

        return;
      }

      const rawProperties = setting.get('properties');
      const properties =
      typeof rawProperties === 'string' ? [rawProperties] : rawProperties;
      properties === null || properties === void 0 ? void 0 : properties.forEach((propertyName) => {var _template$get;
        let property = (_template$get = template.get('properties')) === null || _template$get === void 0 ? void 0 : _template$get.find((p) => (p === null || p === void 0 ? void 0 : p.get('name')) === propertyName);
        let label;
        if (!property) {var _template$get2;
          property = (_template$get2 = template.get('commonProperties')) === null || _template$get2 === void 0 ? void 0 : _template$get2.find((p) => (p === null || p === void 0 ? void 0 : p.get('name')) === propertyName);
          label = propertyName;
        } else {
          label = property.get('label');
        }
        if (!property) {
          _store.store === null || _store.store === void 0 ? void 0 : _store.store.dispatch(
          (0, _notificationsActions.notify)(
          `Property "${label}" not found on template "${template.get('name')}".`,
          'warning'));


          return;
        }
        if (!formatted.hasOwnProperty(propertyName)) {
          formatted[propertyName] = {
            properties: [property.toJS()],
            templates: [template.toJS()] };

        } else {
          formatted[propertyName].properties.push(property.toJS());
          formatted[propertyName].templates.push(template.toJS());
        }
      });
    });

    return formatted;
  }

  async saveConfigs(newSettingsConfigs) {
    this.setState({ configurationModalIsOpen: false });
    await this.props.saveConfigurations(newSettingsConfigs);
  }

  render() {
    const formattedData = this.arrangeTemplatesAndProperties();
    const extractionSettings =
    this.props.settings.toJS().features.metadataExtraction.templates || [];

    return /*#__PURE__*/(
      _jsx("div", { className: "settings-content without-footer" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel panel-default" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "panel-heading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Metadata extraction dashboard")), /*#__PURE__*/

      _jsx("div", { className: "panel-subheading" }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Extract information from your documents")), /*#__PURE__*/

      _jsx("button", {
        className: "btn btn-default",
        type: "button",
        onClick: () => {
          this.setState({ configurationModalIsOpen: true });
        } }, void 0, /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Configure properties")), /*#__PURE__*/

      _jsx(_PropertyConfigurationModal.PropertyConfigurationModal, {
        isOpen: this.state.configurationModalIsOpen,
        onClose: () => this.setState({ configurationModalIsOpen: false }),
        onAccept: this.saveConfigs,
        templates: this.props.templates.toJS(),
        currentProperties: extractionSettings }), /*#__PURE__*/

      _jsx("div", { className: "metadata-extraction-table" }, void 0, /*#__PURE__*/
      _jsx("table", { className: "table" }, void 0, /*#__PURE__*/
      _jsx("thead", {}, void 0, /*#__PURE__*/
      _jsx("tr", {}, void 0, /*#__PURE__*/
      _jsx("th", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Metadata to extract")), /*#__PURE__*/

      _jsx("th", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Template")))), /*#__PURE__*/



      _jsx("tbody", {}, void 0,
      Object.entries(formattedData).map(([propIndex, data]) => /*#__PURE__*/
      _jsx("tr", {}, propIndex, /*#__PURE__*/
      _jsx("td", {}, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: _Icons.default[data.properties[0].type], fixedWidth: true }),
      data.properties[0].label), /*#__PURE__*/

      _jsx("td", { className: "templateNameViewer" }, void 0,
      data.templates.map((template, index) => /*#__PURE__*/
      _jsx("div", {}, template.name,
      template.name,
      index !== data.templates.length - 1 ? ',' : ''))), /*#__PURE__*/



      _jsx("td", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.I18NLink, {
        to: `settings/metadata_extraction/suggestions/${data.properties[0].name}`,
        className: "btn btn-success btn-xs" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "bars" }), "\xA0", /*#__PURE__*/

      _jsx(_I18N.Translate, {}, void 0, "Review")))))))))));










  }}



















const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ saveConfigurations: _actions.saveConfigurations }, dispatch);exports.mapDispatchToProps = mapDispatchToProps;

const MetadataExtractionDashboard = (0, _reactRedux.connect)(
mapStateToProps,
mapDispatchToProps)(
MetadataExtractionComponent);exports.MetadataExtractionDashboard = MetadataExtractionDashboard;