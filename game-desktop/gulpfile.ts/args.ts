import yargs from 'yargs';

export default yargs
  .option('port', {
    alias: 'p',
    type: 'number',
    default: parseInt(process.env.PORT) || 3000
  })
  .parse();
