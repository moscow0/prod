"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.ShareEntityModalComponent = exports.ShareEntityModal = void 0;

var _Modal = _interopRequireDefault(require("../../Layout/Modal"));
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");

var _permissionSchema = require("../../../shared/types/permissionSchema");
var _actions = require("../actions/actions");
var _reactRedux = require("react-redux");

var _UserGroupsLookupField = require("./UserGroupsLookupField");
var _MembersList = require("./MembersList");
var _PermissionsAPI = require("../PermissionsAPI");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}












const pseudoMembers = [
{
  refId: '',
  type: 'group',
  label: 'Administrators and Editors',
  level: _permissionSchema.AccessLevels.WRITE }];



const findPublicPermission = (permissions) =>
permissions.find((p) => p.type === _permissionSchema.PermissionType.PUBLIC);

const getWarningMessage = (publishingLevel) =>
!publishingLevel ? /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Caution: the selected entities will be "), /*#__PURE__*/
_jsx("b", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "private")), ". ", /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Only allowed users will be able to see them")) : /*#__PURE__*/


_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Caution: the selected entities will be "), /*#__PURE__*/
_jsx("b", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "public")), ". ", /*#__PURE__*/

_jsx(_I18N.Translate, {}, void 0, "Anyone will be able to see them"));



const ShareEntityModalComponent = ({
  isOpen,
  onClose,
  sharedIds,
  saveEntitiesPermissions: savePermissions,
  storeKey }) =>
{var _findPublicPermission;
  const [results, setResults] = (0, _react.useState)([]);
  const [assignments, setAssignments] = (0, _react.useState)([]);
  const [dirty, setDirty] = (0, _react.useState)(false);
  const [originalPublicLevel, setOriginalPublicLevel] = (0, _react.useState)(false);

  const searchAndLoadCollabs = async (
  searchTerm,
  currentAssignments) =>
  {
    const collaborators = await (0, _PermissionsAPI.searchCollaborators)(searchTerm);
    setResults(
    collaborators.filter(
    (r) => !currentAssignments.find((a) => a.refId === r.refId && a.type === r.type)));


  };

  (0, _react.useEffect)(() => {
    (0, _PermissionsAPI.loadGrantedPermissions)(sharedIds).
    then((permissions) => {
      const loadedAssignments = permissions.map((p) => _objectSpread(_objectSpread({}, p), {}, { refId: p.refId }));
      setAssignments(loadedAssignments);

      const publicPermission = findPublicPermission(permissions);
      setOriginalPublicLevel((publicPermission === null || publicPermission === void 0 ? void 0 : publicPermission.level) || false);

      searchAndLoadCollabs('', loadedAssignments).catch(() => {});
    }).
    catch(() => {});

    return () => {
      setAssignments([]);
      setResults([]);
      setDirty(false);
      setOriginalPublicLevel(false);
    };
  }, []);

  const onChangeHandler = async (value) => {
    await searchAndLoadCollabs(value, assignments);
  };

  const onSelectHandler = (value) => {
    setAssignments([...assignments, _objectSpread(_objectSpread({}, value), {}, { level: value.level || _permissionSchema.AccessLevels.READ })]);
    setResults(results.filter((r) => !(value.refId === r.refId && value.type === r.type)));
    setDirty(true);
  };

  const onSaveHandler = async () => {
    await savePermissions(
    {
      ids: sharedIds,
      permissions: assignments.map((a) => ({
        refId: a.refId,
        type: a.type,
        level: a.level })) },


    storeKey);

    return onClose();
  };

  const members = pseudoMembers.concat(assignments);
  const currentPublicLevel = ((_findPublicPermission = findPublicPermission(members)) === null || _findPublicPermission === void 0 ? void 0 : _findPublicPermission.level) || false;

  return /*#__PURE__*/(
    _jsx(_Modal.default, { isOpen: isOpen, type: "content", className: "share-modal", zIndex: 1000 }, void 0, /*#__PURE__*/
    _jsx(_Modal.default.Header, {}, void 0, /*#__PURE__*/
    _jsx("div", { className: "round-icon" }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "user-plus" })), /*#__PURE__*/

    _jsx("h1", {}, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Share with people and groups"))), /*#__PURE__*/



    _jsx(_Modal.default.Body, {}, void 0, /*#__PURE__*/
    _jsx(_UserGroupsLookupField.UserGroupsLookupField, {
      onChange: onChangeHandler,
      onSelect: onSelectHandler,
      options: results }), /*#__PURE__*/

    _jsx("div", { className: "member-list-wrapper" }, void 0, /*#__PURE__*/
    _jsx(_MembersList.MembersList, {
      members: members,
      onChange: (value) => {
        setAssignments(value.filter((m) => m.refId));
        setDirty(true);
      } })),


    originalPublicLevel !== currentPublicLevel ? /*#__PURE__*/
    _jsx("span", { className: "validation-message" }, void 0, getWarningMessage(currentPublicLevel), ".") :
    null),


    dirty ? /*#__PURE__*/
    _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn btn-default cancel-button", onClick: onClose }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "times" }), /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Discard changes")), /*#__PURE__*/

    _jsx("button", { type: "button", className: "btn confirm-button btn-success", onClick: onSaveHandler }, void 0, /*#__PURE__*/
    _jsx(_UI.Icon, { icon: "save" }), /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Save changes"))) : /*#__PURE__*/



    _jsx(_Modal.default.Footer, {}, void 0, /*#__PURE__*/
    _jsx("button", { type: "button", className: "btn btn-default pristine", onClick: onClose }, void 0, /*#__PURE__*/
    _jsx(_I18N.Translate, {}, void 0, "Close")))));





};exports.ShareEntityModalComponent = ShareEntityModalComponent;

const mapDispatchToProps = {
  saveEntitiesPermissions: _actions.saveEntitiesPermissions };


const ShareEntityModal = (0, _reactRedux.connect)(null, mapDispatchToProps)(ShareEntityModalComponent);exports.ShareEntityModal = ShareEntityModal;