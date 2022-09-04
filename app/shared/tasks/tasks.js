"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TaskProvider = exports.Task = void 0;var _tsUtils = require("../tsUtils");function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}










class Task {


  constructor() {_defineProperty(this, "status", void 0);
    this.status = { state: 'created', result: {} };
  }

  start(args) {
    if (this.status.state !== 'created') {
      throw Error('Cannot start task twice!');
    }
    this.status.state = 'running';
    this.status.startTime = Date.now();
    // This is a non-waiting then(), it kicks the task into the background.
    this.run(args).then(
    () => {
      this.status.state = 'done';
      this.status.endTime = Date.now();
    },
    (reason) => {
      this.status.state = 'failed';
      this.status.endTime = Date.now();
      this.status.message = `Failed with ${reason === null || reason === void 0 ? void 0 : reason.toString()}`;
    });

  }

  async wait() {
    if (this.status.state === 'created') {
      throw Error('Cannot wait for unstarted task!');
    }
    while (this.status.state === 'running') {
      await (0, _tsUtils.sleep)(50); // eslint-disable-line
    }
  }}exports.Task = Task;




class TaskProvider {


  static registerClass(type, c) {
    if (Object.keys(this.taskClasses).includes(type)) {
      throw Error(`Duplicate task class ${type} registered!`);
    }
    TaskProvider.taskClasses[type] = c;
  }



  static getByName(name) {
    return this.taskInstances[name];
  }

  static getOrCreate(name, type) {
    let task = this.taskInstances[name];
    if (!task || ['done', 'failed'].includes(task.status.state)) {var _task;
      const TaskClass = this.taskClasses[type];
      if (!TaskClass) {
        throw Error(`No task provider found for task class ${type}!`);
      }
      const previousStatus = (_task = task) === null || _task === void 0 ? void 0 : _task.status;
      if (previousStatus) {
        previousStatus.previousTaskStatus = undefined;
      }
      task = new TaskClass();
      if (!task) {
        throw Error(`Could not create instance of task class ${type}!`);
      }
      task.status.previousTaskStatus = previousStatus;
      this.taskInstances[name] = task;
    }
    return task;
  }

  static async runAndWait(name, type, args) {
    const task = this.getOrCreate(name, type);
    if (task.status.state === 'created') {
      task.start(args);
    }
    await task.wait();
    return task.status;
  }}exports.TaskProvider = TaskProvider;_defineProperty(TaskProvider, "taskClasses", {});_defineProperty(TaskProvider, "taskInstances", {});