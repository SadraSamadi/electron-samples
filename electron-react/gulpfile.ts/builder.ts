import args from './args';
import webpack, {Stats} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import Electron from './electron';
import util from 'util';
import {Observable, Subject, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import config from './config';

function print(stats: Stats): void {
  let str = stats.toString({
    colors: true
  });
  console.log(str);
}

export function compile(): Promise<any> {
  let compiler = webpack([config.main, config.renderer]);
  let bound = compiler.run.bind(compiler);
  let run = util.promisify(bound);
  return run()
    .then(print)
    .catch(console.error);
}

class Develop {

  private electron: Electron;

  private listener: Subscription;

  private watcher: Subscription;

  private _finished = new Subject<void>();

  public start(): Observable<void> {
    this.electron = new Electron();
    this.listener = this.listen()
      .subscribe(() => null, console.error);
    this.watcher = this.watch()
      .pipe(tap(print))
      .subscribe(() => this.electron.start(), console.error);
    this.electron.closed()
      .subscribe(() => this.finish());
    process.once('SIGINT', () => this.finish());
    process.once('SIGTERM', () => this.finish());
    return this._finished.asObservable();
  }

  private listen(): Observable<void> {
    return new Observable(subscriber => {
      let renderer = webpack(config.renderer);
      let server = new WebpackDevServer(renderer, {
        after: () => subscriber.next()
      });
      server.listen(args.port, err => subscriber.error(err));
      return () => server.close();
    });
  }

  private watch(): Observable<Stats> {
    return new Observable(subscriber => {
      let main = webpack(config.main);
      let watcher = main.watch({}, (err, stats) => {
        if (err)
          return subscriber.error(err);
        subscriber.next(stats);
      });
      return () => watcher.close(() => null);
    });
  }

  private finish(): void {
    this.electron.stop();
    this.watcher.unsubscribe();
    this.listener.unsubscribe();
    this._finished.complete();
  }

}

export function serve(): Observable<void> {
  let develop = new Develop();
  return develop.start();
}
