import gulp from 'gulp';
import stylelint from 'gulp-stylelint';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import paths from './paths';

export function lint() {
	return gulp.src(paths.src.styles)
		.pipe(stylelint({
			reporters: [
				{
					formatter: 'string',
					console: true
				}
			]
		}));
}

export function compile() {
	return gulp.src(paths.src.styles)
		.pipe(sourcemaps.init())
		.pipe(postcss())
		.pipe(rename({
			extname: '.css'
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(paths.dest.renderer));
}

export const styles = gulp.parallel(
	lint,
	compile
);
