"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.fetchSuggestions = fetchSuggestions;exports.getModel = getModel;exports.getModelForThesaurus = getModelForThesaurus;exports.getTaskStatus = getTaskStatus;exports.getTrainStateForThesaurus = getTrainStateForThesaurus;exports.listModels = listModels;exports.startTraining = startTraining;

var _topicClassification = require("../config/topicClassification");




var _search = require("../search");
var _templates = _interopRequireDefault(require("../templates"));
var _common = require("./common");

require("isomorphic-fetch");
var _commonTopicClassification = require("../../shared/commonTopicClassification");
var _JSONRequest = _interopRequireDefault(require("../../shared/JSONRequest"));
var _propertyTypes = require("../../shared/propertyTypes");
var _provenanceTypes = require("../../shared/provenanceTypes");

var _tsUtils = require("../../shared/tsUtils");



var _url = require("url");
var _util = _interopRequireDefault(require("util"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /* eslint-disable no-await-in-loop,camelcase,max-lines */


const MODELS_LIST_ENDPOINT = 'models/list';
const MODEL_GET_ENDPOINT = 'models';
const CLASSIFY_ENDPOINT = 'classify';
const TASKS_ENDPOINT = 'task';

async function listModels(
filter = `^${process.env.DATABASE_NAME}`)
{
  const tcUrl = new _url.URL(MODELS_LIST_ENDPOINT, _topicClassification.tcServer);
  if (!(await (0, _topicClassification.IsTopicClassificationReachable)())) {
    return {
      models: [],
      error: `Topic Classification server is unreachable (waited ${_topicClassification.RPC_DEADLINE_MS} ms)` };

  }

  try {
    tcUrl.searchParams.set('filter', filter);
    const response = await _JSONRequest.default.get(tcUrl.href);
    if (response.status !== 200) {
      throw new Error(`Backend returned ${response.status}.`);
    }
    return response.json;
  } catch (err) {
    return {
      models: [],
      error: `Error from topic-classification server: ${_util.default.inspect(err, false, null)}` };

  }
}

async function getModel(model) {
  if (!(await (0, _topicClassification.IsTopicClassificationReachable)())) {
    throw new Error(`Topic Classification server is unreachable (waited ${_topicClassification.RPC_DEADLINE_MS} ms)`);
  }
  const tcUrl = new _url.URL(MODEL_GET_ENDPOINT, _topicClassification.tcServer);
  tcUrl.searchParams.set('model', model);
  const response = await _JSONRequest.default.get(tcUrl.href);
  return response.json;
}

async function getModelForThesaurus(
thesaurusName = '')
{
  const modelFilter = (0, _commonTopicClassification.buildFullModelName)(thesaurusName);
  const resultModelNames = await listModels(modelFilter);

  let model;
  // we only expect one result, since we've filtered by model already
  switch (resultModelNames.models.length) {
    case 0:
      return { name: '', topics: {} };
    case 1:
      model = await getModel(resultModelNames.models[0]);
      model.name = thesaurusName;
      return model;
    default:
      throw new Error(
      `Expected one model to exist on the topic classification server but instead there were ${resultModelNames.models.length}.`);}


}

async function getTaskStatus(task) {
  const tcUrl = new _url.URL(TASKS_ENDPOINT, _topicClassification.tcServer);
  tcUrl.searchParams.set('name', task);
  if (!(await (0, _topicClassification.IsTopicClassificationReachable)())) {
    return { state: 'undefined', result: {} };
  }
  const response = await _JSONRequest.default.get(tcUrl.href);
  if (response.status === 404) {
    return { state: 'undefined', result: {} };
  }
  if (response.status !== 200) {
    throw new Error(response.toString());
  }
  const pyTask = response.json;
  return {
    state: pyTask.state,
    startTime: pyTask.start_time,
    endTime: pyTask.end_time,
    message: pyTask.status,
    result: {} };

}





















async function sendSample(
model,
request)
{
  if (!(await (0, _topicClassification.IsTopicClassificationReachable)())) {
    return null;
  }
  const tcUrl = new _url.URL(CLASSIFY_ENDPOINT, _topicClassification.tcServer);
  tcUrl.searchParams.set('model', model);
  let response = { json: { samples: [] }, status: 0 };
  let lastErr;
  for (let i = 0; i < 10; i += 1) {
    lastErr = undefined;
    try {
      response = await _JSONRequest.default.post(tcUrl.href, request);
      if (response.status === 200) {
        break;
      }
    } catch (err) {
      lastErr = err;
    }
    await (0, _tsUtils.sleep)(523);
  }
  if (lastErr) {
    throw lastErr;
  }
  if (response.status !== 200) {
    return null;
  }
  return response;
}

async function fetchSuggestions(
e,
prop,
seq,
thes)
{var _response$json, _response$json$sample;
  const model = (0, _commonTopicClassification.buildFullModelName)(thes.name);
  const request = { refresh_predictions: true, samples: [{ seq, sharedId: e.sharedId }] };
  const response = await sendSample(model, request);
  const sample = response === null || response === void 0 ? void 0 : (_response$json = response.json) === null || _response$json === void 0 ? void 0 : (_response$json$sample = _response$json.samples) === null || _response$json$sample === void 0 ? void 0 : _response$json$sample.find((s) => s.sharedId === e.sharedId);
  if (!sample) {
    return null;
  }
  let newPropMetadata = sample.predicted_labels.
  reduce((res, pred) => {var _thes$values;
    const flattenValues = ((_thes$values = thes.values) !== null && _thes$values !== void 0 ? _thes$values : []).reduce(
    (result, dv) => dv.values ? result.concat(dv.values) : result.concat([dv]),
    []);

    const thesValue = flattenValues.find((v) => v.label === pred.topic || v.id === pred.topic);
    if (!thesValue || !thesValue.id) {
      if (pred.topic === 'nan') {
        return res;
      }
      throw Error(`Model suggestion "${pred.topic}" not found in thesaurus ${thes.name}`);
    }
    return [
    ...res,
    {
      value: thesValue.id,
      label: thesValue.label,
      suggestion_confidence: pred.quality,
      suggestion_model: sample.model_version }];


  }, []).
  sort((v1, v2) => (v2.suggestion_confidence || 0) - (v1.suggestion_confidence || 0));
  if (prop.type === _propertyTypes.propertyTypes.select && newPropMetadata.length) {
    newPropMetadata = [newPropMetadata[0]];
  }
  return newPropMetadata;
}

async function getTrainStateForThesaurus(thesaurusName = '') {
  return getTaskStatus(`train-${(0, _commonTopicClassification.buildFullModelName)(thesaurusName)}`);
}

async function startTraining(thesaurus) {
  if (!(await (0, _topicClassification.IsTopicClassificationReachable)())) {
    throw new Error(`Topic Classification server is unreachable (waited ${_topicClassification.RPC_DEADLINE_MS} ms)`);
  }
  const flattenValues = thesaurus.values.reduce(
  (result, dv) => dv.values ? result.concat(dv.values) : result.concat([dv]),
  []);

  const propNames = (0, _commonTopicClassification.getThesaurusPropertyNames)(thesaurus._id.toString(), await _templates.default.get(null));
  if (propNames.length !== 1) {
    throw new Error(
    `Training with thesaurus ${thesaurus.name} is not possible since it's used in mismatching templates fields ${propNames}!`);

  }
  const searchQuery = {
    filters: { [propNames[0]]: { values: ['any'] } },
    includeUnpublished: true,
    limit: 2000 };

  const trainingData = await _search.search.search(searchQuery, 'en', 'internal');
  const testSamples = Math.min(
  trainingData.rows.length / 2,
  flattenValues.length * 15 + trainingData.rows.length * 0.05);

  const reqData = {
    provider: 'TrainModel',
    name: `train-${(0, _commonTopicClassification.buildFullModelName)(thesaurus.name)}`,
    model: (0, _commonTopicClassification.buildFullModelName)(thesaurus.name),
    labels: flattenValues.map((v) => v.label),
    num_train_steps: 3000,
    train_ratio: 1.0 - testSamples / trainingData.rows.length,
    samples: await trainingData.rows.reduce(
    async (res, e) => {var _e$metadata$propNames, _e$metadata$propNames2;
      if (
      !e.metadata ||
      !((_e$metadata$propNames = e.metadata[propNames[0]]) !== null && _e$metadata$propNames !== void 0 && _e$metadata$propNames.length) || (_e$metadata$propNames2 =
      e.metadata[propNames[0]]) !== null && _e$metadata$propNames2 !== void 0 && _e$metadata$propNames2.some((v) => v.provenance === _provenanceTypes.provenanceTypes.bulk))
      {
        return res;
      }
      return [
      ...(await res),
      {
        seq: await (0, _common.extractSequence)(e),
        training_labels: e.metadata[propNames[0]].map((v) => v.label) }];


    },
    []) };


  const tcUrl = new _url.URL(TASKS_ENDPOINT, _topicClassification.tcServer);
  const response = await _JSONRequest.default.post(tcUrl.href, reqData);
  if (response.status !== 200) {
    return { state: 'undefined', result: {} };
  }
  const pyTask = response.json;
  return {
    state: pyTask.state,
    startTime: pyTask.start_time,
    endTime: pyTask.end_time,
    message: pyTask.status,
    result: {} };

}