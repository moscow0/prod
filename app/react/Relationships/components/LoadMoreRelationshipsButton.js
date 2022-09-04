"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mapStateToProps = exports.default = exports.LoadMoreRelationshipsButton = void 0;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");

var _I18N = require("../../I18N");

var _actions = require("../../ConnectionsList/actions/actions");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const LoadMoreRelationshipsButton = ({
  totalHubs,
  requestedHubs,
  action,
  loadMoreAmmount }) =>
{
  if (requestedHubs < totalHubs) {
    const actionFunction = () => {
      action(requestedHubs + loadMoreAmmount);
    };

    return /*#__PURE__*/(
      _jsx("div", { className: "text-center" }, void 0, /*#__PURE__*/
      _jsx("p", { className: "col-sm-12 text-center documents-counter" }, void 0, /*#__PURE__*/
      _jsx("b", {}, void 0, requestedHubs), " ", (0, _I18N.t)('System', 'of'), " ", /*#__PURE__*/_jsx("b", {}, void 0, totalHubs), " ", (0, _I18N.t)('System', 'hubs')), /*#__PURE__*/

      _jsx("button", { onClick: actionFunction, className: "btn btn-default btn-load-more" }, void 0,
      `${loadMoreAmmount}`, " ", (0, _I18N.t)('System', 'x more'))));



  }

  return null;
};exports.LoadMoreRelationshipsButton = LoadMoreRelationshipsButton;








const mapStateToProps = ({ relationships }) => ({
  totalHubs: relationships.list.searchResults.get('totalHubs'),
  requestedHubs: relationships.list.searchResults.get('requestedHubs'),
  loadMoreAmmount: 10 });exports.mapStateToProps = mapStateToProps;


function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    action: _actions.loadMoreReferences },

  dispatch);

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoadMoreRelationshipsButton);exports.default = _default;