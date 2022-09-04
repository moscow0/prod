"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateUserGroup = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _ajvKeywords = _interopRequireDefault(require("ajv-keywords"));
var _tsUtils = require("../../shared/tsUtils");


var _userGroupSchema = require("../../shared/types/userGroupSchema");
var _userGroupsModel = _interopRequireDefault(require("./userGroupsModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const ajv = (0, _ajvKeywords.default)(new _ajv.default({ allErrors: true }), ['uniqueItemProperties']);
ajv.addVocabulary(['tsType']);

ajv.addKeyword({
  keyword: 'uniqueName',
  async: true,
  validate: async (_config, userGroup) => {
    const [duplicated] = await _userGroupsModel.default.get({
      _id: { $ne: userGroup._id },
      name: new RegExp(`^${userGroup.name}$` || '', 'i') });


    return duplicated === undefined;
  } });


const validateUserGroup = (0, _tsUtils.wrapValidator)(ajv.compile(_userGroupSchema.userGroupSchema));exports.validateUserGroup = validateUserGroup;