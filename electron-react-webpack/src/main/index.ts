import 'reflect-metadata';
import {app, BrowserWindow, ipcMain} from 'electron';
import windowStateKeeper from 'electron-window-state';
import path from 'path';
import url from 'url';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = String(true);

const isDev = process.env.APP_ENV === 'dev';

app.on('ready', () => {
  let state = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });
  let win = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    fullscreen: state.isFullScreen,
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (state.isMaximized)
    win.maximize();
  state.manage(win);
  let index = url.format(isDev ? {
    protocol: 'http',
    hostname: 'localhost',
    port: process.env.PORT
  } : {
    protocol: 'file',
    pathname: path.join(__dirname, '..', 'renderer', 'index.html'),
    slashes: true
  });
  win.loadURL(index);
  if (isDev)
    win.webContents.openDevTools();
  win.on('close', event => {
    event.preventDefault();
    win.webContents.send('close');
  });
  ipcMain.on('closed', () => {
    win.destroy();
    win = null;
    app.quit();
  });
});
