"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}












const checkWritePermissions = (
entities = [],
user = undefined) =>
{
  let granted = user !== undefined && user.has('role') && entities.length > 0;
  let i = 0;
  while (granted && i < entities.length) {
    const entity = entities[i];
    i += 1;
    if (entity && entity.permissions) {
      const idsWithWritePermissions = entity.permissions.
      filter((p) => p.level === 'write').
      map((p) => p.refId);

      granted =
      idsWithWritePermissions.find(
      (id) => {var _user$get;return (
          id === user.get('_id') || ((_user$get = user.get('groups')) === null || _user$get === void 0 ? void 0 : _user$get.find((g) => g.get('_id') === id)));}) !==
      undefined;
    } else {
      granted = false;
    }
  }
  return granted;
};

const checkRole = (user, roles = ['admin']) =>
!!(user.get('_id') && roles.includes(user.get('role')));

const NeedAuthorization = ({
  children,
  roles,
  orWriteAccessTo,
  user }) =>
{
  const authorized = (0, _react.useMemo)(
  () => checkRole(user, roles) || checkWritePermissions(orWriteAccessTo, user),
  [user, roles, orWriteAccessTo]);


  return authorized ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children) : null;
};

const mapStateToProps = ({ user }) => ({ user });var _default =

(0, _reactRedux.connect)(mapStateToProps)(NeedAuthorization);exports.default = _default;