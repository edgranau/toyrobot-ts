import { createReadStream } from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import { Command, Direction } from './types';
import { isValidVector } from './util';
import type { Vector } from './types';
import type { ReadStream } from 'fs';

interface parseInputFlags {
  interactive?: boolean;
  file?: string;
}

export const getReadStream = (
  flags: parseInputFlags
): ReadStream | typeof process.stdin => {
  const { file = '', interactive = false } = flags;
  return interactive
    ? process.stdin
    : createReadStream(path.resolve(__dirname, file));
};

export const parseInput = (
  flags: parseInputFlags,
  commandRun: (command: Command, args?: Vector) => void
): void => {
  const { interactive } = flags;
  const rl = createInterface({
    input: getReadStream(flags),
    output: process.stdout,
    prompt: 'toy-robot> ',
    crlfDelay: Infinity,
  });

  if (interactive) {
    rl.setPrompt('toy-robot> ');
    rl.prompt();
  }

  rl.on('line', (line) => {
    const parsedCommand = parseCommand(line);
    if (parsedCommand) {
      commandRun(parsedCommand.command, parsedCommand.args);
    } else {
      console.debug(`Ignoring '${line.trim()}'`);
    }
    if (interactive) {
      rl.setPrompt('toy-robot> ');
      rl.prompt();
    }
  });

  rl.on('close', () => {
    console.log('Have a great day!');
    process.exit(0);
  });

  rl.on('error', (err) => {
    console.error(`Error reading the file: ${err.message}`);
    process.exit(0);
  });

  if (interactive) {
    rl.setPrompt('toy-robot> ');
  }
};

interface ParsedCommand {
  command: Command;
  args?: Vector;
}

export const parseCommand = (line: string): ParsedCommand | undefined => {
  let parsedCommand: ParsedCommand;
  try {
    const commandAndArgs = line.trim().split(' ', 2);
    parsedCommand = {
      command: Command[commandAndArgs[0] as keyof typeof Command],
    };
    if (parsedCommand.command === Command.PLACE && commandAndArgs[1]) {
      parsedCommand.args = parseVector(commandAndArgs[1]);
    }
    if (!parsedCommand.command) return undefined;
  } catch (error) {
    return undefined;
  }
  return parsedCommand;
};

export const parseVector = (param: string): Vector | undefined => {
  let vector: Vector;
  try {
    const splitParam = param.trim().split(',', 3);
    vector = {
      x: parseInt(splitParam[0]),
      y: parseInt(splitParam[1]),
      direction: Direction[splitParam[2] as keyof typeof Direction],
    };
  } catch (error) {
    return undefined;
  }
  return isValidVector(vector) ? vector : undefined;
};
