"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _BasicReducer = require("../../BasicReducer");

var _react = require("react");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

class Script extends _react.Component {
  constructor(props) {
    super(props);

    this.scriptElement = null;
  }

  componentDidMount() {
    this.appendScript();
    window.addEventListener('error', this.props.onError);
    window.addEventListener('unhandledrejection', this.props.onError);
  }

  componentDidUpdate(prevProps) {
    const { children } = this.props;
    if (children !== prevProps.children) {
      this.removeScript();
      window.removeEventListener('error', this.props.onError);
      window.removeEventListener('unhandledrejection', this.props.onError);
      this.appendScript();
    } else if (this.scriptElement === null) {
      this.appendScript();
    }
  }

  componentWillUnmount() {
    this.removeScript();
    window.removeEventListener('error', this.props.onError);
    window.removeEventListener('unhandledrejection', this.props.onError);
  }

  appendScript() {
    const { children, scriptRendered } = this.props;
    if (children && scriptRendered === false) {
      const s = document.createElement('script');
      s.src = `data:text/javascript,(function(){${encodeURIComponent(`\n\n${children}\n\n`)}})()`;
      document.body.appendChild(s);
      this.scriptElement = s;
      this.props.dispatch(_BasicReducer.actions.setIn('page/pageView', 'scriptRendered', true));
    }
  }

  removeScript() {
    if (this.scriptElement) {
      this.scriptElement.remove();
      this.scriptElement = null;
    }
  }

  render() {
    return null;
  }}


Script.defaultProps = {
  children: '',
  scriptRendered: null,
  onError: () => {} };









const container = (0, _reactRedux.connect)()(Script);var _default =

container;exports.default = _default;