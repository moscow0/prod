"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.userSchema = exports.emitSchemaTypes = exports.UserRole = void 0;var _commonSchemas = require("./commonSchemas");

const emitSchemaTypes = true;exports.emitSchemaTypes = emitSchemaTypes;let

UserRole;exports.UserRole = UserRole;(function (UserRole) {UserRole["ADMIN"] = "admin";UserRole["EDITOR"] = "editor";UserRole["COLLABORATOR"] = "collaborator";})(UserRole || (exports.UserRole = UserRole = {}));





const userSchema = {
  type: 'object',
  additionalProperties: false,
  definitions: { objectIdSchema: _commonSchemas.objectIdSchema },
  properties: {
    _id: _commonSchemas.objectIdSchema,
    __v: { type: 'number' },
    username: { type: 'string', minLength: 1 },
    role: { type: 'string', enum: Object.values(UserRole) },
    email: { type: 'string', minLength: 1 },
    password: { type: 'string', minLength: 1 },
    using2fa: { type: 'boolean' },
    groups: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          _id: _commonSchemas.objectIdSchema,
          name: { type: 'string' } },

        required: ['_id', 'name'] } } },



  required: ['username', 'role', 'email'] };exports.userSchema = userSchema;