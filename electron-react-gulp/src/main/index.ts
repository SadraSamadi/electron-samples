import './init';
import {app, BrowserWindow} from 'electron';
import logger from './logger';
import args from './args';
import windowState from 'electron-window-state';
import url, {UrlObject} from 'url';
import path from 'path';

let mainWindow: BrowserWindow;

function createWindow(): void {
	let state = windowState({
		defaultWidth: 800,
		defaultHeight: 600
	});
	mainWindow = new BrowserWindow({
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
		mainWindow.maximize();
	state.manage(mainWindow);
	let opts: UrlObject = process.env.NODE_ENV === 'prod' ? {
		protocol: 'file',
		pathname: path.join(__dirname, '..', 'renderer', 'index.html')
	} : {
		protocol: 'http',
		hostname: args.hostname,
		port: args.port
	};
	let index = url.format(opts);
	logger.info(index);
	mainWindow.loadURL(index);
	if (process.env.NODE_ENV !== 'prod')
		mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin')
		app.quit();
});

app.on('activate', () => {
	if (mainWindow === null)
		createWindow();
});
