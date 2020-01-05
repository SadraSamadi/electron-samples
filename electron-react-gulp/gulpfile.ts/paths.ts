import path from 'path';

const script = '**/*.{j,t}s?(x)';

export default {
	src: {
		root: 'src',
		assets: 'src/renderer/**/*.{txt,json}',
		template: 'src/renderer/index.pug',
		styles: 'src/renderer/**/*.pcss',
		scripts: {
			all: `src/${script}`,
			main: `src/main/${script}`,
			renderer: `src/renderer/${script}`
		}
	},
	dest: {
		root: 'dist',
		main: 'dist/main',
		renderer: 'dist/renderer',
		style: 'index.css',
		scripts: {
			all: 'dist',
			main: 'dist/main',
			renderer: 'dist/renderer'
		},
		script: process.env.NODE_ENV === 'prod' ? './' : path.resolve('dist', 'renderer', 'index.js')
	},
	test: {
		root: 'test'
	}
};
