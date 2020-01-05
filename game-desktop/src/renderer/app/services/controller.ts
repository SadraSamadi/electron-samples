import {inject, injectable} from 'inversify';
import {ipcRenderer} from 'electron';
import url from 'url';
import Server from './server';
import Game from '../game';

@injectable()
export default class Controller {

  public constructor(@inject(Server) private server: Server,
                     @inject(Game) private game: Game) {
    this.init();
  }

  private init(): void {
    window.addEventListener('beforeunload', () => {
      this.stop()
        .then(() => console.log('closed'));
    });
    ipcRenderer.on('close', () => {
      this.stop()
        .then(() => ipcRenderer.send('closed'));
    });
  }

  public start(): Promise<string> {
    return this.server.start()
      .then(() => url.format({
        protocol: 'http',
        hostname: this.server.host,
        port: this.server.port
      }));
  }

  public stop(): Promise<void> {
    return this.server.stop();
  }

}
