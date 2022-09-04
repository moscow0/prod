"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _sha = _interopRequireDefault(require("crypto-js/sha256"));
var _crypto = _interopRequireDefault(require("crypto"));

var _utils = require("../utils");
var _uniqueID = _interopRequireDefault(require("../../shared/uniqueID"));
var _encryptPassword = _interopRequireWildcard(require("../auth/encryptPassword"));
var usersUtils = _interopRequireWildcard(require("../auth2fa/usersUtils"));

var _userGroupsMembers = require("../usergroups/userGroupsMembers");
var _mailer = _interopRequireDefault(require("../utils/mailer"));
var _usersModel = _interopRequireDefault(require("./usersModel"));
var _passwordRecoveriesModel = _interopRequireDefault(require("./passwordRecoveriesModel"));
var _settings2 = _interopRequireDefault(require("../settings/settings"));const _excluded = ["password", "accountLocked", "failedLogins", "accountUnlockCode"],_excluded2 = ["using2fa", "secret"];function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function (nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || typeof obj !== "object" && typeof obj !== "function") {return { default: obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj.default = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _objectWithoutProperties(source, excluded) {if (source == null) return {};var target = _objectWithoutPropertiesLoose(source, excluded);var key, i;if (Object.getOwnPropertySymbols) {var sourceSymbolKeys = Object.getOwnPropertySymbols(source);for (i = 0; i < sourceSymbolKeys.length; i++) {key = sourceSymbolKeys[i];if (excluded.indexOf(key) >= 0) continue;if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;target[key] = source[key];}}return target;}function _objectWithoutPropertiesLoose(source, excluded) {if (source == null) return {};var target = {};var sourceKeys = Object.keys(source);var key, i;for (i = 0; i < sourceKeys.length; i++) {key = sourceKeys[i];if (excluded.indexOf(key) >= 0) continue;target[key] = source[key];}return target;}

const MAX_FAILED_LOGIN_ATTEMPTS = 6;

const generateUnlockCode = () => _crypto.default.randomBytes(32).toString('hex');

function conformRecoverText(options, _settings, domain, key, user) {
  const response = {};
  if (!options.newUser) {
    response.subject = 'Password set';
    response.text = `To set your password click on the following link:\n${domain}/setpassword/${key}`;
  }

  if (options.newUser) {
    const siteName = _settings.site_name || 'Uwazi';
    const text =
    'Hello!\n\n' +
    `The administrators of ${siteName} have created an account for you under the user name:\n` +
    `${user.username}\n\n` +
    'To complete this process, please create a strong password by clicking on the following link:\n' +
    `${domain}/setpassword/${key}?createAccount=true\n\n` +
    'For more information about the Uwazi platform, visit https://www.uwazi.io.\n\nThank you!\nUwazi team';

    const htmlLink = `<a href="${domain}/setpassword/${key}?createAccount=true">${domain}/setpassword/${key}?createAccount=true</a>`;

    response.subject = `Welcome to ${siteName}`;
    response.text = text;
    response.html = `<p>${response.text.
    replace(new RegExp(user.username, 'g'), `<b>${user.username}</b>`).
    replace(new RegExp(`${domain}/setpassword/${key}\\?createAccount=true`, 'g'), htmlLink).
    replace(/https:\/\/www.uwazi.io/g, '<a href="https://www.uwazi.io">https://www.uwazi.io</a>').
    replace(/\n{2,}/g, '</p><p>').
    replace(/\n/g, '<br />')}</p>`;
  }
  return response;
}

const sendAccountLockedEmail = async (user, domain) => {
  const url = `${domain}/unlockaccount/${user.username}/${user.accountUnlockCode}`;
  const htmlLink = `<a href="${url}">${url}</a>`;
  const text =
  'Hello,\n\n' +
  'Your account has been locked because of too many failed login attempts. ' +
  'To unlock your account open the following link:\n' +
  `${url}`;
  const html = `<p>${text.replace(url, htmlLink)}</p>`;

  const settingsDetails = await _settings2.default.get();
  const emailSender = _mailer.default.createSenderDetails(settingsDetails);
  const mailOptions = {
    from: emailSender,
    to: user.email,
    subject: 'Account locked',
    text,
    html };


  return _mailer.default.send(mailOptions);
};

const validateUserStatus = (user) => {
  if (!user) {
    throw (0, _utils.createError)('Invalid username or password', 401);
  }
  if (user.accountLocked) {
    throw (0, _utils.createError)('Account locked. Check your email to unlock.', 403);
  }
};

const updateOldPassword = async (user, password) => {
  await _usersModel.default.save({ _id: user._id, password: await (0, _encryptPassword.default)(password) });
};

const blockAccount = async (user, domain) => {
  const accountUnlockCode = generateUnlockCode();
  const lockedUser = await _usersModel.default.db.findOneAndUpdate(
  { _id: user._id },
  { $set: { accountLocked: true, accountUnlockCode } },
  { new: true, fields: '+accountUnlockCode' });

  await sendAccountLockedEmail(lockedUser, domain);
};

const newFailedLogin = async (user, domain) => {
  const updatedUser = await _usersModel.default.db.findOneAndUpdate(
  { _id: user._id },
  { $inc: { failedLogins: 1 } },
  { new: true, fields: '+failedLogins' });

  if (updatedUser.failedLogins >= MAX_FAILED_LOGIN_ATTEMPTS) {
    await blockAccount(user, domain);
    throw (0, _utils.createError)('Account locked. Check your email to unlock.', 403);
  }
};

const validateUserPassword = async (user, password, domain) => {
  const passwordValidated = await (0, _encryptPassword.comparePasswords)(password, user.password);
  const oldPasswordValidated = user.password === (0, _sha.default)(password).toString();

  if (oldPasswordValidated) {
    await updateOldPassword(user, password);
  }

  if (!oldPasswordValidated && !passwordValidated) {
    await newFailedLogin(user, domain);
    throw (0, _utils.createError)('Invalid username or password', 401);
  }
};

const validate2fa = async (user, token, domain) => {
  if (user.using2fa) {
    if (!token) {
      throw (0, _utils.createError)('Two-step verification token required', 409);
    }

    try {
      await usersUtils.verifyToken(user, token);
    } catch (err) {
      await newFailedLogin(user, domain);
      throw err;
    }
  }
};

const sanitizeUser = (user) => {
  const { password, accountLocked, failedLogins, accountUnlockCode } = user,sanitizedUser = _objectWithoutProperties(user, _excluded);
  return sanitizedUser;
};

const populateGroupsOfUsers = async (user, groups) => {
  const memberships = groups.
  filter((group) => group.members.find((member) => member.refId === user._id.toString())).
  map((group) => ({
    _id: group._id,
    name: group.name }));

  return _objectSpread(_objectSpread({}, user), {}, { groups: memberships });
};

function unauthorizedAction(user, userInTheDatabase, currentUser) {
  return (
    user.hasOwnProperty('role') &&
    user.role !== userInTheDatabase.role &&
    currentUser.role !== 'admin' ||
    user._id !== currentUser._id.toString() && currentUser.role !== 'admin');

}var _default =

{
  async save(user, currentUser) {
    const [userInTheDatabase] = await _usersModel.default.get({ _id: user._id }, '+password');

    if (unauthorizedAction(user, userInTheDatabase, currentUser)) {
      return Promise.reject((0, _utils.createError)('Unauthorized', 403));
    }

    if (user._id === currentUser._id.toString() && user.role !== currentUser.role) {
      return Promise.reject((0, _utils.createError)('Can not change your own role', 403));
    }

    const { using2fa, secret } = user,userToSave = _objectWithoutProperties(user, _excluded2);

    const updatedUser = await _usersModel.default.save(_objectSpread(_objectSpread({},
    userToSave), {}, {
      password: user.password ? await (0, _encryptPassword.default)(user.password) : userInTheDatabase.password }));


    if (currentUser.role === 'admin' && user.groups) {
      await (0, _userGroupsMembers.updateUserMemberships)(updatedUser, user.groups);
    }

    return updatedUser;
  },

  async newUser(user, domain) {
    const [userNameMatch, emailMatch] = await Promise.all([
    _usersModel.default.get({ username: user.username }),
    _usersModel.default.get({ email: user.email })]);

    if (userNameMatch.length || emailMatch.length) {
      const message = userNameMatch.length ? 'Username already exists' : 'Email already exists';
      return Promise.reject((0, _utils.createError)(message, 409));
    }
    const password = user.password ? user.password : (0, _uniqueID.default)();
    const _user = await _usersModel.default.save(_objectSpread(_objectSpread({},
    user), {}, {
      password: await (0, _encryptPassword.default)(password),
      using2fa: undefined,
      secret: undefined }));

    if (user.groups && user.groups.length > 0) {
      await (0, _userGroupsMembers.updateUserMemberships)(_user, user.groups);
    }
    await this.recoverPassword(user.email, domain, { newUser: true });
    return _user;
  },

  async get(query, select) {
    const users = await _usersModel.default.get(query, select);
    if (typeof select === 'string' && select.includes('+groups')) {
      const userIds = users.map((user) => user._id.toString());
      const groups = await (0, _userGroupsMembers.getByMemberIdList)(userIds);
      return Promise.all(users.map((user) => populateGroupsOfUsers(user, groups)));
    }
    return users;
  },

  async getById(id, select = '', includeGroups = false) {
    const user = await _usersModel.default.getById(id, select);
    if (includeGroups && user) {
      const groups = await (0, _userGroupsMembers.getByMemberIdList)([user._id.toString()]);
      return populateGroupsOfUsers(user, groups);
    }
    return user;
  },

  async delete(_id, currentUser) {
    if (_id === currentUser._id.toString()) {
      return Promise.reject((0, _utils.createError)('Can not delete yourself', 403));
    }
    const count = await _usersModel.default.count();
    if (count > 1) {
      await (0, _userGroupsMembers.updateUserMemberships)({ _id }, []);
      return _usersModel.default.delete({ _id });
    }
    return Promise.reject((0, _utils.createError)('Can not delete last user', 403));
  },

  async login({ username, password, token }, domain) {
    const [user] = await this.get(
    { username },
    '+password +accountLocked +failedLogins +accountUnlockCode');


    validateUserStatus(user);
    await validateUserPassword(user, password, domain);
    await validate2fa(user, token, domain);
    await _usersModel.default.db.updateOne({ _id: user._id }, { $unset: { failedLogins: 1 } });

    return sanitizeUser(user);
  },

  async unlockAccount({ username, code }) {
    const [user] = await _usersModel.default.get({ username, accountUnlockCode: code }, '_id');

    if (!user) {
      throw (0, _utils.createError)('Invalid username or unlock code', 403);
    }

    return _usersModel.default.save(_objectSpread(_objectSpread({},
    user), {}, {
      accountLocked: false,
      accountUnlockCode: false,
      failedLogins: false }));

  },

  recoverPassword(email, domain, options = {}) {
    const key = (0, _sha.default)(email + Date.now()).toString();
    return Promise.all([_usersModel.default.get({ email }), _settings2.default.get()]).then(([_user, _settings]) => {
      const user = _user[0];
      if (user) {
        return _passwordRecoveriesModel.default.save({ key, user: user._id }).then(() => {
          const emailSender = _mailer.default.createSenderDetails(_settings);
          const mailOptions = { from: emailSender, to: email };
          const mailTexts = conformRecoverText(options, _settings, domain, key, user);
          mailOptions.subject = mailTexts.subject;
          mailOptions.text = mailTexts.text;

          if (options.newUser) {
            mailOptions.html = mailTexts.html;
          }

          return _mailer.default.send(mailOptions);
        });
      }

      return Promise.reject((0, _utils.createError)('User not found', 403));
    });
  },

  async resetPassword(credentials) {
    const [key] = await _passwordRecoveriesModel.default.get({ key: credentials.key });
    if (key) {
      return Promise.all([
      _passwordRecoveriesModel.default.delete(key._id),
      _usersModel.default.save({ _id: key.user, password: await (0, _encryptPassword.default)(credentials.password) })]);

    }
    throw (0, _utils.createError)('key not found', 403);
  } };exports.default = _default;