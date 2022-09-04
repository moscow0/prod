"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Pagination = void 0;var _react = _interopRequireWildcard(require("react"));
var _lodash = _interopRequireDefault(require("lodash"));
var _I18N = require("../../I18N");
var _2 = require("./..");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}








const computeVisiblePages = (activePage, totalPages) => {
  if (totalPages < 6) {
    return _lodash.default.range(1, totalPages + 1);
  }
  if (activePage % 5 >= 0 && activePage > 4 && activePage + 2 < totalPages) {
    return [1, activePage - 1, activePage, activePage + 1, totalPages];
  }
  if (activePage % 5 >= 0 && activePage > 4 && activePage + 2 >= totalPages) {
    return [1, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, 2, 3, 4, 5, totalPages];
};

function pageLabel(array, index, pageNumber) {
  return array[index - 1] + 2 < pageNumber ||
  pageNumber > 1 && array[index - 1] !== pageNumber - 1 ?
  `...${pageNumber}` :
  pageNumber;
}

const Pagination = ({
  totalPages,
  resetActivePage,
  onPageChange,
  onPageSizeChange }) =>
{
  const [activePage, setActivePage] = (0, _react.useState)(1);
  const [visiblePages, setVisiblePages] = (0, _react.useState)(computeVisiblePages(1, totalPages));
  const [pageSize, setPageSize] = (0, _react.useState)(5);

  (0, _react.useEffect)(() => {
    setVisiblePages(computeVisiblePages(activePage, totalPages));
  }, [activePage, totalPages]);

  (0, _react.useEffect)(() => {
    if (resetActivePage) {
      setActivePage(1);
    }
  }, [resetActivePage]);

  const changePage = (page) => {
    if (page !== activePage) {
      setActivePage(page);
      onPageChange(page - 1);
    }
  };

  function PageNumbers() {
    return visiblePages.map((pageNumber, index, array) => /*#__PURE__*/
    _jsx("button", {
      type: "button",

      className: activePage === pageNumber ? 'page-button active' : 'page-button',
      onClick: () => changePage(pageNumber) }, pageNumber,

    pageLabel(array, index, pageNumber)));


  }

  return /*#__PURE__*/(
    _jsx("div", {}, void 0,
    totalPages > 0 && /*#__PURE__*/
    _jsx("div", { className: "table-pagination" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "page-numbers" }, void 0, /*#__PURE__*/
    _jsx("div", { className: "prev-page" }, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "page-button",
      onClick: () => {
        if (activePage !== 1) {
          changePage(activePage - 1);
        }
      },
      disabled: activePage === 1 }, void 0, /*#__PURE__*/

    _jsx(_2.Icon, { icon: "angle-double-left" }), "\xA0", /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Previous"))), /*#__PURE__*/


    _jsx("div", { className: "visible-pages" }, void 0, PageNumbers()), /*#__PURE__*/
    _jsx("div", { className: "next-page" }, void 0, /*#__PURE__*/
    _jsx("button", {
      type: "button",
      className: "page-button",
      onClick: () => {
        if (activePage !== totalPages) {
          changePage(activePage + 1);
        }
      },
      disabled: activePage === totalPages }, void 0, /*#__PURE__*/

    _jsx(_I18N.Translate, {}, void 0, "Next"), "\xA0", /*#__PURE__*/

    _jsx(_2.Icon, { icon: "angle-double-right" })))), /*#__PURE__*/



    _jsx("div", {}, void 0, /*#__PURE__*/
    _jsx("select", {
      value: pageSize,
      onChange: (e) => {
        const newSize = Number(e.target.value);
        setPageSize(newSize);
        onPageSizeChange(newSize);
      } }, void 0,

    [100, 300, 500].map((size) => /*#__PURE__*/
    _jsx("option", { value: size }, size,
    `${size} ${(0, _I18N.t)('System', 'per page', null, false)}`)))))));








};exports.Pagination = Pagination;