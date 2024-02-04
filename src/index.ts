import { program } from '@commander-js/extra-typings';

const cli = program
  .name('toy-robot')
  .version('1.0.0')
  .description('TS implementation of the Toy Robot challenge.')
  .option('-f, --file <value>', 'Read instructions from file.')
  .option('-i, --interactive', 'Read instructions from console.');

cli.parse();

const options: { file?: string; interactive?: boolean } = cli.opts();

if (options.file) {
  console.log(`read instructions from: ${options.file}`);
} else if (options.interactive) {
  console.log('read instructions from console.');
} else {
  cli.help();
}
