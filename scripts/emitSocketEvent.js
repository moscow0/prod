"use strict";var _standaloneEmitSocketEvent = require("../app/api/socketio/standaloneEmitSocketEvent");

const { tenant, event } = require('yargs').
option('tenant', {
  alias: 't',
  type: 'string',
  describe: 'tenant to send event to, defaults to all tenants.',
  default: '' }).

option('event', {
  alias: 'e',
  type: 'string',
  describe: 'event name to sent to clients connected',
  choices: ['forceReconnect'] }).

demandOption(['event'], '\n\n').argv;

(0, _standaloneEmitSocketEvent.emitSocketEvent)(event, tenant, '');