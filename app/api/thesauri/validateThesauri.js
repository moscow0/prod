"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.validateThesauri = void 0;var _ajv = _interopRequireDefault(require("ajv"));
var _ajvKeywords = _interopRequireDefault(require("ajv-keywords"));
var _tsUtils = require("../../shared/tsUtils");
var _thesaurusSchema = require("../../shared/types/thesaurusSchema");

var _dictionariesModel = _interopRequireDefault(require("./dictionariesModel"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const ajv = (0, _ajvKeywords.default)(new _ajv.default({ allErrors: true }), ['uniqueItemProperties']);
ajv.addVocabulary(['tsType']);

ajv.addKeyword({
  keyword: 'uniqueName',
  async: true,
  validate: async (_config, thesaurus) => {
    const [duplicated] = await _dictionariesModel.default.get({
      _id: { $ne: thesaurus._id },
      name: new RegExp(`^${thesaurus.name}$` || '', 'i') });


    if (duplicated) {
      return false;
    }
    return true;
  } });


const validateUniqeLabels = (values) => {
  if (!values) return true;
  const asSet = new Set(values.map((v) => v.label));
  return values.length === asSet.size;
};

ajv.addKeyword({
  keyword: 'uniqueLabels',
  async: true,
  validate: async (_config, thesaurus) =>
  !thesaurus.values ||
  validateUniqeLabels(thesaurus.values) &&
  thesaurus.values.every((v) => validateUniqeLabels(v.values)) });


const validateThesauri = (0, _tsUtils.wrapValidator)(ajv.compile(_thesaurusSchema.thesaurusSchema));exports.validateThesauri = validateThesauri;