import gulp from 'gulp';
import del from 'del';
import * as builder from 'electron-builder';
import args from './args';

const {Platform} = builder;

export function clean() {
	return del('release');
}

export function release(): Promise<any> {
	let platform = args.target === 'auto' ? Platform.current() : Platform.fromString(args.target);
	return builder.build({
		targets: platform.createTarget(),
		config: {
			appId: 'com.sadrasamadi.metaman',
			productName: 'Metaman',
			copyright: 'Copyright © 2019 ${author}',
			directories: {
				buildResources: 'res',
				output: 'release'
			},
			files: [
				'dist/**/*'
			],
			win: {},
			mac: {},
			linux: {
				category: 'Utility'
			},
			remoteBuild: true
		}
	});
}

export const pack = gulp.series(
	clean,
	release
);
