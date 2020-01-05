import {boundClass} from 'autobind-decorator';
import browserSync, {BrowserSyncInstance} from 'browser-sync';
import util from 'util';
import args from './args';
import paths from './paths';

@boundClass
export class DevServer {

	private bs: BrowserSyncInstance;

	public constructor() {
		this.bs = browserSync.create();
	}

	public start(): Promise<any> {
		let init = util.promisify(this.bs.init);
		return init({
			server: paths.dest.renderer,
			files: paths.dest.renderer,
			host: args.hostname,
			port: args.port,
			localOnly: true,
			watch: true,
			open: false,
			ui: false
		});
	}

	public close(): void {
		this.bs.exit();
	}

}
