"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.OCRStatus = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");

var _I18N = require("../../I18N");
var _socket = require("../../socket");
var _redux = require("redux");
var _ocrActions = require("../actions/ocrActions");
var _ocrStatusTips = require("../utils/ocrStatusTips");
var _documentActions = require("../actions/documentActions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}





const formatDate = (time, locale) => {
  const date = new Date(time);
  return date.toLocaleString(locale);
};

const mapStateToProps = ({ settings, locale }) => {
  const toggleOCRButton = settings.collection.get('ocrServiceEnabled');
  return {
    ocrIsToggled: toggleOCRButton || false,
    locale };

};

const mapDispatchToProps = (dispatch) =>
(0, _redux.bindActionCreators)({ loadDocument: _documentActions.reloadDocument }, dispatch);

const connector = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps);



// eslint-disable-next-line max-statements
const OCRStatus = ({ file, ocrIsToggled, locale, loadDocument }) => {
  if (!ocrIsToggled) return null;

  const [ocrStatus, setOcrStatus] = (0, _react.useState)({ status: 'loading', lastUpdated: Date.now() });

  const listenOnSuccess = (_id) => {
    if (file._id === _id) {
      setOcrStatus({ status: 'ocrComplete', lastUpdated: Date.now() });
      loadDocument(file.entity);
    }
  };

  const listenOnError = (_id) => {
    if (file._id === _id) setOcrStatus({ status: 'ocrError', lastUpdated: Date.now() });
  };

  (0, _react.useEffect)(() => {
    (0, _ocrActions.getOcrStatus)(file.filename || '').
    then(({ status, lastUpdated }) => {
      setOcrStatus({ status, lastUpdated });
      if (status === 'inQueue') {
        _socket.socket.on('ocr:ready', listenOnSuccess);
        _socket.socket.on('ocr:error', listenOnError);
      }
    }).
    catch(() => {
      setOcrStatus({ status: 'ocrError', lastUpdated: Date.now() });
    });

    return () => {
      _socket.socket.off('ocr:ready', listenOnSuccess);
      _socket.socket.off('ocr:error', listenOnError);
    };
  }, [file]);

  const handleClick = () => {
    setOcrStatus({ status: 'inQueue', lastUpdated: Date.now() });
    (0, _ocrActions.postToOcr)(file.filename || '').
    then(() => {
      _socket.socket.on('ocr:ready', listenOnSuccess);
      _socket.socket.on('ocr:error', listenOnError);
    }).
    catch(() => {});
  };

  const lastUpdated = formatDate(ocrStatus.lastUpdated, locale);

  let statusDisplay = /*#__PURE__*/_jsx("div", {});
  let tip;

  switch (ocrStatus.status) {
    case 'loading':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "status" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Loading"), "\xA0..."));



      break;

    case 'noOCR':
      statusDisplay = /*#__PURE__*/
      _jsx("button", { type: "button", className: "btn btn-default", onClick: () => handleClick() }, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "OCR PDF"));


      tip = _ocrStatusTips.ocrStatusTips.noOcr();
      break;

    case 'inQueue':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "status" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "In OCR queue")));



      tip = _ocrStatusTips.ocrStatusTips.lastUpdated(lastUpdated);
      break;

    case 'unsupported_language':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "status" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Unsupported OCR language")));



      tip = _ocrStatusTips.ocrStatusTips.unsupportedLang(file.language || 'other');
      break;

    case 'cannotProcess':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "status" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "OCR error")));



      tip = _ocrStatusTips.ocrStatusTips.cantProcess(lastUpdated);
      break;

    case 'ocrError':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "ocr-error" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "Could not be processed")));



      tip = _ocrStatusTips.ocrStatusTips.cantProcess(lastUpdated);
      break;

    case 'withOCR':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "status" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "OCR"), "\xA0\u2714"));



      tip = _ocrStatusTips.ocrStatusTips.lastUpdated(lastUpdated);
      break;

    case 'ocrComplete':
      statusDisplay = /*#__PURE__*/
      _jsx("div", { className: "complete" }, void 0, /*#__PURE__*/
      _jsx("p", {}, void 0, /*#__PURE__*/
      _jsx(_I18N.Translate, {}, void 0, "OCR completed"), "\xA0\u2714"));



      break;

    default:
      break;}


  return /*#__PURE__*/(
    _jsx("div", { className: "ocr-service-display" }, void 0,
    statusDisplay,
    tip && /*#__PURE__*/_jsx("div", { className: "ocr-tooltip" }, void 0, tip)));


};

const container = connector(OCRStatus);exports.OCRStatus = container;