import { parseInput } from './parser';
import { runCommand } from './runner';
import type { Command, Robot, Simulation, Table, Vector } from './types';

export const createToyRobotSimulation = (): Simulation => {
  const initPosition: Vector = { x: -1, y: -1, direction: undefined };
  const robot: Robot = { position: initPosition };
  const table: Table = { dimensions: { x: 5, y: 5 } };

  const runInteractive = (): void => {
    parseInput({ interactive: true }, commandRun);
  };
  const runFromFile = (file: string): void => {
    parseInput({ file }, commandRun);
  };
  const commandRun = (command: Command, args?: Vector) =>
    runCommand(command, args, robot, table);

  return {
    commandRun,
    runInteractive,
    runFromFile,
  };
};
