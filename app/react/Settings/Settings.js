"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = exports.Settings = void 0;var _react = _interopRequireDefault(require("react"));
var _reactHelmet = require("react-helmet");
var _RouteHandler = _interopRequireDefault(require("../App/RouteHandler"));
var _BasicReducer = require("../BasicReducer");
var _I18N = require("../I18N");
var _SearchAPI = _interopRequireDefault(require("../Search/SearchAPI"));
var _TemplatesAPI = _interopRequireDefault(require("../Templates/TemplatesAPI"));
var _ThesauriAPI = _interopRequireDefault(require("../Thesauri/ThesauriAPI"));
var _UsersAPI = _interopRequireDefault(require("../Users/UsersAPI"));
var _resolveProperty = require("./utils/resolveProperty");
var _suggestions = require("./utils/suggestions");

var _SettingsNavigation = require("./components/SettingsNavigation");
var _SettingsAPI = _interopRequireDefault(require("./SettingsAPI"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

class Settings extends _RouteHandler.default {
  static async requestState(requestParams) {
    const request = requestParams.onlyHeaders();
    const [user, thesauri, translations, collection, templates] = await Promise.all([
    _UsersAPI.default.currentUser(request),
    _ThesauriAPI.default.getThesauri(request),
    _I18N.I18NApi.get(request),
    _SettingsAPI.default.get(request),
    _TemplatesAPI.default.get(requestParams.onlyHeaders())]);


    // This builds and queries elasticsearch for suggestion counts per thesaurus
    const props = thesauri.
    filter((thesaurus) => thesaurus.enable_classification).
    map((thesaurus) => (0, _resolveProperty.resolveTemplateProp)(thesaurus, templates));
    const allDocsWithSuggestions = await Promise.all(
    [].concat(
    ...props.map((p) =>
    templates.map((template) => {
      const reqParams = requestParams.set((0, _suggestions.getReadyToReviewSuggestionsQuery)(template._id, p));
      return _SearchAPI.default.search(reqParams);
    }))));




    // This processes the search results per thesaurus and stores the aggregate  number of documents to review
    const propToAgg = props.map((p) =>
    templates.map((template) => [p, [template, allDocsWithSuggestions.shift()]]));

    propToAgg.forEach((tup) => {
      tup.forEach((perm) => {
        const prop = perm[0];
        const results = perm[1][1];
        const uniqueDocs = results.totalRows;

        const thesaurus = thesauri.find((th) => th._id === prop.content);
        if (!thesaurus.hasOwnProperty('suggestions')) {
          thesaurus.suggestions = 0;
        }
        thesaurus.suggestions += uniqueDocs;
      });
    });

    return [
    _BasicReducer.actions.set('auth/user', user),
    _BasicReducer.actions.set('dictionaries', thesauri),
    _BasicReducer.actions.set('translations', translations),
    _BasicReducer.actions.set('settings/collection', collection)];

  }

  render() {
    return /*#__PURE__*/(
      _jsx("div", { className: "row settings" }, void 0, /*#__PURE__*/
      _jsx(_reactHelmet.Helmet, {}, void 0, /*#__PURE__*/
      _jsx("title", {}, void 0, (0, _I18N.t)('System', 'Settings', null, false))), /*#__PURE__*/

      _jsx("div", { className: "settings-navigation" }, void 0, /*#__PURE__*/
      _jsx(_SettingsNavigation.SettingsNavigation, {})),

      this.props.children));


  }}exports.Settings = Settings;var _default =


Settings;exports.default = _default;