import gulp from 'gulp';
import typescript from 'gulp-typescript';
import tslint from 'gulp-tslint';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import {boundClass} from 'autobind-decorator';
import paths from './paths';

@boundClass
export class Scripts {

	public get scripts() {
		return gulp.parallel(
			this.typeCheck,
			this.lint,
			this.compile
		);
	}

	public constructor(private scope: string) {
	}

	public typeCheck(): any {
		let project = typescript.createProject('tsconfig.json');
		return gulp.src(paths.src.scripts[this.scope])
			.pipe(project());
	}

	public lint(): any {
		return gulp.src(paths.src.scripts[this.scope])
			.pipe(tslint({
				formatter: 'stylish'
			}))
			.pipe(tslint.report({
				allowWarnings: true
			}));
	}

	public compile(): any {
		return gulp.src(paths.src.scripts[this.scope])
			.pipe(sourcemaps.init())
			.pipe(babel())
			.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(paths.dest.scripts[this.scope]));
	}

}

export default {
	all: new Scripts('all'),
	main: new Scripts('main'),
	renderer: new Scripts('renderer')
};
