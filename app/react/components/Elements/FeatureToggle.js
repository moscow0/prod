"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.FeatureToggle = void 0;var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}










const FeatureToggle = ({
  featureActivated,
  children }) =>
featureActivated ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children) : null;

FeatureToggle.defaultProps = {
  featureActivated: false };


function mapStateToProps({ settings }, ownProps) {
  const features = settings.collection.get('features');

  return {
    featureActivated: features ? Boolean(features.getIn(ownProps.feature.split('.'))) : false };

}

const container = (0, _reactRedux.connect)(mapStateToProps)(FeatureToggle);exports.FeatureToggle = container;