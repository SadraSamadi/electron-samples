import yargs from 'yargs';

export default yargs
	.option('hostname', {
		type: 'string',
		default: 'localhost'
	})
	.option('port', {
		type: 'number',
		default: 3000
	})
	.option('target', {
		type: 'string',
		choices: ['auto', 'win', 'mac', 'linux'],
		default: 'auto'
	})
	.parse();
