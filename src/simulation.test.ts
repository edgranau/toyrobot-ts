import { parseInput } from './parser';
import { runCommand } from './runner';
import { createToyRobotSimulation } from './simulation';
import { Command, Direction } from './types';
import type { Simulation } from './types';

jest.mock('./parser', () => ({
  parseInput: jest.fn(),
}));

jest.mock('./runner', () => ({
  runCommand: jest.fn(),
}));

describe('createToyRobotSimulation', () => {
  let simulation: Simulation;

  beforeEach(() => {
    simulation = createToyRobotSimulation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should call parseInput with interactive flag when runInteractive is called', () => {
    simulation.runInteractive();

    expect(parseInput).toHaveBeenCalledWith({ interactive: true }, simulation.commandRun);
  });

  test('should call parseInput with file flag and provided file name when runFromFile is called', () => {
    const file = 'input.txt';
    simulation.runFromFile(file);

    expect(parseInput).toHaveBeenCalledWith({ file }, simulation.commandRun);
  });

  test('should call runCommand with the provided command, args, robot, and table when commandRun is called', () => {
    const command = Command.PLACE;
    const args = { x: 1, y: 2, direction: Direction.NORTH };

    simulation.commandRun(command, args);

    expect(runCommand).toHaveBeenCalledWith(command, args, simulation.robot, simulation.table);
  });
});
