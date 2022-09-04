"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _multer = _interopRequireDefault(require("multer"));

var _odm = require("../odm");
var _search = require("../search");



var _files = require("../files");

var _entitiesIndex = require("../search/entitiesIndex");

var _auth = require("../auth");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

const diskStorage = _multer.default.diskStorage({
  filename(_req, file, cb) {
    cb(null, file.originalname);
  } });


const indexEntities = async (req) => {
  if (req.body.namespace === 'entities') {
    await _search.search.indexEntities({ _id: req.body.data._id }, '+fullText');
  }

  if (req.body.namespace === 'files') {
    await _search.search.indexEntities({ sharedId: req.body.data.entity }, '+fullText');
  }
};

const updateMappings = async (req) => {
  if (req.body.namespace === 'templates') {
    await (0, _entitiesIndex.updateMapping)(Array.isArray(req.body.data) ? req.body.data : [req.body.data]);
  }
};

const deleteFileFromIndex = async (file) =>
_search.search.indexEntities({ sharedId: file.entity });

const deleteEntityFromIndex = async (entityId) => {
  try {
    await _search.search.delete({ _id: entityId });
  } catch (err) {
    if (err.statusCode !== 404) {
      throw err;
    }
  }
};

const deleteFromIndex = async (req) => {
  if (req.query.namespace === 'entities') {
    await deleteEntityFromIndex(JSON.parse(req.query.data)._id);
  }
};

const deleteFile = async (fileId) => {
  const file = await _odm.models.files.getById(fileId);
  if (file) {
    await _files.storage.removeFile(file.filename || '', file.type || 'document');
    await deleteFileFromIndex(file);
  }
  return file;
};

const preserveTranslations = async (syncData) => {var _translation$contexts, _translation$contexts2;
  const [translation] = await _odm.models.translations.get({ _id: syncData._id });
  if (!translation) {
    return syncData;
  }
  const menu = (_translation$contexts = translation.contexts) === null || _translation$contexts === void 0 ? void 0 : _translation$contexts.find((c) => c.id === 'Menu');
  const filters = (_translation$contexts2 = translation.contexts) === null || _translation$contexts2 === void 0 ? void 0 : _translation$contexts2.find((c) => c.id === 'Filters');
  if (menu) {var _syncData$contexts;
    (_syncData$contexts = syncData.contexts) === null || _syncData$contexts === void 0 ? void 0 : _syncData$contexts.push(menu);
  }
  if (filters) {var _syncData$contexts2;
    (_syncData$contexts2 = syncData.contexts) === null || _syncData$contexts2 === void 0 ? void 0 : _syncData$contexts2.push(filters);
  }
  return syncData;
};var _default =

(app) => {
  app.post('/api/sync', (0, _auth.needsAuthorization)(['admin']), async (req, res, next) => {
    try {
      if (req.body.namespace === 'settings') {
        const [settings] = await _odm.models.settings.get({});
        req.body.data._id = settings._id;
      }

      if (req.body.namespace === 'translations') {
        req.body.data = await preserveTranslations(req.body.data);
      }

      await (Array.isArray(req.body.data) ?
      _odm.models[req.body.namespace].saveMultiple(req.body.data) :
      _odm.models[req.body.namespace].save(req.body.data));

      await updateMappings(req);
      await indexEntities(req);

      res.json('ok');
    } catch (e) {
      next(e);
    }
  });

  app.post(
  '/api/sync/upload',
  (0, _auth.needsAuthorization)(['admin']),
  _files.uploadMiddleware.customStorage(diskStorage, 'document'),
  (_req, res) => {
    res.json('ok');
  });


  app.post(
  '/api/sync/upload/custom',
  (0, _auth.needsAuthorization)(['admin']),
  _files.uploadMiddleware.customStorage(diskStorage, 'custom'),
  (_req, res) => {
    res.json('ok');
  });


  app.delete('/api/sync', (0, _auth.needsAuthorization)(['admin']), async (req, res) => {
    await _odm.models[req.query.namespace].delete(JSON.parse(req.query.data));

    if (req.query.namespace === 'files') {
      await deleteFile(JSON.parse(req.query.data)._id);
    }

    if (req.query.namespace === 'entities') {
      await deleteFromIndex(req);
    }

    res.json('ok');
  });
};exports.default = _default;