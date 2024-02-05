export interface Table {
  dimensions: {
    x: number;
    y: number;
  };
}

export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

export interface Vector {
  x: number;
  y: number;
  direction: Direction | undefined;
}

export interface Robot {
  position: Vector;
}

export enum Command {
  PLACE = 'PLACE',
  MOVE = 'MOVE',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  REPORT = 'REPORT',
}

export interface Simulation {
  commandRun(command: Command, args?: Vector): void;
  runInteractive(): void;
  runFromFile(file: string): void;
}
