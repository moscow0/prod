"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.syncEntity = syncEntity;var _entities = _interopRequireDefault(require("../entities"));
var _odm = require("../odm");
var _templates = _interopRequireDefault(require("../templates"));
var _thesauri = _interopRequireDefault(require("../thesauri"));
var _ = require("./");
var _api = require("./api");
var _commonTopicClassification = require("../../shared/commonTopicClassification");
var _provenanceTypes = require("../../shared/provenanceTypes");
var _tasks = require("../../shared/tasks/tasks");




var util = _interopRequireWildcard(require("util"));
var _tsUtils = require("../../shared/tsUtils");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}











// eslint-disable-next-line max-params, max-statements
async function handlePropOnlynew(
e,
args,
prop,
thes,
latestModelVersion)
{var _ref;
  const seq = await (0, _.extractSequence)(e);
  if (e.metadata[prop.name] && ((_ref = e.metadata[prop.name]) !== null && _ref !== void 0 ? _ref : []).length) {
    return false;
  }
  if (!args.overwrite && e.suggestedMetadata[prop.name]) {
    return false;
  }
  if (latestModelVersion) {var _ref2;
    const currentModel = (_ref2 = e.
    suggestedMetadata[prop.name]) === null || _ref2 === void 0 ? void 0 : _ref2.map((v) => v.suggestion_model).
    reduce((max, s) => (s || '') > max ? s : max, '');
    if (currentModel && currentModel >= latestModelVersion) {
      return false;
    }
  }
  const suggestions = await (0, _api.fetchSuggestions)(e, prop, seq, thes);
  if (
  !suggestions ||
  JSON.stringify(suggestions) === JSON.stringify(e.suggestedMetadata[prop.name]))
  {
    return false;
  }
  e.suggestedMetadata[prop.name] = suggestions;
  return true;
}

// eslint-disable-next-line max-params, max-statements
async function handlePropAutoaccept(
e,
args,
prop,
thes,
latestModelVersion)
{var _ref3;
  const seq = await (0, _.extractSequence)(e);
  if (e.metadata[prop.name] && ((_ref3 = e.metadata[prop.name]) !== null && _ref3 !== void 0 ? _ref3 : []).length) {
    if (!e.metadata[prop.name].every((v) => v.provenance === _provenanceTypes.provenanceTypes.bulk)) {
      return false;
    }
    if (!args.overwrite) {
      return false;
    }
    if (latestModelVersion) {var _ref4;
      const currentModel = (_ref4 = e.
      metadata[prop.name]) === null || _ref4 === void 0 ? void 0 : _ref4.map((v) => v.suggestion_model).
      reduce((max, s) => (s || '') > max ? s : max, '');
      if (currentModel && currentModel >= latestModelVersion) {
        return false;
      }
    }
  }
  const suggestions = await (0, _api.fetchSuggestions)(e, prop, seq, thes);
  if (!suggestions) {
    return false;
  }
  const toApply = suggestions.
  filter((s) => {var _s$suggestion_confide, _args$autoAcceptConfi;return ((_s$suggestion_confide = s.suggestion_confidence) !== null && _s$suggestion_confide !== void 0 ? _s$suggestion_confide : 0) >= ((_args$autoAcceptConfi = args.autoAcceptConfidence) !== null && _args$autoAcceptConfi !== void 0 ? _args$autoAcceptConfi : 0);}).
  map((s) => _objectSpread(_objectSpread({}, s), {}, { provenance: _provenanceTypes.provenanceTypes.bulk }));
  if (JSON.stringify(toApply) === JSON.stringify(e.metadata[prop.name])) {
    return false;
  }
  e.metadata[prop.name] = toApply;
  return true;
}

