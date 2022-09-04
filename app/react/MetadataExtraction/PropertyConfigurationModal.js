"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.PropertyConfigurationModal = void 0;var _react = _interopRequireWildcard(require("react"));
var _Modal = _interopRequireDefault(require("../Layout/Modal"));
var _I18N = require("../I18N");
var _Forms = require("../Forms");


var _Icons = _interopRequireDefault(require("../Templates/components/Icons"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const SUPPORTED_PROPERTIES = ['text', 'number', 'date'];














const PropertyConfigurationModal = ({
  isOpen,
  onClose,
  onAccept,
  templates,
  currentProperties }) =>
{
  const currentValues = currentProperties.reduce((result, config) => {
    const { template, properties } = config;
    const props = properties.map((prop) => `${template}-${prop}`);
    return result.concat(props);
  }, []);

  const [values, setValues] = (0, _react.useState)(currentValues);
  const options = templates.map((template) => {var _template$properties, _template$_id2;return {
      label: template.name,
      id: template._id,
      value: template._id,
      options: (_template$properties = template.properties) === null || _template$properties === void 0 ? void 0 : _template$properties.
      map((prop) => {var _template$_id;return {
          label: prop.label,
          value: `${(_template$_id = template._id) === null || _template$_id === void 0 ? void 0 : _template$_id.toString()}-${prop.name}`,
          type: prop.type,
          icon: { type: 'Icons', _id: _Icons.default[prop.type] } };}).

      filter((p) => SUPPORTED_PROPERTIES.includes(p.type)).
      concat([
      {
        label: 'Title',
        value: `${(_template$_id2 = template._id) === null || _template$_id2 === void 0 ? void 0 : _template$_id2.toString()}-title`,
        type: 'text',
        icon: { type: 'Icons', _id: _Icons.default.text } }]) };});




  const handleSubmit = (submitedValues) => {
    const processedValues = submitedValues.reduce((result, value) => {
      const templateName = value.split('-')[0];
      const propertyName = value.split('-')[1];
      const template = templates.find((t) => t._id === templateName);

      if (!template) {
        return result;
      }

      const templateConfig = result.find((c) => c.template === template._id);
      if (templateConfig) {
        templateConfig.properties.push(propertyName);
        return result;
      }

      return result.concat({ template: template._id.toString(), properties: [propertyName] });
    }, []);

    onAccept(processedValues);
  };

  return /*#__PURE__*/(
    _jsx(_Modal.default, { isOpen: isOpen, type: "content", className: "suggestion-acceptance-modal" }, void 0, /*#__PURE__*/
    _jsx(_Modal.default.Header, {}, void 0, /*#__PURE__*/
    _jsx("h1", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Add properties"), /*#__PURE__*/
    _jsx("span", {}, void 0, "*"))), /*#__PURE__*/


    _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
    _jsx(_Forms.MultiSelect, {
      value: values,
      onChange: setValues,
      options: options,
      optionsToShow: 20,
      showSearch: true })), /*#__PURE__*/


    _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
    _jsx("span", { className: "left" }, void 0, "*", /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Only text, number and date properties are currently supported")), /*#__PURE__*/

    _jsx("button", { type: "button", className: "btn btn-default cancel-button", onClick: onClose }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Cancel")), /*#__PURE__*/

    _jsx("button", {
      type: "button",
      className: "btn confirm-button btn-success",
      onClick: () => handleSubmit(values) }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Save")))));




};exports.PropertyConfigurationModal = PropertyConfigurationModal;