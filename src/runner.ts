import { Command, Direction } from './types';
import type { Robot, Table, Vector } from './types';

export const runCommand = (
  command: Command,
  args: Vector | undefined,
  robot: Robot,
  table: Table
) => {
  console.debug(
    `runCommand: command: ${command}, args: ${JSON.stringify(args)}, robot: ${JSON.stringify(robot)}, table: ${JSON.stringify(table)}`
  );
  switch (command) {
    case Command.LEFT:
      leftCommand(robot, table);
      break;
    case Command.MOVE:
      moveCommand(robot, table);
      break;
    case Command.PLACE:
      if (args) placeCommand(robot, table, args);
      break;
    case Command.REPORT:
      reportCommand(robot, table);
      break;
    case Command.RIGHT:
      rightCommand(robot, table);
      break;
  }
};

const left = {
  NORTH: Direction.WEST,
  EAST: Direction.NORTH,
  SOUTH: Direction.EAST,
  WEST: Direction.SOUTH,
  undefined: undefined
};
export const leftCommand = (robot: Robot, table: Table): void => {
  console.debug(`LEFT: ${JSON.stringify(robot.position)}`);
  if (isOnTable(robot.position, table)) {
    const newPosition = Object.assign({}, robot.position, { direction: left[`${robot.position.direction}`]});
    if (isOnTable(newPosition, table)) {
      robot.position = newPosition;
    }
  }
  // else ignore
  console.debug(`${JSON.stringify(robot.position)}`);
};

const step = {
  NORTH: [0,1],
  EAST: [1,0],
  SOUTH: [0,-1],
  WEST: [-1,0],
  undefined: [0,0]
};
export const moveCommand = (robot: Robot, table: Table): void => {
  console.debug(`MOVE: ${JSON.stringify(robot.position)}`);
  if (isOnTable(robot.position, table)) {
    const positionAndStep = [[robot.position.x, robot.position.y], step[`${robot.position.direction}`]];
    const newPositionMatrix = add(positionAndStep);
    const newPosition = {
      x: newPositionMatrix[0],
      y: newPositionMatrix[1],
      direction: robot.position.direction
    }
    if (isOnTable(newPosition, table)) {
      robot.position = newPosition;
    }
  }
  console.debug(`${JSON.stringify(robot.position)}`);
};

export const placeCommand = (
  robot: Robot,
  table: Table,
  position: Vector
): void => {
  console.debug(`PLACE: ${JSON.stringify(position)}`);
  if (isOnTable(position, table)) {
    robot.position = position;
  }
  console.debug(`${JSON.stringify(robot.position)}`);
};

export const reportCommand = (robot: Robot, table: Table): void => {
  if (isOnTable(robot.position, table)) {
    console.log(`Robot is at: ${JSON.stringify(robot.position)}`);
  }
};

const right = {
  NORTH: Direction.EAST,
  EAST: Direction.SOUTH,
  SOUTH: Direction.WEST,
  WEST: Direction.NORTH,
  undefined: undefined
};
export const rightCommand = (robot: Robot, table: Table): void => {
  console.debug(`RIGHT: ${JSON.stringify(robot.position)}`);
  if (isOnTable(robot.position, table)) {
    const newPosition = Object.assign({}, robot.position, { direction: right[`${robot.position.direction}`]});
    if (isOnTable(newPosition, table)) {
      robot.position = newPosition;
    }
  }
  console.debug(`${JSON.stringify(robot.position)}`);
};

export const isOnTable = (position: Vector, table: Table): boolean => {
  return (
    position.x >= 0 && position.x < table.dimensions.x &&
    position.y >= 0 && position.y < table.dimensions.y &&
    position.direction !== undefined
  );
};

const add = (matrix: number[][]) => matrix[0].map((num, idx) => num + matrix[1][idx]);
