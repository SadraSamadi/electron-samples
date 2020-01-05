import {app, remote} from 'electron';
import winston from 'winston';
import path from 'path';

const userData = app ? app.getPath('userData') : remote.app.getPath('userData');

const logger = winston.createLogger({
	format: winston.format.simple(),
	transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: path.join(userData, 'logs', 'app.log'),
			maxsize: 10 * 1024 * 1024,
			maxFiles: 1,
			tailable: true
		})
	]
});

export default logger;
