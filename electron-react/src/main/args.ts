import yargs from 'yargs';

export default yargs
  .option('port', {
    alias: 'p',
    type: 'number',
    default: parseInt(process.env.PORT),
    description: 'Port number for dev server.'
  })
  .parse();
