import type { Vector } from './types';

export const isValidVector = (vector: Vector): boolean => {
  return vector.x >= 0 && vector.y >= 0 && vector.direction !== undefined;
};
