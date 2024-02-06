import type { Table, Vector } from './types';

export const isValidVector = (vector: Vector): boolean => {
  return vector.x >= 0 && vector.y >= 0 && vector.direction !== undefined;
};

export const isOnTable = (position: Vector, table: Table): boolean => {
  return (
    position.x >= 0 &&
    position.x < table.dimensions.x &&
    position.y >= 0 &&
    position.y < table.dimensions.y &&
    position.direction !== undefined
  );
};

export const add = (matrix: number[][]) =>
  matrix[0].map((num, idx) => num + matrix[1][idx]);
