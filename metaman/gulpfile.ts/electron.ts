import args from './args';
import {boundMethod} from 'autobind-decorator';
import child_process, {ChildProcess} from 'child_process';
import electron from 'electron';
import {Observable, Subject} from 'rxjs';

export default class Electron {

  private child: ChildProcess;

  private _closed = new Subject<void>();

  public start(): void {
    if (this.child)
      this.stop();
    let cmd = electron as unknown as string;
    this.child = child_process.spawn(cmd, ['.', '--port=' + args.port], {stdio: 'inherit'});
    this.child.once('close', this.close);
  }

  public stop(): void {
    if (!this.child)
      return;
    this.child.off('close', this.close);
    this.child.kill();
    this.child = null;
  }

  @boundMethod
  private close(): void {
    this._closed.next();
    this._closed.complete();
  }

  public closed(): Observable<void> {
    return this._closed.asObservable();
  }

}
