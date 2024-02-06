import {
  isOnTable,
  leftCommand,
  moveCommand,
  placeCommand,
  reportCommand,
  rightCommand,
  runCommand,
} from './runner';
import { Command, Direction } from './types';

describe('runCommand', () => {
  let robot: any;
  let table: any;

  beforeEach(() => {
    robot = {
      position: { x: 0, y: 0, direction: Direction.NORTH },
    };
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should run LEFT command', () => {
    const command = Command.LEFT;
    runCommand(command, undefined, robot, table);
    expect(robot.position.direction).toBe(Direction.WEST);
  });

  test('should run MOVE command', () => {
    const command = Command.MOVE;
    runCommand(command, undefined, robot, table);
    expect(robot.position.y).toBe(1);
  });

  test('should run PLACE command', () => {
    const command = Command.PLACE;
    const args = { x: 2, y: 3, direction: Direction.EAST };
    runCommand(command, args, robot, table);
    expect(robot.position).toEqual(args);
  });

  test('should run REPORT command', () => {
    const command = Command.REPORT;
    const consoleLogSpy = jest.spyOn(console, 'log');
    runCommand(command, undefined, robot, table);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Robot is at: ${JSON.stringify(robot.position)}`
    );
    consoleLogSpy.mockRestore();
  });

  test('should run RIGHT command', () => {
    const command = Command.RIGHT;
    runCommand(command, undefined, robot, table);
    expect(robot.position.direction).toBe(Direction.EAST);
  });
});

describe('leftCommand', () => {
  let robot: any;
  let table: any;

  beforeEach(() => {
    robot = {
      position: { x: 0, y: 0, direction: Direction.NORTH },
    };
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should rotate the robot left', () => {
    leftCommand(robot, table);
    expect(robot.position.direction).toBe(Direction.WEST);
  });

  test('should not rotate the robot left if it is not on the table', () => {
    robot.position = { x: -1, y: 0, direction: Direction.NORTH };
    leftCommand(robot, table);
    expect(robot.position.direction).toBe(Direction.NORTH);
  });
});

describe('moveCommand', () => {
  let robot: any;
  let table: any;

  beforeEach(() => {
    robot = {
      position: { x: 0, y: 0, direction: Direction.NORTH },
    };
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should move the robot forward', () => {
    moveCommand(robot, table);
    expect(robot.position.y).toBe(1);
  });

  test('should not move the robot if it is not on the table', () => {
    robot.position = { x: -1, y: 0, direction: Direction.NORTH };
    moveCommand(robot, table);
    expect(robot.position.y).toBe(0);
  });
});

describe('placeCommand', () => {
  let robot: any;
  let table: any;

  beforeEach(() => {
    robot = {
      position: { x: 0, y: 0, direction: Direction.NORTH },
    };
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should place the robot on the table', () => {
    const position = { x: 2, y: 3, direction: Direction.EAST };
    placeCommand(robot, table, position);
    expect(robot.position).toEqual(position);
  });

  test('should not place the robot on the table if the position is outside the table', () => {
    const position = { x: 6, y: 3, direction: Direction.EAST };
    placeCommand(robot, table, position);
    expect(robot.position).toEqual({ x: 0, y: 0, direction: Direction.NORTH });
  });
});

describe('reportCommand', () => {
  let robot: any;
  let table: any;

  beforeEach(() => {
    robot = {
      position: { x: 0, y: 0, direction: Direction.NORTH },
    };
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should log the robot position', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    reportCommand(robot, table);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Robot is at: ${JSON.stringify(robot.position)}`
    );
    consoleLogSpy.mockRestore();
  });

  test('should not log the robot position if it is not on the table', () => {
    robot.position = { x: -1, y: 0, direction: Direction.NORTH };
    const consoleLogSpy = jest.spyOn(console, 'log');
    reportCommand(robot, table);
    expect(consoleLogSpy).not.toHaveBeenCalled();
    consoleLogSpy.mockRestore();
  });
});

describe('rightCommand', () => {
  let robot: any;
  let table: any;

  beforeEach(() => {
    robot = {
      position: { x: 0, y: 0, direction: Direction.NORTH },
    };
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should rotate the robot right', () => {
    rightCommand(robot, table);
    expect(robot.position.direction).toBe(Direction.EAST);
  });

  test('should not rotate the robot right if it is not on the table', () => {
    robot.position = { x: -1, y: 0, direction: Direction.NORTH };
    rightCommand(robot, table);
    expect(robot.position.direction).toBe(Direction.NORTH);
  });
});

describe('isOnTable', () => {
  let table: any;

  beforeEach(() => {
    table = { dimensions: { x: 5, y: 5 } };
  });

  test('should return true if the position is on the table', () => {
    const position = { x: 2, y: 3, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(true);
  });

  test('should return false if the position is outside the table', () => {
    const position = { x: 6, y: 3, direction: Direction.EAST };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });

  test('should return false if the position direction is undefined', () => {
    const position = { x: 2, y: 3, direction: undefined };
    const result = isOnTable(position, table);
    expect(result).toBe(false);
  });
});
