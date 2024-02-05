import { program } from '@commander-js/extra-typings';
import { createToyRobotSimulation } from './simulation';

const cli = program
  .name('toy-robot')
  .version('1.0.0')
  .description('TS implementation of the Toy Robot challenge.')
  .option('-f, --file <value>', 'Read instructions from file.')
  .option('-i, --interactive', 'Read instructions from console.');

cli.parse();

const options: { file?: string; interactive?: boolean } = cli.opts();

const simulation = createToyRobotSimulation();

if (options.file) {
  simulation.runFromFile(options.file);
} else if (options.interactive) {
  simulation.runInteractive();
} else {
  cli.help();
}
