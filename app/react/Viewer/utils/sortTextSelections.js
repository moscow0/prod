"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.sortTextSelections = void 0;const sortTextSelections = (a, b) =>
a.selectionRectangles[0].page === b.selectionRectangles[0].page ?
a.selectionRectangles[0].top - b.selectionRectangles[0].top :
a.selectionRectangles[0].page - b.selectionRectangles[0].page;exports.sortTextSelections = sortTextSelections;