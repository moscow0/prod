"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.buildActivityEntry = exports.Methods = exports.ActivityLogBuilder = void 0;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}let Methods;exports.Methods = Methods;(function (Methods) {Methods["Create"] = "CREATE";Methods["Update"] = "UPDATE";Methods["Delete"] = "DELETE";Methods["Migrate"] = "MIGRATE";})(Methods || (exports.Methods = Methods = {}));






const buildActivityLogEntry = (builder) => _objectSpread(_objectSpread({
  description: builder.description,
  action: builder.action || Methods.Update },
builder.name && { name: builder.name }),
builder.extra && { extra: builder.extra });


















class ActivityLogBuilder {












  constructor(data, entryValue) {_defineProperty(this, "description", void 0);_defineProperty(this, "action", void 0);_defineProperty(this, "extra", void 0);_defineProperty(this, "name", void 0);_defineProperty(this, "data", void 0);_defineProperty(this, "entryValue", void 0);
    this.description = entryValue.desc;
    this.data = data;
    this.action = entryValue.method ? entryValue.method : Methods.Update;
    this.entryValue = entryValue;
  }

  async loadRelated() {
    if (this.entryValue.related) {
      this.data = await this.entryValue.related(this.data);
    }
  }

  makeExtra() {
    if (this.entryValue.extra) {
      this.extra = this.entryValue.extra(this.data);
    }
  }

  makeName() {
    if (this.entryValue.nameFunc) {
      this.name = this.entryValue.nameFunc(this.data);
    } else if (this.entryValue.id) {
      this.name = this.getNameWithId();
    } else if (this.entryValue.nameField) {
      this.name = this.data[this.entryValue.nameField] || this.data.name;
    }
  }

  getNameWithId() {
    const nameField = this.entryValue.nameField || 'name';
    const name = this.data[nameField];
    return name ? `${name} (${this.entryValue.id})` : `${this.entryValue.id}`;
  }

  build() {
    return buildActivityLogEntry(this);
  }}exports.ActivityLogBuilder = ActivityLogBuilder;


const changeToUpdate = (entryValue) => {
  const updatedEntry = _objectSpread(_objectSpread({}, entryValue), {}, { method: Methods.Update });
  updatedEntry.desc = updatedEntry.desc.replace('Created', 'Updated');
  return updatedEntry;
};

function checkForUpdate(body, entryValue) {
  const content = JSON.parse(body);
  const id = entryValue.idField ? content[entryValue.idField] : null;
  let activityInput = _objectSpread({}, entryValue);
  if (id && entryValue.method !== Methods.Delete) {
    activityInput = changeToUpdate(entryValue);
    activityInput.id = id;
  }
  return activityInput;
}

const getActivityInput = (entryValue, body) => {
  const idPost = entryValue.idField && body;
  return idPost ? checkForUpdate(body, entryValue) : entryValue;
};

const buildActivityEntry = async (entryValue, data) => {
  const body = data.body && data.body !== '{}' ? data.body : data.query || '{}';
  const activityInput = getActivityInput(entryValue, body);
  const activityEntryBuilder = new ActivityLogBuilder(JSON.parse(body), activityInput);
  await activityEntryBuilder.loadRelated();
  activityEntryBuilder.makeName();
  activityEntryBuilder.makeExtra();
  return activityEntryBuilder.build();
};exports.buildActivityEntry = buildActivityEntry;