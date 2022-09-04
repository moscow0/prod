"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.RightRelationship = void 0;exports.mapStateToProps = mapStateToProps;var _redux = require("redux");
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _UI = require("../../UI");
var _I18N = require("../../I18N");
var _Doc = _interopRequireDefault(require("../../Library/components/Doc"));
var _DropdownList = _interopRequireDefault(require("../../Forms/components/DropdownList"));
var actions = _interopRequireWildcard(require("../actions/actions"));
var uiActions = _interopRequireWildcard(require("../actions/uiActions"));
var _HubRelationshipMetadata = _interopRequireDefault(require("./HubRelationshipMetadata"));function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class RightRelationship extends _react.Component {
  constructor(props) {
    super(props);
    this.updateRightRelationshipType = this.updateRightRelationshipType.bind(this);
    this.toggleRemoveRightRelationshipGroup = this.toggleRemoveRightRelationshipGroup.bind(this);
    this.toggleRemoveEntity = this.toggleRemoveEntity.bind(this);
    this.setAddToData = this.setAddToData.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  onClick(_e, entity) {
    this.props.selectConnection(entity);
  }

  setAddToData(hubIndex, rightRelationshipIndex) {
    return () => {
      this.props.setAddToData(hubIndex, rightRelationshipIndex);
      this.props.openAddEntitiesPanel();
    };
  }

  updateRightRelationshipType(index, rightRelationshipIndex) {
    return (value) => {
      this.props.updateRightRelationshipType(index, rightRelationshipIndex, value._id);
    };
  }

  toggleRemoveRightRelationshipGroup(index, rightRelationshipIndex) {
    return () => {
      this.props.toggleRemoveRightRelationshipGroup(index, rightRelationshipIndex);
    };
  }

  toggleRemoveEntity(index, rightRelationshipIndex, relationshipIndex) {
    return () => {
      this.props.toggleRemoveEntity(index, rightRelationshipIndex, relationshipIndex);
    };
  }

  render() {
    const { hub, index, search, hubActions, relationTypes } = this.props;
    const editing = hubActions.get('editing');
    return /*#__PURE__*/(
      _jsx("div", { className: "rightRelationships" }, void 0,
      hub.get('rightRelationships').map((rightRelationshipGroup, rightRelationshipIndex) => /*#__PURE__*/
      _jsx("div", {
        className: `rightRelationshipsTypeGroup ${
        rightRelationshipGroup.get('deleted') ? 'deleted' : ''
        }` },
      rightRelationshipIndex, /*#__PURE__*/

      _jsx("div", {
        className: `rightRelationshipType
                             ${
        rightRelationshipIndex === hub.get('rightRelationships').size - 1 ?
        'last-of-type' :
        ''
        }` }, void 0,

      !editing && /*#__PURE__*/
      _jsx("div", { className: "rw-dropdown-list rw-widget no-edit" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "rw-widget-input rw-widget-picker rw-widget-container no-edit" }, void 0, /*#__PURE__*/
      _jsx("div", { className: "rw-input rw-dropdown-list-input no-edit" }, void 0,
      (() => {
        if (
        relationTypes.find((r) => r._id === rightRelationshipGroup.get('template')))
        {
          return rightRelationshipGroup.get('template') ?
          relationTypes.find(
          (r) => r._id === rightRelationshipGroup.get('template')).
          name : /*#__PURE__*/

          _jsx(_UI.Icon, { icon: "link" });

        }
        return null;
      })()))),




      editing && /*#__PURE__*/
      _jsx(_DropdownList.default, {
        valueField: "_id",
        textField: "name",
        data: relationTypes,
        value: rightRelationshipGroup.get('template'),
        placeholder: "New connection type",
        filter: "contains",
        onChange: this.updateRightRelationshipType(index, rightRelationshipIndex) })),



      editing && /*#__PURE__*/
      _jsx("div", { className: "removeRightRelationshipGroup" }, void 0,
      (() => {
        if (rightRelationshipGroup.has('template')) {
          return /*#__PURE__*/(
            _jsx("button", {
              type: "button",
              onClick: this.toggleRemoveRightRelationshipGroup(
              index,
              rightRelationshipIndex),

              className: "relationships-icon" }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, {
              icon: !rightRelationshipGroup.get('deleted') ? 'trash-alt' : 'undo' })));



        }

        return /*#__PURE__*/_jsx("span", {}, void 0, "\xA0");
      })()),


      rightRelationshipGroup.get('relationships').map((relationship, relationshipIndex) => {
        if (relationship.get('moved')) {
          return false;
        }
        const rightRelationshipDeleted = rightRelationshipGroup.get('deleted');
        const deleted = relationship.get('deleted');
        const move = relationship.get('move');
        return /*#__PURE__*/(
          _jsx("div", {
            className: `rightRelationship ${
            !rightRelationshipDeleted && deleted ? 'deleted' : ''
            } ${move ? 'move' : ''}` },
          relationshipIndex, /*#__PURE__*/

          _jsx("div", { className: "rightRelationshipType" }, void 0, /*#__PURE__*/
          _jsx(_Doc.default, {
            className: "item-collapsed",
            doc: relationship.get('entityData'),
            searchParams: search,
            onClick: this.onClick,
            targetReference: relationship.get('reference') ? relationship : null }), /*#__PURE__*/

          _jsx(_HubRelationshipMetadata.default, { relationship: relationship })),

          editing && /*#__PURE__*/
          _jsx("div", { className: "removeEntity" }, void 0, /*#__PURE__*/
          _jsx("button", {
            type: "button",
            onClick: this.toggleRemoveEntity(
            index,
            rightRelationshipIndex,
            relationshipIndex),

            className: "relationships-icon" }, void 0, /*#__PURE__*/

          _jsx(_UI.Icon, { icon: !deleted ? 'trash-alt' : 'undo' }))),



          editing && /*#__PURE__*/
          _jsx("div", { className: "moveEntity" }, void 0, /*#__PURE__*/
          _jsx("button", {
            type: "button",
            onClick: this.props.toggleMoveEntity.bind(
            this,
            index,
            rightRelationshipIndex,
            relationshipIndex),

            className: `relationships-icon ${!move ? '' : 'moving'}` }, void 0, /*#__PURE__*/

          _jsx(_UI.Icon, { icon: "check" })))));





      }),
      (() => {
        if (editing && rightRelationshipGroup.has('template')) {
          const isActive =
          hubActions.getIn(['addTo', 'hubIndex']) === index &&
          hubActions.getIn(['addTo', 'rightRelationshipIndex']) === rightRelationshipIndex;
          return /*#__PURE__*/(
            _jsx("div", { className: "rightRelationshipAdd" }, void 0, /*#__PURE__*/
            _jsx("button", {
              type: "button",
              className: `relationships-new ${isActive ? 'is-active' : ''}`,
              onClick: this.setAddToData(index, rightRelationshipIndex) }, void 0, /*#__PURE__*/

            _jsx("span", {}, void 0, /*#__PURE__*/
            _jsx(_I18N.Translate, {}, void 0, "Add entities / documents")), /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "plus" })), /*#__PURE__*/

            _jsx("div", { className: "insertEntities" }, void 0, /*#__PURE__*/
            _jsx("button", {
              type: "button",
              onClick: this.props.moveEntities.bind(this, index, rightRelationshipIndex),
              className: "relationships-icon" }, void 0, /*#__PURE__*/

            _jsx(_UI.Icon, { icon: "arrow-left" })))));




        }

        return null;
      })()))));




  }}exports.RightRelationship = RightRelationship;


















function mapStateToProps(state) {
  const { relationships } = state;
  return {
    search: relationships.list.sort,
    hubs: relationships.hubs,
    hubActions: relationships.hubActions,
    relationTypes: actions.selectRelationTypes(state) };

}

function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(
  {
    selectConnection: actions.selectConnection,
    updateRightRelationshipType: actions.updateRightRelationshipType,
    toggleRemoveRightRelationshipGroup: actions.toggleRemoveRightRelationshipGroup,
    setAddToData: actions.setAddToData,
    toggleRemoveEntity: actions.toggleRemoveEntity,
    moveEntities: actions.moveEntities,
    toggleMoveEntity: actions.toggleMoveEntity,
    openAddEntitiesPanel: uiActions.openPanel },

  dispatch);

}var _default =


(0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(RightRelationship);exports.default = _default;