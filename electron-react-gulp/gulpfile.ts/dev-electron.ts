import {boundClass} from 'autobind-decorator';
import child_process, {ChildProcess} from 'child_process';
import electron from 'electron';
import args from './args';
import {Observable, Subject} from 'rxjs';

@boundClass
export class DevElectron {

	private readonly signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];

	private child: ChildProcess;

	private _onClose = new Subject<any>();

	public start(): Promise<any> {
		let cmd = electron as unknown as string;
		this.child = child_process.spawn(cmd, [
			'.',
			'--hostname=' + args.hostname,
			'--port=' + args.port
		], {
			stdio: 'inherit',
			windowsHide: true
		});
		this.child.on('close', this.close);
		this.signals.forEach(this.handleSignal);
		return Promise.resolve();
	}

	public reload(): Promise<any> {
		this.child.removeListener('close', this.close);
		this.child.kill();
		return this.start();
	}

	public onClose(): Observable<any> {
		return this._onClose.asObservable();
	}

	private handleSignal(signal: NodeJS.Signals): void {
		process.on(signal, () => {
			if (!this.child.killed)
				this.child.kill(signal);
		});
	}

	private close(code: number): void {
		this._onClose.complete();
		process.exit(code);
	}

}
