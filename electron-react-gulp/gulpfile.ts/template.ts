import gulp from 'gulp';
import pug from 'gulp-pug';
import paths from './paths';

export function template() {
	return gulp.src(paths.src.template)
		.pipe(pug({
			pretty: process.env.NODE_ENV !== 'prod',
			data: {
				style: paths.dest.style,
				script: paths.dest.script
			}
		}))
		.pipe(gulp.dest(paths.dest.renderer));
}
