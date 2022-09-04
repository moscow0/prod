"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.UserInContextMockFactory = void 0;var _permissionsContext = require("../permissions/permissionsContext");

var _userSchema = require("../../shared/types/userSchema");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}


class UserInContextMockFactory {constructor() {_defineProperty(this, "spy", void 0);}


  mock(user) {
    this.spy = jest.spyOn(_permissionsContext.permissionsContext, 'getUserInContext').mockReturnValue(user);
  }

  mockEditorUser() {
    this.mock({
      _id: 'userId',
      role: _userSchema.UserRole.EDITOR,
      username: 'editorUser',
      email: 'editor@test.com' });

  }

  restore() {var _this$spy;
    (_this$spy = this.spy) === null || _this$spy === void 0 ? void 0 : _this$spy.mockRestore();
  }}exports.UserInContextMockFactory = UserInContextMockFactory;