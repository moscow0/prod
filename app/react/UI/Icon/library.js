"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.loadIcons = exports.iconNames = void 0;var _fontawesomeSvgCore = require("@fortawesome/fontawesome-svg-core");
var _faAlignJustify = require("@fortawesome/free-solid-svg-icons/faAlignJustify");
var _faAngleDoubleLeft = require("@fortawesome/free-solid-svg-icons/faAngleDoubleLeft");
var _faAngleDoubleRight = require("@fortawesome/free-solid-svg-icons/faAngleDoubleRight");
var _faAngleLeft = require("@fortawesome/free-solid-svg-icons/faAngleLeft");
var _faAngleRight = require("@fortawesome/free-solid-svg-icons/faAngleRight");
var _faArrowLeft = require("@fortawesome/free-solid-svg-icons/faArrowLeft");
var _faArrowRight = require("@fortawesome/free-solid-svg-icons/faArrowRight");
var _faArrowUp = require("@fortawesome/free-solid-svg-icons/faArrowUp");
var _faArrowDown = require("@fortawesome/free-solid-svg-icons/faArrowDown");
var _faBars = require("@fortawesome/free-solid-svg-icons/faBars");
var _faBook = require("@fortawesome/free-solid-svg-icons/faBook");
var _faBullhorn = require("@fortawesome/free-solid-svg-icons/faBullhorn");
var _faCalculator = require("@fortawesome/free-solid-svg-icons/faCalculator");
var _faCalendar = require("@fortawesome/free-solid-svg-icons/faCalendar");
var _faCaretDown = require("@fortawesome/free-solid-svg-icons/faCaretDown");
var _faCaretSquareDown = require("@fortawesome/free-solid-svg-icons/faCaretSquareDown");
var _faCaretUp = require("@fortawesome/free-solid-svg-icons/faCaretUp");
var _faChartBar = require("@fortawesome/free-solid-svg-icons/faChartBar");
var _faCheck = require("@fortawesome/free-solid-svg-icons/faCheck");
var _faCheckCircle = require("@fortawesome/free-solid-svg-icons/faCheckCircle");
var _faChevronLeft = require("@fortawesome/free-solid-svg-icons/faChevronLeft");
var _faChevronRight = require("@fortawesome/free-solid-svg-icons/faChevronRight");
var _faCircle = require("@fortawesome/free-solid-svg-icons/faCircle");
var _faClock = require("@fortawesome/free-solid-svg-icons/faClock");
var _faClone = require("@fortawesome/free-solid-svg-icons/faClone");
var _faCloudUploadAlt = require("@fortawesome/free-solid-svg-icons/faCloudUploadAlt");
var _faCloudDownloadAlt = require("@fortawesome/free-solid-svg-icons/faCloudDownloadAlt");
var _faCode = require("@fortawesome/free-solid-svg-icons/faCode");
var _faCoffee = require("@fortawesome/free-solid-svg-icons/faCoffee");
var _faCog = require("@fortawesome/free-solid-svg-icons/faCog");
var _faComment = require("@fortawesome/free-solid-svg-icons/faComment");
var _faCubes = require("@fortawesome/free-solid-svg-icons/faCubes");
var _faCircle2 = require("@fortawesome/free-regular-svg-icons/faCircle");
var _faEnvelope = require("@fortawesome/free-solid-svg-icons/faEnvelope");
var _faExchangeAlt = require("@fortawesome/free-solid-svg-icons/faExchangeAlt");
var _faExclamationTriangle = require("@fortawesome/free-solid-svg-icons/faExclamationTriangle");
var _faFile = require("@fortawesome/free-solid-svg-icons/faFile");
var _faFlask = require("@fortawesome/free-solid-svg-icons/faFlask");
var _faFilter = require("@fortawesome/free-solid-svg-icons/faFilter");
var _faFilePdf = require("@fortawesome/free-solid-svg-icons/faFilePdf");
var _faFileImage = require("@fortawesome/free-solid-svg-icons/faFileImage");
var _faFingerprint = require("@fortawesome/free-solid-svg-icons/faFingerprint");
var _faFont = require("@fortawesome/free-solid-svg-icons/faFont");
var _faGavel = require("@fortawesome/free-solid-svg-icons/faGavel");
var _faGlobeAfrica = require("@fortawesome/free-solid-svg-icons/faGlobeAfrica");
var _faHome = require("@fortawesome/free-solid-svg-icons/faHome");
var _faImage = require("@fortawesome/free-solid-svg-icons/faImage");
var _faInfoCircle = require("@fortawesome/free-solid-svg-icons/faInfoCircle");
var _faLanguage = require("@fortawesome/free-solid-svg-icons/faLanguage");
var _faKey = require("@fortawesome/free-solid-svg-icons/faKey");
var _faLevelDownAlt = require("@fortawesome/free-solid-svg-icons/faLevelDownAlt");
var _faLightbulb = require("@fortawesome/free-solid-svg-icons/faLightbulb");
var _faLink = require("@fortawesome/free-solid-svg-icons/faLink");
var _faUnlink = require("@fortawesome/free-solid-svg-icons/faUnlink");
var _faList = require("@fortawesome/free-solid-svg-icons/faList");
var _faLock = require("@fortawesome/free-solid-svg-icons/faLock");
var _faMapMarker = require("@fortawesome/free-solid-svg-icons/faMapMarker");
var _faMinus = require("@fortawesome/free-solid-svg-icons/faMinus");
var _faPaperPlane = require("@fortawesome/free-solid-svg-icons/faPaperPlane");
var _faPaperclip = require("@fortawesome/free-solid-svg-icons/faPaperclip");
var _faParagraph = require("@fortawesome/free-solid-svg-icons/faParagraph");
var _faPassport = require("@fortawesome/free-solid-svg-icons/faPassport");
var _faPencilAlt = require("@fortawesome/free-solid-svg-icons/faPencilAlt");
var _faPlay = require("@fortawesome/free-solid-svg-icons/faPlay");
var _faPlus = require("@fortawesome/free-solid-svg-icons/faPlus");
var _faPowerOff = require("@fortawesome/free-solid-svg-icons/faPowerOff");
var _faQuestionCircle = require("@fortawesome/free-solid-svg-icons/faQuestionCircle");
var _faQuoteLeft = require("@fortawesome/free-solid-svg-icons/faQuoteLeft");
var _faQuoteRight = require("@fortawesome/free-solid-svg-icons/faQuoteRight");
var _faSave = require("@fortawesome/free-solid-svg-icons/faSave");
var _faSearch = require("@fortawesome/free-solid-svg-icons/faSearch");
var _faServer = require("@fortawesome/free-solid-svg-icons/faServer");
var _faSearchMinus = require("@fortawesome/free-solid-svg-icons/faSearchMinus");
var _faSearchPlus = require("@fortawesome/free-solid-svg-icons/faSearchPlus");
var _faSitemap = require("@fortawesome/free-solid-svg-icons/faSitemap");
var _faSort = require("@fortawesome/free-solid-svg-icons/faSort");
var _faSortAlphaDown = require("@fortawesome/free-solid-svg-icons/faSortAlphaDown");
var _faSpinner = require("@fortawesome/free-solid-svg-icons/faSpinner");
var _faSquare = require("@fortawesome/free-regular-svg-icons/faSquare");
var _faSquare2 = require("@fortawesome/free-solid-svg-icons/faSquare");
var _faStar = require("@fortawesome/free-solid-svg-icons/faStar");
var _faStop = require("@fortawesome/free-solid-svg-icons/faStop");
var _faSync = require("@fortawesome/free-solid-svg-icons/faSync");
var _faTag = require("@fortawesome/free-solid-svg-icons/faTag");
var _faTerminal = require("@fortawesome/free-solid-svg-icons/faTerminal");
var _faTh = require("@fortawesome/free-solid-svg-icons/faTh");
var _faTimes = require("@fortawesome/free-solid-svg-icons/faTimes");
var _faTimesCircle = require("@fortawesome/free-solid-svg-icons/faTimesCircle");
var _faToggleOff = require("@fortawesome/free-solid-svg-icons/faToggleOff");
var _faToggleOn = require("@fortawesome/free-solid-svg-icons/faToggleOn");
var _faTrashAlt = require("@fortawesome/free-solid-svg-icons/faTrashAlt");
var _faUndo = require("@fortawesome/free-solid-svg-icons/faUndo");
var _faUpload = require("@fortawesome/free-solid-svg-icons/faUpload");
var _faVideo = require("@fortawesome/free-solid-svg-icons/faVideo");
var _faEye = require("@fortawesome/free-solid-svg-icons/faEye");
var _faArrowsAlt = require("@fortawesome/free-solid-svg-icons/faArrowsAlt");
var _faEyeSlash = require("@fortawesome/free-solid-svg-icons/faEyeSlash");
var _faUser = require("@fortawesome/free-solid-svg-icons/faUser");
var _faUsers = require("@fortawesome/free-solid-svg-icons/faUsers");
var _faUserCheck = require("@fortawesome/free-solid-svg-icons/faUserCheck");
var _faUserPlus = require("@fortawesome/free-solid-svg-icons/faUserPlus");
var _faUserTimes = require("@fortawesome/free-solid-svg-icons/faUserTimes");
var _faHandPaper = require("@fortawesome/free-solid-svg-icons/faHandPaper");
var _faBullseye = require("@fortawesome/free-solid-svg-icons/faBullseye");
var _faExternalLinkAlt = require("@fortawesome/free-solid-svg-icons/faExternalLinkAlt");
var _twoFactorAuth = require("./two-factor-auth");
var _infoCircleHollow = require("./info-circle-hollow");
var _faTasks = require("@fortawesome/free-solid-svg-icons/faTasks");
var _faMap = require("@fortawesome/free-solid-svg-icons/faMap");
var _faMapMarkerAlt = require("@fortawesome/free-solid-svg-icons/faMapMarkerAlt");
var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");
var _saveAndNext = require("./save-and-next");
var _exportCsv = require("./export-csv");
var _importCsv = require("./import-csv");
var _copyFrom = require("./copy-from");
var _funnelFilter = require("./funnel-filter");

