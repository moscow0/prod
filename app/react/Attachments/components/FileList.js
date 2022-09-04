"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.FileList = void 0;


var _react = _interopRequireWildcard(require("react"));

var _advancedSort = require("../../utils/advancedSort");
var _I18N = require("../../I18N");


var _UploadButton = _interopRequireDefault(require("../../Metadata/components/UploadButton"));
var _Auth = require("../../Auth");
var _languages = _interopRequireDefault(require("../../../shared/languages"));
var _File = require("./File");
require("./scss/filelist.scss");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

const defaultProps = {
  files: [],
  entity: null,
  storeKey: '' };








class FileList extends _react.Component {
  static arrangeFiles(files = []) {
    return (0, _advancedSort.advancedSort)(files, { property: 'originalname' });
  }



  renderFile(file, index) {
    const { storeKey, entity } = this.props;
    return /*#__PURE__*/(
      _jsx("li", {}, index, /*#__PURE__*/
      _jsx(_File.ConnectedFile, { file: file, storeKey: storeKey, entity: entity })));


  }

  orderFilesByLanguage(files, systemLanguage) {
    const orderedFiles = [...files];
    const fileIndex = orderedFiles.findIndex((file) => {
      const language = _languages.default.get(file.language, 'ISO639_1');
      return language === systemLanguage;
    });
    if (fileIndex > -1) {
      const temp = orderedFiles[fileIndex];
      orderedFiles[fileIndex] = orderedFiles[0];
      orderedFiles[0] = temp;
    }
    return orderedFiles;
  }

  render() {
    const label = /*#__PURE__*/
    _jsx("h2", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Primary Documents"));



    const { files, entity } = this.props;
    const orderedFiles = this.orderFilesByLanguage(files, entity.language);
    return /*#__PURE__*/(
      _jsx("div", { className: "filelist" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "filelist-header" }, void 0,
      orderedFiles.length === 0 ? /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0,
      label) : /*#__PURE__*/


      _react.default.createElement(_react.default.Fragment, null, label), /*#__PURE__*/

      _jsx("div", {}, void 0, /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0, /*#__PURE__*/
      _jsx(_UploadButton.default, {
        entitySharedId: this.props.entity.sharedId,
        storeKey: this.props.storeKey })))), /*#__PURE__*/




      _jsx("ul", {}, void 0, orderedFiles.map((file, index) => this.renderFile(file, index)))));


  }}exports.FileList = FileList;_defineProperty(FileList, "defaultProps", defaultProps);var _default =


FileList;exports.default = _default;