import yargs from 'yargs';

const dev = process.env.NODE_ENV !== 'prod';

export default yargs
	.option('hostname', {
		alias: 'h',
		type: 'string',
		required: dev
	})
	.option('port', {
		alias: 'p',
		type: 'number',
		required: dev
	})
	.parse();
