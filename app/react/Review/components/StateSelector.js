"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.StateSelectorBase = exports.StateSelector = void 0;

var _react = require("react");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

/*
StateSelector allows making sub-components state-dependent without
adding that state to the parent's props, thus reducing the re-rendering of
the parent.

Usage:
class Parent extends Component {
  render() {
    return (
      <div>
        <Static Parts ... />
        <StateSelector myVal={createSelector(state => state.path.to.obj, value => value)}>
          {({ myVal }) => (<Dynamic Parts propVal={myVal} ... />)}
        </StateSelector>
        <More Static Parts ... />
      </div>
    );
  }
}
*/
class StateSelectorBase extends _react.Component {
  render() {
    return this.props.children(this.props);
  }}exports.StateSelectorBase = StateSelectorBase;






const StateSelector = (0, _reactRedux.connect)((state, ownProps) =>
Object.keys(ownProps).
filter((k) => !['children'].includes(k)).
reduce((res, k) => _objectSpread(_objectSpread({}, res), {}, { [k]: ownProps[k](state) }), {}))(
StateSelectorBase);exports.StateSelector = StateSelector;