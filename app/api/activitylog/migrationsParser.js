"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.typeParsers = void 0;var _activityLogBuilder = require("./activityLogBuilder");

const typeParsers = {
  fieldParseError: (logData) => {
    const { title, propertyName, sharedId, migrationName } = logData;

    return {
      action: _activityLogBuilder.Methods.Migrate,
      name: `${title} (${sharedId})`,
      extra: 'Must fix manually',
      description: `[${migrationName}] Error parsing property ${propertyName} in` };

  } };exports.typeParsers = typeParsers;