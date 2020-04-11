import {injectable} from 'inversify';
import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import os from 'os';
import getPort from 'get-port';
import util from 'util';
import {Observable, Subject} from 'rxjs';
import _ from 'lodash';

@injectable()
export default class Server {

  public host: string;

  public port: number;

  private app: express.Express;

  private server: http.Server;

  private io: SocketIO.Server;

  private _connection = new Subject<SocketIO.Socket>();

  public start(): Promise<void> {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = SocketIO(this.server);
    this.io.on('connection', socket => this._connection.next(socket));
    return this.getHost()
      .then(host => this.host = host)
      .then(() => getPort())
      .then(port => this.port = port)
      .then(() => this.listen());
  }

  private getHost(): Promise<string> {
    let interfaces = os.networkInterfaces();
    let info = _.values(interfaces)
      .flat()
      .reverse()
      .find(iface => iface.family === 'IPv4' && !iface.internal);
    return Promise.resolve(info.address);
  }

  private listen(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.on('error', reject);
      this.server.listen(this.port, resolve);
    });
  }

  public stop(): Promise<void> {
    if (!this.server.listening)
      return Promise.resolve();
    let bound = this.server.close.bind(this.server);
    let close = util.promisify(bound);
    return close();
  }

  public connection(): Observable<SocketIO.Socket> {
    return this._connection.asObservable();
  }

}
