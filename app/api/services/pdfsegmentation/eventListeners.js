"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.registerEventListeners = void 0;
var _FilesDeletedEvent = require("../../files/events/FilesDeletedEvent");
var _segmentationModel = require("./segmentationModel");

const registerEventListeners = (eventsBus) => {
  eventsBus.on(_FilesDeletedEvent.FilesDeletedEvent, async ({ files }) => {
    await _segmentationModel.SegmentationModel.delete({ fileID: { $in: files.map((f) => f._id) } });
  });
};exports.registerEventListeners = registerEventListeners;