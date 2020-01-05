import gulp from 'gulp';
import {copy} from './tasks';
import {template} from './template';
import {styles} from './styles';
import scripts from './scripts';
import {DevServer} from './dev-server';
import {DevElectron} from './dev-electron';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import paths from './paths';

export function serve(): Observable<any> {
	let server = new DevServer();
	let electron = new DevElectron();
	gulp.watch(paths.src.assets, copy);
	gulp.watch(paths.src.template, template);
	gulp.watch(paths.src.styles, styles);
	gulp.watch(paths.src.scripts.renderer, scripts.renderer.scripts);
	gulp.watch(paths.src.scripts.main, gulp.series(
		scripts.main.scripts,
		electron.reload
	));
	server.start()
		.then(electron.start);
	return electron.onClose()
		.pipe(
			map(server.close)
		);
}
