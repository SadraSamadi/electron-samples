import 'reflect-metadata';
import {app, BrowserWindow} from 'electron';
import windowStateKeeper from 'electron-window-state';
import args from './args';
import path from 'path';
import url from 'url';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = String(true);

const isDev = process.env.APP_ENV === 'dev';

let win: BrowserWindow;

app.on('ready', create);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
});

app.on('activate', () => {
  if (win === null)
    create();
});

function create(): void {
  let state = windowStateKeeper({
    defaultWidth: 800,
    defaultHeight: 600
  });
  win = new BrowserWindow({
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
    port: args.port
  } : {
    protocol: 'file',
    pathname: path.join(__dirname, '..', 'renderer', 'index.html')
  });
  win.loadURL(index);
  Promise.resolve().then();
  win.webContents.openDevTools();
  win.on('closed', () => win = null);
}
