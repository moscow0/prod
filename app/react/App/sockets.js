"use strict";var _BasicReducer = require("../BasicReducer");
var _I18N = require("../I18N");
var _Notifications = require("../Notifications");
var _uploadsActions = require("../Uploads/actions/uploadsActions");
var _store = require("../store");
var _socket = require("../socket");

let disconnectNotifyId;
let disconnectTimeoutMessage;
_socket.socket.on('disconnect', (reason) => {
  if (reason === 'transport close') {
    if (disconnectNotifyId) {
      _store.store.dispatch(_Notifications.notificationActions.removeNotification(disconnectNotifyId));
    }
    disconnectTimeoutMessage = setTimeout(() => {
      disconnectNotifyId = _store.store.dispatch(
      _Notifications.notificationActions.notify(
      'Lost connection to the server, your changes may be lost',
      'danger',
      false));


    }, 8000);
  }
});

_socket.socket.io.on('reconnect', () => {
  clearTimeout(disconnectTimeoutMessage);
  if (disconnectNotifyId) {
    _store.store.dispatch(_Notifications.notificationActions.removeNotification(disconnectNotifyId));
    disconnectNotifyId = _store.store.dispatch(
    _Notifications.notificationActions.notify('Connected to server', 'success'));

    disconnectNotifyId = null;
  }
});

_socket.socket.on('forceReconnect', () => {
  (0, _socket.reconnectSocket)();
});

_socket.socket.on('templateChange', (template) => {
  _store.store.dispatch(_BasicReducer.actions.update('templates', template));
});

_socket.socket.on('templateDelete', (template) => {
  _store.store.dispatch(_BasicReducer.actions.remove('templates', { _id: template.id }));
});

_socket.socket.on('updateSettings', (settings) => {
  _store.store.dispatch(_BasicReducer.actions.set('settings/collection', settings));
});

_socket.socket.on('thesauriChange', (thesauri) => {
  _store.store.dispatch(_BasicReducer.actions.update('thesauris', thesauri));
});
_socket.socket.on('thesauriDelete', (thesauri) => {
  _store.store.dispatch(_BasicReducer.actions.remove('thesauris', { _id: thesauri.id }));
});

_socket.socket.on('translationsChange', (translations) => {
  _store.store.dispatch(_BasicReducer.actions.update('translations', translations));
  _I18N.t.resetCachedTranslation();
  _I18N.Translate.resetCachedTranslation();
});

_socket.socket.on('documentProcessed', (sharedId) => {
  _store.store.dispatch((0, _uploadsActions.documentProcessed)(sharedId));
});

_socket.socket.on('IMPORT_CSV_START', () => _store.store.dispatch(_BasicReducer.actions.set('importStart', true)));
_socket.socket.on('IMPORT_CSV_PROGRESS', (progress) =>
_store.store.dispatch(_BasicReducer.actions.set('importProgress', progress)));

_socket.socket.on('IMPORT_CSV_ERROR', (error) => _store.store.dispatch(_BasicReducer.actions.set('importError', error)));
_socket.socket.on('IMPORT_CSV_END', () => _store.store.dispatch(_BasicReducer.actions.set('importEnd', true)));