const icons = {
  faAlignJustify: _faAlignJustify.faAlignJustify,
  faAngleDoubleLeft: _faAngleDoubleLeft.faAngleDoubleLeft,
  faAngleDoubleRight: _faAngleDoubleRight.faAngleDoubleRight,
  faAngleLeft: _faAngleLeft.faAngleLeft,
  faAngleRight: _faAngleRight.faAngleRight,
  faArrowLeft: _faArrowLeft.faArrowLeft,
  faArrowsAlt: _faArrowsAlt.faArrowsAlt,
  faArrowUp: _faArrowUp.faArrowUp,
  faArrowDown: _faArrowDown.faArrowDown,
  faArrowRight: _faArrowRight.faArrowRight,
  faBars: _faBars.faBars,
  faBook: _faBook.faBook,
  faBullhorn: _faBullhorn.faBullhorn,
  faCalculator: _faCalculator.faCalculator,
  faCalendar: _faCalendar.faCalendar,
  faCaretDown: _faCaretDown.faCaretDown,
  faCaretSquareDown: _faCaretSquareDown.faCaretSquareDown,
  faCaretUp: _faCaretUp.faCaretUp,
  faChartBar: _faChartBar.faChartBar,
  faCheck: _faCheck.faCheck,
  faCheckCircle: _faCheckCircle.faCheckCircle,
  faChevronLeft: _faChevronLeft.faChevronLeft,
  faChevronRight: _faChevronRight.faChevronRight,
  faCircle: _faCircle.faCircle,
  faClock: _faClock.faClock,
  faClone: _faClone.faClone,
  faCloudUploadAlt: _faCloudUploadAlt.faCloudUploadAlt,
  faCloudDownloadAlt: _faCloudDownloadAlt.faCloudDownloadAlt,
  faCode: _faCode.faCode,
  faCoffee: _faCoffee.faCoffee,
  faCog: _faCog.faCog,
  faComment: _faComment.faComment,
  faCubes: _faCubes.faCubes,
  faEmptyCircle: _faCircle2.faCircle,
  faEnvelope: _faEnvelope.faEnvelope,
  faExchangeAlt: _faExchangeAlt.faExchangeAlt,
  faExclamationTriangle: _faExclamationTriangle.faExclamationTriangle,
  faFlask: _faFlask.faFlask,
  faFile: _faFile.faFile,
  faFilter: _faFilter.faFilter,
  faFilePdf: _faFilePdf.faFilePdf,
  faFileImage: _faFileImage.faFileImage,
  faFingerprint: _faFingerprint.faFingerprint,
  faFont: _faFont.faFont,
  faGavel: _faGavel.faGavel,
  faGlobeAfrica: _faGlobeAfrica.faGlobeAfrica,
  faHome: _faHome.faHome,
  faImage: _faImage.faImage,
  faInfoCircle: _faInfoCircle.faInfoCircle,
  faKey: _faKey.faKey,
  faLanguage: _faLanguage.faLanguage,
  faLevelDownAlt: _faLevelDownAlt.faLevelDownAlt,
  faLightbulb: _faLightbulb.faLightbulb,
  faLink: _faLink.faLink,
  faUnlink: _faUnlink.faUnlink,
  faList: _faList.faList,
  faLock: _faLock.faLock,
  faMapMarker: _faMapMarker.faMapMarker,
  faMinus: _faMinus.faMinus,
  faPaperPlane: _faPaperPlane.faPaperPlane,
  faPaperclip: _faPaperclip.faPaperclip,
  faParagraph: _faParagraph.faParagraph,
  faPassport: _faPassport.faPassport,
  faPencilAlt: _faPencilAlt.faPencilAlt,
  faPlay: _faPlay.faPlay,
  faPlus: _faPlus.faPlus,
  faPowerOff: _faPowerOff.faPowerOff,
  faQuestionCircle: _faQuestionCircle.faQuestionCircle,
  faQuoteLeft: _faQuoteLeft.faQuoteLeft,
  faQuoteRight: _faQuoteRight.faQuoteRight,
  faSave: _faSave.faSave,
  faSearch: _faSearch.faSearch,
  faServer: _faServer.faServer,
  faSearchMinus: _faSearchMinus.faSearchMinus,
  faSearchPlus: _faSearchPlus.faSearchPlus,
  faSitemap: _faSitemap.faSitemap,
  faSort: _faSort.faSort,
  faSortAlphaDown: _faSortAlphaDown.faSortAlphaDown,
  faSpinner: _faSpinner.faSpinner,
  faSquare: _faSquare.faSquare,
  faSolidSquare: _faSquare2.faSquare,
  faStar: _faStar.faStar,
  faStop: _faStop.faStop,
  faSync: _faSync.faSync,
  faTag: _faTag.faTag,
  faTerminal: _faTerminal.faTerminal,
  faTh: _faTh.faTh,
  faTimes: _faTimes.faTimes,
  faTimesCircle: _faTimesCircle.faTimesCircle,
  faToggleOff: _faToggleOff.faToggleOff,
  faToggleOn: _faToggleOn.faToggleOn,
  faTrashAlt: _faTrashAlt.faTrashAlt,
  faUndo: _faUndo.faUndo,
  faUpload: _faUpload.faUpload,
  faVideo: _faVideo.faVideo,
  faEye: _faEye.faEye,
  faEyeSlash: _faEyeSlash.faEyeSlash,
  faUser: _faUser.faUser,
  faUsers: _faUsers.faUsers,
  faUserTimes: _faUserTimes.faUserTimes,
  faUserPlus: _faUserPlus.faUserPlus,
  faUserCheck: _faUserCheck.faUserCheck,
  faHandPaper: _faHandPaper.faHandPaper,
  faExternalLinkAlt: _faExternalLinkAlt.faExternalLinkAlt,
  faMap: _faMap.faMap,
  faMapMarkerAlt: _faMapMarkerAlt.faMapMarkerAlt,
  saveAndNext: _saveAndNext.saveAndNext,
  faTasks: _faTasks.faTasks,
  exportCsv: _exportCsv.exportCsv,
  importCsv: _importCsv.importCsv,
  copyFrom: _copyFrom.copyFrom,
  funnelFilter: _funnelFilter.funnelFilter,
  twoFactorAuth: _twoFactorAuth.twoFactorAuth,
  infoCircleHollow: _infoCircleHollow.infoCircleHollow,
  faBullseye: _faBullseye.faBullseye,
  faColumns: _freeSolidSvgIcons.faColumns };


const loadIcons = () => {
  _fontawesomeSvgCore.library.add(...Object.keys(icons).map((key) => icons[key]));
};exports.loadIcons = loadIcons;

const iconNames = Object.keys(icons).map((key) => icons[key].iconName);exports.iconNames = iconNames;