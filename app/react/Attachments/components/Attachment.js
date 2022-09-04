"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Attachment = void 0;exports.mapStateToProps = mapStateToProps;var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _filesize = _interopRequireDefault(require("filesize"));

var _Auth = require("../../Auth");
var _ShowIf = _interopRequireDefault(require("../../App/ShowIf"));
var _I18N = require("../../I18N");
var _AttachmentForm = _interopRequireDefault(require("./AttachmentForm"));
var _Multireducer = require("../../Multireducer");
var _UI = require("../../UI");
var _notificationsActions = require("../../Notifications/actions/notificationsActions");
var _store = require("../../store");
var _getFileExtension = require("../../utils/getFileExtension");

var _actions = require("../actions/actions");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}







const getItemOptions = (filename, url) => {
  const options = {};
  options.itemClassName = '';
  options.typeClassName = 'empty';
  options.icon = 'paperclip';
  options.deletable = true;
  options.replaceable = false;
  options.downloadHref = `/api/files/${filename}`;
  options.url = url;

  return options;
};

class Attachment extends _react.Component {
  static conformThumbnail(file, item) {
    const acceptedThumbnailExtensions = ['png', 'gif', 'jpg', 'jpeg'];
    let thumbnail = null;

    if (file.filename && (0, _getFileExtension.getFileExtension)(file.filename) === 'pdf') {
      thumbnail = /*#__PURE__*/
      _jsx("span", { "no-translate": true }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "file-pdf" }), " pdf");


    }

    if (file.url) {
      thumbnail = /*#__PURE__*/
      _jsx("span", {}, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "link" }));


    }

    if (
    file.filename &&
    acceptedThumbnailExtensions.indexOf((0, _getFileExtension.getFileExtension)(file.filename.toLowerCase())) !== -1)
    {
      thumbnail = /*#__PURE__*/_jsx("img", { src: item.downloadHref, alt: file.filename });
    }

    return /*#__PURE__*/_jsx("div", { className: "attachment-thumbnail" }, void 0, thumbnail);
  }

  constructor(props) {
    super(props);
    this.state = { dropdownMenuOpen: false };

    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.attachmentActionsRef = /*#__PURE__*/_react.default.createRef();
    this.onRenameSubmit = this.onRenameSubmit.bind(this);
    this.toggleRename = this.toggleRename.bind(this);
  }

  componentDidMount() {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this.handleClickOutside);
    }
  }

  componentWillUnmount() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside);
    }
  }

  onRenameSubmit(newFile) {
    const { parentSharedId, model, storeKey } = this.props;
    this.props.renameAttachment(parentSharedId, model, storeKey, newFile);
  }

  toggleDropdown() {
    this.setState((prevState) => ({
      dropdownMenuOpen: !prevState.dropdownMenuOpen }));

  }

  deleteAttachment(attachment) {
    this.context.confirm({
      accept: () => {
        this.props.deleteAttachment(this.props.parentSharedId, attachment, this.props.storeKey);
      },
      title: 'Confirm delete',
      message: this.props.deleteMessage });

  }

  toggleRename() {
    const { file, model } = this.props;
    this.props.loadForm.bind(this, model, file)();
    this.toggleDropdown();
  }

  copyToClipboard(item) {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = item.url || window.location.origin + item.downloadHref;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    _store.store.dispatch((0, _notificationsActions.notify)('Copied to clipboard', 'success'));
    this.toggleDropdown();
  }

  handleClickOutside(e) {
    if (
    this.attachmentActionsRef.current &&
    !this.attachmentActionsRef.current.contains(e.target))
    {
      this.setState({ dropdownMenuOpen: false });
    }
  }

  render() {
    const { file, model, storeKey, entity } = this.props;
    const sizeString = file.size ? (0, _filesize.default)(file.size) : '';
    const item = getItemOptions(file.filename, file.url);
    let name = /*#__PURE__*/
    _jsx("a", { className: "attachment-link", href: item.url || item.downloadHref }, void 0,
    Attachment.conformThumbnail(file, item), /*#__PURE__*/
    _jsx("span", { className: "attachment-name" }, void 0, /*#__PURE__*/
    _jsx("span", {}, void 0, file.originalname), /*#__PURE__*/
    _jsx(_ShowIf.default, { if: Boolean(sizeString) }, void 0, /*#__PURE__*/
    _jsx("span", { className: "attachment-size" }, void 0, sizeString))));





    let buttons = null;

    if (this.props.beingEdited && !this.props.readOnly) {
      name = /*#__PURE__*/
      _jsx("div", { className: "attachment-link" }, void 0,
      Attachment.conformThumbnail(file, item), /*#__PURE__*/
      _jsx("span", { className: "attachment-name" }, void 0, /*#__PURE__*/
      _jsx(_AttachmentForm.default, { model: this.props.model, onSubmit: this.onRenameSubmit })));




      buttons = /*#__PURE__*/
      _jsx("div", { className: "attachment-buttons" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "item-shortcut-group" }, void 0, /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "item-shortcut btn btn-primary",
        onClick: this.props.resetForm.bind(this, model) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "times" }))), /*#__PURE__*/


      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        className: "item-shortcut btn btn-success",
        onClick: this.props.submitForm.bind(this, model, storeKey) }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "save" })))));





    }

    return /*#__PURE__*/(
      _jsx("div", { className: "attachment" }, void 0,
      name, /*#__PURE__*/
      _jsx(_Auth.NeedAuthorization, { roles: ['admin', 'editor'], orWriteAccessTo: [entity] }, void 0,
      buttons, /*#__PURE__*/

      _jsx("div", { className: "dropdown attachments-dropdown" }, void 0, /*#__PURE__*/
      _jsx("button", {
        className: "btn btn-default dropdown-toggle attachments-dropdown-toggle",
        type: "button",
        id: "attachment-dropdown-actions",
        "data-toggle": "dropdown",
        "aria-haspopup": "true",
        onClick: this.toggleDropdown }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "pencil-alt" })), /*#__PURE__*/

      _react.default.createElement("ul", {
        className: "dropdown-menu dropdown-menu-right",
        "aria-labelledby": "attachment-dropdown-actions",
        style: { display: this.state.dropdownMenuOpen ? 'block' : 'none' },
        ref: this.attachmentActionsRef }, /*#__PURE__*/

      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", onClick: () => this.copyToClipboard(item) }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "link" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Copy link"))), /*#__PURE__*/


      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("a", { href: item.url || item.downloadHref, target: "_blank", rel: "noopener noreferrer" }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "link" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Download"))), /*#__PURE__*/


      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("button", { type: "button", onClick: this.toggleRename }, void 0, /*#__PURE__*/
      _jsx(_UI.Icon, { icon: "pencil-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Rename"))), /*#__PURE__*/


      _jsx("li", {}, void 0, /*#__PURE__*/
      _jsx("button", {
        type: "button",
        onClick: this.deleteAttachment.bind(this, file),
        className: "is--delete" }, void 0, /*#__PURE__*/

      _jsx(_UI.Icon, { icon: "trash-alt" }), " ", /*#__PURE__*/_jsx(_I18N.Translate, {}, void 0, "Delete"))))))));







  }}exports.Attachment = Attachment;


Attachment.defaultProps = {
  deleteMessage: 'Are you sure you want to delete this attachment?',
  entity: null };


















Attachment.contextTypes = {
  confirm: _propTypes.default.func };


function mapStateToProps({ attachments }, ownProps) {
  return {
    model: 'attachments.edit.attachment',
    beingEdited: ownProps.file._id && attachments.edit.attachment._id === ownProps.file._id };

}

function mapDispatchToProps(dispatch, props) {
  return (0, _redux.bindActionCreators)(
  { deleteAttachment: _actions.deleteAttachment, renameAttachment: _actions.renameAttachment, loadForm: _actions.loadForm, submitForm: _actions.submitForm, resetForm: _actions.resetForm },
  (0, _Multireducer.wrapDispatch)(dispatch, props.storeKey));

}var _default =

(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Attachment);exports.default = _default;