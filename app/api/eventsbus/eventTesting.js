"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.toEmitEventWith = exports.toEmitEvent = exports.spyOnEmit = void 0;var _ = require(".");


const spyOnEmit = () => {
  const spy = jest.spyOn(_.applicationEventsBus, 'emit');

  return {
    expectToEmitEvent: (event) => {
      const expectedCall = spy.mock.calls.find((call) => call[0] instanceof event);
      if (typeof expectedCall === 'undefined') {
        fail(`No event of type ${event.name} was emitted.`);
      }
      spy.mockClear();
    },
    expectToEmitEventWith: (event, eventData) => {
      const expectedCall = spy.mock.calls.find((call) => call[0] instanceof event);
      if (typeof expectedCall === 'undefined') {
        fail(`No event of type ${event.name} was emitted.`);
      }
      expect(expectedCall[0].getData()).toEqual(eventData);
      spy.mockClear();
    },
    spy,
    restore: () => {
      spy.mockRestore();
    } };

};

//wrappers for usage with expect.extend
exports.spyOnEmit = spyOnEmit;

const failAndRestore = (spy, message) => {
  spy.mockRestore();
  return { pass: false, message: () => message };
};

const toEmitEvent = async (
callable,
event) =>
{
  const spy = jest.spyOn(_.applicationEventsBus, 'emit');

  await callable();

  const expectedCall = spy.mock.calls.find((call) => call[0] instanceof event);
  if (typeof expectedCall === 'undefined') {
    return failAndRestore(spy, `No event of type ${event.name} was emitted.`);
  }

  spy.mockRestore();
  return { pass: true, message: () => 'Pass.' };
};exports.toEmitEvent = toEmitEvent;

const toEmitEventWith = async (
callable,
event,
eventData) =>
{
  const spy = jest.spyOn(_.applicationEventsBus, 'emit');

  await callable();

  const expectedCall = spy.mock.calls.find((call) => call[0] instanceof event);
  if (typeof expectedCall === 'undefined') {
    return failAndRestore(spy, `No event of type ${event.name} was emitted.`);
  }
  expect(expectedCall[0].getData()).toEqual(eventData);

  spy.mockRestore();
  return { pass: true, message: () => 'Pass.' };
};exports.toEmitEventWith = toEmitEventWith;