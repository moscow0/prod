"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.routesErrorHandler = void 0; /* eslint-disable no-param-reassign */


const wrapHandler = (originalHandler) => async (req, res, next) => {
  try {
    await originalHandler(req, res, next);
  } catch (err) {
    next(err);
  }
};

const routesErrorHandler = (app) => {
  const originalGet = app.get.bind(app);
  app.get = (path, ...args) => originalGet(path, ...args.map(wrapHandler));

  const originalPost = app.post.bind(app);
  app.post = (path, ...args) => originalPost(path, ...args.map(wrapHandler));

  const originalDelete = app.delete.bind(app);
  app.delete = (path, ...args) => originalDelete(path, ...args.map(wrapHandler));

  const originalPut = app.put.bind(app);
  app.put = (path, ...args) => originalPut(path, ...args.map(wrapHandler));
};exports.routesErrorHandler = routesErrorHandler;