// eslint-disable-next-line max-params
async function syncEntity(
e,
args,
templateDictP,
thesaurusDictP,
availableModels)
{var _ref5, _e$template$toString, _e$template, _template$properties;
  if (!e.metadata) {
    e.metadata = {};
  }
  if (!e.suggestedMetadata) {
    e.suggestedMetadata = {};
  }
  const template = (_ref5 =
  (templateDictP !== null && templateDictP !== void 0 ? templateDictP : {})[(_e$template$toString = (_e$template = e.template) === null || _e$template === void 0 ? void 0 : _e$template.toString()) !== null && _e$template$toString !== void 0 ? _e$template$toString : '']) !== null && _ref5 !== void 0 ? _ref5 :
  await _templates.default.getById((0, _tsUtils.ensure)(e.template));
  const thesaurusDict =
  thesaurusDictP !== null && thesaurusDictP !== void 0 ? thesaurusDictP :
  (await _thesauri.default.get(null)).reduce((res, t) => _objectSpread(_objectSpread({}, res), {}, { [t._id.toString()]: t }), {});
  let didSth = false;
  await Promise.all(
  ((_template$properties = template === null || template === void 0 ? void 0 : template.properties) !== null && _template$properties !== void 0 ? _template$properties : []).map(async (prop) => {var _prop$content;
    const thesaurus = thesaurusDict[(_prop$content = prop === null || prop === void 0 ? void 0 : prop.content) !== null && _prop$content !== void 0 ? _prop$content : ''];
    if (!prop || !thesaurus) {
      return;
    }
    const modelName = (0, _commonTopicClassification.buildFullModelName)(thesaurus.name);
    if (availableModels !== undefined && !availableModels[modelName]) {
      return;
    }
    if (args.mode === 'onlynew') {
      didSth =
      didSth || (
      await handlePropOnlynew(e, args, prop, thesaurus, (availableModels !== null && availableModels !== void 0 ? availableModels : {})[modelName]));
    } else if (args.mode === 'autoaccept') {
      didSth =
      didSth || (
      await handlePropAutoaccept(
      e,
      args,
      prop,
      thesaurus,
      (availableModels !== null && availableModels !== void 0 ? availableModels : {})[modelName]));

    }
  }));

  return didSth;
}

async function getAvailableModels(fixedModel) {var _await$listModels;
  const models = (_await$listModels = await (0, _.listModels)()) !== null && _await$listModels !== void 0 ? _await$listModels : { error: 'Internal error in calling backend.' };
  if (models.error) {
    return { error: `Suggestion sync aborted: ${models.error}` };
  }
  return models.models.reduce(async (res, m) => {
    if (fixedModel && m !== fixedModel) {
      return res;
    }
    const model = await (0, _api.getModel)(m);
    if (model && model.preferred) {
      return _objectSpread(_objectSpread({}, await res), {}, { [m]: model.preferred });
    }
    return res;
  }, Promise.resolve({}));
}

class SyncTask extends _tasks.Task {
  // eslint-disable-next-line max-statements
  async run(args) {
    this.status.message = `Started with ${util.inspect(args)}`;
    const models = await getAvailableModels(args.model);
    if (models.error) {
      this.status.message = models.error;
      return;
    }
    const templatesDict = (await _templates.default.get(null)).reduce(
    (res, t) => _objectSpread(_objectSpread({}, res), {}, { [t._id.toString()]: t }),
    {});

    const thesaurusDict = (await _thesauri.default.get(null)).reduce(
    (res, t) => _objectSpread(_objectSpread({}, res), {}, { [t._id.toString()]: t }),
    {});

    if (!Object.keys(models).length) {
      if (args.model) {
        throw new Error(`The selected model ${args.model} was not found!`);
      }
      this.status.message =
      'No suggestions to sync: Topic Classification server does not have any models (yet).';
      return;
    }
    const res = this.status.result;
    res.total = await _entities.default.count({ language: 'en' });
    res.seen = 0;
    res.index = 0;
    await (0, _odm.QueryForEach)(args.batchSize || 50, async (e) => {var _args$limit;
      if (res.index > ((_args$limit = args.limit) !== null && _args$limit !== void 0 ? _args$limit : 1000000)) {
        return;
      }
      res.seen += 1;
      if (await syncEntity(e, args, templatesDict, thesaurusDict, models)) {
        res.index += 1;
        if (args.noDryRun) {
          await _entities.default.save(e, { user: 'sync-topic-classification', language: e.language });
        }
      }
      this.status.message =
      `Updating suggestions in the background: ${res.seen} of ${res.total} documents processed, ` +
      `${res.index} changed. Sync arguments are ${util.inspect(args)}.`;
    });
  }}


_tasks.TaskProvider.registerClass('TopicClassificationSync', SyncTask);