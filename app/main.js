'use strict';

const electron = require('electron');
// Module to control application life.
const app = electron.app;
const Menu = electron.Menu;
const Tray = electron.Tray;
const globalShortcut = electron.globalShortcut;
const BrowserWindow = electron.BrowserWindow;

let mainWindow;
let appIcon = null;

function createWindow() {
  mainWindow = new BrowserWindow({width: 1000, height: 600,center:true});

  mainWindow.loadURL('file://' + __dirname + '/index.html');

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

function showWindow() {
  if (!mainWindow) {
    createWindow();
  } else {
    mainWindow.show();
  }
}

function toggleWindow() {
  if (mainWindow.isVisible()) {
    mainWindow.hide();
  } else {
    showWindow();
  }
}

function registerEvent() {
}


app.on('ready', function () {
  createWindow();
  registerEvent();
});

app.on('window-all-closed', function () {
  //if (process.platform !== 'darwin') {
  //  app.quit();
  //}
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', function () {
  globalShortcut.unregisterAll();
});
