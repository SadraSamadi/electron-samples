import {ipcRenderer} from 'electron';
import * as _ from 'lodash';
import * as path from 'path';
import {sprintf} from 'sprintf-js';
import {MESSAGE} from 'triple-beam';
import * as winston from 'winston';
import * as Transport from 'winston-transport';

export class LoggerFactory {

  private static _logger: winston.Logger;

  public static getLogger(tag?: any): winston.Logger {
    let name = tag;
    if (typeof tag === 'object')
      name = tag.constructor.name;
    else if (typeof tag === 'function')
      name = tag.name;
    let logger = LoggerFactory.logger();
    return logger.child({tag: name});
  }

  private static logger(): winston.Logger {
    if (LoggerFactory._logger)
      return LoggerFactory._logger;
    return LoggerFactory._logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.splat(),
        winston.format.metadata(),
        winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
        winston.format(info => {
          info.level = info.level.toUpperCase();
          info.level = _.padEnd(info.level, 7, ' ');
          return info;
        })(),
        winston.format(info => {
          info.metadata.tag = _.truncate(info.metadata.tag, {length: 20});
          info.metadata.tag = _.padEnd(info.metadata.tag, 20, ' ');
          return info;
        })(),
        winston.format.colorize(),
        winston.format.printf(info => sprintf('%(timestamp)s --- %(level)s [%(metadata.tag)s] : %(message)s', info))
      ),
      transports: [
        new RemoteTransport(),
        new winston.transports.Console({silent: true}),
        new winston.transports.File({
          filename: path.resolve('.log')
        })
      ]
    });
  }

}

class RemoteTransport extends Transport {

  public log(info: any, next: () => void): any {
    setImmediate(() => this.emit('logged', info));
    let message = info[MESSAGE];
    ipcRenderer.send('log', message);
    next();
  }

}
