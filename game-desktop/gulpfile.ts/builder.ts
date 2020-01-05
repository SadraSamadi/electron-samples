import {boundMethod} from 'autobind-decorator';
import webpack, {Stats} from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import util from 'util';
import _ from 'lodash';
import {Observable, Subject, Subscription} from 'rxjs';
import Electron from './electron';
import config from './config';
import args from './args';

function print(stats: Stats): void {
  let str = stats.toString({colors: true});
  console.log(str);
}

export function compile(): Promise<void> {
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

  private _closed = new Subject<void>();

  public start(): Observable<void> {
    this.electron = new Electron();
    this.listener = this.listen()
      .subscribe(_.noop, console.error);
    this.watcher = this.watch()
      .subscribe(this.watched, console.error);
    this.electron.closed()
      .subscribe(this.stop);
    process.on('SIGINT', this.stop);
    process.on('SIGTERM', this.stop);
    return this._closed.asObservable();
  }

  private listen(): Observable<void> {
    return new Observable(subscriber => {
      let renderer = webpack(config.renderer);
      let server = new WebpackDevServer(renderer);
      server.listen(args.port, err => subscriber.error(err));
      return () => server.close();
    });
  }

  private watch(): Observable<Stats> {
    return new Observable(subscriber => {
      let main = webpack(config.main);
      let watcher = main.watch({}, (err, stats) => {
        if (err)
          subscriber.error(err);
        else
          subscriber.next(stats);
      });
      return () => watcher.close(_.noop);
    });
  }

  @boundMethod
  private watched(stats: Stats): void {
    print(stats);
    this.electron.start();
  }

  @boundMethod
  private stop(): void {
    this.electron.stop();
    this.watcher.unsubscribe();
    this.listener.unsubscribe();
    this._closed.next();
    this._closed.complete();
    process.exit(0);
  }

}

export function serve(): Observable<void> {
  let develop = new Develop();
  return develop.start();
}
