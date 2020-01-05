const {app, ipcMain, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

ipcMain.on('log', (event, message) => console.log(message));

app.on('ready', createWindow);
app.on('window-all-closed', () => process.platform !== 'darwin' && app.quit());
app.on('activate', () => !mainWindow && createWindow());

function createWindow() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  if (process.env.NODE_ENV === 'dev') {
    let index = url.format({
      protocol: 'http',
      hostname: 'localhost',
      port: 4200
    });
    mainWindow.loadURL(index);
    mainWindow.maximize();
    mainWindow.webContents.openDevTools();
  } else if (process.env.NODE_ENV === 'prod') {
    Menu.setApplicationMenu(null);
    let index = url.format({
      protocol: 'file',
      pathname: path.resolve('dist', 'metaman', 'index.html')
    });
    mainWindow.loadURL(index);
  }
  mainWindow.on('closed', () => mainWindow = null);
}
