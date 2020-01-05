import '../main/init';
import './app';

window['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;

if (process.env.NODE_ENV === 'dev') {
	let installer = require('electron-devtools-installer');
	let devtron = require('devtron');
	let {REACT_DEVELOPER_TOOLS} = installer;
	installer.default(REACT_DEVELOPER_TOOLS);
	devtron.install();
}
