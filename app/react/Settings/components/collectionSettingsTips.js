"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.publicSharing = exports.publicForm = exports.openPublicForm = exports.ocrTrigger = exports.mapAxis = exports.mapApiKey = exports.landingPageTip = exports.emails = exports.customFavIcon = exports.cookiePolicy = exports.characterSupport = exports.analytics = void 0;var _react = _interopRequireDefault(require("react"));
var _I18N = require("../../I18N");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var REACT_ELEMENT_TYPE;function _jsx(type, props, key, children) {REACT_ELEMENT_TYPE || (REACT_ELEMENT_TYPE = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103);var defaultProps = type && type.defaultProps,childrenLength = arguments.length - 3;if (props || 0 === childrenLength || (props = { children: void 0 }), 1 === childrenLength) props.children = children;else if (childrenLength > 1) {for (var childArray = new Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];props.children = childArray;}if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]);else props || (props = defaultProps || {});return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: void 0 === key ? null : "" + key, ref: null, props: props, _owner: null };}

const landingPageTip = /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Configure the default landing page for your site."), /*#__PURE__*/
_jsx("hr", {}), /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Examples"), ":", /*#__PURE__*/
_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "- Site page:"), /*#__PURE__*/
_jsx("i", { "no-translate": true }, void 0, "/page/dicxg0oagy3xgr7ixef80k9"), /*#__PURE__*/
_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "- Library search:"), /*#__PURE__*/
_jsx("i", { "no-translate": true }, void 0, "/library/?searchTerm=testAn "), /*#__PURE__*/
_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "- Entity:"), /*#__PURE__*/
_jsx("i", { "no-translate": true }, void 0, "/entity/9htbkgpkyy7j5rk9A"), /*#__PURE__*/
_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Always use URLs relative to your site, starting with / and skipping the domain name. Example:"), /*#__PURE__*/


_jsx("i", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "https://yoursite.com/")));exports.landingPageTip = landingPageTip;




const customFavIcon = /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Favicon is an icon that appears in the browser tab and bookmarks."), /*#__PURE__*/
_jsx("br", {}), /*#__PURE__*/
_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "You will need to reload the page after updating your Favicon."));exports.customFavIcon = customFavIcon;



const publicSharing = /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Check to make this instance private (only logged-in users can access the data)");exports.publicSharing = publicSharing;




const cookiePolicy = /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "This option will show a notification about the use of cookies in your instance.");exports.cookiePolicy = cookiePolicy;




const emails = [/*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Here you can set up the contact email and the email that appears when Uwazi sends a notification to a user"), /*#__PURE__*/



_jsx(_I18N.Translate, {}, void 0, "If you have added a contact form on one of your pages, this is the email address that receives the information from that form."), /*#__PURE__*/



_jsx(_I18N.Translate, {}, void 0, "You can configure the email that will appear as the sender when any email is sent to the user. If this email is not set, \u201Cno-reply@uwazi.io\u201D will be used instead.")];exports.emails = emails;





const characterSupport = /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Character support description" }, void 0, "Toggling this button enhances support for non-latin languages as default languages. This will update all template properties automatically."), /*#__PURE__*/



_jsx("br", {}), /*#__PURE__*/
_jsx("b", {}, void 0, /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Character support process warning" }, void 0, "This process could take several minutes and will likely change URLs to library filters. If you have menus or links using such URLs, they will probably stop working after the update. You will need to update them manually.")), /*#__PURE__*/





_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Character support revert warning" }, void 0, "After selecting this option, you will not be able to revert back to using legacy property naming. If you are not facing issues with your template property names, we recommend leaving this unchecked."));exports.characterSupport = characterSupport;







const analytics = /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Analytics description" }, void 0, "If you want to track analytics related to your collection visits, Uwazi supports both Google Analytics and Matomo.");exports.analytics = analytics;





const mapAxis = /*#__PURE__*/
_jsx(_I18N.Translate, {}, void 0, "Set the default starting point for your geolocation properties.");exports.mapAxis = mapAxis;


const publicForm = [/*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Public form settings description" }, void 0, "Here you can configure the public form destination and the whitelisted templates"), /*#__PURE__*/


_jsx(_I18N.Translate, { translationKey: "Public form URL description" }, void 0, "You can configure the URL of a different Uwazi to receive the submits from your Public Form"), /*#__PURE__*/


_jsx(_I18N.Translate, { translationKey: "Public form whitelist description" }, void 0, "If you wish to include a public form on your page, you must white-list the template by selecting it from the list.")];exports.publicForm = publicForm;





const openPublicForm = /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Captcha bypass" }, void 0, "By toggling this on you can allow users to submit to your whitelisted templates without having to fill a CAPTCHA. The form will still present the captcha to end users, but API end-point will allow submissions without CAPTCHA validation if a header `\u201CBypass-Captcha: true`\u201C is sent along. This option is insecure and can be leveraged to flood your instance with spam or malicious content.");exports.openPublicForm = openPublicForm;








const mapApiKey = /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "Map api key tooltip" }, void 0, "An API key is required to use Mapbox or Google Maps.");exports.mapApiKey = mapApiKey;




const ocrTrigger = /*#__PURE__*/
_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "OCR description tip 1" }, void 0, "This will enable the Optical Character Recognition (OCR) functionality for PDF documents. This service will recognize text inside images, such as scanned documents and photos, and convert it into machine-readable text data."), /*#__PURE__*/




_jsx("br", {}), /*#__PURE__*/
_jsx(_I18N.Translate, { translationKey: "OCR description tip 2" }, void 0, "When activated, this will enable administrator and editor users to send PDF documents to the OCR service."));exports.ocrTrigger = ocrTrigger;