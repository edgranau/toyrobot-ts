import mockStdin from 'mock-stdin';
import { parseCommand, parseInput, parseVector } from './parser';
import { Command, Direction } from './types';

describe('parseInput', () => {
  let commandRunMock: jest.Mock;

  beforeEach(() => {
    commandRunMock = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test.skip('should parse input from interactive mode', () => {
    const flags = { interactive: true };
    const stdin = mockStdin.stdin();
    const rlMock = {
      on: jest.fn(),
      prompt: jest.fn(),
      setPrompt: jest.fn(),
      close: jest.fn().mockImplementationOnce(() => undefined),
      terminal: true,
      getPrompt: jest.fn(),
    };
    jest.mock('readline', () => ({
      createInterface: () => rlMock,
    }));

    parseInput(flags, commandRunMock);

    stdin.send('PLACE 1,2,NORTH');

    rlMock.on.mock.calls[0][1]('PLACE 1,2,NORTH');
    expect(commandRunMock).toHaveBeenCalledWith(Command.PLACE, {
      x: 1,
      y: 2,
      direction: Direction.NORTH,
    });

    rlMock.on.mock.calls[1][1]('MOVE');
    expect(commandRunMock).toHaveBeenCalledWith(Command.MOVE);

    rlMock.on.mock.calls[2][1]('REPORT');
    expect(commandRunMock).toHaveBeenCalledWith(Command.REPORT);

    expect(rlMock.prompt).toHaveBeenCalledTimes(3);

    rlMock.on.mock.calls[3][1]();
    expect(console.log).toHaveBeenCalledWith('Have a great day!');
    expect(process.exit).toHaveBeenCalledWith(0);

    rlMock.on.mock.calls[4][1](new Error('Test error'));
    expect(console.error).toHaveBeenCalledWith(
      'Error reading the file: Test error'
    );
    expect(process.exit).toHaveBeenCalledWith(0);
  });

  test.skip('should parse input from file', () => {
    const flags = { file: 'input.txt' };
    const rlMock = {
      on: jest.fn(),
      close: jest.fn().mockImplementationOnce(() => undefined),
    };
    jest.mock('readline', () => ({
      createInterface: () => rlMock,
    }));

    parseInput(flags, commandRunMock);

    expect(rlMock.on.mock.calls[0][0]).toBe('line');
    expect(rlMock.on.mock.calls[1][0]).toBe('close');
    expect(rlMock.on.mock.calls[2][0]).toBe('error');

    rlMock.on.mock.calls[0][1]('PLACE 1,2,NORTH');
    expect(commandRunMock).toHaveBeenCalledWith(Command.PLACE, {
      x: 1,
      y: 2,
      direction: Direction.NORTH,
    });

    rlMock.on.mock.calls[1][1]();
    expect(console.log).toHaveBeenCalledWith('Have a great day!');
    expect(process.exit).toHaveBeenCalledWith(0);

    rlMock.on.mock.calls[2][1](new Error('Test error'));
    expect(console.error).toHaveBeenCalledWith(
      'Error reading the file: Test error'
    );
    expect(process.exit).toHaveBeenCalledWith(0);
  });
});

describe('parseCommand', () => {
  test('should parse valid command', () => {
    const line = 'PLACE 1,2,NORTH';
    const result = parseCommand(line);

    expect(result).toEqual({
      command: Command.PLACE,
      args: { x: 1, y: 2, direction: Direction.NORTH },
    });
  });

  test('should return undefined for invalid command', () => {
    const line = 'INVALID_COMMAND';
    const result = parseCommand(line);

    expect(result).toBeUndefined();
  });
});

describe('parseVector', () => {
  test('should parse valid vector', () => {
    const param = '1,2,NORTH';
    const result = parseVector(param);

    expect(result).toEqual({ x: 1, y: 2, direction: Direction.NORTH });
  });

  test('should return undefined for invalid vector', () => {
    const param = 'INVALID_VECTOR';
    const result = parseVector(param);

    expect(result).toBeUndefined();
  });
});
