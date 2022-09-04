"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.parseRenderingError = void 0;















const parseRenderingError = (apiResponse) =>
apiResponse ?
{
  name: apiResponse.json.error || 'Unexpected error',
  message: apiResponse.json.prettyMessage,
  requestId: apiResponse.json.requestId,
  code: apiResponse.status } :

null;exports.parseRenderingError = parseRenderingError;