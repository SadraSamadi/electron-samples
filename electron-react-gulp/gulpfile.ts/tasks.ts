import gulp from 'gulp';
import del from 'del';
import {template} from './template';
import {styles} from './styles';
import scripts from './scripts';
import {serve} from './serve';
import {pack} from './pack';
import jest from 'gulp-jest';
import paths from './paths';

export function clean(): any {
	return del(paths.dest.root);
}

export function copy(): any {
	return gulp.src(paths.src.assets)
		.pipe(gulp.dest(paths.dest.renderer));
}

export function lab(): any {
	return gulp.src(paths.test.root)
		.pipe(jest());
}

export const prepare = gulp.series(
	clean,
	gulp.parallel(
		copy,
		template,
		styles,
		scripts.all.scripts
	)
);

export function set(nodeEnv: string) {
	return function env(): Promise<any> {
		process.env.NODE_ENV = nodeEnv;
		return Promise.resolve();
	};
}

export const dev = gulp.series(
	set('dev'),
	prepare,
	serve
);

export const prod = gulp.series(
	set('prod'),
	prepare,
	pack
);

export const test = gulp.series(
	set('test'),
	lab
);
