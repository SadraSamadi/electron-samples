import yargs from 'yargs';

export default yargs
  .option('port', {
    alias: 'p',
    type: 'number',
    default: parseInt(process.env.PORT) || 3000,
    description: 'Port number for the development server.'
  })
  .parse();
